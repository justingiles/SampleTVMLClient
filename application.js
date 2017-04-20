var baseURL;
 
App.onLaunch = function(options) {
    let javascriptFiles = [
        `${options.BASEURL}js/DataLoader.js`,
        `${options.BASEURL}js/Presenter.js`,
        `${options.BASEURL}screens/MainMenu.js`,
        `${options.BASEURL}screens/MovieDetails.js`,
        `${options.BASEURL}screens/MovieList.js`,
        `${options.BASEURL}screens/Search.js`,
    ];
 
    evaluateScripts(javascriptFiles, function(success) {
        if(success) {
            baseURL = options.BASEURL;

            let mainMenu = MainMenu.document();
            Presenter.pushDocument(mainMenu);
        } else {
            let errorDoc = createAlert(`Evaluate Scripts Error`, `Error attempting to evaluate external JavaScript files.`);
            navigationDocument.presentModal(errorDoc);
        }
    });
};

// Intentionally left here instead of as its own template.
// Why? We are showing this template when evaluateScripts
// returns false. This means that at least one template is 
// invalid and therefore we may not have access to this
// alert template.
var createAlert = function(title, description) {
    let alertString = `
        <?xml version="1.0" encoding="UTF-8" ?>
            <document>
            <alertTemplate>
                <title>${title}</title>
                <description>${description}</description>
            </alertTemplate>
            </document>`;
    let parser = new DOMParser();
    let alertDoc = parser.parseFromString(alertString, `application/xml`);
    return alertDoc;
};
