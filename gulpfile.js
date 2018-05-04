var config = {
    root: './',
    nameServer: 'local.babyday.vn'
};

var gulp = require('gulp');
var plugins  = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*']
});
var requirejsOptimize = require('gulp-requirejs-optimize');
var mainBowerFiles = require('main-bower-files');
var exists = require('path-exists').sync;
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var bowerWithMin = mainBowerFiles({
    overrides: {
        "bootstrap":{
            "main": [
                "./dist/css/bootstrap.min.css",
                "./dist/assets/owl.theme.default.css"
            ]
        },

        "owl.carousel": {
            "main": [
                "./dist/assets/owl.carousel.css",
                "./dist/assets/owl.theme.default.css"
            ]
        },
        "bootstrap-datepicker": {
            "main": [
                "./dist/css/bootstrap-datepicker.css",                
            ]
        },
        "jQuery.mmenu": {
            "main": [
                "./dist/jQuery.mmenu.css",                
            ]
        }
    }
}).map( function(path, index, arr) {
    var newPath = path.replace(/.([^.]+)$/g, '.min.$1');
    return exists( newPath ) ? newPath : path;
});

var listJs = [
        './bower_components/jquery/dist/jquery.min.js',
        //Framework
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        // Plugins
        './bower_components/owl.carousel/dist/owl.carousel.min.js',
       
        './bower_components/jQuery.mmenu/dist/jquery.mmenu.all.js',
        './bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',        
];

gulp.task('css-vendor', function() {
    gulp.src(bowerWithMin)
        .pipe(plugins.filter(['**/*.css'], {restore: false}))        
        .pipe(plugins.concat('vendor.min.css'))
        .pipe(gulp.dest(config.root + 'css'))
        .pipe(plugins.cssmin({showLog: true, keepBreaks: true}))
        .pipe(plugins.rename({basename : 'vendor', suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.root + 'css'));
});

gulp.task('sass',function () {
    return gulp.src(config.root+'css/importer.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
        .pipe(plugins.cssmin())
        .pipe(plugins.rename({basename : 'main', suffix: '.min'}))
        .pipe(plugins.sourcemaps.write('../css'))
        .pipe(gulp.dest(config.root+'css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('lint', function() {
    return gulp.src([
        config.root + 'js/**/*.js',
        config.root + 'js/*.js',
        '!' + config.root + 'js/plugins/*.js',
        '!' + config.root + 'js/script.js'
    ])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('requirejs',  function () {
    return gulp.src(config.root + 'js/config.js')
        .pipe(plugins.sourcemaps.init())
        .pipe(requirejsOptimize({
            baseUrl: config.root,
            out: 'script.js',
            name: 'js/config',
            include:  ['bower_components/requirejs/require.js'],
            exclude: [],
            mainConfigFile: config.root + "js/config.js",
            preserveLicenseComments: false,
            generateSourceMaps: true,
            optimize: 'uglify2',
            useStrict: true,
            inlineText: false
        }))
        .pipe(plugins.sourcemaps.write('../js'))
        .pipe(gulp.dest(config.root + 'js'));
});

gulp.task('watch', function() {
    gulp.watch([
        config.root + 'css/**/*.scss',
        config.root + 'css/**/*.css',
        config.root + 'css/*.scss'
    ], ['sass']);
});

gulp.task('default', ['sass', 'css-vendor','lint'], function() {
    gulp.watch([
        config.root + 'css/**/*.scss',
        config.root + 'css/**/*.css',
        config.root + 'css/*.scss'
    ], ['sass']);

    gulp.watch([
        config.root + 'js/**/*.js',
        config.root + 'js/*.js',
        '!' + config.root + 'js/plugins/*.js',
        '!' + config.root + 'js/script.js'
    ], ['lint']);

});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        // proxy: config.nameServer,
        open: false,
        files: [
            // config.root + 'css/**/*.scss',
            config.root + 'css/main.min.css',
            // config.root + 'js/templates/*.html',
            config.root + 'js/**/*.js',
            config.root + 'js/*.js',
            '**/*.html',
            '!' + config.root + 'js/plugins/*.js',
            '!' + config.root + 'js/script.js'
        ]
    });
    gulp.watch([
        config.root + 'css/**/*.scss',
        config.root + 'css/**/*.css',
        config.root + 'css/*.scss'
    ], ['sass']);
});

// gulp.task('minify', function () {
//     gulp.src(listJs)
//         .pipe(plugins.concat('vendor.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest(config.root + 'js'))
// })