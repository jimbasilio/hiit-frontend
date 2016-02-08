var hiit = angular.module('hiit', [ 'ngRoute', 'satellizer' ]);

var prefix = 'static/angular_components/js/templates/'

hiit.config([ '$routeProvider', '$authProvider', function($routeProvider, $authProvider) {
	$routeProvider.when('/main', {
		templateUrl : prefix + 'main.html',
		controller : 'MainController'
	}).when('/program', {
		templateUrl : prefix + 'program.html',
		controller : 'ProgramController'
	}).when('/about', {
		templateUrl : prefix + 'about.html',
		controller : 'AboutController'
	}).when('/contact', {
		templateUrl : prefix + 'contact.html',
		controller : 'ContactController'
	}).otherwise({
		templateUrl : prefix + 'main.html',
		controller : 'MainController'
	});
	
	$authProvider.google({
		clientId: '61500060365-alek9hn53hlc158pbaiiuf2jaanckb9d.apps.googleusercontent.com',
		scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.appdata']
	});
}]);