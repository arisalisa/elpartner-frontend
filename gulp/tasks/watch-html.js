module.exports = (gulp, html, scripts, styles, images) => {
    return () => {
        html.map((html) => {
            gulp.watch(html.watch, ['html']);
        });
        scripts.map((scripts) => {
            gulp.watch(scripts.watch, ['scripts']);
        });
        styles.map((styles) => {
            gulp.watch(styles.watch, ['styles']);
        });
        images.map((images) => {
            gulp.watch(images.src, ['images']);
        });
    };
};
