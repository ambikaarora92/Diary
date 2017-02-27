describe('test Diary model', function() {
  beforeEach(module('myDiary'));
  var testCredentials = {
    username: "ambika",
    password: "password"
  };

  it('Diary', function() {
    var testCredentialsObject = new Diary(testCredentials);
    expect(testCredentialsObject.username).toEqual(testCredentials.username);
    expect(testCredentialsObject.password).toEqual(testCredentials.password);

  });
});