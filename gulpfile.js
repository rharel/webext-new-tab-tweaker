const
	gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	replace = require('gulp-replace'),
	concat = require('gulp-concat'),
	iife = require('gulp-iife');

gulp.task('test', () =>
{
	gulp.src('test/**/*.test.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('build configuration.js', () =>
{
	gulp.src
	([
		'src/configuration/version.js',
		'src/configuration/layout.js',
		'src/configuration/validation.js',
		'src/configuration/storage.js',
		'src/configuration/index.js',
	])
		.pipe(replace(/\/\/#begin-dev[\s\S]*?\/\/#end-dev/g, ""))
		.pipe(concat('configuration.js'))
		.pipe(iife())
		.pipe(gulp.dest('dist/common/js/'));
});
