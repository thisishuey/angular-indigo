'use strict';

(function () {

	var devicesModule = angular.module('angularIndigo.controllers.devices', [
		'ngRoute'
	]);

	devicesModule.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/devices', {
			templateUrl: 'devices.html',
			controller: 'DevicesController'
		});

	}]);

	devicesModule.controller('DevicesController', [
		'$http',
		'$scope',
		'$routeParams',
		function ($http, $scope, $routeParams) {

			$scope.devices = {};

			var devicesURL = '/devices.json';

			$http.get(devicesURL).success(function (devices) {

				for (var i = 0; i < devices.length; i++) {
					$http.get(devices[i].restURL).success(function (device) {
						if (!$scope.devices.hasOwnProperty(device.folderID)) {
							$scope.devices[device.folderID] = {};
						}
						$scope.devices[device.folderID][device.name] = device;
						// console.log('/' + device.restParent + '/' + encodeURIComponent(device.name).replace(/['()]/g, escape) + '.json');
					});
				}

				console.log($scope.devices);

			});

		}
	]);

	var actionsModule = angular.module('angularIndigo.controllers.actions', [
		'ngRoute'
	]);

	actionsModule.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/actions', {
			templateUrl: 'actions.html',
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
			templateUrl: 'variables.html',
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
			templateUrl: 'pages.html',
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
