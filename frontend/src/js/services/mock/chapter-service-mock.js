angular.module('LearnOn').factory('ChapterService', ChapterService);
 
    ChapterService.$inject = ['$timeout', '$filter', '$q'];
    function ChapterService($timeout, $filter, $q) {
        var service = {};
		
		(function initService() {
			var chapters = _getChapters();
			if(angular.isUndefined(chapters[0]) || chapters[0] === null){
				 addExampleChapters(1);
			} 
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
            var deferred = $q.defer();
            deferred.resolve(_getChapters());
            return deferred.promise;
        }
 
        function findById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(_getChapters(), { id: id });
            var chrapter = filtered.length ? filtered[0] : null;
            deferred.resolve(chrapter);
            return deferred.promise;
        }
 
        function findByUserId(pUserId) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(_getChapters(), { userId: pUserId });
            var chapters = filtered.length ? filtered : null;
            deferred.resolve(chapters);
            return deferred.promise;
        }
 
        function create(chapter) {
            var deferred = $q.defer();
			
            // simulate api call with $timeout
            $timeout(function () {
                findByUserId(chapter.userId)
                    .then(function (duplicateChapters) {
						var isChapterExist = false;
						if(duplicateChapters != null){
							for(var i=0; i<duplicateChapters.length && !isChapterExist; i++){
								if(duplicateChapters[i].name === chapter.name){
									isChapterExist = true;							
								}
							}
						}
                        if (isChapterExist) {
                            deferred.resolve({ success: false, message: 'Rozdział "' + chapter + '" juz istnieje!' });
                        } else {
                            var chapters = _getChapters();
 
                            // assign id
                            var lastChapter = chapters[chapters.length - 1] || { id: 1 };
                            chapter.id = lastChapter.id + 1;
 
                            // save to local storage
                            chapters.push(chapter);
                            _setChapters(chapters);
							
                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);
 
            return deferred.promise;
        }
 
        function update(chapter) {
            var deferred = $q.defer();
 
            var chapters = _getChapters();
			var endLocalLoop = false;
            for (var i = 0; i < chapters.length && !endLocalLoop; i++) {
                if (chapters[i].id === chapter.id) {
                    chapters[i] = chapter;
                    endLocalLoop = true;
                }
            }
            _setChapters(chapters);
            deferred.resolve();
            return deferred.promise;
        }
 
        function remove(id) {
            var deferred = $q.defer();
 
            var chapters = _getChapters();
			var endLocalLoop = false;
            for (var i = 0; i < chapters.length && !endLocalLoop; i++) {
                var chapter = chapters[i];
                if (chapter.id === id) {
                    chapters.splice(i, 1);
                    endLocalLoop = true;
                }
            }
            _setChapters(chapters);
            deferred.resolve();
 
            return deferred.promise;
        }
		
		function addExampleChapters(userId){
				
			var chapters = 
			[
				{
				  "id": 0,
				  "userId": userId,
				  "name": "Kolory",
				  "description": "Rozdzial o kolorach",
				  "createDate": "2017-12-12",
				  "lang1Name": "Polski",
				  "lang2Name": "Angielski",
				  "words":
					[
						{
							"imageUrl": "",
							"word1":
							[
								{
									"name": "Pomarańczowy",
									"soundUrl": ""
								}
							],
							"word2":
							[
								{
									"name": "Orange",
									"soundUrl": ""
								}
							]
						},
						{
							"imageUrl": "",
							"word1":
							[
								{
									"name": "Zielony",
									"soundUrl": ""
								}
							],
							"word2":
							[
								{
									"name": "Green",
									"soundUrl": ""
								}
							]
						},
						{
							"imageUrl": "",
							"word1":
							[
								{
									"name": "Żółty",
									"soundUrl": ""
								}
							],
							"word2":
							[
								{
									"name": "Yellow",
									"soundUrl": ""
								}
							]
						}	
					]
				},
				{
				  "id": 0,
				  "userId": userId,
				  "name": "Zwierzęta",
				  "description": "Rozdział o zwierzętach",
				  "createDate": "2017-12-15",
				  "lang1Name": "Polski",
				  "lang2Name": "Angielski",
				  "words":
					[
						{
							"imageUrl": "",
							"word1":
							[
								{
									"name": "Słoń",
									"soundUrl": ""
								}
							],
							"word2":
							[
								{
									"name": "Elephant",
									"soundUrl": ""
								}
							]
						},
						{
							"imageUrl": "",
							"word1":
							[
								{
									"name": "Kot",
									"soundUrl": ""
								}
							],
							"word2":
							[
								{
									"name": "Dog",
									"soundUrl": ""
								}
							]
						},
						{
							"imageUrl": "",
							"word1":
							[
								{
									"name": "Pies",
									"soundUrl": ""
								}
							],
							"word2":
							[
								{
									"name": "Cat",
									"soundUrl": ""
								}
							]
						}	
					]
				}
			];
				  
			
			for(var i = 0; i < chapters.length; i++) {
				var data = chapters[i];
				create(data);
			}		
		}
		
		
		
 
        // private functions
        function _getChapters() {
            if(!localStorage.chapters){
                localStorage.chapters = JSON.stringify([]);
            }
 
            return JSON.parse(localStorage.chapters);
        }
 
        function _setChapters(chapters) {
            localStorage.chapters = JSON.stringify(chapters);
        }
    }