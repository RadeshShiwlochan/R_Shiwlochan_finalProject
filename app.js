var express = require('express');
var promise = require('bluebird');
var path = require('path');

var app = express();

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var db = pgp('postgres://localhost:5432/todolist');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//create a user
app.post('/users', function(req,res, next) {
	var newUser = req.body;

	db.none('INSERT INTO users(username,password)'+
	'values(${username},${password})',req.body)
	.then(function(data) {
		res.render('todoApp', {data: data});
		//res.redirect('/users');
	})
	.catch(function(err) {
		return next(err);
	}); 
});

// app.post('/users', function(res,req,next) {
// 	db.none('INSERT INTO thingstodo(idnum, item)' +
// 	'values(${idnum},${item})', req.body)
// 	.then(function() {
// 		res.redirect('/users');
// 	})
// 	 .catch(function(err) {
// 	 	return next(err);
// 	 });
// });

//to list all the users in the database
app.get('/users', function(req, res, next) {
	db.any('SELECT * FROM users').
	then(function(data) {
		res.render('login', {data: data});
	})
	.catch(function(err) {
		return next(err);
	});
});

app.listen(3000, function() {
	console.log("listening on port 3000");
});