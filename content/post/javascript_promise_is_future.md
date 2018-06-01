---
draft: true
author: "vijayabharathib"
title: "Promises."
subtitle: "Learn JavaScript Promises, the new return type of most of the asynchronous web APIs."
date: "2018-05-30T08:15:59+05:30"
publishdate: "2018-05-30T08:15:59+05:30"
tags: ["Javascript","ES6","Promises","Asynchronous","Callbacks"]
categories: ["Javascript"]
image: "/img/newlogo.png"
image_alt: "important message about image"
image_credit: "credit the image owner"
---
Javascript Promises give you excellent control over sequencing asynchronous activities and error handling. A whole new generation of Web APIs are starting to use Promises. [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) and [Notifications](https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission) are some of the examples where Promises are taking over callbacks.   

Chances are, you already got your fingers burned by Promises. We are on the same boat. No? Then you must be part of the rare species that read the manual before operating an equipment or a gadget. 

I didn't read the manual. I dived head first into using promises [without adequate understanding][problem-with-promises]. No third degree burns, but couple of frustrated hours on the debugger. That's the genesis of this article.

This article aims to help you understand Promises in a browser environment. You'll also be able to see where Promises fit in the big picture of asynchronous JavaScript.

Promises are not entirely new either. The browser support is [good too](https://caniuse.com/#search=promises) and you can find [polyfills](https://github.com/stefanpenner/es6-promise) if you had to support browsers that do not support Promises yet. 

## Table Of Contents

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

Before you start, you need to know about [Event loop and Run to completion](/post/javascript-run-to-completion-event-loop-asynchronous-foundations/). They are the two most important functionalities of the browser you need to come to term with. Only then will you be able to understand how asynchronous code is executed and how Promises solve important problems. 

Read [that article](/post/javascript-run-to-completion-event-loop-asynchronous-foundations/), this can wait. 

All right, now that you know more about **Event Loop** and **Run to Completion**, let's head straight into controversies.

## Getting Started

You need to see an example to appreciate what Promises are capable of.

```js
```
Now, an example from [MDN for Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API that uses Promises.

```js
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(myJson => console.log(myJson);
```

## Promises vs Callbacks?

If you enter the world of promises thinking **no more callbacks**, the first thing you notice is the heavy use of callbacks.You'll soon see. 

Asynchronous activities have used plain callbacks so far. The difference between plain callbacks and promises are in handling responses and errors. 

Another difference is, callbacks are usually nested leading to the proverbial [callback hell](http://callbackhell.com/), while promises are composed as a series of actions. These actions are not blocking the main thread in the name of **run-to-completion**. They will run until they complete, but not by blocking the main thread, but one action at a time, in their own time and space.

## Promises capabilities
1. You can attach handlers before or after a promise had finished running.
2. You can nest them
3. You can compose/chain them
3. Literal return values are automatically packaged promises
4. You can handle all errors in one place or all over the place
5. Once you are inside a promise there is no way out.

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

Well, it was executed first. But just the setTimeout. **Not the callback**. The callback with `fired without setTimeout` is placed right at the end of the queue. 

Hence, there is no race condition here **within** the current function. Run-to-completion may sound like blocking, [MDN explains](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) why it is not so. While our little function does have run-to-completion protection, the event loop can progress requests like IO or network requests initiated earlier in the background and their callback can join the queue.

But it is possible to [create a race-condition-like](https://stackoverflow.com/questions/2734025/is-javascript-guaranteed-to-be-single-threaded/2734311#2734311) scenario ourselves.  

Missing an example of attaching event **TK**

## Both single threaded and multi-threaded
How can it be? The clue is in **it**. If it means JavaScript, it is single threaded. Javascript gets just one stack and it can do only one thing at a time. But if it means browser, it can do a lot (multi-threaded). The `setTimeout` actually gets a timer from the browser that runs outside of the stack. So does AJAX server requests.
 
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
Run-to-completion prioritizes `getStage()` and `getActors()` after promise is invoked. Since they are part of the current scope, they get immediate space in the stack. This is because `then` and `catch` are asynchronous and should be added to the queue. 

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
.then(onResolve,handleErrorFromResult)
.catch(handleErrorFromOnResult);
```
## Promise.all
All of them need to be resolved
## Promise.race
As soon as one of them is resolved

## Promise.resolve()
## Promise.reject()

## State of Promise 
You know a lot about promises now. But knowing the status terminology will help in conversations. Though you are not going to use `settled` and `pending` in code (**REALLY? TK - this should be used before getStage/getActors in the topic above**).

* Resolved
* Rejected
* Settled (Resolved || Rejected)
* Pending (!Resolved && !Rejected)

References:
* Exploring JS 
* [Promises/A+ One-Page Specification](https://promisesaplus.com/)
* [Problem with Promises][problem-with-promises]
Remember, the next time you want to use a new feature, tell yourself to read the specs first. No, I'm just kidding.


## Appendix - The Axios Story

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

That's a mind wired to write things in sequence and expecting them to run in sequence. It is missing an important dimension that you don't see readily. Time. All those lines are executed in sequence, but `axios.get` is Promise based. Asynchronous. 

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

**TK;**
Promises are part of the microtask family. Check this: 
Jake's great talk on Event Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0), don't miss it.


[problem-with-promises]:https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
[axios]:https://github.com/axios/axios
[heimdall]: http://marvelcinematicuniverse.wikia.com/wiki/Heimdall
[sauron]: http://lotr.wikia.com/wiki/Eye_of_Sauron
[minimum-time-not-guaranteed]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop