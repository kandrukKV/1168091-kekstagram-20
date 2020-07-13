'use strict';

(function () {
  var MAX_HASHTAGS_COUNT = 5;
  var uploadFileInput = document.querySelector('#upload-file');
  var imgEditForm = document.querySelector('.img-upload__overlay');
  var imgUploadForm = document.querySelector('#upload-select-image');
  var hashTagsInput = document.querySelector('.text__hashtags');
  var closeBtn = document.querySelector('#upload-cancel');
  var commentsInput = document.querySelector('.text__description');
  var uploadForm = document.querySelector('.img-upload__form');

  var showUploadForm = function () {
    imgEditForm.classList.remove('hidden');
    addListeners();
    window.loadImg.activate();
    window.levelPin.activate();
    window.effects.activate();
  };

  var removeUploadForm = function () {
    imgEditForm.classList.add('hidden');
    window.levelPin.disable();
    window.effects.disable();
    uploadForm.reset();
    removeListeners();
  };

  var addListeners = function () {
    closeBtn.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onCloseBtnPressEsc);
    hashTagsInput.addEventListener('change', onHashTagsInputChange);
    hashTagsInput.addEventListener('focus', onHashTagsInputFocus);
    hashTagsInput.addEventListener('blur', onHashTagsInputBlur);
    commentsInput.addEventListener('focus', onCommentsInputFocus);
    commentsInput.addEventListener('blur', onCommentsInputBlur);
    commentsInput.addEventListener('ivalid', onCommentsInputInvalid);
    imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
  };

  var removeListeners = function () {
    closeBtn.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onCloseBtnPressEsc);
    hashTagsInput.removeEventListener('change', onHashTagsInputChange);
    hashTagsInput.removeEventListener('focus', onHashTagsInputFocus);
    hashTagsInput.removeEventListener('blur', onHashTagsInputBlur);
    commentsInput.removeEventListener('focus', onCommentsInputFocus);
    commentsInput.removeEventListener('blur', onCommentsInputBlur);
    imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
    commentsInput.removeEventListener('ivalid', onCommentsInputInvalid);
  };

  var isValidateHashTag = function (hashTag) {
    var reg = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,19})(\b|\r)/;
    return hashTag.match(reg) ? hashTag === hashTag.match(reg)[0] : false;
  };

  var isValidateHashTagsCount = function (hashTags) {
    return hashTags.length <= MAX_HASHTAGS_COUNT;
  };

  var isEligibilityHashTags = function (hashTags) {
    return hashTags.every(function (item) {
      return isValidateHashTag(item);
    });
  };

  var isRepeatHashTags = function (hashTags) {
    for (var i = 0; i < hashTags.length; i++) {
      for (var j = i + 1; j < hashTags.length; j++) {
        if (hashTags[i].toLowerCase() === hashTags[j].toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  };

  var validateHashTags = function (str) {
    var errorMessage = '';
    if (str) {
      var hashTags = str.trim().split(' ');
      if (!isValidateHashTagsCount(hashTags)) {
        errorMessage = 'Максимальное количество тегов: ' + MAX_HASHTAGS_COUNT;
      } else if (!isEligibilityHashTags(hashTags)) {
        errorMessage = 'Неверный формат хештегов';
      } else if (isRepeatHashTags(hashTags)) {
        errorMessage = 'Повторяющиеся теги';
      }
    }
    hashTagsInput.setCustomValidity(errorMessage);
  };

  var onCommentsInputInvalid = function () {
    if (commentsInput.validity.tooLong) {
      commentsInput.setCustomValidity('Имя не должно превышать 140 символов');
    } else {
      commentsInput.setCustomValidity('');
    }
  };

  var onCommentsInputFocus = function () {
    document.removeEventListener('keydown', onCloseBtnPressEsc);
  };

  var onCommentsInputBlur = function () {
    document.addEventListener('keydown', onCloseBtnPressEsc);
  };

  var onImgUploadFormSubmit = function (evt) {
    evt.preventDefault();
    var formData = new FormData(uploadForm);
    window.upload(formData, window.page.showSuccessMessage, window.page.showErrorMessage);
    removeUploadForm();
  };

  var onHashTagsInputFocus = function () {
    document.removeEventListener('keydown', onCloseBtnPressEsc);
  };

  var onHashTagsInputBlur = function () {
    document.addEventListener('keydown', onCloseBtnPressEsc);
  };

  var onHashTagsInputChange = function () {
    validateHashTags(hashTagsInput.value);
  };

  var onUploadFileInputChange = function () {
    showUploadForm();
  };

  var onCloseBtnClick = function () {
    removeUploadForm();
  };

  var onCloseBtnPressEsc = function (evt) {
    window.util.isEscEvent(evt, removeUploadForm);
  };

  uploadFileInput.addEventListener('change', onUploadFileInputChange);

  window.form = {
    show: showUploadForm,
    remove: removeUploadForm
  };

})();
