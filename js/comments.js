'use strict';

(function () {
  var MAX_NUMBER_COMMENTS = 5;
  var AVATAR = {
    width: '35',
    height: '35'
  };
  var bigPicture = document.querySelector('.big-picture');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.social__comments-loader');
  var allComments;
  var viewedComments;


  var removeComments = function () {
    var comments = bigPicture.querySelectorAll('.social__comment');
    if (comments.length) {
      comments.forEach(function (item) {
        item.remove();
      });
    }
  };

  var createOneComment = function (comment) {
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
    removeComments();
    var fragment = document.createDocumentFragment();
    cooments.forEach(function (item) {
      var comment = createOneComment(item);
      fragment.appendChild(comment);
    });
    commentsList.appendChild(fragment);
  };

  var onCommentsLoaderClick = function () {
    refreshComments();
  };

  var showComments = function (comments) {
    allComments = comments;
    if (allComments.length <= MAX_NUMBER_COMMENTS) {
      commentsLoader.classList.add('hidden');
      createComments(allComments);
    } else {
      viewedComments = MAX_NUMBER_COMMENTS;
      createComments(allComments.slice(0, MAX_NUMBER_COMMENTS));
      commentsLoader.addEventListener('click', onCommentsLoaderClick);
      commentsLoader.classList.remove('hidden');
    }
  };

  var refreshComments = function () {
    var begin = viewedComments;
    var numberUnviewedComments = allComments.length - viewedComments;
    var end;

    if (numberUnviewedComments > MAX_NUMBER_COMMENTS) {
      end = viewedComments + MAX_NUMBER_COMMENTS;
    } else {
      end = allComments.length;
      commentsLoader.classList.add('hidden');
    }
    viewedComments = end;
    createComments(allComments.slice(begin, end));
  };

  var disableComments = function () {
    commentsLoader.remove('click', onCommentsLoaderClick);
  };

  window.comments = {
    show: showComments,
    disable: disableComments
  };
})();
