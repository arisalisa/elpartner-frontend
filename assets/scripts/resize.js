var resizeComponent = (function(){

	var self = {
		screenWidth: window.innerWidth,
		queries: [],
		freezeTime: 100
	};

	var defaultQuery = { min: 0, max: 10000, isEnter: false, onEnter: null,  onEach: null, onExit: null };

	var setFreezeTime = function (time) {
		if ( typeof time !== 'number' && typeof time !== 'undefined'){
			console.warn('resizeComponent: freezeTime type must be a number, now a ' +  typeof time);
		} else {
			self.freezeTime = time;
		}
	};

	var checkScreen = function () {
		self.screenWidth = window.innerWidth;
	};

	var triggerQuery = function(query){

		if( query.min <= self.screenWidth && self.screenWidth <= query.max ){

			if( typeof query.onEnter === 'function' && !query.isEnter){
				query.onEnter();
				query.isEnter = true;
			}

			if( typeof query.onEach === 'function'){
				query.onEach();
			}
		} else {
			if(query.isEnter){  query.onExit(); }
			query.isEnter = false;

		}
	};

	var validateQuery = function (query) {
		var validQuery = query;
		if ( typeof validQuery.min !== 'number' && typeof validQuery.min !== 'undefined'){
			console.warn('resizeComponent: query.min type must be a number, now a ' + typeof validQuery.min);
			validQuery.min = defaultQuery.min;
		}
		if ( typeof validQuery.max !== 'number' && typeof validQuery.max !== 'undefined'){
			console.warn('resizeComponent: query.max type must be a number, now a ' + typeof validQuery.min);
			validQuery.max = defaultQuery.max;
		}
		if ( typeof validQuery.onEnter !== 'function' && typeof validQuery.onEnter !== 'undefined' ){
			console.warn('resizeComponent: query.onEnter type must be a function, now a ' + typeof validQuery.onEnter);
			validQuery.onEnter = null;
		}
		if ( typeof validQuery.onEach !== 'function' && typeof validQuery.onEach !== 'undefined' ){
			console.warn('resizeComponent: query.onEach type must be a function, now a ' + typeof validQuery.onEach);
			validQuery.onEach = null;
		}
		if ( typeof validQuery.onExit !== 'function' && typeof validQuery.onExit !== 'undefined' ){
			console.warn('resizeComponent: query.onEach type must be a function, now a ' + typeof validQuery.onExit);
			validQuery.onExit = null;
		}
		return validQuery;
	};

	var addQuery = function(query){
		var newQuery = validateQuery(query);
		self.queries.push(newQuery);
		triggerQuery(newQuery);
	};

	var onResize = throttle(function(){
		self.queries.forEach(function (item) {
			triggerQuery(item);
		})
	}, self.freezeTime );


	checkScreen();

	window.addEventListener('resize', function() {
		checkScreen();
		onResize();
	});


	return  Object.freeze({

		setFreezeTime: setFreezeTime,

		getScreenWidth: function(){
			checkScreen();
			return self.screenWidth;
		},

		addMediaQuery: addQuery,

		resizeForce: onResize,
		debug: function () {
			console.log(self.queries);
		}
	})

}());
