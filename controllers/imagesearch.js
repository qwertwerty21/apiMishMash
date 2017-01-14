	
	const ImagesClient = require('google-images');
	let client = new ImagesClient( '008973583703639188262:v_84pcj1diy', 'AIzaSyDd8NyMEWbJNI6cLTfbYfoCduO__mv0KXY'); 
	let ImagePrevSearch = require('../models/imagePrevSearchModel');


	exports.searchImages = function(req, res){
				
		let searchTerm = req.params.searchterm;
		let offset = parseInt(req.query.offset)  || 0;
		let now = new Date();
		let when = now.toDateString() + ' ' + now.toTimeString();
		
		let prevSearchInfo = ImagePrevSearch.convertToImgPrevModel(searchTerm, offset, when);

		client.search(searchTerm, {
			//search options
			page: offset
		}).then(function(images){
			var results = images.map(function(curVal, index, array){
				return {
					'url': curVal.url,
					'thumbnail_url': curVal.thumbnail.url,
					'type': curVal.type,
					'size': curVal.size
				}
			});
			ImagePrevSearch.saveImgPrevModel(prevSearchInfo);
			res.json(results)
		}, function(err){
			console.log('Error', err);
			throw err;
		});
	
	}

	exports.getHistory = function(req, res){
		
		ImagePrevSearch.getImgPrevSearchData(function(data){
			let results = [];
			for( let keys in data){
				results.push(data[keys])
			}
			res.send(results)
		})

		
	}