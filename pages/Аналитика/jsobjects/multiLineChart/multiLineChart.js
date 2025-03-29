export default {
	// Method to extract distinct nicknames
	getNicknames(sqlData) {
		const nicknames = new Set();
		sqlData.forEach(row => nicknames.add(row.nickname));
		return Array.from(nicknames);
	},

	// Method to extract distinct indexes sorted in ascending order
	getIndexes(sqlData) {
		const indexes = new Set();
		sqlData.forEach(row => indexes.add(row.index));
		return Array.from(indexes).sort((a, b) => a - b);
	},
	
	//Method to transform sql data to be used in a chart
	transformSqlData(sqlData) {
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
	
	//Generate chart code
	getData(sqlData) {
		
		const transformedData = this.transformSqlData(sqlData);
		const nicknames = this.getNicknames(sqlData);
		const indexes = this.getIndexes(sqlData);
		
		return {
			tooltip: {
				trigger: 'axis'
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