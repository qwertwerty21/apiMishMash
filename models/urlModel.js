const mongoose = require('mongoose');

//schema 
let urlSchema = mongoose.Schema({
	original_url: String,
	shortened_url: String
});

let URL = module.exports = mongoose.model('URL', urlSchema);

module.exports.saveURL = function( newURL, callback ){
	newURL.save(callback)
}

module.exports.findAll = function(query, callback){
	URL.find(query, callback)
}