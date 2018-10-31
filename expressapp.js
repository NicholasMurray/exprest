const express = require('express');
const proxy = require('http-proxy-middleware');
var path = require('path');
var router = express.Router(); // get an instance of the express Router

router.get('/', function (req, res) {
  console.log('blue api router called');
  res.json({
    message: 'hooray! welcome to the blue api!'
  });
});

const appBlue = express();
appBlue.use('/api', router);
appBlue.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/blue' + '/index.html'));
});
appBlue.use("/styles", express.static(__dirname + '/blue' + '/styles'));
appBlue.listen(3000, () => console.log('Blue app listening on port 3000!'));

const appGreen = express();
appGreen.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/green' + '/index.html'));
});
appGreen.use("/styles", express.static(__dirname + '/green' + '/styles'));
const targetVal = 'http://localhost:3000';
appGreen.use(proxy('/api', {
  target: targetVal,
  changeOrigin: true
}));
appGreen.listen(3001, () => console.log('Green app listening on port 3001!'));

const appRed = express();
appRed.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/red' + '/index.html'));
});
appRed.use("/styles", express.static(__dirname + '/red' + '/styles'));
appRed.listen(3002, () => console.log('Red app listening on port 3002!'));