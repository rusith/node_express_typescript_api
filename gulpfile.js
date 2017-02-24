var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint      = require("gulp-tslint");

var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  var tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task("lint", function() {
    return gulp.src([
        "src/**/**.ts",
        "test/**/**.test.ts"
    ])
    .pipe(tslint({ }))
    .pipe(tslint.report("verbose"));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch']);
