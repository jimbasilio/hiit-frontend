This is the frontend for [HIIT-IT](https://github.com/jimbasilio/hiit). Originally written in angular1 now converted to angular2.

NOTE: Google's ["hero"](http://plnkr.co/edit/?p=preview) angular2 app is helpful for figuring out how angular2 works.

#Steps to run

##Run build.sh. This will install all required node_modules

    ./build.sh

##Start Apache docker container

    ./apache.sh

This starts the docker apache container which will serve the app.

##Open browser to http://localhost:8080

#HTML5 Note

Due to a currently discussed [default feature](https://github.com/angular/angular/issues/4735) being discussed by the angualr team, html5 routign is the default. This gives benefits, but the primary issue is lack of ability for direct links w/o configuring the web server to handle this.

Based on this [stack overflow](http://stackoverflow.com/questions/22739455/htaccess-redirect-for-angular-routes) answer I've created a htaccess file used to build my apache docker image with proper server redirection.


