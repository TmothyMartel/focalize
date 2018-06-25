'use strict'

function createProject() {
	$('.create-form').on('submit', event => {
		event.preventDefault();
		let project = {
			 title: $('#title').val(),
			 month: $('#month').val(),
			 day: $('#day').val(),
			 year: $('#year').val(),
			 date: `${month} ${day}, ${year}`,
			 image: $('#image').val(),
			 description: $('#description').val(),
			 additionalNotes: $('#notes').val()
		}
		return console.log(project);
	});
}


// function paidChecked() {
// 	if()
// }

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
	createProject();
}

$(handler);