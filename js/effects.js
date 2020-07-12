'use strict';

(function () {
  var DEC_SCALE_VALUE = {
    max: 100,
    min: 25,
    step: 25
  };
  var effectList = document.querySelector('.effects__list');
  var inputEffect = document.querySelectorAll('input[name="effect"]');
  var imgUpload = document.querySelector('.img-upload__preview img');

  var incScaleBtn = document.querySelector('.scale__control--bigger');
  var decScaleBtn = document.querySelector('.scale__control--smaller');
  var scaleValue = document.querySelector('.scale__control--value');


  var getCurrentEffectName = function () {
    for (var i = 0; i < inputEffect.length; i++) {
      if (inputEffect[i].checked) {
        break;
      }
    }
    return inputEffect[i].value;
  };

  var clearEffect = function () {
    imgUpload.removeAttribute('class');
    imgUpload.removeAttribute('style');
  };

  var setEffectName = function (effectName) {
    clearEffect();
    setScaleDefault();
    var className = 'effects__preview--' + effectName;
    imgUpload.className = className;
    window.levelPin.setPinDefault();
  };

  var setEffect = function (effectName) {
    if (effectName === 'none') {
      window.levelPin.hide();
      setScaleDefault();
      clearEffect();
    } else {
      window.levelPin.show();
      setEffectName(effectName);
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

  var incScale = function () {
    var value = parseInt(scaleValue.value, 10);
    if (value < DEC_SCALE_VALUE.max) {
      value += DEC_SCALE_VALUE.step;
      scaleValue.value = value + '%';
      setImgScale(value);
    }
  };

  var decScale = function () {
    var value = parseInt(scaleValue.value, 10);
    if (value > DEC_SCALE_VALUE.min) {
      value -= DEC_SCALE_VALUE.step;
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
    incScaleBtn.addEventListener('click', incScale);
    decScaleBtn.addEventListener('click', decScale);
  };

  var disableEffects = function () {
    clearEffect();
    effectList.removeEventListener('change', onEffectListChange);
    incScaleBtn.removeEventListener('click', incScale);
    decScaleBtn.removeEventListener('click', decScale);
  };

  window.effects = {
    activate: activateEffects,
    disable: disableEffects,
    setDepth: setDepthEffect
  };

})();
