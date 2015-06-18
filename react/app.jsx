'use strict';
var React = require('react');
var Reflux = require('reflux');
var ReactGoogleMaps = require('react-googlemaps');
var vsprintf = require("sprintf-js").vsprintf

// GMaps API
var GoogleMapsAPI = window.google.maps;
var LatLng = GoogleMapsAPI.LatLng;

// Reflux
var actions = require('./actions.js')
var store = require('./store.js')

// Components
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var RadiusPicker = require("./radiuspicker.jsx")
var TruckList = require("./trucklist.jsx")


/*  app.jsx
    This is the container of the entire UI, which gets rendered in index.jsx.
    The primary component rendered here is the Map, which also renders the Markers (trucks),
    the RadiusPicker and TruckList are included here, defined in their respective componetns.
*/
var App = React.createClass({

  mixins: [Reflux.connect(store)],

  componentDidMount: function () {
    actions.load();     
    window.addEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    actions.resize();
  },

  render: function() {
    return (
      <div>
        <h1>Food Trucks of SF <br/>
          <small><i>Click anywhere to begin</i></small></h1>
        <Map
          ref="myMap"
          initialZoom={13}
          initialCenter={this.state.center}
          width={this.state.mapWidth}
          height={this.state.mapHeight}
          onClick={actions.clickMap}>
          <Marker position={this.state.center} icon={"/static/your_location.png"} />
          {this.state['trucks'].map(this.renderMarkers)}
        </Map>
        <RadiusPicker center={this.state.center} radius={this.state.radius} />
        <TruckList trucks={this.state.trucks} />
      </div>
    );
  },

  renderMarkers: function(truck, index) {
    var latlng = new LatLng(parseFloat(truck['lat']), parseFloat(truck['long']));

    // displays infowindow on Marker click
    // TODO: refactor to use Reflux action
    var handleClick = function(event) {

      var contentString = vsprintf("<h2>%s <br/> \
        <small>%s</small></h2> \
        <p><b>Distance: </b> %s miles</p> \
        <p><b>Food: </b> %s</p>", [truck.name, truck.address, truck.distance.toFixed(2), truck.food.split(':').join(',')]);

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        position: event.latLng,
        pixelOffset: {width:0, height:-25},
        maxWidth: 250,
      });

      // TODO: find a better way to access MapNode
      infowindow.open(this.refs.myMap.refs.map.getMapNode());
    }.bind(this);

    return (
      <Marker 
        title={truck['name']} 
        position={latlng} 
        key={index} 
        onClick={handleClick} />
    );
  },
});

module.exports = App;