const scrollComponent = (() => {

	let self = {
		elsTransform: document.querySelectorAll('.l-wrapper, .l-footer'),
		current: 0,
		previous: 0,
		backup: 0,
		direction: null
	};

	let checkScrollValue = () => {
		self.previous = self.current;
		self.current = document.documentElement.scrollTop || window.pageYOffset || window.scrollY;
		self.direction = ( self.current >= self.previous ) ? 'down' : 'up';
	};

	let scrollJumpTo = (position) => {
		window.scrollTo( 0, position );
	};

	let saveCurrentScrollValue = () => {
		self.backup = document.documentElement.scrollTop || window.pageYOffset || window.scrollY;
	};

	let scrollMoveTo = (position, speed) => {
		$("body:not(:animated)").animate({ scrollTop: position }, speed );
		$("html").animate({ scrollTop: position }, speed );
	};

	let enableScroll  = () => {
		self.elsTransform.forEach(function(item){
			item.style.transform = 'none';
		});
		document.body.style.overflowY = '';
		document.body.style.position = '';
		scrollJumpTo(self.backup);
	};

	let disableScroll = () => {
		saveCurrentScrollValue();
		self.elsTransform.forEach(function(item){
			item.style.transform = 'translateY(' + -self.backup + 'px)';
		});
		document.body.style.overflowY = 'hidden';
		document.body.style.position = 'fixed';
	};

	let getCurrentScrollValue = () => { return self.current }

	let getCurrentScrollDirection = () => { return self.direction }

	checkScrollValue();
	window.addEventListener('scroll', checkScrollValue );

	return Object.freeze({
		current: getCurrentScrollValue,
		direction: getCurrentScrollDirection,
		enable: enableScroll,
		disable: disableScroll,
		moveTo: scrollMoveTo,
	});

})();
