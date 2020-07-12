'use strict';

var successTemplate = document.querySelector('#success').content.querySelector('.success');
var errorTemplate = document.querySelector('#error').content.querySelector('.error');
var main = document.querySelector('main');

var showErrorMessage = function (message) {
  var errorMessage = errorTemplate.cloneNode(true);
  var errorTitle = errorMessage.querySelector('.error__title');
  var errorBtnClose = errorMessage.querySelector('.error__button');
  errorTitle.textContent = message;

  var closeErrorMessage = function () {
    closeMessage(errorMessage);
    errorBtnClose.removeEventListener('click', onErrorBtnCloseClick);
    errorMessage.removeEventListener('click', onErrorMessageClick);
    document.removeEventListener('keydown', onErrorBtnClosePressEsc);
  };

  var onErrorBtnCloseClick = function () {
    closeErrorMessage();
  };

  var onErrorBtnClosePressEsc = function (evt) {
    window.util.isEscEvent(evt, closeErrorMessage);
  };

  var onErrorMessageClick = function () {
    closeErrorMessage();
  };

  errorBtnClose.addEventListener('click', onErrorBtnCloseClick);
  errorMessage.addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onErrorBtnClosePressEsc);
  main.appendChild(errorMessage);
};

var showSuccessMessage = function () {
  var successMessage = successTemplate.cloneNode(true);
  var btnClose = successMessage.querySelector('.success__button');

  var closeSuccessMessage = function () {
    closeMessage(successMessage);
    btnClose.removeEventListener('click', onBtnCloseClick);
    successMessage.removeEventListener('click', onShowSuccessMessageClick);
    document.removeEventListener('keydown', onShowSuccessMessagePressEsc);
  };

  var onShowSuccessMessageClick = function () {
    closeSuccessMessage();
  };

  var onShowSuccessMessagePressEsc = function (evt) {
    window.util.isEscEvent(evt, closeSuccessMessage);
  };

  var onBtnCloseClick = function () {
    closeSuccessMessage();
  };

  btnClose.addEventListener('click', onBtnCloseClick);
  successMessage.addEventListener('click', onShowSuccessMessageClick);
  document.addEventListener('keydown', onShowSuccessMessagePressEsc);

  window.form.remove();

  main.appendChild(successMessage);
};

var closeMessage = function (popup) {
  popup.remove();
};

var activatePage = function (data) {
  window.data = data.map(function (item, i) {
    item.id = 'card' + i;
    return item;
  });
  window.pictures.render(window.data);
  window.filters.activate();
};

window.page = {
  activate: activatePage,
  showErrorMessage: showErrorMessage,
  showSuccessMessage: showSuccessMessage
};
