// 'use strict'

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');

// const { app, runServer, closeServer } = require('../server');
// const { Projects } = require('../projects/models');
// const { User } = require('../users/models')
// const { TEST_DATABASE_URL } = require('../config');
// const NUMBER_OF_PROJECTS = 10;
// const expect = chai.expect;

// chai.use(chaiHttp);

// function MakeNewUser() {
// 	let user = User.create( {
// 	firstName: "Jane",
// 	lastName: "Dough",
// 	username: "testuser",
// 	password: "password1234"
// });
// 	return user;
// }

// function seedProjectData() {
// 	console.log('seeding project data');
// 	const seedData = [];

// 	for (let i = 1; i <= NUMBER_OF_PROJECTS; i++) {
// 		seedData.push(generateProjectData());
// 	}
// 	return Projects.insertMany(seedData);
// }

// // functions to generate seed data
// function generateProjectData() {
// 	return {
// 		title: faker.lorem.sentence(),
// 		dueDate: faker.date.future(),
// 		description: faker.lorem.paragraph(),
// 		additionalNotes: faker.lorem.paragraph(),
// 		paidProject: faker.random.boolean(),
// 		client:faker.name.title(),
// 		paidAmount: faker.random.number(),
// 		completed:faker.random.boolean(),
// 		// user: 'ObjectId("5b47885c7b65ff5ba4723c8d")'
// 	}
// }

// function tearDownDb() {
// 	return new Promise((resolve, reject) => {
// 		console.warn('Deleting database');
// 		mongoose.connection.dropDatabase()
// 		.then(result => resolve(result))
// 		.catch(error => reject(error));
// 	});
// }

// describe('Focalize project resource', () => {
// 	// start the server and connect to test database
// 	before(() => {
// 		return runServer(TEST_DATABASE_URL);
// 	});
	

// 	// beforeEach(() => {
// 	// 	return seedProjectData();
// 	// });

// 	//delete data from db after tests complete
// 	afterEach(() => {
// 		return tearDownDb();
// 	});

// 	after(() => {
// 		return closeServer();
// 	});

// 	// describe(' GET endpoint', () => {

// 	// 	it('should return all projects in DB', () => {
// 	// 		let res;
// 	// 		return chai.request(app)
// 	// 		.get('/api/projects')
// 	// 		.then((_res) => {
// 	// 			res = _res;
// 	// 			expect(res).to.have.status(200);
// 	// 		});
// 	// 	});
// 	// });

// 	describe('POST endpoint', () => {
// 		it('should add a new project', () => {
// 			const newProject = generateProjectData();
// 			let resProject;

// 			return chai.request(app)
// 			.post('/api/projects/')
// 			.send(newProject)
// 			.then(res => {
// 				expect(res).to.be.status(201);
// 				expect(res).to.be.json;
// 				expect(res.body).to.be.a('object');
// 				expect(res.body).to.include.keys(
// 					'id', 'title', 'description', 'dueDate', 'additionalNotes');
// 				expect(res.body.title).to.equal(newProject.title);
// 				expect(res.body.description).to.equal(newProject.description);
// 				expect(res.body.id).to.not.be.null;
// 				resProject = res.body;
// 				return Projects.findById(resProject.id);
// 			})
// 			.then(project => {
// 				expect(resProject.id).to.equal(project.id);
// 				expect(resProject.title).to.equal(project.title);
// 				expect(resProject.content).to.equal(project.content);

// 			})
// 		});
// 	});
//});