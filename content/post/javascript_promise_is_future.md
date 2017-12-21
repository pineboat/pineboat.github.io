---
draft: true
author: "vijayabharathib"
title: "Promises."
subtitle: "You cannot think straight when you make promises."
date: "2107-11-12T08:15:59+05:30"
publishdate: "2107-11-12T08:15:59+05:30"
tags: ["Promises","Javascript","Asynchronous"]
image: "/img/newlogo.png"
image_alt: "important message about image"
image_credit: "credit the image owner"
---
Asynchronous execution was there in Javascript for long. Promises are not new either. The support is 72% (**TK - validate?**). This post is to help you on the path to understand asynchronous javascript execution and where promises fit in the picture.

## TL;DR 
1. You can attach a callback to a promise and it'll use the last result of the promise. No risk of missing events trying to race with the async requests.
2. Callbacks are usually nested, but promises can be composed
3. Both values and promises can be returned as a valid result and chained
4. Promises help you handle errors better. There can be a single point of handling failures. Multiple error handling is also available. 

Things you need to understand
**Single threaded**. But that's not all, as Jake says, the browser has a queue shared by other activities such as painting the elements. Which is why long running javascript activity can block user interactions.

## Is promise an alternative to callback?
I thought so. But No. In fact, Promise heavily uses callbacks as we'll soon see. Asynchronous activities have used plain callbacks so far. The difference between plain callbacks and promises are in handling responses and errors. 

Another difference is, callbacks are usually nested leading to the proverbial 'hell', while promises are composed to a series of actions. This series of actions are not blocking the queue in the name of **run-to-completion**. They will run until they complete, but not by blocking the queue, but one action at a time, in their own time and space.

## Event Loops
I read the comparison of Event loop as a brain in YDKJS. It was in many ways, the right way to form a mental model of even loop. That is if you first understand how brain works.

You can't multi-task. Plain and simple. You can switch tasks. There are certain tasks that need no focus, such as buttoning a shirt. 

But there is a reason why we are not supposed to use mobile phones while driving. You cannot focus on both driving and the conversation. Especially if it takes significant contribution from your part. 

Imagine someone asks a question about a distant memory **TK replace with actual question** or something that involves calculation? You need to hand the control over to the memory/calculation - which pushes driving down in priority. And your reflex goes down unless it is brought back to stack by a near miss!

You can apply the same logic to event loop in browser. **Event loop manages stack and queue.**

Here is a psuedo code. 

```js
while(browser.alive){
    if(stack.empty && !queue.empty){
        stack.push(queue.next)
    }
}
```
As a side note, imagine being able to open the programming of our brains and read the conditionals. It will save years of research.

## Run to completion
That begs the question, what is 'Run to completion'? 

Any javascript function with certain number of lines of code will run until the very end of the program without interruption. Even if there is a callback that is initiated in the middle, it is added to the tail end of the event loop (a task queue) and waits for its turn.

Which is why, adding event handlers after starting a request works. Because, event handlers will be added irrespective of the time we get a response. 

## Going back in time with promises
There is a chance the async operation was so fast, that it finished before we could attach an event handler in the next line of code. The callback will then be sitting idle for an event to fire without knowing that train is long gone.

Promises again come to rescue. You can invoke a callback on a promise and it'll use the last result (which is usually a response of async operation). Even if the promise was completed sometime in the past.

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

The last options is what we call asynchronous.  

**insert a picture showing this visually**
**find some examples from real libraries**


## Promise Questions

* can we have a promise to do things in order (using then). how about refactoring that simon game playback using promises?

## Callback Heaven and Hell
When I first started with Javascript, passing functions as arguments took some time to wrap my head around. But I realized quite soon how powerful it can be. I started solving many problems in an efficient manner with call backs. That's what I'd call heaven.

But one can take it too far. So far long that you reach the end of heaven and open the gates of hell. Anonymous callbacks inside one another to create a horizontal pyramid. This page on the internet , [http://callbackhell.com/], that helps you escape. It's just one page, give it a try.

The site talks about one of the conventions in callbacks is to handle errors first. Which means, each callback should have proper error handling within themselves.

Callbacks also invert control of program flow. **TK. Validate this more.** 

Have a look into callbacks from [YDKJS](https://github.com/getify/You-Dont-Know-JS/blob/3f9efe8aefb6d2b8ff9db983802acf62f7905edb/async%20%26%20performance/ch2.md).

## Risk of registering too late in callbacks

you might miss your chance.

## Use a settled promise anytime
This is where promise shines. you can use the result of a settled promise much later when you register an event (or call `then` on the result). Promises got you covered there.

```js
let promise=Promisified();
// do
// 100
// other 
// things
promise.then(works);
```
This is the cool part. You'll never miss an event by seconds. Promises protect you against registering event handlers late in the game. In the above example, we've seen the callback within `then` is executed on the result from the `Promisified` function call.

That promise might have been settled minutes ago. But the results are available for you to take advantage of.

## Then is Asynchronous (queued)
Then part of promise does not get run-to-completion priority because other lines in the function will get run-to-completion.

let's look at an example.
```js
    promise
        .then(f1)
        .then(f2)
        .catch(e);
    getStage();
    getActors();
```
Run-to-protection prioritizes `getStage()` and `getActors()` after promise is invoked. Since they are part of the current scope, they get immediate space in the stack. This is because `then` and `catch` are asynchronous and should be added to the queue. 

This is where I was tripped off. I mutated a variable inside `then` and tried to use it within `getStage`. It works, but since `getStage` runs first, the variable will not be mutated until much later.

This could lead to serious debugging issues. Watch this.

```js
//insert axios react example
```

## Then can handle errors too

```js
promise
    .then(handleResult
        ,handleError);
```
the error handle method above can handle any error from `promise` but cannot handle any error from within `handleResult`.

Which is why, a catch after then is a recommended practice. It'll handle all errors. 

But a combination of both can help you handle errors from `promise` and error from `handleResult` differently.

For example,

```js
promise.then(handleResult,handleErrorFromPromise)
.catch(handleErrorFromResultCallback);
```
## Promise.all
## Promise.race
## Promise.resolve()
## Promise.reject()
