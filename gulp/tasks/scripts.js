const babel      = require('gulp-babel'),
      browserSync = require('browser-sync'),
      concat      = require('gulp-concat'),
      filesExist  = require('files-exist'),
      include     = require('gulp-include'),
      merge       = require('gulp-merge'),
      sourcemaps  = require('gulp-sourcemaps');
const reload      = browserSync.reload;

module.exports = (gulp, dir, scripts) => {
    return () => {
        let stream = merge();

        scripts.forEach((scripts) => {
            stream.add(gulp.src(filesExist(scripts.vendor)));
            stream.add(gulp.src(filesExist(scripts.src))
                .pipe(babel({
                    presets: ['es2015'],
                    plugins: ['transform-es2015-template-literals']
                }))
            );
            stream
                .pipe(sourcemaps.init())
                .pipe(include())
                .pipe(concat(scripts.target))
                .pipe(sourcemaps.write())
                .on('error', console.log)
                .pipe(gulp.dest(dir.dev))
                .pipe(reload({
                    stream: true
                }));
            //     
        });

        return stream;
    };
};
