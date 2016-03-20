#!/bin/bash

if [ ! -d node_modules ]; then
  echo Running 1 time installation for node modules

  npm install
fi

npm run build
