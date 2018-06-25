'use strict'


function getSingleProject() {
	$.ajax({
			url: "/api/projects/:id",
			error: function(error) {
				console.log('error', error);
			},
			success: function(data) {
				console.log(data);
				displaySingleProject(data.project.id);
			},
			headers: {
				'Authorization': 'Bearer ' + authToken
			},
			type: 'GET',
			contentType: 'application/json'
		});
}

function displaySingleProject(project) {
	$('.wrapper').html(singleProjectRender(project)); 		
}

function singleProjectRender(project) {
	return `
		<h2 class="title">${project.title}</h2>
			<article class="project-grid">
				<div class="project-info">
					<img src="images/${project.image}" class="project-img" alt="project image">
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

$(getSingleProject);