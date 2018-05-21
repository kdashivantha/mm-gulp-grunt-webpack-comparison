const pkg = require('./package.json');
const platform = 'grunt';
const buildConfig = require('./lib/build-config.js')(platform);

module.exports = function (grunt) {
    // Automatically register grunt tasks
    require('grunt-task-loader')(grunt, {
        mapping: {
            express: 'grunt-express-server'
        }
    });

    // Environment Variable Modification for Express
    process.env.NODE_ENV = 'development';
    process.env.PLATFORM = platform;
    process.env.PORT = 3000;

    grunt.initConfig({
        pkg: pkg,
        buildConfig: buildConfig,

        clean: {
            dist: {
                src: [
                    buildConfig.dist.basePath
                ]
            }
        },

        copy: {
            distfonts: {
                files: [{
                    expand: true,
                    cwd: buildConfig.app.fonts.cwd,
                    src: buildConfig.app.fonts.files,
                    dest: buildConfig.dist.fonts
                }]
            },
            distimages: {
                files: [{
                    expand: true,
                    cwd: buildConfig.app.images.cwd,
                    src: buildConfig.app.images.files,
                    dest: buildConfig.dist.images
                }]
            }
        },

        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: true
                },
                src: buildConfig.app.styles.files,
                dest: buildConfig.dist.styles
            }
        },

        webpack: {
            dist: require('./webpack.config')
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: buildConfig.app.html.files,
                    cwd: buildConfig.app.html.cwd,
                    dest: buildConfig.dist.html
                }]
            }
        },

        watch: {
            options: {
                livereload: false
            },
            styles: {
                files: buildConfig.app.styles.watch,
                tasks: ['styles'],
                options: {
                    cwd: buildConfig.app.styles.cwd
                }
            },
            scripts: {
                files: buildConfig.app.scripts.files,
                tasks: ['scripts']
            },
            htmlmin: {
                files: buildConfig.app.html.files,
                tasks: ['html'],
                options: {
                    cwd: buildConfig.app.html.cwd
                }
            },
            express: {
                files: ['server.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        },

        express: {
            options: {},
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        }
    });

    // friendly aliases
    grunt.registerTask('fonts', 'copy:distfonts');
    grunt.registerTask('images', 'copy:distimages');
    grunt.registerTask('styles', 'sass:dist');
    grunt.registerTask('scripts', ['webpack:dist']);

    grunt.registerTask('html', 'htmlmin:dist');

    // build tasks
    grunt.registerTask('build', ['clean', 'styles', 'scripts', 'html', 'fonts', 'images']);

    // dev tasks
    grunt.registerTask('serve', ['build', 'express:dev', 'watch']);
    grunt.registerTask('default', 'serve');
};