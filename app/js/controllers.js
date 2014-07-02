'use strict';

/* Controllers */

angular.module('myApp.controllers', ["firebase"])
  .controller('HomeCtrl', ['$scope', function($scope) {

  }])
  .controller('MyCtrl1', ['$scope', '$firebase', function($scope, $firebase) {
    var commitmntRef = new Firebase("https://commitmnt.firebaseio.com/commitmnts");
    $scope.commitmnts = $firebase(commitmntRef);
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
