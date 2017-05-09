const
	gulp = require('gulp'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	iife = require('gulp-iife'),
	open = require('gulp-open'),
    rename = require('gulp-rename'),
	zip = require('gulp-zip');

const iife_settings = {prependSemicolon: false};

gulp.task('clean', () =>
{
	return (
		gulp.src('./dist/common/js', {read: false})
			.pipe(clean())
	);
});

gulp.task('build ntt.js', ['clean'], () =>
{
	return (
		gulp.src('./src/js/ntt.js')
			.pipe(iife(iife_settings))
			.pipe(gulp.dest('./dist/common/js/'))
	)
});
gulp.task('build basic.js', ['clean'], () =>
{
	return (
		gulp.src('./src/js/basic/ordering.js')
			.pipe(rename('basic.js'))
			.pipe(iife(iife_settings))
			.pipe(gulp.dest('./dist/common/js/'))
	);
});
gulp.task('build configuration.js', ['clean'], () =>
{
	const sources =
	[
		'./src/js/configuration/version.js',
		'./src/js/configuration/layout.js',
		'./src/js/configuration/storage.js'
	];
	return (
		gulp.src(sources)
			.pipe(iife(iife_settings))
			.pipe(concat('configuration.js'))
			.pipe(gulp.dest('./dist/common/js/'))
	);
});
gulp.task('build',
[
	'build ntt.js',
	'build basic.js',
	'build configuration.js'
], () => {});

gulp.task('test', ['build'], () =>
{
	return (
		gulp.src('./test/**/*.test.html')
			.pipe(open())
	);
});

gulp.task('build and pack', ['build'], () =>
{
	return (
		gulp.src('./dist/*')
			.pipe(zip('new-tab-tweaker.zip'))
			.pipe(gulp.dest('./'))
	);
});