'use strict';

var User = require('./../models/user');

exports.create = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');

  var user = new User(req.body);
  users.insert(user, function(err, record){
    res.send(record);
  });

};
