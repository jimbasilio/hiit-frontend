// started from here => http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const tsconfig = require('tsconfig-glob');
const autoprefixer = require('gulp-autoprefixer');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// copy static assets to dist directory
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['src/static/**/*'])
    .pipe(gulp.dest('dist'))
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/angular2/bundles/router.js',
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/bootstrap-sass/dist/css/bootstrap.css',
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

gulp.task('copy:ngrx', ['clean'], function() {
    return gulp
        .src(['node_modules/@ngrx/**/dist/*'])
        .pipe(gulp.dest('dist/lib/@ngrx'));
})

// font-awesome fonts
gulp.task('icons', ['clean'], function() {
    return gulp.src(['node_modules/font-awesome/fonts/**.*', 'node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*'])
        .pipe(gulp.dest('dist/fonts'));
});

// linting
gulp.task('tslint', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('msbuild'));
});

// linting
gulp.task('tslintprod', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint({
        configuration: {
            rules: {
                "no-debugger": "true"
            }
        }
    }))
    .pipe(tslint.report('msbuild'));
});


// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src(tscConfig.files)
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.', { includeContent: true, sourceRoot: '/src'}))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('compile:sass', ['clean'], function() {
    return gulp
        .src(['src/app/stylesheets/**/*.css', 'src/app/stylesheets/**/*.scss'])
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded',
            includePaths: [
                'node_modules/bootstrap-sass/assets/stylesheets', 'node_modules/font-awesome/scss'
            ]
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: [
                'last 2 versions'
            ]
        }))
        .pipe(gulp.dest('dist/css/'));
});

// update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function () {
  return tsconfig({
    configPath: '.',
    indent: 2
  });
});

gulp.task('build', ['tslint', 'tsconfig-glob', 'compile', 'compile:sass', 'copy:libs', 'icons', 'copy:assets']);

gulp.task('default', ['build']);
