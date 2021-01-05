class AuthUAA {

    getToken = function () {

        const config = require('../config/cf.json');

        var axios = require('axios');
        var request = {
            method: 'get',
            url: config.uaa_url,
            headers: {
                'Authorization': config.uaa_auth,
            }
        };
        var response = axios(request).then(function (response) {
            var accessToken = response.data.access_token;
            return accessToken;
        })
            .catch(function (error) {
                return error;
            });
        return response;
    }
}
module.exports = AuthUAA;