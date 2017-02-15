var gulp = require("gulp"),
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
            webroot + 'lib/css/**/*.min.css'
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
              webroot + 'lib/third-party/*min.js'             
          ]),
          concat('lib.min.js'),
          gulp.dest(webroot + 'dist/js')
    ],
      cb
    );
});

gulp.task('minify:app:js', ['jessify:views:js'], function (cb) {
    pump([
          gulp.src([
              webroot + 'app/jessify/jessify.views.js',
              webroot + 'app/providers/**/*.js',
              webroot + 'app/**/*.js',
              webroot + 'app/**/*.min.js',
          ]),
          uglify(),
          concat('app.min.js'),
          gulp.dest(webroot + 'dist/js')
    ],
      cb
    );
});


gulp.task('jessify:views:js', function (cb) {
    return gulp.src(['wwwroot/app/views/**/*', 'wwwroot/app/templates/**/*'])
      .pipe(htmlToJsCompiler({ concat: 'jessify.views.js', prefix: 'templates/bod', global: 'window._bodAssets' }))
      .pipe(gulp.dest('wwwroot/app/jessify'));
});

gulp.task('default:app:js', function () {
    gulp.watch(['wwwroot/app/**/*.html', 'wwwroot/app/**/*.js'], ['minify:app:js']);
});