'use strict';

(function () {
  var rangeFilter = document.querySelector('.img-upload__effect-level');
  var line = rangeFilter.querySelector('.effect-level__line');
  var sliderPin = line.querySelector('.effect-level__pin');
  var sliderValue = rangeFilter.querySelector('.effect-level__value');
  var sliderFill = rangeFilter.querySelector('.effect-level__depth');

  var effectsList = window.pictures.picturesContent.querySelector('.effects__list');
  var defaultEffectInput = effectsList.querySelector('#effect-none');
  var currentEffect = effectsList.querySelector('.effects__radio:checked');
  var currentEffectName = currentEffect.value;
  var prewiewImg = window.pictures.picturesContent.querySelector('.img-upload__preview img');

  var photoEffects = {
    chrome: {
      CLASS: 'effects__preview--chrome',
      PROPERTY: 'grayscale',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    sepia: {
      CLASS: 'effects__preview--sepia',
      PROPERTY: 'sepia',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    marvin: {
      CLASS: 'effects__preview--marvin',
      PROPERTY: 'invert',
      MIN_VALUE: 0,
      MAX_VALUE: 100,
      UNIT: '%'
    },
    phobos: {
      CLASS: 'effects__preview--phobos',
      PROPERTY: 'blur',
      MIN_VALUE: 0,
      MAX_VALUE: 3,
      UNIT: 'px'
    },
    heat: {
      CLASS: 'effects__preview--heat',
      PROPERTY: 'brightness',
      MIN_VALUE: 1,
      MAX_VALUE: 3,
      UNIT: ''
    }
  };

  var effectValue = {
    MAX: 100,
    DEFAULT: 100,
  };

  var pinValue = {
    MIN: 0,
    MAX: 100
  };

  var getCurrentEffect = function () {
    currentEffect = effectsList.querySelector('.effects__radio:checked');
    currentEffectName = currentEffect.value;

    return currentEffectName;
  };

  window.setDefaultEffect = function () {
    currentEffect.removeAttribute('checked');
    defaultEffectInput.setAttribute('checked', '');

    rangeFilter.classList.add('hidden');

    prewiewImg.removeAttribute('class');
    prewiewImg.classList.add('effects__preview--' + getCurrentEffect());

    // выставляем ползунок на 100% по умолчанию
    getPinPosition(window.constants.MAX_PIN_PERCENT);
    applyEffect(effectValue.DEFAULT);
  };

  var changeEffectHandler = function (evt) {
    var target = evt.target;

    if (target.name === 'effect') {
      currentEffect.removeAttribute('checked');
      target.setAttribute('checked', '');
      rangeFilter.classList.remove('hidden');
      getPinPosition(window.constants.MAX_PIN_PERCENT);

      if (target.value === window.constants.DEFAULT_FILTER_NAME) {
        window.setDefaultEffect();

        return;
      }

      currentEffectName = getCurrentEffect();
      var currentEffectClassName = photoEffects[currentEffectName].CLASS;

      prewiewImg.removeAttribute('class');
      prewiewImg.classList.add(currentEffectClassName);

      applyEffect(effectValue.DEFAULT);
    }
  };

  var getFilterValue = function (effect, value) {
    return value * (photoEffects[effect].MAX_VALUE - photoEffects[effect].MIN_VALUE) / effectValue.MAX + photoEffects[effect].MIN_VALUE + photoEffects[effect].UNIT;
  };

  var applyEffect = function (value) {
    prewiewImg.style.filter = currentEffectName !== window.constants.DEFAULT_FILTER_NAME ? photoEffects[currentEffectName].PROPERTY + '(' + getFilterValue(currentEffectName, value) + ')' : window.constants.DEFAULT_FILTER_NAME;
  };

  effectsList.addEventListener('change', changeEffectHandler);

  // слайдер
  var sliderHandler = function (downEvt) {
    var startPinPosition = downEvt.clientX;
    var sliderLineRect = line.getBoundingClientRect();
    var currentPinPosition = (startPinPosition - sliderLineRect.left) / sliderLineRect.width * 100;

    getPinPosition(currentPinPosition);
    applyEffect(currentPinPosition);

    var movePinHandler = function (moveEvt) {
      var shift = startPinPosition - moveEvt.clientX;
      startPinPosition = moveEvt.clientX;

      var movePosition = (sliderPin.offsetLeft - shift) / sliderLineRect.width * 100;

      if (movePosition <= pinValue.MIN) {
        movePosition = pinValue.MIN;
        sliderValue.value = pinValue.MIN;
      } else if (movePosition >= pinValue.MAX) {
        movePosition = pinValue.MAX;
        sliderValue.value = pinValue.MAX;
      }

      getPinPosition(movePosition);
      applyEffect(movePosition);
    };

    var upPinHandler = function () {
      document.removeEventListener('mousemove', movePinHandler);
      document.removeEventListener('mouseup', upPinHandler);
    };

    document.addEventListener('mousemove', movePinHandler);
    document.addEventListener('mouseup', upPinHandler);
  };

  var getPinPosition = function (value) {
    sliderPin.style.left = value + '%';
    sliderValue.value = Math.round(value);
    sliderFill.style.width = sliderPin.style.left;
  };

  line.addEventListener('mousedown', sliderHandler);
})();
