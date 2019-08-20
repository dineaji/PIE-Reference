`use strict`

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect();
let request = require('request');

chai.use(chaiHttp);

/*
* Test the /login route
*/
describe('/GET login', function() {
	it('it should open login page',(done) => {
			chai.request(server)
			.get('/login')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
});

/*
* Test the /POST login route
*/
describe('/POST login', () => {
	it('it should not login without a valid username & password', (done) => {
		let body = {
			username: "chennap1",
			password: "badpassword"
		}
		chai.request(server)
		.post('/login')
		.send(body)
		.end((err, res) => {
            res.should.have.status(401);
              done();
          });
	});
});

/*
* Test the /logout route
*/
describe('/logout', function(){
	it('it should logout',(done) => {
			chai.request(server)
			.get('/logout')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
});

/*
* Test the / home page route
*/
describe('/', function(){
	it('it should open the home page',(done) => {
			chai.request(server)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
});

/*
* Test the various team search results
*/
describe('Search results', function(){
	//Default
	it('Default',(done) => {
			chai.request(server)
			.get('/searchresults')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
	//Fisher Price Brands
	it('Fisher-Price Brands',(done) => {
			chai.request(server)
			.get('/searchresults/FisherPriceBrands')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
	//Fisher Price Friends
	it('Fisher-Price Friends',(done) => {
			chai.request(server)
			.get('/searchresults/FisherPriceFriends')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
	//Mattel Boys
	it('Mattel Boys',(done) => {
			chai.request(server)
			.get('/searchresults/MattelBoys')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
	//Mattel Girls
	it('Mattel Girls',(done) => {
			chai.request(server)
			.get('/searchresults/MattelGirls')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
});

/*
* Test the team pages
*/
describe('Team Pages', function(){
	//Cars Brands
	it('Cars (exists)',(done) => {
			chai.request(server)
			.get('/teams/cars')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
	//Adult Games
	it('Adult Games (exists)',(done) => {
			chai.request(server)
			.get('/teams/adultgames')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
	//Random page
	it('Non-existant page, should not load',(done) => {
			chai.request(server)
			.get('/teams/xxyyzz')
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
		});
	
});

/*
* Test the project pages
*/
describe('Project Pages', function(){
	//Adult Games Project page
	describe('Adult Games',function(){
		it('Existing page',(done) => {
			chai.request(server)
			.get('/teams/adultgames/EN254')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
		it('Non-existant page',(done) => {
			chai.request(server)
			.get('/teams/adultgames/xxyyzz')
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
		});
	});
	//Cars Project page
	describe('Cars',function(){
		it('Existing page',(done) => {
			chai.request(server)
			.get('/teams/cars/300552')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
		it('Non-existant page',(done) => {
			chai.request(server)
			.get('/teams/cars/xxyyzz')
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
		});

	});
});