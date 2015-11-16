angular.module('give-website')
	.service('modalService', [
		'$uibModal',
		function ( $uibModal ) {

			var modalDefaults = {
				backdrop   : 'static',
				keyboard   : true,
				modalFade  : true,
				templateUrl: 'views/widgets/ui-widget.modal.html'
			};

			var modalOptions = {
				title           : 'Proceed?',
				content         : 'Perform this action?',
				buttons         : [
					{
						label: 'OK',
						is_primary: true,
						is_cancel: false
					}
				]
			};

			this.show = function ( customModalDefaults, customModalOptions ) {

				var localModalOptions = {}, localModalDefaults = {};

				// Map angular-ui modal custom defaults to modal defaults defined in service
				angular.extend(localModalDefaults, modalDefaults, customModalDefaults);

				// Map modal.html $scope custom properties to defaults defined in service
				angular.extend(localModalOptions, modalOptions, customModalOptions);

				// The default modal controller
				if (!localModalDefaults.controller) {
					function localModalDefaultsCtrl($scope, $uibModalInstance) {

						$scope.modalOptions = localModalOptions;
						$scope.Math = Math;

						for (var i = 0; i < $scope.modalOptions.buttons.length; i++){

							var btn = $scope.modalOptions.buttons[i];
							btn.handler = function(result){

								// Custom handler?
								if (this.click){ this.click(); }

								// Close appropriately
								if (this.is_cancel){
									$uibModalInstance.dismiss('cancel');
								} else {
									$uibModalInstance.close(result);
								}

							};

							$scope.modalOptions.buttons[i] = btn;
						}

					}
					localModalDefaults.controller = localModalDefaultsCtrl;
					localModalDefaultsCtrl.$inject = ['$scope', '$uibModalInstance'];
				}

				return $uibModal.open(localModalDefaults); //.result;

			};

		}
	]);