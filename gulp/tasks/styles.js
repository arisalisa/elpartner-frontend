const autoprefixer    = require('autoprefixer'),
      browserSync     = require('browser-sync'),
      concat          = require('gulp-concat'),
      filesExist      = require('files-exist'),
      merge           = require('gulp-merge'),
      rewriteCSS      = require('gulp-rewrite-css'),
      sass            = require('gulp-sass'),
      sourcemaps      = require('gulp-sourcemaps'),
      postcss         = require('gulp-postcss'),
      focus           = require('postcss-focus'),
      cssMqpacker     = require('css-mqpacker'),
      cssMqpackerSort = require('sort-css-media-queries');
const reload          = browserSync.reload;

module.exports = (gulp, dir, styles) => {

    let processors = [
        autoprefixer({
            browsers: ['last 2 versions', '>3%', 'ie 10'],
            cascade:  false
        }),
        focus,
        cssMqpacker({
            sort: cssMqpackerSort.desktopFirst
        })
    ];

    return () => {
        let stream = merge();

        styles.forEach((styles) => {
            stream.add(gulp.src(filesExist(styles.src))
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(postcss(processors))
                .pipe(rewriteCSS({
                    destination: dir.dev
                }))
                .pipe(concat(styles.target))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(dir.dev)))
                .pipe(reload({
                    stream: true
                }));
        });

        return stream;
    };
};
