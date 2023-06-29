console.info(``);
console.info(`-------------------------------`);
console.info(`-- obsidian-element-enhancer --`);
console.info(`-------------------------------`);
console.info(` > https://github.dev/jparkerweb/obsidian-element-enhancer`);
console.info(` > applying obsidian-element-enhancer classes, class targeter is '${input}'`);
console.info(``);

const divs = document.querySelectorAll(`.markdown-reading-view div.${input}`) > 0 ? document.querySelectorAll(`.markdown-reading-view div.${input}`) : document.querySelectorAll(`div.${input}`);
divs.forEach((div) => {
	// get all classes except <input>
	var classes = Array.from(div.classList).filter(c => c !== `${input}`);

	// find the adjacent sibling div
	var adjacentSiblingDiv = div.parentElement.nextSibling;

	// if the adjacentSiblingDiv exists
	if (adjacentSiblingDiv && adjacentSiblingDiv.nodeType === Node.ELEMENT_NODE) {
		// add the classes to the adjacent sibling
		classes.forEach((c) => {
			// remove commas from class names
			c = c.replace(/,/g, '');
			adjacentSiblingDiv.classList.add(c);
		});

		// remove the classes from the div
		classes.forEach((c) => {
			div.classList.remove(c);
		});
	}
});
