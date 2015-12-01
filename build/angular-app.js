'use strict';

/*
 Define our angular app
 */
OAD.give = angular.module('give-website', [
	'ui.router',
	'ngAnimate',
	'LocalStorageModule',
	'ngResource',
	'ngSanitize',
	'ngTouch',
    'ui.bootstrap',
    'youtube-embed'
]);

// Configuration setup
OAD.give.config([
	'$stateProvider', '$locationProvider', '$urlRouterProvider', 'localStorageServiceProvider',
	function ($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider) {

		// Get rid of the #'s in URLs
		$locationProvider.html5Mode(true);

		// Default / 404
		$urlRouterProvider.otherwise("/");

		// Now set up the view/route states
		$stateProvider

			// Home
			.state('home', {

				url         : '/',
				templateUrl : "views/home.html",
				controller  : 'HomeController'

			})

			// Home
			.state('about', {

				url         : '/about',
				templateUrl : "views/about.html",
				controller  : 'AboutController'

			})

			// Home
			.state('contact', {

				url         : '/contact',
				templateUrl : "views/contact.html",
				controller  : 'ContactController'

			})

		;

		// Localstorage provider (cookie fallback)
		localStorageServiceProvider.setPrefix('give-website');

	}
]);

// App initialisation routine
OAD.give.run(function () {

	// Check for localstorage support
	if (!Modernizr.localstorage){
		throw ('[INIT] ERROR: localStorage NOT supported.');
	}
	console.log('[INIT] HTML5 Check: localStorage enabled.');

	// Init the date locale
	moment.locale('en-US');
	console.log('[INIT] Set date locale format to en-US');

	// Popover fix
	OAD.closePopoversOnDocumentEvents();
	console.log('[INIT] Setup popover document click handler.');

	// Done
	console.log('[INIT] Module Initialised.');
	OAD.outputLine();

});

// Function for closing popovers on body click
OAD.closePopoversOnDocumentEvents = function () {

	var _hidePopover = function(element) {
		//Set the state of the popover in the scope to reflect this
		var elementScope = angular.element($(element).siblings('.popover')).scope().$parent;
		elementScope.isOpen = false;
		elementScope.$apply();
		//Remove the popover element from the DOM
		$(element).siblings('.popover').remove();
	};
	var _hidePopovers = function(e) {

		$('*[popover], *[popover-template]').each(function() {

			var $this = $(this);

			// Exclude angular-text editor popovers
			/*if ($this.parent().hasClass('ta-scroll-window')){
				console.log('caught one');
				return;
			} */

			// Only do this for all popovers other than the current one that cause this event,
			if (!($this.is(e.target) || $this.has(e.target).length > 0) && $this.siblings('.popover').length !==
				0 && $this.siblings('.popover').has(e.target).length === 0) {
				_hidePopover(this);
			}
		});
	};

	$('body').on('click', _hidePopovers);
};

