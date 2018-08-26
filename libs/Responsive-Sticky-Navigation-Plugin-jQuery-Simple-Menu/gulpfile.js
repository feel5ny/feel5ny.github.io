const gulp = require('gulp');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const header = require('gulp-header');
const footer = require('gulp-footer');
const tap = require('gulp-tap');
const merge = require('merge-stream');
const pkg = require('./package.json');
const path = require('path');
const babel = require('gulp-babel');

let jsFiles = ['src/js/**/*.js'];

function fileHeader(title) {
    return [
        '/*!',
        title + ' - ' + pkg.version,
        'Copyright © 2018 Monastyrev Ivan',
        'Licensed under the MIT license.',
        'https://github.com/ikloster03/jquery-simple-menu/blob/master/LICENSE',
        '*/\n'
    ].join('\n');
}

gulp.task('lint', function() {
    return gulp.src(jsFiles).pipe(eslint('.eslintrc')).pipe(eslint.format())
});

gulp.task('build', function() {
    return gulp.src('src/js/jquery.simple-menu.js')
        .pipe(concat('jquery.simple-menu.js', { newLine: ';' }))
        .pipe(header(';'))
        .pipe(header(fileHeader('JQuery Simple Menu Plugin')))
        .pipe(gulp.dest('lib/'))
        .pipe(rename('jquery.simple-menu.min.js'))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('lib/'));
});

gulp.task('build-noframework', function() {
    return gulp.src('src/js/noframework.simple-menu.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('noframework.simple-menu.js', { newLine: ';' }))
        .pipe(header(';'))
        .pipe(header(fileHeader('JQuery Simple Menu Plugin')))
        .pipe(gulp.dest('lib/'))
        .pipe(rename('noframework.simple-menu.min.js'))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('lib/'));
});

gulp.task('watch', function() {
    gulp.watch(jsFiles, ['lint', 'build', 'build-noframework']);
});

gulp.task('default', ['lint', 'build', 'build-noframework', 'watch']);
gulp.task('jquery', ['lint', 'build', 'watch']);
gulp.task('noframework', ['lint', 'build-noframework', 'watch']);
