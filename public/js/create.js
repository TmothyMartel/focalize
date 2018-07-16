'use strict'

let projectId;
let paidProject;
let updateId;
let completed;


if (!authToken) {
    location.replace('/login.html');
}

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
             updateId = projectId;
             populateFields(data);
             completeQuestionHandler();
         },
         headers: {
            'Authorization': 'Bearer ' + authToken
        },
        type: 'GET',
        contentType: 'application/json'
    });
    }  
}

// populates the input field when updating
function populateFields(project) {
   $('#title').val(project.title);
   $('#datepicker').val(project.dueDate);
   $('#description').val(project.description);
   $('#notes').val(project.additionalNotes);
   $('.is-completed').html(completedQuestionRender());
    $('#client').val(project.client),
    $('#amount').val(project.paymentAmount);
    project.paidProject ?  $('#yes').attr('checked', 'checked') && $('.client-info').show() : $('#no').attr('checked', 'checked');
    project.completed ?  $('#complete').attr('checked', 'checked') : $('#incomplete').attr('checked', 'checked')
}

// renders option to make a project complete. only shows when updating a project
function completedQuestionRender() {
    return ` 
        <legend class="complete-legend">Have you completed this project?</legend>
        <label for="radio">Yes:</label>
        <input type="radio" id="complete" name="complete">
        <label>No:</label>
        <input type="radio" id="incomplete" name="complete">`
}

//handler for marking a project complete
function completeQuestionHandler() {
     markComplete();
     markIncomplete();
}

function markComplete() {
    $('#complete').on('change', function() {
         completed = true;
    });
}

function markIncomplete() {
    $('#incomplete').on('change', function() {
         completed = false;
    });
}

//function for date picture
function dateSelection() {
  $( "#datepicker" ).datepicker({
    gotoCurrent: true
  });

}

//ajax post and put requests
function createProject() {
    $('.create-form').on('submit', event => {
        event.preventDefault();
        
        let title = $('#title').val(),
        dueDate = $('#datepicker').val(),
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
                completed,
                id : updateId, 
                
            }),

            error: function(error) {
                let errorMessage = error.responseJSON.message;
                $('.error-message').html(`Oops! ${errorMessage}`);
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
            settings.success = location.replace(`/project.html?projectId=${updateId}`)
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
    $('#yes').on('click', function() {
        $('.client-info').show();
         paidProject = true;
    });
}

function noRadioEventHandler() {
    $('#no').on('change', function() {
        $('.client-info').hide();
        paidProject = false;
    });
}



function handler() {
    createProject();
    getProject();
    radioHandlers();
    dateSelection();
}

$(handler);