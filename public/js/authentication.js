'use strict'

let authToken = localStorage.getItem('token');

if (!authToken) {
	location.replace('/login.html');
}

// to log out just need to remove token.

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