myApp.controller('LoginController', function($scope,loginService,$location,$sessionStorage,$window){
  // $rootScope.isLoggedIn=false;
  $scope.log="";
  $scope.invalidCredentials=false;
  $scope.validateLogin=function(diaryCredentials){
      if(diaryCredentials){
            var diaryOwner=new Diary(diaryCredentials);
            loginService.validateLogin(diaryOwner).then(function(response){
            $sessionStorage.isLoggedIn=true;
            $scope.log=true;
            $location.path('/home');

          },function(error){
            $scope.diary={};
            $scope.log=false;
            $sessionStorage.isLoggedIn=false;
            $scope.invalidCredentials=true;
            console.log(error);
          });
      }
  };
  $scope.reset=function(){
    $window.location.reload();
  }
  
});