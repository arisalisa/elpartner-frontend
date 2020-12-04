const $sliderHeader = $('.js-slider-header');
if ($sliderHeader.length > 0) {
	resizeComponent.addMediaQuery({
		min: 480,
		max: 10000,
		onEnter: () => {
			((_root) => {
				const self = {
					root: _root,
					carousel: _root.find('.js-slider'),
					animation: 'flipInX',
				};

				if (self.carousel.find('.item').length > 1) {
					self.carousel.addClass('owl-carousel');

					self.carousel.owlCarousel({
						nav: true,
						dots: true,
						loop: true,
						autoplay: true,
						autoplayTimeout: 5000,
						autoplayHoverPause: true,
						items: 1,
						onInitialized: (event) => {
							self.root.addClass('is-initialized');
						},
					});
				}
			})($sliderHeader);
		},
	});
}

//products carousel
const $sliderProducts = $('.js-products-carousel');
if ($sliderProducts.length > 0) {
	((_root) => {
		const self = {
			root: _root,
			carousel: _root.find('.js-slider'),
		};

		self.carousel.addClass('owl-carousel');

		self.carousel.owlCarousel({
			nav: true,
			dots: true,
			loop: false,
			items: 3,
			margin: 20,
			autoHeight: true,
			responsive: {
				0: {
					items: 1,
				},
				550: {
					items: 2,
				},
				820: {
					items: 3,
				},
				1024: {
					items: 4,
				}
			},
			onInitialized: (event) => {
				self.root.addClass('is-initialized');
			},
		});

	})($sliderProducts);
}

const $sliderPartners = $('.js-partners-carousel');
if ($sliderPartners.length > 0) {
	((_root) => {
		const self = {
			root: _root,
			carousel: _root.find('.js-slider'),
		};

		self.carousel.addClass('owl-carousel');

		self.carousel.owlCarousel({
			nav: false,
			dots: true,
			loop: false,
			items: 3,
			margin: 30,
			autoHeight: true,
			responsive: {
				0: {
					items: 1,
				},
				550: {
					items: 2,
				},
				820: {
					items: 2,
				},
				1024: {
					items: 8,
					margin: 80
				}
			},
			onInitialized: (event) => {
				self.root.addClass('is-initialized');
			},
		});

	})($sliderPartners);
}

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