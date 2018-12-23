'use strict';

(function () {
  var closeFullsizeButton = window.pictures.fullSizeWrapper.querySelector('.big-picture__cancel');
  var imgUploadSection = window.pictures.picturesContent.querySelector('.img-upload');
  var closeUploadPopupButton = imgUploadSection.querySelector('#upload-cancel');
  var uploadPopup = imgUploadSection.querySelector('.img-upload__overlay');
  var uploadButton = imgUploadSection.querySelector('#upload-file');

  // загрузка изображений
  var popupUploadEscKeyupHandler = function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC && document.activeElement.parentNode !== window.formModule.formTextInputs) {
      window.imgPopupUploadCloseHandler();
    }
  };

  window.imgPopupUploadCloseHandler = function () {
    uploadPopup.classList.add('hidden');
    window.removeEventListener('keyup', popupUploadEscKeyupHandler);
  };

  var showImgUploadPrewiew = function () {
    uploadPopup.classList.remove('hidden');
    window.addEventListener('keyup', popupUploadEscKeyupHandler);
  };

  uploadButton.addEventListener('change', function () {
    window.upload();
    window.setDefaultEffect();
    window.setDefaultScale();
    showImgUploadPrewiew();
  });

  closeUploadPopupButton.addEventListener('click', window.imgPopupUploadCloseHandler);

  // открыть изображения из галлерии в полный экран
  var findImgObjInArray = function (target) {
    var currentImgSrc;
    var index;

    if (target.tagName === 'IMG') {
      currentImgSrc = target.getAttribute('src');
    } else if (target.tagName === 'A') {
      currentImgSrc = target.firstElementChild.attributes.src.nodeValue;
    }

    window.data.imgArray.some(function (item, i) {
      index = i;
      return item.url === currentImgSrc;
    });

    return window.data.imgArray[index];
  };

  var galleryImgCLickHandler = function (evt) {
    var target = evt.target;
    var currentObj = findImgObjInArray(target);

    if (!target.classList.contains('picture') && !target.parentNode.classList.contains('picture')) {
      return;
    }

    evt.preventDefault();

    window.pictures.showFullsizeImg(currentObj);
    document.body.classList.add('modal-open');
    window.addEventListener('keyup', popupFullsizeEscKeyupHandler);
  };

  var imgPopupFullsizeCloseHandler = function () {
    window.pictures.fullSizeWrapper.classList.add('hidden');
    document.body.classList.remove('modal-open');
    window.removeEventListener('keyup', popupFullsizeEscKeyupHandler);
  };

  var popupFullsizeEscKeyupHandler = function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC) {
      imgPopupFullsizeCloseHandler();
    }
  };

  window.pictures.picturesContent.addEventListener('click', galleryImgCLickHandler);

  window.pictures.picturesContent.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ENTER) {
      galleryImgCLickHandler(evt);
    }
  });

  closeFullsizeButton.addEventListener('click', imgPopupFullsizeCloseHandler);
})();
