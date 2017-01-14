const express = require('express');
const router = express.Router();
const timestamp = require('../controllers/timestamp');
const whoami = require('../controllers/whoami');
const filemetadata = require('../controllers/filemetadata');
const shorturl = require('../controllers/shorturl');
const imagesearch = require('../controllers/imagesearch');
/*filemetadata route dependencies for file upload*/
const multer = require('multer');
const upload = multer();

/* GET home page. */
router.get('/', function( req, res, next ) {
  res.render('index');
});

/* GET timestamp page*/
router.get('/api/timestamp', function( req, res, next ){
	//render timestamp views pug page
	res.render('timestamp');
});

/* GET timestamp with API request parameter*/
router.get('/api/timestamp/:time', function( req, res, next ){
	//send the result of a call to timestamp controller
	timestamp.getDate(req, res);
});

/*GET whoami page*/
router.get('/api/whoami', function( req, res, next ){
	//render whoami views pug page
	res.render('whoami');
});

/* GET timestamp with API request parameter*/
router.get('/api/tellmewhoami', function( req, res, next ){
	//send the result of a call to timestamp controller
	whoami.tellMe(req, res);
});

/*GET filemetadata page*/
router.get('/api/filemetadata', function( req, res, next ){
	//render filemetadata views pug page
	res.render('filemetadata');
});

/* POST filemetadata form */
router.post('/api/filemetadata', upload.single('fileInput'), function( req, res, next ){
	
	filemetadata.getFileSize(req, res);
});

/*GET shorturl page*/
router.get('/api/shorturl', function( req, res, next ){
	//render shorturl views pug page
	res.render('shorturl');
});


/* GET shorten with API request parameter */
router.get('/api/shorten/:longurl*', function( req, res, next ){
	
	//route to create and return JSON version of a shortened url given long url
	shorturl.shortenURL(req, res);
});

/*GET shortened with API request parameter*/
router.get('/api/shortened/:shortid', function( req, res, next ){

	//route to redirect the vistor to their original url given the long url
	shorturl.redirectURL(req, res);
});

/*GET imagesearch page*/
router.get('/api/imagesearch', function( req, res, next ){
	//render imagesearch views pug page
	res.render('imagesearch');
});

/*GET imagesearch with API request parameter*/
router.get('/api/imagesearch/:searchterm', function( req, res, next ){

	//route to redirect the vistor to their original url given the long url
	imagesearch.searchImages(req, res);
});

/*GET latest imagesearch*/
router.get('/api/history/imagesearch/', function( req, res, next ){

	//route to redirect the vistor to their original url given the long url
	imagesearch.getHistory(req, res);
});













module.exports = router;
