'use strict';

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	del = require('del'),
	notify = require('gulp-notify'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	changed = require('gulp-changed'),
	opn = require('opn');

gulp.task('connect', function(){
	connect.server({
		root: 'app/',
		port: 8000,
		livereload: true
	});
	opn('http://localhost:8000');
});

gulp.task('jade', function(){
	return gulp.src('app/jade/**/[^_]*.jade')
			.pipe(changed('app'))
			.pipe(jade({pretty: true}))
			.pipe(rename({dirname: ""}))
			.pipe(gulp.dest('app'))
			.pipe(notify("<%= file.relative %> JADED!"))
			.pipe(connect.reload());
});

gulp.task('stylus', function(){
	return gulp.src('app/stylus/**/[^_]*.styl')
			.pipe(changed('app/css'))
			.pipe(stylus())
			.pipe(rename({dirname: ""}))
			.pipe(gulp.dest('app/css'))
			.pipe(notify("<%= file.relative %> STYLUSED!"))
			.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('app/jade/**/*.jade', ['jade']);
	gulp.watch('app/stylus/**/*.styl', ['stylus']);
});

gulp.task('build', function(){
	del('build/**/*.*');
	
	gulp.src(['app/css/', 'app/js/', 'app/img/'])
		.pipe(gulp.dest('build'));
	gulp.src('app/*.html')
		.pipe(rename({extname: ".php"}))
		.pipe(gulp.dest('build'));
});

gulp.task('default', ['stylus', 'jade', 'watch', 'connect']);