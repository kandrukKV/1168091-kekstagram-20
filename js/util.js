'use strict';

var KEY_ESC = 'Escape';
var KEY_ENTER = 'Enter';

var isEscEvent = function (evt, action) {
  if (evt.key === KEY_ESC) {
    action();
  }
};

var isEnterEvent = function (evt, action) {
  if (evt.key === KEY_ENTER) {
    action();
  }
};

window.util = {
  isEscEvent: isEscEvent,
  isEnterEvent: isEnterEvent
};

