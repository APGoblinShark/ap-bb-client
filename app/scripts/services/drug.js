'use strict';

angular
  .module('mydrugstore.services')
  .factory('Drug', [
    '$http', '$q', 'myDrugStoreConfiguration',
    function($http, $q, myDrugStoreConfiguration) {

      function getAll() {
        return $http({
          method: 'GET',
          url: myDrugStoreConfiguration.serverUrl + 'products'
        })
          .success(function(data) {
            return data;
          })
          .error(function(data, status) {
            return null;
          });
      }

      function get(drugId) {

        return $http({
          method: 'GET',
          url: myDrugStoreConfiguration.serverUrl + 'products/' + drugId
        })
          .success(function(data) {
            return data;
          })
          .error(function(data, status) {
            return null;
          });
      }

      function addTransaction(drugId, transactionDto) {
        return $http({
          method: 'POST',
          url: myDrugStoreConfiguration.serverUrl + 'products/' + drugId + '/transactions',
          data: transactionDto,
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .success(function(data) {
            return data;
          })
          .error(function(data, status) {
            return null;
          });
      }

      return {
        getAll: getAll,
        get: get,
        addTransaction: addTransaction
      };
    }
  ]);
