export default {
	clearStore() {
		clearStore();
	},
	formatDateTime(dateTime) {
		if(dateTime === null) {return null;}
		 
      const date = new Date(dateTime);
      
      const options = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false };
      const formattedDateTime = date.toLocaleString('en-US', options).replace(',', ',');
      
      return formattedDateTime;	
	},
	formatDateTimeWithYear(dateTime) {
		if(dateTime === null) {return null;}
		 
      const date = new Date(dateTime);
      
      const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
      const formattedDateTime = date.toLocaleString('en-US', options).replace(',', ',');
      
      return formattedDateTime;	
	},
	getPredictionsForModal() {
		const buttonClicked = appsmith.store.parentButton;
		
		if(buttonClicked === 'recent_bets') {
			return recent_bets.data;
		} else if(buttonClicked === 'live_bets') {
			return live_bets.data;
		} else if(buttonClicked === 'future_bets') {
			return future_bets.data;
		} else if(buttonClicked === 'bets_with_recent_comments') {
			return bets_with_recent_comments.data;
		}
	},
	getTitleForBetsModal() {
		const buttonClicked = appsmith.store.parentButton;
		const predictions = this.getPredictionsForModal().length;
		
		if(buttonClicked === 'recent_bets') {
			return 'Ставки за последние 24 часа - ' + predictions;
		} else if(buttonClicked === 'live_bets') {
			return 'Сейчас играют - ' + predictions;
		} else if(buttonClicked === 'future_bets') {
			return 'Будущие ставки - ' + predictions;
		} else if(buttonClicked === 'bets_with_recent_comments') {
			return 'За неделю:' + "\n" + '- cтавок с комментами: ' + predictions + "\n" + '- всего комментариев: ' + bets_with_recent_comments.data[0].total_comments;
		}
	},
	customWidgetData() {
		return {
			"crRawOngoing": cr_raw_ongoing.data,
			"crRawOngoing2ndMonth": cr_raw_ongoing_2nd_month.data,
			"crWinningStreak": cr_winning_streak.data,
			"crBiggestOdd": cr_biggest_odd.data,
			"dopStavki": dop_stavki.data
		}
	}
}