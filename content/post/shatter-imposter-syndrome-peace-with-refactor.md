+++
author = "vijayabharathib"
date = "2017-09-30T23:28:21+05:30"
publishdate = "2017-09-30T23:28:21+05:30"
subtitle = "Everyone faces their impostor self once in a while. It could push your confidence downward if you are not careful. One way to fight against the syndrome is to recognize what you have learned. To realize you are becoming better. That's where refactoring your old code can come in handy."
tags = ["Learning","Impostor Syndrome","Code Refactor"]
title = "How to Shatter Impostor Syndrome? Make Peace With Refactor."
draft = true
image = "/img/003_impostor_syndrome/impostor_compressed.jpg"
image_alt = "Man in shadow"
image_credit="cc photo https://unsplash.com/@sergiunista"
+++

Have you ever tried refactoring your own code that was a year or two old? I had to. And the results were not just better code base. The refactoring also showed me what have I leared.

This is the story of refactoring I have done. I'm hoping it'll inspire you to try the same.

The code was more than 2 years old. It was a weird project for many reasons. For starters, it was a static site hosted on SharePoint. Mainly because we didn't have an option of a separate server or using public domain. We had to keep the information secure within the firewall. I thought SharePoint was not meant to serve static sites, but it worked. It was using an XML file as database. It had a single `HTML` with small section of `CSS` in the head. But the JavaScript is where most of the logic was.

It was operational for a while. I was helping another team with a copy of the installation. Before sharing it, I wanted to make sure all looks good so that the other team wouldn't have trouble using it. I opened it up on Atom, my beloved text editor.

The view on the text editor was nothing short of shocking. I was like 'really?' How on earth this piece of code continues to run? I could see my past self looking at me with painful wrinkles of embarrassment on the face.

Then it dawned on me, I must have grown up. I have picked up tips and tricks on JavaScript. I learned and adopted best practices. I have gained more knowledge on the language. I have seen better design patters.

Here are some of them that I listed down while I was refactoring.

## 1. Generous use of globals

Globals are the best way to hold data / manage state in JavaScript, when I didn't know better ways. It's quite natural for people to go for a global variables.

Look around your old code and find any global variables that you are using. I certainly could find many. Drop them all. May be leave a singleton.

What has changed?
Someone must have shown me why globals are bad. By now I know many of the pitfalls of using global variables.

1. When the code base is large, it is difficult understand use of globals within a function.
2. They open up rooms for defects that are hard to debug.
3. It is quite easy for you to break others' code by using the same variable name
4. Worse, someone else could as easily overwrite your variable name
5. This one was new while I was, wait for it, researching<sup>1</sup> for this blog post. Global namespaces are hard to search. Hence, they lead to performance penalty when compared to locals.

<sup>1</sup> You'd argue that there is no evidence of any sort of research in this post. So, let's just say when I googled "globals are bad" and call it a day.

Usually, programming books show global variables first when the topic of 'scope' comes in. I would suggest all books on any programming language show global scope at the end, as a warning side note.

Read more on [this page](http://wiki.c2.com/?GlobalVariablesAreBad).

## 2. Invisible nested loops

It is quite easy to see this kind of nested loop and refactor as necessary. We know we need to be careful when the nesting is more than 2 levels deep. Avoid it.
```js
for(let i=0;i<array.length;i++){
  for(let j=i;j<array.length;j++){
    for(let k=j;k<array.length;k++){
      doSomethingOverandOver();
    }
  }
}
```

But there are times when the nesting is not explicit and in a single place. What if the same is written this way?

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
This is the same nested loop that is three level deep. But the loops are nicely tucked away within separate functions. Let's say you have spread these functions away from each other. It may be difficult to realize you've run into nested loops that are several levels deep.

Try writing [bubble sort](https://en.wikipedia.org/wiki/Bubble_sort) if you haven't done so recently. Two simple `for` loops will be sufficient to get the results. But it's O(n<sup>2</sup>). A fully sorted array may also run into O(n<sup>2</sup>). Introduce a flag to break the loop if there was no swap, indicating array is already sorted, then it's just O(n)<sup>2</sup>.  

There are few use cases for nested loops. Such as traversing a three dimensional array. Think about alternatives when you see yourself running into multiple loops. Get your head around recursion so that you have that in your tool belt.   

Bottom line, if you must use nested loops, look for improvements to reduce iterations. That's know when to stop. Then work towards stopping it early. Consider if recursion can be an option.

<sup>2</sup> There are obviously better algorithms than bubble sort. However, bubble sort is touted to be an efficient option if the data has only one or two miscreants to be sorted.

## 3. Duplicate code
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

Why did it occur to me that duplicate code is bad? I must have learned about `Don't Repeat Yourself (DRY)`
1. First, when you need to fix/change, duplicate code needs fix/change at multiple places.
2. When you make same changes to many places, it is quite easy to introduce a bug. Think of those times when your key pad stuck and ctrl+v didn't work. Or the time when you used multiple cursors on text editor when you didn't edit all instances.
3. Takes up to much space than necessary and increases cognitive load

Extracting duplicate code into an efficient function will help.
1. Code reads better
2. Changes need to be applied to one function
3. Easy to test

Also, deleting code is bliss. You should try it. Of course, ensure you have supporting tests to see things still pass as you delete code.

## 4. Complex and Lengthy Functions

Duplicate code is one of the reasons some functions are large. It's natural for people coming linear programming languages such as C to write lengthier functions. Should I just talk for myself here? Because I do not know for sure if people from C universe write lengthier functions. I just happen to have seen .c files with larger functions, but I could have been just one person. Lest I digress, there are different takes by different people on what should be the length of a function.

I'm on the side of small functions. Based on my experience, I see smaller functions make more readable code. Some would argue jumping between smaller functions would hinder readability. That's why a good name for function is necessary.

 >"There are only two hard problems in Computer Science:
   cache invalidation and naming things."   -- Phil Karlton

I have seen my functions exceeding 50 lines of code. They are responsible for a lot of things. That's bad. I enjoyed learning from [Clean Code](https://sites.google.com/site/unclebobconsultingllc/) by "Robert C. Martin". If you haven't, you should. Consider the guidelines and pick anything that interests you. Make it a habit.

### DIY:
Pick a lengthy function, one with more than 50 lines of code. Cut it  short or split it into many smaller functions. Try to maintain or increase the overall readability. Remember, just one responsibility for a function. Just like deleting excess code, this is also an enjoyable experience.

## 5. Synchronization Issues

Let's say you design and program a racing bot. What if, on the glorious day of racing, your bot starts to run before the race begins?

This is something I ran into when I was refactoring. May not be prevalent as other issues, but it does hit me occasionally. My JavaScript was working in full speed before DOM was loaded. It took a long time to figure outt. Certain changes had no effect on the application. Weird errors saying some elements do not exist while they are right in front of my eyes.

The problem was 'DOMContentLoaded'. Rings any bell? Since I have been using frameworks and boilerplates for a while, I totally lost track of basics.

But the good news is, you eventually figure out. If you start running JavaScript before DOM is ready, you are bound to run into such issues. We need to listen for 'DOMContentLoaded' event before we start doing anything with JavaScript. At least when your objective involves using elements from the DOM.

Always respect this piece of code:
```js
document.addEventListener("DOMContentLoaded",function(e){
/* This is where
** most of your code
** relevant to DOM
** should live
*/  
});
```
### DIY:
Nope, this is not something you may find in your project. There is no DIY here. Just hold this thought of "waiting for dom" for a while> It's worth it. It'll come back to you when necessary.

## 6. No tests whatsoever

The app I chose to refactor had no tests. I had to manually check the app after each change I was making. It was painful. It wasn't so painful in the last project. So, what's changed? I was using TDD in the last project. I had some tests running automatically through `guard` (for rails) or `npm-watch` for node.

You'll enjoy refactoring if there are tests that run automatically. Remember to write new ones if you write something new. It helps to have a code coverage tool like `coveralls` to understand coverage and fix gaps.

TDD is hard. It takes patience and practice to get into a habit of writing at least some tests. I rush to write the actual functionality first. Seeing the results on the browser is the normal impulsive behavior, at least for me. To write tests first is counter intuitive. You should almost always write tests first. That 'almost' is for you to retain the right to choose if you want to write tests first.

Confession: I sometime end up writing tests later. But I do know having good test coverage makes it all the more easier to introduce changes, refactoring and deleting old code.

## 7. No sight of library/framework
You might have hand crafted your application from scratch. That's the best start you can give for any application. But you might also see your app as a composition of components. You might ask yourself "why did I hand craft everything in the first place?" There is so much imperative programming going on here.

Whether to handcraft everything or to use a library is a key decision. It has to be an informed one. Not based on ignorance. For example, the SPA I was refactoring appeared to have many components. I would naturally choose React now if I have to reboot the project.

But I didn't. Not because I didn't want to add 50kb+ for the library. Not because I didn't like those libraries. Not because I didn't understand the implications of patented license. All these may be good reasons not to use a library. I didn't use any, because I didn't know how to use them 2 years ago.

What was the learning?
* Have seen the power of declarative programming.
* Experienced the productivity bliss of using tools like Rails and React.
* The peace of mind comes along with state management libraries such as Redux.
* You've got new pair of eyes that see your app as a collection of cohesive components

### DIY
Try to bring in a tiny library to help you. I haven't used `Preact` but it fits the word `Tiny` and seems to have an API identical to React. If you are feeling adventurous, try to write your own view management library. After all, those libraries are also JavaScript.

---

I'm sure when I look back at this post 2 years later, I might have moved on. I may think I could have written a better one. I'd reassure myself that I am learning and growing.

**I urge you to try this. Try refactoring your old project, may be a year or two old. Be conscious of changes you make. That'll help you recognize what have you learned in the meantime. Write a post and remember to let me know**

Thank you, hope it was worth reading.
