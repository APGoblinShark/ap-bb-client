angular
  .module('mydrugstore')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    // Define states and url
    $stateProvider
      .state('drug', {
        url: '/drugs',
        abstract: true,
        templateUrl: 'views/drug.html'
      })
      .state('drug.list', {
        url: '',
        templateUrl: 'views/drug.list.html',
        controller: 'DrugList'
      })
      .state('drug.details', {
        url: '/:drugId',
        templateUrl: 'views/drug.details.html',
        controller: 'DrugDetails'
      });

    // Unmatched urls go to drugs list
    $urlRouterProvider.otherwise('/drugs');

  });
