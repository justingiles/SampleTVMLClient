var Presenter = {
    makeDocument: function(resource) {
        if (!Presenter.parser) {
            Presenter.parser = new DOMParser();
        }
        let doc = Presenter.parser.parseFromString(resource, `application/xml`);
        return doc;
    },
    modalDialogPresenter: function(xml) {
        navigationDocument.presentModal(xml);
    },
    pushDocument: function(xml) {
        navigationDocument.pushDocument(xml);
    },
    presentMenuItem: function(doc, menuItem) {
        let menuItemDocument = menuItem.parentNode.getFeature(`MenuBarDocument`);
        menuItemDocument.setDocument(doc, menuItem);
    },
    presentVideo: function(url) {
        let player = new Player();  
        let playlist = new Playlist();
        let mediaItem = new MediaItem(`video`, url);
        player.playlist = playlist;  
        player.playlist.push(mediaItem);  
        player.present();
    },
};
