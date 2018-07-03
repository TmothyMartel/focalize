'use strict'

function loginEventHandler() {
	$('.login-form').on('submit', function(event) {
		event.preventDefault();
		const username = $('#user-name').val();
		const password = $('#password').val();
		$.ajax({
			url: "/api/auth/login",
			data: JSON.stringify({
				username, 
				password
			}),
			error: function(error) {
				let errorLocation = error.responseJSON.location;
				let errorMessage = error.responseJSON.message;
				$('.error-message').html(`Oops! ${errorLocation}: ${errorMessage}`);
				console.log('error', error);
			},
			success: function(data) {
				console.log(data.authToken);
				localStorage.setItem('token', data.authToken);
				location.replace('/dashboard.html');
			},
			type: 'POST',
			contentType: 'application/json'
		});
	})
}

$(loginEventHandler);