'use strict';
var React = require('react');
var Reflux = require('reflux');
var store = require('./store.js');
var actions = require('./actions.js');

/*  locator.jsx
    Pretty straightfoward select input to change search radius.
    Forwards value to store.js to trigger state change.
*/
var Locator = React.createClass({

  mixins: [Reflux.connect(store)],

  render: function() {
    // only render button if browser supports geolocation API
    if (navigator.geolocation) {
      return (
      <button className="locator"  
              title="Locate Me!"
              onClick={actions.locate}>
        <img src="/static/locator.png" />
      </button>
      );
    }
    return ;
  },

});

module.exports = Locator;