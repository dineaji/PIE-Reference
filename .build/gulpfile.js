///////////////////////////////////////////////////////
// load gulp plugins
///////////////////////////////////////////////////////
var gulp          = require('gulp');
var fs            = require('fs');
var notify        = require('gulp-notify');
var sass          = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minify        = require('gulp-clean-css');
var concat        = require('gulp-concat');
var dirSync       = require('gulp-directory-sync');
var rename        = require('gulp-rename');
var autoprefixer  = require('gulp-autoprefixer');
var nunjucks      = require('gulp-nunjucks-html');
var data          = require('gulp-data');
var uglify        = require('gulp-uglify');
var modernizr     = require('gulp-modulizr');
var path          = require('path');
var browserSync   = require('browser-sync');
var gutil         = require('gulp-util');
var reload        = browserSync.reload;

///////////////////////////////////////////////////////
// specify build destination, proxy url
///////////////////////////////////////////////////////
var build       = '../public/';
var css         = build + 'css';
var js          = build + 'js';
var img         = build + 'img';

///////////////////////////////////////////////////////
// process sass
///////////////////////////////////////////////////////
gulp.task('sass', ['autoprefixer', 'fonts'] ,function () {
    return gulp.src('../src/sass/theme.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minify({processImport: true}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.', {addComment: true, sourceRoot: '/style'}))
        .pipe(gulp.dest(css))
        .pipe(reload({ stream: true }))
        .pipe(notify({ message: 'sass compiled'}));
});

///////////////////////////////////////////////////////
// run autoprefixer
///////////////////////////////////////////////////////
gulp.task('autoprefixer', function () {
    return gulp.src(css + '/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(css));});

///////////////////////////////////////////////////////
// concat and minify src js files
///////////////////////////////////////////////////////
gulp.task('scriptsPlugins', [],  function() {
    return gulp.src(
        [
            '../src/js/vendor/jquery.min.js',
            '../src/js/vendor/underscore-min.js',
            '../src/js/vendor/backbone-min.js',
            '../src/js/vendor/handlebars.runtime.js',
            '../src/js/vendor/slick.min.js',
            '../src/js/vendor/tether.min.js',            
            '../src/js/vendor/bootstrap.min.js',
            '../src/js/vendor/notify.min.js'
        ])
        .pipe(concat('plugins.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(js))
        .pipe(notify({ message: 'javascript files concated and minified'}))
});

gulp.task('customScripts', [],  function() {
    return gulp.src(
        [
            '../src/js/mat-generic.js',
            '../src/js/mat-cookie.js',
            '../src/js/mat-pagination.js',
            '../src/js/mat-brandInfo.js',
            '../src/js/mat-router.js',
            '../src/js/mat-page.js'
        ])
        .pipe(concat('mat-common.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(js))
        .pipe(notify({ message: 'mat-common js concated and minified'}))
});
gulp.task('fonts', function () {
    return gulp.src('../src/fonts/**/*.*')
        .pipe(gulp.dest(css + '/fonts/'))
        .pipe(notify({ message: 'fonts moved'}));
});



///////////////////////////////////////////////////////
// the watch task
///////////////////////////////////////////////////////
gulp.task('watch', function() {
    // Watch .sass files
    gulp.watch('../src/sass/**/*.scss', ['sass']).on("change", browserSync.reload);
    // Watch .js files
    gulp.watch('../src/js/**/*.js', ['customScripts']).on("change", browserSync.reload);
});

///////////////////////////////////////////////////////
// the default task
///////////////////////////////////////////////////////
gulp.task('default', ['sass','scriptsPlugins','customScripts','watch'], function() { });
