var ActionHandler = {
    processAction: function(event) {
        var element = event.target;
        var action = element.getAttribute("action");

        switch(action) {
            case "home":
                dataLoader.loadJSONData(`${baseURL}test-data/movies-by-category.json`, handleMoviesByCategory);
                break;
            case "search":
                dataLoader.loadJSONData(`${baseURL}test-data/all-movies.json`, handleSearchAllMovies);
                break;
            case "playVideo":
                var url = element.getAttribute("url");
                Presenter.playVideo(url);
                break;
            case "movieDetails":
                var key = element.getAttribute("key");
                dataLoader.loadJSONData(`${baseURL}test-data/movie-details/` + key + `.json`, handleMovieDetails);
                break;
            default:
                console.log("WARNING: Undefined action: '" + action + "'");
                break;
        }
    }
}