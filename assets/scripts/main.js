scrollTopModule.init('.js-scroll-top', {  offsetTop: 105 });

$(document).ready(function(){
	if (typeof $.fn.inputmask !== 'undefined') {
		$('html').find('input.js-phone-mask').inputmask({"mask": "+7 (999) 999-99-99", showMaskOnHover :  false});
	}
});
