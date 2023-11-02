angular.module('LearnOn').controller('EditChapterController', EditChapterController);

EditChapterController.$inject = ['$rootScope', '$routeParams', 'ChapterService', 'MessageService', '$location', '$timeout', '$anchorScroll'];

function EditChapterController($rootScope, $routeParams, ChapterService, MessageService, $location, $timeout, $anchorScroll) {
    var controller = this;

    controller.addNewWord = addNewWord;
    controller.removeWord = removeWord;
    controller.edit = edit;

    (function initController() {
        controller.errors = null;
        var accountId = $rootScope.globals.currentUser.id;

        ChapterService.findById($routeParams.id).then(chapter => {
            if (Array.isArray(chapter.data) && chapter?.data?.length > 0) {
                chapter.data = chapter.data[0];
            }
            if (_isUndefinedOrNull(chapter.data)) {
                controller.errors = "Brak rozdziału o id " + $routeParams.id + " !";
                //TODO SHOW 404 ERROR PAGE
            } else {
                if (chapter.data.userId != accountId) {
                    controller.errors = "To nie jest rozdzial uzytkownika!";
                    //TODO SHOW 404 ERROR PAGE
                } else {
                    controller.actualChapter = chapter.data;
                    controller.words = chapter.data.words;
                    controller.actualName = chapter.data.name;
                }
                console.log("start edit-chapter-controller.initController()", controller);
            }
        })
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

    function edit(chapter) {
        console.log("start edit-chapter-controller.chapter()", chapter);
        controller.errors = "";
        controller.success = null;
        chapter.words = angular.copy(controller.words);

        if (chapter.lang1Name === chapter.lang2Name) {
            controller.errors = "Nazwy języków muszą być różne!";
        }

        ChapterService.findByUserId(chapter.userId).then(userChapters => {
            if (!_isUndefinedOrNull(userChapters.data)) {
                var endLocalLoop = false;
                for (var i = 0; i < userChapters.data.length && !endLocalLoop; i++) {
                    if (userChapters.data[i].name === chapter.name && userChapters.data[i].name != controller.actualName) {
                        controller.errors += "Jest już rozdział o takiej nazwie!";
                        endLocalLoop = true;
                    }
                }
            }

            //TODO validate and remove duplicates words
            console.log("edit-chapter-controller.create() filled chapter before send", chapter);
            if (controller.errors === "") {
                ChapterService.update(chapter).then(updatedChapter => {
                    controller.success = 'Rozdział został pomyślnie zaktualizowany';
                    $anchorScroll();
                    $timeout(function () {
                        $location.path("/chapter/show_chapters");
                    }, 1500);
                })
            }
        });
    }
}

function _isUndefinedOrNull(val) {
    return angular.isUndefined(val) || val === null;
}
