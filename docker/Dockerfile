# LICENSE MIT License 2016
#
# PROJECT
# -----------------------------------------
# This is the Dockerfile for a default installation for the hiit-frontend
# 
# REQUIRED FILES TO BUILD THIS IMAGE
# -----------------------------------------
#
# HOW TO BUILD THIS IMAGE
# -----------------------------------------
# Put all downloaded files in the same directory as this Dockerfile
# Run: 
#      $ sudo docker build -t <name> . 
#
# AUTHOR
# -----------------------------------------
# 
# 
# -----------------------------------------

# Pull base apache image
# ---------------
FROM httpd:2.4

# Maintainer
# ----------
MAINTAINER Jim Basilio <jim.basilio@gmail.com>

# Root commands
USER root

RUN apt-get update \
    && apt-get -y  --force-yes install vim

# Define default command to start bash. 
CMD [ "httpd-foreground" ]
