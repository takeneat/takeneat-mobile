angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope,$state) {
  $scope.userId = $rootScope.userId;
})

.controller('LoginCtrl', function($scope,$rootScope,$http,$state,appConfig) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.loginFailed = false;

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $scope.loginFailed = false;
    var loginUrl = appConfig.baseApiUrl + '/users/login';
    $http({
      method: 'POST',
      url: loginUrl,
      data : $scope.loginData
    }).then(function successCallback(response) {
      $rootScope.userId = response.data;
      $state.go('app.home');
    }, function errorCallback(response) {
      $scope.loginFailed = true;
    });

  };
})

.controller('HomeCtrl', function($scope,$http,appConfig) {
  var productsUrl = appConfig.baseApiUrl + '/products/search';
  $scope.requestDone = false;
  $http({
    method: 'POST',
    url: productsUrl
  }).then(function successCallback(response) {
    $scope.requestDone = true;
    $scope.products = response.data;
    if (!response.data) {
      $scope.showNoProduct = true;
    }
  }, function errorCallback(response) {
    $scope.showNoProduct = true;
    $scope.requestDone = true;
  });

})

.controller('ProfileCtrl', function($scope,$stateParams,$http,appConfig) {
  var userId = $stateParams.userId
  $scope.userId = userId;
  var profileUrl = appConfig.baseApiUrl + '/users/' + userId;
  $http({
    method: 'GET',
    url: profileUrl
  }).then(function successCallback(response) {
    $scope.userData = response.data;
  }, function errorCallback(response) {
  });
});
