'use strict';
var Reflux = require('reflux');
var request = require('superagent');
var _ = require('underscore');
var actions = require('./actions.js');

var GoogleMapsAPI = window.google.maps;
var LatLng = GoogleMapsAPI.LatLng;

/*  store.js
    The Store here manages the state for the entire view, listening to actions,
    and triggering state changes (which causes the React components to re-render).
*/
var Store = Reflux.createStore({

  listenables: [actions],

  init: function() {
    this.listenTo(actions.load, this.getTrucks);  // on load, get trucks
  },

  getInitialState: function() {
    this.state = {
      trucks: [],
      center: new LatLng(37.7577, -122.4376),  // center of SF
      radius: 1.0,
      map: null,
      mapHeight: window.innerHeight,
      mapWidth: window.innerWidth,
    };
    return this.state;
  },

  getTrucks: function() {
    // pull new truck data from API and triggers a state change
    request
      .get('/api/nearby')
      .query({ lat: this.state.center.lat(), lon: this.state.center.lng(), radius: this.state.radius})
      .end(function(err, res) {
        this.state.trucks = _.sortBy(res.body, function(o) {return o.distance;});  // sort by distance
        this.trigger(this.state);
      }.bind(this));
  },

  onResize: function() {
    this.state.mapHeight = window.innerHeight;
    this.state.mapWidht = window.innerWidth;
    this.trigger(this.state);
  },

  onClickMap: function(mapEvent) {
    // set new center
    this.state.center = mapEvent.latLng;
    this.getTrucks();
  },

  onChangeRadius: function(radius) {
    // set new radius
    this.state.radius = radius;
    this.getTrucks();
  },
});

module.exports = Store