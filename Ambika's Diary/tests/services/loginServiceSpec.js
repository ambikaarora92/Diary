describe('test loginService', function() {

  // Load the ToDont module
  beforeEach(module('myDiary'));

  var loginService, httpBackend, q, testUrl, testCredentials;

  beforeEach(inject(function(_loginService_, $httpBackend, $q) {
    testUrl = 'api/login';
    // Service instance and dependencies
    loginService = _loginService_;
    httpBackend = $httpBackend;
    q = $q;
  }));
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

  // Tests go here
  describe('validateLogin()', function() {

    it('checks the correct credentials', function() {
      var promise, response, result;
      testCredentials = {
        username: "ambika",
        password: "password"
      };

      // Make the request and implement a fake success callback
      promise = loginService.validateLogin(testCredentials);
      promise.then(function(data) {
        result = data;
      });
      response = {
        success: true,
        data: {
          credentials: testCredentials
        }
      };
      httpBackend.whenPOST('api/login').respond(function(method, url, data) {
        var credentials = angular.fromJson(data);
        return [200, credentials, {}];
      });

      httpBackend.flush(); // Flush pending requests
      expect(result).toEqual(testCredentials);
    });
    it('checks the incorrect credentials', function() {
      testCredentials = {
        username: "abc",
        password: "wrong"
      };

      var promise, response, result;

      // Make the request and implement a fake success callback
      promise = loginService.validateLogin(testCredentials);
      promise.then(function(data) {
        result = data;
      });
      httpBackend.whenPOST('api/login').respond(function(method, url, data) {
        var credentials = angular.fromJson(data);
        return [401, credentials, {}];
      });

      httpBackend.flush(); // Flush pending requests
      expect(result).toBeUndefined();
    });


  });

});