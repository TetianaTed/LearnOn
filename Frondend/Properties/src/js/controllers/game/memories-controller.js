angular.module('LearnOn').controller('MemoriesController', MemoriesController);

// Global Variables
var currentSessionOpen = false;
var previousCard = null;
var numPairs = 0;
var timer = null;


MemoriesController.$inject = ['$rootScope', 'ChapterService', '$timeout', '$routeParams', '$window'];

function MemoriesController($rootScope, ChapterService, $timeout, $routeParams, $window) {
    var controller = this;

    controller.check = check;
    controller.start = start;
    controller.runInit = runInit;
    //controller.stopTimer = stopTimer;

    (function initController() {
        controller.errors = null;
        controller.isGuarding = true;
        controller.inGame = false;
        controller.endGame = false;

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
                controller.memsWords2 = chapter.data.words;
                //controller.deck = _createDeck(controller.memsWords2); //odkomentowac jesli ma odrazU pokazywac planszę!
            }

            // for the timer
            controller.timeLimit = 120000;
            controller.isCritical = false;

            $timeout(function () {
                start();
            }, 3);
        })
    })();


    function runInit() {
        controller.errors = null;
        controller.isGuarding = true;
        controller.inGame = false;
        controller.endGame = false;
        currentSessionOpen = false;
        previousCard = null;
        numPairs = 0;
        timer = null;
        controller.timeLimit = 120000;
        controller.isCritical = false;
        start();
    }

    function check(card) {
        if (currentSessionOpen && previousCard != card && previousCard.item == card.item && !card.isFaceUp) {
            card.isFaceUp = true;
            currentSessionOpen = false;
            card.isCorrectPair = true;
            previousCard.isCorrectPair = true;
            previousCard = null;
            numPairs++;
        } else if (currentSessionOpen && previousCard != card && previousCard.item != card.item && !card.isFaceUp) {
            controller.isGuarding = true;
            card.isFaceUp = true;
            currentSessionOpen = false;
            $timeout(function () {
                previousCard.isFaceUp = card.isFaceUp = false;
                previousCard = null;
                controller.isGuarding = controller.timeLimit ? false : true;
            }, 1000);
        } else {
            card.isFaceUp = true;
            currentSessionOpen = true;
            previousCard = card;
        }

        if (numPairs == (controller.deck.length / 2)) {
            //controller.stopTimer();
            //alert("WYGRALES!!!");
            controller.inGame = false;
            controller.endGame = true;
            previousCard = null;
            currentSessionOpen = false;
            numPairs = 0;
        }
    } //end of check()

    // start the timer as soon as the player presses start
    function start() {
        controller.endGame = false;
        var mems;

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
                mems = chapter.data.words;
            }


            if (!_isUndefinedOrNull(mems)) {
                controller.deck = _createDeck(mems);
                var deckWithoutUndefined = new Array();
                for (var rowIndex = 0; rowIndex < controller.deck.rows.length; rowIndex++) {
                    var row = controller.deck.rows[rowIndex];
                    for (var j = 0; j < row.cards.length; j++) {
                        var card = row.cards[j];
                        if (!_isUndefinedOrNull(card.item)) {
                            deckWithoutUndefined.push(card);
                        }
                    }
                }
                controller.deck = deckWithoutUndefined;


                // set the time of 2 minutes and remove the cards guard
                //controller.timeLimit = 120000;
                controller.isGuarding = false;
                controller.inGame = true;

                /*(controller.startTimer = function() { //TODO DOPRACOWAC CZASOMIERZ
                controller.timeLimit -= 1000;
                controller.isCritical = controller.timeLimit <= 10000 ? true : false;

                timer = $timeout(controller.startTimer, 1000);
                if (controller.timeLimit === 0) {
                    controller.stopTimer();
                    controller.isGuarding = true;
                }
            })();*/
            }
        })
    }

    // function to stop the timer
    function stopTimer() {
        $timeout.cancel(timer);
        controller.inGame = false;
        previousCard = null;
        currentSessionOpen = false;
        numPairs = 0;
    }

    /*function countCardShowing(card, index){
        console.log(card);
        console.log(index);
        var counterofShowing = 0;
        for(var cardIndex=0; cardIndex < index; cardIndex++){
            if (controller.deck[cardIndex] == card){
                countCardShowing++;
            }
        }
        controller.actualCounterShowing = counterofShowing;
        //return counterofShowing;
    }*/
}


function _isUndefinedOrNull(val) {
    return angular.isUndefined(val) || val === null;
}


//******************* FUNCTION FOR MEMORIES GAME ************************
// constant variables 
var _constants = new (function () {
    var rows = 3;
    var columns = 6;
    var numMatches = (rows * columns) / 2;
    this.getRows = function () {
        return rows;
    };
    this.getColumns = function () {
        return columns;
    };
    this.getNumMatches = function () {
        return numMatches;
    };
})();


// this function creates deck of cards that returns an object of cards
// to the caller
function _createDeck(memsWords2) {
    var rows = _constants.getRows();
    var cols = _constants.getColumns();
    var key = _createRandom(memsWords2);
    var deck = {};
    deck.rows = [];

    // create each row
    for (var i = 0; i < rows; i++) {
        var row = {};
        row.cards = [];

        // creat each card in the row
        for (var j = 0; j < cols; j++) {
            var card = {};
            card.isFaceUp = false;
            card.item = key.pop();
            row.cards.push(card);
        }
        deck.rows.push(row);
    }
    return deck;
}

// used to remove something form an array by index
function _removeByIndex(arr, index) {
    arr.splice(index, 1);
}

function _insertByIndex(arr, index, item) {
    arr.splice(index, 0, item);
}

// creates a random array of items that contain matches
// for example: [1, 5, 6, 5, 1, 6]
function _createRandom(memsWords2) {
    var matches = _constants.getNumMatches();
    var pool = [];
    var answers = [];
    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'
        , 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'
        , 'S', 'T', 'U', 'W', 'X', 'Y', 'Z'];

    /*var hiragana = ['あ', 'い', 'う', 'え', 'お', 'か', 'が', 'き'
                    , 'ぎ', 'く', 'ぐ', 'け', 'げ', 'こ', 'ご', 'さ'
                    , 'ざ', 'し', 'じ', 'す', 'ず', 'せ', 'ぜ', 'そ'
                    , 'ぞ', 'た', 'だ', 'ち', 'ぢ', 'つ', 'づ', 'て'
                    , 'で', 'と', 'ど', 'な', 'に', 'ぬ', 'ね', 'の'
                    , 'は', 'ば', 'ぱ', 'ひ', 'び', 'ぴ', 'ふ', 'ぶ'
                    , 'ぷ', 'へ', 'べ', 'ぺ', 'ほ', 'ぼ', 'ぽ', 'ま'
                    , 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら'
                    , 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'];*/

    // set what kind of item to display
    var items = _isUndefinedOrNull(memsWords2) ? letters : memsWords2;

    // create the arrays for random numbers and item holder
    for (var i = 0; i < matches * 2; i++) {
        pool.push(i); // random numbers
    }

    // generate an array with the random items
    for (var n = 0; n < matches; n++) {
        // grab random letter from array and remove that letter from the
        // original array
        var randLetter = Math.floor((Math.random() * items.length));
        var letter = items[randLetter];
        _removeByIndex(items, randLetter);
        // generate two random placements for each item
        var randPool = Math.floor((Math.random() * pool.length));

        // remove the placeholder from answers and insert the letter into
        // random slot
        _insertByIndex(answers, pool[randPool], letter);

        // remove random number from pool
        _removeByIndex(pool, randPool);

        // redro this process for the second placement
        randPool = Math.floor((Math.random() * pool.length));
        _insertByIndex(answers, pool[randPool], letter);

        // remove rand number from pool
        _removeByIndex(pool, randPool);
    }
    return answers;
}
