'use strict';
var Reflux = require('reflux');

var Actions = Reflux.createActions([
  "load",
  "resize",
  "clickMap",
  "searchAddress",
  "changeRadius",
  "clickPin",
]);

module.exports = Actions;