var MovieListTemplate = function(moviesByCategory) { return `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
        <catalogTemplate>
            <banner>
                <title>Movies!!</title>
            </banner>
            <list>
                ` + makeMovieListByCategory(moviesByCategory) + `
            </list>
        </catalogTemplate>
    </document>`
}

var makeMovieListByCategory = function(moviesByCategory) {
    if (!moviesByCategory) {
        return "";
    }

    var text = "";
    for (catIndex = 0; catIndex < moviesByCategory.categories.length; catIndex++) {
        var category = moviesByCategory.categories[catIndex];
        
        text += `
            <section>
                <listItemLockup>
                    <title>` + category.title + `</title>
                    <decorationLabel>` + category.movies.length + `</decorationLabel>
                    <relatedContent>
                        <grid>
                            <section>
            `

        for (movieIndex = 0; movieIndex < category.movies.length; movieIndex++) {
            var movie = category.movies[movieIndex];
            text += `           <lockup key="` + movie.key + `" action="movieDetails">
                                    <img src="` + movie.img + `" width="500" height="308" />
                                </lockup>
                    `
        }
        
        text += `           </section>
                        </grid>
                    </relatedContent>
                </listItemLockup>
            </section>
            `
    }
    return text;
}