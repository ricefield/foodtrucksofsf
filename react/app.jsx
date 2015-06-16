'use strict';
var React = require('react');
var Reflux = require('reflux');
var ReactGoogleMaps = require('react-googlemaps');

var GoogleMapsAPI = window.google.maps;
var LatLng = GoogleMapsAPI.LatLng;

var actions = require('./actions.js')
var store = require('./store.js')

var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var Circle = ReactGoogleMaps.Circle;
var SearchBar = require("./searchbar.jsx")
var TruckList = require("./trucklist.jsx")

var App = React.createClass({

  mixins: [Reflux.connect(store)],

  componentDidMount: function () {
    actions.load();   
  },

  render: function() {
    return (
      <div>
        <Map
          initialZoom={13}
          initialCenter={this.state.center}
          width={this.state.mapWidth}
          height={this.state.mapHeight}
          onClick={actions.clickMap}>
          <Marker position={this.state.center} icon={"/static/your_location.png"} />
          {this.state['trucks'].map(this.renderMarkers)}
        </Map>
        <SearchBar center={this.state.center} radius={this.state.radius} />
      </div>
    );
  },

  renderMarkers: function(truck, index) {
    var latlng = new LatLng(parseFloat(truck['lat']), parseFloat(truck['long']));
    return (
      <Marker title={truck['name']} position={latlng} key={index} />
      );
  },

});

module.exports = App;


