const frisby = require('frisby');

it('should return a status of 200', function () {
    return frisby
        .get('http://anttus.ddns.net:8081/api/users')
        .expect('status', 200);
});