﻿var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    plumber = require('gulp-plumber'),
    del = require('del'),
    sass = require('gulp-sass'),
    pump = require('pump'),
    minify = require('gulp-minify'),
    htmlToJsCompiler = require('gulp-html-to-js');

var webroot = "./wwwroot/";

var paths = {
    css: webroot + "css/**/*.css",
    scss: webroot + "scss/*.scss",
    concatCssDest: webroot + "css/app.css",
    concatCssFolder: webroot + "css/",
    distMinCss: webroot + "dist/css/app.min.css",
    libFolder: webroot + "lib/**.*"
};

var errorHandler = function (error) {
    console.log(error);
    this.emit('end');
}

var resolveMinifiedPath = function (path) {
    var params = path.split("/");
    var file = params.splice(params.length - 1, 1)[0];
    var newPath = params.join("/") + "/";

    return {
        file: file,
        path: newPath
    };
}

gulp.task('minify:clean:css', function (done) {
    return del(paths.concatCssFolder);
});

gulp.task('minify:css', ['minify:clean:css'], function () {
    var min = resolveMinifiedPath(paths.distMinCss);
    return gulp.src(paths.scss)
        .pipe(plumber(errorHandler))
        .pipe(sass())
        .pipe(cssmin())
        .pipe(concat(min.file))
        .pipe(gulp.dest(min.path));
});

gulp.task('minify:lib:css', function () {
    return gulp.src([
            webroot + 'lib/css/**/*.css',
            webroot + 'lib/css/**/*min.css',
            webroot + 'lib/css/**/*.min.css',
            webroot + 'lib/css/**/*.css'
        ])
        .pipe(plumber(errorHandler))
        .pipe(cssmin())
        .pipe(concat('lib.min.css'))
        .pipe(gulp.dest(webroot + 'dist/css'));
});

gulp.task('default:minify:css', function () {
    gulp.watch(paths.scss, ['minify:css']);
});


gulp.task('minify:lib:js', function (cb) {
    pump([
          gulp.src([
              webroot + 'lib/base/*.js',
              webroot + 'lib/base/*min.js',
              webroot + 'lib/addons/*.js',
              webroot + 'lib/addons/*min.js',
              webroot + 'lib/third-party/*.js',
              webroot + 'lib/third-party/*min.js'
          ]),
          concat('lib.min.js'),
          gulp.dest(webroot + 'dist/js')
    ],
      cb
    );
});

gulp.task('minify:app:explore:js', ['jessify:views:explore:js'], function (cb) {
    pump([
          gulp.src([
              webroot + 'app/explore/jessify/jessify.views.explore.js',
              webroot + 'app/explore/providers/**/*.js',
              webroot + 'app/explore/**/*.js',
              webroot + 'app/explore/**/*.min.js',
          ]),
          uglify(),
          concat('app.explore.min.js'),
          gulp.dest(webroot + 'dist/js')
    ],
      cb
    );
});

gulp.task('jessify:views:explore:js', function (cb) {
    return gulp.src(['wwwroot/app/explore/views/**/*', 'wwwroot/app/explore/templates/**/*'])
      .pipe(htmlToJsCompiler({ concat: 'jessify.views.explore.js', prefix: 'templates/explore', global: 'window._exploreAssets' }))
      .pipe(gulp.dest('wwwroot/app/explore/jessify'));
});

gulp.task('default:app:explore:js', function () {
    gulp.watch(['wwwroot/app/explore/**/*.html', 'wwwroot/app/explore/**/*.js'], ['minify:app:explore:js']);
});

/*
 * AUTHOR
 */

gulp.task('minify:app:author:js', ['jessify:views:author:js'], function (cb) {
    pump([
          gulp.src([              
              webroot + 'app/author/jessify/jessify.views.author.js',              
              webroot + 'app/author/providers/**/*.js',
              webroot + 'app/author/config/app.js',
              webroot + 'app/author/**/*.js',
              webroot + 'app/author/**/*.min.js',
          ]),
          uglify(),
          concat('app.author.min.js'),
          gulp.dest(webroot + 'dist/js')
    ],
      cb
    );
});

gulp.task('jessify:views:author:js', function (cb) {
    return gulp.src(['wwwroot/app/author/views/**/*', 'wwwroot/app/author/templates/**/*'])
      .pipe(htmlToJsCompiler({ concat: 'jessify.views.author.js', prefix: 'templates/author', global: 'window._authorAssets' }))
      .pipe(gulp.dest('wwwroot/app/author/jessify'));
});

gulp.task('default:app:author:js', function () {
    gulp.watch(['wwwroot/app/author/**/*.html', 'wwwroot/app/author/**/*.js'], ['minify:app:author:js']);
});