const merge = require('gulp-merge');

module.exports = (gulp, fonts) => {
    return () => {
        let stream = merge();

        fonts.forEach((fonts) => {
            stream.add(gulp.src(fonts.src)
                .pipe(gulp.dest(fonts.target)));
        });

        return stream;
    };
};
