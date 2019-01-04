var gulp = require('gulp')

var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    sourcemaps = require("gulp-sourcemaps"),
    jshint = require('gulp-jshint'),
    sync     = require('browser-sync')

gulp.task('scss', function () {
    return gulp.src([
        'htdocs/vendor/components-font-awesome/css/fontawesome-all.min.css',
        'src/**/*.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded',
        indentType: 'space',
        indentWidth: 4
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 5 versions']
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('htdocs/css'))
    .pipe(rename({extname: '.min.css'}))
    .pipe(cssnano({ zindex: false }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('htdocs/css'))
});

gulp.task("pug", function () {
    return gulp.src(["src/pug/**/*.pug", "!src/pug/**/_*.pug"])
        .pipe(pug({
            basedir: "src/pug/",
            pretty: true
        }))
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest("htdocs"));
});

gulp.task('js', function () {
   return gulp.src([
       'htdocs/vendor/jQuery/dist/jquery.js',
       'src/**/*.js'
   ])
       .pipe(sourcemaps.init())
       .pipe(concat('main.js'))
       .pipe(jshint())
       .pipe(jshint.reporter('jshint-stylish'))
       .pipe(gulp.dest('htdocs/js'))
       .pipe(rename({extname: '.min.js'}))
       .pipe(uglify())
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('htdocs/js'))
});

gulp.task("browser-sync", function () {
    sync({
        server: {
            baseDir: "./htdocs/",
        },
        notify: false,
    });
});

gulp.task('reload', function () {
    sync.reload();
});

gulp.task("watch", function () {
    gulp.watch("src/**/*.scss", ["scss"]);
    gulp.watch("src/**/*.pug", ["pug"]);
    gulp.watch("src/**/*.js", ["js"]);
    gulp.watch("htdocs/*.html", ["reload"]);
    gulp.watch("htdocs/css/*.css", ["reload"]);
    gulp.watch("htdocs/js/*.js", ["reload"]);
});

gulp.task("default", ["scss","pug","js","watch", "browser-sync"]);