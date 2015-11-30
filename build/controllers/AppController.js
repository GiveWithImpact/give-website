'use strict';

angular.module('give-website').controller('AppController', [
	'$rootScope', 'Utils', 'localStorageService', '$state', '$window', '$interval', '$timeout', 'modalService',
	function ( $rootScope, Utils, localStorageService, $state, $window, $interval, $timeout, modalService ) {

		// Global widget flags
		$rootScope.is_loading = true;

		// Global alerts
		$rootScope.alerts = {};
		$rootScope.alert_counter = 0;
		$rootScope.timer = null;

		// Make the global OAD namespace available to angular scopes
		$rootScope.OAD = OAD;

		// Non-auth routes

		// Add new alert
		self.addAlert = $rootScope.addAlert = function ( type, msg, is_sticky ) {
			if ( ['error', 'info', 'danger', 'success', 'warning'].indexOf(type) > -1 ) {
				$rootScope.alerts[++$rootScope.alert_counter] = {
					type: (type == 'error' ? 'danger' : type),
					msg : (msg || ''),
					sticky: !!is_sticky,
					ts: !is_sticky ? new Date().getTime() : null
				}
			}
			$timeout(function(){
				Utils.scrollViewportToTop(1);
			}, 150);
		};

		// Delete alert
		$rootScope.deleteAlert = function(index){
			if ($rootScope.alerts[index]){
				delete $rootScope.alerts[index];
				$rootScope.alert_counter--;
			}
		};

		// Alert events
		$rootScope.$on('system.alert', function(alert){
			$rootScope.addAlert(alert.type, alert.message, alert.is_sticky);
		});

		// Window resize event handler - emit a custom event and send in the viewport dimensions
		$rootScope.windowResizeEvent = _.debounce(function(e){

			// Issue an internal event for controllers to watch
			$rootScope.$broadcast('app.window.resize', {
				viewport: {
					height: window.innerHeight, width: window.innerWidth
				}
			});

			// Apply scope
			//$rootScope.$apply();

		}, 250);

		// Cleanup alerts
		$rootScope.cleanUpAlerts = function(){
			$('.notifications__alert[data-sticky!="true"]').each(function(){
				var ts = parseInt(this.getAttribute('data-ts'));
				var now = new Date().getTime();
				if ( ( (now - ts) / 1000 ) > OAD.ALERT_VISIBILITY_PERIOD_SECS){
					$rootScope.deleteAlert(this.getAttribute('data-index'));
				}
			});
		};

		// Disable alerts
		self.disableAlertCleanup = $rootScope.disableAlertCleanup = function(){
			$interval.cancel($rootScope.timer);
		};

		// Show a todo dialog
		$rootScope.showTodo = function(){
			var modalInstance = modalService.show(
				{
					templateUrl: 'views/widgets/ui-widget.modal.html'
				},
				{
					title  : 'Under construction',
					content: 'Please bear with us while we work at releasing this functionality!',
					buttons: [
						{
							label     : 'Ok',
							is_primary: true,
							is_cancel : true,
							click     : function () {}
						}
					]
				}
			);
		};

		/*
		 Controller initialisation
		 */
		$rootScope.$on('controller.init', function($event, theController){

			// Hide the app loader
			$('body').removeAttr('data-loading');
			$rootScope.is_loading = false;

			// For UI directives in need of notification when the controller has finalised
			// trigger an application window resize event
			$rootScope.windowResizeEvent($event);

			// Done
			console.log('[INIT] State Initialised "' + theController.name + '"');
			OAD.outputLine();

		});

		/*
		 Global application initialisation
		 */
		$rootScope.onInit = function() {

			// Check if localstorage needs clearing
			var stored_version = localStorageService.get(OAD.CookieNames.Version);
			if (!stored_version || !OAD.VERSION  || (OAD.VERSION != stored_version)){

				// Yep - wipe LS
				localStorageService.clearAll();
				console.log('Version ' + OAD.VERSION + ' found, localStorage data reset.');

				// Store new version
				localStorageService.set(OAD.CookieNames.Version, OAD.VERSION);

			}

			// Setup a global resize handler so that all and sundry can use a single, debounced window resize event
			angular.element($window).bind('resize', $rootScope.windowResizeEvent);
			$rootScope.$on('$stateChangeSuccess', $rootScope.windowResizeEvent);

			// Initialise the alert cleanup timer
			$rootScope.timer = $interval(
				$rootScope.cleanUpAlerts,
				OAD.ALERT_VISIBILITY_CHECKER_INTERVAL_SECS * 1000
			);

			// Handle the scroll header
			var $scroller = $($window).eq(0);
			var $body = $('body').eq(0);
			$scroller.on('scroll', function(e) {

				if ($scroller.scrollTop() > 1) {
					$body.addClass('scrolled-away');
				} else {
					$body.removeClass('scrolled-away');
				}

			});

			// Done
			console.log('[INIT] App Initialised.');
			OAD.outputLine();

		}(); // Init appController

	}]);
