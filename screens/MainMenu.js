var MainMenu = {
    menuItemHome: {},
    menuItemSearch: {},
    document: function() {
        // Start by creating the template with only two items. Note that this will be
        // the entire root of the project. Content will be added to the screen by 
        // adding content based on the currently selected menu item.
        let template = `
            <document>
                <menuBarTemplate>
                    <menuBar>
                        <menuItem id="menu-home" onselect="MainMenu.selectTab('home')">
                            <title>Home</title>
                        </menuItem>
                        <menuItem id="menu-search" onselect="MainMenu.selectTab('search')">
                            <title>Search</title>
                        </menuItem>
                    </menuBar>
                </menuBarTemplate>
            </document>`;

        let doc = Presenter.makeDocument(template);

        // Save off the menu items now, to prevent headaches later when we 
        // need to toggle their contents
        MainMenu.menuItemHome = doc.getElementById(`menu-home`);
        MainMenu.menuItemSearch = doc.getElementById(`menu-search`);

        return doc;
    },
    selectTab: function(name) {
        switch(name) {
            case `home`:
                DataLoader.loadMoviesByCategory(function(moviesByCategory) {
                    let doc = MovieList.document(moviesByCategory);
                    Presenter.presentMenuItem(doc, MainMenu.menuItemHome);
                });
                break;
            case `search`:
                DataLoader.loadAllMovies(function(movies) {
                    let doc = Search.document(movies);
                    Presenter.presentMenuItem(doc, MainMenu.menuItemSearch);
                });
                break;
            default:
                console.error(`selected unknown tab: ${name}`);
                break;
        }
    }
}

