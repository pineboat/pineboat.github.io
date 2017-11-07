+++
author = "vijayabharathib"
date = "2017-12-05T22:15:59+05:30"
publishdate = "2017-12-05T22:15:59+05:30"
subtitle = "Have you stayed off from Regular Expressions because they look complex. Befriend them in this practical guide."
tags = ["Regular Expressions","JavaScript"]
title = "How to Make Regular Expressions Your First Line of Defence"
draft=true
image="/img/004_regular_expressions/balloon_pattern.jpg"
image_alt="balloon with patterns"
image_credit="Image from https://unsplash.com/photos/q99oeAG46BY"
+++

Very much like any programming language, regular expression is a succinct language in its own right. Take that as a sign language to analyze strings. It is difficult to learn. Very difficult to remember. Close to impossible to implement right when all you have is few hours to push the code.

We are going to get our head around regular expressions today. At least, regularly used regular expressions (pun intended).

We will know how to put regular expressions to good use at the end of this post. We'd have solved the following simple problems and learned loads in the process.

1. [Why Regular Expressions](#why-regular-expressions)
2. [Get Your Environment Ready Instantly](#getting-ready-instantly)
3. [Start small with letters](#01-start-small-with-letters)
2. Find Duplicates
2. Match an email address
3. Match a link to an external website

## Why regular expressions?
write loop to match million hex numbers
write regexp to match million hex compare

## Getting Ready Instantly

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

FFFFIXXXXXX
```js
** how do you use a variable in regexp syntax above? you can't . you use `new RegExp(var_name,flags)` syntax.** 
```

## 01. Start Small With Letters

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


### TL;DR Review
Symbol | Meaning
--- | ---
`/.../` | Slash (/) marks the start and end of the regular expression. Ignore the dots, that's where we place the pattern.
`/a/` | Character between slashes is pattern matched on string under test.
`/abc/` | Characters between slashes are looked up as substring during pattern matching test on string under test.

## 02. Numbers in plain sight

Let's spice it up a bit. Let's say you want to find out if a string is full of numeric characters.

Here it is
```js
/0|1|2|3|4|5|6|7|8|9/.test("42"); //true
/0|1|2|3|4|5|6|7|8|9/.test("The answer is 42"); //true
```  
The second case shouldn't be true. We'll deal with it a bit later.

For now, the pipe symbol (`|`) means OR. Outside of regular expressions, we've used it as bitwise OR and conditional OR with double pipes (||). That's the same guy.

I could call that easy and call it a day. But you would scream for something better, right? We are a developers. We spend the best part of our day thinking about better aliases to save few keystrokes.

Should I type in nine pipe symbols? Nah. Here we go again.
```js
/[0123456789]/.test("42"); //true
/[0123456789]/.test("The answer is 42"); //still true
```
Better, 9 pipes replaced with 2 square brackets. 7 characters saved. 77.7% less keystrokes.

By the way, anything within square brackets is considered as `Either this OR that`. MDN calls it a character set. In our case, the string should contain either 0, or 1, or 2, or...bear with me, I promised to write 1000 words a day, or 3 or 4 or 5. All right, let's stop. You get it.

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
//Let's throw in a plus
/^[0-9]+$/.test("4"); //true
/^[0-9]+$/.test("42"); //true
/^[0-9]+$/.test("The answer 42"); //false - Hurray  
```
Surprisingly, the first one failed when we added ^ and $.

`/^[0-9]$/` in plain English reads like, go to the start of the string. look for a single numeral. Check if the string ends right there. That's not what we wanted.

The plus sign (+) in `[0-9]+` comes to our rescue. Plus means, more than one occurrence of the character/pattern in front of it. In our case, more than one numerals.

It also fails the match for our last case `The answer is 42` because, there are no numerals at the start of the string.

### Practice Patterns
* Can you try to write a pattern for hexadecimal numbers (consisting of numerals 0-9 and letters a-f, with an optional # in front)?
* How about a binary number? Can you test if a string is full of just 0 and 1?

I'll not spoil the fun until end of this post.

### Toppings

Oh, almost forgot. `[0-9]` which stands for any of the numeric character set also has a shorthand version `\d`.

```js
/^\d+$/.test("4"); //true
/^\d+$/.test("42"); //true
/^\d+$/.test("The answer 42"); //false - Hurray
```

### TL;DR Review
Symbol | Meaning
--- | ---
`[123]` | Expression within square brackets are character set. Any one of the character match will pass the test. Just ONE character.
`[0-9]` | Looks for a single numeric digit between 0 to 9.
`[0-5]` | Looks for a single numeric digit between 0 to 5.
`[a-z]` | Looks for a single letter between a to z.
`[A-F]` | Looks for a single letter between A to F.
`[123]+` | Plus (+) looks for one or more occurrence of the characters within the set. This one matches "23132" substring that consists of 1, 2 & 3 within a larger string "abc23132"
&#124;  | Pipe symbol stands for OR
`\d` | A shorthand for numerals
`\D` | A shorthand for non-numeric characters

## 03. Find Duplicates

You've been given a string. Find out if it has been infused with duplicate characters before sunset.

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

### Extension 1 - Reverse Pairs

Let's say we want to find two characters appearing in reverse order right next to each other. That is like `abba`. `ab` is reversed as `ba` and is right next to each other.

Here is the expression.

```js
/(\w)(\w)\2\1/.test("aabb"); //false
/(\w)(\w)\2\1/.test("abba"); //true
/(\w)(\w)\2\1/.test("abab"); //false
```

First `(\w)` matches a and remembers it as `\1`. Second `(\w)` matches b and remembers it as `\2`. Then the expression expects `\2` to occur first then followed by `\1`. Hence, `abba` is the only string that matches the expression.

### Extension 2 - No duplicates 

This time, we are going to look at sequence of characters without duplicates. No character should be followed by the same character. Plain and simple.

Here, take a look at the solution.

```js
/^(\w)(?!\1)$/.test("a"); //true 
/^(\w)(?!\1)$/.test("ab"); //false 
/^(\w)(?!\1)$/.test("aa"); //false 
```

Not the one we wanted, but close. A combination of brackets, question mark and exclamation mark (?!), is called a **look ahead**. `a(?!b)` matches `a` only if it is not followed by `b`. But it doesn't seem to be working. 

```js
/^((\w)(?!\1))+$/.test("madam"); //false - no recurrence
/^(?:(\w)(?!\1))+$/.test("madam"); //true - no recurrence
/^(?:(\w)(?!\1))+$/.test("maam"); //false  - can't have aa
```
**Question mark is the most powerful (and complex) character in the entire regular expression vocabulary**. You'll see as we go forward.

We had a solution. `(\w)(?!\1)` looks for character without recurrence. We had to group it and look for 1 or more occurences of such pair. That's all.

If we group the pattern within plain brackets like `((\w)(?!\1))`, the `\1` does not represent`(\w)`, it represents higher level bracket pair that groups the pattern. So it fails.

What we need is a **forgetful** grouping option. That's where the question mark, ?, comes in again. (?:) means a simple grouping without remembering the match. It helps us use the plus `+` against the overall grouping, which works like magic.

### TL;DR Review

Symbol | Meaning
--- | ---
`\w` | represents all the alpha-numeric characters. If you capitalize 'w' and use `\W'`, that would mean all characters **other than** alpha-numeric.
`( )` | expression within a bracket is remembered for later use.
`\1` | remembers and uses the match from first expression that is within brackets. \2 from second set of brackets. And so on.
`a(?!b)` | This one, a combination of brackets, question mark and exclamation mark (?!), is called a **look ahead**. This matches `a` only if it is not followed by `b`. 
`a(?=b)` | The other side of the coin. Match `a` only if it is followed by `b`.
`(?:a)` | Look for `a` but don't remember it. You can't use `\1` pattern to reuse this match.

## 04. Match Alternating Characters

The usecase is simple. Match a string that uses only two characters. Those two characters should alternate throughout the length of the string. Two sample tests for "abab" and "xyxyx" will do.

It wasn't easy. I got it wrong more than I got it right. This [answer][ALTERNATING-ANSWER] had what I wanted.

Here is the solution.

```js
/^(\S)(?!\1)(\S)(\1\2)*$/.test("abab"); //true
/^(\S)(?!\1)(\S)(\1\2)*$/.test("xyxyx"); //false
/^(\S)(?!\1)(\S)(\1\2)*$/.test("$#$#"); //true
/^(\S)(?!\1)(\S)(\1\2)*$/.test("#$%"); //false
/^(\S)(?!\1)(\S)(\1\2)*$/.test("$ $ "); //false
```
This is where you say, **"I had enough!"** and throw in the towel. But, wait for the **Aha moment!**.

Let's first make sense out of results before we arrive at 'how?'. `abab` matches. But `xyxyx` fails, because our pattern doesn't known how to handle that last x. We'll get there. `$#$#` matches, this is no different from `abab`. `#$%` fails as there is a third character. `$ $ ` fails though they are pairs, because space is excluded in our pattern.

Let's take a look at tools added to our belt. It'll start to make sense soon.

### Breakdown 

Pattern | Meaning
--- | ---
`\S` | represents all characters excluding white space
`a*` | Asterisk or Star, looks for 0 or more occurrences of the preceding character/pattern

Now comes the plain English version. 

* Start from the start `/^`
* Look for a non-white space character `(\S)`.
* Remember it as `\1`.
* Look ahead and see if the first character is not followed by the same character `(?!\1)`
* If we are good so far, look for another character `(\S)`.
* Remember it as `\2`.
* Then look for 0 or more pairs of first two matches `(\1\2)*`
* Look for such pattern until end of the string `$/`.

Apply that to our test cases. `abab` matches. But `xyxyx` fails, because our pattern doesn't known how to handle that last x. We'll get there. `$#$#` matches, this is no different from `abab`. `#$%` fails as there is a third character.


### Extend 
Let's fix that one failing case `xyxyx`. As we've seen, the last trailing x is the problem. We have a solution for `xyxy`. All we need is a pattern to say "look for an additional match of the first character".

As usual, let's start with the solution.

```js
/^([\S])(?!\1)([\S])(\1\2)*\1?$/.test("xyxyx"); //true
/^([\S])(?!\1)([\S])(\1\2)*\1?$/.test("$#$#$"); //true
```
A question mark `?` after a character or pattern means 0 or 1 match for the preceding pattern. In our case, `\1?` means, 0 or 1 match of the first character remembered. Easy.

### TL;DR Review
Pattern | Meaning
--- | ---
`\S` | represents all characters excluding white space (such as space, new lines etc). Note that it is capital S.
`a*` | Asterisk or Star, looks for 0 or more occurrences of the preceding character (in this case, 0 or more 'a'). Remember plus (+) which looks for 1 or more? Yeah, these guys are cousins.
`a(?!b)` | This one, a combination of brackets, question mark and exclamation mark (?!), is called a **look ahead**. This matches `a` only if it is not followed by `b`. For example, matches `a` in `aa`, `ax`, `a$` but does not match `ab`. Though it uses bracket, it does not remember the matching character after `a`.
`\s` | Small caps `s` matches a single white space character (such as space, new line...etc).
a(?=b) | The other side of the coin. This one matches `a` that is followed by `b`.
`^ab*$` | You may think this one translates to 0 or more occurrences of `ab`, but it matches `a` followed by 0 or more `b`. An example? Sure! This one matches `abbb`, `a`, `ab`, but does not match `abab`
`^(ab)*$` | The other side of the coin. This one matches 0 or more pairs of `ab`. That means, it will match empty string `""`, `ab`, `abab`, but not `abb`. 
`a?` | ? matches 0 or 1 occurrence of preceding character or pattern. \1? matches 0 or 1 recurrence of first remembered match. 

** Invite plus and asterisk back to your working memory. `+` means 1 or more. `*` means 0 or more. `?` means 0 or 1. They are the three musketeers in our RegExp army.


## A Strong Password 

This is the longest section in the entire post. Introduces very few new operators/patterns. But reuses many patterns. In the process, I also ended up with an optimized shorter version. I left it until the end of this section, because the other rules are equally important.

Now, the problem. Remember that registration form that took several attempts before you could meet their strong password requirements? Yeah, we are going to build that validation. The password should be minimum 15 character long. It should contain lowercase and uppercase letters. At least one numeral and a symbol. It can have 

This is a tricky one. Once you start consuming letters, you can't come back to check if they meet any other condition. **There in lies our clue. We can't look back, but we can look ahead!**

### Number of characters

Let's first test if the string password is 15 chars long. Pretty simple. Use `.length` on the password string. Done, right? No, who needs a simple solution? Let's spice it up.

```js
/^(?=.{15,})$/.test("Minimum15") //false 
/^(?=.{15,})$/.test("Minimum15Letters") //false

/^(?=.{15,}).*$/.test("Minimum15") //false
/^(?=.{15,}).*$/.test("Minimum15Letters") //true
```
You may remember `(?=)` from our previous work on ["no duplicates"](#extension-2-no-duplicates). That's a **look ahead** use. The dot (`.`) is an interesting character. It means, any character. {15,} stands for at least 15 receding dots in this case. No maximum limit.

Let's translate `/^(?=.{15,})$/`. Start from the beginning of the string. Look ahead for 15 characters. Don't remember the match. Come back to the beginning and check if the string ends there.

Doesn't sound right. Does it?

Which is why we brought in the variation `/^(?=.{15,}).*$/`. It reads like this. Start from the beginning. Look ahead for 15 characters. Don't remember the match. Come back to the beginning. Consume all the characters and see if you reach the end of the string. 

This makes sense now. Doesn't it? 

Which is why `Minimum15` fails and `Minium15Letters` passes the pattern.

### At least one number

This is going to be easy.

```js
/^(?=.*\d+).*$/.test(""); //false
/^(?=.*\d+).*$/.test("a"); //false
/^(?=.*\d+).*$/.test("8"); //true
/^(?=.*\d+).*$/.test("a8b"); //true
/^(?=.*\d+).*$/.test("ab890"); //true

```

In English, start from the beginning of the string `/^`. Look ahead for 0 or more other characters `?=.*`. Check if 1 or more numbers follow `\d+`.  Once it matches, come back to the beginning (because we were in look ahead). Consume all the characters in the string until end of the string `.*$/`.

### At Least One Lowercase Letter

This one follows the same patter as above.

```js
/^(?=.*[a-z]+).*$/.test(""); //false
/^(?=.*[a-z]+).*$/.test("A330"); //false
/^(?=.*[a-z]+).*$/.test("a"); //true
```

Translation? Sure. Start from the... ok. Instead of `\d+`, we have `[a-z]` which is a character set of letters from `a` to `z`.

### At least one Uppercase Letter
Let's not overkill. `[A-Z]` instead of `[a-z]` from the previous section will do.

### At least one symbol

This is challenging. One way to match symbols is to place a list of symbols in a character set. `/^(?=.*[-+=_)(\*&\^%\$#@!~`"':;|\\}\]{[/?.>,<]+).*$/.test("$")` That's all the symbols in a character set. Properly escaped where necessary. It'll take months for me to write it in plain English. 

So to save all of us from eternal pain, here is a simple one.

```js
/^(?=[^\w])(?=[ -~]).*$/.test("!");
```

### Happy ending to the symbol
The seed for this idea came from [another solution][REGEXP-SYMBOL] to the symbol problem.

We are going to generate a stripped down version of the password in this solution. Take out all the \d and \w. You'll have a string full of symbols which should match `[ -~]`. It reads like space, hyphen and a tilda.

Over to the working pattern:

```js
var pw="Minimum15Ch@racters";
symbol_only=pw.replace(/\w+/g,""); 
console.log(symbol_only); // prints @
/^[ -~]+$/.test(symbol_only); //true 
```

Why space to Tilda? Remember a-z? [ASCII table](http://www.asciitable.com/) has 125 characters. zero(0) to 31 are not relevant to us. Space starts from 32 going all the way up to 126 which is tilda(~). 

This covers all the symbols, letters and numbers we need.

But why should we mutate the password and remove all letters and numbers? Because this range has letters and numbers, testing this directly on the password wouldn't prove that we have a symbol. It'll only prove that we have one of the characters within this range. That could be any character.

Once you remove all the letters and numbers, what's left should be symbols. And we can test if we have at least one symbol with a broad range `[ -~]`. 

One final piece of the puzzle. The `/g` part of the replace function. `g` stands for global search and replace. Let's see the result without the `g` switch.

```js
var pw="Minimum15Ch@racters";
pw.replace(/\w+/,""); //@racters;
```

You see, the patter **without** global `g` switch finds only one match and replaces it with empty string we've given. When you give it extra power with the `g` switch, it does global find and replace of all the matches for a given pattern.

### Put the strong password together

Bringing it all together, we get this nice looking piece of regular expression. Remember, we are just allowing symbols $, # and % in this one. If you want to allow all other symbols, go one page up.

```js
/^(?=.{15,})(?=.*[$#%]+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+).*$/
```

### Food for thought
This does not have any negative conditions yet. such as, should not include single quote...etc. Try including a negative condition and see how it works out. 

Tip: [^a-z] means any character other than a to z. The opposite of [a-z].


## Match an email address

### Warning for Production

Regular expression alone may not help validate emails. Some would even argue that regular expressions should not be used as it can never match 100% of the emails. Think about all the fancy domain names poping up. You need to validate email twice. Once on the client side to help users avoid misspelled addresses. Start with a semantic input tag type `<input type='email'>`. Validate it once again on the server by actually sending a confirmation email.

### RegExp for Email 

Google for regular expression for an email address. One such result from [perl module](http://www.ex-parrot.com/~pdw/Mail-RFC822-Address.html) goes for more than a page. Regular expressions will not match 100% of all valid email addresses. You'll end up with a large one that is at best illegible.

But let's build an imaginary use case. One where you are building an internal app and you want to limit email addresses to your company domain. You allow email addresses with a DOT(.) and no other symbol is allowed.


## Match a link to an external website
/^https?\:\/\/\w+\.{1}\w+$/

[REGEXP-MDN]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

[ALTERNATING-ANSWER]: https://stackoverflow.com/questions/45504400/regex-match-pattern-of-alternating-characters

[REGEXP-SYMBOL]: https://stackoverflow.com/questions/8359566/regex-to-match-symbols