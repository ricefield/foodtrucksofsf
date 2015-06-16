'use strict';
var Reflux = require('reflux');

var Actions = Reflux.createActions([
  "load",
  "setMapNode",
  "resize",
  "clickMap",
  "searchAddress",
  "changeRadius",
  "clickMarker",
]);

module.exports = Actions;