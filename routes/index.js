var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var config = require('../config');
var mLab = 'mongodb://' + config.db.host + '/' + config.db.name;
var MongoClient = mongodb.MongoClient

var shortid = require('shortid');
// removes underscores and dashes from possible characterlist
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

var validUrl = require('valid-url');

// GET homepage
router.get('/', function (req, res, next) {
  var local = req.get('host');
  res.render('index', {host: local });
});

// GET with url param, validate url, exists, if not create short url
router.get('/new', function (req, res, next) {
   //:url(*)
  MongoClient.connect(mLab, function (err, db) {
    if (err) {
      console.log("Unable to connect to mlab server", err);
    } else {
      console.log("Connected to mlab server")

      var collection = db.collection('links');
      var params = req.query.url;
      
      //sets current hostname to var local
      var local = req.get('host') + "/";

      var newLink = function (db, callback) {
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
              res.json({ error: "Invalid url format, please make sure you have a valid link." });
            };
          };
        });
      };

      newLink(db, function () {
        db.close();
      });

    };
  });

});

router.get('/short', function (req, res, next) {

  MongoClient.connect(mLab, function (err, db) {
    if (err) {
      console.log("Unable to connect to mlab server", err);
    } else {
      console.log("Connected to mlab server")

      var collection = db.collection('links');
      var params = req.query.url;
      var local = req.get('host') + "/";
      var findLink = function (db, callback) {
        collection.findOne({ "short": params }, { url: 1, _id: 0 }, function (err, doc) {
          if (doc != null) {
            res.json({ original_url: doc.url, short_url: local + params }); 
          } else {
            res.json({ error: "No corresponding shortlink found in the database." });
          };
        });
      };

      findLink(db, function () {
        db.close();
      });

    };
  });
});

router.get('/:id', function (req, res, next) {
  var params = req.params.id;
  MongoClient.connect(mLab, function (err, db) {
    if (err) {
      console.log("Unable to connect to mlab server", err);
    } else {
      console.log("Connected to mlab server")

      var collection = db.collection('links');
      var local = req.get('host') + "/";

      var findLink = function (db, callback) {
        collection.findOne({ "short": params }, { url: 1, _id: 0 }, function (err, doc) {
          if (doc != null) {
            res.redirect(301, doc.url); 
          } else {
            res.json({ error: "No corresponding shortlink found in the database." });
          };
        });
      };

      findLink(db, function () {
        db.close();
      });

    };
  });
});
 
 /*
 router.get('/:id', function(req, res, next) {
   if(req.id === null){
     res.send({error: 'No ID was entered'});
   } else {
     MongoClient.connect(mLab, function (err, db) {
       var collection = db.collection('links');
       var params = req.id;
       var local = req.get('host') + '/';
       var findLink = function (db, callback) {
         collection.findOne({ "short": params }, { url: 1, _id: 0 }, function (err, doc) {
         if(doc != null) {
           res.redirect(doc.url);
           res.send('<meta http-equiv="refresh" content="0;url=http://'+ doc.url +'">');
          } else {
            res.json({ error: "No corresponding shortlink found in the database for " + params + "." });
          };
        });
       };

       findLink(db, function () {
         db.close();
        });
      })
    }
 })
 */
module.exports = router;
