'use strict';

(function () {
  var filtersBlock = document.querySelector('.img-filters');
  var filtersForm = filtersBlock.querySelector('.img-filters__form');
  var filtersBtns = filtersBlock.querySelectorAll('.img-filters__button');
  var filterPopular = filtersForm.querySelector('#filter-popular');
  var filterNew = filtersForm.querySelector('#filter-new');
  var filterDiscussed = filtersForm.querySelector('#filter-discussed');

  var chooseFilter = function (target) {
    var data;
    var cloneArray = window.data.imgArray.slice(0);

    switch (target) {
      case filterPopular:
        window.pictures.renderImages(window.data.imgArray);

        break;
      case filterNew:
        data = getRandomImg(cloneArray);

        window.pictures.renderImages(data);

        break;
      case filterDiscussed:
        data = sortByDiscussed(cloneArray);

        window.pictures.renderImages(data);

        break;
    }
  };

  var shuffleArray = function (array) {
    function compareRandom() {
      return Math.random() - 0.5;
    }

    var sorted = array.sort(compareRandom);

    return sorted;
  };

  var getRandomImg = function (photos) {
    return shuffleArray(photos).slice(0, 10);
  };

  var sortByDiscussed = function (array) {
    return array.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var changeActiveBtn = function (currentBtn) {
    filtersBtns.forEach(function (filter) {
      filter.classList.remove('img-filters__button--active');
    });

    currentBtn.classList.add('img-filters__button--active');
  };

  var excludeDebounce = function (callback) {
    var lastTimeout;

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(callback, window.constants.DEBOUNCE_INTERVAL);
  };

  var filterBtnClickHandler = function (evt) {
    var target = evt.target;

    if (target.tagName === 'BUTTON') {
      changeActiveBtn(target);

      excludeDebounce(function () {
        chooseFilter(target);
      });
    }
  };

  filtersBlock.addEventListener('click', filterBtnClickHandler);

  filtersBlock.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC) {
      filterBtnClickHandler();
    }
  });

  window.showFilters = function () {
    filtersBlock.classList.remove('img-filters--inactive');
  };
})();
