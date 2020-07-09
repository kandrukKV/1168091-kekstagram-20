'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 0;
  var LEFT_MOVE_PIN_LIMIT = 0;
  var pin = document.querySelector('.effect-level__pin');
  var moveArea = document.querySelector('.effect-level__line');
  var depthEffect = document.querySelector('.effect-level__depth');
  var inputDepthEffect = document.querySelector('.effect-level__value');
  var rightMovePinLimit = moveArea.offsetWidth;

  console.log(rightMovePinLimit);

  var movePin = function (x) {
    pin.style.left = x + 'px';
  };

  var castPinPosition = function (pinPosition) {
    return Math.floor(pinPosition * 100 / rightMovePinLimit);
  };

  var moveDepth = function (pinPosition) {
    var depthPosition = castPinPosition(pinPosition) + '%';
    depthEffect.style.width = depthPosition;
  };

  var setDepthEffectToInput = function (pinPosition) {
    inputDepthEffect.value = castPinPosition(pinPosition);
  };

  var onPinMouseDown = function (evt) {
    evt.preventDefault();
    if (evt.button !== LEFT_MOUSE_BUTTON) {
      return;
    }
    var pinMoveLimits = {
      left: LEFT_MOVE_PIN_LIMIT,
      right: rightMovePinLimit
    };

    var startPosition = evt.clientX;

    var onMouseMove = function (moveEvt) {

      var shift = startPosition - moveEvt.clientX;

      startPosition = moveEvt.clientX;

      var pinPosition = pin.offsetLeft - shift;

      if (pinPosition < pinMoveLimits.left) {
        pinPosition = pinMoveLimits.left;
      } else if (pinPosition > pinMoveLimits.right) {
        pinPosition = pinMoveLimits.right;
      }

      movePin(pinPosition);
      moveDepth(pinPosition);
      setDepthEffectToInput(pinPosition);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  var activateLevelPin = function () {
    movePin(rightMovePinLimit);
    moveDepth(rightMovePinLimit);
    pin.addEventListener('mousedown', onPinMouseDown);
  };

  var getCurrentLevelPinPosition = function () {
    return inputDepthEffect.value;
  };

  window.levelPin = {
    activate: activateLevelPin,
    getCurrentPosition: getCurrentLevelPinPosition
  };

})();
