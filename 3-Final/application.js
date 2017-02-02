var baseURL;
var dataLoader;

var homeMenuItem;
var searchMenuItem;
 
App.onLaunch = function(options) {
    var javascriptFiles = [
        `${options.BASEURL}js/ActionHandler.js`,
        `${options.BASEURL}js/DataLoader.js`,
        `${options.BASEURL}js/Presenter.js`,
        `${options.BASEURL}templates/MainMenu.xml.js`,
        `${options.BASEURL}templates/MovieList.xml.js`,
        `${options.BASEURL}templates/MovieDetails.xml.js`,
        `${options.BASEURL}templates/Search.xml.js`,
    ];
 
    evaluateScripts(javascriptFiles, function(success) {
        if(success) {
            baseURL = options.BASEURL;
            dataLoader = new DataLoader();

            var document = MainMenuTemplate();
            var xml = Presenter.makeDocument(document);

            // Cache Menu Items as we will need these to display content
            homeMenuItem = xml.getElementById("home-menuItem");
            searchMenuItem = xml.getElementById("search-menuItem");

            xml.addEventListener("select", ActionHandler.processAction);
            Presenter.pushDocument(xml);        
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
    Presenter.presentMenuItem(template, homeMenuItem);
}

var handleMovieDetails = function(showDetails) {
    var doc = MovieDetailsTemplate(showDetails);
    Presenter.makeAndPushDocument(doc);
}

var handleSearchAllMovies = function(allMovies) {
    var template = SearchTemplate(allMovies);
    var document = Presenter.presentMenuItem(template, searchMenuItem);
    search(document);
}

var search = function(document) {
    var searchField = document.getElementsByTagName("searchField").item(0);
    var keyboard = searchField.getFeature("Keyboard");

    keyboard.onTextChange = function() {
        var searchText = keyboard.text;
        console.log("Search text changed " + searchText);
        searchResults(document, searchText);
    }
}

var searchResults = function (doc, searchText) {
    var regExp = new RegExp(searchText, "i");
    var matchesText = function(value) {
        console.log(value);
        console.log(value.title);
        return regExp.test(value.title);
    }

    var movies = [
        {
            "key": "goonies",
            "title": "The Goonies",
            "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BOTlmMWU5YTQtOWMxMi00OWE0LTg2MDItMjEyZDBjNWY0NDdhL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"
        },
        {
            "key": "et",
            "title": "E.T. the Extra-Terrestrial",
            "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ2ODFlMDAtNzdhOC00ZDYzLWE3YTMtNDU4ZGFmZmJmYTczXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,640,1000_AL_.jpg"
        },
        {
            "key": "sandlot",
            "title": "The Sandlot",
            "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BODllYjM1ODItYjBmOC00MzkwLWJmM2YtMjMyZDU3MGJhNjc4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
        }
    ]

    var domImplementation = doc.implementation;
    var lsParser = domImplementation.createLSParser(1, null);
    var lsInput = domImplementation.createLSInput();

    lsInput.stringData = `
        <list>
            <section>
                <header>
                    <title>No Results</title>
                </header>
            </section>
        </list>`;

    movies = (searchText) ? movies.filter(matchesText) : movies;

    if (movies.length > 0) {
        lsInput.stringData = `
            <shelf>
                <header>
                    <title>Results</title>
                </header>
                <section id="Results">`;
        for (var i = 0; i < movies.length; i++) {
            lsInput.stringData += `
                    <lockup action="movieDetails" key="${movies[i].key}">
                        <img src="${movies[i].img}" width="182" height="274" />
                        <title>${movies[i].title}</title>
                    </lockup>`
        }
        lsInput.stringData += `
                </section>
            </shelf>`;
    }

    lsParser.parseWithContext(lsInput, doc.getElementsByTagName("collectionList").item(0), 2);
}