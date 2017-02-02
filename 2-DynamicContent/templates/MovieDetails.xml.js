var MovieDetailsTemplate = function(movie) { return `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
        <productTemplate>
            <banner>
                <infoList>
                    <info>
                        <header><title>Category</title></header>
                        ` + makeCategories(movie.categories) + `
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
                        <buttonLockup action="playVideo" url="${movie.trailerURL}">
                            <text>Trailer</text>
                        </buttonLockup>
                        <buttonLockup action="playVideo" url="${movie.videoURL}">
                            <text>Watch Now</text>
                        </buttonLockup>
                    </row>
                </stack>
                <heroImg src="${movie.img}" />
            </banner>
        </productTemplate>
    </document>`
}

var makeCategories = function(categories) {
    if (!categories) {
        return "";
    }

    var categoryList = "";
    for (i = 0; i < categories.length; i++) {
        categoryList += `
            <text>` + categories[i] + `</text>
        `
    }
    return categoryList;
}