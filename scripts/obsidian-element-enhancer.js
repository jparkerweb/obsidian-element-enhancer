console.info(``);
console.info(`-------------------------------`);
console.info(`-- obsidian-element-enhancer --`);
console.info(`-------------------------------`);
console.info(` > https://github.dev/jparkerweb/obsidian-element-enhancer`);
console.info(` > applying obsidian-element-enhancer classes, class targeter is '${input}'`);
console.info(``);

function enhancerDebounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function enhancerApply() {
	const divs = document.querySelectorAll(`.markdown-reading-view div.${input}`) > 0 ? document.querySelectorAll(`.markdown-reading-view div.${input}`) : document.querySelectorAll(`div.${input}`);
	// console.info(` > found ${divs.length} divs with class '${input}'`);

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
		}
	});
}


const enhancerCallback = enhancerDebounce(function(mutationsList, observer) {
    enhancerApply();
}, 250);


function enhancerAttachObservers() {
    const readingViewDivs = document.querySelectorAll('.markdown-reading-view'); // Adjust the selector as needed
    readingViewDivs.forEach(div => {
        const observer = new MutationObserver(enhancerCallback.bind(div));
        observer.observe(div, { childList: true, subtree: true });
    });
}


// Run this function initially and also whenever a tab change occurs
// You may need additional logic to re-run enhancerAttachObservers when tabs are changed
enhancerAttachObservers();


// initial run
enhancerApply();
setTimeout(() => {
	enhancerApply();
}, 1000);
