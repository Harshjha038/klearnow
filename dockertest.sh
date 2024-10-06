#!/bin/bash

#KEEP THE PROJECT NAME IN small LETTERS

PROJECT="kn-drayage-dashboard-ui"
PORT="80"

#RUNNER FOR THE DOCKER TESTING

if [ ! -f public/env-config.js ]; then
    echo "Env File not found! @ public/env-config.js"
    exit 1;
fi
mv .env .env_temp
grep -o '.*:[^,]*' public/env-config.js | tr -d ' '|tr : = |tr -d '"'|sed 's/https=/https:/' > .env
npm run build
docker build -t kxinfra/$PROJECT:latest ./
echo "###################################"
echo "# PRINTING THE ENV CONFIG UPDATED #"
echo "###################################"
cat .env
mv .env_temp .env
docker stop $PROJECT
docker rm $PROJECT
docker run -d -p 80:$PORT --name $PROJECT  kxinfra/$PROJECT
open -a "Google Chrome" http://localhost:$PORT
echo "HAPPY TESTING.."
