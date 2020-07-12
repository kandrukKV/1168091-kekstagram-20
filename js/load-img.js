'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFile = document.querySelector('#upload-file');
  var imagePreview = document.querySelector('.img-upload__preview img');


  var isTrueImg = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var activateLoadImg = function () {
    var file = uploadFile.files[0];

    if (isTrueImg(file)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };


  window.loadImg = {
    activate: activateLoadImg,
  };

})();
