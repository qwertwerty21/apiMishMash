exports.tellMe = function(req, res){
	let headers = req.headers;
	let jsonData = {
		ipAddress: null,
		language: null,
		operatingSystem: null
	};

	jsonData['ipAddress'] = headers['x-forwarded-for'] || req.connection.remoteAddress;
	jsonData['language'] = headers['accept-language'];
	jsonData['operatingSystem'] = headers['user-agent'];
	
	res.json(jsonData);
}