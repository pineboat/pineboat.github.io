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
**Single threaded**. But that's not all, as Jake says, the browser has a queue shared by other activities such as painting the elements. Which is why long running javascript activity can block user interactions.

## Run to completion
A function with call-backs is run-to-completion until the very end of the program without interruption. Even if the callback is initiated in the middle, it goes through the queue and wait for its turn.

Which is why, adding event handlers after starting a request works. Because, event handlers will be added irrespective of the time we get a response.

My reference is the book [ExploringJS](http://exploringjs.com/es6/ch_async.html). An improvised version to demonstrate run to completion.



```js
setTimeout(()=>{
    console.log("fired without delay");
},0);
setTimeout(function () { 
    console.log('fired after 1s delay');
}, 1000);
console.log('fired without setTimeout'); 
let start=Date.now
while((Date.now-start)<5000); 
console.log('fired after 5s delay');
//fired without setTimeout
//fired after 5s delay 
//fired without delay
//fired after 1s delay
```
This may seem peculiar at first. Let's take the first line of code, that triggers a callback immediately. It is printed third in the output. Why wasn't it executed first?

Well, it was executed first. But just the setTimeout. **Not the callback**. The callback is placed right at the end of the current function being executed. That is, it respects existing tasks and join at the end of the queue. 

Hence, there is no race condition here **within** the current function. Run-to-completion may sound like blocking, [MDN explains](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) why it is not so. While our little function does have run-to-completion protection, the event loop can progress requests like IO or network requests initiated earlier in the background and their callback can join the queue.

But it is possible to [create a race condition](https://stackoverflow.com/questions/2734025/is-javascript-guaranteed-to-be-single-threaded/2734311#2734311) ourselves outside current stack being executed. Let's say you have a bunch of `setTimeout` and `setInterval` callbacks with a mix of ` if we are trying to figure out the order in which callbacks will be executed. You can see this warning on almost all `setTimeout` related docs: `setTimeout` indicates the **minimum** wait time before the callback is added to the queue. It does not guarantee immediate execution on timeout. The callback will be executed after all those in front of the queue are handled. 

**create an animated gif showing run-to-completion**

## Both single threaded and multi-threaded
How can it be? The clue is in **it**. If it means JavaScript, it is single threaded. Javascript gets just one stack and it can do only one thing at a time. But if it means browser, it can do a lot (multi-threaded). The `setTimeout` actually gets a timer from the browser that runs outside of the stack. So does AJAX server requests.
 
## You can block
If you take too much time on the stack, you can block the event loop (that handles the task queue).

Let's say you want to trigger a task after 10 seconds. You have two choices.
1. you can create your own `sleep` function that blocks the stack for 10 seconds.
2. or you can use `setTimeout` to trigger the task after 10 seconds.

The difference is, while setTimeout is waiting, the stack is free for other browser activities to be completed. Also, in the first instance, after 10 seconds if you call a function, it's guaranteed to be executed next. But setTimeout lives outside the stack, hence, anything added to the queue in the 10 seconds will get first priority.

**the confusion is , if stack is for javascript, why should it block browser rendering/painting -- find out** TK

## References

* Do not miss this talk. This talk by [Philip Roberts](https://vimeo.com/96425312) and the [demo website](http://latentflip.com/loupe).

## Understand promise

Promise changed the linear, synchronous nature of javascript programming. When you are making promises, you can't think straight. This sounds true even in other aspects of life, isn't it?

Introduction by Jake [here](https://developers.google.com/web/fundamentals/primers/promises)

Back to JavaScript, Promise has the following attributes:
* is an object (after all, we are in JS)
* has no sense of time. that is, asynchronous
* is not limited by any other tasks in front or back of the queue (that is, the order of code in your .js file). non-blocking.
* you can trust it to give an answer (whether you'll like it or not is up to you)


You give it a job. It might take its own sweet time, just like any other block of code. But you can trust on it to let you know if the task was fulfilled or something went wrong along the way.

Why promises in js are most promising feature? They are an elegant alternative to callbacks.

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