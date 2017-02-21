var myApp=angular.module('myDiary', ['ngRoute','ngStorage']);
myApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/',{
    templateUrl:'app/partials/login.html',
    controller:'LoginController'
  })

  .when('/home',{
    resolve:{
      "check":function($location,$rootScope,$sessionStorage){
        if (!$sessionStorage.isLoggedIn) {
            $location.path("/");
        }
      }
    },
    templateUrl:'app/partials/home.html',
    controller:'HomeController'
  });

  
}]);
