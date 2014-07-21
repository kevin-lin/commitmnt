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
      var commitmntsRef = new Firebase("https://commitmnt.firebaseio.com/" + user.uid + "/commitmnts");
      $scope.commitmnts = $firebase(commitmntsRef);
      var statsRef = new Firebase("https://commitmnt.firebaseio.com/" + user.uid + "/stats");
      $scope.stats = $firebase(statsRef);
      var infoRef = new Firebase("https://commitmnt.firebaseio.com/" + user.uid + "/info");
      $scope.info = $firebase(infoRef);
    });
    $scope.addNewCommitmnt = function(){
      $scope.commitmnts.$add({text: $scope.newCommitmnt, completed: undefined}).then(function(){
        $scope.stats.$update({commitmntCount: $scope.stats.commitmntCount+1});
        $scope.newCommitmnt = undefined;
      });
    };
    $scope.completeCommitmnt = function(id){
      if($scope.commitmnts[id].completed != undefined){
        return;
      }
      $scope.commitmnts.$child(id).$update({completed: true}).then(function(){
        $scope.stats.$update({completedCommitmnts: $scope.stats.completedCommitmnts+1});
      });
    };
    $scope.breakCommitmnt = function(id){
      if($scope.commitmnts[id].completed != undefined){
        return;
      }
      $scope.commitmnts.$child(id).$update({completed: false}).then(function(){
        $scope.stats.$update({brokenCommitmnts: $scope.stats.brokenCommitmnts+1});
      });
    };
    $scope.undoCommitmnt = function(id){
      if($scope.commitmnts[id].completed == undefined){
        return;
      }
      else if($scope.commitmnts[id].completed == true){
        $scope.commitmnts.$child(id).$remove("completed").then(function(){
          $scope.stats.$update({completedCommitmnts: $scope.stats.completedCommitmnts-1});
        });
      }
      else if($scope.commitmnts[id].completed == false){
        $scope.commitmnts.$child(id).$remove("completed").then(function(){
          $scope.stats.$update({brokenCommitmnts: $scope.stats.brokenCommitmnts-1});
        });
      }
    }
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
