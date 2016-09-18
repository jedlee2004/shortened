var expect = require('chai').expect;
var should = require('chai').should; 
var assert = require('chai').assert; 
var should = require('should'); 

 
//passing the app to supertest for site setup
 
var app = require('../app'); 
var request = require('supertest')(app);
describe('Router Paths', function () {
    // Testing index route for view rendered 
    it('Should return index view form route /', function(done) {
        request.get('/')
        .end(function(err, res) {
            expect('Content-Type', 'text/html; charset=utf-8');
            expect(res.statusCode).to.equal(200);
            expect(res.text).to.have.lengthOf(1803);
            if (err) {
                console.log(err);
                return done(err);
            } 
            done(); 
        });
    });
    // Testing the new route to get shortened url 
    it('Should return short url from /new/:url', function(done) {
        var original = 'http://iscsuspension-na.com/store/'
        request.get('/new/?url=' + original)
        .end(function(err, res) { 
            basic_expect('application/json; charset=utf-8', 200, 92, res);
            res.body.should.have.property('original_url');
            res.body.should.have.property('short_url'); 
            res.body.original_url.should.equal(original);
            if (err) return done(err);
            done(); 
        });
    });
   //Testing shortened url to redirect user to the proper stored link 
   it('Should redirect to proper stored url /:id', function (done) {
        var id = 'BJLOMML3';
        request.get('/' + id)
        .end(function (err, res) {
            basic_expect('application/json; charset=utf-8', 301, 67, res);
            res.header.location.should.equal('https://projecteuler.net/archives');
            if(err) return done(err); 
            done(); 
        }); 
    });
    //Testing route to lengthen url from shortened url 
    it('Should return a lengthened url from /short', function(done) {
        var id = 'rk7kfoH2'; 
        var original = 'https://careercup.com/page'
        request.get('/short/?url=' + id)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            basic_expect('application/json; charset=utf-8', 200, 84, res);
            res.body.should.have.property('original_url');
            res.body.should.have.property('short_url'); 
            res.body.original_url.should.equal(original);
            if (err) return done(err);
            done(); 
        });
    }); 
});

function basic_expect(type, status, length, res) {
        expect('Content-Type', type);
        expect(res.statusCode).to.equal(status);
        expect(res.text).to.have.lengthOf(length);
}