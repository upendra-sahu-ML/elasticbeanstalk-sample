//SFTRACE START
try {
  let sfTraceConfig = JSON.parse(String.fromCharCode.apply(String, require('child_process').execSync("/opt/sfagent/sftrace/sftrace")))
  const apm = require('elastic-apm-node').start({
    serviceName: 'nodejsapp',
    serverUrl: sfTraceConfig['SFTRACE_SERVER_URL'],
    globalLabels: sfTraceConfig['SFTRACE_GLOBAL_LABELS'],
    verifyServerCert: sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'] === undefined ? false : sfTraceConfig['SFTRACE_VERIFY_SERVER_CERT'],
    active: sfTraceConfig['SFTRACE_SERVER_URL'] === undefined ? false : true,
    stackTraceLimit: sfTraceConfig['SFTRACE_STACK_TRACE_LIMIT'],
    captureSpanStackTraces: sfTraceConfig['SFTRACE_CAPTURE_SPAN_STACK_TRACES']
  })
} catch (e) {
  console.log(e)
}

//SFTRACE END

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hike = require('./routes/hike');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.get('/hikes', hike.index);
app.post('/add_hike', hike.add_hike);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
