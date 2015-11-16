/**
 * Grunt build file for the Give website app
 *
 */
module.exports = function ( grunt ) {

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var pkg = grunt.file.readJSON('package.json');

	// Project configuration.
	grunt.initConfig({
		pkg: pkg,

		// Configure the web server
		connect: {
			base     : {
				options: {
					hostname  : 'localhost',
					base      : 'dist',
					port      : 3080,
					livereload: 35920,
					open      : true
				}
			},
			keepalive: {
				options: {
					hostname  : 'localhost',
					base      : 'dist',
					port      : 3081,
					livereload: 35920,
					keepalive : true,
					open      : true
				}
			}
		},

		// Open your browser at the project's URL
		open: {
			all: {
				// Gets the port from the connect configuration
				path: 'http://localhost:<%= connect.base.options.port%>'
			}
		},

		// Minify JS
		uglify: {
			js: {
				files: {
					'dist/js/conf.min.js'   : 'build/config.js',
					'dist/js/app.min.js'    : 'build/angular-app.js',
					'dist/js/oad-spa.min.js': 'dist/js/oad-spa.combined.js'
				}
			}
		},

		// SASS to CSS config
		sass: {
			dist: {
				files: {
					'dist/css/oad-spa.css': 'build/sass/oad-spa.scss'
				}
			}
		},

		// Minify CSS
		cssmin: {
			css: {
				src : 'dist/css/oad-spa.combined.css',
				dest: 'dist/css/oad-spa.min.css'
			}
		},

		// Concatenate files
		concat: {
			css       : {
				src : [
					'dist/css/oad-spa.css'
				],
				dest: 'dist/css/oad-spa.combined.css'
			},
			js        : {
				src : [
					'build/controllers/**/*.js',
					'build/filters/**/*.js',
					'build/services/**/*.js',
					'build/directives/**/*.js'
				],
				dest: 'dist/js/oad-spa.combined.js'
			},
			js_debug_1: {
				src : [
					'build/config.js'
				],
				dest: 'dist/js/conf.min.js'
			},
			js_debug_2: {
				src : [
					'build/angular-app.js'
				],
				dest: 'dist/js/app.min.js'
			},
			js_debug_3: {
				src : [
					'build/controllers/**/*.js',
					'build/filters/**/*.js',
					'build/services/**/*.js',
					'build/directives/**/*.js'
				],
				dest: 'dist/js/oad-spa.min.js'
			}
		},

		// Watch for changes to sass and js..
		watch: {
			all    : {
				files  : ['build/*.html', 'build/**/*.html'],
				tasks  : ['includereplace'],
				options: {
					livereload: 35920
				}
			},
			css    : {
				files  : ['**/*.scss', '!build/sass/themes/*.scss'],
				tasks  : ['sass', 'concat:css', 'cssmin', 'clean:css'],
				options: {
					livereload: 35920
				}
			},
			scripts: {
				files  : ['build/**/*.js', 'build/*.js'],
				tasks  : ['watchBuildDebugJS', 'includereplace'],
				options: {
					livereload: 35920
				}
			}
		},

		// Cleanup unused build files from dist folder
		clean: {
			js : [
				'dist/js/*.js',
				'!dist/js/oad-spa.min.js',
				'!dist/js/app.min.js',
				'!dist/js/conf.min.js'
			],
			css: [
				'dist/css/*.css',
				'!dist/css/oad-spa.min.css'
			]
		},

		// Compile html files to include partials
		includereplace: {
			dist: {
				options: {
					prefix     : '<!-- @@',
					suffix     : ' -->',
					includesDir: 'build/views/partials/'
				},
				files  : [
					{
						src    : 'build/*.html',
						dest   : 'dist/',
						expand : true,
						flatten: true,
						cwd    : './'
					},
					{
						src    : 'build/views/*.html',
						dest   : 'dist/views/',
						expand : true,
						flatten: true,
						cwd    : './'
					},
					{
						src    : 'build/views/widgets/*.html',
						dest   : 'dist/views/widgets/',
						expand : true,
						flatten: true,
						cwd    : './'
					},
					{
						src    : 'build/views/directives/*.html',
						dest   : 'dist/views/directives/',
						expand : true,
						flatten: true,
						cwd    : './'
					}
				]
			}
		},

		// Add the version number to the cachebuster
		cacheBust: {
			options: {
				encoding      : 'utf8',
				algorithm     : 'sha1',
				length        : 16,
				ignorePatterns: ['ckeditor']
			},
			assets : {
				files: [
					{
						src: ['dist/index.html']
					}
				]
			}
		},

		copy: {
			images: {
				files: [
					{
						expand : true,
						flatten: true,
						src    : ['dist/img/product/*'],
						dest   : 'dist/img/product2/',
						filter : 'isFile',
						rename : function ( dest, src ) {
							console.log(dest, src);
							return dest + src.replace(/\s/g, '_').toLowerCase();
						}
					}
				]
			}
		}

	});

	/*
	 Custom Tasks
	 */

	// Build task
	grunt.registerTask(
		'build', [
			'sass', 'concat:css', 'concat:js', 'cssmin',
			'uglify', 'clean', 'includereplace', 'cacheBust'
		]
	);
	grunt.registerTask(
		'watchBuildDebugJS', [
			'concat:js_debug_1', 'concat:js_debug_2',
			'concat:js_debug_3', 'clean:js'
		]
	);
	grunt.registerTask(
		'buildDev', [
			'watchBuildDebugJS', 'includereplace'
		]
	);

	// Local server task
	grunt.registerTask('server', [
		'sass', 'concat:css', 'cssmin', 'clean:css',
		'buildDev',
		'connect:base',
		'open',
		'watch'
	]);

};