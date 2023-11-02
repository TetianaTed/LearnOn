angular.module('LearnOn').controller('ProfileAccountController', ProfileAccountController);

ProfileAccountController.$inject = ['AccountService', '$rootScope'];
function ProfileAccountController(AccountService, $rootScope) {
    var controller = this;

    (function initController() {
        console.log("start profile-account-controller.initController()");
        console.log("profile-account-controller.initController(), current user is:", $rootScope.globals.currentUser);
        controller.errors = null;
        var accTmp = $rootScope.globals.currentUser;
        if (_isNullOrUndefined(accTmp)) {
            controller.errors = "Aby wyświetlić profil musisz się zalogować!";
        } else {
            AccountService.findByEmail(accTmp.email).then(accountResponse => {
                console.log("PROFILE account:", accountResponse.data);
                controller.acc = accountResponse.data; //TODO DOSTOSOWAC DO NIE MOCKA
            });
        }
    })();
}

function _isNullOrUndefined(val) {
    return val === null || !angular.isDefined(val);
}
	