var React = require('react');

module.exports = React.createClass({
  propTypes: {
    handleMount: React.PropTypes.func,
  },
  getInitialState() {
    console.log('state');
    return {};
  },
  componentDidMount() {
    this.props.handleMount();
    console.log('mounted');
  },
  render: function() {
    console.log('render');
    return <div />;
  }
})
