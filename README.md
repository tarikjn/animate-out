# react-animate-out

Unmounts a component after a CSS animation completes.

This components manage the mounting of a component by relying entirely on CSS animation events which provides DRY-ness and performance advantages. As such, it does not support [IE9](http://caniuse.com/#feat=css-animation) and requires React v15 or later.

## Motivation

`ReactCSSTransitionGroup` is overkill for a single component and requires you to re-define animation timings that you may already have defined in your CSS, leading to potential errors.

## Installation

```
$ npm install react-animate-out --save-dev
```

## Usage

If we have a css class called "dialog-leave" and that uses a keyfram animation called "anim-close", we can apply Animate out to a Modal component using the following logic:

```js
import AnimateOut from 'react-animate-out'

function parentElement(props) {
  return (
    <AnimateOut showing={true} complete={removeElement}>
      <ElementToRemove>
    </AnimateOut>
  )
}

function ElementToRemove(props) {
  return (
    <Modal className={(props.leaving ? 'dialog-leave' : '')}
      onAnimationEnd={props.onAnimationEnd ?
       props.onAnimationEnd.bind(null, props.styles['anim-close']) :
       null}/>
    )
}
```

## TODO

Include full-scale integration tests that confirm behavior through the CSS api as well as through javascript unit testing.
