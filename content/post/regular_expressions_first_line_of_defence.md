+++
author = "vijayabharathib"
date = "2017-11-05T22:15:59+05:30"
publishdate = "2017-11-05T22:15:59+05:30"
subtitle = "Have you stayed off from Regular Expressions because they look complex. Befriend them in this practical guide."
tags = ["Regular Expressions","JavaScript"]
title = "How to Make Regular Expressions Your First Line of Defence"
draft=true
+++

Very much like any programming language, regular expression is a succinct language in its own right. It has a lot of meaning and functionality compressed into characters. Take that as a sign language. It is difficult to learn. Very difficult to remember. Close to impossible to implement right when required.

We are going to get our head around regular expressions today. At least, regularly used regular expressions (pun intended).

We will know how to put regular expressions to good use at the end of this post. We'd have solved the following simple problems and learned loads in the process.

1. Find Duplicates
2. Match an email address
3. Match a link to an external website

## Getting Ready

### References
Most of the times, I find this page adequate to get going: [Regular Expressions from MDN][REGEXP-MDN].

### Syntax scaffolding

You need a sandbox to play around. Luckily, one is available on your browser. Just use your console. To start with, we are going to use `/expression/.test('string')` syntax. You can do this on your browser developer tools' console and see results.

`expression` is any regular expression that we build. `string` is the, er, string under test. The `test` method returns true/false depending on the match.

Let's dive in.

## Find Duplicates

You've been given a string. It has been infused with duplicate characters. Your job is to remove duplicates and return a string that cannot be reduced further.

Here is the solution for duplicate characters appearing immediately after an occurrence:
```js
/(\w)\1/.test("abc"); //false
/(\w)\1/.test("abb"); //true
```

The expression does not match any part of the string `abc` as there are no duplicate characters in sequence. So it returns false. But it matches `bb` part of the string `abb` and returns true.

Go ahead, type that on your DevTool console.

### Debriefing
Now, that's a lot of slashes and backslashes. Let's break them down.

We've seen that `/expression/` is how we build regular expressions. So no question about slash there. In fact, we can even assign it to a variable and make it look better.

**Same code**
```js
let exp=/(\w)\1/;
exp.test("abc"); //false
exp.test("abb"); //true
```

This code shows, an expression tested on a string.

Let's take a the remaining portion, `(\w)\1`. In regular expression language, backslash is super special. backslash alters meaning of characters that follow them.

Symbol | Meaning
--- | ---
`\w` | represents all the alpha-numeric characters.
( ) | expression within a bracket is remembered for later use.
\1 | remembers and uses the match from first expression that is within brackets. \2 from second set of brackets. And so on.

Let's translate our expression `(\w)\1` to plain english. Match any alpha-numeric character on a given string, remember it as \1, check if that character appears right next to the first occurrence.

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
