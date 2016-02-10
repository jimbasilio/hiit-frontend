This is the frontend for [HIIT-IT](https://github.com/jimbasilio/hiit). Originally written in angular1 now converted to angular2.

NOTE: Google's ["hero"](http://plnkr.co/edit/?p=preview) angular2 app is helpful for figuring out how angular2 works.

#Steps to run

##Start Apache docker container

    cd docker
    ./build.sh
    ./start.sh

This starts the docker apache container which will serve the app.

##Start the angular app

    <from root of git repo>
    gulp build
    
Open browser to http://localhost:8080

