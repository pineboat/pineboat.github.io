---
draft: true
author: "vijayabharathib"
title: "Promises."
subtitle: "You cannot think straight when you make promises."
date: "2107-11-12T08:15:59+05:30"
publishdate: "2107-11-12T08:15:59+05:30"
tags: ["Javascript","ES6","Promises","Asynchronous","Callbacks"]
categories: ["Javascript"]
image: "/img/newlogo.png"
image_alt: "important message about image"
image_credit: "credit the image owner"
---
Sequencing activities and handling errors have been Javascript Promises give you excellent control over sequencing asynchronous activities and error handling.  

Have you ever made a Promise to someone without fully understanding the implications?  Such promises are quite harmful if you can't keep them, aren't they?Javascript promises are no different. 

Chances are, you already got your fingers burned by Promises. If so, we are on the same boat. No? Then you must be part of the rare species that read the manual before operating an equipment or gadget. Either way, I hope you find something useful within these pages.

Well, here is the shocker. I didn't read the manual. I dived head first into using promises [without adequate understanding][problem-with-promises]. No third degree burns, but couple of frustrated hours on the debugger.

Asynchronous execution was there in Javascript for long. Promises are not new either. The support is 72% (**TK - validate?**). This post is to help you on the path to understand asynchronous javascript execution and where promises fit in the picture.

## Table Of Contents

* [The Axios Story](#the-axios-story)
* [Event Loop](#event-loop)
* [Stack/Heap/Queue](#who-is-the-boss-queue-stack-or-heap)
* [Run To Completion](#run-to-completion)
* [Constructing Promises](#constructing-promises)
* [Consuming Promises](#consuming-promises)
* Callback Heaven and Hell
* To Block or Not to Block
* Promise Capabilities
* Composing Sequence
* Error Handling
* Promise Orchestration
* Scaling Promises
* Pitfalls Beware
* Promise Glossary
* References

## The Axios Story

I recently used [axios][axios] library for one of my projects. It does what it says on the carton: "A Promise Based HTTP Client For The Browser and Node.JS". Here is the simplified version how it started.

```js
import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

var players=[];
var data_url="https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";


axios.get(data_url)
  .then(renderList)
  .catch(handleError);

function handleError(err){
  console.error("Couldn't get " + data_url);
}

function renderList(list){
    players=response.data.map((cyclist,index)=>{
    return (<li key={index}>
    {cyclist.Name}
    </li>);
  });
  console.log("inside axios:" + players);
}

const Tour =()=>{
    console.log("inside app:" + players);
    return <ul>{ players }</ul>;
}

render(<Tour />, document.getElementById('root'));
```

This is the intention:

* Initiate a request for data using `axios`
* Renter Tour App
* Update player names once data is received

But I don't see any players. Just an empty array inside the app. But inside the `axios` sequence, I can see the array is hydrated with player names.

Here is what happened instead:

* Initiate a request for data using `axios`
* Render Tour App with empty player list
* Update global variable `players` once response is received from `axios`

That's a mind wired to write things in sequence and expecting them to run in sequence. It is missing an important dimention that you don't see readily. Time. All those lines are executed in sequence, but `axios.get` is Promise based. Asynchronous. 

**The `players` is empty when the app was rendered.** It wasn't until a bit later when the `players` variable was filled with the result from `axios.get`, which was running in a *separate thread*, so to speak.

The tricky part is, when you debug the buggy code manually, it might work, as you manually step through each line. Before we move on the the app render function, the `axios.get` function might return a valid value. You'll see everything rendering properly. But in reality, the execution until end of render is faster than `axios.get`, we do not see the results. 

This is one of the rare occasions where `console.log` trumps `debugger`. You'll be able to see `undefined` error first and then the result of `axios` get.

We can make it work by moving the axios inside the app lifecycle event. Here is a working version: **TK: put this in a gist, this is not required**

```js
import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

var data_url="https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

function transformData(response){
  return response.data.map((cyclist,index)=>{
    return <li key={index}>{cyclist.Name}</li>;
  })
}
function handleError(err){
  console.error("Couldn't get " + data_url);
}


class Tour extends React.Component {
  constructor(props){
    super(props);
    this.state={players: []}
  }
  componentDidMount(){
    axios.get(data_url)
      .then(transformData)
      .then(list=>{
        this.setState({players:list});
      })
      .catch(handleError);
  }
  render(){
    return (<ul>
        { this.state.players }
    </ul>);
  }
}

render(<Tour />, document.getElementById('root'));

```
Here, the  `axios.get` is part of the app. It is launched after the component is rendered. It doesn't rely on a separate variable to hold the response. Instead, sets the state of the app upon a response. The state then demands re-rendering of the component with the new set of data.

Now that we've seen what happens when we look at an asynchronous code linearly, let's dive right into Promises.

But wait, no. There is a key part of the machinery that we need to understand  before we start to explore Promises. 

**Event loop and Run to completion** are the two most important functionalities of the browser you need to come to term with. Only then will you be able to understand how asynchronous code is executed and how Promises solve important problems. 

This is like going back to the big bang to understand current state of affairs. But it is worth it. Even if you do not get to understand Promises, try to understand event-loop and run-to-completion. They'll help you in understanding Promises and asynchronous code in general.


## Event Loop
Approximately 13 billion years ago, big bang explosion from a singularity set in motion a series of events to form our universe. `Time` is one of the by-products of that big bang. And now, developers make a mess with that `time` to build all sort of useful and fun-filled user experiences. Users, on the other hand, never having heard of `view source` and `dev tools`, have no sense of what the developer expected them to do and end up doing several unexpected operations on the app. 

Now, browser makers need ensure their browsers can deal with both of them. And they invented **Event Loops**. Event loops are like [Heimdall][heimdall], the all-seeing and all-hearing Asgardian within Browsers. The watchful [eye of sauron][sauron].

Event loops are Browsers' way of saying, **"Dear developers and users, it would be easy for us to serve you both really well if you could JUST FORM A QUEUE!"**. I read the comparison of Event loop as a brain in YDKJS. It was in many ways, the right way to form a mental model of the event loop. That is if you first understand how brain works.

Do you know you can't multi-task? You can rapidly switch tasks. There are certain tasks that need less/no focus, such as tieing a shoe lace or buttoning a shirt. But otherwise, no, we can focus on only one thing at any given time. That's the reason we are not supposed to use mobile phones while driving. You cannot focus on both driving and the conversation. Especially if the conversation takes significant focus from your part, you can't allocate your attention to the road. 

You can apply the same logic to event loop in browser. **Event loop manages stack and queue.** In fact, it doesn't even rapidly switch between tasks unless the developer wanted it to. You'll read more about that in `Run-To-Completion` which is one of the following sections, but for now, stay with me.

Stack is like our working memory. Only one activity can occupy that space. 

Queue, apparently, is a to-do list for the browser in order sorted by priority. First In, First Out.

Heap is sort of additional thread that stack can use to push asynchronous code to run and complete in their own sweet time.

here is a psuedo code. 

```js
while(browser.alive){
    if(stack.empty && !queue.empty){
        stack.push(queue.next)
    }
}
```
As a side note, imagine being able to open the programming of our brains and read the conditionals. It will save years of research for neuroscientists I believe.

## Who is the boss? Queue Stack or Heap?
No, wait, come back. I can understand `heap` can invoke a sense of unmanageable pile of papers to manage. Drives adrenelene up. The best antidote is to imagine a tiny pile. Take a deep breath and exhale slowly.

And find who is the boss here.

* Stack takes orders from Queue
* Queue takes orders from the Heap
* Heap takes orders from the Stack

Don't tell me **The Browser** is the boss, I'll confront you with **The Operating System**. Someone will throw in **The user is the boss** and eventually, we might end up hearing from **The God**.  

In a way, all those answers are right, but I am not so sure about **The God**. What we do know is, Event loop controls controls what goes into stack when. 

```js

setTimeout(function(){
    console.log("Detach from stack);
},0);

```
This `setTimeOut` is executed when it lands on stack, sends the anonymous function to heap. There it waits time-out (in this case 0ms), lands at the end of the queue and gets a space in stack once all in front of the queue are cleared.

Now that we understand how some of the asynchronous activities may jump through Queue, stack and Heap, it is time to meet the promise by browsers. 

## Run to completion
Any javascript function/scope with certain number of lines of code will run until the very end of the program without interruption. Even if there is a callback that is initiated in the middle, it is added to the tail end of the event loop (a task queue) and waits for its turn.

Which is why, adding event handlers after starting a request works. Because, event handlers will be added irrespective of the time we get a response. 

**Don't try this at home**. If you must, better put it in a `.js` file and run it from node, so that you can break the execution with `ctrl+c`. I wouldn't suggest this on a browser (**TK: What will happen?**).

```js
let infinite=true;
setTimeout(function(){
  infinite=false;
},10000);
while(infinite){
  console.log("still running",Date.now());
}
```
**TK; Validate above code**

I'd normally expect that code to keep printing `still running` for 10 seconds and then stop. But would it stop? No, it keeps running until I stop it manually / close the browser.

What's wrong? Nothing is wrong, everything is going as planned. Just the work of **run to completion**. Here is how it turns out.

1. currently on the stack
2. set `infinite` to `true`. line 1 done.
3. run setTimeout function
3.1 send that anonymous function to heap
3.2 ask heap to add it to the queue after 10 seconds
3.3 line 2 done.
4. start the while loop
5. keep running until `infinite` is `true`
6. `infinite` still `true` on stack
7. `infinite` still `true` on stack
8. `infinite` still `true` on stack
9. Heap sends the function to queue
10. `infinite` still `true` on stack
11. Queue is holding that function as stack is busy
12. Stack is busy as `infinite` is still true
13. Queue cannot run `infinite=false` until stack gives up
14. and
15. so
16. on
17. ad
18. infinitum

It turns out, the stack is so busy running the `while` loop, our short function to turn off `infinite` never gets a chance to get into the stack. That's a deadlock.

This is so important to wrap your head around. I'll throw in another prevalent example. An easier one this time.

```js
console.log("print first");
setTimeout(asyncPrint,0);
console.log("print last");
function asyncPrint(){
  console.log("print between");
}
//Result
//print first
//print last
//print between
```
In this example, though the setTimeout has 0ms delay, it has to take a round trip to heap, queue and then stack. But the first and last `console.log` are in the same scope and they need to, say it along with me, **run to completion** before the anonymous function within `setTimeout` can take stack stage.

If we are able to hear stack talking, it would sound like this,
1. line 1, console.log: print it
2. line 2, setTimeout: send `asyncPrint` to heap
3. line 3, console.log: print it
4. get the next order from queue

Queue will send whatever is at the front. It could be the `asyncPrint` function we sent through `setTimeout` or another user action on the browser that beat us to the front of the queue within milliseconds. Which is why [MDN][minimum-time-not-guaranteed] says, **Within the setTimeout invocation, the second argument indicates a minimum time and not a guaranteed time.**

If you are clear with **Run to completion**, then you are well primed to look into asynchronous programming and Promises.

For heaven's sake, show me some Promises!

## Is promise an alternative to callback?
I thought so. But No. In fact, Promise heavily uses callbacks as we'll soon see. Asynchronous activities have used plain callbacks so far. The difference between plain callbacks and promises are in handling responses and errors. 

Another difference is, callbacks are usually nested leading to the proverbial 'hell', while promises are composed to a series of actions. This series of actions are not blocking the queue in the name of **run-to-completion**. They will run until they complete, but not by blocking the queue, but one action at a time, in their own time and space.

## Promises capabilities
1. You can attach handlers before or after a promise had finished running.
2. You can nest them or compose them
3. You can chain returned values whether they are literals or promises
4. You can handle all erros in one place or all over the place

Promises seem to be promising too much, don't they? Some of them in the list may apply to usual javascript programs even without promises. But few of them are quite unique (such as attaching handlers after firing actions within promises). We are going to see all that in detail.

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
All of them need to be resolved
## Promise.race
As soon as one of them is resolved

## Promise.resolve()
## Promise.reject()

## State of Promise 
You know a lot about promises now. But knowing the status terminology will help in conversations. Though you are not going to use `settled` and `pending` in code (**REALLY? TK**).

* Resolved
* Rejected
* Settled (Resolved || Rejected)
* Pending (!Resolved && !Rejected)

References:
* Exploring JS 
* [Problem with Promises][problem-with-promises]

Remember, the next time you want to use a new feature, tell yourself to read the specs first. No, I'm just kidding.

[problem-with-promises]:https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
[axios]:https://github.com/axios/axios
[heimdall]: http://marvelcinematicuniverse.wikia.com/wiki/Heimdall
[sauron]: http://lotr.wikia.com/wiki/Eye_of_Sauron
[minimum-time-not-guaranteed]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop