'use strict';

(function () {
  var form = window.pictures.picturesContent.querySelector('.img-upload__form');

  window.formTextInputs = form.querySelector('.img-upload__text');
  window.main = document.querySelector('main');

  var chechHashtagsInput = function (value) {
    var arrayOfHashtags = value.split(' ');
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
        return item.length < 2 || item.length > 20;
      });

      return !!result;
    };

    // один и тот же хэш-тег не может быть использован дважды;
    // теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.
    var checkDublicates = function (arr) {
      result = 0;

      for (var j = 0; j < arr.length; j++) {
        for (var k = j + 1; k < arr.length; k++) {
          var a = arr[k].toLowerCase();
          var b = arr[j].toLowerCase();

          if (a === b) {
            result++;

            break;
          }
        }
      }

      return !!result;
    };

    // нельзя указать больше пяти хэш-тегов;
    var checkCountOfHashtags = function (arr) {
      return arr.length > 5;
    };

    if (!checkFirstSymbol(arrayOfHashtags)) {
      errorValidity = 'Хеш-теги должны начинаться с символа решетки - #';

    } else if (checkLength(arrayOfHashtags)) {
      errorValidity = 'Длина хеш-тегов должна быть от 2 до 20 символов включая символ решетки - #';

    } else if (checkDublicates(arrayOfHashtags)) {
      errorValidity = 'Хеш-теги не должны повторяться';

    } else if (checkCountOfHashtags(arrayOfHashtags)) {
      errorValidity = 'Хеш-теги не должны повторяться';

    } else {
      return false;
    }

    return errorValidity;
  };

  // если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.


  var formInputsChecker = function (evt) {
    var hashTagsInput = form.querySelector('.text__hashtags');
    var hashTagsInputValue = hashTagsInput.value;

    evt.preventDefault();
    hashTagsInput.removeAttribute('style');

    if (hashTagsInputValue.length) {
      var hashTagsResult = chechHashtagsInput(hashTagsInputValue);

      if (hashTagsResult) {
        hashTagsInput.setCustomValidity(hashTagsResult);
        hashTagsInput.style.border = '2px solid red';
        form.setCustomValidity(hashTagsResult);
      }
    }
  };

  var loadSuccess = function () {
    window.closeImgPopupUpload();

    var fragment = document.createDocumentFragment();
    var sectionSuccess = window.data.copyTemplates('#success', '.success', window.main);

    fragment.appendChild(sectionSuccess);

    window.main.appendChild(fragment);

    form.reset();
  };

  var clickSuccessBtnHadlers = function (evt) {
    var target = evt.target;

    if (target.classList.contains('success__button')) {
      hidePopupSuccess();
    }
  };

  var hidePopupSuccess = function () {
    var successPopup = document.querySelector('.success');

    successPopup.remove();
  };

  var keyupEscPopupUpSuccessHandlers = function (evt) {
    if (evt.keyCode === window.ESK_KEY_CODE) {
      hidePopupSuccess();
    }
  };

  var clickOverlayHandlers = function (evt) {
    var target = evt.target;

    if (target.classList.contains('success')) {
      hidePopupSuccess();
    }
  };

  document.addEventListener('keyup', keyupEscPopupUpSuccessHandlers);
  document.addEventListener('click', clickSuccessBtnHadlers);
  document.addEventListener('click', clickOverlayHandlers);

  window.formTextInputs.addEventListener('focusout', formInputsChecker);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
debugger;
    window.serverData.sendData(new FormData(form), loadSuccess, window.data.onError);
  });
})();
