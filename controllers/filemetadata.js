exports.getFileSize = function(req, res){
		
		var jsonData = {
			'bytes': 0
		}

		if(req.file){
			jsonData['bytes'] = req.file.size
		}

		res.json(jsonData);

}