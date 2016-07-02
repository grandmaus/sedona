'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync');
var run = require('run-sequence');
var pug = require('gulp-pug');

gulp.task('style', function() {
    gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
        outputStyle: 'expanded',
        linefeed: 'lf',
        indentWidth: 4,
        indentType: 'space',
    }))
    .pipe(postcss([
        autoprefixer({browsers: [
            'last 1 version',
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Opera versions',
            'last 2 Edge versions'
        ]})
    ]))
    .pipe(gulp.dest('css/'))
    .pipe(server.reload({stream: true}));
});

gulp.task('pug', function() {
    return gulp.src('./pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./'));
});

gulp.task('serve', ['pug' ,'style'], function() {
    server.init({
        server: '.',
        notify: false,
        open: true,
        ui: false
    });

    gulp.watch('sass/**/*.{scss,sass}', ['style']);
    gulp.watch('pug/*.pug', ['pug']);
    gulp.watch('*.html').on('change', server.reload);
});

gulp.task('build', function(fn) {
    run(
        'pug',
        'style'
    );
});
