/**
 * @license AGPLv3 2014
 * @author indolering
 */

'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var inlining = require('gulp-inlining-node-require');
//
//var watcher = gulp.watch('src/**/*.js', ['default']);
//watcher.on('change', function(event) {
//  console.log('File '+event.path+' was '+event.type+', running tasks...');
//});

gulp.task('default', function() {
  gulp.src('./src/index.js')
//    .pipe(concat('nmc.js'))
    .pipe(inlining())
    .pipe(rename('nmc.js'))
    .pipe(gulp.dest('./'))
});

//gulp.task('default', function() {
//
//  var metaLocation = './spx/meta/';
//
//  gulp.src('./scripts/index.js', {read: false})
//    .pipe(browserify({
//      insertGlobals: false,
//      debug: true,
//      transform: ['uglifyify'],
//      'global-transform': true
//    }))
//    .pipe(rename('speech.js'))
////    .pipe(uglify({outSourceMap: true}))
//    .pipe(gulp.dest(metaLocation));
//
//  gulp.src('./scripts/index.js', {read: false})
//    .pipe(browserify({
//      insertGlobals: false,
//      debug: false,
//      transform: ['uglifyify'],
//      'global-transform': true
//    }))
//    .pipe(zip())
//    .pipe(rename('speech.mini.js.gz'))
//    .pipe(gulp.dest(metaLocation));
//
//  babel(metaLocation);
//  babel('./babel/');
//  gulp.src('./babel/babel.js')
//    .pipe(gulp.dest(metaLocation));
//
//});
//
//function babel(location) {
//  location = location || './babel/';
//
//  gulp.src('./babel/babel.js')
//    .pipe(closure({compilation_level: 'ADVANCED_OPTIMIZATIONS'}))
//    .pipe(rename('babel.mini.js'))
//    .pipe(gulp.dest(location));
//
//  gulp.src('./babel/babel.js')
//    .pipe(closure({compilation_level: 'ADVANCED_OPTIMIZATIONS'}))
//    .pipe(zip())
//    .pipe(rename('babel.mini.js.gz'))
//    .pipe(gulp.dest(location));
//}
