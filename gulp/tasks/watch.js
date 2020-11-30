module.exports = (gulp, scripts, styles) => {
    return () => {
        scripts.map((scripts) => {
            gulp.watch(scripts.watch, ['scripts']);
        });
        styles.map((styles) => {
            gulp.watch(styles.watch, ['styles']);
        });
    };
};
