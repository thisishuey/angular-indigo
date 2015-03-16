'use strict';

(function () {

	var module = angular.module('angularIndigo.controllers.variables', [
		'ngRoute'
	]);

	module.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/variables', {
			templateUrl: 'variables/index.html',
			controller: 'VariablesController'
		});

	}]);

	module.controller('VariablesController', [
		'$http',
		'$scope',
		'$routeParams',
		function ($http, $scope, $routeParams) {
		}
	]);

})();
