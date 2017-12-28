const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const articlesRoutes = require('./routes/article');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(articlesRoutes);

const port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log('Api server is running on port : ' + port);
});