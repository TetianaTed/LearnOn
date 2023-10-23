angular.module('LearnOn').controller('CreateChapterController', CreateChapterController);

CreateChapterController.$inject = ['$rootScope', '$filter', 'ChapterService', 'MessageService', '$location', '$timeout', '$anchorScroll'];

function CreateChapterController($rootScope, $filter, ChapterService, MessageService, $location, $timeout, $anchorScroll) {
    var controller = this;

    controller.addNewWord = addNewWord;
    controller.removeWord = removeWord;
    controller.create = create;

    (function initController() {
        console.log("start create-chapter-controller.initController()", controller);
        if (_isUndefinedOrNull(controller.words)) {
            controller.words = [{}, {}];
        }
    })();


    function addNewWord() {
        controller.errors = null;
        controller.words.push({});
    }

    function removeWord(forLoopItemIndex) {
        controller.errors = null;
        if (controller.words.length <= 2) {
            controller.errors = "Rozdział musi zawierać conajmniej 2 słowa!";
        } else {
            controller.words.splice(forLoopItemIndex, 1);
        }
    }

    function create(chapter) {
        console.log("start create-chapter-controller.create()", chapter);
        controller.errors = "";
        controller.success = null;

        chapter.words = controller.words;
        chapter.userId = $rootScope.globals.currentUser.id;
        chapter.createDate = $filter('date')(new Date(), 'yyyy-MM-dd');


        if (chapter.lang1Name === chapter.lang2Name) {
            controller.errors = "Nazwy języków muszą być różne!";
        }

        ChapterService.findByUserId(chapter.userId).then(userChapters => {
            if (!_isUndefinedOrNull(userChapters.data)) { //TODO UZYC $filter
                var endLocalLoop = false;
                for (var i = 0; i < userChapters.data.length && !endLocalLoop; i++) {
                    if (userChapters.data[i].name === chapter.name) {
                        controller.errors += "Jest już rozdział o takiej nazwie!";
                        endLocalLoop = true;
                    }
                }
            }

            console.log("create-chapter-controller.create() filled chapter before send", chapter);
            //TODO validate  remove duplicates words
            if (controller.errors === "") {
                ChapterService.create(chapter).then(function (response) {
                    if (response.success) {
                        controller.success = 'Rozdział został pomyślnie zaprojektowany';
                        $anchorScroll();
                        $timeout(function () {
                            $location.path("/chapter/show_chapters");
                        }, 1500);
                    } else {
                        controller.errors = response.message;
                    }
                });
            }
        })
    }
}

function _isUndefinedOrNull(val) {
    return angular.isUndefined(val) || val === null;
}

	