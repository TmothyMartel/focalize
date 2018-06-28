'use strict'

let projectId;
let paidProject = false;
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
        imageUrl = $('#image').val(),
        description = $('#description').val(),
        additionalNotes = $('#notes').val(),
        client = $('#client').val(),
        paymentAmount = $('#amount').val();
        let settings = {
            url: "/api/projects",
            data: JSON.stringify({
                title,
                dueDate,
                imageUrl,
                description,
                additionalNotes,
                paidProject,
                client,
                paymentAmount,
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
        $('.client-info').show();
        console.log($('#yes').val())
         paidProject = true;
         console.log(paidProject);
    });
}

function noRadioEventHandler() {
    $('#no').on('change', function() {
        $('.client-info').hide();
        paidProject = false;
        console.log(paidProject);
    });
}

function findOutIfPaid() {
    radioHandlers();
    // if ($('#yes').val() === 'on') {

    //  } else {
    //     paidProject = false;
    //  }
   
}

function handler() {
    createProject();
    getProject();
    findOutIfPaid();

}

$(handler);