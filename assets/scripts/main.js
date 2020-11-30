$(document).ready(() => {
	new WOW().init();
});

$('.js-menu-mobile').menuMobile({
	text: {
		rootTitle: 'Меню'
	}
});

scrollTopModule.init('.js-scroll-top', {  offsetTop: 105 });

(()=>{
	let header = document.querySelector('.js-header-fixed');
	window.onscroll = ()=>{
		if( window.scrollY > 2 ){
			header.classList.add('is-fixed');
		} else {
			header.classList.remove('is-fixed');
		}
	};
	window.onload = ()=>{
		if( window.scrollY > 2 ){
			header.classList.add('is-fixed');
		} else {
			header.classList.remove('is-fixed');
		}
	};
	resizeComponent.addMediaQuery({
		min: 0,
		max: 980,

		onEnter: function(){
			window.onscroll = ()=>{
				header.classList.remove('is-fixed');
			};
			window.onload = ()=>{
				header.classList.remove('is-fixed');
			}
		},
		onExit: function(){
			window.onscroll = ()=>{
				if( window.scrollY > 85 ){
					header.classList.add('is-fixed');
				} else {
					header.classList.remove('is-fixed');
				}
			};
			window.onload = ()=>{
				if( window.scrollY > 85 ){
					header.classList.add('is-fixed');
				} else {
					header.classList.remove('is-fixed');
				}
			}
		}
	});

})();


$(function(){
	$('.main-menu__root > li > a:not(.no-anchor)').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			&& location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				var targetOffset = $target.offset().top - 70;
				$('html,body').animate({scrollTop: targetOffset}, 500);
				return false;
			}
		}
	});
});


const anchorsBtn = document.querySelectorAll('.banner__btn.with-anchor');

for (let anchor of anchorsBtn) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const blockID = anchor.getAttribute('href').substr(1);

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
}

(function () {
	if ($('body').hasClass('home-page')) {
		$('body').on('click','.menu-mobile__item-name[href^="/#"]',function(e){
			e.preventDefault();
			setTimeout(() => {
				let anchor = $(this).attr('href').replace('/#','');
				console.log(anchor);
				let scroll = $('#'+anchor).offset().top - 60;
				$('html, body').animate({ scrollTop: scroll }, 500);
				$('.menu-mobile__close-btn').click();
			}, 300);
			return false
		});
	}
})();


(function () {
		resizeComponent.addMediaQuery({
			min: 0,
			max: 980,
			onEnter: function(){
				const $reviews = $('.reviews-carousel__item');
				$reviews.each(function () {
					const $reviewsImg = $(this).find('.reviews-carousel__item-img'),
						$reviewsTitle = $(this).find('.reviews-carousel__item-header');
					$reviewsImg.prependTo($reviewsTitle);
				})
			},
			onExit: function(){
				const $reviews = $('.reviews-carousel__item');
				$reviews.each(function () {
					const $reviewsImg = $(this).find('.reviews-carousel__item-img'),
						$reviewsTitle = $(this).find('.reviews-carousel__item-header');
					$reviewsImg.prependTo($(this));
				})
			}
		});

})();

$(document).ready(function(){
	if (typeof $.fn.inputmask !== 'undefined') {
		$('html').find('input.js-phone-mask').inputmask({"mask": "+7 (999) 999-99-99", showMaskOnHover :  false});
	}
});

$(document).ready(function(){
	(function () {
		const $form =  $(".form__item-field");
		$form.each(function () {
			let $input = $(this).find('input'),
				$error = $(this).find('.form__item-error > ul > li');

			if ($error.length > 0 && $error.val() !== "" && $error.val() !== null)  {
				$input.addClass('error');
			}
		});
	})();
});

$(document).ready(function() {
	const $passwordBtn = $('.js-password-toggle');
	$passwordBtn.each(function () {
		$(this).click(function(){
			let $input = $(this).siblings('input');
			let type = $input.attr('type') == "text" ? "password" : 'text';
			$(this).toggleClass('active');
			$input.prop('type', type);
		});
	});
});


$(document).ready(function() {
	const $form = $('form .form-create-school');
	$form.each(function () {
		let $checkbox = $(this).find('input[type="checkbox"]'),
			$submit = $(this).find('button[type="submit"]');
		$checkbox.on('change', function(){
			if ($checkbox.prop('checked')) {
				$submit.attr('disabled', false);
			} else {
				$submit.attr('disabled', true);
			}
		});

	});
});
