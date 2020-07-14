'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 0;
  var LEFT_MOVE_PIN_LIMIT = 0;
  var RIGHT_MOVE_PIN_LIMIT = 453;
  var levelPin = document.querySelector('.img-upload__effect-level');
  var pin = document.querySelector('.effect-level__pin');
  var depthEffect = document.querySelector('.effect-level__depth');
  var inputDepthEffect = document.querySelector('.effect-level__value');
  var pinMoveLimits = {
    left: LEFT_MOVE_PIN_LIMIT,
    right: RIGHT_MOVE_PIN_LIMIT
  };

  var movePin = function (pinPosition) {
    pin.style.left = pinPosition + 'px';
  };

  var castPinPosition = function (pinPosition) {
    return Math.floor(pinPosition * 100 / RIGHT_MOVE_PIN_LIMIT);
  };

  var moveDepth = function (pinPosition) {
    depthEffect.style.width = castPinPosition(pinPosition) + '%';
  };

  var setDepthEffectToInput = function (pinPosition) {
    inputDepthEffect.value = castPinPosition(pinPosition);
  };

  var setPin = function (pinPosition) {
    movePin(pinPosition);
    moveDepth(pinPosition);
    setDepthEffectToInput(pinPosition);
  };

  var setPinDefault = function () {
    setPin(RIGHT_MOVE_PIN_LIMIT);
  };

  var onPinMouseDown = function (evt) {
    evt.preventDefault();

    if (evt.button !== LEFT_MOUSE_BUTTON) {
      return;
    }

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

      setPin(pinPosition);
    };

    var onMouseUp = function () {
      window.effects.setDepth();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  var activateLevelPin = function () {
    setPinDefault();
    hideLevelPin();
    pin.addEventListener('mousedown', onPinMouseDown);
  };

  var getCurrentLevelPinPosition = function () {
    return inputDepthEffect.value;
  };

  var disableLevelPin = function () {
    pin.removeEventListener('mousedown', onPinMouseDown);
  };

  var showLevelPin = function () {
    levelPin.classList.remove('hidden');
  };

  var hideLevelPin = function () {
    levelPin.classList.add('hidden');
  };

  window.levelPin = {
    activate: activateLevelPin,
    getPosition: getCurrentLevelPinPosition,
    setPinDefault: setPinDefault,
    disable: disableLevelPin,
    show: showLevelPin,
    hide: hideLevelPin
  };

})();
