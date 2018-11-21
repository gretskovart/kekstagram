'use strict';

(function () {
  window.ESK_KEY_CODE = 27;
  window.ENTER_KEY_CODE = 13;

  var closeFullsizeButton = window.pictures.fullSizeWrapper.querySelector('.big-picture__cancel');
  var imgUploadSection = window.pictures.picturesContent.querySelector('.img-upload');
  var closeUploadPopupButton = imgUploadSection.querySelector('#upload-cancel');
  var uploadPopup = imgUploadSection.querySelector('.img-upload__overlay');
  var uploadButton = imgUploadSection.querySelector('#upload-file');

  // загрузка изображений
  var keyupEscPopupUploadHandlers = function (evt) {
    if (evt.keyCode === window.ESK_KEY_CODE && document.activeElement.parentNode !== window.formModule.formTextInputs) {
      window.closeImgPopupUpload();
    }
  };

  window.closeImgPopupUpload = function () {
    uploadPopup.classList.add('hidden');
    window.removeEventListener('keyup', keyupEscPopupUploadHandlers);
  };

  var showImgUploadPrewiew = function () {
    uploadPopup.classList.remove('hidden');
    window.addEventListener('keyup', keyupEscPopupUploadHandlers);
  };

  uploadButton.addEventListener('change', function () {
    window.upload();
    window.setDefaultEffect();
    window.setDefaultScale();
    showImgUploadPrewiew();
  });

  closeUploadPopupButton.addEventListener('click', window.closeImgPopupUpload);

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

  var clickGalleryImgHandlers = function (evt) {
    var target = evt.target;
    var currentObj = findImgObjInArray(target);

    if (!target.classList.contains('picture') && !target.parentNode.classList.contains('picture')) {
      return;
    }

    evt.preventDefault();

    window.pictures.showFullsizeImg(currentObj);
    document.body.classList.add('modal-open');
    window.addEventListener('keyup', keyupEscPopupFullsizeHandlers);
  };

  var closeImgPopupFullsize = function () {
    window.pictures.fullSizeWrapper.classList.add('hidden');
    document.body.classList.remove('modal-open');
    window.removeEventListener('keyup', keyupEscPopupFullsizeHandlers);
  };

  var keyupEscPopupFullsizeHandlers = function (evt) {
    if (evt.keyCode === window.ESK_KEY_CODE) {
      closeImgPopupFullsize();
    }
  };

  window.pictures.picturesContent.addEventListener('click', clickGalleryImgHandlers);

  window.pictures.picturesContent.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEY_CODE) {
      clickGalleryImgHandlers(evt);
    }
  });

  closeFullsizeButton.addEventListener('click', closeImgPopupFullsize);
})();
