'use strict';

(function () {
  var closeFullsizeButton = window.pictures.fullSizeWrapper.querySelector('.big-picture__cancel');
  var imgUploadSection = window.pictures.picturesContent.querySelector('.img-upload');
  var closeUploadPopupButton = imgUploadSection.querySelector('#upload-cancel');
  var uploadPopup = imgUploadSection.querySelector('.img-upload__overlay');
  var uploadButton = imgUploadSection.querySelector('#upload-file');

  // загрузка изображений
  var keyupEscPopupUploadHandler = function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC && document.activeElement.parentNode !== window.formModule.formTextInputs) {
      window.closeImgPopupUploadHandler();
    }
  };

  window.closeImgPopupUploadHandler = function () {
    uploadPopup.classList.add('hidden');
    window.removeEventListener('keyup', keyupEscPopupUploadHandler);
  };

  var showImgUploadPrewiew = function () {
    uploadPopup.classList.remove('hidden');
    window.addEventListener('keyup', keyupEscPopupUploadHandler);
  };

  uploadButton.addEventListener('change', function () {
    window.upload();
    window.setDefaultEffect();
    window.setDefaultScale();
    showImgUploadPrewiew();
  });

  closeUploadPopupButton.addEventListener('click', window.closeImgPopupUploadHandler);

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

  var clickGalleryImgHandler = function (evt) {
    var target = evt.target;
    var currentObj = findImgObjInArray(target);

    if (!target.classList.contains('picture') && !target.parentNode.classList.contains('picture')) {
      return;
    }

    evt.preventDefault();

    window.pictures.showFullsizeImg(currentObj);
    document.body.classList.add('modal-open');
    window.addEventListener('keyup', keyupEscPopupFullsizeHandler);
  };

  var closeImgPopupFullsizeHandler = function () {
    window.pictures.fullSizeWrapper.classList.add('hidden');
    document.body.classList.remove('modal-open');
    window.removeEventListener('keyup', keyupEscPopupFullsizeHandler);
  };

  var keyupEscPopupFullsizeHandler = function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC) {
      closeImgPopupFullsizeHandler();
    }
  };

  window.pictures.picturesContent.addEventListener('click', clickGalleryImgHandler);

  window.pictures.picturesContent.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ENTER) {
      clickGalleryImgHandler(evt);
    }
  });

  closeFullsizeButton.addEventListener('click', closeImgPopupFullsizeHandler);
})();
