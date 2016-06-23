// taken from: http://jaketrent.com/post/testing-react-with-jsdom/
var jsdom = require('jsdom');

var doc = jsdom.jsdom('<html><body></body></html>');
var win = doc.defaultView;
global.noop = function() {};
global.document = doc;
global.window = win;

function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}

propagateToGlobal(win);
