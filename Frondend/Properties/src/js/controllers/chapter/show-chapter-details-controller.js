angular.module('LearnOn').controller('ShowChapterDetailsController', ShowChapterDetailsController);

ShowChapterDetailsController.$inject = ['$rootScope', '$routeParams', 'ChapterService'];

function ShowChapterDetailsController($rootScope, $routeParams, ChapterService) {
    var controller = this;

    (function initController() {
        controller.errors = null;
        var accountId = $rootScope.globals.currentUser.id;
        ChapterService.findById($routeParams.id).then(chapter => {
            if (Array.isArray(chapter.data) && chapter?.data?.length > 0) {
                chapter.data = chapter.data[0];
            }

            if (_isUndefinedOrNull(chapter.data)) {
                console.log("Brak rozdziału o id " + $routeParams.id + " !");
                //TODO SHOW 404 ERROR PAGE
            } else if (chapter.data.userId != accountId) {
                console.log("To nie jest rozdzial uzytkownika!");
                //TODO SHOW 404 ERROR PAGE
            } else {
                controller.chapter = chapter.data;
            }
            console.log("start show-chapter-details-controller.initController()", controller);
        })
    })();
}

function _isUndefinedOrNull(val) {
    return angular.isUndefined(val) || val === null;
}
	