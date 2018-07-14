'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const { Projects } = require('../projects/models');
const { User } = require('../users/models')
const {JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const NUMBER_OF_PROJECTS = 10;
const expect = chai.expect;
let token;
chai.use(chaiHttp);

function seedProjectData() {
	console.log('seeding project data');
	const seedData = [];

	for (let i = 1; i <= NUMBER_OF_PROJECTS; i++) {
		seedData.push(generateProjectData());
	}
	return Projects.insertMany(seedData);
}

// functions to generate seed data
function generateProjectData() {
	return {
		title: faker.lorem.sentence(),
		dueDate: faker.date.future(),
		description: faker.lorem.paragraph(),
		additionalNotes: faker.lorem.paragraph(),
		paidProject: faker.random.boolean(),
		client:faker.name.title(),
		paidAmount: faker.random.number(),
		completed:faker.random.boolean(),
	}
}

function tearDownDb() {
	return new Promise((resolve, reject) => {
		console.warn('Deleting database');
		mongoose.connection.dropDatabase()
		.then(result => resolve(result))
		.catch(error => reject(error));
	});
}

describe('Focalize project resource', () => {
	// start the server and connect to test database
	before(() => {
		return runServer(TEST_DATABASE_URL);
	});
	

	beforeEach(() => {
		const username = 'exampleUser';
		const firstName = 'Example';
		const lastName = 'User';
		const password = 'examplePass';
		return User.hashPassword(password).then(password =>
			User.create({
				firstName,
				lastName,
				username,
				password
			})
			).then( () => {
				return seedProjectData();
			}).then(() => {
				token = jwt.sign(
				{
					user: {
						username,
						firstName,
						lastName
					}
				},
				JWT_SECRET,
				{
					algorithm: 'HS256',
					subject: username,
					expiresIn: '7d'
				}
				);
			})
		});

	//delete data from db after tests complete
	afterEach(() => {
		return tearDownDb();
	});

	after(() => {
		return closeServer();
	});

	describe(' GET endpoint', () => {

		it('should return all projects in DB', () => {
			let res;
			return chai.request(app)
			.get('/api/projects')
			.set('authorization', `Bearer ${token}`)
			.then((_res) => {
				res = _res;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.projects).to.be.a('array');
				expect(res.body.projects).to.have.lengthOf(NUMBER_OF_PROJECTS);
			});
		});
	});

	it('should return projects with the right fields', function() {
		let resProject;
		return chai.request(app)
		.get('/api/projects')
		.set('authorization', `Bearer ${token}`)
		.then(res => {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body.projects).to.be.a('array');
			expect(res.body.projects).to.have.lengthOf(NUMBER_OF_PROJECTS);

			res.body.projects.forEach( project => {
				expect(project).to.be.a('object');
				expect(project).to.include.keys('id', 'title', 'description', 'dueDate', 'additionalNotes');
			});

				// set resProject to be first post in db
				resProject = res.body.projects[0];
				return Projects.findById(resProject.id);
			})
		.then(projects => {
				// compare resProject to blogPost to make sure their fields are equal
				expect(resProject.id).to.equal(projects.id);
				expect(resProject.title).to.equal(projects.title);
				expect(resProject.description).to.equal(projects.description);
				expect(resProject.additionalNotes).to.equal(projects.additionalNotes);
				expect(resProject.paidProject).to.equal(projects.paidProject);
			});
	});


	describe('POST endpoint',  () => {
		it('should add a new project', () => {
			const newProject = generateProjectData();
			let resProject;

			return chai.request(app)
			.post('/api/projects/')
			.set('authorization', `Bearer ${token}`)
			.send(newProject)
			.then(res => {
				expect(res).to.be.status(201);
				expect(res).to.be.json;
				expect(res.body).to.include.keys(
					'id', 'title', 'description', 'dueDate', 'additionalNotes');
				expect(res.body.title).to.equal(newProject.title);
				expect(res.body.description).to.equal(newProject.description);
				expect(res.body.id).to.not.be.null;
				resProject = res.body;
				return Projects.findById(resProject.id);
			})
			.then(project => {
				expect(resProject.id).to.equal(project.id);
				expect(resProject.title).to.equal(project.title);
				expect(resProject.description).to.equal(project.description);
				expect(resProject.additionalNotes).to.equal(project.additionalNotes);
				expect(resProject.paidProject).to.equal(project.paidProject);
			});
		});
	});

		describe('PUT endpoint', () => {
		it('should update fields you send over', () => {
			const updateProject = {
				title: faker.lorem.sentence(),
				description: faker.lorem.paragraph()
			};

			return Projects
				.findOne()
				.then(project => {
					updateProject.id = project.id;

				return chai.request(app)
					.put(`/api/projects/${updateProject.id}`)
					.set('authorization', `Bearer ${token}`)
					.send(updateProject);
				})
				.then(res => {
					expect(res).to.have.status(201);
					expect(res.body.title).to.equal(updateProject.title);
					return Projects.findById(updateProject.id);
				})
				.then(project => {
					expect(project.title).to.equal(updateProject.title);
					expect(project.description).to.equal(updateProject.description);
				}); 
		});
	});

	describe('DELETE endpoint', () => {
		it('should delete a project by id', () => {
			let projectId;
			return Projects
			.findOne()
			.then(project => projectId = project._id)
			// return chai.request(app)
			// .get('/api/projects')
			// .set('authorization', `Bearer ${token}`)
			.then(res => {
				return chai.request(app)
				.delete(`/api/projects/${projectId}`)
			})
			.then(res => {
				expect(res).to.have.status(204);
				return Projects.findById(projectId);
			})
			.then(_project => {
				expect(_project).to.be.null;
			});
		});
	});
});