const
	gulp = require('gulp'),
	open = require('gulp-open'),
	zip = require('gulp-zip');

gulp.task('test', () =>
{
	return (
		gulp.src('./tests/**/*.test.html')
			.pipe(open())
	);
});
gulp.task('pack', () =>
{
	return (
		gulp.src('./sources/**/*')
			.pipe(zip('new-tab-tweaker.zip'))
			.pipe(gulp.dest('./distribution/'))
	);
});
