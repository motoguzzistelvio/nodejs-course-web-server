const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view_engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var logEntry = now+' '+req.method+ ' '+req.url;
  console.log(logEntry);
  fs.appendFile('server.log',logEntry+ '\n', (err) => {
    console.log(err);
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maint.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcome: 'Welcome sucker to Evie\'s page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    code: 500,
    message: 'An error occured'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'Aboot Page'
  });
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio Page',
    pageMsg: 'This is the projects page'
  });
});

app.listen(port, () => {
  console.log('Server is runnning on port '+ port);
});
