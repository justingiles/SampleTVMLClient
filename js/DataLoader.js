var DataLoader = {
    loadMoviesByCategory: function(callback) {
        let url = `http://localhost:9001/test-data/movies-by-category.json`;
        DataLoader.get(url, function(data) {
                callback(data);
            }, function() {
                console.error(`failed to load movies by category`);
            }, function() {
                console.error(`Timeout: DataLoader.loadMoviesByCategory()`)
            }
        );
    },
    loadAllMovies: function(callback) {
        let url = `http://localhost:9001/test-data/all-movies.json`;
        DataLoader.get(url, function(data) {
                callback(data);
            }, function() {
                console.error(`failed to load movies by category`);
            }, function() {
                console.error(`Timeout: DataLoader.loadMoviesByCategory()`);
            }
        );
    },
    loadMovie: function(key, callback) {
        let url = `http://localhost:9001/test-data/movie-details/${key}.json`;
        DataLoader.get(url, function(data) {
                callback(data);
            }, function() {
                console.error(`failed to load movie`);
            }, function() {
                console.error(`Timeout: DataLoader.loadMovie(${key})`);
            }
        );
    },
    get: function(url, onload, onerror, ontimeout) {
        let request = new XMLHttpRequest();
        request.responseType = `document`;
        request.open(`GET`, url, true);
        request.onload = function() {
            if (onload) {
                onload(JSON.parse(request.responseText));
            }
        };
        request.onerror = function() {
            if (onerror) {
                onerror(request);
            }
        };
        request.ontimeout = function() {
            if (ontimeout) {
                ontimeout();
            }
        };
        request.send();
    },
};
