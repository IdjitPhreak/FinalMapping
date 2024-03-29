var express = require('express');
var app = express();
var fs = require('fs');

var port = process.env.port || 30025;
app.use(express.bodyParser());
var locationsFileName = 'www/data/Locations.json';

app.get('/', function(req, res) {
	var html = fs.readFileSync('index.html');
	res.writeHeader(200, {
		"Content-Type" : "text/html"
	});
	res.write(html);
	res.end();
});

app.get('/getLocations', function(request, response) {
	console.log("Get Locations called");
	var json = fs.readFileSync(locationsFileName);
	response.send(json);
});

function writeToFile(fileName, json) {
	fs.writeFile(fileName, json, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("JSON saved to " + fileName);
			return {
				"result" : "success"
			};
		}
	});
}

// Use post when you want to send large chunks of data
app.post('/saveLocations', function(request, result) {
	console.log("saveLocations called");

	if ( typeof request.body == 'undefined') {
		console.log("request.body is not defined. Did you add app.use(express.bodyParser()); at top");
	} else {
		console.log(request.body);
		var details = request.body.details;
		var json = JSON.parse(request.body.data);
		console.log(details);
		json = JSON.stringify(json, null, 4);
		writeToFile(locationsFileName, json);
	}
});

app.get('/putitem', function(request, result) {
	console.log(request.query.locationName);
	console.log(request.query.latitude);
	console.log(request.query.longitude);
	writeToFile('temp.json', request.query)
	result.send(outcome);
});

app.get('/testCase', function(req, res) {
	var html = fs.readFileSync('public/testCase.html');
	res.writeHeader(200, {
		"Content-Type" : "text/html"
	});
	res.write(html);
	res.end();
});

app.use(express.static(__dirname + '/public'));

console.log("listening on Port: ", port);
app.listen(port); 