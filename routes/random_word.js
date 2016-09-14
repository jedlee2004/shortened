var request = require('request');
var config = require('../config');

exports.random_word = function(req, res) {
    var options = {
        url: config.random_api, 
        method: 'GET'
    };
    request(options, function(error, response, body) {
        if(error) {
            return console.log('Error:', error); 
        }
        if(response.statusCode !== 200){ 
            return console.log('Invalid status code returned', response.statusCode);
        }
        console.log(response); 
        res.json(response); 
    });
}