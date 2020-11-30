const browserSync = require('browser-sync');

module.exports = () => {
    return () => {
        browserSync.init({
            server: {
                baseDir: ['./public']
            }
        });
    };
};
