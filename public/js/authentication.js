'use strict'

let authToken = localStorage.getItem('token');

// checks if user is logged in or not to desplay the proper nav links
if (!authToken) {
	$('.login-nav').append(loggedOutRender);
} else {
	$('.login-nav').append(loggedInRender);
}


function loggedOutRender() {
	return `
		<a href="/signup.html" class="sign-up-link logo-style" >Sign up</a>
		<a href="/login.html" class="login logo-style">login</a>
	`
}

function loggedInRender() {
	return `
		<a href="/dashboard.html" class="dashboard logo-style">Dashboard</a>
		<a href="#" class="logout logo-style">logout</a>
	`
}

// to log out just need to remove token.

function logoutHandler() {
	$('.logout').on('click', event => {
		event.preventDefault();
		authToken = localStorage.setItem('token','');
		location.replace('/');
	});
}

$(logoutHandler);

