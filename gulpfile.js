// Config
const package = require('./package.json');
const platform = 'gulp';
const buildConfig = require('./lib/build-config.js')(platform);

// Gulp
const gulp = require('gulp');
const pump = require('pump');
const run = require('run-sequence');

// Gulp Plugins
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const webpackStream = require('webpack-stream');

// Environment Variable Modification for Express
process.env.NODE_ENV = 'development';
process.env.PLATFORM = platform;
process.env.PORT = 3001;

// Live Server
const gls = require('gulp-live-server');

// Tasks
gulp.task('clean', function (cb) {
    const tasks = [
        gulp.src(buildConfig.dist.basePath, {
            read: false
        }),
        clean()
    ];

    pump(tasks, cb);
});

gulp.task('images', function (cb) {
    const tasks = [
        gulp.src(buildConfig.app.images.files, {
            cwd: buildConfig.app.images.cwd
        }),
        gulp.dest(buildConfig.dist.images)
    ];

    pump(tasks, cb);
});

gulp.task('fonts', function (cb) {
    const tasks = [
        gulp.src(buildConfig.app.fonts.files, {
            cwd: buildConfig.app.fonts.cwd
        }),
        gulp.dest(buildConfig.dist.fonts)
    ];

    pump(tasks, cb);
});

gulp.task('styles', function (cb) {
    const tasks = [
        gulp.src(buildConfig.app.styles.files),
        sourcemaps.init(),
        sass({
            outputStyle: 'compressed'
        }),
        rename({
            extname: '.min.css'
        }),
        gulp.dest(buildConfig.dist.basePath)
    ];

    pump(tasks, cb);
});

gulp.task('scripts', function (cb) {
    const tasks = [
        gulp.src(buildConfig.app.scripts.file),
        webpackStream(require('./webpack.config'), require("webpack")),
        gulp.dest(buildConfig.dist.basePath)
    ];

    pump(tasks, cb);
});

gulp.task('html', function (cb) {
    const tasks = [
        gulp.src(buildConfig.app.html.files, {
            cwd: buildConfig.app.html.cwd
        }),
        htmlmin({
            collapseWhitespace: true
        }),
        gulp.dest(buildConfig.dist.html)
    ];

    pump(tasks, cb);
});

gulp.task('watch', function () {
    gulp.watch(buildConfig.app.styles.watch, ['styles']);
    gulp.watch(buildConfig.app.scripts.files, ['scripts']);
    gulp.watch(buildConfig.app.html.files, ['html']);
});

gulp.task('server', function (cb) {
    const server = gls.new('server.js');
    server.start();
});

// build tasks
gulp.task('build', function (cb) {
    // By default, gulp will attempt to run tasks in parallel, but we have some dependencies to manage
    run('clean', ['styles', 'scripts', 'html', 'images', 'fonts'], cb);
});

// dev tasks
gulp.task('serve', function (cb) {
    run('build', ['watch', 'server']);
});
gulp.task('default', ['serve']);