const cache = require('gulp-cache');

module.exports = () => {
    return (done) => {
        return cache.clearAll(done);
    };
};
