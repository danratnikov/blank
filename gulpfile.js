'use strict';

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	del = require('del'),
	notify = require('gulp-notify'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
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
			.pipe(jade({pretty: true}))
			.pipe(rename({dirname: ""}))
			.pipe(gulp.dest('app'))
			.pipe(notify("<%= file.relative %> JADED!"))
			.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('app/jade/**/*.jade', ['jade']);
});

gulp.task('build', function(){
	del('build/**/*.*');
	
	gulp.src(['app/css/', 'app/js/', 'app/img/'])
		.pipe(gulp.dest('build'));
	gulp.src('app/*.html')
		.pipe(rename({extname: ".php"}))
		.pipe(gulp.dest('build'));
});

gulp.task('default', ['jade', 'watch', 'connect']);