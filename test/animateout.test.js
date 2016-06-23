var React = require('react');
var Dummy = require('./Dummy');
var AnimateOut = require('../lib');
var enzyme = require('enzyme');
var expect = require('chai').expect;

describe('AnimateOut', function() {
  it('should require three props', function() {
    expect(Object.keys(AnimateOut.propTypes))
      .to.include('showing', 'complete', 'children');
  });

  context('behavior', function() {
    before(function() {
      this.elm = enzyme.shallow(
        <AnimateOut showing={true} complete={noop}>
          <Dummy foo={'bar'}/>
        </AnimateOut>
      );
      this.instance = this.elm.instance();
    });

    it('should return an instance of the child with the props on animationend, close, and leaving and not alter existing props', function() {
      expect(this.elm.contains(
        <Dummy
          onAnimationEnd={this.instance.processAnimationEvent}
          close={this.instance.close}
          leaving={this.instance.state.leaving}
          foo={'bar'}
        />
      )).to.be.true;
    });

    it('should set leaving to true when close is called', function() {
      this.instance.close();

      expect(this.instance.state.leaving).to.be.true;
    });
  });

  context('processAnimationEvent', function() {
    beforeEach(function() {
      this.elm = enzyme.shallow(
        <AnimateOut showing={true} complete={noop}>
          <Dummy />
        </AnimateOut>
      );
      this.instance = this.elm.instance();
      this.instance.close();
    });

    it('should take an animation name and an event', function() {
      expect(this.instance.processAnimationEvent.length).to.eql(2);
    });

    it('should set leaving state to false if the event name and the exit event name are the same', function() {
      this.instance.processAnimationEvent.call(this.instance, 'foo', {animationName: 'foo'});
      expect(this.instance.state.leaving).to.be.false;
    });

    it('should not set the leaving state to false if the events don\'t match', function() {
      this.instance.processAnimationEvent.call(this.instance, 'foo', {});
      expect(this.instance.state.leaving).to.be.true;
    });
  });
});
