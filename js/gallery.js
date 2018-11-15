'use strict';

(function () {
  var closeFullsizeButton = window.pictures.fullSizeWrapper.querySelector('.big-picture__cancel');
  var imgUploadSection = window.pictures.picturesContent.querySelector('.img-upload');
  var closeUploadPopupButton = imgUploadSection.querySelector('#upload-cancel');
  var uploadPopup = imgUploadSection.querySelector('.img-upload__overlay');

  var ESK_KEY_CODE = 27;

  // загрузка изображений
  var keyupEscPopupUploadHandlers = function (evt) {
    if (evt.keyCode === ESK_KEY_CODE) {
      closeImgPopupUpload();
    }
  };

  var closeImgPopupUpload = function () {
    uploadPopup.classList.add('hidden');
    window.removeEventListener('keyup', keyupEscPopupUploadHandlers);
  };

  window.uploadButton = imgUploadSection.querySelector('#upload-file');

  var showImgUploadPrewiew = function () {
    uploadPopup.classList.remove('hidden');
    window.addEventListener('keyup', keyupEscPopupUploadHandlers);
  };

  window.uploadButton.addEventListener('change', function () {
    window.upload();
    showImgUploadPrewiew();
  });

  closeUploadPopupButton.addEventListener('click', closeImgPopupUpload);

  // открыть изображения из галлерии в полный экран

  var findImgObjInArray = function (target) {
    var currentImgSrc = target.getAttribute('src');
    var index;

    window.data.imgArray.some(function (item, i) {
      index = i;
      return item.url === currentImgSrc;
    });

    return window.data.imgArray[index];
  };

  var clickGalleryImgHandlers = function (evt) {
    var target = evt.target;
    var currentObj = findImgObjInArray(target);

    if (!target.parentNode.classList.contains('picture') || target.tagName !== 'IMG') {
      return;
    }

    evt.preventDefault();

    window.pictures.showFullsizeImg(currentObj);
    window.addEventListener('keyup', keyupEscPopupFullsizeHandlers);
  };

  var closeImgPopupFullsize = function () {
    window.pictures.fullSizeWrapper.classList.add('hidden');
    window.removeEventListener('keyup', keyupEscPopupFullsizeHandlers);
  };

  var keyupEscPopupFullsizeHandlers = function (evt) {
    if (evt.keyCode === ESK_KEY_CODE) {
      closeImgPopupFullsize();
    }
  };

  window.pictures.picturesContent.addEventListener('click', clickGalleryImgHandlers);
  closeFullsizeButton.addEventListener('click', closeImgPopupFullsize);
})();
