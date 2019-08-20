
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
const sql = require(__basedir+'/apps/api/v1/models/db.js');

chai.use(chaiHttp);

var END_PATH = "/api/";

// sql.connect();

//Testing search team list by Brand ID
describe('Team List by Brand ID', () => {
	//Testing with a valid brand id
	it('Test case when a valid Brand ID is provided', (done) => {
		let bodyData = {
			subBrandId: "BOYS" //Enter a valid brand ID here
		}
		chai.request(server)
		.post(END_PATH + 'getTeamList')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			res.body.recordset[0].item_id.should.equal('adultgames');
			done();
		});
	});
	//Testing without a brand id
	it('Test case when Brand ID is blank', (done) => {
		let bodyData = {
			subBrandId: ""
		}
		chai.request(server)
		.post(END_PATH + 'getTeamList')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(417);
			done();
		});
	});
	//Testing with an invalid brand id
	it('Test case when invalid brand id is given', (done) => {
		let bodyData = {
			subBrandId: "xxyyzz"
		}
		chai.request(server)
		.post(END_PATH + 'getTeamList')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(404);
			done();
		});
	});
});

//Testing drop down by Brand Name
describe('Drop downs by Brand Name', () => {
	//Testing with a valid brand name
	it('Test case when a valid Brand name is provided', (done) => {
		let bodyData = {
			brand: "mat", //provide valid values here
			subBrand: "girls"
		}
		chai.request(server)
		.post(END_PATH + 'getBrandFilterDatas')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
	});
	//Testing with an invalid brand name
	it('Test case when an invalid Brand name is provided', (done) => {
		let bodyData = {
			brand: "xxyyzz",
			subBrand: "xxyyzz"
		}
		chai.request(server)
		.post(END_PATH + 'getBrandFilterDatas')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(404);
			done();
		});
	});
});

//Testing search team list projects by Team Name
describe('Team list projects by Team Name', () => {
	//Testing with a valid team name
	it('Test case when a valid Team name is provided', (done) => {
		let bodyData = {
			teamName: "cars" //Enter a valid team name here
		}
		chai.request(server)
		.post(END_PATH + 'getProjects')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
	});
	//Testing without a team name
	it('Test case when team name is blank', (done) => {
		let bodyData = {
			teamName: ""
		}
		chai.request(server)
		.post(END_PATH + 'getProjects')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(417);
			done();
		});
	});
	//Testing with an invalid team name
	it('Test case when invalid team name is given', (done) => {
		let bodyData = {
			teamName: "xxyyzz"
		}
		chai.request(server)
		.post(END_PATH + 'getProjects')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(404);
			done();
		});
	});
});

//Testing search results
describe('Search results by various parameters', () => {
	//Testing with project year
	it('Test case when project year is given', (done) => {
		let bodyData = {
			projectYear: "1999" //Enter a valid project year
		}
		chai.request(server)
		.post(END_PATH + 'getSearchResults')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			done();
		});
	});
	//Testing with project number
	it('Test case when project number is given', (done) => {
		let bodyData = {
			projectNumber: "100010" //Enter a valid project number
		}
		chai.request(server)
		.post(END_PATH + 'getSearchResults')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			done();
		});
	});
	//Testing with product number
	it('Test case when product number is given', (done) => {
		let bodyData = {
			productNumber: "75042" //Enter a valid product number
		}
		chai.request(server)
		.post(END_PATH + 'getSearchResults')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			done();
		});
	});

	//Testing with brand
	it('Test case when brand is given', (done) => {
		let bodyData = {
			brand: "mat" //Enter a valid brand
		}
		chai.request(server)
		.post(END_PATH + 'getSearchResults')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			done();
		});
	});
	//Testing with subBrand
	it('Test case when subBrand is given', (done) => {
		let bodyData = {
			subBrand: "girls" //Enter a valid subBrand
		}
		chai.request(server)
		.post(END_PATH + 'getSearchResults')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			done();
		});
	});
	//Testing with category
	it('Test case when category is given', (done) => {
		let bodyData = {
			category: "LAUGH AND LEARN REG" //Enter a valid category
		}
		chai.request(server)
		.post(END_PATH + 'getSearchResults')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			done();
		});
	});
	//Testing with team
	it('Test case when team is given', (done) => {
		let bodyData = {
			team: "INFANT TOY" //Enter a valid team
		}
		chai.request(server)
		.post(END_PATH + 'getSearchResults')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			done();
		});
	});
	//Testing with projectDescription
	it('Test case when project description is given', (done) => {
		let bodyData = {
			projectDescription: "DOCTOR ACCY" //Enter a valid project description
		}
		chai.request(server)
		.post(END_PATH + 'getSearchResults')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			done();
		});
	});
	//Testing with productDescription
	it('Test case when productDescription is given', (done) => {
		let bodyData = {
			productDescription: "" //Enter a valid product description
		}
		chai.request(server)
		.post(END_PATH + 'getSearchResults')
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			done();
		});
	});
});

//Testing getting product details based on project id
describe('Product Details by project id', () => {
	it('Test case when project id is given' ,(done) => {
		let bodyData = {
			projectNumber: "208326"
		}
		chai.request(server)
		.get(END_PATH + 'getProjectDetail/' + bodyData.projectNumber)
		.send(bodyData)
		.end((err,res) => {
			if(err){throw err}
			res.should.have.status(200);
			done();
		});
	});
});