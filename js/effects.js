'use strict';

(function () {
  var SCALE_VALUE = {
    max: 100,
    min: 25,
    step: 25
  };
  var effectList = document.querySelector('.effects__list');
  var effectInputs = document.querySelectorAll('input[name="effect"]');
  var imgUpload = document.querySelector('.img-upload__preview img');

  var increaseScaleButton = document.querySelector('.scale__control--bigger');
  var decreaseScaleButton = document.querySelector('.scale__control--smaller');
  var scaleValue = document.querySelector('.scale__control--value');


  var getCurrentEffectName = function () {
    for (var i = 0; i < effectInputs.length; i++) {
      if (effectInputs[i].checked) {
        break;
      }
    }
    return effectInputs[i].value;
  };

  var clearEffect = function () {
    imgUpload.removeAttribute('class');
    imgUpload.removeAttribute('style');
  };


  var setEffect = function (effectName) {
    clearEffect();
    setScaleDefault();
    if (effectName === 'none') {
      window.levelPin.hide();
    } else {
      window.levelPin.show();
      var className = 'effects__preview--' + effectName;
      imgUpload.className = className;
      window.levelPin.setPinDefault();
    }
  };

  var setDepthEffect = function () {
    var depthEffect = window.levelPin.getPosition();
    switch (getCurrentEffectName()) {
      case 'chrome':
        imgUpload.style.filter = 'grayscale(' + depthEffect / 100 + ')';
        break;
      case 'sepia':
        imgUpload.style.filter = 'sepia(' + depthEffect / 100 + ')';
        break;
      case 'marvin':
        imgUpload.style.filter = 'invert(' + depthEffect + '%)';
        break;
      case 'phobos':
        imgUpload.style.filter = 'blur(' + depthEffect * 3 / 100 + 'px)';
        break;
      case 'heat':
        imgUpload.style.filter = 'brightness(' + depthEffect * 3 / 100 + ')';
        break;
    }
  };

  var onEffectListChange = function (evt) {
    setEffect(evt.target.value);
  };

  var increaseScale = function () {
    var value = parseInt(scaleValue.value, 10);
    if (value < SCALE_VALUE.max) {
      value += SCALE_VALUE.step;
      scaleValue.value = value + '%';
      setImgScale(value);
    }
  };

  var decreaseScale = function () {
    var value = parseInt(scaleValue.value, 10);
    if (value > SCALE_VALUE.min) {
      value -= SCALE_VALUE.step;
      scaleValue.value = value + '%';
      setImgScale(value);
    }
  };

  var setScaleDefault = function () {
    scaleValue.value = '100%';
  };

  var setImgScale = function (value) {
    imgUpload.style.transform = 'scale(' + value / 100 + ')';
  };

  var activateEffects = function () {
    setScaleDefault();
    effectList.addEventListener('change', onEffectListChange);
    increaseScaleButton.addEventListener('click', increaseScale);
    decreaseScaleButton.addEventListener('click', decreaseScale);
  };

  var disableEffects = function () {
    clearEffect();
    effectList.removeEventListener('change', onEffectListChange);
    increaseScaleButton.removeEventListener('click', increaseScale);
    decreaseScaleButton.removeEventListener('click', decreaseScale);
  };

  window.effects = {
    activate: activateEffects,
    disable: disableEffects,
    setDepth: setDepthEffect
  };

})();
