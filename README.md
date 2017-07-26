# mm-gulp-grunt-webpack-comparison
Source and presentation for my talk, Gulp, Grunt, WebPack: What’s a Dev to Choose?

## Actions To Achieve Using Each Platform
- Minimal configuration and setup of platform
- Compile SASS and Minify
- Combine JavaScript Into Single File and Minify
- Minify HTML
- Allow for local development and testing, ideally with a watch and local web server (express)
- Publish all files into distribution folder that is deployment ready

# Grunt

## init and Configure

Install the Grunt command line interface globally:

`yarn global add grunt-cli`

Install the Grunt and grunt-task-loader NPM packages into our local project:

`yarn add grunt grunt-task-loader --dev`

Setup the basic Gruntfile.js used to configure Grunt tasks:

`touch Gruntfile.js`

Add this content to get started:

    var package = require('./package.json');
    var buildConfig = require('./lib/build-config.js')('grunt');
    
    module.exports = function (grunt) {
        // Automatically register grunt tasks
        require('grunt-task-loader')(grunt);

        grunt.initConfig({
            pkg: package,
            buildConfig: buildConfig
        });
    
        grunt.registerTask('default', []);
    };

## Add SASS

Install the grunt-contrib-sass NPM package that we'll configure to compile our SASS and CSS files:

`yarn add grunt-contrib-sass --dev`

Then add the following to the task section of the Gruntfile.js:

    sass: {
        dist: {
            options: {
                style: 'compressed'
            },
            files: {
                '<%=buildConfig.dist.minifiedStyles%>': buildConfig.app.styles
            }
        }
    }

## Add JavaScript

Install the grunt-contrib-uglify NPM package that we'll configure to combine and minify our script files:

`yarn add grunt-contrib-uglify --dev`

Then add the following to the task section of the Gruntfile.js:

    uglify: {
        dist: {
            files: {
                '<%=buildConfig.dist.minifiedScripts%>': buildConfig.app.scripts
            }
        }
    }

## Add HTML Minify

## Add Local Development and Webserver

## Publish for Distribution

# Gulp

## init and Configure

Install the Gulp command line interface globally:

`yarn global add gulp-cli`

Install the Gulp NPM package into our local project:

`yarn add gulp --dev`

Setup the basic gulpfile.js used to configure Gulp tasks:

`touch gulpfile.js`

Add this content to get started:

    var package = require('./package.json');
    var buildConfig = require('./lib/build-config.js')('gulp');
    var gulp = require('gulp');
    
    gulp.task('default', []);

## Add SASS

## Add JavaScript

## Add HTML Minify

## Add Local Development and Webserver

## Publish for Distribution

# Webpack

## init and Configure

Install the webpack and html-webpack-plugin NPM package into our local project:

`yarn add webpack --dev`

Setup the basic webpack.config.js used to configure Gulp tasks:

`touch webpack.config.js`

Add this content to get started:

Add a task to the package.json file; this will ease running the webpack command:

var package = require('./package.json');
var buildConfig = require('./lib/build-config.js')('webpack');

    module.exports = {
        entry: {
            jquery: './app/scripts/jquery.js'
        },
        output: {
            filename: '[name].js',
            path: buildConfig.dist.basePath
        }
    };

## Add SASS

## Add JavaScript

## Add HTML Minify

## Add Local Development and Webserver

## Publish for Distribution