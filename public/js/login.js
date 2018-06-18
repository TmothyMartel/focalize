'use strict'

function loginEventHandler() {
	$('.login-form').on('submit', function(event) {
		event.preventDefault();
		const username = $('#user-name').val();
		const password = $('#password').val();
		$.ajax({
			url: "/api/auth/login",
			data: {
				username, 
				password
			},
			error: function(error) {
				console.log('error', error);
			},
			success: function(data) {
				console.log(data);
				localStorage.setItem('token', data.authToken);
			},
			type: 'POST'
		});
	})
}

$(loginEventHandler);