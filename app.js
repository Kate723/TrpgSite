var ejs = require('ejs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var auth = require('./routers/auth.js');
var test = require('./routers/test.js');
var diceMaid = require('./routers/diceMaid.js');

app.set("views",'./views');
app.set('view engine','ejs');
app.engine('ejs',ejs.__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/',function(req,res){
	res.redirect('/trpg/html/index.html');
});

app.use('/auth',auth);
app.use('/test',test);
app.use('/diceMaid',diceMaid);

var server = app.listen(8081);
