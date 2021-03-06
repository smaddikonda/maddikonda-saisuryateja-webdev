var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//initialize cookie-parser, session and passport
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');

app.use(session({
    secret: 'this is the secret',//process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//require statements for the test and assignment modules
require ("./test/app.js")(app);
require("./assignment/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);