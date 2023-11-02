angular.module('LearnOn').controller('AccountController', AccountController);
	

AccountController.$inject = ['$location', '$window', '$filter', 'AccountService', 'AuthService', 'MessageService','ChapterService'];	
function AccountController($location, $window, $filter, AccountService, AuthService, MessageService, ChapterService){
	var controller = this;
	
	controller.create = create;
	controller.login = login;
	//controller.logout = logout;
	
	(function initController() {
            AuthService.clearCredentials(); // reset login status
    })();
	
	
	function create(account){
		
		console.log("start account-controller.create()", account);
		
		controller.errors = null;
		
		if(account == null || account.password == null || account.repeatPassword == null){
			controller.errors = "Pola haseł są puste!";
		}
		else if(account.password != account.repeatPassword){
			controller.errors = "Hasłą się nie zgadzają!";
		}
		
		if(_isNullOrUndefined(controller.errors)){	
			AccountService.create(account)
                .then(function (response) {
                    if (response.success) {
                        MessageService.success('Rejestracja konta udana', true);
					
						AccountService.findByEmail(account.email)
							.then(response => {
								let accId = response.data.id;
								ChapterService.addExampleChapters(accId); //TODO adjust this!
								$location.path("/account/login");
							});
                    } else {
                        controller.errors = response.message;
                    }
                });
		}
	}
	
	function login(account){
		console.log("start account-controller.login()", account);
		controller.errors = null;
		
		AuthService.login(account.email, account.password, function(response){
			if(response.success){
				AccountService.findByEmail(account.email)
					.then(accountFromDB => {
						AuthService.setCredentials(account.email, account.password, accountFromDB); //DOSTOSOWAC DO NIE MOCKA
						//$location.path("/");
						$window.location.href = '/'; //TODO ZROBIC BY ROOTSCOPE przeladowywal sie bez refresha calej witryny
					});
			} else {
				controller.errors = response.message;
			}
		});	
	}
	
	/*function logout(){ //TODO przeniesc z $rootScope tutaj
		AuthService.clearCredentials();
		//$location.path("/home");
		$window.location.href = '/';
	}*/
}	

function _isNullOrUndefined(val){
	return val === null  || !angular.isDefined(val);
}	