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
