'use strict';

(function () {
  var form = window.pictures.picturesContent.querySelector('.img-upload__form');

  var formTextInputs = form.querySelector('.img-upload__text');
  var main = document.querySelector('main');

  var chechHashtagsInput = function (value) {
    var arrayOfHashtags = value.replace(/\s+/g, ' ').trim().toLowerCase().split(' ');
    var result;
    var errorValidity;

    // хэш-тег начинается с символа # (решётка);
    var checkFirstSymbol = function (arr) {
      var arrayOfFirstSymbols = arr.map(function (item) {
        return item.slice(0, 1);
      });

      result = arrayOfFirstSymbols.every(function (item) {
        return item === '#';
      });

      return !!result;
    };

    // хеш-тег не может состоять только из одной решётки;
    // максимальная длина одного хэш-тега 20 символов, включая решётку;
    var checkLength = function (arr) {
      result = arr.some(function (item) {
        return item.length < window.constants.HASHTAG_LENGTH_MIN || item.length > window.constants.HASHTAG_LENGTH_MAX;
      });

      return !!result;
    };

    // один и тот же хэш-тег не может быть использован дважды;
    // теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.
    var checkDublicates = function (arr) {
      result = false;

      arr.some(function (elem, elemIndex) {
        for (var index = 0; index < arr.length; index++) {
          if (elemIndex !== index && arr[index] === elem) {
            result = true;
          }
        }
      });

      return result;
    };

    // нельзя указать больше пяти хэш-тегов;
    var checkCountOfHashtags = function (arr) {
      return arr.length > window.constants.HASHTAGS_LIMIT;
    };

    if (!checkFirstSymbol(arrayOfHashtags)) {
      errorValidity = 'Хеш-теги должны начинаться с символа решетки - #';

    } else if (checkLength(arrayOfHashtags)) {
      errorValidity = 'Длина хеш-тегов должна быть от 2 до 20 символов включая символ решетки - #';

    } else if (checkDublicates(arrayOfHashtags)) {
      errorValidity = 'Хеш-теги не должны повторяться';

    } else if (checkCountOfHashtags(arrayOfHashtags)) {
      errorValidity = 'Нельзя указать больше пяти хэш-тегов';

    }

    return errorValidity;
  };

  // если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
  var formInputFocusoutHandler = function (evt) {
    var hashTagsInput = form.querySelector('.text__hashtags');
    var hashTagsInputValue = hashTagsInput.value;

    evt.preventDefault();
    hashTagsInput.removeAttribute('style');
    hashTagsInput.setCustomValidity('');

    if (hashTagsInputValue.length) {
      var hashTagsResult = chechHashtagsInput(hashTagsInputValue);

      if (hashTagsResult) {
        hashTagsInput.setCustomValidity(hashTagsResult);
        hashTagsInput.style.border = '2px solid red';
      }
    }
  };

  var loadSuccess = function () {
    window.imgPopupUploadCloseHandler();

    var fragment = document.createDocumentFragment();
    var sectionSuccess = window.data.copyTemplates('#success', '.success', window.formModule.main);

    fragment.appendChild(sectionSuccess);

    window.formModule.main.appendChild(fragment);

    form.reset();
  };

  var successBtnClickHandler = function (evt) {
    var target = evt.target;

    if (target.classList.contains('success__button')) {
      hidePopupSuccess();
    }
  };

  var hidePopupSuccess = function () {
    var successPopup = document.querySelector('.success');

    if (successPopup) {
      successPopup.remove();
    }
  };

  var popupUpSuccessEscKeyupHandler = function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC) {
      hidePopupSuccess();
    }
  };

  var overlayClickHandler = function (evt) {
    var target = evt.target;

    if (target.classList.contains('success')) {
      hidePopupSuccess();
    }
  };

  document.addEventListener('keyup', popupUpSuccessEscKeyupHandler);
  document.addEventListener('click', successBtnClickHandler);
  document.addEventListener('click', overlayClickHandler);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.serverData.sendData(new FormData(form), loadSuccess, window.data.onError);
  });

  window.formModule = {
    formTextInputs: formTextInputs,
    main: main
  };

  window.formModule.formTextInputs.addEventListener('focusout', formInputFocusoutHandler);
})();
