var MovieList = {
    document: function(moviesByCategory) {
        let template = `
            <document>
                <catalogTemplate>
                    <banner>
                        <title>Movies!!</title>
                    </banner>
                    <list>
                        ${MovieList.makeMovieListByCategory(moviesByCategory)}
                    </list>
                </catalogTemplate>
            </document>`;

        let doc = Presenter.makeDocument(template);
        return doc;
    },
    makeMovieListByCategory: function(moviesByCategory) {
        if (!moviesByCategory) {
            return "";
        }

        let text = "";
        for (catIndex = 0; catIndex < moviesByCategory.categories.length; catIndex++) {
            let category = moviesByCategory.categories[catIndex];
            
            text += `
                <section>
                    <listItemLockup>
                        <title>${category.title}</title>
                        <decorationLabel>${category.movies.length}</decorationLabel>
                        <relatedContent>
                            <grid>
                                <section>`;

            for (movieIndex = 0; movieIndex < category.movies.length; movieIndex++) {
                let movie = category.movies[movieIndex];
                text += `           <lockup key="${movie.key}" onselect="MovieList.displayMovieDetails('${movie.key}')">
                                        <img src="${movie.img}" width="500" height="308" />
                                    </lockup>`;
            }
            
            text += `           </section>
                            </grid>
                        </relatedContent>
                    </listItemLockup>
                </section>`;
        }
        return text;
    },
    displayMovieDetails: function(movieKey) {
        DataLoader.loadMovie(movieKey, function(movieDetails) {
            let doc = MovieDetails.document(movieDetails);
            Presenter.pushDocument(doc);
        });
    },
};
