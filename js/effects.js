'use strict';

(function () {
  var effectList = document.querySelector('.effects__list');
  var effectInputs = document.querySelectorAll('.effects__list input[type="radio"]');
  var imgUpload = document.querySelector('.img-upload__preview img');

  var setEffect = function (effectName) {
    var depthEffect = window.levelPin.getCurrentPosition();
    imgUpload.className = '';
    switch (effectName) {
      case 'chrome':
        imgUpload.className = 'effects__preview--chrome';
        break;
      case 'sepia':
        imgUpload.className = 'effects__preview--sepia';
        break;
      case 'marvin':
        imgUpload.className = 'effects__preview--marvin';
        break;
      case 'phobos':
        imgUpload.className = 'effects__preview--phobos';
        break;
      case 'heat':
        imgUpload.className = 'effects__preview--heat';
        break;
    }
  };

  var onEffectListChange = function (evt) {
    setEffect(evt.target.value);
  };

  effectList.addEventListener('change', onEffectListChange);
})();
