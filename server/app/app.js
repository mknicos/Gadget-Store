'use strict';

var dbname = 'gadget-store';
var port = process.env.PORT || 4000;

var debug = require('./lib/request-debug');
var connectMongo = require('./lib/mongodb-connection-pool').initialize(dbname);

var express = require('express');
var home = require('./routes/home');
var users = require('./routes/users');
var items = require('./routes/items');
var app = express();

/* --- pipeline begins */
app.use(connectMongo);
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(require('./lib/cors'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', debug, home.index);
app.get('/users', debug, users.getUsers);
app.post('/users', debug, users.createUser);
app.get('/items', debug, items.getItems);
app.post('/items', debug, items.createItem);
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

