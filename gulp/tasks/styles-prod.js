const autoprefixer    = require('autoprefixer'),
      concat          = require('gulp-concat'),
      csso            = require('postcss-csso'),
      filesExist      = require('files-exist'),
      merge           = require('gulp-merge'),
      rewriteCSS      = require('gulp-rewrite-css'),
      sass            = require('gulp-sass'),
      uglifyCSS       = require('gulp-uglifycss'),
      postcss         = require('gulp-postcss'),
      focus           = require('postcss-focus'),
      cssMqpacker     = require('css-mqpacker'),
      cssMqpackerSort = require('sort-css-media-queries');

module.exports = (gulp, dir, styles) => {

    let processors = [
        autoprefixer({
            browsers: ['last 2 versions', '>3%', 'ie 10'],
            cascade:  false
        }),
        focus,
        cssMqpacker({
            sort: cssMqpackerSort.desktopFirst
        }),
        // csso
    ];

    return () => {
        let stream = merge();

        styles.forEach((styles) => {
            stream.add(gulp.src(filesExist(styles.src))
                .pipe(sass().on('error', sass.logError))
                .pipe(postcss(processors))
                .pipe(rewriteCSS({
                    destination: dir.prod
                }))
                .pipe(uglifyCSS({
                    uglyComments: true
                }))
                .pipe(concat(styles.target))
                .pipe(gulp.dest(dir.prod)));
        });

        return stream;
    };
};
