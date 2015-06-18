// tests/RadiusPicker-test.js

jest.dontMock('../RadiusPicker.jsx');

describe('RadiusPicker', function() {

  var React = require('react/addons');
  var RadiusPicker = require('../RadiusPicker.jsx');
  var TestUtils = React.addons.TestUtils;

  beforeEach(function() {
    picker = TestUtils.renderIntoDocument(<RadiusPicker />);
  });

  it('renders correct', function() {
    // check to see select element renders correctly
    select = TestUtils.findRenderedDOMComponentWithTag(picker, "select");
    expect(select.getDOMNode().textContent).toEqual('1 mi.');
  });

});