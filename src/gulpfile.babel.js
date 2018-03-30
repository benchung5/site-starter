'use strict';

const plugins = require('gulp-load-plugins');
const yargs = require('yargs');
const gulp = require('gulp');
const rimraf = require('rimraf');
const yaml = require('js-yaml');
const fs = require('fs');

const webpack = require('webpack');
const gutil = require('gulp-util');
const absPath = require('path');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
var swPrecache = require('sw-precache');

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

//outputs 'production' or 'development';
const ENV = PRODUCTION ? 'production' : 'development';

//for running shell scripts
const exec = require('child_process').exec;

// Load all Gulp plugins into one variable
const $ = plugins();

// Load settings from settings.yml
const { PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  const ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

//for sw precache
const staticFileGlobs = [
   PATHS.dist + "/**.html",
   PATHS.dist + PATHS.distAssets + "/css/**.css",
   PATHS.dist + PATHS.distAssets + "/js/**.js",
   PATHS.dist + PATHS.distAssets + "/img/icons/**.{svg,png,jpg,gif}",
   PATHS.dist + PATHS.distAssets + "/img/placeholder-images/**.{svg,png,jpg,gif}",
]


//build
//--------------------------------------

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel([sass, javascript, vendorJavascript, headJavascript, images, media, favicons]), generateServiceWorker));

// Build the site, run the server, then watch for file changes, and run webpack(with dev server)
gulp.task('default',
  gulp.series('build', gulp.parallel([watch])));

// Build the site, and watch for file (and ee file) changes then rsync
gulp.task('rsync',
  gulp.series('build', watchProduction));

function generateServiceWorker(done) {
  swPrecache.write(PATHS.dist + PATHS.distAssets + '/js/service-worker.js', {
    staticFileGlobs: staticFileGlobs,
    stripPrefix: PATHS.dist,
    verbose: true,
    // skipWaiting: false,
    //unresolved urls fallback to index page
    navigateFallback: '/index.html',
    //with runtime caching the sw-toolbox library configured with the caching strategies 
    //you specify will automatically be included in your generated service worker file
    runtimeCaching: [
    {
      urlPattern: /\/assets\//,
      handler: 'fastest',
      // options: {
      //   debug: true
      // }
    },
    {
      urlPattern: /\/api\//,
      handler: 'fastest',
    },
    {
      urlPattern: /googleapis/,
      handler: 'fastest',
    },
    {
      urlPattern: /gstatic/,
      handler: 'fastest',
    },
    {
      urlPattern: /typekit/,
      handler: 'fastest',
    },
    // {
    //   urlPattern: /(.*)/,
    //   handler: 'fastest',
    // },
    ]
  }, function() {
    gutil.log('service worker generated');
    done();
  });
}

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets/media folder
function media() {
  return gulp.src(PATHS.media)
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/media'));
}

// Copy files out of the assets/favicons folder
// * app manifest and browserconfig file is also included in there
function favicons() {
  return gulp.src(PATHS.favicons)
    .pipe(gulp.dest(PATHS.dist + '/favicons'));
}

// Combine vendor js into one file
function vendorJavascript() {
  return gulp.src(PATHS.vendor)
    .pipe($.concat('vendor.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'))
}

// Combine head js into one file
function headJavascript() {
  return gulp.src(PATHS.head)
    .pipe($.concat('head.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'))
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer())
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/css'))
}

//for compiling js
let simpleWebpackConfig = {
  externals: {
      // enable jQuery as an external script to use in imports
      jquery: "jQuery"
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify(ENV),
       }
    })
  ],
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.javascript)
    //this makes sure the output js file isn't hashed
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(simpleWebpackConfig, webpack))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/img'));
}

function rsyncAssets(done) {
  // gutil.log("rsync assets...");
  // let cmd1 = '/usr/bin/rsync -arv --exclude "*.html"  -e "ssh -i $HOME/.ssh/id_rsa_myproj -p 1234" ' + 
  // PATHS.dist + '/' + ' user@111.111.111.111:' + PATHS.distServer
  // exec(cmd1, function(error, stdout, stderr) { 
  //   console.log(stdout);
  //   console.log(stderr);
  //   done();
  // });
}

function rsyncTemplates(done) {
  // let cmd2 = '/usr/bin/rsync -arv  -e "ssh -i $HOME/.ssh/id_rsa_myproj -p 1234" ' + 
  // PATHS.eeTemplates + '/' + ' user@111.111.111.111:' + PATHS.eeTemplatesServer;
  // exec(cmd2, function(error, stdout, stderr) { 
  //   console.log(stdout);
  //   console.log(stderr);
  //   done();
  // });
}

//watch for html page changes
function watch() {
  gulp.watch(PATHS.media, media);
  gulp.watch(PATHS.favicons, favicons);
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass));
  gulp.watch('src/assets/js/app/**/*.js').on('all', gulp.series(javascript));
  gulp.watch('src/assets/js/vendor/**/*.js').on('all', gulp.series(vendorJavascript));
  gulp.watch('src/assets/js/head/**/*.js').on('all', gulp.series(headJavascript));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images));
}

// Watch for changes to static assets, and ee templates then rsync
function watchProduction() {
  //watch assets
  gulp.watch(PATHS.media, media);
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass, rsyncAssets));
  gulp.watch('src/assets/js/app/**/*.js').on('all', gulp.series(javascript, rsyncAssets));
  gulp.watch('src/assets/js/vendor/**/*.js').on('all', gulp.series(vendorJavascript, rsyncAssets));
  gulp.watch('src/assets/js/head/**/*.js').on('all', gulp.series(headJavascript, rsyncAssets));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, rsyncAssets));
}
