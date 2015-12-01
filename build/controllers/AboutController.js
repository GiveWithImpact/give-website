'use strict';

angular.module('give-website')

	.controller('AboutController', [
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
					name: 'About', scope: $scope
				});

			};

			// Init this controller
			$scope.init();

		}]
)

;