const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

//Scripts Task
gulp.task('scripts', async() => {
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./src/'));
})

//Styles Task
gulp.task('styles', async() => {
  gulp.src('./src/scss-font/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/'));
});

//HTML Task
gulp.task('html', async () => {
  gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true, conservativeCollapse: true, removeComments: true}))
    .pipe(gulp.dest('./src/dist'));
});

//Watch Task
gulp.task('watch', async() => {
  gulp.watch('src/*.js', gulp.series('scripts'));
  gulp.watch(['src/assets/scss/*.scss', 'src/scss-font/*.scss'], gulp.series('styles'));
  gulp.watch('src/*.html', gulp.series('html'));
});

gulp.task('default', gulp.parallel(['scripts', 'styles', 'html']));