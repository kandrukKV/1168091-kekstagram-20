'use strict';

(function () {
  var UPLOAD_URL = 'https://javascript.pages.academy/kekstagram';
  var SERVER_STATUS_OK = 200;

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка загрузки файла');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

})();
