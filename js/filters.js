'use strict';

(function () {
  var NUMBER_OF_RANDOM_PICTURE = 10;
  var filtersBlosk = document.querySelector('.img-filters');
  var defaultBtn = document.querySelector('#filter-default');
  var randomtBtn = document.querySelector('#filter-random');
  var discussedBtn = document.querySelector('#filter-discussed');

  var activateFilters = function () {
    filtersBlosk.classList.remove('img-filters--inactive');
    defaultBtn.addEventListener('click', onDefaultBtnClick);
    randomtBtn.addEventListener('click', onRandomBtnClick);
    discussedBtn.addEventListener('click', onDiscussedBtnClick);
  };

  var applyDefaultFilter = window.debounce(function () {
    defaultBtn.classList.add('img-filters__button--active');
    randomtBtn.classList.remove('img-filters__button--active');
    discussedBtn.classList.remove('img-filters__button--active');
    window.pictures.removeAll();
    window.pictures.render(window.data);
  });

  var applyRandomFilter = window.debounce(function () {
    randomtBtn.classList.add('img-filters__button--active');
    discussedBtn.classList.remove('img-filters__button--active');
    defaultBtn.classList.remove('img-filters__button--active');
    window.pictures.removeAll();
    var data = getRendomPictures(window.data);
    window.pictures.render(data);
  });

  var applyDiscussedFilter = window.debounce(function () {
    discussedBtn.classList.add('img-filters__button--active');
    defaultBtn.classList.remove('img-filters__button--active');
    randomtBtn.classList.remove('img-filters__button--active');
    window.pictures.removeAll();
    var data = getDiscussedPicture(window.data);
    window.pictures.render(data);
  });

  var onDefaultBtnClick = function () {
    applyDefaultFilter();
  };

  var onRandomBtnClick = function () {
    applyRandomFilter();
  };

  var onDiscussedBtnClick = function () {
    applyDiscussedFilter();
  };

  var getDiscussedPicture = function (data) {
    var discussedPicture = data.slice(0);

    discussedPicture.sort(function (a, b) {
      return a.comments.length - b.comments.length;
    });

    return discussedPicture.reverse();
  };

  var getShuffleArray = function (array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  var getRandomArrayIndexes = function (data) {
    var randomIndexes = [];
    for (var i = 0; i < data.length; i++) {
      randomIndexes.push(i);
    }
    randomIndexes = getShuffleArray(randomIndexes);
    return randomIndexes.slice(0, NUMBER_OF_RANDOM_PICTURE);
  };

  var getRendomPictures = function (data) {
    var randomIndexes = getRandomArrayIndexes(data);
    var pictures = [];
    for (var i = 0; i < randomIndexes.length; i++) {
      pictures.push(data[randomIndexes[i]]);
    }
    return pictures;
  };

  window.filters = {
    activate: activateFilters
  };

})();
