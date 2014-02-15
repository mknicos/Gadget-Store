'use strict';

module.exports = function(object){
  this.name = object.name || 'misc';
  this.cost = parseInt(object.cost) || 0;
  this.quantity = this.quantity;
};
