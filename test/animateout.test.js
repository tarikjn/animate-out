var React = require('react');
var Dummy = require('./Dummy');
var AnimateOut = require('../lib/AnimateOut');
var enzyme = require('enzyme');
var expect = require('chai').expect;

describe('AnimateOut', function() {
  it('should require three props', function() {
    expect(Object.keys(AnimateOut.propTypes))
      .to.include('showing', 'complete', 'children');
  });

  it('should return an instance of the child with the props on animationend, close, and leaving', function() {
    var elm = enzyme.shallow(
      <AnimateOut showing={true} complete={noop}>
        <Dummy />
      </AnimateOut>
    );
    var instance = elm.instance();
    expect(elm.contains(
      <Dummy
        onAnimationEnd={instance.processAnimationEvent}
        close={instance.close}
        leaving={instance.state.leaving}
      />
    ));
  });
});