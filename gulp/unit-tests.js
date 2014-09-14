'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
$.mainBowerFiles = require('main-bower-files');

var streamqueue = require('streamqueue');

gulp.task('test', function () {

    var testFiles = streamqueue({
            objectMode: true
        },
        gulp.src($.mainBowerFiles()).pipe($.filter(function (file) {
            var badEndings = ['woff', 'eot', 'ttf', 'svg'];
            for (var i = 0; i < badEndings.length; i++) {
                if (file.path.toString().indexOf('.' + badEndings[i]) !== -1) {
                    return false;
                }
            };
            return true;
        })),
        gulp.src('app/bower_components/angular-mocks/angular-mocks.js'),
        gulp.src('app/angular/**/*.js'),
        gulp.src('test/unit/**/*.js')
    );

    return testFiles
        .pipe($.karma({
            configFile: 'test/karma.conf.js',
            action: 'run'
        }))
});
