angular
	.module("LearnOn", ['ngRoute','ngCookies','ngImgur'])
	.config(config)
    .run(run);
	
	
	config.$inject = ['$routeProvider', '$locationProvider'];
	function config($routeProvider, $locationProvider) {
    $routeProvider
		.when('/home',{
			templateUrl: '/templates/pages/home/index.html'
		})
		.when('/',{
			redirectTo: '/home'
		})
		.when('/home/contact',{
			templateUrl: '/templates/pages/home/contact.html'
		})
		.when('/account/register',{
			templateUrl: '/templates/pages/account/register.html',
			controller: 'AccountController',
			controllerAs: 'accountCtrl'
		})
		.when('/account/login',{
			templateUrl: '/templates/pages/account/logIn.html',
			controller: 'AccountController',
			controllerAs: 'accountCtrl'
		})
		.when('/account/profile',{
			templateUrl: '/templates/pages/account/profile.html',
			controller: 'ProfileAccountController',
			controllerAs: 'profileCtrl'
		})
		.when('/account/edit',{
			templateUrl: '/templates/pages/account/edit.html',
			controller: 'EditAccountController',
			controllerAs: 'editAccountCtrl'
		})
		.when('/chapter/show_chapters',{
			templateUrl: '/templates/pages/chapter/show_chapters.html',
			controller: 'ShowChaptersController',
			controllerAs: 'showChaptersCtrl'
		})
		.when('/chapter/create',{
			templateUrl: '/templates/pages/chapter/create.html',
			controller: 'CreateChapterController',
			controllerAs: 'createChapterCtrl'
		})
		.when('/chapter/:id/edit',{
			templateUrl: '/templates/pages/chapter/edit.html',
			controller: 'EditChapterController',
			controllerAs: 'editChapterCtrl'
		})
		.when('/chapter/:id/show_chapter_details',{ 
			templateUrl: '/templates/pages/chapter/show_chapter_details.html',
			controller: 'ShowChapterDetailsController',
			controllerAs: 'showChapterDetailsCtrl'
		})
		.when('/game/:id/learn',{ //TODO dodac id chapteru do URL)
			templateUrl: '/templates/pages/game/learn.html'
			//controller: 'LearnGameController',
			//controllerAs: 'learnGameCtrl'
		})
		.when('/game/:id/test',{ 
			templateUrl: '/templates/pages/game/test.html',
			scope: {},
			controller: 'TestController',
			controllerAs: 'testCtrl'
		})
		.when('/game/:id/memories',{ 
			templateUrl: '/templates/pages/game/memories.html',
			scope: {},
			controller: 'MemoriesController',
			controllerAs: 'memoriesCtrl'
		})
		.otherwise( { 
			redirectTo: '/home'  //TODO ERROR NOT FOUND PAGE
		});
	}
	
	run.$inject = ['$rootScope','$location', '$http', '$cookies', '$window'];
    function run($rootScope, $location, $http, $cookies, $window) {  
		var loggedIn = getCurrentUser();
		
		// keep user logged in after page refresh
		console.log("main-app, loggedIn", loggedIn);
        if (loggedIn) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + loggedIn.authdata;
			$rootScope.globals.currentUser = loggedIn;
        }
		
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to main page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/account/login', '/account/register', '/home/contact']) === -1;
			var loggedIn = getCurrentUser();
			if (restrictedPage && !loggedIn) {
                $location.path('/home');
            }
			else{
				$rootScope.globals.currentUser = loggedIn;
			}
        });

		function getCurrentUser(){
			  $rootScope.globals = $cookies.getObject('globals') || {};
			  return $rootScope.globals.currentUser;
		}
		
		$rootScope.logout = function(){
			$rootScope.globals = {};
			$cookies.remove('globals');
			$http.defaults.headers.common.Authorization = 'Basic';
			//$location.path('/home');
			$window.location.href = '/'; //TODO ZROBIC BEZ PRZELADOWYWANIA STORNY
		}		
    }
	
	
	
	
	
	
	

	
	