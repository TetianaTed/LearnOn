angular.module('LearnOn').factory('AccountService', AccountService);

AccountService.$inject = ['$http'];

function AccountService($http) {
    var service = {};

    service.findAll = findAll;
    service.findById = findById;
    service.findByEmail = findByEmail;
    service.create = create;
    service.update = update;
    service.remove = remove;

    return service;

    function findAll() {
        let resp = $http.get(HOST + '/api/accounts')
            .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Account, findAll: ", resp);
        return resp;
    }

    function findById(id) {
        let resp = $http.get(HOST + '/api/accounts/' + id)
            .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Account, findById(" + id + "): ", resp);
        return resp;
    }

    function findByEmail(email) {
        let endpoint = '/api/accounts?email=';
        /* if (IS_SIMULATION) {
             endpoint = '/api/accounts/?email=';
         }*/

        let resp = $http.get(HOST + endpoint + email)
            .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Account, findByEmail" + email + "): ", resp);
        return resp;
    }

    function create(user) {
        let resp = $http.post(HOST + '/api/accounts', user)
            .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Account, create" + user + "): ", resp);
        return resp;
    }

    function update(user, account) {
        let resp;
        if (IS_SIMULATION) {
            resp = $http.put(HOST + '/api/accounts/' + user.id, user);
        } else {
            let body = {
                "id": user.id,
                "oldPassword": account.oldPassword,
                "newPassword": account.newPassword,
                "repeatNewPassword": account.repeatPassword
            };

            resp =  resp = $http.put(HOST + '/api/accounts/' + body.id, body);
        }

        resp.then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Account, update" + user + "): ", resp);
        return resp;
    }

    function remove(id) {
        let resp = $http.delete(HOST + '/api/accounts/' + id)
            .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Account, remove" + id + "): ", resp);
        return resp;
    }

    // private functions
    function _handleSuccess(response) {
        let resp = response.data;
        if (Array.isArray(resp)) {
            resp = resp[0];
        }
        return {success: true, data: resp};
    }

    function _handleError(error) {
        return function () {
            return {success: false, message: error};
        };
    }
}