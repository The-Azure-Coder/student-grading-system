const port = process.env.PORT || 8080;

var path = require('path');
var express = require('express');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
const layout = require('express-ejs-layouts')

app.use(layout)
app.use(express.static('public'))
app.use('/images', express.static('images'));
app.set('layout', 'layouts/layout')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'akd#$%BSBPutS0m3thing',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 120000 }
}));
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



var indexRoute = require('./routes/index');
var authRoute = require('./routes/auth');
var studentRoute = require('./routes/students');
var gradesRoute = require('./routes/grades');
var reportRoute = require('./routes/report');

app.use('/students', studentRoute);
app.use('/grades', gradesRoute);
app.use('/auth', authRoute);
app.use('/', indexRoute);
app.use('/report', reportRoute);

app.listen(port, () => console.log(`Listening on port ${port}..`));







