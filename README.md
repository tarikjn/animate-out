# Animate Out

Animate Out allows you to create components unmount only after a specified animation has completed.

## Example
If we have a css class called "dialog-leave" and that uses a keyfram animation called "anim-close", we can apply Animate out to a Modal component using the following logic:

```
var AnimateOut = require("AnimateOut");

var parentElement = function (props) {
  return (

    <AnimateOut showing={true} complete={removeElement}>
      <ElementToRemove>
    </AnimateOut>
  )
}
var ElementToRemove = function (props) {
  return (
    <Modal className={(props.leaving ? "dialog-leave" : "")}
      onAnimationEnd={props.onAnimationEnd ?
      props.onAnimationEnd.bind(null, props.styles['anim-close']) :
      null}/>
    )
}
```

## TODO

Include full-scale integration tests that confirm behavior through the CSS api as well as through javascript unit testing.
