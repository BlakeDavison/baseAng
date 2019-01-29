/*jshint esversion: 6 */
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/main.htm"
    })
    .when("/home", {
      resolve:{
        "check":function($location, $rootScope){
          if(!$rootScope.loggedIn)
          {
            $location.path('/');
          }
        }
      },
        templateUrl : "templates/home.htm"
    });
});

app.controller('homeCtrl', function($scope, $rootScope, $location)
{
  $scope.cir = true;
  $scope.number = 2;
  $scope.inError = false;
  $scope.arr = new Array($scope.number);
  $scope.update = function(){
    if(parseInt($scope.numShapes)>0 && parseInt($scope.numShapes)<6)
    {
      $scope.number = $scope.numShapes;
      $scope.inError = false;
      $scope.arr = new Array($scope.number);
    }
    else {
      $scope.inError = true;
    }
  };
  $scope.shape = function(){
    if($scope.sh == 'c')
    {
      $scope.cir = true;
    }
    else {
      $scope.cir = false;
    }
  };
  $scope.logout = function()
  {
    $rootScope.loggedIn = false;
    $location.path('/');
  };
});

app.controller('loginCtrl', function($scope, $rootScope, $http, $location)
{
  let URL = "https://jsonplaceholder.typicode.com/users";
  $rootScope.loggedIn = false;
  $scope.login = function()
{
  $http({
    method: 'GET',
    url: URL
  }).then(function(resp)
  {
    resp.data.forEach(function(v)
    {
      if(v.username == $scope.uname)
        {//if the user name exists
          if (v.address.city == $scope.pword)
          {//if the password is correct
            $rootScope.loggedIn = true;
            $rootScope.fName = v.name;
            $location.path('/home');
          }
          else {

          }
        }
        else {

        }
    });
  });
};
});
