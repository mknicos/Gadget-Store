'use strict';

module.exports = function(object){
  this.name = object.name || '';
  this.cash = parseInt(object.deposit) || 0;
  this.itemsOwned = [];
};
