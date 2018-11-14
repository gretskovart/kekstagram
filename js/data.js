'use strict';

(function () {
  window.data = {
    onError: function (error) {
      var main = document.querySelector('main');
      var fragment = document.createDocumentFragment();
      var sectionError = window.data.copyTemplates('#error', '.error', main);

      fragment.appendChild(sectionError);
      main.appendChild(fragment);

      var modalErrorText = document.querySelector('.error__title');

      modalErrorText.textContent = error;
    },

    copyTemplates: function (templateName, sectionName) {
      var template = document.querySelector(templateName);
      var section = template.content.querySelector(sectionName);

      return section.cloneNode(true);
    },

    imgArray: []
  };

  var onLoad = function (objects) {
    if (Array.isArray(objects)) {
      window.data.imgArray = objects;
      window.renderImages(window.data.imgArray);
      window.showFullsizeImg(window.data.imgArray[0]);
    }
  };

  window.serverData.loadData(onLoad, window.data.onError);
})();
