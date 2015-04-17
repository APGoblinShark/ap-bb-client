'use strict';

angular
  .module('mydrugstore.controllers')
  .controller('AddTransactionCtrl', [
    '$scope', '$modalInstance', 'Drug', 'drugId',
    function($scope, $modalInstance, Drug, drugId) {

      $scope.transaction = {
        price: 0,
        quantity: 0,
        movement: 'BUY',
        details: ''
      };

      $scope.ok = function() {
        //TODO check DTO ok
        console.log($scope.transaction);
        console.log(drugId);
        Drug
          .addTransaction(drugId, $scope.transaction)
          .then(function(data) {
            console.log('Received');
            $modalInstance.close(data);
          }, function(err) {
            //TODO handle error
            $modalInstance.close(null);
          })
      };

      $scope.cancel = function() {
        $modalInstance.dismiss();
      };

    }
  ]);
