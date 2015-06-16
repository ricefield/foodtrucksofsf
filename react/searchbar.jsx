'use strict';
var React = require('react');
var Reflux = require('reflux');

var actions = require('./actions.js');
var store = require('./store.js');

var SearchBar = React.createClass({

  mixins: [Reflux.connect(store)],

  handleChange: function(event) {
    console.log(event);
    store.onChangeRadius(event.target.value);
  },

  render: function() {
    return (
      <div className="searchbar">
        <span>Radius: </span>
        <select onChange={this.handleChange}>
          <option value="1.0">1 mi.</option>
          <option value="0.5">0.5 mi.</option>
          <option value="0.25">0.25 mi.</option>
        </select>
      </div>
    );
  },

});

module.exports = SearchBar;