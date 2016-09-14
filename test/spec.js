var assert = require('chai').assert;
var expect = require('chai').expect;
 
var mongoose = require('mongoose'); 
var config = require('../config'); 
var routes = require('../routes/index');

//passing the app to supertest for site setup
var app = require('../app'); 
var request = require('supertest')(app);

describe('Router Paths', function () {
    // microservice url to be tested 
    var url = config.webhost;
 
    it('responds to /', function indexRoute(done) {
        request.get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200)
        .end(function (err, res) {
            var expectedResponse = {};
            if(err) {
                throw err;
            }
            expect(res.body).to.equal(expectedResponse);
            done(); 
        }); 
    });

    it('responds to /:short', function testSlash(done) {
        request
        .get('/:short')
        .expect(200, done);
    });

    it('responds to /new/:url', function testSlash(done) {
        request
        .get('/new/:url')
        .expect(200, done);
    });

    it('responds to /', function testSlash(done) {
        request
        .get('/')
        .expect(200, done);
    });

    it('responds to /', function testSlash(done) {
        request
        .get('/')
        .expect(200, done);
    }); 
     
    /*
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
    });*/
});
