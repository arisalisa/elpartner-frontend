const $sliderService = $('.js-service');
((_root) => {
	const self = {
		root: _root,
		carousel: _root.find('.js-slider'),
	};
	$(window).on('resize', function(){
		if($(window).width() <= 568) {

			self.carousel.addClass('owl-carousel owl-theme');

			self.carousel.owlCarousel({
				nav: false,
				dots: true,
				loop: false,
				items: 1,
				margin: 30,
				responsive: {
					0: {
						items: 1
					},
					568: {
						items: 1
					},
				},
				onInitialized: (event) => {
					self.root.addClass('is-initialized');
				},
			});
		}
		else {
			self.carousel.removeClass('owl-carousel owl-theme');
			self.carousel.trigger('destroy.owl.carousel');
		}
	}).trigger('resize');
})($sliderService);


const $sliderBlocks = $('.js-blocks');
if ($sliderBlocks.length > 0) {
	((_root) => {
		const self = {
			root: _root,
			carousel: _root.find('.js-slider'),
		};

		self.carousel.addClass('owl-carousel owl-theme');

		self.carousel.owlCarousel({
			nav: false,
			dots: true,
			loop: false,
			items: 3,
			margin: 30,
			mouseDrag: true,
			autoHeight: true,
			responsive: {
				0: {
					items: 1,
					mouseDrag: true,
				},
				550: {
					items: 2,
					mouseDrag: true,
				},
				820: {
					items: 2,
					mouseDrag: true,
				},
				1024: {
					items: 3,
					mouseDrag: false,
				}
			},
			onInitialized: (event) => {
				self.root.addClass('is-initialized');
			},
		});

	})($sliderBlocks);
}

const $sliderFunctions = $('.js-functions');
((_root) => {
	const self = {
		root: _root,
		carousel: _root.find('.js-slider'),
	};
	$(window).on('resize', function(){
		if($(window).width() <= 820) {

			self.carousel.addClass('owl-carousel owl-theme');
			self.carousel.owlCarousel({
				nav: false,
				dots: true,
				loop: false,
				items: 2,
				margin: 30,
				autoHeight: true,
				responsive: {
					0: {
						items: 1
					},
					568: {
						items: 2
					},
					820: {
						items: 2
					}
				},
				onInitialized: (event) => {
					self.root.addClass('is-initialized');
				},
			});
		}
		else {
			self.carousel.removeClass('owl-carousel owl-theme');
			self.carousel.trigger('destroy.owl.carousel');
		}
	}).trigger('resize');
})($sliderFunctions);

const $sliderReviews = $('.js-reviews');
if ($sliderReviews.length > 0) {
	((_root) => {
		const self = {
			root: _root,
			carousel: _root.find('.js-slider'),
		};

		self.carousel.addClass('owl-carousel owl-theme');

		self.carousel.owlCarousel({
			nav: false,
			dots: true,
			loop: false,
			items: 2,
			margin: 30,
			autoHeight: true,
			responsive: {
				0: {
					items: 1
				},
				568: {
					items: 2
				},
				1024: {
					items: 2
				}
			},
			onInitialized: (event) => {
				self.root.addClass('is-initialized');
			},
		});

	})($sliderReviews);
}

const $sliderTariffs = $('.js-tariffs');
((_root) => {
	const self = {
		root: _root,
		carousel: _root.find('.js-slider'),
	};
	$(window).on('resize', function(){
		if($(window).width() <= 980) {

			self.carousel.addClass('owl-carousel owl-theme');
			self.carousel.owlCarousel({
				nav: true,
				dots: true,
				loop: false,
				items: 1,
				margin: 30,
				autoHeight: true,
				responsive: {
					0: {
						items: 1
					}
				},
				onInitialized: (event) => {
					self.root.addClass('is-initialized');
				},
			});
		}
		else {
			self.carousel.removeClass('owl-carousel owl-theme');
			self.carousel.trigger('destroy.owl.carousel');
		}
	}).trigger('resize');
})($sliderTariffs);