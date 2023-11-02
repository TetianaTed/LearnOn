angular.module('LearnOn').controller('EditAccountController', EditAccountController);

EditAccountController.$inject = ['AccountService', '$rootScope', 'imgur', 'AuthService', 'ChapterService'];

function EditAccountController(AccountService, $rootScope, imgur, AuthService, ChapterService) {
    var controller = this;

    controller.account = null;
    controller.update = update;
    controller.deleteAccount = deleteAccount;
    controller.deleteAwatar = deleteAwatar;

    (function initController() {
        controller.errors = null;
        controller.deleteAvatar = false;
        controller.myFile = null;
        var accTmp = $rootScope.globals.currentUser;
        AccountService.findByEmail(accTmp.email).then(account => {
            controller.avatar = account.avatarUrl;
        });
    })();


    function update(account) {
        console.log("start edit-account-controller.update()", account);

        controller.errors = "";
        controller.success = null;
        var isDataToUpdate = false;

        if (!_isNullOrUndefined(account)) {
            if (!_isNullOrUndefined(account.oldPassword) || !_isNullOrUndefined(account.newPassword) || !_isNullOrUndefined(account.repeatPassword)) {
                if (_isNullOrUndefined(account.newPassword) || _isNullOrUndefined(account.oldPassword) || _isNullOrUndefined(account.repeatPassword)) {
                    controller.errors = "Nowe hasło nie może być puste \n";
                } else {
                    if (account.oldPassword != Base64.decode($rootScope.globals.currentUser.authdata).split(":")[1]) { //TODO change this hack!
                        controller.errors = "Wprowadzone stare hasło nie zgadza się z obecnym! \n";
                    }
                    if (account.oldPassword === account.newPassword) {
                        controller.errors += "Wprowadzone nowe hasło jest identyczne z obecnym hasłem! \n";
                    }
                    if (account.newPassword != account.repeatPassword) {
                        controller.errors += "Nowe hasło z jego powótrzeniem nie zgadza się! \n";
                    }
                }
            }
            if (controller.errors == "") {
                //accountDB.password = account.newPassword;
                isDataToUpdate = true;
            }
        }


        if (controller.errors == "") {
            controller.errors = null;
            AccountService.findByEmail($rootScope.globals.currentUser.email).then(accountDB => {
                if (!_isNullOrUndefined(controller.myFile)) {
                    imgur.setAPIKey('Client-ID b182b658aae911c');
                    imgur.upload(controller.myFile).then(function (model) {
                        //console.log("Link do awatara to: " + model.link);
                        accountDB.data.avatarUrl = model.link;
                        AccountService.update(accountDB.data, account).then(updatedAccount => {
                            AuthService.setCredentials2(accountDB.data.email, $rootScope.globals.currentUser.authdata, updatedAccount).then(updatedAuth => {
                                controller.avatar = model.link;
                                controller.success = "Aktualizacja udana!";
                                controller.account = {};
                                controller.myFile = null;
                                isDataToUpdate = true;
                            });
                        })
                    });
                } else if (isDataToUpdate) {
                    accountDB.data.password = account.newPassword; //TODO analyze THIS!!!
                    console.log(accountDB.data.avatarUrl);
                    AccountService.update(accountDB.data, account).then(updatedAccount => {
                        $rootScope.globals.currentUser.avatarUrl = updatedAccount.data.avatarUrl;
                        controller.success = "Aktualizacja udana!";
                        controller.account = {};
                        controller.myFile = null;
                    });
                } else {
                    controller.errors = "Należy wypełnić formularz, aby zaktualizować dane!";
                }
            });
        }
    }

    function deleteAccount() {
        console.log("start edit-account-controller.deleteAccount()");
        //angular.element('#myModal').modal('hide');
        //document.getElementById("myModal").hidden = true;
        var accountId = $rootScope.globals.currentUser.id;


        /*var userChapters = ChapterService.findByUserId(accountId);
        var userChaptersIds = new Array();

        for (var i = 0; i < userChapters.length; i++) {
            userChaptersIds.push(userChapters[i]);
        }
        for (var i = 0; i < userChaptersIds.length; i++) {
            ChapterService.remove(userChaptersIds[i]);
        }*/

        AccountService.remove(accountId).then(response => {
            $rootScope.logout(); //TODO zrobienie bez przeladowywania
            AuthService.clearCredentials();
            $location.path("/");
            $window.location.href = '/';
        });
    }

    function deleteAwatar() {
        console.log("start edit-account-controller.deleteAwatar()-globalUser is ", $rootScope.globals.currentUser);

        controller.errors = "";
        controller.success = null;

        AccountService.findByEmail($rootScope.globals.currentUser.email).then(accountDB => {
            accountDB.data.avatarUrl = "";

            AccountService.update(accountDB).then(updatedAccount => {
                AuthService.setCredentials2(accountDB.data.email, $rootScope.globals.currentUser.authdata, accountDB)
                    .then(updatedAuth => {
                        controller.avatar = "";
                        controller.deleteAvatar = false;
                        angular.element('#myModal').modal('hide');
                        controller.success = "Aktualizacja udana!";
                    });
            });
        });
    }
}


function _isNullOrUndefined(val) {
    return !angular.isDefined(val) || val === null;
}