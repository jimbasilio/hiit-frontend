#!/bin/sh

sudo docker run -d -v $(pwd)/../dist:/usr/local/apache2/htdocs --name=hiit-frontend -p 8080:80 -t hiit-frontend

