'use strict';

(function () {
  var rangeFilter = document.querySelector('.img-upload__effect-level');
  var line = rangeFilter.querySelector('.effect-level__line');
  var sliderPin = line.querySelector('.effect-level__pin');
  var sliderValue = rangeFilter.querySelector('.effect-level__value');
  var sliderFill = rangeFilter.querySelector('.effect-level__depth');

  var PinValue = {
    MIN: 0,
    MAX: 100
  };

  var sliderHandler = function (downEvt) {
    var startPinPosition = downEvt.clientX;
    var sliderLineRect = line.getBoundingClientRect();
    var currentPinPosition = (startPinPosition - sliderLineRect.left) / sliderLineRect.width * 100;

    getPinPosition(currentPinPosition);

    var movePinHandler = function (moveEvt) {
      var shift = startPinPosition - moveEvt.clientX;
      startPinPosition = moveEvt.clientX;

      var movePosition = (sliderPin.offsetLeft - shift) / sliderLineRect.width * 100;

      if (movePosition <= PinValue.MIN) {
        movePosition = PinValue.MIN;
        sliderValue.value = PinValue.MIN;
      } else if (movePosition >= PinValue.MAX) {
        movePosition = PinValue.MAX;
        sliderValue.value = PinValue.MAX;
      }

      getPinPosition(movePosition);
    };

    var upPinHandler = function () {
      rangeFilter.removeEventListener('mousemove', movePinHandler);
      rangeFilter.removeEventListener('mouseup', upPinHandler);
    };

    rangeFilter.addEventListener('mousemove', movePinHandler);
    rangeFilter.addEventListener('mouseup', upPinHandler);
  };

  var getPinPosition = function (value) {
    sliderPin.style.left = value + '%';
    sliderValue.value = Math.round(value);
    sliderFill.style.width = sliderPin.style.left;
  };

  line.addEventListener('mousedown', sliderHandler);
})();
