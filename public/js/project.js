'use strict'

let projectId;

function getSingleProject() {
	let searchParams = new URLSearchParams(window.location.search)
	projectId = searchParams.get('projectId')
   	console.log(projectId)
	$.ajax({
			url: `/api/projects/${projectId}`,
			error: function(error) {
				console.log('error', error);
			},
			success: function(data) {
				let renderedProject = singleProjectRender(data);
				$('.project-display').html(renderedProject);
				console.log(data);
			},
			headers: {
				'Authorization': 'Bearer ' + authToken
			},
			type: 'GET',
			contentType: 'application/json'
		});  
}

function singleProjectRender(project) {
	return `
		<h2 class="title">${project.title}</h2>
			<article class="project-grid">
				<div class="project-info">
					<img src="${project.imageUrl ? project.imageUrl : "images/planning.svg"}" class="project-img" alt="project image">
					<ul>
						<li>Due: ${project.dueDate}</li>
						<li>Client: ${project.client ? project.client : "N/A"}</li>
						<li>Payment: ${project.paymentAmount}</li>
					</ul>
				</div>
				<div class="description card">
					<p>${project.description}</p>
				</div>
				<div class="notes card">
					<p>${project.additionalNotes}</p>
				</div>
			</article>
	`
}

function deleteEventListener() {
	$('.delete-btn').on('click', event => {
		event.preventDefault();
		$.ajax({
			url: `/api/projects/${projectId}`,
			error: function(error) {
				console.log('error', error);
			},
			success: function(data) {
				location.replace('/dashboard.html')
			},
			headers: {
				'Authorization': 'Bearer ' + authToken
			},
			type: 'delete',
			contentType: 'application/json'
		});  
	})
}

function updateEventListener() {
	$('.edit-btn').on('click', event =>{
		location.replace('/create.html?projectId=' + projectId);
	})
}



$( function() {
	getSingleProject();
	deleteEventListener();
	updateEventListener();
});
