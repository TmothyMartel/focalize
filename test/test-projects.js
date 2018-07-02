'use strict'

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker')

// const { app, runServer, closeServer } = require('../server');
// const { Projects } = require('../projects');
// const { TEST_DATABASE_URL } = require('../config');
// const NUMBER_OF_PROJECTS = 10
// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('Focalize project resource', () => {
// 	// start the server and connect to test database
// 	before(() => {
// 		return runServer(TEST_DATABASE_URL);
// 	});

// 	after(() => {
// 		return closeServer();
// 	});

// 	describe(' GET endpoint', () => {

// 		it('should return all projects in DB', () => {
// 			let res;
// 			return chai.request(app)
// 			.get('/api/projects')
// 			.then((_res) => {
// 				res = _res;
// 				expect(res).to.have.status(200);
// 			});
// 		});
// 	});
// });