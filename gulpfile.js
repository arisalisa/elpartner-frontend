const gulp         = require('gulp'),
	gulpSequence = require('gulp-sequence');

const dir = {
	dev:  'public/assets/dev',
	prod: 'public/assets/prod'
};

const scripts = [
		{
			target: 'app.js',
			vendor: [
				'public/assets/node_modules/jquery/dist/jquery.js',
				'public/assets/node_modules/imagesloaded/imagesloaded.pkgd.js',
				'public/assets/node_modules/owl.carousel/dist/owl.carousel.js',
				'assets/vendor/jquery.inputmask.bundle.js'
			],
			src:    [
				'assets/scripts/app.js',
				'assets/scripts/decorators.util.js',
				'assets/scripts/dom-events.js',
				'assets/scripts/common.js',
				'assets/scripts/scroll.js',
				'assets/scripts/scroll-top.js',
				'assets/scripts/resize.js',
				'assets/scripts/menu-mobile.js',
				'assets/scripts/carousel.js',
				'assets/scripts/products.js',
				'assets/scripts/main.js',
			],
			watch: [
				'assets/scripts/**/*.js',
			]
		}
	],
	styles = [
		{
			target: 'app.css',
			src:    [
				'assets/styles/fonts.scss',

				'public/assets/node_modules/normalize.css/normalize.css',
				'public/assets/node_modules/owl.carousel/dist/assets/owl.carousel.css',
				'public/assets/node_modules/owl.carousel/dist/assets/owl.theme.default.css',

				'assets/styles/app.scss'
			],
			watch: [
				'assets/styles/**/*.{css,scss}'
			]
		}
	],
	fonts = [
		{
			target: 'public/assets/fonts',
			src:    [
				'assets/fonts/**/*.*'
			]
		}
	],
	html = [
		{
			target: 'public',
			src:    'html/[^_]*.{html,twig}',
			watch: [
				'html/**/*.{html,twig}'
			]
		}
	],
	images = [
		{
			mask:   '**/*.*',
			target: 'public/assets/images',
			src:    [
				'assets/images/**/*.*'
			]
		}
	];

gulp
	.task('browser-sync', require('./gulp/tasks/browser-sync')())
	.task('clear', require('./gulp/tasks/clear')())
	.task('fonts', require('./gulp/tasks/fonts')(gulp, fonts))
	.task('images', require('./gulp/tasks/images')(gulp, images))
	.task('vendor', require('./gulp/tasks/vendor')(gulp))
	// Dev
	.task('scripts', require('./gulp/tasks/scripts')(gulp, dir, scripts))
	.task('styles', require('./gulp/tasks/styles')(gulp, dir, styles))
	.task('build', gulpSequence('vendor', ['fonts', 'scripts', 'styles']))
	.task('watch', ['build'], require('./gulp/tasks/watch')(gulp, scripts, styles))
	.task('scripts-prod', ['scripts'], require('./gulp/tasks/scripts-prod')(gulp, dir, scripts))
	.task('styles-prod', ['styles'], require('./gulp/tasks/styles-prod')(gulp, dir, styles))
	.task('manifest', require('./gulp/tasks/manifest')(gulp, dir, images, scripts, styles))
	.task('build-prod', gulpSequence('vendor', ['fonts', 'scripts-prod', 'styles-prod'], 'manifest'))
	.task('html', require('./gulp/tasks/html')(gulp, html))
	.task('build-html', ['build', 'html', 'images'])
	.task('watch-html', ['build-html'], require('./gulp/tasks/watch-html')(gulp, html, scripts, styles, images))
	.task('serve-html', ['build-html', 'browser-sync', 'watch-html']);
