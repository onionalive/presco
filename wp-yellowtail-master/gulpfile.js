/* jshint node: true */
/* jshint -W098 */
/* jshint -W079 */

var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();

var rimraf      = require('rimraf');
var browserify  = require('browserify');
var vsource     = require('vinyl-source-stream');
var vbuffer     = require('vinyl-buffer');
var pngquant    = require('imagemin-pngquant');
var babelify    = require('babelify');

var envProd     = false;

var dist = 'wp-content/themes/yellowtail/';

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
    'theme-src/**/*.twig',
    'theme-src/**/*.json',
    'theme-src/**/*.webp',
    'theme-src/fonts/**/*.{woff,woff2,ttf,otf,eot,svg}',
  ], {
    base: 'theme-src',
  })
  .pipe(gulp.dest(dist));
});

/* Copy FontAwesome font */
gulp.task('font-awesome', function () {
  return gulp.src('bower_components/font-awesome/fonts/*')
    .pipe(gulp.dest(dist + 'fonts'));
});

/* Add theme info CSS */
gulp.task('theme-info', function () {
  return gulp.src('./theme-src/theme-info.txt')
    .pipe($.rename('style.css'))
    .pipe(gulp.dest(dist));
});

/** Stylesheets */
gulp.task('styles', ['sass-lint'], function () {
  var paths = [
    'bower_components/bourbon/app/assets/stylesheets/',
    'bower_components/font-awesome/scss/',
    'bower_components/neat/app/assets/stylesheets/',
    'bower_components/normalize-scss/',
    'bower_components/swiper/dist/css/swiper.min.css',
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
      browsers: ['last 2 versions', 'ie >= 8'],
      cascade: false,
    })
  );

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

/* Lint SASS files */
gulp.task('sass-lint', function () {
  return gulp.src(['!theme-src/css/mixins/**/*', 'theme-src/css/**/*.s+(a|c)ss'])
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError());
});

gulp.task('images', function () {
  return gulp.src('theme-src/img/**/*.{jpg,png,gif,svg,ico}')
    .pipe($.cache(
      $.imagemin([
        $.imagemin.jpegtran({ progressive: true }),
        $.imagemin.optipng(),
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
  return gulp.src(['theme-src/js/**/*.js', '!theme-src/js/vendor/*.js', 'gulpfile.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .on('error', function (e) {
      $.notify().write(e);
    });
});

/** eslint */
gulp.task('eslint', function () {
  return gulp.src(['theme-src/js/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

/** Compile Javascript */
gulp.task('javascript', ['jshint', 'eslint'], function () {
  var b = browserify({
    transform: [babelify],
    entries: './theme-src/js/main.js',
    debug: true,
  });

  var out =  b.bundle()
    .pipe(vsource('scripts.min.js'))
    .pipe(vbuffer())
    .on('error', function (e) {
      $.notify().write(e);
    });

  if (!envProd) {
    out.pipe($.sourcemaps.init({
        loadMaps: true,
      })).pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(dist + 'js'));
  } else {
    out.pipe($.uglify());
  }

  return out.pipe($.buffer())
    .pipe($.rev())
    .pipe(gulp.dest(dist + 'js'))
    .pipe($.rev.manifest(dist + 'js/manifest.json', {
      merge: true,
      base: '',
    }))
    .pipe(gulp.dest(''));
});

/** Concatenate JS*/
gulp.task('jsconcat', function () {
  return gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/jQuery-ajaxTransport-XDomainRequest/jquery.xdomainrequest.min.js',
      'bower_components/bigtext/dist/bigtext.js',
      'bower_components/js-cookie/src/js.cookie.js',
      'bower_components/jquery-storage-api/jquery.storageapi.min.js',
      'bower_components/Swiper/dist/js/swiper.min.js',
      'bower_components/jquery-unveil/jquery.unveil.min.js',
      'bower_components/webfontloader/webfontloader.js',
      'bower_components/jquery-form-validator/form-validator/jquery.form-validator.min.js',
      'bower_components/jquery-form-validator/form-validator/html5.js',
      'theme-src/js/vendor/*.js',
    ])
    .pipe($.concat('vendor.min.js'))
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
gulp.task('watch', ['clean', 'images', 'copy', 'styles', 'javascript', 'jsconcat'], function () {
  $.livereload.listen();

  /** Watch for PHP changes */
  gulp.watch('theme-src/**/*.{php,twig,json,html,webp}', ['copy']);

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
  'jsconcat',
]);

gulp.task('default', ['build']);

/** Deploy to WP Engine */
gulp.task('deploy', ['build'], function () {
  return gulp.src(dist + '/**/*')
    .pipe($.sftp({
      host: 'yellowtailwine.sftp.wpengine.com',
      port: '2222',
      auth: 'staging',
    }));
});
