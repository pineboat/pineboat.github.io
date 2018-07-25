---
draft: true
author: "vijayabharathib"
title: "Set up JavaScript service workers within minutes"
subtitle: "Adding JavaScript service workers to your site shouldn't take hours. You can set one up in minutes."
date: "2018-07-29T08:15:59+05:30"
publishdate: "2018-07-29T08:15:59+05:30"
tags: ["Service Workers","Javascript","PWA"]
image: "/img/newlogo.png"
image_alt: "important message about image"
image_credit: "credit the image owner"
---

Service workers have very simple way of registering themselves with a browser. You write the code for your service worker in a `.js` file. Add a snippet of JavaScript to register the service worker file with your browser when HTML content is loaded.

Registration is one time, unless you change the service worker JavaScript file. Even 1 byte change will call for the new file to be registered for your site once your old service worker is closed off.

## Register

## Activate

## Unregister

## Issues 



## Promise Questions

* can we have a promise to do things in order (using then). how about refactoring that simon game playback using promises?

* Understand service worker api/lifecycle
* Understand cache api
* Understand the confusing fetch call
* Understand why cache.put returns void & chaining
* Think about caching strategy
* Versioning cache 
* Lighthouse
* Netlify has different caching strategy (304)
* Where to go from here?
    * testing
    * logging clients errors for static sites
* disk cache busting issue
* cache first (behind one refresh)


[ ] raise an issue on pwa builder for two network requests
[ ] find out why mozilla short code was not working


the sw.js has to be in root most folder to access all other files. otherwise, it'll be limited to access only sub folder.

register sw after page is loaded. https://developers.google.com/web/fundamentals/primers/service-workers/registration

```js
    if ('serviceWorker' in navigator) {
        window.addEventListener('load',function(){
            navigator.serviceWorker
                .register('sw.js')
                .then(function(registration){
                    console.log("Your own service worker. Ready to comply.",registration.scope);
                },function(err){
                    console.log("Sorry, service worker didn't check in today",err);
                });
        });
    }

```
service workers internals:
https://developers.google.com/web/fundamentals/primers/service-workers/

service worker gotchas : 
https://www.netlify.com/blog/2017/10/31/service-workers-explained/