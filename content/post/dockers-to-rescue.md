---
title: "know this to never fear docker again"
subtitle: "dockers"
tags: ["containers","dockers","terminal"]
author: "vijayabharathib"
date: "2018-12-23T22:45:25+05:30"
publishdate: "2018-12-23T22:45:25+05:30"
draft: true
---

docker logs -f <container_name> | follows the logs until ctrl+c
docker rmi <hash> | remove image , first few letters of the hash is fine as long as it is unique
docker-compose up -d | start container detached, gives control back to the terminal and runs the container in the background
docker images | list images
docker rmi $(docker images -f "dangling=true" -q) | remove dangling images
docker rmi <image>:<tag> | remove a particular image with a specific tag
docker ps -a | list stopped containers
docker ps | list running containers 
docker-compose down |stop a running container 
docker-compose exec <command> | run the command within already running conatiner 
docker login | login to docker hub from terminal 
docker push <image>:<tag> | push an image to docker hub
docker tag <hash> <user/image:tag> add a tag to an unnamed image before pushing to docker hub
docker info | list details about docker images
docker run -i -t | run an interactive bash in the container
docker-compose exec /bin/bash | run interactive bash in the container 

docker run <image_name> <command> - permanent on the image
docker-compose exec on conatainer is fleeting

webpacker.yml configuration has 'localhost'. changing it to '0.0.0.0' helps hot reloading work ok

image is like class 
container is like object

to generate secret_key_base
ruby -rsecurerandom -e "puts SecureRandom.hex(64)"

check environment variables, on heroku,  for 
* serving static files
* and logs to stdout