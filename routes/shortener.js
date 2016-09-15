"use strict";

var Url = require('../models/url'); 
var request = require('request'); 
//var config = require('../config');

// accessing random word api and returning json body
exports.retrieveRandomWord = function (req, res) {
    var options = {
        //host: config.random_api.host,
        //path: config.random_api.path,
        port: 80,
        method: 'GET'
    };

  request(options, function(error, response, body) {
    if(error){
      return console.log('Error:', error); 
    }
    if(response.statusCode !== 200){
      return console.log('Invalid status code returned', response.statusCode);
    }
    console.log(response); 
    res.send(body);   
    res.json(response); 
  });
}

// Storing short and long urls
var shorten = [];
var lengthen = [];
 
exports.createShort = function(req,res) {
    var urlToShorten = req.body.urlToShorten;
    if (!urlToShorten) {
        console.log("The request received didn't contain a URL, please provide a valid URL to shorten.");
        res.render('short', {message: "The request received didn't contain a URL, please provide a valid URL to shorten."});
    } else {
        console.log("Requested to shorten " + urlToShorten);
 
        urlToShorten = addhttp(urlToShorten);
        var baseUrl = 'http://' + req.app.get('hostname') + '/';
 
        var shortCode = createShort(urlToShorten);
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.render('short', {shortUrl: baseUrl + shortCode});
    }
};
 
exports.getLong = function (req, res) {
    var shortCode = req.path.substring(1);
 
    console.log("Retrieving URL indexed by " + shortCode);
    var longUrl = lengthen[shortCode];
 
    console.log("Short Code " + shortCode + " refers to " + longUrl);
 
    console.log("redirecting to " + longUrl);
    res.writeHead(302, {'Location': longUrl});
    res.end();
};
 
function createShortCode(longUrl) {
    console.log("Creating short code for url " + longUrl);
    shortUrlCode = shorten[longUrl];
 
    if (shortUrlCode === undefined) {
        console.log(longUrl + " has not already been shortened, so shortening it now.");
        shortUrlCode = randomString(5);
        console.log("Shortened " + longUrl + " to a shortcode of " + shortUrlCode);
 
        shorten[longUrl] = shortUrlCode;
        lengthen[shortUrlCode] = longUrl;
    }
 
    return shortUrlCode;
}
 
function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';
    var result = '';
 
    console.log("Generating random alphanumeric string of length " + length);
    for ( var i = length; i > 0; i--) {
        result += chars[Math.round(Math.random() * (chars.length -1))];
        return result;
    }
}
 
function addhttp(url) {
    console.log("Adding http:// prefix to " + url + " if it doesnt already have it.");
 
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
        url = "http://" + url;
    }
    return url;
}