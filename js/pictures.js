'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var picturesBlock = document.querySelector('.pictures');

  var getElementFromDataById = function (arr, id) {
    return arr.find(function (item) {
      return item.id === id;
    });
  };

  var createPicture = function (item) {
    var picture = pictureTemplate.cloneNode(true);
    picture.setAttribute('data-card', item.id);
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

  var removeAllPictures = function () {
    var pictures = document.querySelectorAll('.pictures .picture');
    pictures.forEach(function (item) {
      item.remove();
    });
  };

  var onPicturesClick = function (evt) {
    if (evt.target.tagName === 'IMG') {
      evt.preventDefault();
      var element = evt.target.closest('a');
      var item = getElementFromDataById(window.data, element.dataset.card);
      window.bigPicture.render(item);
    }
  };

  picturesBlock.addEventListener('click', onPicturesClick);

  window.pictures = {
    render: renderPictures,
    removeAll: removeAllPictures
  };

})();
