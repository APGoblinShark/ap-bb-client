'use strict';

/**
 * @ngdoc overview
 * @name mydrugstore
 * @description
 * # mydrugstore
 *
 * Main module of the application.
 */

// Declaring a module + its dependencies
angular
  .module('mydrugstore.services', []);

angular
  .module('mydrugstore.config', []);

angular
  .module('mydrugstore.controllers', [
    'ui.bootstrap'
  ]);

angular
  .module('mydrugstore', [
    'ui.router',
    'mydrugstore.controllers',
    'mydrugstore.services',
    'mydrugstore.config'
  ]);


angular
  .module('mydrugstore')
  .run(function() {

  });
