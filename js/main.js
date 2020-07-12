'use strict';

(function () {
  var LOAD_ERROR_MESSAGE = 'Ошибка данных';

  var showLoadErrorMessage = function () {
    window.page.showErrorMessage(LOAD_ERROR_MESSAGE);
  };

  window.load(window.page.activate, showLoadErrorMessage);
})();
