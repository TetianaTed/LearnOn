angular.module('LearnOn').factory('ChapterService', ChapterService);

ChapterService.$inject = ['$http', '$timeout'];

function ChapterService($http,$timeout) {
    var service = {};

    (function initService() {
        /*var chapters = _getChapters();
        if(angular.isUndefined(chapters[0]) || chapters[0] === null){
             addExampleChapters(1);
        } */
    })();

    service.findAll = findAll;
    service.findById = findById;
    service.findByUserId = findByUserId;

    service.create = create;
    service.update = update;
    service.remove = remove;
    service.addExampleChapters = addExampleChapters;

    return service;


    function findAll() {
        let resp = $http.get(HOST + '/api/chapters')
            .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Chapter, findAll: ", resp);
        return resp;
    }

    function findById(id) {
        let resp = $http.get(HOST + '/api/chapters/' + id)
            .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Chapter, findById(" + id + "): ", resp);
        return resp;
    }

    function findByUserId(pUserId) {
        let resp = $http.get(HOST + '/api/chapters/?userId=' + pUserId)
            .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Chapter, findById(" + pUserId + "): ", resp);
        return resp;
    }

    function create(chapter) {
        let resp = findByUserId(chapter.userId)
            .then(function (foundUserChapters) {
                var isChapterExist = false;
                if (foundUserChapters.data != null) {
                    for (var i = 0; i < foundUserChapters.data.length && !isChapterExist; i++) {
                        if (foundUserChapters.data[i].name === chapter.name) {
                            isChapterExist = true;
                        }
                    }
                }
                if (isChapterExist) {
                    return _handleError('Rozdział "' + chapter + '" juz istnieje!');
                } else {
                    chapter.id = parseInt(chapter.userId + "" + (foundUserChapters?.data?.length || 0) + 1);

                    let resp = $http.post(HOST + '/api/chapters/', chapter)
                        .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
                    return resp;
                }
            });

        resp.then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Chapter, create(" + chapter + "): ", resp);
        return resp;
    }

    function update(chapter) {
        let resp = $http.put(HOST + '/api/chapters/' + chapter.id, chapter)
            .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Chapter, update(" + chapter + "): ", resp);
        return resp;
    }

    function remove(id) {
        let resp = $http.delete(HOST + '/api/chapters/' + id)
            .then(response => _handleSuccess(response), err => _handleError('Błąd podczas pobierania danych z serwera. ' + err));
        console.log("Chapter, remove(" + id + "): ", resp);
        return resp;
    }

    function addExampleChapters(userId) {

        var chapters = [{
            "id": 0,
            "userId": userId,
            "name": "Kolory",
            "description": "Rozdzial o kolorach",
            "createDate": "2017-12-12",
            "lang1Name": "Polski",
            "lang2Name": "Angielski",
            "words": [{
                "imageUrl": "",
                "word1": {
                    "name": "Pomarańczowy",
                    "soundUrl": ""
                },
                "word2": {
                    "name": "Orange",
                    "soundUrl": ""
                }
            },
                {
                    "imageUrl": "",
                    "word1": {
                        "name": "Zielony",
                        "soundUrl": ""
                    },
                    "word2": {
                        "name": "Green",
                        "soundUrl": ""
                    }
                },
                {
                    "imageUrl": "",
                    "word1": {
                        "name": "Żółty",
                        "soundUrl": ""
                    },
                    "word2": {
                        "name": "Yellow",
                        "soundUrl": ""
                    }
                }
            ]
        }, {
            "id": 0,
            "userId": userId,
            "name": "Zwierzęta",
            "description": "Rozdział o zwierzętach",
            "createDate": "2017-12-15",
            "lang1Name": "Polski",
            "lang2Name": "Angielski",
            "words": [{
                "imageUrl": "",
                "word1": {
                    "name": "Słoń",
                    "soundUrl": ""
                },
                "word2": {
                    "name": "Elephant",
                    "soundUrl": ""
                }
            }, {
                "imageUrl": "",
                "word1": {
                    "name": "Kot",
                    "soundUrl": ""
                },
                "word2": {
                    "name": "Dog",
                    "soundUrl": ""
                }
            }, {
                "imageUrl": "",
                "word1": {
                    "name": "Pies",
                    "soundUrl": ""
                },
                "word2": {
                    "name": "Cat",
                    "soundUrl": ""
                }
            }]
        }];

        for (var i = 0; i < chapters.length; i++) {
            $timeout(function () {
                var data = chapters[i];
                data.id = parseInt(data.userId + "" + (i+1));
                create(data);
            }, 3000);
            _sleep(10000);

        }
    }


    // private functions


    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function _handleSuccess(response) {
        let resp = response.data;
        return {success: true, data: resp};
    }

    function _handleError(error) {
        return function () {
            return {success: false, message: error};
        };
    }
}