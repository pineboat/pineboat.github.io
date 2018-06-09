---
draft: true
author: "vijayabharathib"
title: "JavaScript Promises Can Help You Fix Callback Hell"
subtitle: "Promises are the new return type of most of the asynchronous web APIs in JavaScript. Promises help you compose functions better."
date: "2018-05-30T08:15:59+05:30"
publishdate: "2018-05-30T08:15:59+05:30"
tags: ["Javascript","ES6","Promises","Asynchronous","Callbacks"]
categories: ["Javascript"]
image: "/img/007_promises/javascript_promises.png"
image_alt: "JavaScript Promises"
image_credit: "Patterns from trianglify.io"
---
Javascript Promises give you excellent control over composing functions. Promises help you with higher flexibility to sequence asynchronous activities and handle errors. **A whole new generation of Web APIs are starting to use Promises**. [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) and [Notifications](https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission) are some of the examples where Promises are taking over callbacks.   

They are very easy to use once you understand the underlying constructs that make Promises tick. Chances are, you already got your fingers burned by Promises. We are on the same boat. No? Then you must be part of the rare species that read the manual before operating an equipment or a gadget. 

I didn't read the manual. I dived head first into using promises [without adequate understanding][problem-with-promises]. No third degree burns, but couple of frustrated hours on the debugger. That's the genesis of this article.

>This article aims to help you understand Promises in a browser environment. You'll also be able to see where Promises fit in the big picture of **Asynchronous JavaScript.**

Promises are not entirely new either. The browser support is [good too](https://caniuse.com/#search=promises) and you can find [polyfills](https://github.com/stefanpenner/es6-promise) if you had to support browsers that do not support Promises yet. 

## Table Of Contents

Here is a preview of what you'll go through:

* [Warm up with Event Loop](#warm-up-with-event-loop)
* [Getting Started with Promises](getting-started-with-promises)
* [What are Promises?](#what-are-promises)
* [Constructing & Consuming Promises](#constructing-and-consuming-promises)
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

## Warm up with Event Loop

Before you start using Promises, you need to know about [Event loop and Run to completion](/post/javascript-run-to-completion-event-loop-asynchronous-foundations/). They are the two most important functionalities of the browser you need to come to term with. Only then will you be able to understand how asynchronous code is executed and how Promises solve important problems. 

Read [that article](/post/javascript-run-to-completion-event-loop-asynchronous-foundations/), this can wait. 

All right, now that you know more about **Event Loop** and **Run to Completion**, let's head straight into controversies.

## Getting Started with Promises

We are going to get to the root of the promises. But it helps have a good look at the tree first. You need to see an example to appreciate what Promises are capable of (*Don't worry about the details now*).

Here is one from jQuery days.
```js
$.ajax({
    url: apiURL,
    success: function(data){
      if(data.status!="404"){
        getStream();
      }else{ //if status is 404 log error
        $('.error').append(data.message);
      }
    },
    error: function(e){
      $('.error').append(e.message);
    }
});
```

You've handled any errors during the ajax call. You've also checked for the status code in the response. By the way, that's a crude example looking only for 404, but in reality you need to take care of other status codes too. 

Now, ask yourself this question. What happens when `getStream` fails? Who handles it? Obviously, the function `getStream` needs to handle it. You might end up using another `$('.error').append(message)`.

Now, an example with Fetch that uses Promises:
```js
fetch(apiURL)
  .then(response => response.json())
  .then(json=>{
      if(data.status!="404"){
        return data;
      }else{ 
        throw new Error(response.statusText);
      }
  })
  .then(data => getStream())
  .catch(error => appendError(error));
```

That seems to be attractive in terms of composing functions, isn't it? The `catch` is used to catch all errors in this instance. As you'll see later in this article, you can also catch errors at specific positions within the flow.

## What Are Promises?

Here is a definition from [MDN on Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), I have tagged it :

>The Promise object represents the eventual completion **[1]** (or failure) **[2]** of an asynchronous operation **[3]**, and its resulting value **[4]**.

A network request using `fetch` is a fitting example to explain the tagged numbers.

* `[3]` - network request is an asynchronous operation.
* `[1]` - its completion will result in the promise resolving, leading to `then` part of the chain.
* `[2]` - a network failure will reject the promise, leading to `catch` part of the chain.
* `[4]` - the resulting value from `fetch` is the response

Here is the example for above statements in all its JavaScript glory:
```js
fetch(url)
  .then(processData)
  .catch(error);
```

Here are a few situations Promises can handle really well:

 * a network request that returns a response
 * a location request that returns coordinates
 * a permission popup the user might accept (or ignore)
 * any computation that might take while to arrive at result 

## Constructing and Consuming Promises

You'll go through a few keywords used to talk about promises first and then on to creating and using your own promises in this section.

### Promise States

Before you move forward. You need to understand these terms around state of promises. 

State | Description
------|------------
**Pending** | When you first invoke a promise, it will be in **Pending** state. That means the async activity is still underway.
**Settled** | When the async activity is over, the Promise has to move to **Settled** state. 
**Resolved** | When **settled successfully**, the Promise moves to **Resolved** state.
**Rejected** | If there is an **error while settling** the promise, then the state would be **Rejected**.

The developer who is creating the Promise based API can control when to settle the promise. She will also decide when to resolve it and when to reject it.

The developer who is consuming the Promise based API has the next set of controls. She can decide what to do when the promise is resolved. She can also decide how to handle errors when the promise is rejected.

Both could be you. But there are times when someone else creates a promise based API and other developers end up using them. [axios] is one such library. `fetch` API in the browser is one another example. We do not get to decide when to resolve/reject the `fetch` API, but we end up writing *callbacks* to handle successful resolution with a response and also tragic rejections due to network errors.

### Syntax & Components

It's time already. Let's dive right into some code. The syntax for promises look like this:

```js
const promise = new Promise(
  (resolve, reject) => {
  //asynchronous computation  
  let result=asyncActivity();
  if(result==all_is_well)
    //call resolve when things are ok
    resolve(result); 
  else
    //call reject on error
    reject("Err.."); 
});

promise
  .then(processResult) 
  .catch(handleError);
```

A new Promise takes a function as parameter. That function takes two parameters, which are also functions.

The function passed to `new Promise` is the heart of this piece of code. You will do your asynchronous operation within this function. Based on the result, you'll also determine whether to resolve or reject a promise.

`processResult` is used as the `resolve` callback through `then`. `handleError` is used as `reject` callback through `catch`.

### Example 1
Let's build state of the art BlockChain mining program with that knowledge:

```js
const mineBlocks=()=>{
  return new Promise((resolve, reject) => {
    result=mineBlockChains();
    if(result==all_Ok)
      resolve(result);
    else
      reject("All are taken!");
  });
}

const block=mineBlocks();

block
  .then(creditBitCoin)
  .catch(badNewsFirst);

```

### Applied Example
If that was too hi-tech and you hear the earth warming up at the very mention of the word *BlockChain*, here is another example. A [CodeSandBox I've created for Promisified version of geolocation API](https://codesandbox.io/s/jv3x2ypn6y).

A preview of the sandbox here:
```js
function locate() {
  return new Promise((located, lost) => {
    if ("geolocation" in navigator) {
      navigator
        .geolocation
        .getCurrentPosition(located,lost);
    } else {
      lost(new Error("Geolocation is not supported"));
    }
  }
}

//make a call to the promise
let location = geo.locate();

//use results when Promise is resolved
location
  .then(showPosition)
  .catch(positionError);
```

The location API is still based on **callbacks**. But you can convert that to promise based one as shown above.

Pay attention to the deterministic nature of the last 3 lines above. It shows what can you expect without taking too much of cognitive load. ...*and that's what I mean by predicting the future, just in case you came in here expecting something else.*

## Promising Features

There are few really impressive traits about Promises that you need to master. Trust me, they don't just equip you with the power but they also save you from lot of hassle.

### Re-Usable
One of the key attributes of a Promise is, once settled, you can use the result as many times as you want.

Take a look at this example:
```js
let promise=Promise.resolve(1);

//first-time use
promise
  .then(x=>x+1) //1+1=2
  .then(x=>x*x) //2*2=4
  .then(console.log); //4

//use it a second time
promise
  .then(x=>x+2) //1+2=3
  .then(x=>x*x) //3*3=9
  .then(console.log); //9
```
Let's go line by line. The first one with `Promise.resolve()` is the easiest way to convert any data into *promisified* object.

We are just passing the literal value 1 and we are getting a promise object in return. The returned promise wraps around the value 1. It is also settled immediately, as there is no async activity here.

Now, the next set of lines try to use the `promise` object by chaining `then`. `then` takes a function as parameter. I'm using arrow functions to add and multiply the values.

As you can see, `promise` retains its original value of `1` even after we called a few `then` on it. That's why the second time `promise` is used, it starts with value 1.

This is important. 

>A promise once settled, cannot be changed.

You can chain `then` to operate on the original value and arrive at different results. But the original promise stays as it is.

Here is another example demonstrating that:

```js
let p=Promise.resolve(2);
let q=p.then(x=>x*5)
p.then(console.log); //2
q.then(console.log); //10
```

That demonstrates that each `then` call returns a promise. Another important trait.

>`then` returns a promise, even if the callback passed to `then` returns a literal value. That's why you are able to chain on `then`

### Streams are Exceptions

Final catch in this pattern of re-using promise results is related to network responses. I'm using [jsonPlaceholder](https://jsonplaceholder.typicode.com/) service, which is a free mock API available without any registration, for you to try  It returns `id`, `userId` and `title`.

See what happens when you use the response object a second time:
```js
let result=fetch('https://jsonplaceholder.typicode.com/users');
result
  .then(res => res.json())
  .then(json => console.log(json[0].id)); //1

//100 other things

//oh, I want to reuse that result again
result
  .then(res=>res.json())
  .then(json=>console.log(json[0].username));
  //TypeError; body stream already read
```

>Be careful about re-using network responses. These responses are streams. Once consumed, you cannot start from scratch again. Reusing works only for literal values, but not for streams. 

Then how do we re-use network responses? Obviously, you do not want to make another network request for the same data.

Sure, good question. **You clone that response stream and consume that cloned stream.** That will leave the original response intact for further use at a later point in time.

Here is how it's done:
```js
let result=fetch('https://jsonplaceholder.typicode.com/users');
result
  .then(res => res.clone()) //the trick!
  .then(data => data.json())
  .then(json => console.log(json[0].id)); //1

result
  .then(r=>r.clone())
  .then(j=>j.json())
  .then(json=>console.log(json[0].username));
  //Bret
```

APIs such as [Service Workers][service-workers] may need the response stream as it is [where you clone the response each time to keep it alive]. But if you are sure you just need the data, you can move on to a better solution with the following pattern.

Here is another solution:
```js
let result=fetch('https://jsonplaceholder.typicode.com/users');
let data=result
        .then(data => data.json());

data
  .then(json => console.log(json[0].id)); //1

data
  .then(json=>console.log(json[0].username)); //Bret
```

In this solution, we've stored jsoned the data in a variable named `data`. That's a promise object. You have the json data wrapped around a promise named `data`. As shown above, you can use the `data` again as many times as you want.

But you cannot use the `result` anymore as you have consumed the response stream.

Note: I claim credit for coining that word `jsoning`, err... that's if no one else has already done so.

### Chaining

You've seen that we've been chaining outputs using `then`. We've also seen that `then` wraps the return value from callback with a Promise and returns a promise object. That begs the question, **what if you do not return any value from callback?**

```js
let p=Promise.resolve(2);
p.then(x=>x*x) //4
 .then(console.log) //4
 .then(console.log) //undefined!!?
```
What happened here? Promise, that's what happened.

`x=>x*x` returned 4. `then` wrapped it as a promise and returned it. The first `console.log` received that value and printed it, but it **did not return anything**. So the next `console.log` received `undefined`.

>Always return some value from `then` / `catch` to be able to chain further.

### Unified Return Type

## Error Handling

```js
let promise=fetch(url);

promise.then(processResponse)
       .catch(handleError);
```

### Then can handle errors too

```js
promise
    .then(
      handleResult,
      handleError
    );
```
the error handle method above can handle any error from `promise` but cannot handle any error from within `handleResult`.

Which is why, a catch after then is often used to handle all errors. 

But a combination of both can help you handle errors from `promise` and error from `handleResult` differently.

For example,

```js
promise
  .then(handleResult,handleErrorFromPromise)
  .then(onResolve,handleErrorFromResult)
  .catch(errorOnResolve);
```

### Multiple Catches
You can introduce multiple `catch` statements in between. They are called if there are any errors in the preceding statements.

```js
promise
  .then(callback1)
  .then(callback2)
  .catch(errorUpToNow)
  .then(callback3)
  .then(callback4)
  .catch(anyErrorIn3And4)
  .then(and)
  .then(so)
  .then(on);
```
### Racing

### Own The Pattern

Box pattern

## Promise as Async MicroTasks

>The whole premise of Promises is that they run asynchronously. The **sequence you see is NOT the order of execution**.

let's look at an example.
```js
let p=Promise.resolve("promise");
setTimeout(console.log,0,"timeout");
p.then(console.log); //promise
console.log("insider");
```

We have three print statements there in the above piece of code. Run this on a browser terminal and see what is printed.

What do we expect?
```
* timeout
* promise
* insider
```

What do we get?
```
* insider
* promise
* timeout
```

Quite the reverse, isn't it?

If you really followed my request to read about [Event Loop][async-foundations], the following explanation would be easy.

Run to completion ensures that all 4 lines are executed before the function leaves the main thread.

Line 1: create a promise object with a value of `promise` text
Line 2: send `setTimeout` to Web API thread to run 
Line 3: send `then` callback to *MicroTask* space
Line 4: print `insider` right away

Even though Line 2 and Line 3 are sent to run somewhere else, then need access to the main thread to finish their computation.

For example, `setTimeout` gets access to a parallel thread, it is used **only to wait until the timeout**. In this case, 0 seconds. That means, it is sent back to the queue right away.

Promises are also do something similar. In that, they do their async activity away from main thread. But the result of that passed to `then` needs access to main thread.

Now we have a race condition. Sort of, but not really. 

Promises are part of the microtask family. Check this: 
Jake's great talk on Event Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0). 

>Microtasks such as promises get priority access to queue followed by other tasks initiated by setTimeout

That's why `promise` is printed right after `insider`. Finally, `timeout` is printed. Here is the whole story:

* `insider` is printed right away from the current scope.
* `timeout` takes a round-trip
* `promise` takes a round-trip
* `timeout` and `promise` meet each other
* `promise` takes priority

...and they lived happily ever after.

After all this, if you ever write code like this, you'll spend rest of your lives in devtools.

```js
let data;
fetch(url).then(res=>{
  data=res.json();
});
render(data); //undefined
```

You need to remember, `let data;` and `render(data)` will be executed immediately, but `fetch` takes an async round trip via event loop. So `render` is called even before the `fetch` can assign a meaningful value.

## Promises vs Callbacks

If you enter the world of promises thinking **no more callbacks**, the first thing you notice is the heavy use of callbacks. You'll soon see. 

Asynchronous activities have used plain callbacks so far. The difference between plain callbacks and promises are in handling responses and errors. Our first ever example at the top showed this.

Another difference is, callbacks are usually nested leading to the proverbial [callback hell](http://callbackhell.com/), while promises are composed as a series of actions. These actions are not blocking the main thread in the name of **run-to-completion**. They will run until they complete, but not by blocking the main thread, but one action at a time, in their own time and space.

## Non-Blocking Promises

Promises changed the linear, synchronous nature of javascript programming with callbacks. 

You give it a job. It might take its own sweet time, just like any other block of code. But you can trust on it to let you know if the task was fulfilled or something went wrong along the way.

That's why promises are an elegant alternative to plain callbacks.

Here is a demonstration. Let's say you want to request a data from server and update the UI. Let's look at a traditional order with synchronous activities.

* Prepare the shell UI (2 seconds)
* Request and receive Data (4 seconds)
* Update UI (2 seconds)

On the whole, that would take about 8 seconds.

Here is how it looks:
![image showing three activities happening one after another](/img/007_promises/callback_sequential.png)

The **Promise** async activity sequencing allows you to re-order things and achieve better results.

* Request and receive data in the background(4 seconds)
* Prepare shell UI **simultaneously** (2 seconds)
* Update UI (2 seconds)

This sequence ends in 6 seconds, 2 seconds earlier than the previous approach. Here is a visual:

![async parallel activities finishing earlier](/img/007_promises/parallel_promise_async.png)

*Trivia:* I've reused [mozilla css-grid playground](https://mozilladevelopers.github.io/playground/css-grid/) to arrive at those images above. An occupational hazard when you know how to move things around using CSS, that becomes your design tool of choice. Nor Photoshop, neither GIMP, it's CSS. 

## Callback Heaven and Hell

When I first started with Javascript, passing functions as arguments took some time to wrap my head around. But I realized quite soon how powerful it can be. I started solving many problems in an efficient manner with call backs. That's what I'd call heaven.

But one can take it too far. So far long that you reach the end of heaven and open the gates of hell. Anonymous callbacks inside one another to create a horizontal pyramid. This page on the internet , [http://callbackhell.com/], that helps you escape. It's just one page, give it a try.

The site talks about one of the conventions in callbacks is to handle errors first. Which means, each callback should have proper error handling within themselves.

Callbacks also invert control of program flow. **TK. Validate this more.** 

Have a look into callbacks from [YDKJS](https://github.com/getify/You-Dont-Know-JS/blob/3f9efe8aefb6d2b8ff9db983802acf62f7905edb/async%20%26%20performance/ch2.md).

## Risk of registering too late in callbacks

you might miss your chance.

## Promise.all
What if you have many async activities? All of them need to be resolved
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



[problem-with-promises]:https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
[axios]:https://github.com/axios/axios
[heimdall]: http://marvelcinematicuniverse.wikia.com/wiki/Heimdall
[sauron]: http://lotr.wikia.com/wiki/Eye_of_Sauron
[minimum-time-not-guaranteed]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
[async-foundations]:/post/javascript-run-to-completion-event-loop-asynchronous-foundations/