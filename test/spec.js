var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should(); 
var ejs = require('ejs'); 
 
var mongoose = require('mongoose'); 
//var config = require('../config'); 
var routes = require('../routes/index');

//passing the app to supertest for site setup
var app = require('../app'); 
var request = require('supertest')(app);

describe('Router Paths', function () {
    // microservice url to be tested 
    //var url = config.webhost;
 
    it('responds to /', function indexRoute(done) {
        request.get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200)
        .expect(function (res, err) {
            console.log(res);
            console.log(res.text); 
            var html = ejs.render('../views/index.html');
            res.should.match("<title>URL Shortener - Jedediah</title>"); 
            res.text.should.have.length(1803)
            
            //expect(res.body).to.have.length(1803);
            //expect(res.boy).to.contain('<title>URL Shortener - Jedediah</>'); 
            done(); 
        }); 
    });

    it('should return a shortened url form /new', function(done) {
        var path = 'new/?url=http://iscsuspension-na.com/store/#!/BMW-3-Series-06-11-E90-E91-E92-X-Drive-ISC-Adjustable-Coilover-Car-Suspension/p/52902083/category=12617117'; 
        var original = 'http://iscsuspension-na.com/store/#!/BMW-3-Series-06-11-E90-E91-E92-X-Drive-ISC-Adjustable-Coilover-Car-Suspension/p/52902083/category=12617117'
        request.get(path)
        .expect('Content-Type', 'JSON')
        .expect(200)
        .end(function(err, res) {
            if (err) {
                throw err;
            }
            res.body.should.have.property('original_url');
            res.body.should.have.property('short_url'); 
            res.body.original_url.should.equal(original);
            done(); 
        });
    }); 

    it('should return a shortened url form /short', function(done) {
        var path = 'short/?url=rk7kfoH2'; 
        var original = 'https://careercup.com/page'
        request.get(path)
        .expect('Content-Type', 'JSON')
        .expect(200)
        .end(function(err, res) {
            if (err) {
                throw err;
            }
            res.body.should.have.property('original_url');
            res.body.should.have.property('short_url'); 
            res.body.original_url.should.equal(original);
            done(); 
        });
    }); 


    it('should redirect to proper stored url /:id', function (done) {
        var id = 'BJLOMML3';
        request.get('/BJLOMML3')
        .expect('Content-Type', 'JSON')
        .expect(302)
        .expect('Location', )
        .end(function (err, res) {
            if(err) {
                throw err;
            }
            done(); 
        }); 
    });

    it('responds to /:short', function testSlash(done) {
        request
        .get('/:short')
        .expect(200)
        .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('responds to /new/', function testSlash(done) {
        var url = ''
        request
        .get('/new/')
        .expect(200)
        .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('responds to /', function testSlash(done) {
        request
        .get('/')
        .expect(200)
        .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('responds to /', function testSlash(done) {
        request
        .get('/')
        .expect(200)
        .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    }); 
     

    it('should redirect', function(done) {
        var redirects = [];
        request.get('/new/:url')
        .on('redirects', function(res) {
            redirects.push(res.headers.location);
        })
        .end(function(err, res) {
            try {
                var arr = [];
                arr.push('/');
                arr.push('/new/:url');
                arr.push('/:short');
                redirects.should.eql(arr);
                res.text.should.equal(' ');
                done();
            } catch(err) {
                done(err); 
            }
        }
    });


    reqest.post('/new/')
    .type('form')
    .send(data)
    .set('Accept', /applicatoin\/json/)
    .expect(200)
    .end(function (err, res) {
        done(); 
    });
*/
});
