'use strict';

(function () {

	var module = angular.module('angularIndigo.controllers.devices', [
		'ngRoute'
	]);

	module.config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/devices', {
			templateUrl: 'devices/index.html',
			controller: 'DevicesController'
		});

		$routeProvider.when('/devices/:folderID', {
			templateUrl: 'devices/list.html',
			controller: 'DevicesController'
		});

		$routeProvider.when('/devices/:folderID/:deviceID', {
			templateUrl: 'devices/view.html',
			controller: 'DevicesController'
		});

	}]);

	module.controller('DevicesController', [
		'$http',
		'$scope',
		'$routeParams',
		function ($http, $scope, $routeParams) {

			$scope.folderLabels = {
				1182355394: 'Audio',
				1353311618: 'Guest',
				1386681431: 'Living',
				1577880250: 'Exterior',
				1875247280: false,
				1985479311: 'Master',
				217545912: 'Bathroom',
				237876174: false
			};

			$scope.folders = {};
			$scope.devices = {};
			$scope.percentages = [];

			for (var i = 0; i <= 100; i++) {
				$scope.percentages.push(i);
			}

			if (typeof($routeParams.folderID) !== 'undefined') {
				$scope.folderID = $routeParams.folderID;
			}

			if (typeof($routeParams.deviceID) !== 'undefined') {
				$scope.deviceID = $routeParams.deviceID;
			}

			var devicesURL = '/devices.json';

			$http.get(devicesURL).success(function (devices) {

				for (var i = 0; i < devices.length; i++) {
					$http.get(devices[i].restURL).success(function (device) {
						if (!$scope.folders.hasOwnProperty(device.folderID)) {
							$scope.folders[device.folderID] = [];
						}
						$scope.folders[device.folderID].push(device.id);
						$scope.devices[device.id] = device;
					});
				}

			});

			function getRestURL(deviceID) {
				var device = $scope.devices[deviceID];
				return '/' + device.restParent + '/' + encodeURIComponent(device.name).replace(/['()]/g, escape) + '.json';
			}

			$scope.turnOn = function (deviceID) {
				$http.put(getRestURL(deviceID) + '?isOn=true').success(function (device) {
					$scope.devices[deviceID] = device;
				});
			}

			$scope.turnOff = function (deviceID) {
				$http.put(getRestURL(deviceID) + '?isOn=false').success(function (device) {
					$scope.devices[deviceID] = device;
				});
			}

			$scope.toggle = function (deviceID) {
				if ($scope.devices[deviceID].isOn) {
					$scope.turnOff(deviceID);
				} else {
					$scope.turnOn(deviceID);
				}
			}

			$scope.setBrightness = function (deviceID, brightness) {
				$http.put(getRestURL(deviceID) + '?brightness=' + brightness).success(function (device) {
					$scope.devices[deviceID] = device;
				});
			}

		}
	]);

})();
