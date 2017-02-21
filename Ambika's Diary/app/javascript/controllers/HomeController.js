myApp.controller('HomeController', ['$scope','$sessionStorage','$location', function($scope,$sessionStorage,$location){
  $scope.logOutCurrentUser=function(){
    $sessionStorage.$reset();
    $location.path("/");
  }
  
}]);