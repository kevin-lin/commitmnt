'use strict';

/* Controllers */

angular.module('myApp.controllers', ["firebase"])
  .controller('MainCtrl', ['$scope', '$location', '$firebase', '$firebaseSimpleLogin',
    function($scope, $location, $firebase, $firebaseSimpleLogin) {
      var ref = new Firebase('https://commitmnt.firebaseio.com/');
      $scope.auth = $firebaseSimpleLogin(ref);
      $scope.commitmnts = $scope.auth.user;
      $scope.login = function(){
        $scope.auth.$login('password', {
          email: $scope.username,
          password: $scope.password
        }).then(function(user){
          $scope.username = undefined;
          $scope.password = undefined;
          $location.path('/commitmnts');
          $scope.loginError = undefined;
        }, function(error){
          $scope.password = undefined;
          $scope.loginError = true;
        });
      };
    }
  ])
  .controller('HomeCtrl', ['$scope', '$location',
    function($scope, $location) {
      $scope.createUser = function(){
        $scope.auth.$createUser($scope.newUsername, $scope.newPassword)
          .then(function(user){
            $scope.newCredentialsError = undefined;
            $scope.auth.$login('password', {
              email: $scope.newUsername,
              password: $scope.newPassword
            }).then(function(){
              $scope.newUsername = undefined;
              $scope.newPassword = undefined;
              $location.path('/commitmnts');
            });
          }, function(error){
            $scope.newUsername = undefined;
            $scope.newPassword = undefined;
            $scope.newCredentialsError = true;
          });
      };
    }
  ])
  .controller('CommitmntsCtrl', ['$scope', '$firebase', function($scope, $firebase) {
    $scope.auth.$getCurrentUser().then(function(user){
      var ref = new Firebase("https://commitmnt.firebaseio.com/" + user.uid + "/commitmnts");
      $scope.commitmnts = $firebase(ref);
    });
    $scope.addNewCommitmnt = function(){
      $scope.commitmnts.$add({text: $scope.newCommitmnt, completed: undefined});
      console.log("new commitmnt added %s", $scope.newCommitmnt);
    };
    $scope.completeCommitmnt = function(id){
      $scope.commitmnts.$child(id).$update({completed: true});
    };
    $scope.breakCommitmnt = function(id){
      $scope.commitmnts.$child(id).$update({completed: false});
    };
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
