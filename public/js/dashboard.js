'use strict'


if (!authToken) {
	location.replace('/login.html');
}

let state = {
	projects: []
}

//ajax request for project list
function getProjects() {
	$.ajax({
		url: "/api/projects",
		error: function(error) {
			console.log('error', error);
		},
		success: function(data) {
			state.projects = data.projects;
			displayProjectsList(data.projects);
		},
		headers: {
			'Authorization': 'Bearer ' + authToken
		},
		type: 'GET',
		contentType: 'application/json'
	});
}

//to display the array of projects on the page
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

// render function for project list item
function projectsRender(project) {
	return `
	<li>
		<div class="${project.completed ? 'project-card-complete' : 'project-card'} project-link" data-id="${project.id}">
			<div class="project-icon">
				<img  class="project-icon" src="${project.completed ? 'images/complete-planning.svg' : project.imageUrl }" alt="project icon">
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

// event listener to take user to individual project
function linkEventListener() {
	$('.wrapper').on('click', '.project-link', event => {
		let projectId = $(event.currentTarget).attr('data-id');
		location.replace('/project.html?projectId=' + projectId);
	});
}




function handler() {
	getProjects();
	linkEventListener();
}

$(handler);