angular.module('LearnOn').controller('ShowChaptersController', ShowChaptersController);

ShowChaptersController.$inject = ['$rootScope', '$scope', 'ChapterService', '$window'];

function ShowChaptersController($rootScope, $scope, ChapterService, $window) {
    var controller = this;
    controller.deleteChapter = deleteChapter;

    (function initController() {
        controller.errors = null;
        controller.linkId = null;
        controller.linkName = null;
        var accountId = $rootScope.globals.currentUser.id;
        ChapterService.findByUserId(accountId).then(foundChapters => {
            controller.chapters = foundChapters.data;
        })
        console.log("start show-chapters-controller.initController()", controller);
    })();


    $scope.startsWith = function (actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    }

    function deleteChapter(chapterId) {
        console.log("start show-chapters-controller.deleteChapter()", chapterId);
        ChapterService.remove(chapterId).then(removedChapterResponse => {
            controller.linkId = null;
            controller.linkName = null;
            var accountId = $rootScope.globals.currentUser.id;

            controller.chapters = ChapterService.findByUserId(accountId).then(foundChapters => {
                controller.chapters = foundChapters.data || [];
                angular.element('#myModal').modal('hide');
            })
        });
    }
}

	