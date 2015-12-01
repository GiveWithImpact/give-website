'use strict';

angular.module('give-website')

	.controller('ContactController', [
		'$scope',
		function ( $scope ) {

			/*
			 Controller methods
			 */

			/*
			 Controller initialisations
			 */
			$scope.init = function () {

				// Tell the app scope we've loaded
				$scope.$emit('controller.init', {
					name: 'Contact', scope: $scope
				});

			};

			// Init this controller
			$scope.init();

		}]
)

;