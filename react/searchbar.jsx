'use strict';
var React = require('react');
var Reflux = require('reflux');

var actions = require('./actions.js');
var store = require('./store.js');

var SearchBar = React.createClass({

  mixins: [Reflux.connect(store)],

  render: function() {
    return (
      <div className="searchbar">
        Radius: <input type="text">{this.props.radius}</input>
      </div>
    );
  },

});

module.exports = SearchBar;