'use strict';
require('dotenv').config();
const gulp 				= require('gulp');
const gutil 			= require('gulp-util');
const fs 				= require('fs');
const gulpLoadPlugins 	= require('gulp-load-plugins');
const vsource			= require('vinyl-source-stream');
const vbuffer 			= require('vinyl-buffer');
const spawn 			= require('child_process').spawn;
const chalk				= require('chalk');
const git 				= require('gulp-git');
const runSequence 		= require('run-sequence');

const $ = gulpLoadPlugins();
let envProd = false;

const imageminPngquant  	= require('imagemin-pngquant');
const imageminMozjpeg   	= require('imagemin-mozjpeg');

// Stylesheets
gulp.task('styles', (done) => {
	var paths = [
	];
	var out = gulp.src('src/styles/main.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sassGlob())
		.pipe($.sass({
			style: 'expanded',
			includePaths: paths .concat(require('node-neat').includePaths)
			.concat(require('node-bourbon').includePaths)
			.concat(require('node-normalize-scss').includePaths)
		}))
		.on('error', $.sass.logError)
		.on('error', function (e) {
			if (!envProd) {
				$.notify().write(e);
			}
		})
		.pipe($.autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}));

	if (envProd) {
		return out.pipe($.csso())
			// .pipe($.rev())
			.pipe(gulp.dest('src'))
			.pipe($.rev.manifest(dist + 'manifest.json', {
				merge: true,
				base: '',
			}))
			.pipe(gulp.dest(''));
	} else {
		return out.pipe($.sourcemaps.write())
			.pipe(gulp.dest('src'));
	}
});

// Images
gulp.task("images", function(cb) {
	return gulp.src('images/**/*', {
		base: "images"
	})
	.pipe($.cache(
		$.imagemin([
			imageminPngquant(),
			imageminMozjpeg(),
			$.imagemin.gifsicle(),
			$.imagemin.svgo({
				svgoPlugins: [{
					removeViewBox: true,
				},]
			,}),
		], {
			verbose: true,
		})
	))
	.pipe( gulp.dest( "src/img" ) );
});

gulp.task('watch', ['styles'], (done) => {
	gulp.watch([
		'src/**/*.scss'
	], ['styles']);

	gulp.watch([
		"src/**/*",
		"public/**/*",
		"manual/**/*",
		"stories/**/*"
	]);
});
