console.info(`-------------------------------`);
console.info(`-- obsidian-element-enhancer --`);
console.info(`-------------------------------`);
console.info(` > https://github.dev/jparkerweb/obsidian-element-enhancer`);
console.info(` > applying obsidian-element-enhancer classes, class targeter is '${input}'`);

// Optimized debounce function
const enhancerDebounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Optimized enhancerApply function
const enhancerApply = () => {
    const selector = `.markdown-reading-view div.${input}, div.${input}`;
    const divs = document.querySelectorAll(selector);

    divs.forEach((div) => {
        const classes = Array.from(div.classList).filter(c => c !== input).map(c => c.replace(/,/g, ''));
        const adjacentSiblingDiv = div.parentElement.nextElementSibling;

        if (adjacentSiblingDiv) {
            adjacentSiblingDiv.classList.add(...classes);
        }
    });
};

// Optimized callback
const enhancerCallback = enhancerDebounce(enhancerApply, 250);

// Optimized observer attachment
const enhancerAttachObservers = () => {
    const readingViewDivs = document.querySelectorAll('.markdown-reading-view');
    const observer = new MutationObserver(enhancerCallback);
    const observerOptions = { childList: true, subtree: true };

    readingViewDivs.forEach(div => observer.observe(div, observerOptions));
};

// Initial setup
enhancerAttachObservers();
enhancerApply();
setTimeout(enhancerApply, 1000);
