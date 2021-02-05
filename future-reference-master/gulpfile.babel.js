/* eslint-env node */
/* global $: true */
'use strict';

var fs = require('fs');
var dotenv = require('dotenv');
var envConfig = dotenv.parse(fs.readFileSync('.env'));
for (var k in envConfig) {
	process.env[k] = envConfig[k]
}

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import rimraf from 'rimraf';
import runSequence from 'run-sequence';
import webpack from 'webpack-stream';
var browserSync = require('browser-sync').create();
var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var metalsmithMarkdown = require('metalsmith-markdown');
const merge = require('merge-stream');

const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

const $ = gulpLoadPlugins();

let envProd = false;

const staticSrc = 'src/**/*.{eot,ttf,woff,woff2,otf,pdf,txt}';

const dist = 'dist/';

/* Configure Nunjucks */
var nunjucks = require('nunjucks');
var nunjucksEnv = nunjucks.configure('./src/html/views', {
	watch: false,
	throwOnUndefined: false,
	noCache: true
});
/* Enable Mardown parseing */
var markdown = require('nunjucks-markdown');
var marked = require('marked');
markdown.register(nunjucksEnv, marked);

// Clean
gulp.task('clean', () => {
	return rimraf.sync('dist');
});

gulp.task('cacheclear', () => {
	$.cache.clearAll();
});

// Copy staticSrc
gulp.task('copy', ['font-awesome'], () => {
		return gulp.src([staticSrc,'src/email/**'], {
			base: 'src'
		}).pipe(gulp.dest(dist));
	});


/* Copy FontAwesome font */
gulp.task('font-awesome', function () {
	return gulp.src(require('node-font-awesome').fonts)
		.pipe(gulp.dest(dist + 'fonts'));
});



gulp.task("revreplace", function () {
	var manifest = gulp.src(dist + 'manifest.json');

	return gulp.src(dist + '**/*.html')
		.pipe($.revReplace({
			manifest: manifest
		}))
		.pipe(gulp.dest(dist));
});

// JSHint
gulp.task('jshint', () => {
	return gulp.src(['src/js/**/*.js'])
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.jshint.reporter('fail'))
		.on('error', function (e) {
			if (!envProd) {
				$.notify().write(e);
			}
		});
});

/** Compile Javascript */
gulp.task('javascript', ['jshint'], function () {
	var out = gulp.src('./src/js/main.js')
		.pipe(webpack(require('./webpack.config.js')))
		.on('error', function (e) {
			if (!envProd) {
				$.notify().write(e);
			}
		});

	if (envProd) {
		return out.pipe($.uglify())
			.pipe($.rev())
			.pipe(gulp.dest(dist + 'js'))
			.pipe($.rev.manifest(dist + 'manifest.json', {
				merge: true,
				base: '',
			}))
			.pipe(gulp.dest(''));
	} else {
		return out.pipe($.sourcemaps.init({
				loadMaps: true
			}))
			.pipe($.sourcemaps.write())
			.pipe(gulp.dest(dist + 'js'));
	}
});


// Dato Metalsmith
gulp.task('metalsmith', function (cb) {
	Metalsmith(__dirname)
		.source('src/html/pages')
		.destination(dist)
		.clean(false)
		.use(require('metalsmith-metadata-directory')({
			directory: 'src/html/data/**/*.json',
		}))
		.use(metalsmithMarkdown())
		.use(require('metalsmith-layouts')({
			'engine': 'nunjucks',
			'directory': 'src/html/views',
			'rename': true
		}))
		.build(function (err) {
			if (err) {
				throw err;
			}
			cb();
		});
});

gulp.task('metalsmith_articles', function (cb) {
	Metalsmith(__dirname)
		.source('src/html/articles_data')
		.destination(dist + 'articles/')
		.use(metalsmithMarkdown())
		.use(layouts({
			'engine': 'nunjucks',
			'directory': 'src/html/views',
			'default': 'article.njk',
			'pattern': ["*/*/*html","*/*html","*html"],
			'rename': true
		}))
		.build(function (err) {
			if (err) {
				throw err;
			}
			cb();
		});
});


// Images
gulp.task("images", function () {
	return gulp.src('src/img/**/*.{jpg,png,gif,svg,ico}')
		.pipe($.cache(
			$.imagemin([
				imageminPngquant(),
				imageminMozjpeg(),
				$.imagemin.gifsicle(),
				$.imagemin.svgo({
					svgoPlugins: [{
						removeViewBox: true,
					}, ],
				}),
			], {
				verbose: true,
			})
		))
		.pipe(gulp.dest(dist + 'img'));
});

// Stylesheets
gulp.task('stylesheets', ['javascript'], () => {
	var paths = [
		'node_modules/slick-carousel/slick'

	];
	var out = gulp.src('src/css/main.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sassGlob())
		.pipe($.sass({
			style: 'expanded',
			includePaths: paths .concat(require('node-neat').includePaths)
			.concat(require('node-bourbon').includePaths)
			.concat(require('node-normalize-scss').includePaths)
			.concat(require('node-font-awesome').scssPath)
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
			.pipe($.rev())
			.pipe(gulp.dest(dist + 'css'))
			.pipe($.rev.manifest(dist + 'manifest.json', {
				merge: true,
				base: '',
			}))
			.pipe(gulp.dest(''));
	} else {
		return out.pipe($.sourcemaps.write())
			.pipe(gulp.dest(dist + 'css'));
	}
});

gulp.task('test', (callback) => {
	runSequence(
		"html:validate",
		"html:accessibility",
		callback
	);
});

gulp.task('html:validate', () => {
	return gulp.src(dist + '**/*.html')
		.pipe($.html());
});


gulp.task('html:accessibility', () => {
	return gulp.src(dist + '**/*.html')
		.pipe($.accessibility({
			force: true,
			accessibilityLevel: 'WCAG2A',
			reportLevels: {
				notice: false,
				warning: false,
				error: true
			}
		}))
		.on('error', console.log);
});


// Set Production Environment
gulp.task('production_env', () => {
	envProd = true;
});

// Serve
gulp.task('serve', ['clean', 'stylesheets', 'javascript', 'images', 'copy', 'metalsmith', 'metalsmith_articles'], function () {
	browserSync.init({
		ghostMode: false,
		open: false,
		server: {
			baseDir: dist,
			serveStaticOptions: {
				extensions: ['html'] // pretty urls
			}
		}
	});
	gulp.watch(staticSrc, ['copy']);
	gulp.watch('src/css/**/*.scss', ['stylesheets']);
	gulp.watch('src/js/**/*.js', ['javascript']);
	gulp.watch("src/**/*.{html,njk}", ["metalsmith"]);
	gulp.watch(dist + '/**/*.{jpg,png,svg,webp,js,html}').on('change', browserSync.reload);
});

gulp.task('metalsmith_all', ['metalsmith', 'metalsmith_articles'], function () {});

// Deploy
gulp.task("deploy", function (callback) {
	runSequence(
		'build',
		'publish',
		callback)
});

// Build
gulp.task("build", function (callback) {
	runSequence(
		"production_env",
		"clean",
		"metalsmith_all",
		"stylesheets",
		"javascript",
		"images",
		"copy",
		"revreplace",
		callback)
});


// Publish to S3
gulp.task('publish', function () {

	const publisher = $.awspublish.create({
		region: 'ap-southeast-2',
		params: {
			Bucket: process.env.S3_BUCKET_NAME
		},
		"accessKeyId": process.env.AWS_ACCESS_KEY,
		"secretAccessKey": process.env.AWS_SECRET_KEY
	});

	const invalidator = {
		distribution: process.env.CLOUDFRONT_ID,
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
		indexRootPath: true
	};

	const html = gulp.src(['dist/**/*.html'])
		.pipe($.rename(function (path) {
			if(path.dirname !== 'email') {
				path.dirname = '/' + path.dirname;
				path.extname = '';
			}
		}))
		.pipe(publisher.publish({
			'Content-Type': 'text/html',
			'Cache-Control': 'max-age=600, no-transform, public'
		}));

	const files = gulp.src(['dist/**', '!dist/**/*.html'])
		.pipe($.awspublishRouter({
			cache: {
				// cache for 10 minutes by default 
				cacheTime: 600
			},
			routes: {
				"^(js|css|img|fonts|doc)/.+$": {
					// cache static assets for a day
					cacheTime: 2592000
				},

				// pass-through for anything that wasn't matched by routes above, to be uploaded with default options
				"^.+$": "$&"
			}
		}))
		.pipe(publisher.publish());

	return merge(files, html)
		.pipe(publisher.cache())
		.pipe($.awspublish.reporter())
		.pipe($.cloudfrontInvalidateAwsPublish(invalidator));
});
