export default {
	commaSeparate(passedArray) {
    if(passedArray.length === 0) {
			return `''`;
		} else { 
		return passedArray.map(e => `'${e}'`).join();	
		}
	} ,
	customWidgetData() {
		return {
			"summary": summary.data,
			"bySport": bySport.data,
			"byMarket": byMarket.data,
			"byOdds": byOdds.data
		}
	}
}