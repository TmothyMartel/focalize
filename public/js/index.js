'use strict'


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
			headers: {
				'Authorization': 'Bearer ' + authToken
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

//<a href="/project.html" class="project-link"></a>
function projectsRender(project) {
	return `
		<li>
			<div class="${project.completed ? 'project-card-complete' : 'project-card'} project-link">
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
		</li>
	`
}



function handler() {
	getProjects();
}

$(handler);