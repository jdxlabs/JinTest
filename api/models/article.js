'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @type {mongoose.Schema}
 */
var Article = new Schema({
    title: {
        type: String
    },
    link: {
        type: String
    },
    pubDate: {
        type: String
    },
    content: {
        type: String
    },
    contentSnippet: {
        type: String
    },
    guid: {
        type: String
    },
    isoDate: {
        type: String
    }
});

module.exports = mongoose.model('articles', Article);