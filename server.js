var express = require('express')
var app = express()
var http = require('http').Server(app)
var formidable = require('formidable')
var fs = require('fs');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/baggage-management/getSavedBags', function(req, res) {
  var pid = req.query.pid
  if (pid === '123') {
    res.send([
    {
      bagName: "my samsonite bag",
      bagID: "42567733",
      url: "../asset/bag1.jpg",
      time: "02/28/2018"
    },
    {
      bagName: "my same bag",
      bagID: "40863593",
      url: "../asset/bag2.jpg",
      time: "03/01/2018"
    }
    ])
  }
})

app.get('/baggage-management/getSavedBag', function(req, res) {
  var bagid = req.query.bagid
  if (bagid === '42567733') {
    res.send(
    {
      bagName: "my samsonite bag",
      bagID: "42567733",
      url: "../asset/bag1.jpg",
      time: "02/28/2018"
    })
  }
})

app.get('/baggage-management/deleteBag', function(req, res) {
  var bagid = req.query.bagid
  console.log("bag " + bagid + " deleted!")
  res.send("bag " + bagid + " deleted!")
})

app.post('/baggage-management/addNewBag', function (req, res) {
  var form = new formidable.IncomingForm()

  form.parse(req, function(err, fields, files) {
    var oldpath = files.bagImage.path;
    var newpath = '/Users/Cecil/Desktop/Baggage-Recovery-App/frontend/uploads/' + fields.bagName;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
  })

})

http.listen(3000, function(){
  console.log('Server up on *:3000')
})
