'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('watch', ['dev:styles', 'dev:scripts', 'dev:inject'] ,function () {
  gulp.watch('app/styles/**/*.less', ['dev:styles']);
  gulp.watch('app/**/*.js', ['dev:scripts']);
  gulp.watch('app/images/**/*', ['build:images']);
  gulp.watch('bower.json', ['dev:inject']);
});
