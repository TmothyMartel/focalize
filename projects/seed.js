'use strict'

const seedProjects = [
	{
		id: "p1",
		title: "George Washington Bridge",
		dueDate: "March 21, 2018",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
   		additionalNotes: [
   			"Make sure to check out the little red lighthouse", 
   			"do an instragram story"
   			],
    	paidProject: false,
   	    completed: true
	},	
	{
		id: "p2",
		title: "Photoshoot in Central Park",
		dueDate: "July 8, 2018",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
   		additionalNotes: "The photoshoot will happen on July 3rd and processed pictures delivered by July 8th.",
    	paidProject: true,
    	client: "Upscale Modeling",
    	paymentAmount: 150,
   	    completed: false
	},
	{
		id: "p3",
		title: "Hudson Wedding",
		dueDate: "July 18, 2018",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
   		additionalNotes: "The wedding will happen on July 3rd and processed pictures delivered by July 8th.",
    	paidProject: true,
    	client: "John and Marie Hudson",
    	paymentAmount: 2000,
   	    completed: false
	},
	{
		id: "p4",
		title: "Brooklyn Bridge",
		dueDate: "August 3, 2018",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
   		additionalNotes: "personal project",
    	paidProject: false,
   	    completed: false
	},
	{
		id: "p5",
		title: "Photoshoot in Prospect Park",
		dueDate: "August 8, 2018",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
   		additionalNotes: "Meet up at 7am by park enterance on august 6",
    	paidProject: true,
    	client: "Upscale Modeling",
    	paymentAmount: 150,
   	    completed: false
	},
	{
		id: "p6",
		title: "Central Park Zoo photoshoot",
		dueDate: "March 21, 2018",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
   		additionalNotes: "Meet up at 10am by park enterance on March 18",
    	paidProject: true,
    	client: "Upscale Modeling",
    	paymentAmount: 150,
   	    completed: true
	}
]

module.exports = {seedProjects};