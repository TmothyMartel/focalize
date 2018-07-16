'use strict'

let projectId;

//check if user has auth token
if (!authToken) {
	location.replace('/login.html');
}

// get a single project from the DB
function getSingleProject() {
	let searchParams = new URLSearchParams(window.location.search)
	projectId = searchParams.get('projectId')
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

// renders the project on the page
function singleProjectRender(project) {
	return `
		<h2 class="title">${project.title}</h2>
			<article class="project-grid">
				<div class="project-info">
					<img src="${project.imageUrl ? project.imageUrl : "images/planning.svg"}" class="project-img" alt="project image">
					<ul>
						<li class="project-item"><strong>Due:</strong> ${project.dueDate}</li>
						<li class="project-item"><strong>Client:</strong> ${project.client ? project.client : "N/A"}</li>
						<li class="project-item"><strong>Payment:</strong> $${project.paymentAmount}</li>
					</ul>
				</div>
				<div class="description card">
				<h3 class="titles">About:</h3>
					<p>${project.description}</p>
				</div>
				<div class="notes card">
				<h3 class="titles">Notes or special instructions:</h3>
					<p>${project.additionalNotes}</p>
				</div>
			</article>
	`
}

//event listener for delete project modal
function modalEventListener() {
	$('.modal-btn').on('click', event => {
		event.preventDefault();
		$('.modal').show();
	});
}

function closeModal() {
	$('.close-btn').on('click', event => {
		event.preventDefault();
		$('.modal').hide();
	})
}

//ajax request to delete a project
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
	modalEventListener();
	closeModal();
});
