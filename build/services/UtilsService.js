'use strict';

/*

    Utility service

 */
angular.module('give-website')
	.factory('Utils', function () {
		return {

			// Strip leading whitespace from initial value, this is similar to
			// rails' strip_heredoc function, it uses the first line with content
			// as the leading whitespace baseline
			normalizeWhitespace: function ( str ) {

				// Strip an initial blank whitespace caused from having text nested inside an html tag
				var string = str.replace(/^\n/, '');

				// Find the first text with an indent and get the length of the indent
				var firstIndentLength = new RegExp("(?:^|\n)([ \t\r]+)").exec(string)[1].length

				// Use the first indent length as a baseline and normalize all other lines
				return string.replace(new RegExp("(^|\n)[ \t\r]{" + firstIndentLength + "}", 'g'), "$1")

			},

			// Remove text nodes from an HTMLCollection
			removeTextNodes: function(node_list){
				if(node_list) {
					for (var i = 0; i < node_list.length; i++){
						if (node_list[i].nodeName.toLowerCase() == '#text'){
							node_list.splice(i, 1);
						}
					}
				}
				return node_list;
			},

			// Titlecase
			toTitleCase: function ( str ) {
				return str.replace(/\w\S*/g, function ( txt ) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			},

			// UCWords
			ucWords: function(str){
				return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
					return $1.toUpperCase();
				});
			},

			// Get an array of select list items (multiselect)
			getMultiSelectArray: function ($node) {
				var _list = new Array();
				if ($node && ($.isArray($node.val()) && ($node.val().length > 0))) {
					var _tmp = $node.val();
					for (var i = 0; i < _tmp.length; i++){
						if (_tmp[i].length > 0) {
							_list.push(_tmp[i]);
						}
					}
				}
				return _list;
			},

			getSetNodeId: function ( node ) {
				var $node = $(node),
				    _id = false;
				if ( $node.length > 0 ) {
					_id = $node.attr('id');
					if ( !_id || (_id.length == 0) ) {
						_id = '_' + new Date().getTime() + '_' + Math.floor(Math.random() * 101);
						$node.attr('id', _id);
					}
				}
				return _id;
			},

			getQStudioDate: function ( QTypeDate ) {
				var year = Math.floor(QTypeDate);
                var time = new moment(0).year(year);
                return time.add((new moment(0).year(year + 1) - time) * (QTypeDate - year), 'milliseconds');
			},

			// Generate a code-safe mchine name from a text string
			makeMachineName: function(str){
				if (str && str.length > 0){

					// Remove all non-safe chars
					var ret = str.replace(/[^a-zA-Z0-9_ ]/g, '');

					// All spaces with underscores
					ret = ret.replace(/\s+/g, '_');

					return ret.toLowerCase();

				} else {
					return '';
				}
			},

			// Create a friednly name from a machine_name
			makeFriendlyName: function(str){
				if (str && str.length > 0){

					// Replace underscores with spaces
					var ret = str.replace(/[_-]/g, ' ');

					// UCWords whats left
					return this.ucWords(ret);

				} else {
					return '';
				}
			},

			// Build a past date object based on intervals
			makeHistoricalDate: function(unit, interval, suffix){
				var date = moment().subtract(unit, interval).hours(0).minutes(0).seconds(0);
				return {
					label: date.format('MMMM Do, YYYY') + ' (' + suffix + ')',
					value: unit + '_' + interval
				}
			},

			// Create a random hex colour code
			makeRandomHexColour: function(){
				return Math.floor(Math.random() * 16777215).toString(16);
			},

			// Create a random integer
			makeRandomInt: function(min, max){
				return Math.floor( ( Math.random() * max) + min );
			},

			// Escape HTML string
			escapeHtml: function(str) {
				var div = document.createElement('div');
				div.appendChild(document.createTextNode(str));
				return div.innerHTML;
			},

			// Return a maths average from array of numeric values
			averageFromArray: function(arr){
				return _.reduce(arr, function(memo, num) {
						return memo + num;
					}, 0) / (arr.length === 0 ? 1 : arr.length);
			},

			// Convert from x and y arrays to array of x/y pairs
			flattenCoordinatesArray: function(coords){
				if (angular.isObject(coords)){

					var flat = [];
					for (var idx = 0; idx < coords.x.length; idx++){
						flat.push( [ coords.x[idx], coords.y[idx] ] );
					}
					return flat;

				}
				return false;
			},

			// Scroll a section to bring an element to the top
			scrollToElement: function($container, $element, offset, duration, _onComplete){

				duration = duration || 400;
				offset = offset || $container.offset().top;
				var element_top = ( $element.offset() ? $element.offset().top : 0 );
				var scroll_top = (
					offset === false
						? 0
						: parseInt( ( element_top - offset ) + $container.scrollTop() )
				);

				$container.stop(true).animate({
					scrollTop: scroll_top
				}, duration, _onComplete);

				return this;
			},

			// Scroll the viewport to an element
			scrollViewportToElement: function($element, duration, _onComplete){

				var $container = $('#view-panel');
				var offset = $container.offset().top || 126;
				this.scrollToElement($container, $element, offset, duration, _onComplete);

				return this;
			},

			// Scroll viewport to top
			scrollViewportToTop: function(duration, _onComplete){

				var $container = $('#view-panel');
				$container.stop().animate({
					scrollTop: 0
				}, duration, _onComplete);

				return this;
			}

		};
	}
);

Array.prototype.getIndexBy = function (name, value) {
	for (var i = 0; i < this.length; i++) {
		if (this[i][name] == value) {
			return i;
		}
	}
};

Number.prototype.toAlwaysFixed = function(d){
	var f = parseFloat(this);
	return isNaN(f) ? this : f.toFixed(d);
};
