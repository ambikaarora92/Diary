"use strict";
myApp.service('loginService', ['$q','$http', function($q, $http){
  this.validateLogin=function(credentials){
    var defer=$q.defer();
     $http.post("api/login",credentials).success(function(response){
      defer.resolve(response);
     }).error(function(error){
      defer.reject(error);
     });
     return defer.promise;
  };
}]);