'use strict';

(function () {
  var onError = function (error) {
    var fragment = document.createDocumentFragment();
    var sectionError = window.data.copyTemplates('#error', '.error', window.formModule.main);

    fragment.appendChild(sectionError);
    window.formModule.main.appendChild(fragment);

    var modalErrorText = document.querySelector('.error__title');

    modalErrorText.textContent = error;
  };

  var copyTemplates = function (templateName, sectionName) {
    var template = document.querySelector(templateName);
    var section = template.content.querySelector(sectionName);

    return section.cloneNode(true);
  };

  var onLoad = function (objects) {
    if (Array.isArray(objects)) {
      window.data.imgArray = objects;
      window.pictures.renderImages(window.data.imgArray);
      // выводим фильтр фото
      window.showFilters();
    }

    return window.data.imgArray;
  };

  window.data = {
    onError: onError,
    copyTemplates: copyTemplates,
    imgArray: []
  };

  window.serverData.loadData(onLoad, window.data.onError);
})();
