'use strict';

angular
  .module('mydrugstore.services')
  .factory('Drug', [
    '$http', '$q',
    function($http, $q) {

      function getAll() {
        return $http({
            method: 'GET',
            url: 'data/drugs.json'
          })
          .success(function(data) {
            return data;
          })
          .error(function(data, status) {
            return null;
          });
      }

      function get(drugId) {
        console.log('receivedId : ', drugId);

        return $http({
            method: 'GET',
            url: 'data/drug.json'
          })
          .success(function(data) {
            return data;
          })
          .error(function(data, status) {
            return null;
          });
      }

      function addTransaction(drugId, transactionDto) {
        var deferred = $q.defer();

        //TODO remove me
        var transaction = transactionDto;
        transaction.id = '12345';
        transaction.date = moment();

        setTimeout(function() {
          deferred.resolve(transaction);
        }, 1000);

        return deferred.promise;
      }

      return {
        getAll: getAll,
        get: get,
        addTransaction: addTransaction
      };
    }
  ]);
