'use strict';

(function () {
  var picturesContent = document.querySelector('.pictures');

  var getImgSrc = function (item) {
    return item.url;
  };

  var getCountOfLikes = function (item) {
    return item.likes;
  };

  var getCountOfComments = function (item) {
    return item.comments.length;
  };

  var getCommentAvatar = function (item, index) {
    return item[index].avatar;
  };

  var getCommentMessage = function (item, index) {
    return item[index].message;
  };

  var getCommentName = function (item, index) {
    return item[index].name;
  };

  var getDescription = function (item) {
    return item.description;
  };

  var collectImages = function (item) {
    var sectionImg = window.data.copyTemplates('#picture', '.picture');

    sectionImg.querySelector('.picture__img').src = getImgSrc(item);
    sectionImg.querySelector('.picture__likes').textContent = getCountOfLikes(item);
    sectionImg.querySelector('.picture__comments').textContent = getCountOfComments(item);

    return sectionImg;
  };

  window.renderImages = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (item) {
      var perImg = collectImages(item);
      fragment.appendChild(perImg);
    });

    picturesContent.appendChild(fragment);
  };
})();
