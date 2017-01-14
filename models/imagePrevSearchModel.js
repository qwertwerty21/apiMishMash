
//initialize firebase
const firebase = require('firebase');
// const config = {
//   apiKey: process.env.FIREBASE_APIKEY,
//   authDomain: process.env.FIREBASE_AUTHDOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASEURL,
//   storageBucket: process.env.STORAGEBUCKET,
//   messagingSenderId: process.env.MESSAGINGSENDERID
// };
var config = {
  apiKey: "AIzaSyDbrPQVFdofpoAYR-C9AFoy4gnVARj76mU",
  authDomain: "apimishmashimagesearch.firebaseapp.com",
  databaseURL: "https://apimishmashimagesearch.firebaseio.com",
  storageBucket: "apimishmashimagesearch.appspot.com",
  messagingSenderId: "351451763645"
};
firebase.initializeApp(config);
let database = firebase.database();


//ref is the name of the field under which you want to save your data
let ref = database.ref('prevSearches');

module.exports.convertToImgPrevModel = function( searchterm, offset, when ){
	return {
		'search_term': searchterm,
		'offset': offset,
		'when': when
	}
}

module.exports.saveImgPrevModel = function( imgPrevModelObj ){
	ref.push(imgPrevModelObj)
}
//needs a callback because data is returned asynchronously from firebase
module.exports.getImgPrevSearchData = function(callback){
	ref.once('value', function(data){
		
		data = data.val();
		console.log('data',data)
		callback(data);
	}, function(err){
		throw err;
	});
}
// let Image = module.exports = mongoose.model('Image', imageSchema);

// module.exports.saveImage = function( newImage, callback ){
// 	newImage.save(callback)
// }

// module.exports.findImages = function(query, callback){
// 	Image.find(query, callback)
// }