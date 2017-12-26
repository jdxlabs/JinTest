var request = require('request');
var Article = require('../api/models/article');

var feedsService = {
    sendData: function (requestData) {
        var options = {
            url: 'http://localhost:4000/articles',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: this.controlAndFormatData(requestData)
        };


        request(options, function (error, response) {
            if (!error && response.statusCode === 200) {
                console.log(response.body);
            } else {
                console.log('Request failed');
            }
        })
    },

    controlAndFormatData: function (requestData) {
        var postData = [];
        for (var i = 0, len = requestData.length; i < len; i++) {
            //Push only data which match with the metadata model
            var article = new Article(requestData[i]);
            postData.push(article);
        }
        return postData;
    }
};


module.exports = feedsService;