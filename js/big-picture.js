'use strict';

(function () {
  var AVATAR = {
    width: '35',
    height: '35'
  };
  var bigPicture = document.querySelector('.big-picture');
  var bigImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentCountBlock = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsList = bigPicture.querySelector('.social__comments');
  var socialCaption = bigPicture.querySelector('.social__caption');

  var removeComments = function () {
    var comments = bigPicture.querySelectorAll('.social__comment');
    if (comments) {
      comments.forEach(function (item) {
        item.remove();
      });
    }
  };

  var createComment = function (comment) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    var p = document.createElement('p');

    li.className = 'social__comment';

    img.className = 'social__picture';
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = AVATAR.width;
    img.height = AVATAR.height;

    p.className = 'social__text';
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);

    return li;
  };

  var createComments = function (cooments) {
    var fragment = document.createDocumentFragment();
    cooments.forEach(function (item) {
      var comment = createComment(item);
      fragment.appendChild(comment);
    });
    commentsList.appendChild(fragment);
  };

  var showBigPicture = function (itemData) {
    bigImg.src = itemData.url;
    likesCount.textContent = itemData.likes;
    commentsCount.textContent = itemData.comments.length;
    socialCaption.textContent = itemData.description;
    commentCountBlock.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    removeComments();
    createComments(itemData.comments);
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  };

  var removeBigPicture = function () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  };

  window.bigPicture = {
    show: showBigPicture,
    remove: removeBigPicture
  };

})();
