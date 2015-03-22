var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var karma = require('karma').server;

var cssSrc = 'web/static/css/*.scss';
var cssDest = 'priv/static/css';

var jsSrc = 'web/static/js/**/*.js*';
var jsDest = 'priv/static/js'


function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('build-sass', function() {
  gulp.src(cssSrc)
      .pipe(sass())
      .pipe(concat('app.css'))
      .pipe(gulp.dest(cssDest));
});

gulp.task('build-js', function() {
  gulp.src(jsSrc)
      .pipe(plumber())
      // .pipe(sourcemaps.init())
      .pipe(babel({sourceMap: false, modules:'system'}))
      // .pipe(sourcemaps.write({ includeContent: false, sourceRoot: '/js/' }))
      .pipe(rename({extname: '.js'}))
      .pipe(gulp.dest(jsDest));
});

gulp.task('build', ['build-js', 'build-sass']);

gulp.task('test', function (done) {
    console.log(__dirname)
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function(e) {
        done();
    });
});


gulp.task('watch', ['build'], function() {
  gulp.watch([jsSrc, cssSrc], ['build']).on('change', reportChange);
});


gulp.task('default', ['build']);