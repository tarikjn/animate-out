var React = require('react');

module.exports = React.createClass({
  propTypes: {
    handleMount: React.PropTypes.func,
  },
  componentDidMount() {
    this.props.handleMount();
  },
  render: function() {
    return <div />;
  }
})
