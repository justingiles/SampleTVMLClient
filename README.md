# Sample TVML Client

Sample project to display/play a selection of Movies in TVML.


## Overview

This project provides a strong base for a video streaming application that allows for viewing movies by category and provides the structure that can be used for searching.
Loading the application will display a "Home" screen that loads movies from a JSON file by category and displays them. Selecting a move will launch a details page
providing more information, and eventually launch to a video. The "Search" screen allows for searching for a movie and selecting a result to launch the same details page.


## Running

This application makes the assumption that the `test_data` folder will be run on localhost on port `9001`. If this is not the port you would like, or you desire to run it
on another device, then you must edit the URLs listed within `DataLoader.js` as necessary. It is my suggestion that they be hosted with a python simple http server: `python -m SimpleHTTPServer 9001`

To actually launch the application, create a new TVML application in Xcode. Quickly update the `AppDelegate.swift` file to include:
```
static let tvBaseURL = "http://localhost:9001/"
static let tvBootURL = "\(AppDelegate.tvBaseURL)/application.js"
```

On run, your application should run as expected. If you receive a warning you may need to enable the app to connect to your compuer. Open `Info.plist` in your Xcode project and add `App Transport Security Settings` with a key of `Allow Arbitrary Loads` = `Yes`.