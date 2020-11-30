const hash = require('gulp-hash');

module.exports = (gulp, dir, images, scripts, styles) => {
    return () => {
        let getTarget = (assets) => {
            return [dir.prod, assets.target].join('/');
        };

        let src = scripts.map(getTarget).concat(styles.map(getTarget)).concat(images.map((images) => {
            return [images.target, images.mask].join('/');
        }));

        return gulp.src(src, {base: 'public'})
            .pipe(hash({
                template: '<%= name %><%= ext %>?<%= hash %>'
            }))
            .pipe(hash.manifest('manifest.json'))
            .pipe(gulp.dest(dir.prod));
    };
};
