// resizeComponent.setFreezeTime(200);

(() => {
	const table = document.querySelector('.js-tariffs');
	if (!table) return false;
	const cells = table.querySelectorAll('[data-index]');
	if (!cells || !cells.length) return false;
	const rows = [];

	cells.forEach((node) => {
		const { dataset: { index }, offsetHeight } = node;
		if (!rows[index] || offsetHeight > rows[index]) {
			rows[index] = offsetHeight;
		}
	});
	cells.forEach((node) => {
		const cell = node;
		const { index } = cell.dataset;
		cell.style.height = `${rows[index]}px`;
	});

	resizeComponent.addMediaQuery({
		min: 0,
		max: 767,
		onEnter: function(){
			cells.forEach((node) => {
				const cell = node;
				cell.style.height = '';
			});
		},
		onExit: function(){
			cells.forEach((node) => {
				const { dataset: { index }, offsetHeight } = node;
				if (!rows[index] || offsetHeight > rows[index]) {
					rows[index] = offsetHeight;
				}
			});
			cells.forEach((node) => {
				const cell = node;
				const { index } = cell.dataset;
				cell.style.height = `${rows[index]}px`;
			});
		}
	});
})();