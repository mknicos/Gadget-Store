'use strict';

var Item = require('./../models/item');

exports.getItems = function(req, res){
  var db = global.mdb;
  var items = db.collection('items');

  items.find().toArray(function(err, records){
    if(err){ throw err;}
    res.send({items:records});
  });
};

exports.createItem = function(req, res){
  var db = global.mdb;
  var items = db.collection('items');
  var item = new Item(req.body);

  items.insert(item, function(err, record){
    if(err){ throw err;}
    console.log('record');
    console.log(record);
    res.send(record);
  });

};
