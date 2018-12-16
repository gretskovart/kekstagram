'use strict';

(function () {
  var previewImg = document.querySelector('.img-upload__preview img');
  var uploadButton = document.querySelector('#upload-file');

  window.upload = function () {
    var file = uploadButton.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
})();
