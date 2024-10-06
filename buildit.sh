#!/usr/bin/env bash
cd  $1
set -e
set -x

# export NODE_ENV="$2"

yarn run build

# if [ $NODE_ENV == "development" ]; then

#   # this runs webpack-dev-server with hot reloading
#   npm run build-dev
# elif [ $NODE_ENV == "staging" ]; then
#   # this runs webpack-dev-server with hot reloading
#   npm run build-staging
# else
#   # build the app and serve it via nginx
#   npm run build-prod
# fi
