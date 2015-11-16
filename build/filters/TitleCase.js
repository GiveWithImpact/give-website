'use strict';

/*

    TitleCase Filter

 */
angular.module('give-website')

	.filter('titlecase', function() {
		return function(str) {
			if ((str || '').length > 0){
				return str.replace(/\w\S*/g, function ( txt ) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			} else {
				return '';
			}

		};
	})

;