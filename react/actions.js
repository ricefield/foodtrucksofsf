'use strict';
var Reflux = require('reflux');

/*  actions.js
    Actions are registered here and triggered by events in React components.
    They are watched by the Store in store.js to affect state changes.
*/
var Actions = Reflux.createActions([
  "load",
  "resize",  // TODO: resize map on window resize
  "clickMap",
  "searchAddress",  // TODO: add search bar
  "changeRadius",
  "locate",
  "clickMarker",  // TODO: refactor infowindow display
]);

module.exports = Actions;