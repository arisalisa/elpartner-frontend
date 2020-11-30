const animationEvent = (function whichAnimationEvent(){
	let t,
		el = document.createElement("fakeelement");

	let animations = {
		"animation"      : "animationend",
		"OAnimation"     : "oAnimationEnd",
		"MozAnimation"   : "animationend",
		"WebkitAnimation": "webkitAnimationEnd"
	};

	for (t in animations){
		if (el.style[t] !== undefined){
			return animations[t];
		}
	}
})();

const transitionEvent = (function whichAnimationEvent() {
	let t;
	const el = document.createElement('fakeelement');

	const transitions = {
		transition: 'transitionend',
		OTransition: 'oTransitionEnd',
		MozTransition: 'transitionend',
		WebkitTransition: 'webkitTransitionEnd',
	};

	Object.keys(transitions).forEach((key) => {
		if (el.style[key] !== undefined) {
			return transitions[key];
		}
	});
}());
