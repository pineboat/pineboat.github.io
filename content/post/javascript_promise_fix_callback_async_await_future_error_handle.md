---
draft: true
author: "vijayabharathib"
title: "JavaScript Promises Can Help You Fix Async Hell"
subtitle: "Promises are the new return type of most of the asynchronous web APIs in JavaScript. They are much friendlier on your brain. Promises help you handle errors better."
date: "2018-06-11T08:15:59+05:30"
publishdate: "2018-06-11T08:15:59+05:30"
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

## Non-Blocking Promises

You give the Promise a job. It might take its own sweet time, just like any other block of code. But you can trust on it to let you know if the task was fulfilled or something went wrong along the way.

That's why promises are an elegant alternative to plain callbacks. They just notify you when they are ready. You can observe and take action as necessary through `then` and `catch`. 

Here is a use case where you can to put Promises to use. 

Let's say you want to request a data from server and update the UI. Let's look at a traditional order with synchronous activities.

* Prepare the shell UI (2 seconds)
* Request and receive Data (4 seconds)
* Update UI (2 seconds)

On the whole, that would take about 8 seconds.

Here is how it looks:
![image showing three activities happening one after another](/img/007_promises/callback_sequential.png)

The **Promise** async activity sequencing allows you to re-order things and achieve better results.

* Request and receive data in the background(4 seconds)
* Prepare shell UI in the main thread **in parallel** (2 seconds)
* Update UI (2 seconds)

This sequence ends in 6 seconds, 2 seconds earlier than the previous approach. Here is a visual:

![async parallel activities finishing earlier](/img/007_promises/parallel_promise_async.png)

*Trivia:* I've reused [mozilla css-grid playground](https://mozilladevelopers.github.io/playground/css-grid/) to arrive at those images above. An occupational hazard when you know how to move things around using CSS, that becomes your design tool of choice. Nor Photoshop, neither GIMP, it's CSS. 

All righty, you ready to dive?

## Table Of Contents

Here is a preview of what you'll go through:

* [Warm up with Event Loop](#warm-up-with-event-loop)
* [The Problem with Inversion of Control](#the-problem-inversion-of-control)
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

All right, now that you know more about **Event Loop** and **Run to Completion**, let's head straight into problems.

## The Problem - Inversion of Control

We are going to get to the *root* of the promises. But it helps have a good look at the *tree* first. You need to see an example to appreciate what Promises are capable of (*Don't worry about the details now*).

**Inversion of control** is when you rely on another party to control the flow of your code. Another party could be a third party library or a library written by another developer in your organization, or it could be another piece of code you've written.


Here is one using callback from jQuery days. Let's write a letter to jQuery:

>Dear jQuery, make an asynchronous call to this URL. If you get successful response, please call the function tagged against `success` attribute. In case you see any error, kindly call the `error` callback function given. Thank you. You're awesome!

The same letter in JavaScript:
```js
$.ajax({
    url: apiURL,
    success: function(data){
      //valid data from HTTP
      $('#count').append(data);
    },
    error: function(xhr,status){
      //HTTP or parsing error
      $('#error').append(status);
    }
});
```

You've handed over several things to jQuery. Here is the list:

1. jQuery to make a network call
2. jQuery decide if it likes the result
3. jQuery to call `success` when it likes the result
4. jQuery to call `error` when it is not so happy

That's what **inversion of control**. You gave control to jQuery for a long time. That's not jQuery's fault (or any other library's fault). That just happens to be one of the best ajax solutions we ever had.

Now, ask yourself these questions.
* What happens when jQuery does not get a response?
* What happens when jQuery calls the wrong callback?
* What happens when the `success` callback fails?
* What happens when the `error` callback fails

Promises to rescue!

Now, an example with [Fetch API][using-fetch] that uses Promises:

```js
fetch(apiURL)
  .then(validate)
  .then(data => $('#count').append(data)))
  .catch(error => $('#error').append(status););

//a simple validate function
function validate(response){
  if(response.ok){
    return response.body;
  }else{ 
    throw new Error(response.statusText);
  }
}
```

What is different here? Who has more control?

Here is our order to `fetch`, let's make a list:

1. make a network request to URL
2. send the response if you get a HTTP response
3. throw an error if there is a network error
4. this goes without saying, but I'll handle what to do with your response/error.

That seems to be attractive in terms of having more control and composing functions, isn't it?

The `catch` is used to catch all errors in this instance. Any network error thrown by `fetch` and also `404` error thrown by our own `validate` function will be processed by `catch`.

As you'll see later in this article, you can also catch errors at specific positions within the flow. But, I hope this example inspires you to invest more time learning promises here.

## What Are Promises?

Here is a definition from [MDN on Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), I have tagged it :

>The Promise object represents the eventual completion **[1]** (or failure) **[2]** of an asynchronous operation **[3]**, and its resulting value **[4]**.

The network request using `fetch` is a fitting example to explain the tagged numbers.

* `[3]` - network request is an asynchronous operation.
* `[1]` - its completion will result in the promise resolving, leading to `then` part of the chain.
* `[2]` - a network failure will reject the promise, leading to `catch` part of the chain.
* `[4]` - the resulting value from `fetch` is the response

Here is the example for above statements in all its JavaScript glory:
```js
fetch(url)
  .then(processData)
  .catch(handleError);
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

Both could be you. But there are times when someone else creates a promise based API and other developers end up using them. [axios] is one such library. `fetch` API in the browser is one another example. 

We do not get to decide when to resolve/reject the `fetch` API, but we end up writing *callbacks* to handle successful resolution with a response and also tragic rejections due to network errors.

As a recap for possible states, with some JavaScript syntactic sugar:

* Resolved
* Rejected
* Settled = (Resolved || Rejected);
* Pending = (!Resolved && !Rejected);

### Syntax & Components

It's time already. Let's dive right into some code. The syntax for promises look like this:

```js
const promise = new Promise(
  (resolve, reject) => {

  //asynchronous computation  
  asyncActivity();
  
  if(is_all_well){
    //resolve when things are ok
    resolve(result); 
  }else{
    //reject on error
    reject("Err..");
  } 
});

promise
  .then(processResult) 
  .catch(handleError);
```

A new Promise takes a function as parameter. That function takes two parameters, which are also functions.

The function passed to `new Promise` is the heart of this piece of code. You will do your asynchronous operation within this function. Based on the result, you'll also determine whether to resolve or reject the promise.

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
In this example, you had control to decide when to call `resolve` or `reject`. There are also scenarios when you let other API take control. Let's see an example.

### Geolocation Promisified

If that was too hi-tech and you hear the earth warming up at the very mention of the word *BlockChain*, here is another example. 

I've created a [CodeSandBox for Promisified version of geolocation API](https://codesandbox.io/s/jv3x2ypn6y).

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

The location API is still based on **callbacks**. But instead of letting that `getCurrentPosition` directly call the callback functions, we've wrapped it around a promise. 

Now the result of `getCurrentLocation` is retained in `location` and you can decide what to do `then`. 

Pay attention to the deterministic nature of the last 3 lines above. It shows what can you expect without taking too much of cognitive load. ...*and that's what I mean by predicting the future, just in case you came in here expecting something else.*

## Promising Features

There are few really impressive traits about Promises that you need to master. Trust me, they don't just equip you with the power but they also save you from lot of hassle.

### Immutable and Re-Usable

One of the key attributes of a Promise is, **the value contained within a Promise is immutable**. That is, once settled, you can use the result as many times as you want. No amount of messing up with the result is going to mutate the original result contained within the Promise.

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
  .then(x=>x+2) //1+2=3 (not 4+2=6)
  .then(x=>x*x) //3*3=9
  .then(console.log); //9
```
Let's go line by line. The first one with `Promise.resolve()` is the easiest way to convert any data into *promisified* object.

We are just passing the literal value 1 and we are getting a promise object in return. The returned promise wraps around the value 1. It is also settled immediately, as there is no async activity here.

Now, the next set of lines try to use the `promise` object by chaining `then`. `then` takes a function as parameter. I'm using arrow functions to add and multiply the values.

As you can see, `promise` retains its original value of `1` even after we called a few `then` on it. That's why the second time `promise` is used, it starts with value 1.

This is important. 

>The value of a promise is immutable. It cannot be changed.

### Streams are Mutable

Not exactly, but I wanted to grab your attention.

The catch in this pattern of re-using promise results is related to network responses. I'm using [jsonPlaceholder](https://jsonplaceholder.typicode.com/) service, which is a free mock API available without any registration, for you to try  It returns `id`, `userId` and `title`.

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

>Be careful about re-using network responses. These responses are streams. Once consumed, you cannot reuse it from scratch again. Reusing works only for objects and literal values, but not for streams. 

Why does it happen? Why the body stream was changed? 

The answer is, the promise is not mutated. The stream was mutated. A stream once consumed cannot be consumed again.

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
  .then(json => 
    console.log(json[0].id)); //1

data
  .then(json=>
    console.log(json[0].username)); //Bret
```

In this solution, we've stored jsoned the data in a variable named `data`. That's a promise object. You have the json data wrapped around a promise named `data`. As shown above, you can use the `data` again as many times as you want.

But you cannot use the `result` anymore as you have consumed the response stream.

Note: I thought of claiming credit for coining that word `jsoning`, but [Google](https://www.google.com/search?q=jsoning) already has more than 4000 results. Phew.




### Chaining

You've seen that we've been chaining outputs using `then`. We've also seen that `then` wraps the return value from callback with a Promise and returns a promise object. That begs the question, **what if you do not return any value from callback?**

```js
let p=Promise.resolve(2);
p.then(x=>x*x) //4
 .then(console.log) //4
 .then(console.log) //undefined!!?
```
What happened here? Promise, that's what happened.

`then` returns a promise, even if the callback passed to `then` returns a literal value. That's why you are able to chain on `then`

`x=>x*x` returned 4. `then` wrapped it as a promise and returned it. The first `console.log` received that value and printed it, but it **did not return anything**. So the next `console.log` received `undefined`.

>Always return some value from `then` / `catch` to be able to chain further.

## Error Handling

There are three patterns of error handling. That you need to know. 

1. Error handling within `then`
2. Handle error using `catch`
3. Mix of both
4. Mix of all three

You are wondering why did I say three, right?

We are going to look at all of them in detail.

### Handle error in `Then`

The `then` call on a promise actually takes two functions. One to handle success and one to handle error.


```js
promise
    .then(
      handleResult,
      handleError
    );
```

The error handler above can handle any error from `promise` async call. It could be a rejected `promise. 

*But there is a problem*. It cannot handle any error from within `handleResult`. The next type solves it.

### Catch Errors

A `catch` call can look for any errors from the async activity and also from any `then` calls that happen before the `catch`.

Slightly modified version here:
```js
promise
    .then(handleResult)
    .catch(handleError);
```

Now, any rejected `promise` and also any errors from calling `handleResult` are caught by `catch` and processed.

But there is a problem. This single catch seems to be processing too many errors.

### Mix of Inline and Catch

A combination of error handling callback to `then` and also a catch after then can save the day.

For example,

```js
promise
  .then(
    handleResult,
    handleRejectedPromise
  ).catch(errorFromHandleResult);
```

### Balanced Error Handling

The fourth one is where you mix all of the above to arrive at an optimum result.

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

`errorUpToNow` handles three errors:

1. a rejected promise
2. any error from callback1
3. error from callback2

Another important feature is, if you pass a valid value from `errorUpToNow` function, `callback3` will receive it and the chain will progress.

But if you wanted to break the chain and hand the control over to next `catch`, you **need to throw an error**.

## The Inevitable Finally

Did I mention there is a fifth option for handling errors. I didn't. Because, I didn't want you to think there is too much of error handling. 

Also, `finally` is not an error handling feature. It's rather an option to run a piece of code irrespective of the result of the promise action. 

It works like this:

```js
let p=Promise.resolve(2);
p.then(cb1)
 .catch(eh1)
 .finally(()=>{
   // all over
   // clean up
   // inform
   // //wind up
 });
```

Key things to remember about `finally`:

1. It does not take any parameters (as it does not worry about whether the promise chain is rejected or resolved)
2. It returns the same promise back to you. You do not need to return anything from that callback sent to `finally`.

Point 2 seems to be weird, isn't it? 

Show me the code:
```js
let p=Promise.resolve(1);
let q=p.then(x=>x+2)
       .finally(()=>{console.log("All Clear")});

q.then(console.log); //3

```

In the example above, result of `finally` was assigned to the variable `q`. As you can see, the callback sent to `finally` just printed a String `All Clear`. It did not return any value.

But `finally` implicitly returned the, wait for it, **final result** of the promise chain. In this case, the last Promise returned from `then` had a value of 3.

Had the Promise been rejected, `finally` would then send that rejected Promise back to you after the callback. It does not care about the settlement state.

**Compatibility Warning**: `finally` is a stage 4 proposal already implemented on major browsers. But the browser compatibility is not as good as rest of the Promise API features (as of this writing in June 2018). Check this [compatibility table on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally). 

## Racing with Promises

## Promises Are MicroTasks

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



## Own The Pattern

The takeaway from this article does not end with an understanding of Promises.

This is an interesting pattern isn't it? You can create your own objects with such pattern. Add immutability to the DNA and send it out to the whole world to see.

```js
const Wrapper = val => ({
    then: func => Wrapper(func(val)),
    toString: () => `Wrapper(${val})` 
});

//literal values
let x=Wrapper(10);
x.toString(); //Wrapper(10)
x.then(console.log); //10
x.then(y=>y*y)
 .then(console.log); //100

//objects
let y=Wrapper({key: 10});
x.toString(); //Wrapper(Object object)
x.then(console.log); //{key: 10}

```

The `then` callback has a trick up its sleeves. It doesn't just call the function. It wraps the returned value of the callback in the same `Wrapper` and returns that.

In this pattern, while literal values are immutable, objects passed can be mutated (by mutating their content).

Have a look at [Professor Frisby's Introduction to Composable Functional Javascript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript). It's free and inspiring. You'll get to know more about functional programming. But, you'll also see the above pattern described in much more detail.

I hope that inspires you to try out different solutions on this pattern.

## References:

* [Callbacks @ YDKJS][ydkjs-callbacks]
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
[ydkjs-callbacks]:https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch2.md
[using-fetch]:https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch