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

function getProjects() {
	$.ajax({
			url: "/api/projects",
			error: function(error) {
				console.log('error', error);
			},
			success: function(data) {
				console.log(data);
				displayProjectsList(data.projects);
			},
			type: 'GET',
			contentType: 'application/json'
		});
}

function displayProjectsList(array) {
	$('#display-projects').html('');
	$('#display-completed-projects').html('');
	const projectList = array.forEach(project => {
		let renderedProject = projectsRender(project);
		if (project.completed) {
			$('#display-completed-projects').append(renderedProject);
		} else {
			$('#display-projects').append(renderedProject);
		}
	}); 		
}




function projectsRender(project) {
	return `
		<li>
			<a href="/project.html" class="project-link"><div class="${project.completed ? 'project-card-complete' : 'project-card'}">
				<div class="project-icon">
					<img  src="images/${project.completed ? 'complete-planning.svg' : 'planning.svg'}" alt="project icon">
				</div>
				<div class="project-text"> 
					<p class="project-title">${project.title}</p>
				</div>
				<div class="due-date">
					<p >Due: ${project.dueDate}</p>
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
	//displayProjectsList(projects);
	yesRadioEventHandler();
	noRadioEventHandler();
	getProjects();
}

$(handler);