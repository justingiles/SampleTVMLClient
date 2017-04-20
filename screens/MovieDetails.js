var MovieDetails = {
    document: function(movie) {
        let template = `
            <document>
                <productTemplate>
                    <banner>
                        <infoList>
                            <info>
                                <header><title>Category</title></header>
                                ${MovieDetails.makeCategories(movie.categories)}
                            </info>
                            <info>
                                <header><title>Director</title></header>
                                <text>${movie.director}</text>
                            </info>
                        </infoList>
                        <stack>
                            <title>${movie.title}</title>
                            <description>${movie.description}</description>
                    
                            <row>
                                <buttonLockup onselect="Presenter.presentVideo('${movie.trailerURL}')">
                                    <text>Trailer</text>
                                </buttonLockup>
                                <buttonLockup url="Presenter.presentVideo('${movie.videoURL}')">
                                    <text>Watch Now</text>
                                </buttonLockup>
                            </row>
                        </stack>
                        <heroImg src="${movie.img}" />
                    </banner>
                </productTemplate>
            </document>`;

        let doc = Presenter.makeDocument(template);
        return doc;
    },
    makeCategories: function(categories) {
        if (!categories) {
            return ``;
        }

        let categoryList = ``;
        for (i = 0; i < categories.length; i++) {
            categoryList += `<text>${categories[i]}</text>`;
        }
        return categoryList;
    },
};
