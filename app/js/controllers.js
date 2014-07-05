'use strict';

/* Controllers */

angular.module('myApp.controllers', ["firebase"])
  .controller('MainCtrl', ['$scope', '$firebase', '$firebaseSimpleLogin',
    function($scope, $firebase, $firebaseSimpleLogin) {
      var ref = new Firebase('https://commitmnt.firebaseio.com/');
      $scope.auth = $firebaseSimpleLogin(ref);
    }
  ])
  .controller('NewUserCtrl', ['$scope',
    function($scope) {
      $scope.createUser = function(){
        $scope.auth.$createUser($scope.username, $scope.password);
      };
    }
  ])
  .controller('LoginCtrl', ['$scope',
    function($scope) {
      $scope.login = function(){
        $scope.auth.$login('password', {
          email: $scope.username,
          password: $scope.password
        });
      };
    }
  ])
  .controller('MyCtrl1', ['$scope', '$firebase', function($scope, $firebase) {
    var commitmntRef = new Firebase("https://commitmnt.firebaseio.com/commitmnts");
    $scope.commitmnts = $firebase(commitmntRef);
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
