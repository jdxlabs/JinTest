const fs = require('fs');
const parser = require('rss-parser');
const asyncLoop = require('node-async-loop');
const feedsService = require('./services/feeds.service');
const contents = fs.readFileSync('./data/rssFeeds.json');
const feeds = JSON.parse(contents);

// Parse RSS feeds URls
console.log('Start Crawl Proccess');
asyncLoop(feeds.urls, function (feed, next) {
    console.log('Processing Feed : ' + feed);
    parser.parseURL(feed, function (err, parsed) {
        if (!err) {
            feedsService.sendData(parsed.feed.entries);
        } else {
            console.error('Unable to parse feed : ' + feed);
        }
    });
    next();
}, function (err) {
    if (err) {
        console.error('Error: ' + err.message);
        return;
    }
    console.log('All feeds are proccessing !');
});