export default {
	// Method to extract distinct nicknames
	getNicknames(sqlData) {
		const nicknames = new Set();
		sqlData.forEach(row => nicknames.add(row.nickname));
		return Array.from(nicknames);
	},

	// Method to extract distinct indexes sorted in ascending order
	getIndexes(sqlData) {
        let indexes = Array.from(new Set(sqlData.map(row => row.index)));
        
        const firstIndex = indexes[0];
        const isDateIndex = typeof firstIndex === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(firstIndex) && !isNaN(Date.parse(firstIndex));
        
        return indexes.sort((a, b) => {
            if (isDateIndex) {
                return new Date(a) - new Date(b);
            }
            return parseFloat(a) - parseFloat(b);
        });
    },
	
	//Method to transform sql data to be used in a chart
	transformByBet(sqlData) {
		const groupedData = sqlData.reduce((acc, item) => {
			const { nickname, running_sum } = item;
			if (!acc[nickname]) {
				acc[nickname] = [];
			}
			acc[nickname].push(running_sum);
			return acc;
		}, {});

		return Object.keys(groupedData).map(name => ({
			name,
			type: 'line',
			data: groupedData[name]
		}));
	},
	
	transformByDate(sqlData) {
        const filledData = this.fillMissingData(sqlData);

        return Object.keys(filledData).map(name => ({
            name,
            type: 'line',
            data: filledData[name],
            connectNulls: true  // Ensures smooth continuity without gaps
        }));
    },
	
	fillMissingData(sqlData) {
		const nicknames = this.getNicknames(sqlData);
		const indexes = this.getIndexes(sqlData);
		const filledData = {};

		nicknames.forEach(nickname => {
			let lastKnownValue = 0;
			filledData[nickname] = indexes.map(index => {
				const entry = sqlData.find(row => row.nickname === nickname && row.index === index);
				if (entry) {
					lastKnownValue = entry.running_sum;
				}
				return lastKnownValue;
			});
		});

		return filledData;
	},
	
	//Generate chart code
	getData(sqlData = running_sum_by_bet.data) {
		
		const transformedData = Switch1.isSwitchedOn ? this.transformByBet(sqlData) : this.transformByDate(sqlData);
		const nicknames = this.getNicknames(sqlData);
		const indexes = this.getIndexes(sqlData);
		
		return {
			tooltip: {
				trigger: 'axis',
				formatter: function (params) {
                    let sortedParams = params.slice().sort((a, b) => b.value - a.value); // Sort by value descending
                    let tooltipContent = sortedParams
                        .map(item => `<div style="display: flex; justify-content: space-between;">
                            <span style="text-align: left; flex: 1;">${item.marker} ${item.seriesName}</span>
                            <span style="text-align: right; font-weight: bold; flex: 1; margin-left: 10px;">${item.value}</span>
                        </div>`)
                        .join('');
                    return `<div style="text-align: left;">${params[0].axisValueLabel}</div>${tooltipContent}`;
                }
			},
			legend: {
				data: nicknames
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: indexes
			},
			yAxis: {
				type: 'value'
			},
			series: transformedData
		}
	}
}