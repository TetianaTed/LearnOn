angular.module('LearnOn').factory('AccountService', AccountService);
 
    AccountService.$inject = ['$timeout', '$filter', '$q'];
    function AccountService($timeout, $filter, $q) {
        var service = {};
		
        service.findAll = findAll;
        service.findById = findById;
        service.findByEmail = findByEmail;
        service.create = create;
        service.update = update;
        service.remove = remove;
		
		
		(function initService() {
			var users = _getUsers();
			if(angular.isUndefined(users[0]) || users[0]=== null){
				_addExampleUsers();
			}
		})();
		
        return service;
 
        function findAll() {
            var deferred = $q.defer();
            deferred.resolve(_getUsers());
            return deferred.promise;
        }
 
        function findById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(_getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
 
        function findByEmail(email) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(_getUsers(), { email: email });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
 
        function create(user) {
            var deferred = $q.defer();
 
            // simulate api call with $timeout
            $timeout(function () {
                findByEmail(user.email)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'email "' + user.email + '" jest już zajęty' });
                        } else {
                            var users = _getUsers();
 
                            // assign id
                            var lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;
 
                            // save to local storage
                            users.push(user);
                            _setUsers(users);
 
                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);
 
            return deferred.promise;
        }
 
        function update(user) {
            var deferred = $q.defer();
 
            var users = _getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            _setUsers(users);
            deferred.resolve();
 
            return deferred.promise;
        }
 
        function remove(id) {
            var deferred = $q.defer();
 
            var users = _getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            _setUsers(users);
            deferred.resolve();
 
            return deferred.promise;
        }
		
 
        // private functions
        function _getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }
 
            return JSON.parse(localStorage.users);
        }
 
        function _setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
		
		
		function _addExampleUsers(){
				
			var accounts = 
			[
				{
				  "id:": 1,
				  "firstName": "Jan",
				  "lastName": "Nowak",
				  "email": "jan.nowak@gmail.com",
				  "password": "admin",
				  "birthDate": "1999-05-20",
				  "gender": "Mężczyzna",
				  "avatarUrl": "https://www.shareicon.net/data/128x128/2015/12/14/207818_face_300x300.png"
				}, 
				{
				  "id:": 2,
				  "firstName": "Dziecko",
				  "lastName": "pierwsze",
				  "email": "dziecko.pierwsze@gmail.com",
				  "password": "aaqq11",
				  "birthDate": "2005-09-05",
				  "Gender": "Kobieta",
				  "avatarUrl": "https://www.shareicon.net/data/128x128/2015/12/14/207818_face_300x300.png"
				},
				{
				  "id:": 3,
				  "firstName": "Mlody",
				  "lastName": "Nowak",
				  "email": "mlody.nowak@gmail.com",
				  "password": "aaqq11",
				  "birthDate": "1994-04-15",
				  "Gender": "Nieznana",
				  "avatarUrl": "https://www.shareicon.net/data/128x128/2015/12/14/207818_face_300x300.png"
				}
			];
			
			for(var i = 0; i < accounts.length; i++) {
				var data = accounts[i];
				create(data);
			}		
		}
    }