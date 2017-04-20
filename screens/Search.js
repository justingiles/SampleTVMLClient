var Search = {
    _document: undefined,
    document: function(movies) {
        let template = `
            <document>
                <searchTemplate>
                    <searchField/>
                    <collectionList>
                        <shelf>
                            <section id="search-results">
                                ${Search.makeMovieLockups(movies)}
                            </section>
                        </shelf>
                    </collectionList>
                </searchTemplate>
            </document>`;

        Search._document = Presenter.makeDocument(template);

        let searchField = Search._document.getElementsByTagName(`searchField`).item(0);
        let keyboard = searchField.getFeature(`Keyboard`);
        keyboard.onTextChange = function() {
            console.log(`Search text changed ${keyboard.text}`);
            Search.search(keyboard.text);
        }

        return Search._document;
    },
    makeMovieLockups: function(movies) {
        if (!movies) {
            return "";
        }

        let movieLockups = "";
        for (i = 0; i < movies.length; i++) {
            movieLockups += `
                <lockup key="${movies[i].key}" onselect="Search.displayMovieDetails('${movies[i].key}')">
                    <img src="${movies[i].img}" width="182" height="274"/>
                    <title>${movies[i].title}</title>
                </lockup>
            `
        }
        return movieLockups;
    },
    displayMovieDetails: function(movieKey) {
        DataLoader.loadMovie(movieKey, function(movieDetails) {
            let doc = MovieDetails.document(movieDetails);
            Presenter.pushDocument(doc);
        });
    },
    // Because this is not functioning like a real API and we are using fake data
    // this will simply FAKE a real query by tracking the actual data in the file here.
    // If this was a real search, an API request would be made and this function would
    // work as a base for a handler to the results.
    search: function(query) {
        // First clear out all of the current results as they are likely about to change
        let resultsSection = Search._document.getElementById(`search-results`);
        while (resultsSection.firstChild) {
            resultsSection.removeChild(resultsSection.firstChild);
        }

        // fake data (this matches exactly what is in all-movies.json)
        let movies = [
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

        // perform a regex search to limit our results
        let regExp = new RegExp(query, `i`);
        let matchesText = function(value) {
            return regExp.test(value.title);
        }
        movies = (query) ? movies.filter(matchesText) : movies;

        // perform the actual creation and insert into the results section
        let movieLockups = Search.makeMovieLockups(movies);
        if (movieLockups.length > 0) {
            resultsSection.innerHTML = movieLockups;
        }
    },
};
