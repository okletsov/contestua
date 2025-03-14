export default {
	commaSeparate(passedArray) {
    if(passedArray.length === 0) {
			return `''`;
		} else { 
		return passedArray.map(e => `'${e}'`).join();	
		}
	} ,
	commaSeparateIn(passedArray) {
    if(passedArray.length === 0) {
			return `''`;
		} else { 
		return passedArray.map(e => `psr.market LIKE '%${e}%'`).join(` OR `);	
		}
	},
	customWidgetData() {
		return {
			"summary": summary.data,
			"bySport": bySport.data,
			"byMarket": byMarket.data,
			"byOdds": byOdds.data
		}
	},
	clearInputs() {
		Select_participant.setSelectedOption("");
		MultiSelect_contest.setSelectedOptions("");
		MultiSelect_sports.setSelectedOptions("");
		MultiSelect_markets.setSelectedOptions("");
		Input_min_odds.setValue("");
		Input_max_odds.setValue("");
	}
}