function debounce(func, ms) {

	var timer = null;

	return function () {
		var _this = this;

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var onComplete = function onComplete() {
			func.apply(_this, args);
			timer = null;
		};

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(onComplete, ms);
	};
}

function throttle(func, ms) {

	var isThrottled = false,
		savedArgs,
		savedThis;

	function wrapper() {

		if (isThrottled) {
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments);

		isThrottled = true;

		setTimeout(function() {
			isThrottled = false;
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}
