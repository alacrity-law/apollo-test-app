/**
 * @fileOverview The HTTP web servervice.
 */
const http = require('http');

const BPromise = require('bluebird');
const log = require('logg').getLogger('app.service.web');

const web = module.exports = {};

/** @type {http} The http instance */
web.http = null;

/**
 * Init the webserver.
 *
 * @param {Express} app the Express instance.
 */
web.init = function (app) {
  web.http = http.createServer(app);
};

/**
 * Start the webserver.
 *
 * @param {Express} app the Express instance.
 * @return {BPromise} A promise.
 */
web.start = function (app) {
  return new BPromise(function (resolve, reject) {
    web.http.on('clientError', function (err) {
      log.warn('start() :: Client Error. Exception:', err);
    });
    web.http.on('error', function (err) {
      log.error('start() :: Failed to start web server. Exception:', err);
      reject(err);
    });

    web.http.listen(app.get('port'), function () {
      log.fine('start() :: Webserver launched. Listening on'
        + `port: ${app.get('port')}`);
      resolve();
    });
  });
};
