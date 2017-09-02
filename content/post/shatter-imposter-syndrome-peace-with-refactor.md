+++
author = "vijayabharathib"
date = "2017-09-30T23:28:21+05:30"
publishdate = "2017-09-30T23:28:21+05:30"
subtitle = "Everyone faces their impostor self once in a while. It could push your confidence downward if you are not careful. One way to fight against the syndrome is to qualify what you have learned. To realize you are becoming better. That's where refactoring your old code can come in handy."
tags = ["Learning","Imposter Syndrome","Code Refactor"]
title = "How to Shatter Impostor Syndrome? Make Peace With Refacter."
draft = true
+++

This is a story of recent refactoring I have done. The code was more than 2 years old. It was for a simple static site hosted on SharePoint (no separate web server). Just one `html` with small section of `css` in the head. But the javascript is where most of the logic was. It was using a standalone xml as database. In a sense, quite static.

It was operational for a while and I was supposed to help another team with a copy of the installation. Before sharing it, I wanted to make sure all looks good so that the other team wouldn't have trouble using it.

>The view on the text editor was nothing short of shocking. Is this really something I have written? How on earth this piece of code continues to run? I could see my past self looking at me with painful wrinkles of embarrassment on the face.

Then it dawned on me, I must have grown up. I have picked up tips and tricks on JavaScript. I have adopted best practices. I have gained more knowledge on the language. I have seen better design patters.

Here are some of them that I listed down while I was refactoring.

## 1. Generous use of globals

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
This is the same nested loop that is three level deep. But the loops are nicely tucked away within separate functions. If these are spread over across the files, it may be difficult to realize we've run into nested loops that are several levels deep.


## 3. Duplicate code

## 4. Complex and Lengthy Functions

## 5. Synchronization Issues

## 6. No tests whatsoever

## 7.
