+++
author = "vijayabharathib"
date = "2017-09-07T22:28:21+05:30"
publishdate = "2017-09-07T22:28:21+05:30"
subtitle = "Everyone faces their impostor self once in a while. Especially when you know how much you don't know. One way to fight against the syndrome is to recognize what you do know. To realize you are becoming better."
tags = ["Learning","Impostor Syndrome","Code Refactoring"]
title = "How to Shatter Impostor Syndrome and Boost Confidence"
draft = false
image = "/img/003_impostor_syndrome/impostor_compressed.jpg"
image_alt = "Man in shadow"
image_credit="cc photo https://unsplash.com/@sergiunista"
+++

Have you ever tried refactoring your own code that was a year or two old? I had to. And the results were not just better code base. The refactoring also showed me what have I learned.

This is the story of refactoring I have done. I'm hoping it'll inspire you to try the same.

Jump right on to the story.

The code was more than 2 years old. It was a weird project for many reasons. For starters, it was a static site hosted on SharePoint. Mainly because we didn't have an option of a separate server or using public domain. We had to keep the information secure within the firewall. I thought SharePoint was not meant to serve static sites, but it worked. It was using an XML file as database. It had a single `HTML` with small section of `CSS` in the head. But the JavaScript is where most of the logic was.

It was operational for a while. I was helping another team with a copy of the installation. Before sharing it, I wanted to make sure all looks good so that the other team wouldn't have trouble using it. I opened it up on Atom, my beloved text editor.

The view on the text editor was nothing short of **shocking**. I was like 'really?' How on earth this piece of code continues to run? I could see my past self looking at me with painful wrinkles of embarrassment on the face.

Then it dawned on me, I must have grown up. I have picked up tips and tricks on JavaScript. I learned and adopted best practices. I have gained more knowledge on the language. I have seen better design patters.

Here are some of them that I listed down while I was refactoring. You'll also see **What was the learning?** and **Do it yourself(DIY)** sections within each refactoring option.

## 1. Generous Use of Globals
![small globe in a hand](/img/003_impostor_syndrome/globals.jpg)
Photo credit: https://stocksnap.io/author/46357

Globals are the best way to hold data / manage state in JavaScript, when I didn't know better ways. It's quite natural for people to go for a global variables.

Look around your old code and find any global variables that you are using. I certainly could find many. Drop them all. May be leave a singleton.

What has changed? Someone must have shown me why globals are bad. By now I know many of the pitfalls of using global variables. It's time for a list.

### What was the Learning?
* When the code base is large, it is difficult understand use of globals within a function.
* They open up rooms for defects that are hard to debug.
* It is quite easy for you to break others' code by using the same variable name
* Worse, someone else could as easily overwrite your variable name
* This one was new while I was, wait for it, researching<sup>1</sup> for this blog post. Global namespaces are hard to search. Hence, they lead to performance penalty when compared to locals.

<sup>1</sup> You'd argue that there is no evidence of any sort of research in this post. So, let's just say when I googled "globals are bad" and call it a day.

Usually, programming books show global variables first when the topic of 'scope' comes in. I would suggest all books on any programming language show global scope at the end, as a warning side note.

### DIY:
* Read more on 'why globals are bad' on [this page](http://wiki.c2.com/?GlobalVariablesAreBad).
* Try refactoring your code to eliminate globals.
* Impure functions are one of the places where state from outer scope is mutated. Try limiting use of impure functions.

## 2. Duplicate code
![duplicate cctv cameras](/img/003_impostor_syndrome/duplicates.jpg)
[Photo by Matthew Henry on Unsplash](https://unsplash.com/search/photos/duplicate?photo=fPxOowbR6ls)

You may see similar looking code all over the place. Just different variable names and flags, but common functionality. Think about extracting them to a function.

**Before:**
```js
//code to clear filters
var priceFilter=document.getElementByID("priceFilter");
priceFilter.value="None";
var brandFilter=document.getElementByID("brandFilter");
brandFilter.value="None";
var sizeFilter=document.getElementByID("sizeFilter");
sizeFilter.value="None";
//and a few more
```

**After:**
```js
const clearFilter=(id)=>{
  let filter=document.getElementByID(id);
  filter.value="None";
}

clearFilter("authorFilter");
clearFilter("brandFilter");
clearFilter("sizeFilter");
//and so on
```

### What was the learning ?
* Don't Repeat Yourself (DRY)
* Duplicate code needs fix/change at multiple places.
* When you make same changes to many places, it is quite easy to introduce a bug. [Have your key pad ever stuck and ctrl+v didn't work. Have you ever missed one of the instances when you use multi-select/concurrent cursor?]
* Takes up to much space than necessary and increases cognitive load

### DIY
* Identify and extract duplicate code into a reusable function
* Delete all the duplicate code into function calls.
* Feel the bliss of deleting code, hold that thought and savor the moment
* Rewrite your tests to fit the new design (or write new tests)

## 3. Complex and Lengthy Functions
![juggler](/img/003_impostor_syndrome/juggler.jpg)
[Photo from Unsplash](https://unsplash.com/search/photos/juggle?modal=%7B%22type%22%3A%22credit-badge%22%2C%22userId%22%3A%22jFDKfLlXxkE%22%7D)

The previous section is relevant here. Duplicate code is one of the reasons some functions are large. But that may not be the only reason.

It's natural for people coming linear programming languages such as C to write lengthier functions. That's my opinion by the way.

The code I had written 2 years ago had functions as large as 50 lines of code. A set of instructions in sequence. Many loops, accessing data, updating DOM and triggering events. You name it, the function had it. The function was jack of all trades.

My brain needed a larger RAM to hold all those things the function was supposed to do.

### What was the Learning?

 >"There are only two hard problems in Computer Science:
   cache invalidation and naming things."   -- Phil Karlton

* It is difficult to fully understand purpose of a function if it is larger than your comfort level.
* I'm on the side of small functions. Based on my experience, I see smaller functions make more readable code.
* Some would argue jumping between smaller functions would hinder readability. That's why a good name for function is necessary. Which is also why Phil was spot on.
* When you have a large function, it is easy to name it. Think about some of the things it's doing and rephrase it. For example,  `fetchDataAndProcessDataAndUpdateDOM`. But when you break functions down to smaller ones, you need be good at naming them. For example, `fetchData`, `sortData` and `updateUserTable`

### DIY:
* Try to go through [Clean Code] by "Robert C. Martin".  
* Pick a lengthy function, one with more than 50 lines of code.
* Cut it short or split it into many smaller functions.
* Try to maintain or increase the overall readability.
* Remember, we can be jack of all trades. But our functions need to be master of one. That's, just one job for a function to do well.
* Much like deleting excess code, this is also an enjoyable experience. Savor the moment.

## 4. Hidden Nested Loops
![complex gear loops](/img/003_impostor_syndrome/complex_gears.jpg)
Photo from https://www.gratisography.com/

Like I said in the last section, long functions tend to have many responsibilities. Some of those responsibilities achieved through nested loops. I could see loops nested two level deep on my code. It was not very concerning at first sight. It is easy to spot deeply nested loops and uproot them. One such example here.

```js
for(let i=0;i<array.length;i++){
  for(let j=i;j<array.length;j++){
    for(let k=j;k<array.length;k++){
      doSomethingOverandOver();
    }
  }
}
```

But there are times when the nesting is not explicit and in a single place. Take the one below for example,

```js
for(let i=0;i<array.length;i++){
  doSomething(array,i);
}

const doSomething=(array,i)=>{
  for(let j=i;j<array.length;j++){
    over(array,j);
  }
}

const over=(array,j)=>{
  for(let k=j;k<array.length;k++){
    andOver();
  }
}
```

This is the same nested loop that is three level deep. The loops are nicely tucked away within separate functions - which doesn't make it any better. Let's say you have spread these functions away from each other. It may be difficult to realize you've run into nested loops that are several levels deep.

### What was the learning?
* Nested loops are usually signs of **brute force** implementation.
* A [bubble sort] with no optimization will run for n<sup>2</sup> times.
* Nested loops that are three levels deep may quickly escalate into several runs of same code.
* When you deal with large scale data, nested loops are not the way to go. You'll have hard time understanding when the loop will end.
* Avoid looping through data that comes from a DB. Try to use the power of SQL and your database engine.

### DIY
* Try writing [bubble sort] if you haven't done so recently.
* Two simple `for` loops will be sufficient to get the results. But it's O(n<sup>2</sup>).
* Run it against a fully sorted array. The best case scenario. It will run into O(n<sup>2</sup>).
* Introduce a flag to break the loop if there was no swap, indicating array is already sorted, then it's just O(n).
* Now write a merge sort that uses recursion. Compare the difference in time for sorting 100k elements. Bubble sort took 2 mins, merge sort does it within 2 seconds.
* If you must use nested loops, look for improvements to reduce iterations. That's knowing when to stop. Then work towards stopping it early.
* Consider if recursion or regular expression can be an option if you are working with strings.
* There are few use cases for nested loops. Such as traversing a three dimensional array. Know when to use nested loops.

## 5. Synchronization Issues
![dancers trying to sync up](/img/003_impostor_syndrome/sync_issues.jpg)
[Photo by Joy Real on Unsplash](https://unsplash.com/search/photos/dancers?photo=upk3M2NEP_s)

Let's say you design and program a racing bot. What if, on the glorious day of racing, your bot starts to run before the race begins?

This is something I ran into when I was refactoring. May not be prevalent as other issues, but it does hit me occasionally. My JavaScript was working in full speed before DOM was loaded.

It took a long time to figure out. Certain changes had no effect on the application. Weird errors saying "element does not exist" while they are right in front of my eyes.

The problem was 'DOMContentLoaded' event. Rings any bell? Since I have been using frameworks and boilerplates for a while, I totally lost track of basics.

But the good news is, you eventually figure it out. If you start running JavaScript before DOM is ready, you are bound to run into such issues. We need to listen for 'DOMContentLoaded' event before we start doing anything with JavaScript. At least when your objective involves using elements from the DOM.

### What was the learning?
Always respect this piece of code:
```js
document.addEventListener("DOMContentLoaded",function(e){
// This is where most of your code
// interacting with DOM should live
});
```
### DIY:
Nope, this is not something you may find in your project. There is no DIY here. Just hold this thought of "waiting for DOM" for a while. It's worth it. It'll come back to you when necessary.

## 6. No tests whatsoever
![testing a tomoato with a syringe](/img/003_impostor_syndrome/tomato_test.jpg)
[Photo from pexels](https://www.pexels.com/photo/biotechnology-bright-chemical-chemistry-207585/)

The app I chose to refactor had no tests. I had to check if the app is still functional. It was quite manual. It was painful. It wasn't so painful in the last project.

So, what's changed? I was using TDD in the last project. I had some tests running in the background as part of my dev workflow.

Now that there are no tests, the refactoring was even more challenging.

### What was the learning?

* You'll enjoy refactoring if there are tests.
* You'll enjoy it more if it automatically runs when you make changes.
* It's rewarding if you have a code coverage tools like [istanbul] and [coveralls]. Steady increase in code coverage can be a motivating factor.
* TDD is hard. It takes patience and practice to get into a habit of writing at least some tests.
* You should almost always write tests first. That 'almost' is for you to retain the right to choose if you want to write tests first.

**Confession**: I rush to write the actual functionality first. Seeing the results on the browser is the normal impulsive behavior, at least for me. To write tests first is counter intuitive.

### DIY
* As you refactor your project, ensure you also write tests.
* If you already have tests, think about how you'd refactor your tests.
* If you have none, all the more reason to write tests from scratch.
* Find a way to run tests automatically when you change your code. For example, `guard` runs tests for rails and `npm-watch` for node.

## 7. No sight of library/framework
![scaffolds in a construction site](/img/003_impostor_syndrome/framework.jpg)
[Photo by 贝莉儿 NG on Unsplash](https://unsplash.com/collections/1025135/construction?photo=8Gg2Ne_uTcM)


You might have hand crafted your application from scratch. That's the best start you can give for any application. But you might also see your app as a composition of components. You might ask yourself "why did I hand craft everything in the first place?" There is so much imperative programming going on here.

Whether to handcraft everything or to use a library is a key decision. It has to be an informed one. Not based on ignorance. For example, the SPA I was refactoring appeared to have many components. I would naturally choose React now if I have to reboot the project.

But I didn't. Not because I didn't want to add 50kb+ for the library. Not because I didn't like those libraries. Not because I didn't understand the implications of patented license. All these may be good reasons not to use a library. I didn't use any, because I didn't know how to use them 2 years ago.

### What was the learning?
* Have seen the power of declarative programming.
* Experienced the productivity bliss of using tools like Rails and React.
* The peace of mind comes along with state management libraries such as Redux.
* You've got new pair of eyes that see your app as a collection of cohesive components

### DIY
* Try to bring in a tiny library to help you.
* I haven't used `Preact` but it fits the word `Tiny` and seems to have an API identical to React.
* If you are feeling adventurous, try to write your own view management library. After all, those libraries are also JavaScript.

---
May be in two years, I'll write about why this post is not so good. I'll list down what have I learned about 'writing well' and how to make this post better. I'd reassure myself that I am learning and growing.

**I urge you to try this. Try refactoring your old project, may be a year or two old. Be conscious of changes you make. That'll help you recognize what have you learned in the meantime. Write a post and remember to let me know**

Thank you, hope it was worth reading.

[istanbul]: https://github.com/gotwarlost/istanbul
[coveralls]: https://github.com/nickmerwin/node-coveralls
[clean code]: https://sites.google.com/site/unclebobconsultingllc/
[bubble sort]: https://en.wikipedia.org/wiki/Bubble_sort
[juggler]: /img/003_impostor_syndrome/juggler.jpg
