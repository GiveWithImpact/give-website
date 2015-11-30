'use strict';

angular.module('give-website')

	.controller('RegisterController', [
		'$scope', '$resource',
		function ( $scope, $resource ) {

			$scope.register_showing = false;
			$scope.user = {
				name : '',
				email: ''
			};
			$scope.backupUser = angular.copy($scope.user);
			$scope.is_saving = false;

			/*
			 Controller methods
			 */

			// Register user
			$scope.registerUser = function () {

				// Dim / disable the form
				$scope.is_saving = true;

				var names = $scope.user.name.split(' ');

				var MailChimpSubscription = $resource(
					'//onalldevices.us4.list-manage.com/subscribe/post-json',
					{
						'EMAIL': $scope.user.email,
						'FNAME': names[0],
						'LNAME': (names.length > 1 ? names[1] : ''),
						'c'    : 'JSON_CALLBACK',
						'u'    : '1d32c7060479b9d153e967d47',
						'id'   : '07b97cfe1d'
					},
					{
						'save': {
							method: 'jsonp'
						}
					}
				);

				var _errorDone = function ( error ) {
					$scope.addAlert('warning', error);
					$scope.is_saving = false;
				};

				MailChimpSubscription.save(
					function ( response ) {

						if ( response.result === 'error' ) {
							if ( response.msg ) {

								// Remove error numbers, if any.
								var parts = response.msg.split(' - ');
								if ( parts.length > 1 ) {
									parts.shift();
								}
								var message = parts.join(' ');

								switch (true){

									case message.indexOf('already subscribed') > -1:

										message = 'Sorry but this email address is already subscribed!';
										break;

								}

								_errorDone(message);

							} else {
								_errorDone('Sorry! An unknown error occurred.');
							}
						} else if ( response.result === 'success' ) {

							$scope.addAlert('info', 'Registration is successful, please check your email for confirmation!');
							$scope.is_saving = false;
							$scope.register_showing = false;
							$scope.RegisterForm.$setPristine();
							$scope.user = {
								name : '',
								email: ''
							};

						}

					},
					function ( error ) {
						_errorDone(error);
					}
				);

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