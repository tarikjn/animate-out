var React = require('React');

// NOTE: do not use ease out animation if the modal generates a pending action conflicting with animation or
//       trigger action in a way not guaranteed to preserve modal

var AnimateOut = module.exports = React.createClass({

  propTypes: {
    showing: React.PropTypes.bool.isRequired,
    complete: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired
    // disableLeaveAnimation done by just not using AnimateOut
  },

  getInitialState: function() {
    return {
      leaving: false
    }
  },

  close: function() {

    if (!this.state.leaving) {

      // trigger parent unmount/action
      this.props.complete()

      // start leave animation
      this.setState({leaving: true})
    }
  },

  processAnimationEvent: function(leaveAnimationName, e) {
    if (e.animationName == leaveAnimationName) {
      this.setState({leaving: false})
    }
  },

  render: function() {
    return (
      (this.props.showing || this.state.leaving) ?
        // see: http://stackoverflow.com/a/35102287
        React.cloneElement(
          this.props.children,
          {onAnimationEnd: this.processAnimationEvent, close: this.close, leaving: this.state.leaving})
        :null
    )
  }
});
