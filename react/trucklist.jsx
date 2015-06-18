'use strict';
var React = require('react');
var Reflux = require('reflux');
var store = require('./store.js');

var TruckList = React.createClass({

  mixins: [Reflux.connect(store)],

  render: function() {
    return (
      <div className="trucklist">
        <ul>
          {this.props['trucks'].map(this.renderList)}
        </ul>
      </div>
    );
  },

  renderList: function(truck) {
    var foods = truck.food.split(':').join(',')
    return (
      <li key={truck.id}>
        <h4>{truck.name} <br/>
        <small>{truck.address}</small></h4>
        <p><b>Distance: </b> {truck.distance.toFixed(2)} miles</p>
        <p><b>Food: </b> {foods}</p>
        <hr/>
      </li>
      );
  },

});

module.exports = TruckList;