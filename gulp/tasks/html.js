const browserSync = require('browser-sync'),
      include     = require('gulp-include'),
      merge       = require('gulp-merge'),
      twig        = require('gulp-twig');
const reload      = browserSync.reload;

module.exports = (gulp, html) => {
    return () => {
        let stream = merge();

        html.forEach((html) => {
            stream.add(gulp.src(html.src)
                .pipe(twig())
                .pipe(include())
                .pipe(gulp.dest(html.target))
                .pipe(reload({
                    stream: true
                }))
            );
        });

        return stream;
    };
};
