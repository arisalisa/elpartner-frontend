const MenuMobile = function (_id, _tree) {

	let id = _id;
	let tree = _tree;
	let activeNode = 0;
	let html = {
		root: null,
		header: null,
		titleBtn: null,
		closeBtn: null,
		list: null,
		listItem: []
	};

	let render = function () {
		html.root = document.createElement('div');
		html.root.classList.add('menu-mobile');
		html.root.id = 'menu-mobile-' + id;
		html.root.classList.add('is-closed');
		document.body.appendChild(html.root);

		addToggleAnimateHandler();
		renderHeader();
		generateList();
		renderList();
	};

	let renderHeader = function () {
		html.header = document.createElement('div');
		html.header.classList.add('menu-mobile__header');
		html.root.appendChild(html.header);

		let titleWrap = document.createElement('div');
		titleWrap.classList.add('menu-mobile__title');
		html.header.appendChild(titleWrap);

		html.titleBtn = document.createElement('button');
		html.titleBtn.classList.add('menu-mobile__title-btn');
		titleWrap.appendChild(html.titleBtn);

		html.closeBtn = document.createElement('button');
		html.closeBtn.classList.add('menu-mobile__close-btn');
		html.closeBtn.innerHTML = '<span></span>';
		html.header.appendChild(html.closeBtn);
	};

	let updateHeader = function () {
		html.titleBtn.innerHTML = '<i class="menu-mobile__icon-arrow-right"></i>' + tree[activeNode].name;
		html.titleBtn.dataset.node = activeNode;
	};

	let renderList = function () {
		html.list = document.createElement('ul');
		html.list.classList.add('menu-mobile__list');
		html.root.appendChild(html.list);
	};

	let updateList = function () {
		html.list.innerHTML = '';

		for (let i = 0; i < tree.length; i++ ){
			if(tree[i].parentId === parseInt(activeNode)){
				let item = html.listItem[i];
				html.list.appendChild(item);
			}
		}

		html.list.childNodes.forEach(function (element) {
			element.addEventListener(animationEvent, function () {
				element.classList.remove('menu-mobile-item-show-enter-active');
				element.removeEventListener(animationEvent, function () {});
			});
			element.classList.add('menu-mobile-item-show-enter-active');
		});
	};

	let generateList = function () {
		for (let i = 0; i < tree.length; i++ ){
			let item = document.createElement('li');
			item.classList.add('menu-mobile__item');

			let link = document.createElement('a');
			link.classList.add('menu-mobile__item-name');
			link.innerText = tree[i].name.replace(/\r?\n/g, "");
			link.href = tree[i].href;
			item.appendChild(link);

			let btn = document.createElement('button');
			btn.classList.add('menu-mobile__item-btn');
			if (tree[i].hasChild){
				btn.classList.add('hasChild');
				btn.innerHTML = '<i class="menu-mobile__icon-more"></i>';
				btn.dataset.id = i;
				btn.addEventListener('click', function (e) {
					updateActiveNode( e.target.dataset.id);
				});
			} else {
				btn.innerHTML = '<i class="menu-mobile__icon-arrow-left"></i>';
			}
			item.appendChild(btn);

			html.listItem.push(item);
		}
	};

	let close = function () {
		if( typeof scrollComponent !== "undefined") {
			scrollComponent.enable();
		}
		html.root.classList.add('is-closing','menu-mobile-toggle-leave-active');
		activeNode = 0;
	};

	let open = function () {
		if( typeof scrollComponent !== "undefined") {
			scrollComponent.disable();
		}
		updateActiveNode(0);
		html.root.classList.remove('is-closed');
		html.root.classList.add('is-opening','menu-mobile-toggle-enter-active');
	};

	let addToggleAnimateHandler = function () {
		html.root.addEventListener(animationEvent, function () {
			if( html.root.classList.contains('is-opening')){
				html.root.classList.remove('is-opening', 'menu-mobile-toggle-enter-active');
			}
			if( html.root.classList.contains('is-closing')){
				html.root.classList.add('is-closed');
				html.root.classList.remove('is-closing', 'menu-mobile-toggle-leave-active');
			}
			html.root.removeEventListener(animationEvent, function () {});
		});
	};

	let updateActiveNode = function (_id) {
		activeNode = _id;
		updateHeader();
		updateList();
	};

	let addHandler = function () {

		html.closeBtn.addEventListener('click', function () {
			close();
		});

		html.titleBtn.addEventListener('click', function () {
			if(activeNode === 0){
				close();
			} else {
				updateActiveNode(activeNode = tree[activeNode].parentId || 0);
			}
		});
	};

	return Object.freeze({
		init: function () {
			render();
			addHandler();
		},
		open: open,
		close: close
	});
};

(function( $ ){

	var defaults = {
		text: {
			rootTitle: 'Menu'
		},
		selectors: {
			nodeRoot: '.is-root',
			nodeLink: 'a, span',
			node: '-has-dropdown',
			btnToggle: '[data-menu-mobile--switcher-btn]'
		}
	};


	$.fn.menuMobile = function(options, method) {

		if (this.length === 0) {
			return this;
		}

		if (this.length > 1) {
			this.each(function() {
				$(this).menuMobile(options, method);
			});
			return this;
		}

		var menuMobile = {};

		var methods = {

			init : function( options ) {

				menuMobile.settings = $.extend({}, defaults, options);

				var container = $(this);
				var id = Math.round( Math.random()*10000);


				var tree = methods.buildMenuTree($(this), options);
				methods.renderMenu(id, tree);

				methods.addHandlerToggleBtn(container, menuMobile.settings.selectors.btnToggle, menuMobile.settings.VM);

			},


			buildMenuTree : function (root, options){

				var nodeRoot = root;
				var rootTitle = menuMobile.settings.text.rootTitle;
				var nodeLink = menuMobile.settings.selectors.nodeLink;
				var node = menuMobile.settings.selectors.node;

				var tree = [];
				var _id = 0;

				tree.push({ id: _id, name: rootTitle, elementLink: nodeRoot, hasChild: true, parentId: null });
				function build(parentNode){
					var parent = $(parentNode.elementLink);
					var el = parent.find('li').not( parent.find('li li'));
					el.each(function () {
						_id++;
						var currNode = {
							id: _id,
							name: $(this).children(nodeLink).text(),
							href: $(this).children(nodeLink).attr('href'),
							elementLink: $(this),
							hasChild:  $(this).hasClass(node),
							parentId: parentNode.id
						};
						tree.push(currNode);
						if(currNode.hasChild){  build(currNode) }
					});
				}
				build( methods.getNodeRoot(tree) );

				return tree;
			},

			renderMenu : function(id, tree){
				menuMobile.settings.VM = new MenuMobile(id, tree);
				menuMobile.settings.VM.init();
			},

			getNodeById : function(id, tree){
				var result = null;
				tree.forEach(function(item){
					if( item.id === id ){
						result = item;
						return false;
					}
				});
				return result;
			},

			getNodeRoot : function(tree){
				return methods.getNodeById(0, tree);
			},

			addHandlerToggleBtn : function(container, selector, VM){
				container.on('click', selector, function () {
					methods.showMenu(VM);
				});
			},


			showMenu : function (VM) {
				VM.open();
			},

			hideMenu : function (VM) {
				VM.close();
			}

		};

		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' not exist in jQuery.menuMobile' );
		}

	};

})( jQuery );
