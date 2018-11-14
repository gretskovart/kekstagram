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

  var getCommentAvatar = function (itemComment) {
    return itemComment.avatar;
  };

  var getCommentMessage = function (itemComment) {
    return itemComment.message;
  };

  var getCommentName = function (itemComment) {
    return itemComment.name;
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

  window.showFullsizeImg = function (item) {
    var fullSizeWrapper = document.querySelector('.big-picture');

    var showComments = function () {
      var list = fullSizeWrapper.querySelector('.social__comments');
      clearAllChildren(list);

      var getCommentText = function (itemComment) {
        var listItemText = document.createElement('p');

        listItemText.classList.add('social__text');
        listItemText.textContent = getCommentMessage(itemComment);

        return listItemText;
      };

      var getCommentImg = function (itemComment) {
        var listItemImg = document.createElement('img');

        listItemImg.classList.add('social__picture');
        listItemImg.alt = 'Аватар комментатора фотографии';
        listItemImg.width = '35';
        listItemImg.height = '35';
        listItemImg.src = getCommentAvatar(itemComment);

        return listItemImg;
      };

      item.comments.forEach(function (itemComment) {
        var listItem = document.createElement('li');
        var text = getCommentText(itemComment);
        var img = getCommentImg(itemComment);

        listItem.appendChild(img);
        listItem.appendChild(text);
        listItem.classList.add('social__comment');
        list.appendChild(listItem);
      });
    };

    showComments();
    fullSizeWrapper.querySelector('.big-picture__img img').src = getImgSrc(item);
    fullSizeWrapper.querySelector('.likes-count').textContent = getCountOfLikes(item);
    fullSizeWrapper.querySelector('.comments-count').textContent = getCountOfComments(item);
    fullSizeWrapper.querySelector('.social__caption').textContent = getDescription(item);

    fullSizeWrapper.classList.remove('hidden');
  };

  var clearAllChildren = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
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
