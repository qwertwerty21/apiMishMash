	const validUrl = require('valid-url');
	let URL = require('../models/urlModel');

	

	exports.shortenURL = function(req, res){
		let original_url = req.params.longurl + req.params[0];
	
		//check if valid Url
		if( validUrl.isUri(original_url) ){
				URL.findAll({
					'original_url': original_url
				}, function(err, docs){
					if(err){
						console.log('err returned from db query', err)
					}

					if(docs.length > 0){
						res.json(docs[0])
					}
					else{
								//get db
						
						
						//check if url exists in db
						//if so return json of exisiting short url
						//else
						//create shortened url
						let base_url = req.headers.host;
						let newURL = new URL({
							'original_url': original_url,
							'shortened_url': base_url + '/api/shortened/' + Math.floor( (Math.random() * 100000) + 1 )
						});


						URL.saveURL(newURL, function(err){
							if(err){
								throw err;
							}
						});
						//save to db 
						//return json
						res.json( newURL );
					}
					

				})
				
			
			
			
		}
		//if NOT a valid url
		else{
			res.json({
				'error': 'This is not a valid URL. Please enter a correctly formatted URl (e.g. https://google.com) and try again.'
			});
		}
	
	}

	exports.redirectURL = function(req, res){
		let base_url = req.headers.host;
		let shortened_url = base_url + '/api/shortened/' + req.params.shortid;
		URL.findAll({
			'shortened_url':shortened_url
		}, function(err, docs){
			if(err){
				throw err;
			}

			console.log('return from find all ', docs)
			res.redirect(docs[0].original_url)
		})
	}
















