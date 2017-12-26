var express = require('express');
var config = require('../../config/database');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connection.openUri(config.db);
var articlesCollection = db.collection("articles");
var articlesRoutes = express.Router();

articlesRoutes.route('/articles')
    // Extract and save metadata from RSS feed
    .post(function (req, res) {
        var articles = req.body;
        for (var i = 0, len = articles.length; i < len; i++) {
            const item = articles[i];
            articlesCollection.find({guid:item.guid}).toArray(function (err, docs) {
                if (docs.length === 0) {
                    articlesCollection.insertOne(item, function (err) {
                        if (err) {
                            console.log('Unable to save item');
                        }
                    });
                }
            });

        }

        return res.json({'status': 200, 'msg': ' Articles added successfully'});
    });

module.exports = articlesRoutes;