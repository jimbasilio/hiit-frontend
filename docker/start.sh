#!/bin/sh

if [ ! -d logs ] 
then
  mkdir logs
fi

sudo docker run -d -v $(pwd)/../dist:/usr/local/apache2/htdocs --name=hiit-frontend -p 8080:80 -t hiit-frontend

