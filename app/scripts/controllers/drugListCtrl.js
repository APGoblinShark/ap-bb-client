'use strict';

angular
  .module('mydrugstore.controllers')
  .controller('DrugList', [
    '$scope', '$state', 'Drug',
    function($scope, $state, Drug) {

      $scope.drugs = [];

      function getDrugs() {
        Drug
          .getAll()
          .then(function(data) {
            $scope.drugs = data.data;
          }, function(err) {
            //TODO handle error
          });
      }

      $scope.redirectToDetails = function redirectToDetails(id) {
        $state.go('drug.details', {
          drugId: id
        });
      };

      //Init array of drugs
      getDrugs();

    }
  ]);
