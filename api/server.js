var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var articlesRoutes = require('./routes/article');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(articlesRoutes);

var port = process.env.PORT || 4000;

var server = app.listen(port, function(){
    console.log('Api server is running on port : ' + port);
});