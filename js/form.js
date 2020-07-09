'use strict';

(function () {
  var KEY_ESC = 'Escape';
  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadForm = document.querySelector('.img-upload__overlay');
  var closeBtn = document.querySelector('#upload-cancel');

  var showUploadForm = function () {
    closeBtn.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onCloseBtnPressEsc);
    imgUploadForm.classList.remove('hidden');
    // window.levelPin.activate();
  };

  var removeUploadForm = function () {
    imgUploadForm.classList.add('hidden');
    closeBtn.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onCloseBtnPressEsc);
  };

  var onUploadFileInputChange = function () {
    showUploadForm();
  };

  var onCloseBtnClick = function () {
    removeUploadForm();
  };

  var onCloseBtnPressEsc = function (evt) {
    if (evt.key === KEY_ESC) {
      removeUploadForm();
    }
  };

  onUploadFileInputChange();

  // uploadFileInput.addEventListener('change', onUploadFileInputChange);

})();
