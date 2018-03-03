var express = require('express')
var app = express()
var http = require('http').Server(app)

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/baggage-management/getSavedBag', function(req, res) {
	pid = req.query.pid
	if (pid === '123') {
		res.send([
		{
			bagName: "my samsonite bag",
			url: "../asset/bag1.jpg",
			time: "02/28/2018"
		},
		{
			bagName: "my same bag",
			url: "../asset/bag2.jpg",
			time: "03/01/2018"
		}
		])
	}
})

http.listen(3000, function(){
  console.log('Server up on *:3000')
})
