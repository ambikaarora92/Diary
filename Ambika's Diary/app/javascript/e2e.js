"use strict";
var myAppDev=angular.module('myDiaryE2E',['myDiary','ngMockE2E']);
myAppDev.run( function($httpBackend){
  $httpBackend.whenPOST('api/login').respond(function(method, url, data) {
    var credentials = angular.fromJson(data);
    if(credentials.username==="ambika" && credentials.password==="password"){
          return [200, credentials, {}];
    }
    else{
      return[401,"Unauthorized",{}]
    }
  });
    $httpBackend.whenGET(/partials/).passThrough(); // Requests for templates are handled by the real server

});