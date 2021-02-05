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
const header 			= require('gulp-header');

const $ = gulpLoadPlugins();
let envProd = false;

const imageminPngquant  	= require('imagemin-pngquant');
const imageminMozjpeg   	= require('imagemin-mozjpeg');

// Webpack
var webpack = require('webpack');
var webpackConfig = require("./config/webpack.config.dev.js");

const RED_ROOSTER 		= 'redrooster';
const OPORTO 			= 'oporto';
const theme 			= OPORTO;
const dist = 'src';

// Stylesheets
gulp.task('stylesheets', (done) => {
	var paths = [
	];
	var out = gulp.src('src/styles/main.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sassGlob())
		.pipe(header('$theme: ' + theme + ';\n'))
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
	return gulp.src('images/**/*.{jpg,png,gif,svg,ico}', {
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

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'inline-eval-cheap-source-map';
// myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('copy', function () {
	return gulp.src([
		'../craveable-brands-loyalty-app/app/common/*.js',
	])
	.pipe(gulp.dest('src/common/'));
});

gulp.task('watch', ['images', 'stylesheets'], (done) => {
	// gulp.watch(["src/**/*.scss"], ['stylesheets']);
	gulp.watch(["../craveable-brands-loyalty-app/app/common/*.js"], ['copy']);
	gulp.watch(["images/**/*.{jpg,png,gif,svg,ico}"], ['images']);
});

// Build
gulp.task("build", function (callback) {
	runSequence(
		"stylesheets",
		"images",
		callback)
});
