
//npm install -save module1 module2
//npm install -save gulp-postcss gulp-uglify gulp-plumber gulp-rename autoprefixer gulp-notify gulp-sass gulp-concat lost

var gulp         = require('gulp'),
	postcss 	 = require('gulp-postcss'),
	uglify       = require('gulp-uglify'),
	plumber      = require('gulp-plumber'),
	rename       = require('gulp-rename'),
	autoprefixer = require('autoprefixer'),
	notify       = require('gulp-notify'),
	sass         = require('gulp-sass'),
	concat       = require('gulp-concat'),
	lost         = require('lost');

var watch_paths = {
	//scripts: ['assets_src/js/modules/*.js'],
	styles:  ['sass/*.scss']
};


// Styles Task
gulp.task('styles', function() {
	var processors = [
		lost,
		autoprefixer({browsers:['last 6 version', 'ie >= 9']})
	];

	gulp.src(watch_paths.styles)
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed' // Uncomment to minify css
		}))
		.pipe(postcss(processors))
		.pipe(gulp.dest('css'))
		.pipe(notify({ message: 'Styles task complete' }));
});

// Watch Task
gulp.task('watch', function() {
	//gulp.watch(watch_paths.scripts, ['scripts']);
	gulp.watch(watch_paths.styles, ['styles']);
});

gulp.task('default', ['watch']);
