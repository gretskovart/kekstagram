'use strict';

(function () {
  var imgPreviewContainer = window.pictures.picturesContent.querySelector('.img-upload__preview-container');
  var valueScale = imgPreviewContainer.querySelector('.scale__control--value');
  var increaseScale = imgPreviewContainer.querySelector('.scale__control--bigger');
  var decreaseScale = imgPreviewContainer.querySelector('.scale__control--smaller');
  var imgPreview = imgPreviewContainer.querySelector('.img-upload__preview');

  var scaleValues = {
    MIN: 25,
    STEP: 25,
    MAX: 100,
    DEFAULT: 100
  };

  var clickScaleBtnHandler = function (point) {
    var currentScale = parseInt(valueScale.value, 10);

    currentScale = currentScale + (scaleValues.STEP * point);

    if (currentScale >= scaleValues.MIN && currentScale <= scaleValues.MAX) {
      setScale(currentScale);
    }
  };

  var setScale = function (value) {
    valueScale.value = value + '%';
    imgPreview.style.transform = 'scale(' + value / 100 + ')';
  };

  increaseScale.addEventListener('click', function () {
    clickScaleBtnHandler(1);
  });

  decreaseScale.addEventListener('click', function () {
    clickScaleBtnHandler(-1);
  });

  window.setDefaultScale = function () {
    setScale(scaleValues.DEFAULT);
  };
})();
