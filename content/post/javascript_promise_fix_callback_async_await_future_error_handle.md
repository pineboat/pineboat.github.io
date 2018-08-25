---
author: "vijayabharathib"
title: "Re-Think Promises When You Write Async JavaScript"
subtitle: "Promises are the new return type of most of the asynchronous web APIs in JavaScript. Much friendlier on your brain. They help you handle errors better. Also, to have more control"
date: "2018-06-15T19:39:59+05:30"
publishdate: "2018-06-15T19:39:59+05:30"
tags: ["Javascript","ES6","Promises","Async","Await","Callbacks"]
categories: ["Web Development"]
image: "/img/007_promises/javascript_promises.png"
image_alt: "JavaScript Promises"
image_credit: "Patterns from trianglify.io"
---

JavaScript Promises give you excellent control over program flow and composing functions. Promises help you with increased flexibility to sequence asynchronous activities and handle errors. **A whole new generation of Web APIs are starting to use Promises**. [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) and [Notifications](https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission) are some of the examples where Promises are taking over callbacks.   

They are very easy to use once you understand the underlying constructs. But if you get carried away by looking at the simplicity of API, you might end up learning lessons the hard way. 

Chances are, you already got your fingers burned by Promises. We are on the same boat. No? Then you must be part of the rare species that read the manual before operating an equipment or a gadget. 

I didn't read the manual. I dived head first into using promises [without adequate understanding][problem-with-promises]. No third-degree burns, but a couple of frustrated hours on the debugger. That's the genesis of this article.

>This article aims to help you understand the pitfalls of async code and how Promises help you with more control. Leaves you with a taste of async-await.

Promises are not entirely new. They have been around longer than most of us would imagine. The browser support is [good too](https://caniuse.com/#search=promises) and you can find [polyfills](https://github.com/stefanpenner/es6-promise) if you had to support browsers that do not support Promises yet. 

## TL;DR

Promises have a simple API with `resolve`, `reject`, `all`, `race`, `then`, `catch` and `finally` (seriously, that's it). They give you control over order of Async execution. Async/Await API also uses Promises to further simplify async code. It's worth investing your time on. 

## Table Of Contents

Here is a preview of what you'll go through:

* [Why Async?](#why-async)
* [Warm up with Event Loop](#warm-up-with-event-loop)
* [The Problem with Inversion of Control](#the-problem-inversion-of-control)
* [What are Promises?](#what-are-promises)
* [Constructing & Consuming Promises](#constructing-and-consuming-promises)
* [Promise Features](#promising-features)
* [Error Handling](#error-handling)
* [Promise.finally](#the-inevitable-finally)
* [Racing with Promise.race](#fastest-with-promise-race)
* [Consolidating with Promise.all](#iterating-with-promise-all)
* [Promises Are MicroTasks](#promises-are-microTasks)
* [Own The Box Pattern](#own-the-box-pattern)
* [Bonus Example](#bonus-example)
* [Async/Await](#async-await)
* [References](#references)

## Why Async?

You give the Promise a job. It might take its own sweet time, just like any other block of code. But you can trust it to let you know if the task was fulfilled or something went wrong along the way.

That's why promises are an elegant alternative to plain callbacks. They just notify you when they are ready. You can observe and take action as necessary through `then` and `catch`. 

Here is a use case where you can to put Promises to use. 

Let's say you want to request a data from the server and update the UI. Let's look at a traditional order with synchronous activities.

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

2 seconds ~= $2_000_000 if you are a big corporation. *All righty, got a reason to dive deep?*

## Warm up with Event Loop

Before you start using Promises, you need to know about [Event loop and Run to completion](/post/javascript-run-to-completion-event-loop-asynchronous-foundations/). They are the two most important functionalities of the browser you need to come to term with. Only then will you be able to understand how asynchronous code is executed and how Promises solve important problems. 

Read [that article](/post/javascript-run-to-completion-event-loop-asynchronous-foundations/), this can wait. Or any other article on that subject from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)/[ExploringJS](http://exploringjs.com/es6/ch_async.html#sec_browser-event-loop)/[YDKJS](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch1.md#event-loop).

Now that you know more about **Event Loop** and **Run to Completion**, let's head straight into problems.

## The Problem - Inversion of Control

We are going to get to the *root* of the promises. But it helps to have a good look at the *tree* first. You need to see an example to appreciate what Promises are capable of (*Don't worry about the details now*).

**Inversion of control** is when you rely on another party to control the flow of your code. Another party could be a third party library or a library written by another developer in your organization, or it could be another piece of code you've written.

Here is one using the callback from jQuery days. Let's write a letter to jQuery:

>Dear jQuery, make an asynchronous call to this URL. If you get a successful response, please call the function tagged against `success` attribute. In case you see any error, kindly call the `error` callback function given. Thank you. You're awesome!

The same letter in JavaScript:
```js
$.ajax({
    url: apiURL,
    success: data=>{
      //valid data from HTTP
      console.log('success',data);
    },
    error: (xhr,status)=>{
      //HTTP or parsing error
      console.log('error',status);
    }
});
```

You've handed over several things to jQuery. Here is the list:

1. jQuery to make a network call
2. jQuery decide if it likes the result
3. jQuery to call `success` when it likes the result
4. jQuery to call `error` when it is not so happy

That's what **inversion of control** is. You gave control to jQuery for a long time. That's not jQuery's fault (or any other library's fault). That seems to be one of the best ajax solutions we ever had at that time. 

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
  .then(data => console.log('success',data))
  .catch(error => console.log('error',error));
```
*Note*: [Arrow functions][arrow-functions] are used in the example above and a lot many times later in this article. Get comfortable with them.

The `validate` function's implementation details are not important now. It just ensures the response is ok to move forward to next level of processing.

What is different here? Who has more control?

Here is our order to `fetch`, let's make a list:

1. make a network request to the URL
2. send the response if you get an HTTP response
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
 * any computation that might take awhile to arrive at a result 

## Constructing and Consuming Promises

You'll go through a few keywords used to talk about promises first and then on to creating and using your own promises in this section.

### Promise States

Before you move forward. You need to understand these terms around the state of promises. 

State | Description
------|------------
**Pending** | When you first invoke a promise, it will be in the **Pending** state. That means the async activity is still underway.
**Settled** | When the async activity is over, the Promise has to move to the **Settled** state. 
**Resolved** | When **settled successfully**, the Promise moves to **Resolved** state.
**Rejected** | If there is an **error while settling** the promise, then the state would be **Rejected**.

The developer who is creating the Promise based API can control when to settle the promise. She will also decide when to resolve it and when to reject it.

The developer who is consuming the Promise based API has the next set of controls. She can decide what to do when the promise is resolved. She can also decide how to handle errors when the promise is rejected.

Both could be you. But there are times when someone else creates a promise based API and other developers end up using them. [axios] is one such library. `fetch` API in the browser we've seen earlier is another example. 

We do not get to decide when to resolve/reject the `fetch` API, but we end up writing *callbacks* to handle successful resolution with a response and also tragic rejections due to network errors. Once, again, the `fetch` API itself has no provision to call our *callbacks*. It just returns a Promise.

As a recap for possible states, with some JavaScript syntactic sugar:

* Resolved
* Rejected
* Settled = (Resolved || Rejected);
* Pending = (!Resolved && !Rejected);

There is no built-in method in the Promise API to get the current state. You should also avoid trying to get it (as a call on `then` or `catch` will automatically take the sequence forward). However, if you wanted to experiment, start [from this stackoverflow thread](https://stackoverflow.com/questions/30564053/how-can-i-synchronously-determine-a-javascript-promises-state).

### Syntax & Components

It's time already. Let's dive right into some code. The syntax for promises look like this:

```js
//Constructing
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

//Consuming
promise
  .then(processResult) 
  .catch(handleError);
```

A new Promise takes a function as the parameter. That function takes two parameters, which are also functions.

The function passed to `new Promise` is the heart of this piece of code. You will do your asynchronous operation within this function. Based on the result, you'll also determine whether to resolve or reject the promise.

That's just creating promises.

You pass the actual `resolve` and `reject` functions when you consume promises. The callback function in place of `resolve` has to be sent to `then` call. `reject` callback is sent to `catch`.

In this example, `processResult` is used as the `resolve` callback through `then`. `handleError` is used as `reject` callback through `catch`.

### Example 1
Let's build state of the art BlockChain mining program with that knowledge:

```js
const startMining=()=>{
  return new Promise((resolve, reject) => {
    result=mineBlock();
    if(result==all_Ok)
      resolve(result);
    else
      reject("All are taken!");
  });
}

const mined=startMining();

mined
  .then(creditBitCoin)
  .catch(badNewsFirst);

```

In this example, you had control to decide when to call `resolve` or `reject`. There are also scenarios when you let other API take control. Let's see an example.

### Geolocation Promisified

If that was too hi-tech and you hear the earth warming up at the very mention of the word *BlockChain*, here is another example. 

Try to promisify `geolocation` API, which is still using callbacks directly. The `getCurrentPosition` function takes a `success` callback and an `error` callback. 

You can use them to resolve/reject a promise. 

I've created a [CodeSandBox for a Promisified version of geolocation API](https://codesandbox.io/s/jv3x2ypn6y).

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
let location = locate();

//use results when Promise is resolved
location
  .then(showPosition)
  .catch(positionError);
```

The location API is still based on **callbacks**. But instead of letting that `getCurrentPosition` directly call the callback functions, we've wrapped it around a promise. 

Now the result of `getCurrentLocation` is retained in `location` and you can decide what to do `then`. 

Pay attention to the deterministic nature of the last 3 lines above. It shows what can you expect without taking too much of cognitive load. 

### Promise.resolve

Another simpler way to create Promises is to use methods `resolve` or `reject` directly on the Promise. You can pass a literal value or another promise object to these methods.

Take a look at this example:
```js
let promise=Promise.resolve(1);

promise
  .then(x=>x+2) //1+2=3
  .then(console.log); //3
```

We are just passing the literal value 1 and we are getting a promise object in return. The returned promise wraps around the value 1. It is also settled immediately, as there is no async activity here.

First `then` call takes the value `1`, adds `2` to it and returns `3`. Next `then` call takes the promise from `then`, unwraps 3, passes it to `console.log` which eventually prints it.

**Warning**: just passing `console.log` to a `then` call breaks the chainability. Keep in mind that this is only for demonstration. Later sections will tell you why it breaks the chain.

What if you pass a promise instead of literal value?

```js
let p=Promise.resolve(1);
let q=Promise.resolve(p);
p.then(console.log); //1
q.then(console.log); //ALSO 1 !!
```

As you can see, even if you pass a promise to `Promise.resolve`, it has internally unwrapped the value. That's why `q.then` prints 1 instead of promise object. Otherwise, you'll end up getting into the [Pyramid of Doom](http://callbackhell.com/) using Promises too.

### Promise.reject

This one is easy. The same way you get a promise by directly calling `resolve`, you can get a `rejected` promise by calling `reject.

Watch what happens to `then`:
```js
let p=Promise.reject(1);
p.then(console.log)
 .catch(e=>console.log("Ouch! " + e ));

// Ouch! 1
```
The `then` is ignored in this case, as the promise's state is rejected. Only the `catch` call is invoked. 

Now, what if you pass a rejected promise to `Promise.resolve`? Will it be resolved?

```js
let p=Promise.reject(1);
let q=Promise.resolve(p);
p.then(console.log); //1
q.then(console.log)
 .catch(e=>console.log("Ouch!")); //Ouch!
```

*The answer is, No*. Passing a rejected promise to `Promise.resolve` will still return the rejected promise to you. ...and that makes sense, what would you do with the error within the rejected promise had it been resolved?

## Promising Features

There are few really impressive traits about Promises that you need to master. Trust me, with great power, comes greater responsibility. You'll save yourself from a lot of hassle when you understand these traits.

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

First, we create a resolved promise with a value 1.

Next set of lines try to use the `promise` object by chaining `then`. `then` takes a function as a parameter. 

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

Why does it happen? Why was the body stream changed? 

The answer is, the promise is not mutated. The stream was mutated. A stream once consumed cannot be consumed again.

Think of this as mutating the content of a `const` object:
```js
const c1={a:1, b:2};
c1.b=4;
console.log(c1); //{a:1, b:4}
```
The stream is also something similar. Some streams can be consumed only once. 

Then how do we re-use network responses? Obviously, you do not want to make another network request for the same data.

Sure, good question. **You [clone that response stream](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone) and consume that cloned stream.** That will leave the original response intact for further use at a later point in time.

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

APIs such as [Service Workers][service-workers] may need the response stream cloned. You might use the `response` many times to look into its other components. You will have to keep the response alive. But if you are sure you just need the data, you can move on to a better solution with the following pattern.

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

In this solution, we've stored jsoned the data in a variable named `data`. That's a promise object. You have the JSON data wrapped around a promise named `data`. As shown above, you can use the `data` again as many times as you want.

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
4. A mix of all three

You are wondering why did I say three, right?

We are going to look at all of them in detail.

### Handle error in `Then`

The `then` call on a promise actually takes two functions. One to handle success and one to handle the error.

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

Another important feature is if you pass a valid value from `errorUpToNow` function, `callback3` will receive it and the chain will progress.

But if you wanted to break the chain and hand the control over to next `catch`, you **need to throw an error**.

## The Inevitable Finally

Did I mention there is a fifth option for handling errors? I didn't. Because I didn't want you to think there is too much error handling. 

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
    //wind up
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

In the example above, the result of `finally` was assigned to the variable `q`. As you can see, the callback sent to `finally` just printed a String `All Clear`. It did not return any value.

But `finally` implicitly returned the, wait for it, **final result** of the promise chain. In this case, the last Promise returned from `then` had a value of 3.

Had the Promise been rejected, `finally` would then send that rejected Promise back to you after the callback. It does not care about the settlement state.

**Compatibility Warning**: `finally` is a stage 4 proposal already implemented on major browsers. But the browser compatibility is not as good as rest of the Promise API features (as of this writing in June 2018). Check this [compatibility table on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally). 

## Fastest with Promise.race
Promise API provides a `race` method that allows you to get the fastest response from many different possible inputs.

Let's say your data is geographically distributed. You want to try and get data as much as possible, but you do not want to figure out closest data center manually.

You can outsource that job to `Promise.race`. It takes an iterable list of promises, conducts a race and returns the first one to resolve/reject. 

>Ouch! That would mean, if any URL rejects first due to network error, you'll get only that rejected promise. But, stay with me for the demonstration (you can figure out a solution for that rejection later).

Here is something that you can start with:

```js
const US=fetch(US_URL);
const EU=fetch(EU_URL);
const ASIA=fetch(ASIA_URL);

// by this time above fetches 
// are in progress
// some of them may resolve
// before next line

let fastest=Promise.race([US,EU,ASIA]);

fastest.then(delightUser)
       .catch(countMistakes);

```

A bit more streamlined version:

```js
let urlList=[
 "https://us.pineboat.in",
 "https://uk.pineboat.in",
 "https://sa.pineboat.in"
];

const fastestResponse = list => {
  let promises=list.map(url => fetch(url));
  // REMEMBER, by this time
  // all fetches are already
  // underway and some may settle
  return Promise.race(promises);
} 

let res=fastestResponse(urlList);

res.then(updateUI)
 .catch(failInStyle);

```

Here, the `fastestResponse` takes an array of URLs and sends `fetch` requests to those URLs. The array of promises returned from the map function will already have `fetch` requests receiving response. `Promise.race` returns the first to resolve/reject.

*Warning*: We just introduced a subtle bug. If the second URL rejects first and first URL resolves successfully, before we even reach the `Promise.race`, then you'll get the resolved result. **This wouldn't happen if all promises are in pending state when `Promise.race` starts**.

People also use `Promise.race` to timeout network requests beyond certain time limit. Here is an [example from David](https://davidwalsh.name/fetch-timeout).

## Iterating With Promise.all

While there can be only one winner in a `race`, UI development is no race. At least not all the time. Sometimes, you need all the runners to reach the line for the race to be successful.

Imagine for a second you are building a Geo Chart that shows sales across countries. All you have is a list of URLs for each country. You need to make a network request to each URL and present their results in the chart. 

Now, you do not want to run a race. Instead, you need all the data. Missing any single data might mislead your CEO. Uh ho!

You are in safe hands with `Promise.all` here. It is very similar to `Promise.race`. It takes an iterable list of promises, like an array of promises. It also returns a single settled promise.

**But `Promise.all` returns a promise that contains the list of values returned from each promise in the list passed to `Promise.all`.** 

SHOW.ME.THE.CODE:

```js
let urlList=[
 "https://us.pineboat.in",
 "https://uk.pineboat.in",
 "https://sa.pineboat.in"
];

const everyResponse = list => {
 let promises=list.map(url => fetch(url));
  return Promise.all(promises);
} 

let res=everyResponse(urlList);

res.then(updateCountries)
 .catch(failInStyle);

const updateCountries = list => {
  list.forEach( country => updateUI);
}
```

In this result, you have access to every result from each individual promises sent to `Promise.all`. That's the whole difference.

In case one of the promises in the list is rejected, `all` method returns a rejected promise with that error message. 

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

For example, `setTimeout` gets access to a parallel thread, it is used **only to wait until the timeout**. In this case, 0 seconds. That means it is sent back to the queue right away.

Promises also do something similar. In that, they do their async activity away from the main thread. But the result of that passed to `then` needs access to the main thread.

Now we have a race condition. Sort of, but not really. 

Promises are part of the microtask family. [Jake's talk on Event Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0) is an awesome one in understanding where they stand in order of priority. 

>Microtasks such as promises get priority access to queue followed by other tasks initiated by setTimeout

That's why `promise` is printed right after `insider`. Finally, `timeout` is printed. Here is the whole story:

* `insider` is printed right away from the current scope.
* `timeout` takes a round-trip
* `promise` takes a round-trip
* `timeout` and `promise` meet each other
* `promise` takes priority

...and they lived happily ever after.

After all this, if you ever write code like the following one, you'll spend rest of your lives in devtools.

```js
let data;
fetch(url).then(res=>{
 data=res.json();
});
render(data); //undefined
```

You need to remember, `let data;` and `render(data)` will be executed immediately, but `fetch` takes an async round trip via event loop. So `render` is called even before the `fetch` can assign a meaningful value to `data`.

## Own The Box Pattern

The takeaway from this article does not end with an understanding of Promises.

**Thenable** or **Chainable** is an interesting pattern isn't it? You can create your own objects with such a pattern. Add immutability to the DNA and send it out to the whole world to see.

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

## Bonus Example

Remember the first ever code block you read in this article. It was on jQuery. I thought translating that into promisified code could be a fitting end to understanding promises.

```js
$.ajax({
    url: apiURL,
 success: (data)=>{
 //valid data from HTTP
 console.log(error);
    },
 error: (xhr,status)=>{
 //HTTP or parsing error
 console.log(error);
    }
});
```

```js
const good = data => 
 console.log(data);

const bad = error => 
 console.log(error);

const promisifiedAjax = (apiURL) => {
  return new Promise((resolve,reject)=> {
  $.ajax({
          url: apiURL,
          success: resolve,
          error: reject
  });
 }
}

let res=promisifiedAjax(apiURL);

res.then(good).catch(bad);

```
In a way, this is similar to promisifying `geolocation` we have done earlier. In case it didn't make sense at that time, hope this serves as a recap as you know more about promises now.

## Async-Await

This article will be incomplete if I do not talk about the new Async/Await pair introduced to make, well, Async code easy to read. It makes Async Code look like synchronous code, but let's other tasks get access to main thread while async activity is in progress. 

```js
async function ajax(url){
 let response=await fetch(url);
 let json=await response.json();
 console.log(json);
}
```

Do you see the difference? All the `then` chaining is replaced with `await` prefix. Wherever you see `await`, the action happens in the background while the control waits on the same line. 

Since the activity is happening in the parallel thread, it does not block the main thread.

Now to finish off with how sync and async play together, two examples using `ajax` above.

Async used inside sync:
```js
function syncTest(url){
 ajax();
 console.log("end");
}

syncTest();
//end
//response from ajax
```

That's not what you intended, but not new either. This is very similar to using `setTimeout`.

Now, let's put the same under async flag:
```js
async function asyncTest(url){
 await ajax();
 console.log("end");
}

asyncTest();
//response from ajax
//end
```
There you go! Now you get to have the sequence you always wanted. **Much friendlier on your brain**. Remember or heard of [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG)? What you see is what you get.

That's it about Async-Await for now. There is more to it in terms of syntax. I'd encourage you to explore further. I might even write about it in detail one day. 

## References:

* [Callbacks @ YDKJS][ydkjs-callbacks]
* [Exploring JS](http://exploringjs.com/es6/ch_promises.html) 
* [Promises/A+ One-Page Specification](https://promisesaplus.com/)
* [Problem with Promises][problem-with-promises]

## Thank you

Remember, the next time you want to use a new feature, tell yourself to read the specs first. No, I'm just kidding.

Hope this has been useful! Thank you for staying with me so far. If you think your friends and colleagues will benefit, [please do share](#share) this wider 


As usual, I've created a [space for us to have discussions](https://github.com/pineboat/pineboat.github.io/issues/6). Feel free to write back.

Thanks! Speak to you soon.

[problem-with-promises]:https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
[axios]:https://github.com/axios/axios
[heimdall]: http://marvelcinematicuniverse.wikia.com/wiki/Heimdall
[sauron]: http://lotr.wikia.com/wiki/Eye_of_Sauron
[minimum-time-not-guaranteed]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
[async-foundations]:/post/javascript-run-to-completion-event-loop-asynchronous-foundations/
[ydkjs-callbacks]:https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch2.md
[using-fetch]:https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[arrow-functions]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[service-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
