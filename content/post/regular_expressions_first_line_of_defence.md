+++
author = "vijayabharathib"
date = "2017-11-05T22:15:59+05:30"
publishdate = "2017-11-05T22:15:59+05:30"
subtitle = "Have you stayed off from Regular Expressions because they look complex. Befriend them in this practical guide."
tags = ["Regular Expressions","JavaScript"]
title = "How to Make Regular Expressions Your First Line of Defence"
draft=true
+++

Very much like any programming language, regular expression is a succinct language in its own right. Take that as a sign language to analyze strings. It is difficult to learn. Very difficult to remember. Close to impossible to implement right when all you have is few hours to push the code.

We are going to get our head around regular expressions today. At least, regularly used regular expressions (pun intended).

We will know how to put regular expressions to good use at the end of this post. We'd have solved the following simple problems and learned loads in the process.

1. Find Duplicates
2. Match an email address
3. Match a link to an external website

## Build a case with performance
write loop to match million hex numbers
write regexp to match million hex compare

## Getting Ready is Easy

### References
Most of the times, I find this page adequate to get going: [Regular Expressions from MDN][REGEXP-MDN]. In fact, that page is all you need. You can stop reading this post. Right now. Close.

### Tools for the job

Still with me. Thanks. You need a sandbox to play around. Luckily, one is available on your browser. Just use your console.

### Befriend the syntax

To start with, we are going to use `/expression/.test('string')` syntax.

`expression` is any regular expression that we build. `string` is the, er, string under test. The `test` method returns true/false depending on the match.

Do it right now. Just type this on your browser console.

```js
/a/.test("a"); //true
/a/.test("b"); //false
```

If that works, you are ready. Don't worry about what it is. That would be a piece of cake when you are done.

Let's dive in.

## Find a character

Let's start small. We need to find if a string has a particular character. Look for the character `'a'` in a string.

Here is the expression in all its glory:
```js
/a/.test("abc"); //true
/a/.test("bcd"); //false
/a/.test("cba"); //true
```
The expression does what we asked for. Look for `'a'` in the string under test. In our case, `"abc"` and `"bca"` do have the character `'a'`. But `'bcd'` does not have it.

### Breakdown
Now, that's a lot of slashes and backslashes. Let's break them down.

We've seen that `/expression/` is how we build regular expressions. So no question about slash there. In fact, we can even assign it to a variable and make it look better.

**Same code**
```js
let exp=/a/;
exp.test("abc"); //true
exp.test("bcd"); //false
exp.test("cba"); //true
```

The expression between slashes is just a single character `'a'` in our case. Because we are looking for that one character. Slashes mark the start and end of the regular expression. Treat them like double quotes (") and single quotes (') that you use to mark start and end of a plain string.

### Extend

Let's scale the solution.

**What if you want to find more than one character?**
Put them in sequence. Treat them as substring. Here is an example.
```js
/ab/.test("abacus"); //true
/bac/.test("abacus"); //true

/abc/.test("abacus"); //false
/abas/.test("abacus");//false
```
The expression within slashes should be there within the string under test in the same order. If so, we get a match.

`'bac'` is there within `'abacus'` but `'abas'` is not there in `'abacus'` as it is. Even though we have those characters scrambled, we do not get a match.

## Match Numbers

Let's spice it up a bit. Let's say you want to find out if a string is full of numeric characters.

Here it is
```js
/0|1|2|3|4|5|6|7|8|9/.test("42"); //true
/0|1|2|3|4|5|6|7|8|9/.test("The answer is 42"); //true
```  
The second case shouldn't be true. We'll deal with it a bit later.

For now, the pipe symbol, `|` means OR. We've used it as bitwise OR and conditional OR with double pipes (||). That's the same guy.

I could call that easy and call it a day. But you would scream for something better right? We are a developers. We spend the best part of our day thinking about better aliases to save few keystrokes.

Should I type in nine pipe symbols? Nah. Here we go again.
```js
/[0123456789]/.test("42"); //true
/[0123456789]/.test("The answer is 42"); //still true
```
Better, 9 pipes replaced with 2 square brackets. 7 characters saved. 77.7% less keystrokes.

By the way, anything within square brackets is considered as `Either this OR that`. In our case, the string should contain either 0, or 1, or 2, or...bear with me, I promised to write 1000 words a day, or 3 or 4 or 5. All right, let's stop. You get it.

Not satisfied, Ok, here we go once again.

```js
/[0-9]/.test("42"); //true
/[0-9]/.test("The answer is 42"); //true
```
Anything within square brackets [] means OR. `0-9` means zero to nine. So the test looks for characters from zero to nine in the test string.

Let's now address the failing second case. The second case `The answer is 42` matches because our test looks for numeric characters somewhere within the string. **Not start to end**.

Let's bring in ^ and $ to help us. ^ means start of the string. $ means end of the string.

Finally,
```js
/^[0-9]$/.test("42"); //false - NOOOOO!
/^[0-9]$/.test("The answer is 42"); //false
/^[0-9]+$/.test("4"); //true
/^[0-9]+$/.test("42"); //true
/^[0-9]+$/.test("The answer 42"); //false - Hurray  
```
Surprisingly, the first one failed when we added ^ and $.

`/^[0-9]$/` in plain English reads like, go to the start of the string. look for a number. check if the string ends right there.

The plus sign (+) in `[0-9]+` comes to our rescue. Plus means, more than one occurrence of the character/pattern in front of it. In our case, more than one numerals.

It also fails the match for our last case `The answer is 42` because, there are no numerals at the start of the string.

### Food for thought
Can you try to write a regular expression for hexadecimal numbers? I'll not spoil the fun until end of this post.

## Find Duplicates

You've been given a string. It has been infused with duplicate characters. Your job is to remove duplicates and return a string that cannot be reduced further.

Here is the solution for duplicate characters appearing immediately after an occurrence:
```js
/(\w)\1/.test("abc"); //false
/(\w)\1/.test("abb"); //true
```

The expression does not match any part of the string `abc` as there are no duplicate characters in sequence. So it returns false. But it matches `bb` part of the string `abb` and returns true.

Go ahead, type that on your DevTool console.

### Breakdown

Let's take a the look at the expression `(\w)\1`. In regular expression language, backslash is super special. backslash alters meaning of characters that follow them. Rings a bell? What do you call `\n` when you encounter it in a string? Yes, a new line. We've got something similar here.

Symbol | Meaning
--- | ---
`\w` | represents all the alpha-numeric characters. If you capitalize 'w' and use `\W'`, that would mean all characters **other than** alpha-numeric.
( ) | expression within a bracket is remembered for later use.
\1 | remembers and uses the match from first expression that is within brackets. \2 from second set of brackets. And so on.

Let's translate our expression `(\w)\1` to plain English. Match any alpha-numeric character on a given string, remember it as \1, check if that character appears right next to the first occurrence.

### Extend

Let's say we want to find two characters appearing in reverse order right next to each other. That is like `abba`. `ab` is reversed as `ba` and is right next to each other.

Here is the expression.
```js
/(\w)(\w)\2\1/.test("aabb"); //false
/(\w)(\w)\2\1/.test("abba"); //true
/(\w)(\w)\2\1/.test("abab"); //false
```

First `(\w)` matches a and remembers it as `\1`. Second `(\w)` matches b and rembers it as `\2`. Then the expression expects `\2` to occur first then followed by `\1`. Hence, `abba` is the only string that matches the expression.

### Exercises to firm up the learning

## Match an email address

## Match a link to an external website

[REGEXP-MDN]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
