/* jshint node: true */
/* jshint -W098 */
/* jshint -W079 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var exec = require('child_process').exec;
var rimraf = require('rimraf');

var runSequence = require('run-sequence');
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var babelify = require('babelify');
var webpack = require('webpack-stream');

var envProd	 = false;

var dist = 'wp-content/themes/craveable-brands/';

/** Clean */
gulp.task('clean', function () {
	rimraf.sync(dist);
});

/** Clear Cache */
gulp.task('cacheclear', function () {
	$.cache.clearAll();
});

/** Copy */
gulp.task('copy', ['theme-info', 'font-awesome'], function () {
	return gulp.src([
		'theme-src/**/*.php',
		'theme-src/**/*.ico',
		'theme-src/**/*.twig',
		'theme-src/**/*.json',
		'theme-src/fonts/**/*.{woff,woff2,ttf,otf,eot,svg}',
	], {
		base: 'theme-src',
	})
	.pipe(gulp.dest(dist));
});

/* Add theme info CSS */
gulp.task('theme-info', function () {
	return gulp.src('./theme-src/theme-info.txt')
		.pipe($.rename('style.css'))
		.pipe(gulp.dest(dist));
});

/* Copy FontAwesome font */
gulp.task('font-awesome', function () {
	return gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest(dist + 'fonts'));
});

/** Stylesheets */
gulp.task('styles', ['print-styles', 'sass-lint'], function () {
	var paths = [
		'bower_components/neat/app/assets/stylesheets/',
		'bower_components/bourbon/app/assets/stylesheets/',
		'bower_components/swipebox/scss/',
		'node_modules/font-awesome/scss/',
		'node_modules/normalize.css/',
	];

	var out = gulp.src('theme-src/css/main.scss')
		.pipe($.cssGlobbing({
			extensions: ['.scss'],
		}))
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			style: 'expanded',
			includePaths: paths,
		}))
		.on('error', $.sass.logError)
		.on('error', function (e) {
			$.notify().write(e);
		})
		.pipe($.autoprefixer({
			browsers: ['last 3 versions', 'ie >= 8'],
			cascade: false,
		}));

	if (!envProd) {
		out.pipe($.sourcemaps.write())
			.pipe(gulp.dest(dist + 'css'));
	} else {
		out.pipe($.csso());
	}

	return out.pipe($.rev())
		.pipe(gulp.dest(dist + 'css'))
		.pipe($.rev.manifest(dist + 'css/manifest.json', {
			merge: true,
			base: '',
		}))
		.pipe(gulp.dest(''));
});

gulp.task('print-styles', function () {
	return gulp.src('theme-src/css/print.scss')
		.pipe($.sass({
			style: 'expanded',
		}))
		.on('error', $.sass.logError)
		.on('error', function (e) {
			$.notify().write(e);
		})
		.pipe($.autoprefixer({
			browsers: ['last 3 versions', 'ie >= 8'],
			cascade: false,
		}))
		.pipe($.csso())
		.pipe($.rev())
		.pipe(gulp.dest(dist + 'css'))
		.pipe($.rev.manifest(dist + 'css/manifest.json', {
			merge: true,
			base: '',
		}))
		.pipe(gulp.dest(''));
});

/* Lint SASS files */
gulp.task('sass-lint', function () {
	if (!envProd) {
		return gulp.src(['!theme-src/css/base/_mixins.scss', 'theme-src/css/**/*.s+(a|c)ss'])
			.pipe($.sassLint({
					configFile: '.sass-lint.yml',
				}))
			.pipe($.sassLint.format())
			.pipe($.sassLint.failOnError());
	}
});

gulp.task('images', function () {
	return gulp.src('theme-src/img/**/*.{jpg,png,gif,svg}')
	.pipe($.cache(
			$.imagemin([
				mozjpeg(),
				pngquant(),
				$.imagemin.gifsicle(),
				$.imagemin.svgo({ svgoPlugins: [
					{
						removeViewBox: true,
					},
				], }),
			], {
				verbose: true,
			})
		))
		.pipe(gulp.dest(dist + 'img'));
});

/** JSHint */
gulp.task('jshint', function () {
	if (!envProd) {
		return gulp.src([
			'theme-src/js/**/*.js',
			'!theme-src/js/components/**/*.js',
			'!theme-src/js/containers/**/*.js',
			'!theme-src/js/index.js',
			'!theme-src/js/vendor/*.js',
			'gulpfile.js'
		])
			.pipe($.jshint())
			.pipe($.jshint.reporter('jshint-stylish'))
			.pipe($.jshint.reporter('fail'))
			.on('error', function (e) {
				$.notify().write(e);
			});
	}
});

/** ESLint */
gulp.task('eslint', function () {
	return gulp.src([
		'theme-src/js/**/*.js',
		'!gulpfile.js'
	])
		.pipe($.eslint())
		.pipe($.eslint.format())
		.pipe($.eslint.failAfterError());
});

gulp.task('javascript', ['eslint'], function () {
	let webpackConfig = './webpack.dev.config.js';
	if(envProd) {
		webpackConfig = './webpack.production.config.js';
	}
	let out = gulp.src('./theme-src/js/index.js')
    .pipe(webpack( require(webpackConfig), require('webpack')))
    .on('error', function (e) {
      $.notify().write(e);
    });

  return out.pipe($.buffer())
    .pipe($.rev())
    .pipe(gulp.dest(dist + 'js'))
    .pipe($.rev.manifest(dist + 'js/manifest.json', {
      merge: true,
      base: '',
    }))
    .pipe(gulp.dest(''));

 });

// Set environment to Production
gulp.task('production_env', function () {
	envProd = true;
});

/** Livereload */
gulp.task('watch', ['clean', 'images', 'copy', 'styles', 'javascript'], function () {
	$.livereload.listen();

	/** Watch for PHP changes */
	gulp.watch('theme-src/**/*.{php,twig,json,html}', ['copy']);

	/** Watch for SASS changes */
	gulp.watch('theme-src/css/**/*.scss', ['styles']);

	/** Watch for JS changes */
	gulp.watch('theme-src/js/**/*.js', ['javascript']);

	/** Watch for Image changes */
	gulp.watch('theme-src/img/**/*.{jpg,png,svg,webp}', ['images']);

	gulp.watch(
		dist + '/**/*.{jpg,png,svg,webp,css,js,php,json,twig,html}'
	).on('change', function (file) {
		$.livereload.changed(file.path);
	});
});

/** Build */
gulp.task('build', [
	'production_env',
	'clean',
	'images',
	'copy',
	'styles',
	'javascript',
]);

gulp.task('default', ['build']);

gulp.task('deploy', ['build'], function () {
  return gulp.src(dist + '/**/*')
    .pipe($.sftp({
      host: 'craveable.sftp.wpengine.com',
      port: '2222',
      auth: 'staging',
    }));
});
