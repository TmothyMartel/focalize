'use strict'


function createProject() {
    $('.create-form').on('submit', event => {
        event.preventDefault();
        
        let month = $('#month').val();
    	let day = $('#day').val();
    	let year = $('#year').val();
    	let dateString = `${month} ${day}, ${year}`;
    	let title = $('#title').val(),
   	     	dueDate = dateString,
   	     	image = $('#image').val(),
   	    	description = $('#description').val(),
  	     	additionalNotes = $('#notes').val(),
  	     	client = $('#client').val(),
			amount = $('#amount').val();
        $.ajax({
            url: "/api/projects",
            data: JSON.stringify({
            	title,
            	dueDate,
            	image,
            	description,
            	additionalNotes,
            	client,
            	amount	
			}),
            error: function(error) {
                console.log('error', error);
            },
            headers: {
				'Authorization': 'Bearer ' + authToken
			},
            success: function(data) {
            	location.replace('/dashboard.html');
            },
            type: 'POST',
            contentType: 'application/json'
        });
    });
}

function radioHandlers () {
	yesRadioEventHandler();
	noRadioEventHandler();
}

function yesRadioEventHandler() {
    $('#yes').on('change', function() {
    	paidProject = true
        $('.client-info').show();
    });
}

function noRadioEventHandler() {
    $('#no').on('change', function() {
    	paidProject = false;
        $('.client-info').hide();
    });
}

function handler() {
	yesRadioEventHandler();
	noRadioEventHandler();
    createProject();
}

$(handler);