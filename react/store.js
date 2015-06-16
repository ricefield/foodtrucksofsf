'use strict';
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('./actions.js');

var GoogleMapsAPI = window.google.maps;
var LatLng = GoogleMapsAPI.LatLng;

/* */
var Store = Reflux.createStore({

  listenables: [actions],

  init: function() {
    this.listenTo(actions.load, this.getTrucks);
  },

  getInitialState: function() {
    this.state = {
      trucks: [],
      center: new LatLng(37.7577, -122.4376),
      radius: 1.0,
      mapHeight: window.innerHeight,
      mapWidth: window.innerWidth,
    };
    this.getTrucks();
    return this.state;
  },

  getTrucks: function() {
    request
      .get('/api/nearby')
      .query({ lat: this.state['center'].lat(), lon: this.state['center'].lng(), radius: this.state.radius})
      .end(function(err, res) {
        this.state['trucks'] = res.body;
        this.trigger(this.state);
      }.bind(this));
  },

  onResize: function() {
    // TODO: hook up DOM Event Listener to onResize()
    this.state['mapHeight'] = window.innerHeight;
    this.state['mapWidht'] = window.innerWidth;
  },

  onClickMap: function(mapEvent) {
    this.state['center'] = mapEvent.latLng;
    this.getTrucks();
  },

  onSearchAddress: function() {
  },

  onChangeRadius: function(radius) {
    this.state.radius = radius;
    this.getTrucks();
  },

  onClickPin: function() {

  },
});

module.exports = Store