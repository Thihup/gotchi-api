require("dotenv-safe").load();
const viewEngine = require('express-json-views');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const signinRouter = require('./routes/auth/signin');
const signupRouter = require('./routes/auth/signup');
const userRouter = require('./routes/secured/userRouter');

var app = express();

// view engine setup
app.engine('json', viewEngine({
    helpers: {}
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'json');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Content-Type", 'application/json');
    next();
});

app.use('/auth/signin', signinRouter);
app.use('/auth/signup', signupRouter);
app.use('/secured/', verifyJWT, userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        data: res.locals
    });
});

module.exports = app;

function verifyJWT(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});

    jwt.verify(token.replace("Bearer ", ""), process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        req.userId = decoded.id;
        next();
    });
}