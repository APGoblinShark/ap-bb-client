'use strict';

angular
  .module('mydrugstore.controllers')
  .controller('DrugDetails', [
    '$scope', '$stateParams', '$modal', 'Drug',
    function($scope, $stateParams, $modal, Drug) {

      var CONST_BUY = 'BUY';

      $scope.drug = {};
      $scope.drugBalance = 0;

      var drugId = $stateParams.drugId;
      //TODO check drugId ok

      function computeBalance() {
        var balance = 0;
        var quantity = 0;
        var transactions = $scope.drug.transactions;
        angular
          .forEach(transactions, function(transaction) {
            var t_price = transaction.price;
            var t_quantity = transaction.quantity;
            //TODO put me in a constant file
            //Maybe the file const duplicated by grunt ?
            if (transaction.movement === CONST_BUY) {
              t_price = -t_price;
            } else {
              t_quantity = - t_quantity;
            }

            balance += t_price;
            quantity += t_quantity;

          });

        $scope.drugBalance = balance;
        $scope.drug.quantity = quantity;
      }

      function addTransaction(transaction) {
        $scope.drug.transactions.push(transaction);
        computeBalance();
      }

      function loadDrug() {
        Drug
          .get(drugId)
          .then(function(data) {
            $scope.drug = data.data;
            computeBalance();
          }, function(err) {
            //TODO handle error
          });
      }

      $scope.getClassForBalance = function getClassForBalance() {
        var isBalancePositive = ($scope.drugBalance >= 0);
        return {
          "label": true,
          "label-success": isBalancePositive,
          "label-danger": !isBalancePositive,
          "glyphicon": true,
          "glyphicon-plus": isBalancePositive,
          "glyphicon-minus": !isBalancePositive
        };
      };

      $scope.getClassForQuantity = function getClassForQuantity(transaction) {
        var isBuyTransaction = (transaction.movement === CONST_BUY);
        return {
          "label": true,
          "label-success": isBuyTransaction,
          "label-danger": !isBuyTransaction,
          "glyphicon": true,
          "glyphicon-chevron-up": isBuyTransaction,
          "glyphicon-chevron-down": !isBuyTransaction
        };
      };

      $scope.getClassForPrice = function getClassForPrice(transaction) {
        var isBuyTransaction = (transaction.movement === CONST_BUY);
        return {
          "label": true,
          "label-success": !isBuyTransaction,
          "label-danger": isBuyTransaction,
          "glyphicon": true,
          "glyphicon-chevron-up": !isBuyTransaction,
          "glyphicon-chevron-down": isBuyTransaction
        };
      };

      $scope.getFormattedNumber = function getFormattedNumber(value) {
        return Math.abs(value);
      };

      $scope.getFormattedDate = function getFormattedDate(transaction) {
        var momentDate = moment(transaction.date).format('DD/MM/YYYY');
        return momentDate;
      };

      $scope.openAddTransactionModal = function openAddTransactionModal() {
console.log('cureent id is ', $scope.drug.id);
        var modalInstance = $modal.open({
          templateUrl: 'views/modal/addTransactionModal.html',
          controller: 'AddTransactionCtrl',
          resolve: {
            drugId: function() {
              return $scope.drug.id;
            }
          }
        });

        modalInstance
          .result
          .then(function(transaction) {
            addTransaction(transaction);
          }, function() {

          });
      };

      //Init drug
      loadDrug();

    }
  ]);
