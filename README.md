# react-animate-out

Unmounts a component after a CSS animation completes.

This component manages the mounting of a component by relying entirely on CSS animation events which provides DRY-ness and performance advantages. As such, it does not support [IE9](http://caniuse.com/#feat=css-animation) and requires React v15 or later.

## Motivation

`ReactCSSTransitionGroup` is overkill for a single component and requires you to re-define animation timings that you may already have defined in your CSS, leading to potential errors.

## Installation

```
$ npm install react-animate-out
```

## Usage

If we have a CSS class called "component-leave" and that uses a keyframe animation called "anim-close", we can apply AnimateOut to a DisplayElement component using the following logic:

```js
import AnimateOut from 'react-animate-out'

const Module = React.createClass({
  getInitialState: function() {
    return {
      showChild: true
    }
  },

  removeChild: function() {
    this.setState({showChild: false})
  },

  render: function(props) {
    return (
      <AnimateOut showing={this.state.showChild} complete={this.removeChild}>
        <DisplayComponent>
      </AnimateOut>
    )
  }
})

function DisplayElement(props) {
  // onAnimationEnd will only be defined if we wrap DisplayElement with AnimateOut
  return (
    <div className={(props.leaving ? 'component-leave' : '')}
      onAnimationEnd={props.onAnimationEnd ?
       props.onAnimationEnd.bind(null, 'anim-close') :
       null}/>
      Your content...
    </div>
    )
}
```

```css
.component-leave {
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-name: anim-close;
}


@keyframes anim-close {
  0% { opacity: 1; }
  100% { opacity: 0; transform: scale3d(0.9, 0.9, 1); }
}
```

You can of course add an enter animation as you would do normally and use AnimateOut with CSS Modules.

## API

Props accepted:

- `showing` is a *boolean* dictating if the children should mount and should usually be tied to a state
- `complete` is a *function* called immeditaly to request switching `showing` to false -- when AnimatOut has processed a close call and has taken over mounting temporarily to complete the animation. If your modal has a single possible action, this is also where you can process it.

Props passed to the child element: 

- `onAnimationEnd` -- to properly notify of the leave animation end, bound this *function* with the name of your leave animation name and call it in the onAnimationEnd callback of the element of the children component bearing the animation
- `close` -- calling this *function* will trigger the leave animation and call to complete
- `leaving` is a *boolean* determining that the leave animation is in progress -- you can use this to display the leaving animation

## Lifecycle

Assuming the child component is a modal,

```
action                show modal        close -﹁ (calls complete)
                           |              |     ˅
showing (boolean)  false   `->  true      |   false
                                          |
leaving (boolean)  false        false     `-> true     false
                                                         ˄
Modal              unseen       showing       leaving    | (on animation end)
                                                         |
CSS Animaton                    show          leave -----/

```

`showing` is managed by the application using AnimateOut, `leaving` is managed by AnimateOut. Complete is called immediatly to minimize delays in the application and prioritize user experience, if your complete action must necessarily unmount the AnimateOut itself, then don't use an animation or AnimateOut, just manage mounting as such:

```
return (
  {showing &&
    <DisplayElement onClose={this.complete} />
  }
)
```

## TODO

Include full-scale integration tests that confirm behavior through the CSS api as well as through javascript unit testing.
