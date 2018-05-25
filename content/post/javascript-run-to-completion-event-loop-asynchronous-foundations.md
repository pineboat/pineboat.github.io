author: "vijayabharathib"
title: "Think Event Loop When You Want to Run to Completion"
subtitle: "Event loop in the browser and the promise to Run to Completion are the two key aspects of Asynchronous JavaScript"
date: "2018-05-24T08:15:59+05:30"
publishdate: "2018-05-24T08:15:59+05:30"
tags: ["Javascript","Async","Event Loop"]
categories: ["Javascript"]
image: "/img/006_event_loop/eventloop_run_to_completion.jpg"
image_alt: "Children running"
image_credit: "Photo by Ban Yido on Unsplash"
---

Any block of Javascript code that enters the main thread will run until completion of the last line. That much you can be sure. But Event Loop is the unsung hero who helps developers run pieces of code outside of the main thread.

This post aims to help you get started on **Event Loop** and **Run To Completion** with a simplified mental model. That model should help you reach deeper into these topics. Your final stop will be the specs before you master the art of asynchronous JavaScript behavior in Browser environment.



## Run to completion

Any javascript function/scope of code will run until the very end of the program without interruption. Even if there is a callback that is initiated in the middle. I am not talking about an immediate function call. A function call that is sent to the parallel thread for processing, such as the ones initiated via `setTimeout`. 

Which is why, adding event handlers after starting a request works. Because, event handlers will be added irrespective of the time we get a response. 

Let's look at an example. **Don't try this at home**. If you must, better put it in a `.js` file and run it from node, so that you can break the execution with `ctrl+c`. I wouldn't suggest this on a browser. You'll be lucky if you get an **Unresponsive Script** popup that gives you an option to stop the script and recover the browser. 

```js
let infinite=true;
setTimeout(function(){
 infinite=false;
},10000);
while(infinite){
 console.log("still running",Date.now());
}
```

You would normally expect that code to keep printing `still running` for 10 seconds and then stop. But would it stop? I wouldn't ask you if it stops, would I?. No, it keeps running until you stop it manually / close the browser.

What's wrong here? Nothing is wrong, everything is going as planned. Just the work of **run to completion**. Here is how it turns out.

1. Block of code moves to the stack
2. set `infinite` to `true`. line 1 done.
3. run `setTimeout` function call
3.1 send that anonymous function to heap/parallel thread
3.2 ask heap to add it to the queue after 10 seconds
3.3 line 2 done.
4. start the while loop
5. `infinite=false` from the callback waits on the queue
6. `infinite` still `true` on stack
7. Heap sends the function to queue
8. `infinite` still `true` on stack
9. Queue puts that function on hold, as stack is busy
10. `infinite` still `true` on stack
11. Queue cannot run `infinite=false` until stack gives up
12. `infinite` still `true` on stack
13. Stack is busy as `infinite` is still true
14. and
15. so
16. on
17. ad
18. infinitum

It turns out, the stack is so busy running the `while` loop, our short function to turn off `infinite` never gets a chance to get into the stack. That's a deadlock.

You will learn more about those queues and heaps in a moment.

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
4. get the next order from queue (`asyncPrint` will eventually reach here)

Queue will send whatever is at the front. It could be the `asyncPrint` function you sent through `setTimeout` or another user action on the browser that beat you to the front of the queue within milliseconds. Which is why [MDN][minimum-time-not-guaranteed] says, **Within the setTimeout invocation, the second argument indicates a minimum time and not a guaranteed time.**

Now that you understand **Run to Completion**, it is time to look at the queues and heaps thrown at you. And it starts with a story.

## Event Loop

Approximately 13 billion years ago, big bang explosion from a singularity set in motion a series of events to form our universe. These conclusions change faster than a fresh JavaScript library, but the last time I checked **Time** is one of the by-products of that big bang. And now, developers play with that `time` to build all sort of useful and fun-filled user experiences. 

Users, on the other hand, never care reading through the HTML, CSS or JavaScript before using a web application. Since they have no sense of what the developer expected them to do, they end up acting in an unexpected way, that too in a sequence the developer never imagined. This is a developer's nightmare and he/she usually wakes up yelling "Why didn't you do it in the same order I coded?"

If that sounded scary, think about browser makers. Now, they need ensure their browsers can deal with both kind of people. Not to mention that their browser also has several things to do on the main thread. And they included **Event Loops**. Event loops are like [Heimdall][heimdall], the all-seeing and all-hearing Asgardian within Browsers. The watchful [eye of sauron][sauron], nothing malign, just benign.

Event loops are Browsers' way of saying, "**Dear developers and users, it would be easy for us to serve you both really well if you could J.U.S.T form a queue!**". I read the comparison of Event loop as a brain in [YDKJS](https://github.com/getify/You-Dont-Know-JS). It was in many ways, the right way to form a mental model of the event loop. That is if you first understand how brains work.

![image showing event loop, main thread and browser tasks](/img/006_event_loop/eventloop.svg)

**Event loop manages what goes into the Main Thread**. JavaScript tasks run in the same order they were initiated. First In, First Out. Event Loop doesn't even rapidly switch between tasks. It lets a task take as much time required to complete that task before opening the gates of main thread to another task. 

**Stack is like our working memory**. That's the **main thread**. Only one activity can occupy that space. Think of button clicks on the page and function calls. Only one of them can take the stack space at a time. Others wait quietly within the queue until event loops let them out onto stack. Which is only if the current activity on stack is completed.

**Queue is a to-do list** for the browser sorted by when they entered the queue. 

**Heap is sort of an additional thread** that stack can use to run asynchronous code. They are processed outside of the main thread and re-enter the main thread through the queue.

Here is a psuedo code. 

```js
while(browser.alive){
 if(stack.empty && !queue.empty){
 stack.push(queue.next)
    }
}
```
As a side note, imagine being able to open the programming of our brains and read the loops and conditions. It will save years of research for Neuroscientists I believe.

## Queue, Stack or Heap?
No, wait, come back. I can understand `heap` can invoke a sense of unmanageable pile of papers to manage. Drives adrenaline up. The best antidote is to imagine a tiny pile. 

Take a deep breath and exhale slowly. And find who is the boss here.

* Stack/Main thread takes orders from Queue
* Queue takes orders from the Heap & Browser
* Heap takes orders from the Stack & Browser

Don't tell me **The Browser** is the boss, I'll confront you with **The Operating System**. Someone will throw in **The user is the boss** and eventually, we might end up facing **The God**.  

In a way, all those answers are right, but I am not so sure about **The God**. It's more like [holacracy](https://en.wikipedia.org/wiki/Holacracy). What we do know is, Event loop controls the queue to dictate what goes into stack and when. 

Event loop gets input from several parts of the browser, such as JavaScript callbacks, network requests, calculating styles, layout and rendering/painting.

These browser tasks are optimized by browsers differently. They sometime wait in the background, giving space to microtasks and JavaScript tasks before getting attention from Event loop. 

```js

setTimeout(function(){
 console.log("Detach from stack);
},0);

```

This `setTimeOut` is executed when it lands on stack, sends the anonymous function to heap. There it waits until time out (in this case 0ms). After timeout, the function call is added to the end of the queue. It gets its turn on the stack once all tasks in front of the queue are cleared.

## Why `setTimeout` is Detached?
This question comes up very often on discussions related to Async. Why the `setTimeout` function call detaches itself from the current stack? Why doesn't it run like all other functions?

The answer is very clear when you try to rephrase the question. 

Why `setTimeout` does not block event loop and eventually freeze browser until the timeout? 

You get the answer, don't you? Because you do not want to block the event loop. That's the whole point. If you really wanted, You could write your own piece of function that can achieve a blocking `setTimeOut`. It might look like this:

```js
function blockingTimeOut(callBack,timeOut,params){
 let start=Date.now();
 while(((Date.now()-start)/1000)<timeout);
 callBack(params);
}

function log(str){
 console.log(str);
}
```

Take the following example. You call `setTimeout` first and then a normal function call followed by a `blockingTimeOut`. 
```js
setTimeout(log,10,"settimeout")
log("standalone");
blockingTimeOut(log,10,"blockingTimeOut");

//standalone
//blockingtimeout
//settimeout
```

The results might make sense if you hear the browser commentary.

1. There is a `setTimeout`, let's send it to a parallel thread to wait.
2. Here is a `log` statement, let's print it right away. *Standalone* printed first.
3. Another set of statements. let's do that right away. Ah, this `while` loop is killing me. Thank heavens, it is over. Let's finally call that log. *blockingTimeOut* printed next.
4. Oh, here comes the callback from that `setTimeOut`. Welcome back, we've got a space on the main thread for you. Go ahead and fullfil your destiny. This prints *setTimeOut*.

In case you swap lines and call `blockingTimeOut` first, then that would grab hold of the main thread until completion. It has no business on the parallel thread.

```js
blockingTimeOut(callb,10,"blockingtimeout");
setTimeout(callb,10,"settimeout")
callb("standalone");
//blockingtimeout
//standalone 
//settimeout

```

Writing a function that blocks event loop and freezes your application is easy. But writing a function that calls another function at a later time without blocking the event loop is not easy. That's why `setTimeout` API is there for you. 

## Why Infinite Loop Freezes Browsers?

That's because, event loop is not only for the JavaScript developer. Event loop is just a controller that decides what takes stage on the main thread next. While JavaScript calls are thrown at Event loop at the whim of the developer, the browser also throws several tasks at the event loop.

But the browser is a bit empathetic about event loop. It knows the troubles of being an event loop. So, the browser takes some of the decision making away from event loop. Instead, it throws things at the loop when it thinks the loop is rested enough to give it another run. There are also cases when the browser has been holding a task in the waiting for a long time and can wait no more. Nature's call!

Now if you think about frozen browser, chances are, your infinite loop is taking the whole main thread. User interactions and other tasks are either with the browser to figure out what's the next best time to allocate it. Or they are waiting in the queue for event loop to show a green signal.

**I thought that infinite loops are the only things that can block the main thread. I was wrong.** I stumbled upon this [great talk by Jake](https://www.youtube.com/watch?v=cCOL7MC4Pl0), where he explains more about how microtasks can also block rendering. 

A web page feels frozen when it is not reacting to user interactions. Responsiveness of page is usually the result of rendering UI changes. 

When there are tasks that have higher priority over UI changes, such as microtasks. If there are enough microtasks in the queue, then the browser may appear frozen until all those microtasks are completed. 

## Onward - Unfreeze 

`setTimeout` is one of the Web API that gives you another thread in JavaScript. But not the only one. You have many more **APIs that give you access to background thread** such as [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), and [Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).  

Play with different order of the following function.
```js
function test(){
 setTimeout(console.log,0,"log1");
 Promise
      .resolve()
      .then(()=>console.log("promise"));
 setTimeout(console.log,0,"log2");
}

test();
```

There are a few things on the spec that I kept secret to simplify things. That's the existence of aliens, UFOs and multiple [event loops][event-loops]. And you thought one event loop can rule them all? Wait, there is more for you to learn. Here is a list:
* [Multiple event loops][event-loops]
* Multiple queues for each event loop
* Different priorities for different types of tasks such as [microtasks][microtasks]
* How event loops maintain order through [task sources](https://html.spec.whatwg.org/multipage/webappapis.html#task-source). 

Well, if all that spec reading takes your head on a spinning tour, take a break with a video. Here is an [informative talk by Philip Roberts][philip-stuck-in-event-loop] on event loop. And his [demo site][philip-event-loop-demo] is also great. You'll appreciate it more when you've watched the talk. Don't miss [Jake's talk](https://www.youtube.com/watch?v=cCOL7MC4Pl0) I mentioned earlier. 

Thank you so much for staying with me so far. I hope I helped you with some understanding of asynchronous internals. Share this with your friends, if you think they will find it useful.

No claps, hearts / comments on this site yet. But you can reach me on twitter / join the [conversation on Github](https://github.com/pineboat/pineboat.github.io/issues/5).

Thanks again!

[problem-with-promises]:https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
[axios]:https://github.com/axios/axios
[heimdall]: http://marvelcinematicuniverse.wikia.com/wiki/Heimdall
[sauron]: http://lotr.wikia.com/wiki/Eye_of_Sauron
[minimum-time-not-guaranteed]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
[philip-stuck-in-event-loop]:https://vimeo.com/96425312
[philip-event-loop-demo]:http://latentflip.com/loupe
[microtask]:https://html.spec.whatwg.org/multipage/webappapis.html#microtask
[event-loops]:https://html.spec.whatwg.org/multipage/webappapis.html#event-loops