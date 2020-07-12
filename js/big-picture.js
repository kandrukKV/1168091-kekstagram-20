'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var closeBtn = bigPicture.querySelector('button[type="reset"]');

  var addListeners = function () {
    closeBtn.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onCloseBtnPressEsc);
  };

  var removeListeners = function () {
    closeBtn.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onCloseBtnPressEsc);
  };

  var onCloseBtnClick = function () {
    removeListeners();
    removeBigPicture();
  };

  var onCloseBtnPressEsc = function (evt) {
    window.util.isEscEvent(evt, removeBigPicture);
    removeListeners();
  };

  var fillFieldsBigPicture = function (itemData) {
    bigImg.src = itemData.url;
    likesCount.textContent = itemData.likes;
    commentsCount.textContent = itemData.comments.length;
    socialCaption.textContent = itemData.description;
  };

  var showBigPicture = function (itemData) {
    fillFieldsBigPicture(itemData);
    window.comments.show(itemData.comments);
    addListeners();
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  };

  var removeBigPicture = function () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    window.comments.disable();
  };

  window.bigPicture = {
    render: showBigPicture,
    remove: removeBigPicture
  };

})();
