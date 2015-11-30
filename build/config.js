'use strict';

/*
 Create our app namespace
 */
(function ( win, ang ) {
	var _ns = win.OAD = win.OAD || {};

	// Properties;
	_ns.DEBUG = true;
	_ns.ENVIRONMENT = 'development'; //'development';

	// App version - increment this to force the app to clear local storage before continuing
	_ns.VERSION = '0.0.2';

	// Alerts constants
	_ns.ALERT_VISIBILITY_PERIOD_SECS = 5;
	_ns.ALERT_VISIBILITY_CHECKER_INTERVAL_SECS = 1;

	// List of app cookie names
	_ns.CookieNames = {
		Version       : 'currentVersion'
	};

	// Handle test API URIs
	_ns.Uris = {
		Api  : {
			development: {
				//host: '_mockapi/', extension: '.json'
				host     : 'http://localhost:8080/v0.1/',
				extension: '/'
			},
			staging    : {
				//host: 'http://node01.onalldevices.com:8100/api/v0.1/', extension: '/'
				host: 'http://85.13.248.159:8101/v0.1/', extension: '/'
			},
			production : {
				//host: 'http://aserver.com/api/v0.1/', extension: '/'
			}
		},
		views: 'views/'

	};
	_ns.getApiUri = function ( path ) {
		var Uri = _ns.Uris.Api[_ns.ENVIRONMENT];
		return Uri.host + path + Uri.extension;
	};
	_ns.getViewUri = function () {
		return _ns.Uris.views;
	};

	// Hide console output
	if ( !_ns.DEBUG ) {
		win.console.log = function () {};
	}

	// String line for log
	_ns.outputLine = function () {
		console.log('****************************************');
	};

	// Parse the current template URL from the currently executing script URL
	_ns.getTemplateUrl = function () {
		return 'dist/views/';
	};

})(window, angular);
