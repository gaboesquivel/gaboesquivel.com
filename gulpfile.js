const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const imageminOpts = [
  $.imagemin.gifsicle({interlaced: true}),
  $.imagemin.jpegtran({progressive: true}),
  $.imagemin.optipng({optimizationLevel: 5}),
  $.imagemin.svgo({plugins: [{removeViewBox: true}]})
];

gulp.task('optimize-images', () => {
  return gulp.src('src/img/**/*')
    .pipe($.cache($.imagemin(imageminOpts)))
    .pipe(gulp.dest('static/img'));
});

gulp.task('clear-cache', function() {
  $.cache.clearAll();
});
