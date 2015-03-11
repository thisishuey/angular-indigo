'use strict';

(function () {

	var module = angular.module('angularIndigo', [
		'ngRoute',
		'angularIndigo.filters.app',
		'angularIndigo.factories.app',
		'angularIndigo.directives.app',
		'angularIndigo.controllers.devices',
		'angularIndigo.controllers.actions',
		'angularIndigo.controllers.variables',
		'angularIndigo.controllers.pages'
	]);

	module.config([
		'$routeProvider',
		function ($routeProvider) {

			$routeProvider.otherwise({
				redirectTo: '/devices'
			});

		}
	]);

})();
