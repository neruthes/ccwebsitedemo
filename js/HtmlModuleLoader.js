const HtmlModuleLoader = {};

HtmlModuleLoader.load = function (modName, instanceIndex, options) {
    document.write(`<div data-HtmlModuleLoader-placeholder="${modName}" data-HtmlModuleLoader-placeholderIndex="${instanceIndex}"></div>`);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/html-modules/${modName}.html`);
    xhr.send();
    xhr.onload = function (e) {
        // console.log(`[data-HtmlModuleLoader-placeholder="${modName}"][data-HtmlModuleLoader-placeholderIndex="${instanceIndex}"]`);
        if (e.target.status === 200 || e.target.status === 304) {
            console.log(document.querySelector(`[data-HtmlModuleLoader-placeholder="${modName}"][data-HtmlModuleLoader-placeholderIndex="${instanceIndex}"]`));
            document.querySelector(`[data-HtmlModuleLoader-placeholder="${modName}"][data-HtmlModuleLoader-placeholderIndex="${instanceIndex}"]`).outerHTML = HtmlModuleLoader.render(e.target.responseText, options);
        } else {
            console.log(`HtmlModuleLoader: Error: Cannot load ${modName} (${e.target.status})`);
        };
    };
};

HtmlModuleLoader.render = function (inputTmpl, options) {
    const myMatchCriteria = /\{\{\s*([0-9A-Za-z_]+)\s*\}\}/;
    let tmpl = inputTmpl;
    for (var i = 0; i < 255; i++) {
        let matchResult = tmpl.match(myMatchCriteria);
        console.log(`Matched!`, matchResult);
        if (matchResult) {
            tmpl = tmpl.replace(matchResult[0], options[matchResult[1]]);
        } else {
            return tmpl;
        };
    };
    console.log(tmpl);
    return tmpl;
};
