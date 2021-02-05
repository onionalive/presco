/* jshint node: true */
/* global $: true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

/** JSHint */
gulp.task('jshint', function() {
  return gulp.src('generators/app/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

/** Livereload */
gulp.task('default', ['jshint'], function() {
  gulp.watch('generators/**/*.js', ['jshint']);
});
