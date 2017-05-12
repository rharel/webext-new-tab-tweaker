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
	const sources =
	[
		'./dist/common/js',
		'./bin'
	];
	return (
		gulp.src(sources, {read: false})
			.pipe(clean())
	);
});

gulp.task('build basic.js', ['clean'], () =>
{
	const sources =
	[
		'./src/js/basic/ordering.js',
		'./src/js/basic/rng.js',
	];
	return (
		gulp.src(sources)
			.pipe(iife(iife_settings))
			.pipe(concat('basic.js'))
			.pipe(gulp.dest('./dist/common/js/'))
	);
});
gulp.task('build configuration.js', ['clean'], () =>
{
	const sources =
	[
		'./src/js/configuration/version.js',
		'./src/js/configuration/layout.js',
		'./src/js/configuration/migration.js',
		'./src/js/configuration/storage.js'
	];
	return (
		gulp.src(sources)
			.pipe(iife(iife_settings))
			.pipe(concat('configuration.js'))
			.pipe(gulp.dest('./dist/common/js/'))
	);
});
gulp.task('build common/js/',
[
	'build basic.js',
	'build configuration.js'
], () =>
{
	const sources =
	[
		'./src/js/ntt.js',
		'./src/js/api/imgur.js'
	];
	return (
		gulp.src(sources)
			.pipe(iife(iife_settings))
			.pipe(gulp.dest('./dist/common/js/'))
	)
});

gulp.task('build',
[
	'build common/js/'
], () =>
{

});
gulp.task('build and test', ['build'], () =>
{
	return (
		gulp.src('./test/**/*.test.html')
			.pipe(open())
	);
});
gulp.task('build and pack', ['build'], () =>
{
	return (
		gulp.src('./dist/**/*')
			.pipe(zip('new-tab-tweaker.zip'))
			.pipe(gulp.dest('./bin/'))
	);
});
