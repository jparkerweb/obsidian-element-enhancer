console.log(`applying custom classes, class targeter is '${input}'`);

var divs = document.querySelectorAll(`div.${input}`);
divs.forEach((div) => {
	// get all classes except <class targeter>
	var classes = Array.from(div.classList).filter(c => c !== `${input}`);

	// find the next sibling div
	var nextSiblingDiv = div.parentElement.nextElementSibling;

	// if the nextSiblingDiv exists and has a child
	if (nextSiblingDiv && nextSiblingDiv.firstElementChild) {
		var firstChild = nextSiblingDiv.firstElementChild;

		// add the classes to the first child
		classes.forEach((c) => {
			firstChild.classList.add(c);
		});

		// remove the classes from the div
		classes.forEach((c) => {
			div.classList.remove(c);
		});
	}
});
