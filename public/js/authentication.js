'use strict'

let authToken = localStorage.getItem('token');

if (!authToken) {
	location.replace('/login.html');
}

// function logoutHandler() {
// 	$('.logout').on('click' event => {
// 		event.preventDefault();
// 		location.replace('/logout');
// 	});
// }


// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });