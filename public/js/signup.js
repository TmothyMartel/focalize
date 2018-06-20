'use strict'

function signupHandler() {
	$('#signup').on('submit', function(event) {
		event.preventDefault();
		const firstName = $('#firstName').val();
		const lastName = $('#lastName').val();
		const username = $('#username').val();
		const password = $('#password').val();
		console.log(username, password, firstName, lastName);
		$.ajax({
			url: "/api/users/",
			data: JSON.stringify({
				username, 
				password,
				firstName,
				lastName
			}),
			error: function(error) {
				// display error on screen
				console.log('error', error);
			},
			success: function(data) {
				console.log(data);
				location.replace('/login.html');
			},
			type: 'POST',
			contentType: 'application/json'
		});
	});
}


$(signupHandler);