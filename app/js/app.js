'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'MainCtrl'});
  $routeProvider.when('/new_user', {templateUrl: 'partials/new_user.html', controller: 'NewUserCtrl'});
  $routeProvider.when('/commitmnts', {templateUrl: 'partials/commitmnts.html', controller: 'CommitmntsCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
