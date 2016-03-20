echo Starting apache and hosting $(pwd)/dist on port 8080

sudo docker run --rm -v $(pwd)/dist:/usr/local/apache2/htdocs -p 8080:80 html5-httpd:latest

echo Removed container and cleaning up ....
