'use strict';

(function () {

	var module = angular.module('angularIndigo.controllers.pages', [
		'ngRoute'
	]);

	module.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/pages', {
			templateUrl: 'pages/index.html',
			controller: 'PagesController'
		});

	}]);

	module.controller('PagesController', [
		'$http',
		'$scope',
		'$routeParams',
		function ($http, $scope, $routeParams) {
		}
	]);

})();
