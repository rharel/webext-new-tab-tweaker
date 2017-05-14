const
	gulp = require('gulp'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	event_stream = require('event-stream'),
	iife = require('gulp-iife'),
	open = require('gulp-open'),
	zip = require('gulp-zip');

const iife_settings = {prependSemicolon: false};

gulp.task('build configuration.js', () =>
{
	const sources =
	[
		'./src/js/configuration/index.js',
		'./src/js/configuration/version.js',
		'./src/js/configuration/layout.js',
		'./src/js/configuration/migration.js',
		'./src/js/configuration/storage.js'
	];
	const destination = './dist/background_scripts';

	return event_stream.concat(
		gulp.src(`${destination}configuration.js`)
			.pipe(clean()),
		gulp.src(sources)
			.pipe(iife(iife_settings))
			.pipe(concat('configuration.js'))
			.pipe(gulp.dest(destination))
	);
});

gulp.task('build', ['build configuration.js'], () => {});
gulp.task('test', ['build'], () =>
{
	return (
		gulp.src('./test/**/*.test.html')
			.pipe(open())
	);
});
gulp.task('pack', ['build'], () =>
{
	return (
		gulp.src('./dist/**/*')
			.pipe(zip('new-tab-tweaker.zip'))
			.pipe(gulp.dest('./bin/'))
	);
});
