var root = './';
var rootSource = './source';
var rootOutput = './assets';

// Include gulp
var gulp = require('gulp'); 

var fs = require('fs');
var path = require('path');

// Include Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

gulp.task('output-css', function(){
	return gulp.src( path.join( rootSource, 'css.less' ) )
		.pipe(less())
		.pipe(postcss([
			autoprefixer({
				'browsers': [
					'Android >= 2',
					'Chrome >= 20',
					'Firefox >= 20',
					'ie >= 11',
					'Edge >= 12',
					'iOS >= 5',
					'ChromeAndroid >= 20',
					'ExplorerMobile >= 11'
				]
			})
		]))
		.pipe(gulp.dest( rootOutput ))
		.pipe(nano({
			//safe: 	true
		}))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest( rootOutput ));
});

gulp.task('watch', function(){
	gulp.watch(
			path.join( rootSource, '**/*.less' ),
			['output-css']
		);
});

gulp.task('default',[
	'output-css',
	'watch'
]);