var Presenter = {
    makeDocument: function(resource) {
        if (!Presenter.parser) {
            Presenter.parser = new DOMParser();
        }
        var doc = Presenter.parser.parseFromString(resource, "application/xml");
        return doc;
    },
    modalDialogPresenter: function(xml) {
        navigationDocument.presentModal(xml);
    },
    pushDocument: function(xml) {
        navigationDocument.pushDocument(xml);
    },
    makeAndPushDocument: function(doc) {
        var xml = Presenter.makeDocument(doc);
        xml.addEventListener("select", ActionHandler.processAction);
        Presenter.pushDocument(xml);
    },
    playVideo: function(url) {
        var player = new Player();  
        var playlist = new Playlist();
        var mediaItem = new MediaItem("video", url);
        player.playlist = playlist;  
        player.playlist.push(mediaItem);  
        player.present();
    }
}