const gulp = require('gulp');
const taskListing = require('gulp-task-listing');
const ts = require('gulp-typescript');
const gulpClean = require('gulp-clean');


// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

/**
 * Clean target folder
 */
gulp.task('clean', () => gulp.src('dist', { read: false }).pipe(gulpClean()));

/**
 * Compile server typescript files
 */
gulp.task('build', () => {
  const tsResult = tsProject.src().pipe(tsProject());

  return tsResult.js
    .pipe(gulp.dest('dist'));
});

/**
 * Watch server typescript files and compile when changed
 */
gulp.task('watch', ['build'], () => {
  gulp.watch(['src/**/*.ts'], ['build']);
});

/**
 * Show task list by default
 */
gulp.task('default', taskListing);

/**
 * Show task list for help
 */
gulp.task('help', taskListing);
