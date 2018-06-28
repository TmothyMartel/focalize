'use strict'

let authToken = localStorage.getItem('token');

if (!authToken) {
	location.replace('/login.html');
}


// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });