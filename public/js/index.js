'use strict'

const projects = [
	
	{
		title: "Photoshoot in Central Park",
		dueDate: "July 8, 2018"
	},
	{
		title: "Hudson Wedding",
		dueDate: "July 18, 2018"
	},
	{
		title: "Brooklyn Bridge",
		dueDate: "August 3, 2018"
	},
	{
		title: "Photoshoot in Prospect Park",
		dueDate: "August 8, 2018"
	},
]


function displayProjectsList(array) {
	const projectList = array.map(project => projectsRender(project));
	$('#display-projects').html(projectList);		
}




function projectsRender(index) {
	return `
		<li>
			<a href="/project.html" class="project-link"><div class="project-card">
				<div class="project-icon">
					<img  src="images/planning.svg" alt="project icon">
				</div>
				<div class="project-text"> 
					<p class="project-title">${index.title}</p>
				</div>
				<div class="due-date">
					<p >Due: ${index.dueDate}</p>
				</div>
			</div>
			</a>
		</li>
	`
}


function yesRadioEventHandler() {
	$('#yes').on('change', function() {
		$('.client-info').show();
	});
}

function noRadioEventHandler() {
	$('#no').on('change', function() {
		$('.client-info').hide();
	});
}

function handler() {
	displayProjectsList(projects);
	yesRadioEventHandler();
	noRadioEventHandler();
}

$(handler);