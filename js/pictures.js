'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var picturesBlock = document.querySelector('.pictures');

  var createPicture = function (item) {
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('img').src = item.url;
    picture.querySelector('.picture__likes').textContent = item.likes;
    picture.querySelector('.picture__comments').textContent = item.comments.length;

    return picture;
  };

  var createPictures = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(createPicture(item));
    });
    return fragment;
  };

  var renderPictures = function (arr) {
    var pictures = createPictures(arr);
    picturesBlock.append(pictures);
  };

  window.pictures = {
    render: renderPictures
  };

})();
