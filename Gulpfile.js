var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

var input = './src/sass/*.scss';
var output = './dist/css/';

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

gulp.task('default', ['serve']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/sass/**/*", ['sass']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp
        .src(input)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output))
        .pipe(browserSync.stream());
});

//gulp.task('watch', function() {
//    return gulp
//        .watch(input, ['sass'])
//        .on('change', function(event) {
//            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//        });
//});