'use strict';

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	minifyCSS = require('gulp-minify-css'),
	del = require('del'),
	notify = require('gulp-notify'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	changed = require('gulp-changed'),
	opn = require('opn'),
	clean = require('gulp-clean');

gulp.task('clean', function () {
    gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('connect', function() {
	connect.server({
		root: 'build',
		port: 8000,
		livereload: true
	});
	opn('http://localhost:8000');
});

var jade = require('gulp-jade');

gulp.task('jade', function() {
	gulp.src('app/jade/**/[^_]*.jade')
		.pipe(jade({
			pretty: true
		}))
		.on('error', console.log)
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest('build'))
		.pipe(notify("<%= file.relative %> JADED!"))
		.pipe(connect.reload());
});

gulp.task('stylus', function() {
	gulp.src('app/stylus/**/[^_]*.styl')
		.pipe(stylus())
		.on('error', console.log)
		.pipe(gulp.dest('build/css'))
		.pipe(notify("<%= file.relative %> STYLUSED!"))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('build/js'))
		.pipe(notify("<%= file.relative %> JS complete!"))
		.pipe(connect.reload());
});

gulp.task('font', function() {
	gulp.src('app/font/**/*')
		.pipe(gulp.dest('build/font'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('app/jade/**/*.jade', ['jade']);
	gulp.watch('app/stylus/**/*.styl', ['stylus']);
	gulp.watch('app/js/**/*.js', ['js']);
});

gulp.task('build', ['js', 'jade', 'stylus', 'font'], function() {

	console.log('********** Build complete! *************');
});

gulp.task('default', ['stylus', 'jade', 'watch', 'connect']);