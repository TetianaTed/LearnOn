angular.module('LearnOn').controller('TestController', TestController);


TestController.$inject = ['$rootScope', 'ChapterService', '$timeout', '$routeParams', '$scope'];
function TestController($rootScope, ChapterService, $timeout, $routeParams, $scope) {	
	var controller = this;	
	
	controller.start = start;
	controller.reset = reset;
	controller.getQuestion = getQuestion;
	controller.checkAnswer = checkAnswer;
	controller.nextQuestion = nextQuestion;

	
	(function initController() {
		controller.errors = null;
		
		controller.check = 0;
		
		var chapter = ChapterService.findById($routeParams.id); //TODO dostosowac do nie mocka
		var accountId = $rootScope.globals.currentUser.id;
		if(_isUndefinedOrNull(chapter)){ 			
			controller.errors = "Brak rozdziału o id " + $routeParams.id + " !";
			//TODO SHOW 404 ERROR PAGE
		} else if (chapter.userId != accountId) {		
			controller.errors = "To nie jest rozdzial uzytkownika!";
			//TODO SHOW 404 ERROR PAGE
		} else {
			controller.chapter=chapter;
		}
    })();
	
	
	function start(){
		controller.id = 0;
		controller.score = 0;
        controller.quizOver = false;
		controller.inProgress = true;
		
		controller.questions = _generateQuestionList(controller.chapter);
		controller.getQuestion();
	}
	
	function reset(){
		controller.inProgress = false;
		controller.score = 0;
	}
	
	function getQuestion(){
		var q = _getQuestion(controller.questions, controller.id);
		if(!_isUndefinedOrNull(q) && q) {
			/*controller.question = q.question;
			controller.options = q.options;
			controller.answer = q.answer;*/
			controller.questValue = q;
		} else {
			controller.quizOver = true;
		}
		
		
	}
	
	function checkAnswer(ans) {
		//if(!$('input[name=answer]:checked').length) return;
		
		//var ans = $('input[name=answer]:checked').val();
		if(ans == controller.questValue.options[controller.answer]) {
			controller.score++;
			controller.correctAns = true;
		} else {
			controller.correctAns = false;
		}
		
		controller.answerMode = false;
	}
	
	function nextQuestion(){
		controller.getQuestion();
	}
}	


function _isUndefinedOrNull(val) {
	return angular.isUndefined(val) || val === null; 
}

function _generateQuestionList(chapter){
	var words = chapter.words;
	var questionList = new Array();
	for(var i=0; i < words.length && i < 20; i++){
		var quest = 'W języku ' + chapter.lang2Name + ' ' + words[i].word1[0].name + ' to:';	
		var  opt = new Array();
		
		var j=0;
		while(j < words.length && j < 3){
			var rand = Math.floor((Math.random() * words.length));
			while(rand === i){
				rand = Math.floor((Math.random() * words.length));
			}
			opt[j] = words[rand].word2[0].name;
			j++;
		}
		opt[j+1] = words[i].word2[0].name;
		
		ans = words[i].word2[0].name;
		
		
		questionList[i] =
			{
				question: quest,
				options: opt,
				answer: ans
			};
		
	}
	
	return questionList;	
}

function _getQuestion(questions, id) {
	if(id < questions.length) {
		return questions[id];
	} else {
		return false;
	}
}


