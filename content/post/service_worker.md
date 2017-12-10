---
draft: true
author: "vijayabharathib"
title: "Don't be afraid of service workers."
subtitle: "They are plain Javascript bots, ready to comply"
date: "2107-11-12T08:15:59+05:30"
publishdate: "2107-11-12T08:15:59+05:30"
tags: ["Service Workers","Javascript","PWA"]
image: "/img/newlogo.png"
image_alt: "important message about image"
image_credit: "credit the image owner"
---

Things you need to understand
**Single threaded**

## Run to completion
A function with call-backs is run-to-completion until the very end of the program without interruption. Even if the callback is initiated in the middle, it goes through the queue and wait for its turn.

Which is why, adding event handlers after starting a request works. Because, event handlers will be added irrespective of the time we get a response.

My reference is the book [ExploringJS](http://exploringjs.com/es6/ch_async.html). An improvised version to demonstrate run to completion.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop

```js
setTimeout(function () { 
    console.log('fired after 1s delay');
}, 1000);
console.log('fired without delay'); 
let start=Date.now
while((Date.now-start)<5000); //5s wait
console.log('fired after 5 second delay');
```

Hence, there is no race condition here. While run to completion may sound like blocking, MDN explains why it is not so. While our little function does have run-to-completion protection, the event loop can progress requests like IO in the background.
**this sounds different in exploringjs - blocking for 5 seconds - clarify**

## Understand promise

Promise changed the linear, synchronous nature of javascript programming. When you are making promises, you can't think straight. This sounds true even in other aspects of life, isn't it?

Back to JavaScript, Promise has the following attributes:
* is an object (after all, we are in JS)
* has no sense of time. that is, asynchronous
* is not limited by any other tasks in front or back of the queue (that is, the order of code in your .js file). non-blocking.
* you can trust it to give an answer (whether you'll like it or not is up to you)


You give it a job. It might take its own sweet time, just like any other block of code. But you can trust on it to let you know if the task was fulfilled or something went wrong along the way.

Why promises in js are most promising feature? They are an elegant alternative to callbacks.

callbacks are synchronous, can also be named 'blocking' - **validate**

Let's say you want to request a data from server and update the UI. Let's look at a traditional order.

**Option 1**

* Prepare the shell UI (2 seconds)
* Request and receive Data (2 seconds)
* Update UI (2 seconds)

**Option 2**

* Request and receive data (2 seconds)
* Prepare shell UI (2 seconds)
* Update UI (2 seconds)

**Promise**

* Request and receive data in the background(2 seconds)
* Prepare shell UI **simultaneously** (0 seconds)
* Update UI (2 seconds)

The last options is what we call asynchronous. **Multi-threaded?** 

**insert a picture showing this visually**
**find some examples from real libraries**


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


<script>
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
</script>

service workers internals:
https://developers.google.com/web/fundamentals/primers/service-workers/

service worker gotchas : 
https://www.netlify.com/blog/2017/10/31/service-workers-explained/