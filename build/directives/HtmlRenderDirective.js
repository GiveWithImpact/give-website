'use strict';

angular.module('give-website').directive('htmlRender', function($compile) {
	return {
		restrict: 'E',
		scope: { html: '@' },
		link: function(scope, element) {
			scope.$watch('html', function(value) {
				if (!value) return;

				var markup = $compile(value)(scope);
				element.append(markup)
			});
		}
	};
});