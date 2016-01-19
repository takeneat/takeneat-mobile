angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope,$state,$ionicHistory) {
  $scope.$on('$ionicView.beforeEnter', function(){
    console.log('test');
    if (!$rootScope.userId) {
      $state.go('login');
    } else {
      $scope.userId = $rootScope.userId;
    }
  });

  $scope.doLogout = function() {
    $ionicHistory.clearCache().then(function() {
      //now you can clear history or goto another state if you need
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
      $state.go('login');
    })
  };
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

  $scope.doRefresh = function() {
    //$scope.requestDone = false;
    $http({
      method: 'POST',
      url: productsUrl
    }).then(function successCallback(response) {
      //$scope.requestDone = true;
      $scope.products = response.data;
      //if (!response.data) {
      //  $scope.showNoProduct = true;
      //}
    }, function errorCallback(response) {
      //$scope.showNoProduct = true;
      //$scope.requestDone = true;
    });
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  };
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
})

.controller('ProductCtrl', function($scope,$stateParams,$http,appConfig) {
  var productId = $stateParams.productId
  $scope.productId = productId;
  var productUrl = appConfig.baseApiUrl + '/products/' + productId;
  $http({
    method: 'GET',
    url: productUrl
  }).then(function successCallback(response) {
    $scope.productData = response.data;
  }, function errorCallback(response) {
  });
})


;
