const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

gulp.task('optimize-images', () => {
  return gulp.src('src/img/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('static/img'));
});

gulp.task('clear-cache', function() {
  $.cache.clearAll();
});
