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

## Find by position
$ and ^

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
