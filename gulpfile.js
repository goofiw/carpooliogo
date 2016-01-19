"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //run local dev server
var open = require('gulp-open'); //open a url in a web browser
var browserify = require('browserify');
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint'); //lints js and jsx files
var spawn = require('child_process').spawn;
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var node;

var config = {
  port: 3000,
  devBaseUrl: 'http://localhost',
  paths: {
    js: './src/**/*.js',
    mainJs: './src/main.js',
    css: [
          './node_modules/bootstrap/dist/css/bootstrap.css',
          './node_modules/bootstrap/dist/css/bootstrap-theme.css',
          './node_modules/toastr/toastr.scss'
          ],
    html: './src/*.html',
    dist: './dist',
  }
}
//start a local dev server
gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
    mainJs: './src/main.js'
  })
});

gulp.task('open', ['connect'], function(){
  gulp.src('dist/index.html')
    .pipe(open({uri: config.devBaseUrl + ":" + config.port + "/"}))
});

gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload())
});


gulp.task('js', function () {
  browserify({
    entries: 'src/routes.js',
    extensions: ['es6', '.jsx', '.js'],
    debug: true
  })
  .transform(babelify, {presets: ["es2015", "stage-0", "react"]})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'))
  .pipe(notify("js finished"));
});

// gulp.task('js', function(){
//   return gulp.src(config.paths.js)
//     .pipe(sourcemaps.init())
//     .pipe(babel({
//       presets: ["react", "es2015"]
//     }))
//     .pipe(concat("bundle.js"))
//     .pipe(sourcemaps.write("."))
//     .pipe(gulp.dest("dist"));
// });

gulp.task('css', function() {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(eslint({config: 'eslint.config.json'}))
    .pipe(eslint.format());
})

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint', 'server']);
})

gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})

gulp.task('default', ['html', 'js', 'css', 'lint', 'watch', 'server']);