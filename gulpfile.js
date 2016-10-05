var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
	rename = require("gulp-rename");



//browserSync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});



//sass
gulp.task('sass', function () {
  gulp.src('app/assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
                browsers: ['> 1%', 'last 2 versions'],
                cascade: false
            }))
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.stream());
});



//watch task
gulp.task('watch', function(){
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
	gulp.watch('app/assets/sass/*.scss',['sass']);
    gulp.watch(['app/**/*.html', 'app/**/*.js']).on("change", browserSync.reload);
});


gulp.task('default', ['watch']);
