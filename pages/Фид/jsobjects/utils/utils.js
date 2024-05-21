export default {
	clearStore() {
		clearStore();
	},
	formatDateTimeWithYear(dateTime) {
		if(dateTime === null) {return null;}
		 
      const date = new Date(dateTime);
      
      const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
      const formattedDateTime = date.toLocaleString('en-US', options).replace(',', ',');
      
      return formattedDateTime;	
	}
}