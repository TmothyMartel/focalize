'use strict'

let projectId;

let updateId;

function getProject() {
    let searchParams = new URLSearchParams(window.location.search)
    projectId = searchParams.get('projectId');
    console.log(projectId);
    if(projectId) {
        $.ajax({
            url: `/api/projects/${projectId}`,
            error: function(error) {
                console.log('error', error);
            },
            success: function(data) {
             console.log(data)
             updateId = projectId;
             populateFields(data);
         },
         headers: {
            'Authorization': 'Bearer ' + authToken
        },
        type: 'GET',
        contentType: 'application/json'
    });
    }  
}

function populateFields(project) {
   $('#title').val(project.title);
   $('#description').val(project.description);
   $('#notes').val(project.additionalNotes);
}



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
        let settings = {
            url: "/api/projects",
            data: JSON.stringify({
                title,
                dueDate,
                image,
                description,
                additionalNotes,
                client,
                amount,
                id : updateId 
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
        };
        if (updateId) {
            settings.url = `api/projects/${updateId}`,
            settings.type = 'PUT'
        }
        $.ajax(settings);
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
    getProject();

}

$(handler);