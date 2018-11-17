'use strict';

(function () {
  var URL_DATA = 'https://js.dump.academy/kekstagram/data';
  var URL_SEND = 'https://js.dump.academy/kekstagram';
  var SERVER_RESPONSE = 10000;

  var responseChecker = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var error;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_RESPONSE;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        case 500:
          error = 'Ошибка сервера';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
          break;
      }

      if (error) {
        onError(error);
      }
    });

    return xhr;
  };

  var loadData = function (onLoad, onError) {
    var xhr = responseChecker(onLoad, onError);
    xhr.open('GET', URL_DATA);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = responseChecker(onLoad, onError);
    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };

  window.serverData = {
    loadData: loadData,
    sendData: sendData
  };
})();
