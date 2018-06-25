'use strict'

let authToken = localStorage.getItem('token');

if (!authToken) {
	location.replace('/login.html');
}