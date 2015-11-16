'use strict';

angular.module('give-website')

	.controller('HomeController', [
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
					name: 'Home', scope: $scope
				});

			};

			/*
				Video event handlers
			 */
			$scope.$on('youtube.player.ready', function () {

			});
			$scope.$on('youtube.player.playing', function () {

			});
			$scope.$on('youtube.player.paused', function () {

			});

			// Init this controller
			$scope.init();

		}]
)

;