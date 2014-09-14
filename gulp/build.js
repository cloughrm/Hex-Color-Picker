'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var saveLicense = require('uglify-save-license');
$.mainBowerFiles = require('main-bower-files');

gulp.task('dev:styles', function () {
    return gulp.src([
            'app/styles/overseer.less',
            'app/styles/libs/**/*.less',
            'app/styles/app/**/*.less'
        ])
        .pipe($.plumber())
        .pipe($.concat('styles.css'))
        .pipe($.less())
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('dev:scripts', function () {
    return gulp.src('app/angular/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size());
});

function injectHtml(isDev) {
    var bowerFilesJqueryFirst = $.mainBowerFiles({filter: /jquery\.js/}).concat($.mainBowerFiles());
    return gulp.src('app/index.html')
        .pipe(
            $.inject(gulp.src(bowerFilesJqueryFirst, {
                read: false
            }), {
                starttag: '<!-- inject:bower:{{ext}} -->',
                addRootSlash: false,
                ignorePath: isDev ? ['app/', '.tmp/'] : null
            })
        )
        .pipe($.inject(gulp.src(['app/angular/**/*.js'], {
            read: false
        }), {
            read: false,
            starttag: '<!-- inject:{{ext}} -->',
            addRootSlash: false,
            ignorePath: isDev ? ['app/', '.tmp/'] : null
        }))
        .pipe($.inject(gulp.src(['.tmp/styles/**/*.css'], {
            read: false
        }), {
            read: false,
            starttag: '<!-- inject:{{ext}} -->',
            addRootSlash: false,
            ignorePath: isDev ? ['app/', '.tmp/'] : null
        }))
        .pipe(
            $.if(!isDev,
                $.inject(gulp.src('dist/ngviews/ngviews.min.js'), {
                    read: false,
                    starttag: '<!-- inject:ngviews -->',
                    addRootSlash: false
                })
            ))
        .pipe(gulp.dest('.tmp/'))
};

gulp.task('dev:inject', ['dev:styles', 'dev:scripts'], function () {
    return injectHtml(true);
});

gulp.task('build:inject', ['dev:styles', 'dev:scripts', 'build:ngviews'], function () {
    return injectHtml(false);
});

gulp.task('build:ngviews', function () {
    return gulp.src(['app/angular/**/*.html'])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.ngHtml2js({
            moduleName: 'interfaceApp',
            prefix: 'angular/'
        }))
        .pipe($.concat('ngviews.min.js'))
        .pipe(gulp.dest('dist/ngviews'))
        .pipe($.size());
});

gulp.task('build:html', ['dev:styles', 'dev:scripts', 'build:ngviews', 'build:inject'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    var assets = $.useref.assets();

    return gulp.src('.tmp/index.html')
        .pipe(assets)
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify({
            preserveComments: saveLicense
        }))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('build:images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('build:fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], {
        read: false
    }).pipe($.rimraf());
});

gulp.task('build', ['build:ngviews', 'build:inject', 'build:images', 'build:fonts', 'build:html']);
