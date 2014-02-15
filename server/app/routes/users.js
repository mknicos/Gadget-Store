'use strict';

var User = require('./../models/user');

exports.getUsers = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');
  users.find().toArray(function(err, records){
    if(err){ throw err;}
    res.send({users:records});
  });
};

exports.createUser = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');

  var user = new User(req.body);
  users.insert(user, function(err, record){
    if(err){ throw err;}
    res.send(record);
  });

};
