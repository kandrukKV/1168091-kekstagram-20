'use strict';

var DATA_COUNT = 25;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Igor', 'Konstantin', 'Ivan', 'Klava', 'Nina', 'Taisia'];

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElementOfArray = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getComments = function (count) {
  var comments = [];

  for (var i = 0; i < count; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      message: getRandomElementOfArray(MESSAGES),
      name: getRandomElementOfArray(NAMES)
    });
  }

  return comments;
};

var getDemoData = function () {
  var data = [];

  for (var i = 1; i <= DATA_COUNT; i++) {
    var dataItem = {
      url: 'photos/' + i + '.jpg',
      description: 'Описание' + i,
      likes: getRandomInteger(15, 200),
      comments: getComments(getRandomInteger(3, 5))
    };
    data.push(dataItem);
  }

  return data;
};

var data = getDemoData();

window.pictures.render(data);
window.bigPicture.show(data[0]);


