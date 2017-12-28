const express = require('express');
const config = require('../../config/database');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = mongoose.connection.openUri(config.db);
const articlesCollection = db.collection('articles');
const articlesRoutes = express.Router();

articlesRoutes.route('/articles')
// Extract and save metadata from RSS feed
    .post((req, res) => {
        const articles = req.body;
        for (const article of articles) {
            articlesCollection.find({ guid: article.guid }).toArray((err, docs) => {
                if (docs.length === 0) {
                    articlesCollection.insertOne(article, (error) => {
                        if (error) {
                            console.log('Unable to save item');
                        }
                    });
                }
            });
        }

        return res.json({ status: 200, msg: ' Articles added successfully' });
    });

module.exports = articlesRoutes;
