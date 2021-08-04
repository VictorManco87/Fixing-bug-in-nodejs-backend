
// Imports
const express = require('express');
const delimiters = require('handlebars-delimiters');
const handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const appController = require('./controller/app.controller');
const config = require("exp-config");
var cookieParser = require('cookie-parser')

const TEMPLATE_DIRECTORY = process.env.TEMPLATES || __dirname + '/../views/';
const STATIC_DIRECTORY = process.env.TEMPLATES_STATIC || __dirname + '/../static/assets/';

// Express Server setup
const app = express();
app.use(cookieParser());
const port = 8085;

// Custom Handle syntax to avoid VueJS conflict
delimiters(handlebars,  ['{%', '%}']);

// Template Engine setup
app.engine('html', expressHandlebars({
    extname: 'html',
    
    layoutsDir: TEMPLATE_DIRECTORY,
    partialsDir: TEMPLATE_DIRECTORY + '/partials/'
}));

console.log('Template directory set to %s', TEMPLATE_DIRECTORY);

app.set('view engine', 'html');
app.set('views', TEMPLATE_DIRECTORY);

// Controller endpoint setup
app.get('/', function(req, res) { res.redirect('/app/instanthome'); });
app.get('/app/:app/:view*?', appController.appView);
app.get('/public/:app/:view*?', appController.appView);
app.get('/login', appController.loginView);
app.get('/error/:error', appController.errorView);
app.use('/assets', express.static(STATIC_DIRECTORY));

app.use(function(err, req, res, next){
    res.render('500', { layout: false, static: config });
});

// Start application
app.listen(port, () => console.log('Express Server listening on port %d in %s mode', port, app.get('env')));