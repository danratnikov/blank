'use strict';

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	minifyCSS = require('gulp-minify-css'),
	del = require('del'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	changed = require('gulp-changed'),
	opn = require('opn'),
	nib = require('nib'),
	imageMin = require('gulp-imagemin'),
	clean = require('gulp-clean');

gulp.task('clean', function () {
    gulp.src('build/**/*', {read: false})
        .pipe(clean());
     setTimeout(function(){
		console.log('********** Clean complete! *************');
	}, 1000);
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


gulp.task('image', function() {
	gulp.src('app/img/**/*')
		.pipe(imageMin())
		.pipe(gulp.dest('build/img'))
		.pipe(connect.reload());
});

gulp.task('jade', function() {
	gulp.src('app/jade/**/[^_]*.jade')
		.pipe(jade({
			pretty: true
		}))
		.on('error', console.log)
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest('build'))
		.pipe(connect.reload());
});

gulp.task('stylus', function() {
	gulp.src('app/stylus/**/[^_]*.styl')
		.pipe(stylus({
			use: nib()
		}))
		.on('error', console.log)
		.pipe(gulp.dest('build/css'))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('build/js'))
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
	gulp.watch('app/img/**/*', ['image']);
	setTimeout(function(){
		console.log('********** Watch start! ***************');
	}, 1000);
});

gulp.task('build', ['js', 'jade', 'stylus', 'font', 'image'], function() {
	setTimeout(function(){
		console.log('********** Build complete! *************');
	}, 1000);
});

gulp.task('default', ['stylus', 'jade', 'watch', 'connect']);