


	exports.formatDateToString = function( date ){
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		
		let theDate = new Date(date);

		if( theDate == "Invalid Date" ){
			return null;
		}

		let theYear = theDate.getFullYear();
		let theMonth = months[theDate.getMonth()];
		let theDay = theDate.getDate();

		return `${theMonth} ${theDay}, ${theYear}`;

	},

	exports.getDate = function(req, res){

		let inputtedTime = req.params.time;
		console.log('nuttedtime', inputtedTime);

		let inputtedTimeInSecs = ( new Date(inputtedTime).getTime() ) / 1000;

		let jsonTime = {
			unix: null,
			natural: null
		}
		//if inputtedTime is a string
		if( isNaN(inputtedTime) ){
			jsonTime.unix = inputtedTimeInSecs;
			jsonTime.natural = this.formatDateToString( inputtedTime );

			res.json(jsonTime);
		}
		//if inputtedTime is a number
		else if( !isNaN(inputtedTime) ){
			let naturalDateString = this.formatDateToString( Number(inputtedTime) * 1000 );
			jsonTime.unix = inputtedTime;
			jsonTime.natural = naturalDateString;

			res.json(jsonTime);
		}

		res.end();
	
	}
