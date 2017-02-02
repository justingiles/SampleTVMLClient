var SearchTemplate = function(movies) { return `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
    <searchTemplate>
        <searchField />
        <collectionList>
            <shelf>
                <section>
                    ` + makeMovieLockups(movies) + `
                </section>
            </shelf>
        </collectionList>
    </searchTemplate>
</document>`
}

var makeMovieLockups = function (movies) {
    if (!movies) {
        return "";
    }

    var movieLockups = "";
    for (i = 0; i < movies.length; i++) {
        movieLockups += `
            <lockup action="movieDetails" key="` + movies[i].key + `">
                <img src="` + movies[i].img + `" width="182" height="274"/>
                <title>` + movies[i].title + `</title>
            </lockup>
        `
    }
    return movieLockups;
}
