const
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	iife = require('gulp-iife');

gulp.task('build basic.js', () =>
{
	const sources =
	[
		'./src/basic/ordering.js',
		'./src/basic/index.js'
	];

	return (
		gulp.src(sources)
			.pipe(concat('basic.js'))
			.pipe(iife())
			.pipe(gulp.dest('./dist/basic/js/'))
	);
});
