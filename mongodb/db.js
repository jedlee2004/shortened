var shortid = require('shortid');
 
// removes underscores and dashes from possible characterlist
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

var validUrl = require('valid-url');

exports.newLink = function (db, callback) {
    collection.findOne({ "url": params }, { short: 1, _id: 0 }, function (err, doc) {
        if (doc != null) {
            res.json({ original_url: params, short_url: local + doc.short });
        } else {
        if (validUrl.isUri(params)) {
            // if URL is valid, do this
            var shortCode = shortid.generate();
            var newUrl = { url: params, short: shortCode };
            collection.insert([newUrl]);
            res.json({ original_url: params, short_url: local + shortCode });
        } else {
        // if URL is invalid, do this
            res.json({ error: "Wrong url format, make sure you have a valid protocol and real site." });
        };
    };
});