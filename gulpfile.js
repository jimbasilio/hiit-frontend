// started from here => http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html

const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const tsconfig = require('tsconfig-glob');
const changedInPlace = require('gulp-changed-in-place');
const tsfmt = require('gulp-tsfmt');
const runSequence = require('run-sequence');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// copy static assets to dist directory - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['app/static/**/*', '!app/**/*.ts'])
    .pipe(gulp.dest('dist'))
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/font-awesome/css/font-awesome.css',
      'node_modules/satellizer/satellizer.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
      'node_modules/immutable/dist/immutable.js'
    ])
    .pipe(gulp.dest('dist/lib'))
});

// linting
gulp.task('tslint', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});


// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src(tscConfig.files)
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/angular2'));
});

// update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function () {
  return tsconfig({
    configPath: '.',
    indent: 2
  });
});

// setup watch for file changes to trigger recomplication
gulp.task('watch', function() {
    gulp.watch([tscConfig.files], ['buildNoWatch']);
});

// format typescript
gulp.task('format', () => {
  gulp.src('app/**/*.ts' )
    .pipe(changedInPlace())
    .pipe(tsfmt(
        {
            IndentSize: 4,
            TabSize: 4,
            NewLineCharacter: "\n",
            ConvertTabsToSpaces: true,
            InsertSpaceAfterCommaDelimiter: true,
            InsertSpaceAfterSemicolonInForStatements: true,
            InsertSpaceBeforeAndAfterBinaryOperators: true,
            InsertSpaceAfterKeywordsInControlFlowStatements: true,
            InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
            InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
            PlaceOpenBraceOnNewLineForFunctions: false,
            PlaceOpenBraceOnNewLineForControlBlocks: false         
        }
    ))
    .pipe(gulp.dest('app'))
});

// gulp 4.0 will give a better native syntax to accomplish ordering
// http://stackoverflow.com/a/22826429/640396
// in gulp3.x all tasks will execute in parallel w/o explicit ordering through runSequence plugin
// attempting to allow formatter to run prior to running linting (not entirely working, runs 2x)
gulp.task('build', function() {
    runSequence('buildNoWatch', 'watch');
});

gulp.task('buildNoWatch', function() {
    runSequence('format', 'afterFormat');
});

gulp.task('afterFormat', ['tslint', 'tsconfig-glob', 'compile'], function() {
    runSequence('afterLintAndCompile');
});

gulp.task('afterLintAndCompile', ['copy:libs', 'copy:assets']);

gulp.task('default', ['build']);
