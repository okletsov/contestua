export default {
	myVar1: [],
	parseData(input) {
		const groupedData = input.reduce((acc, item) => {
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
			stack: 'Total',
			data: groupedData[name]
		}));
	},
	getData(parsedInput) {
		return {
			title: {
				text: 'Stacked Line'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['Ajax', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: parsedInput
		}
	}
}