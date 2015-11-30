#Give! with Impact Website
A static website built using html5, bootstrap, angular, jquery, sass, npm and grunt.

## Deployment
- Run `grunt build` to generate production files into `/dist`
- Deploy all files from the `/dist` folder to the website.

## Developer Setup
- Clone this repository
- Run `npm install` from the site root
- Run `grunt server` which will:
  - concatenate all JS (but not minify)
  - Compile all SASS into CSS
  - minify CSS
  - reload the page in the browser 
 
 All changes to .html files, .js files and .scss files will result in a rebuild and refresh of the open page (grunt livereload)


