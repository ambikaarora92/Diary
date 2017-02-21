describe('Testing Login Controller that uses a Promise', function() {
  var $scope;
  var $q;
  var deferred;
  var testCredentials = {
    username: "ambika",
    password: "password"
  };
  var testWrongCredentials = {
    username: "abc",
    password: "pwd"
  };
  var mockSessionStorage = {};
  var mockLocation = {};

  beforeEach(module('myDiary'));

  beforeEach(inject(function($controller, _$rootScope_, _$q_, loginService, $window) {
    $q = _$q_;
    $scope = _$rootScope_.$new();

    // We use the $q service to create a mock instance of defer
    deferred = _$q_.defer();

    // Use a Jasmine Spy to return the deferred promise
    spyOn(loginService, 'validateLogin').and.returnValue(deferred.promise);

    mockLocation.path = function() {};

    mockSessionStorage.isLoggedIn = "";

    // Init the controller, passing our spy service instance
    $controller('LoginController', {
      $scope: $scope,
      loginService: loginService,
      $location: mockLocation,
      $sessionStorage: mockSessionStorage,
      $window: $window

    });
  }));
  it('check the correct credentials', function() {
    // Setup the data we wish to return for the .then function in the controller
    $scope.validateLogin(testCredentials);
    deferred.resolve([testCredentials]);

    // We have to call apply for this to work
    $scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect(mockSessionStorage.isLoggedIn).toBe(true);
  });

  it('reject wrong credentials', function() {
    $scope.validateLogin(testWrongCredentials);
    deferred.reject([testWrongCredentials]);

    // We have to call apply for this to work
    $scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect(mockSessionStorage.isLoggedIn).toBe(false);
  });

});