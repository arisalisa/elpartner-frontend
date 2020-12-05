scrollTopModule.init('.js-scroll-top', {  offsetTop: 105 });

$(document).ready(function(){
	if (typeof $.fn.inputmask !== 'undefined') {
		$('html').find('input.js-phone-mask').inputmask({"mask": "+7 (999) 999-99-99", showMaskOnHover :  false});
	}
});

// custom number
(function( $ ){
	let defaults = {
		minValue: 1,
		maxValue: 1000,
		speedChange: 200,
		stepValue: 1,
		modifiers: '',
		defaultValue: 1,
		onChange: function(){ },
		onFinalChange: function(){ }
	};

	let methods = {
		init : function( options ) {
			options = $.extend({}, defaults, options);

			this.each(function() {
				let timer;
				let $this = $(this);
				options.modifiers = $this.data('mod');

				$this.wrap("<div class='custom-number " + options.modifiers + "'></div>");
				$this.before("<span class='custom-number__btn -minus'></span>");
				$this.after("<span class='custom-number__btn -plus'></span>");

				let container = $this.parent('.custom-number');
				let input = $(container).find('input');
				let minus = $(container).find('.-minus');
				let plus = $(container).find('.-plus');

				function checkMinMaxVal(val){
					if(val == options.minValue){
						minus.addClass('is-disabled');
					} else if(val == options.maxValue){
						plus.addClass('is-disabled');
					} else {
						plus.removeClass('is-disabled');
						minus.removeClass('is-disabled');
					}
				}

				checkMinMaxVal(input.val());

				$(minus).on('mousedown', function () {
					let data = input.val()*1;
					if(data > options.minValue){
						input.val(data - options.stepValue).change();
						data = data - options.stepValue;
						options.onChange();
					}
					checkMinMaxVal(data);
					timer = setInterval(function(){
						if(data > options.minValue){
							input.val(data - options.stepValue).change();
							data = data - options.stepValue;
							options.onChange();
						}
						checkMinMaxVal(data);
					}, options.speedChange);
				});

				$(plus).on('mousedown', function () {
					let data = input.val()*1;
					if(data < options.maxValue){
						input.val(data + options.stepValue).change();
						data = data + options.stepValue;
						options.onChange();
					}
					checkMinMaxVal(data);
					timer = setInterval(function(){
						if(data < options.maxValue){
							input.val(data + options.stepValue).change();
							data = data + options.stepValue;
							options.onChange();
						}
						checkMinMaxVal(data);
					}, options.speedChange);
				});

				$(container).find('span').on('mouseup mouseleave', function () {
					clearInterval(timer);
					options.onFinalChange();
				});

			});
		}

	};

	$.fn.customNumber = function(method) {

		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод ' +  method + ' не существует в jQuery.customNumber' );
		}

	};

})( jQuery );

(initCustomNumber = (context) => {
	var $context = $(context || 'body');
	$context.find('.js-custom-number').customNumber();
})();
// App.onAjaxStream.push(initCustomNumber);