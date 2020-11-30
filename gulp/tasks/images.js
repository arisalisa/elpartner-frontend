const browserSync = require('browser-sync'),
      cache       = require('gulp-cache'),
      giflossy    = require('imagemin-giflossy'),
      imageMin    = require('gulp-imagemin'),
      merge       = require('gulp-merge'),
      mozjpeg     = require('imagemin-mozjpeg'),
      pngQuant    = require('imagemin-pngquant'),
      zopfli      = require('imagemin-zopfli');
const reload      = browserSync.reload;

module.exports = (gulp, images) => {
    return () => {
        let stream = merge();

        images.forEach((images) => {
            stream.add(gulp.src(images.src)
                .pipe(cache(imageMin([
                    pngQuant({
                        speed:   1,
                        quality: 90
                    }),
                    zopfli({
                        more: true
                    }),
                    // giflossy({
                    //     optimizationLevel: 3,
                    //     optimize:          3,
                    //     lossy:             2
                    // }),
                    imageMin.svgo({
                        plugins: [{
                            removeViewBox: false,
                            cleanupIDs: false,
                            removeUnknownsAndDefaults: false
                        }]
                    }),
                    imageMin.jpegtran({
                        progressive: true
                    }),
                    mozjpeg({
                        quality: 90
                    })
                ], {
                    verbose: true
                })))
                .pipe(gulp.dest(images.target))
                .pipe(reload({
                    stream: true
                })));
        });

        return stream;
    };
};
