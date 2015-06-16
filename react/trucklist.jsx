'use strict';
var React = require('react');
var Reflux = require('reflux');

var actions = require('./actions.js');
var store = require('./store.js');

var TruckList = React.createClass({

  mixins: [Reflux.connect(store)],

  render: function() {
    var list = "";
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
        <p><small><b>Food:</b> {foods}</small></p>
        <hr/>
      </li>
      );
  },

});

module.exports = TruckList;