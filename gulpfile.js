var gulp = require('gulp');
var argv = require('yargs').argv;
var babelify = require('babel-core/register');

gulp.task('hist', function() {
  babelify();
  var hist = require('./devtools/tasks').hist;
  var array = argv.array || [1,1,2,3,3,3,3,4,5,5];
  var opts = {
    binCount: argv.binCount || 5
  }
  hist(array, opts);
});