'use strict';

(function () {
  window.data = {
    onError: function (error) {
      var fragment = document.createDocumentFragment();
      var sectionError = window.data.copyTemplates('#error', '.error', window.main);

      fragment.appendChild(sectionError);
      window.main.appendChild(fragment);

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
      window.pictures.renderImages(window.data.imgArray);
    }
  };

  window.serverData.loadData(onLoad, window.data.onError);
})();
