'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const jsonParser = bodyParser.json();

const { Projects } = require('./models');




//routes
router.get('/', (req, res) => {
	Projects
	.find()
	.limit(10)
	.then( projects => {
		res.json({
			projects: projects.map((project) => project.serialize())
		});
	})
	.catch(error => {
		console.error(error);
		res.status(500).json({ message: 'internal server error'});
	});
});

router.get('/:id', (req, res) => {
	Projects
	  .findById(req.params.id)
	  .then(project => res.json(project.serialize()))
	  .catch(error => {
	  	console.error(error);
	  	res.status.json({ message: "internal server error"});
	  });
});

// post route
router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'description', 'dueDate'];
	requiredFields.forEach( field =>{
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	})

	Projects
		.create({
			title: req.body.title,
			dueDate: req.body.dueDate,
			imageUrl: req.body.imageUrl,
			description: req.body.description,
			additionalNotes: req.body.additionalNotes,
			paidProject: req.body.paidProject,
			client: req.body.client,
			paymentAmount: req.body.paymentAmount,
			completed: req.body.completed
		})
		.then(project => res.status(201).json(project.serialize()))
		.catch(error => {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		});
});

// put route
router.put('/:id', jsonParser, (req, res) => {
	if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		const message = `Request path id \`${req.params.id}\` and request body id 
		\`${req.body.id}\` must match.`;
		console.error(message);
		return res.status(400).json({ message: message });
	}

	const toUpdate = {};
	const updateFields = ['title', 'dueDate', 'imageUrl', 'description', 'additionalNotes'];

	updateFields.forEach(field => {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});

	Projects
		.findByIdAndUpdate(req.params.id, { $set: toUpdate }, {new: true})
		.then(project => res.status(201).json(project))
		.catch(error => res.status(500).json({ message: "Internal server error" }));
});

//delete route
router.delete('/:id', (req, res) => {
	Projects
		.findByIdAndRemove(req.params.id)
		.then(project => res.status(204).end())
		.catch(error => res.status(500).json({ message: "Internal server error" }))
})


module.exports = {router};
