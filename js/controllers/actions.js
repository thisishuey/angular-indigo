'use strict';

(function () {

	var module = angular.module('angularIndigo.controllers.actions', [
		'ngRoute'
	]);

	module.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/actions', {
			templateUrl: 'actions/index.html',
			controller: 'ActionsController'
		});

	}]);

	module.controller('ActionsController', [
		'$http',
		'$scope',
		'$routeParams',
		function ($http, $scope, $routeParams) {
		}
	]);

})();
