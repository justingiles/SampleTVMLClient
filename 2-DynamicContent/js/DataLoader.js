function DataLoader() {}

DataLoader.prototype.loadJSONData = function(url, callback) {
    var request = new XMLHttpRequest();
    request.responseType = "document";
    request.addEventListener("load", function() {
        callback(JSON.parse(request.responseText));
    }, false);
    request.open("GET", url, true);
    request.send();
}