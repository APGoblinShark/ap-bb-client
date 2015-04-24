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
        Drug
          .addTransaction(drugId, $scope.transaction)
          .then(function(data) {
            $modalInstance.close(data.data);
          }, function(err) {
            $modalInstance.close(null);
          })
      };

      $scope.cancel = function() {
        $modalInstance.dismiss();
      };

    }
  ]);
