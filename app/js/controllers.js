'use strict';

(function () {

	var devicesModule = angular.module('angularIndigo.controllers.devices', [
		'ngRoute'
	]);

	devicesModule.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/devices', {
			templateUrl: 'devices',
			controller: 'DevicesController'
		});

	}]);

	devicesModule.controller('DevicesController', [
		'$http',
		'$scope',
		'$routeParams',
		function ($http, $scope, $routeParams) {
		}
	]);

	var actionsModule = angular.module('angularIndigo.controllers.actions', [
		'ngRoute'
	]);

	actionsModule.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/actions', {
			templateUrl: 'actions',
			controller: 'ActionsController'
		});

	}]);

	actionsModule.controller('ActionsController', [
		'$http',
		'$scope',
		'$routeParams',
		function ($http, $scope, $routeParams) {
		}
	]);

	var variablesModule = angular.module('angularIndigo.controllers.variables', [
		'ngRoute'
	]);

	variablesModule.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/variables', {
			templateUrl: 'variables',
			controller: 'VariablesController'
		});

	}]);

	variablesModule.controller('VariablesController', [
		'$http',
		'$scope',
		'$routeParams',
		function ($http, $scope, $routeParams) {
		}
	]);

	var pagesModule = angular.module('angularIndigo.controllers.pages', [
		'ngRoute'
	]);

	pagesModule.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/pages', {
			templateUrl: 'pages',
			controller: 'PagesController'
		});

	}]);

	pagesModule.controller('PagesController', [
		'$http',
		'$scope',
		'$routeParams',
		function ($http, $scope, $routeParams) {
		}
	]);

})();
