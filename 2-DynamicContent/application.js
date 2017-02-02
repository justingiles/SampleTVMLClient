var baseURL;
var dataLoader;
 
App.onLaunch = function(options) {
    var javascriptFiles = [
        `${options.BASEURL}js/ActionHandler.js`,
        `${options.BASEURL}js/DataLoader.js`,
        `${options.BASEURL}js/Presenter.js`,
        `${options.BASEURL}templates/MovieList.xml.js`,
        `${options.BASEURL}templates/MovieDetails.xml.js`
    ];
 
    evaluateScripts(javascriptFiles, function(success) {
        if(success) {
            baseURL = options.BASEURL;
            dataLoader = new DataLoader();
            dataLoader.loadJSONData(`${baseURL}test-data/movies-by-category.json`, handleMoviesByCategory);            
        } else {
            var errorDoc = createAlert("Evaluate Scripts Error", "Error attempting to evaluate external JavaScript files.");
            navigationDocument.presentModal(errorDoc);
        }
    });
}

// Intentionally left here instead of as its own template.
// Why? We are showing this template when evaluateScripts
// returns false. This means that at least one template is 
// invalid and therefore we may not have access to this
// alert template.
var createAlert = function(title, description) {
  var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <alertTemplate>
        <title>${title}</title>
        <description>${description}</description>
      </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
}

var handleMoviesByCategory = function(moviesByCategory) {
    var template = MovieListTemplate(moviesByCategory);
    Presenter.makeAndPushDocument(template);
}

var handleMovieDetails = function(showDetails) {
    var doc = MovieDetailsTemplate(showDetails);
    Presenter.makeAndPushDocument(doc);
}