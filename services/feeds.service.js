const request = require('request');
const Article = require('../api/models/article');

const feedsService = {
    sendData(requestData) {
        const options = {
            url: 'http://localhost:4000/articles',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            json: this.controlAndFormatData(requestData)
        };

        request(options,
            (error, response) => {
                if (!error && response.statusCode === 200) {
                    console.log(response.body);
                } else {
                    console.log('Request failed');
                }
            });
    },

    controlAndFormatData(requestData) {
        const postData = [];
        for (const item of requestData) {
            // Push only data which match with the metadata model
            const article = new Article(item);
            postData.push(article);
        }
        return postData;
    }
};

module.exports = feedsService;
