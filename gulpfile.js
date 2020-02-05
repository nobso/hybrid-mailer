'use strict';

const config = JSON.parse(
    JSON.stringify(
        require('js-yaml').safeLoad(
            require('fs').readFileSync('./config/config.yml', 'utf8'),
        )[process.env.NODE_ENV || 'development'],
    ),
);
const { series, src, dest } = require('gulp');
const nodemon = require('gulp-nodemon');
const browsersync = require('browser-sync');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');

// automatically restarting the node application when file changes in the directory are detected.
const _nodemon = function(cb) {
    let started = false;
    return nodemon({
        script: './bin/www',
        ignore: ['node_modules/'],
        ext: 'js css html pug',
    })
        .on('start', function() {
            if (!started) {
                cb();
                started = true;
            }
        })
        .on('restart', function() {
            browsersync.reload();
        });
};

// update connected browsers if a change occurs
const _browsersync = function() {
    browsersync.init({
        proxy: `localhost:${config.port}`,
        port: 4000,
    });
};

// minify, autofix and concat all the CSS files
const _css = function() {
    return src('public/css/**/*.css')
        .pipe(cssmin())
        .pipe(autoprefixer())
        .pipe(concat('style.min.css'))
        .pipe(dest('dist/css'));
};

// uglify & concat all the JS files
const _js = function() {
    return src('public/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(dest('dist/js'));
};

// minimize the images
const _image = function() {
    return src('public/images/*')
        .pipe(imagemin())
        .pipe(dest('dist/images'));
};

exports.default = series(_css, _js, _image, _nodemon, _browsersync);
