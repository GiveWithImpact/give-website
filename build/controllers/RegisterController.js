'use strict';

angular.module('give-website')

	.controller('RegisterController', [
		'$scope',
		function ( $scope ) {

			$scope.register_showing = false;
			$scope.user = {
				name: '',
				email: ''
			};
			$scope.backupUser = angular.copy($scope.user);
			$scope.is_saving = false;

			/*
			 Controller methods
			 */

			// Register user
			$scope.registerUser = function(){

				// Dim / disable the form
				$scope.is_saving = true;

				$scope.showTodo();
				$scope.RegisterForm.$setPristine();
				$scope.user = {
					name: '',
					email: ''
				};
				$scope.is_saving = false;
				$scope.register_showing = false;
				return;

				var _whenDone = function(){
					$scope.RegisterForm.$setPristine();
					$scope.user = {
						name: '',
						email: ''
					};
					$scope.addAlert('info', 'Registration is successful, please check your email for confirmation!');
					$scope.is_saving = false;
					$scope.register_showing = false;
				};

			};

			/*
			 Controller initialisations
			 */
			$scope.init = function () {

				// Tell the app scope we've loaded
				$scope.$emit('controller.init', {
					name: 'Register', scope: $scope
				});

			};

			// Init this controller
			$scope.init();

		}]
)

;