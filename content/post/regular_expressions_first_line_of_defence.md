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

Are you one of those people who stay away from RegExp because it looks like a foreign language? I was. Not anymore. Just remember all those sounds, traffic signs, smells that you can recognize. Regular expressions are no different. Take that as a sign language to analyze strings. We are going to get our head around regular expressions today. At least, regularly used expressions.

Very much like any programming language, regular expression is a succinct language in its own right. We will know how to put regular expressions to good use at the end of this post. We'd have solved the following simple problems and learned loads in the process.

Willing to invest 20 minutes and come out enlightened in RegExp? Settle down then. We have a ToC showing what's in store.

* [Get Your Playground Ready](#00-get-your-playground-ready)
* [Start small with letters](#01-start-small-with-letters)
* [Patterns in Numbers](#02-patterns-in-numbers)
* [Recurrence Match to Find Duplicates](#03-recurrence-match-to-find-duplicates)
* [Alternating sequence](#04-alternating-sequence)
* [Match an email address](#05-match-an-email-address)
* [Look Ahead Rules](#06-look-ahead-rules)
* [Conclusion](#07-conclusion)

## Why regular expressions?
Everyone has their own 'why', don't we? A million reasons. May be one of them is to test if the string is a valid hex color code?

I'll let the universe throw the `why` at you and help you cover the `how`.

## 00. Get Your Playground Ready

### References
Most of the times, I find this page adequate to get going: [Regular Expressions from MDN][REGEXP-MDN]. In fact, that page is all you need. You can stop reading this post. Right now. Close.

### Tools for the job

Still with me. Thanks. You need a sandbox to play around. Luckily, one is available on your browser. Just use your console. `F12` opens up developer console in Chromium browser. You can find the developer tools under the menu as well.

### Befriend the syntax

To start with, we are going to use `/expression/.test('string')` syntax.

`expression` is any regular expression that we build. `string` is the, er, string under test. The `test` method returns true/false depending on the match. 

Slashes mark the start and end of the expression. The expression between `/` is a literal. **Once again, they are treated as literal characters.** Variable names wouldn't be resolved down to their contents.

To make it dynamic, we'll have to use `new RegExp(variable_name)` syntax, which we **wouldn't use until the end.**

**Do it right now.** Just type this on your browser console.

```js
/a/.test("a"); //true
/a/.test("b"); //false
```

If that works, you are ready. Don't worry about what it is. That's what we are going to breakdown into pieces in the following lines.

Let's dive in.

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

We've seen that `/expression/` is how we build regular expressions. So no question about slash there. In fact, we can even **assign it to a variable and make it look better.**

**Same code**
```js
let exp=/a/;
exp.test("abc"); //true
exp.test("bcd"); //false
exp.test("cba"); //true
```

The expression between slashes is just a single character `'a'` in our case. We are looking only for that one character. Slashes mark the start and end of the regular expression. Treat them like double quotes (") and single quotes (') that you use to mark start and end of a plain string.

### Extend Your Reach to Multiple Characters

Let's scale the solution. **What if you want to find more than one character?**

Put them in sequence. Treat them as substring. Here is an example.

```js
/ab/.test("abacus"); //true
/bac/.test("abacus"); //true

/abc/.test("abacus"); //false
/abas/.test("abacus");//false
```
The string under test should contain the exact expression within slashes. We get a match if that condition is met.

`'bac'` is there within `'abacus'` but `'abas'` is not there in `'abacus'` as it is. Even though we have those characters scrambled, we do not get an exact match.


### TL;DR Review Ground Covered
Symbol | Meaning
--- | ---
`/.../` | Slash (/) marks the start and end of the regular expression. Ignore the dots, that's where we place the pattern.
`/a/` | Character between slashes is pattern matched on string under test.
`/abc/` | Characters between slashes are looked up as substring during pattern matching test on string under test.

## 02. Patterns in Numbers

Let's spice it up a bit. Let's say you want to find out if a string is full of numeric characters.

Here it is
```js
let regExp=/0|1|2|3|4|5|6|7|8|9/;
regExp.test("42"); //true
regExp.test("The answer is 42"); //true
```  
First of all, the pattern looks pretty long. But the same long streak of characters **can be expressed in just two characters**. I reserved it towards end of this section, for a dramatic closure. 

The second case shouldn't be true. We'll deal with it a bit later.

For now, the pipe symbol (`|`) means OR. Outside of regular expressions, we've used it as bitwise OR and conditional OR with double pipes (||). That's the same guy.

I could call that easy and call it a day. But you would scream for something better, right? We are developers. We spend the best part of our day thinking about better bash/git aliases to save few keystrokes.

Should I type in nine pipe symbols? Nah. Here we go again.

```js
/[0123456789]/.test("42"); //true
/[0123456789]/.test("The answer is 42"); //still true
```
Better, 9 pipes replaced with 2 square brackets. 7 characters saved. 77.7% less keystrokes.

By the way, anything within square brackets is considered as `Either this OR that`. It is a character set. In our case, the string should contain either 0, or 1, or 2, or...bear with me, I promised myself to write 1000 words a day, or 3 or 4 or 5. All right, let's stop. You get it.

What are you saying? It still looks quite lengthy? Not satisfied, Ok, here we go once again.

```js
/[0-9]/.test("42"); //true
/[0-9]/.test("The answer is 42"); //true
```

How about that? Looks much cleaner, doesn't it? Anything within square brackets [] means OR. `0-9` marks a range, means zero to nine. So the test looks for characters from zero to nine in the test string.

### The prefix pattern and suffix patterns

Let's now address that failing second case. `The answer is 42` matches our test because our pattern looks for numeric characters somewhere within the string. **Not start to end**.

Let's bring in `^` and `$` to help us. 
* `^` means start of the string. He is a double agent and he'll trip us off. Look for his second avatar later in the sections. 
* `$` means end of the string.

Let's get the prefix pattern sorted out.

```js
/^a/.test("abc"); //true 
/^a/.test("bca"); //false
/^http/.test("https://pineboat.in"); //true
/^http/.test("ftp://pineboat.in"); //false
```
Any pattern that follows `^` should be at the start of the string under test. The second string starts with `b` while our pattern looks for `a`. The fourth one looks for `http` while the string starts with `ftp`, which is the reason they fail.

### The suffix patterns

The suffix pattern follows. `$` at the end of the pattern directs the test to look for end of string.

```js
/js$/.test("regexp.js"); //true
/js$/.test("regexp.sj"); //false
```
That should sound in your head like, "look for js and then end of the string". Better yet, "look for a string that ends in `js`.

### Pattern match End to End

That paves the road to pattern match start to end, you might as well call it end to end.

```js
/^[0-9]$/.test("42"); //false - NOOOOO!
/^[0-9]$/.test("The answer is 42"); //false
/^[0-9]$/.test("7"); //true 
```
Surprisingly, the first one failed when we added ^ and $.

`/^[0-9]$/` in plain English reads like, go to the start of the string. **Look for a single numeral from the character set**. Check if the string ends right there. That's the reason the last entry returned `true`. It is just a single number, start to end.

That's not what we wanted. We wanted to test more than one digit, start to end, but only numerals.

### Tale of three musketeers

We are very close. One last thing we need to learn is, how to instruct the pattern to look for more than one character in the set.

A question mark (?), a plus (+) and an asterisk (*) met on a trip. Each is differently sighted. The humble question mark says, I can see none or just one. Plus (+) says, I need to see at least one or more. Asterisk says, I get you both, I can see none, one, or more. 

**One of them is cleverly hiding what he is capable of.**

The question mark gets on stage first.

```js
/a?/.test(""); //true
/a?/.test("a"); //true
/a?/.test("b"); //true!
/a?/.test("aa"); //true 
/^a?$/.test("aa"); //false
```

* `/a?/` matches empty string `""` as `?` stands for 0 or 1.
* `/a?/` matches `a` - one match
* `/a?/` matches `b` - matches 0 occurrence
* `/a?/` matches `aa` - one match and the second `a` is not part of the pattern.
* `/^a?$/` does not match `aa` as it looks for zero or one `a`, start to end, nothing more, nothing less. 

The plus (+) looks at question mark and remarks, "I'm impressed, but you are so binary!". And takes the stage to show off.

```js
/a+/.test("a"); //true
/a+/.test("aa"); //true 
/a+/.test("ba"); //true!
/^a+$/.test("aa"); //true

/a+/.test(""); //false
/a+/.test("b"); //false
/^a+$/.test("ab"); //false

```
Remember what plus (+) said? It can match one or more occurrences of preceeding pattern.

All those returning `true` have one or more `a`. We even managed to get a whole string comprised only of `a` in the last one that returned true with `/^a+$/`.

`false` should make sense now, but a word on the last one that returned false. `/^a+$/` looks for `a` start to end, no other characters allowed. Which is why  `ab` failed the test.

Finally, start (*) of the show gets on stage. Boasts that, "I can duel you both at once" and says, "I can match zero, one or more".

```js
/a*/.test("a"); //true
/a*/.test("aa"); //true 
/a*/.test("ba"); //true
/a*/.test(""); //true
/a*/.test("b"); //true
/^a*$/.test("aa"); //true
/^a*$/.test(""); //true

/^a*$/.test("ab"); //false
```
Except the last one, * was able to handle all else. `/^a*$/` reads like, 0 or more `a` start to end. Which is why empty string `""` passed the test and `"ab"` failed.

### Back to the Universal Answer

Remember where were we before we met the three musketeers? Yes, "The answer is 42".

Now, if we need to look for only numerals, one or more, start to end, what do we do? 

```js
//Let's throw in a plus
/^[0-9]+$/.test("4"); //true
/^[0-9]+$/.test("42"); //true
/^[0-9]+$/.test("The answer 42"); //false - Hurray  
```

The plus sign (+) in `[0-9]+` comes to our rescue. Plus means, more than one occurrence of the character/pattern in front of it. In our case, more than one numerals.

It also fails the match for our last case `The answer is 42` because, there are no numerals at the start of the string.

### Practice Patterns

* Can you try to write a pattern for hexadecimal numbers (consisting of numerals 0-9 and letters a-f, with an optional # in front)?
* How about a binary number? Can you test if a string is full of just 0 and 1?

I'll not spoil the fun until end of this post.

### That Dramatic End

Oh, almost forgot. `[0-9]` which stands for any of the numeric character set also has a shorthand version `\d`.

```js
/^\d+$/.test("4"); //true
/^\d+$/.test("42"); //true
/^\d+$/.test("The answer 42"); //false - Hurray
```
Just two characters denoting numerals. And No, it doesn't get any shorter than that. 

There are whole bunch of such special patterns to specify clusters such as numbers (`\d`), alpha numeric characters (`\w`), white spaces (`\s`).

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
`\d` | A shorthand for numerals. Matches a single numeric digit.
`\D` | A shorthand for non-numeric characters. Anything other than numerals that'll be matched by `\d`.


## 03. Recurrence Match to Find Duplicates

This is the actual problem for which I started paying attention to regular expressions, which eventually led to this post. You've been given a string. Find out if it has been infused with duplicate characters before sunset.

Here is the solution for duplicate characters appearing immediately after an occurrence:

```js
/(\w)\1/.test("abc"); //false
/(\w)\1/.test("abb"); //true
```

The expression does not match any part of the string `abc` as there are no duplicate characters in sequence. So it returns false. But it matches `bb` part of the string `abb` and returns true.

Go ahead, type that on your DevTool console. Viola! right?

Let's break it down to understandable pieces.

### Backslash \ Unleashed

I've been a little quiet about the backslash that was introduced in the last section. To those who have `been there` and `done that`, it may not have been a surprise. They might have `escaped` the confusion. But if you are new to programming world, you need to know more about backslash.

In regular expression language, backslash is super special. backslash alters meaning of characters that follow them. Rings a bell? What do you call `\n` when you encounter it in a string? Yes, a new line. We've got something similar here. In fact, `\n` is what you use as a pattern if you want to look for a new line. That's called `escaping` the usual meaning of `n` and giving it a whole new attire called `new line`.

Symbol | Meaning
--- | ---
`\d` | A shorthand for numerals. Matches a single numeric digit.
`\D` | A shorthand for non-numeric characters. Anything other than numerals that'll be matched by `\d`.
`\s` | Shorthand for single white space character such as space, new line or tab.
`\S` | Antonym of `\s`, anything other than white space.
`\w` | Shorthand for alpha-numeric character. Matches a-z, A-Z, 0-9 & an underscore `_`.
`\W` | Antonym of `\w`.

### Recallable Matches

We started this section with the solution for finding duplicate characters. `/(\w)\1/` matched `"abb"`. That shows use of memory and recall within regular expressions.

Consider the use of brackets in this format `(expression)`. the resulting string that matches the expression within a bracket is remembered for later use. `\1` remembers and uses the match from first expression that is within brackets. Likewise, `\2` from second set of brackets. And so on.

Let's translate our expression `(\w)\1` to plain English. Match any alpha-numeric character on a given string, remember it as \1, check if that character appears right next to the first occurrence.

### Extension 1 - Reverse Pairs

Let's say we want to find two characters appearing in reverse order right next to each other. That is like `abba`. `ab` is reversed as `ba` and is right next to each other.

Here is the expression.

```js
/(\w)(\w)\2\1/.test("aabb"); //false
/(\w)(\w)\2\1/.test("abba"); //true
/(\w)(\w)\2\1/.test("abab"); //false
```

First `(\w)` matches `a` and remembers it as `\1`. Second `(\w)` matches `b` and remembers it as `\2`. Then the expression expects `\2` to occur first followed by `\1`. Hence, `abba` is the only string that matches the expression.

### Extension 2 - No duplicates 

This time, we are going to look at sequence of characters with no duplicates. No character should be followed by the same character. Plain and simple.

Here, take a look at the solution.

```js
/^(\w)(?!\1)$/.test("a"); //true 
/^(\w)(?!\1)$/.test("ab"); //false 
/^(\w)(?!\1)$/.test("aa"); //false 
```

Not the one we wanted, but close. The middle one shouldn't be false. But we threw in a few more symbols that need explaining. But that means confronting the most powerful musketeer once again.

### Return of the question mark

Remember the three musketeers we met earlier. The humble **question mark is actually the most powerful manipulator** that can get other symbols to do hid bidding. That is, if you take the backslash for granted, of course.

A combination of brackets, question mark and exclamation mark `(?!)`, is called a **look ahead**. A negative look ahead to be precise. `a(?!b)` matches `a` only if it is **not** followed by `b`. Across Javascript ecosystem, exclamation mark means **NOT**. But its cousin `CSS` takes a `U` turn and `!important` means it is actually very important and should not be overridden. I almost scrolled past [Chen's tweet](https://twitter.com/vijayabharathib/status/910772769964548096) thinking he marked it as not important. Lest I digress.

On the other hand, `(?=)` is a positive **look ahead**. `a(?=b)` matches `a` only if it is followed by `b`.

We had a solution. `(\w)(?!\1)` looks for a character without recurrence. **But only for one character.** We need to group it and look for 1 or more occurrences of characters, with the use of plus (+). That's all. 

```js
/^((\w)(?!\1))+$/.test("madam"); //false
/^((\w)(?!\1))+$/.test("maam"); //false 
```

But it doesn't seem to be working. If we group the pattern within plain brackets like `((\w)(?!\1))`, the `\1` does not represent`(\w)`, it represents higher level bracket pair that groups the pattern. So it fails.

What we need is a **forgetful** grouping option. That's where the question mark, `?`, strikes back. It pairs with a colon, `(?:)` and wipes out any function of memory that the brackets can bring in. One last time.

```js 
/^(?:(\w)(?!\1))+$/.test("madam"); //true - no recurrence
/^(?:(\w)(?!\1))+$/.test("maam"); //false  - can't have aa
```

This time, the first level of brackets are not remembered, thanks to `?:`, hence, `\1` remembers the match returned by `\w`. It helps us use the plus `+` against the overall grouping to find similar pairs of characters start to end, which works like magic.

In English, look for a character, look ahead to ensure it is not followed by the same character. Do this from start to end for all characters.

### TL;DR Review

Symbol | Meaning
--- | ---
`\w` | represents all the alpha-numeric characters. If you capitalize 'w' and use `\W'`, that would mean all characters **other than** alpha-numeric.
`( )` | expression within a bracket is remembered for later use.
`\1` | remembers and uses the match from first expression that is within brackets. \2 from second set of brackets. And so on.
`a(?!b)` | This one, a combination of brackets, question mark and exclamation mark (?!), is called a **look ahead**. This matches `a` only if it is not followed by `b`. 
`a(?=b)` | The other side of the coin. Match `a` only if it is followed by `b`.
`(?:a)` | **Forgetful grouping**. Look for `a` but don't remember it. You can't use `\1` pattern to reuse this match.

## 04. Alternating Sequence

The usecase is simple. Match a string that uses only two characters. Those two characters should alternate throughout the length of the string. Two sample tests for "abab" and "xyxyx" will do.

It wasn't easy. I got it wrong more than I got it right. This [answer][ALTERNATING-ANSWER] directed me down the right street.

Here is the solution.

```js
let e=/^(\S)(?!\1)(\S)(\1\2)*$/;
e.test("abab"); //true
e.test("xyxyx"); //false
e.test("$#$#"); //true
e.test("#$%"); //false
e.test("$ $ "); //false
```

This is where you say, **"I had enough!"** and throw in the towel. But, wait for the **Aha moment!**. You are 3 feet away from the gold ore, not the right time to stop digging.

Let's first make sense out of results before we arrive at 'how?'. `abab` matches. `$#$#` matches, this is no different from `abab`. `#$%` fails as there is a third character. `$ $ ` fails though they are pairs, because space is excluded in our pattern.

All is well except, `xyxyx` fails, because our pattern doesn't know how to handle that last x. We'll get there.

Let's take a look at tools added to our belt. It'll start to make sense soon.

### One piece at a time
You already know most of the pieces. `\S` is the opposite of `\s`. `\S` looks for non white space characters.

Now comes the plain English version of `/^(\S)(?!\1)(\S)(\1\2)*$/`. 

* Start from the start `/^` - Duh!
* Look for a non-white space character `(\S)`.
* Remember it as `\1`.
* Look ahead and see if the first character is not followed by the same character `(?!\1)`. Remember **negative look ahead**.
* If we are good so far, look for another character `(\S)`.
* Remember it as `\2`.
* Then look for **0 or more pairs of first two matches** `(\1\2)*`
* Look for such pattern until end of the string `$/`.

Apply that to our test cases. `"abab"` and `"$#$#"` match. 

### Tail End

After looking at the solution you may think this does not demand a separate section. But the simplicity of it is elegant. Let's fix that one failing case `xyxyx`. As we've seen, the last trailing x is the problem. We have a solution for `xyxy`. All we need is a pattern to say **"look for an optional occurrence of first character"**. 

As usual, let's start with the solution.

```js
/^(\S)(?!\1)(\S)(\1\2)*\1?$/.test("xyxyx"); //true
/^(\S)(?!\1)(\S)(\1\2)*\1?$/.test("$#$#$"); //true
```
Question mark strikes again. There is no escaping him. It's better we make him our friend than our enemy. A question mark `?` after a character or pattern means 0 or 1 match for the preceding pattern. In our case, `\1?` means, 0 or 1 match of the first character remembered through first set of brackets. Let's not forget our star. `(\1\2)*` looks for 0 or more pairs. 

Easy. Relax.

### TL;DR Review

Pattern | Meaning
------- | -------
`\S` | represents all characters excluding white space (such as space, new lines etc). Note that it is capital S.
`a*` | Asterisk or Star, looks for 0 or more occurrences of the preceding character (in this case, 0 or more 'a'). Remember plus (+) which looks for 1 or more? Yeah, these guys are cousins.
`a(?!b)` | This one, a combination of brackets, question mark and exclamation mark (?!), is called a **look ahead**. This matches `a` only if it is not followed by `b`. For example, matches `a` in `aa`, `ax`, `a$` but does not match `ab`. Though it uses bracket, it does not remember the matching character after `a`.
`\s` | Small caps `s` matches a single white space character (such as space, new line...etc).
`a(?=b)` | The other side of the coin. This one matches `a` that is followed by `b`.
`^ab*$` | You may think this one translates to 0 or more occurrences of `ab`, but it matches `a` followed by 0 or more `b`. An example? Sure! This one matches `abbb`, `a`, `ab`, but does not match `abab`
`^(ab)*$` | The other side of the coin. This one matches 0 or more pairs of `ab`. That means, it will match empty string `""`, `ab`, `abab`, but not `abb`. 
`a?` | ? matches 0 or 1 occurrence of preceding character or pattern. \1? matches 0 or 1 recurrence of first remembered match. 


## 05. Match an email address

### Warning for Production

Regular expression alone may not help validate emails. Some would even argue that regular expressions should not be used as it can never match 100% of the emails. 

Think about all the fancy domain names poping up. Also consider inclusion of symbols within email addresses, such as dot (.) and plus (+).

You need to validate email twice. Once on the client side to help users avoid misspelled addresses. Start with a semantic input tag type `<input type='email'>`. Some of the browsers automatically validate it without any extra scripting on the front end.

Validate it once again on the server by actually sending a confirmation email. 

Haven't you seen one such lately? Just try to subscribe to this [pineboat](https://www.pineboat.in) , you'll get an actual email asking you to confirm if that is yours. That confirmation is a solid proof that your email is valid.

That was smooth selling, wasn't it? 

### RegExp for Email 

Now that we added the disclaimer, you'd actually want to see a pattern right? No, search for regular expression for an email address. One such result from [perl module](http://www.ex-parrot.com/~pdw/Mail-RFC822-Address.html) goes for more than a page.

So, I am not even going to attempt it. Such long regular expressions are generated by computers through pattern builders. Not for mere mortals like us.

## 06. Look Ahead Rules

If you are a coffee person, this is the right time to get a strong one. Because we are at last section of this post, but the longest one so far. 

Introduces very few new operators/patterns. But reuses many patterns. As usual, we reserve the shortest optimized one for last. **The ASCII range is the best part of this post.** Because, I learned it while researching for this post.

Now, the problem. Remember that registration form that took several attempts before you could meet their strong password requirements? Weak, good, strong, and very strong? Yeah, we are going to build that validation. 

The password should,
* have minimum 4 character.
* contain lowercase
* contain uppercase
* contain a number
* and a symbol 

This is a tricky one. Once you start consuming letters, you can't come back to check if they meet any other condition. **There in lies our clue. We can't look back, but we can look ahead!**

### Length of the string

Let's first test if the string password is 15 chars long. Pretty simple. Use `.length` on the password string. Done, right? No, who needs a simple solution? Let's spice it up.

```js
/^(?=.{4,})$/.test("abc") //false 
/^(?=.{4,})$/.test("abcd") //false

/^(?=.{4,}).*$/.test("abc") //false
/^(?=.{4,}).*$/.test("abcd") //true
```
* You may remember `(?=)` from our previous work on ["no duplicates"](#extension-2-no-duplicates). That's a **look ahead** use. 
* **The dot** (`.`) is an interesting character. It means, **any character**. 
* `{4,}` stands for at least 4 preceding characters. No maximum limit.
* `\d{4}` would look for exactly 4 numerals.
* `\w{4,20}` would look for 4 to 20 alpha-numeric characters.

Let's translate `/^(?=.{4,})$/`. Start from the beginning of the string. Look ahead for at least 4 characters. Don't remember the match. Come back to the beginning and check if the string ends there.

Doesn't sound right. Does it? At least the last bit.

Which is why we brought in the variation `/^(?=.{4,}).*$/`. An extra dot and a star. It reads like this. Start from the beginning. Look ahead for 4 characters. Don't remember the match. Come back to the beginning. Consume all the characters using `.*` and see if you reach the end of the string. 

This makes sense now. Doesn't it? 

Which is why `abc` fails and `abcd` passes the pattern.

### At least one number

This is going to be easy.

```js
e=/^(?=.*\d+).*$/
e.test(""); //false
e.test("a"); //false
e.test("8"); //true
e.test("a8b"); //true
e.test("ab890"); //true

```

In English, start from the beginning of the string `/^`. Look ahead for 0 or more characters `?=.*`. Check if 1 or more numbers follow `\d+`.  Once it matches, come back to the beginning (because we were in look ahead). Consume all the characters in the string until end of the string `.*$/`.

### At Least One Lowercase Letter

This one follows the same patter as above.

```js
e=/^(?=.*[a-z]+).*$/;
e.test(""); //false
e.test("A330"); //false
e.test("a"); //true
```

Translation? Sure. Start from the... ok. Instead of `\d+`, we have `[a-z]` which is a character set of letters from `a` to `z`.

### At least one Uppercase Letter
Let's not overkill. `[A-Z]` instead of `[a-z]` from the previous section will do.

### At least one symbol

This is challenging. One way to match symbols is to place a list of symbols in a character set. `/^(?=.*[-+=_)(\*&\^%\$#@!~`"':;|\\}\]{[/?.>,<]+).*$/.test("$")` That's all the symbols in a character set. Properly escaped where necessary. It'll take months for me to write it in plain English. 

So to save all of us from eternal pain, here is a simple one.

```js
//considers space as symbol
let e1;
e1=/^(?=.*[^a-zA-Z0-9])[ -~]+$/
e1.test("_"); //true
e1.test(" "); //true

//does not take space
let e2;
e2=/^(?=.*[^a-zA-Z0-9])[!-~]+$/
e2.test(" "); //false
e2.test("_"); //true

//the underscore exception
let e3;
e3=/^(?=.*[\W])[!-~]+$/
e3.test("_"); //false
```

Wait, what's that `^` coming again from the middle of no where? If you have reached this far, this is where you realize that unassuming innocent `^` that marks start of a string is a double agent. Which means, the end is not too far. He has been exposed.

Within a character set, `^` negates the character set. That is, `[^a-z]` means, any character other than `a` to `z`. 

`[^a-zA-Z0-9]` then stands for any character other than lower case alphabets, upper case alphabets, and numerals.

We could have used `\W` instead of the long character set. But `\W` stands for all alpha-numeric characters **including underscore _.** As you can see in the third set of examples above, that will not accept underscore as a valid symbol.

### CharSet Range
The curious case of `[!-~]`. They stand next to each other in the keyboard, but their ASCII values are diagonally opposite. 

Remember a-z? A-Z? 0-9? These are not constants. They are actually based on ASCII range of their values. 

[ASCII table](http://www.asciitable.com/) has 125 characters. zero (0) to 31 are not relevant to us. Space starts from 32 going all the way up to 126 which is tilda(~). Exclamation mark is 33.

So `[!-~]` covers all the symbols, letters and numbers we need. The seed for this idea came from [another solution][REGEXP-SYMBOL] to the symbol problem.

### Assemble the Troops

Bringing it all together, we get this nice looking piece of regular expression `/^(?=.{5,})(?=.*[a-z]+)(?=.*\d+)(?=.*[A-Z]+)(?=.*[^\w])[ -~]+$/`. 

That's definitely haunting, even though we've been studying them individually. 

This is where the syntax for building expression object dynamically comes in handy. We are going to build each piece separately and assemble them later.

```js
//start with prefix
let p = "^";
//look ahead

// min 4 chars
p += "(?=.{4,})";
// lower case
p += "(?=.*[a-z]+)";
// upper case
p += "(?=.*[A-Z]+)";
// numbers
p += "(?=.*\\d+)";
// symbols
p += "(?=.*[^ a-zA-Z0-9]+)";
//end of lookaheads

//final consumption 
p += "[ -~]+";

//suffix
p += "$";
//Construct RegExp
let e = new RegExp(p);
// tests 
e.test("aB0#"); //true

e.test(""); //false
e.test("aB0"); //false
e.test("ab0#"); //false
e.test("AB0#"); //false
e.test("aB00"); //false
e.test("aB!!"); //false

// space is in our control
e.test("aB 0"); //false
e.test("aB 0!"); //true

```

If your eyes are not tired yet, you'd have noticed two strange syntax in the above code.

* One, we didn't use `/^`, instead we used just `^`. We didn't use `$/` to end the expression either, instead just `$`. The reason is, `RegExp` constructor automatically adds starting and trailing slashes for us.

* Second, to match numbers, we used `\\d` instead of the usual `\d`. This is because the variable `p` is just a normal string within double quotes. To insert a backslash, you need to escape the backslash itself. `\\d` resolves to `\d` within the regular expression constructor.

Apparently, there should be server side validations for passwords too. Think about SQL injection vulnerabilities if your framework / language doesn't handle it already. 

## 07. Conclusion

That brings us to the end of the story. But this is the beginning of a journey. 

We just scratched the pattern matching portion of RegExp with `test` method. `exec` method builds on this foundation to return matched sub-strings based on pattern.

String object has methods such as `match`, `search`, `replace`, and `split` that widely uses regular expressions.

Hope this sets you off to explore those capabilities further with a solid understanding on composing patterns for RegExp.

## 08. CTA
No, after all this difficulty we've been through, I am not going to ask you to subscribe. 

Just make good software.

If any code blocks presented here do not work, leave a comment on this [github issue](https://github.com/pineboat/pineboat.github.io/issues/3) I created specially for this post.


Hope it was useful! Share it if others would benefit.

You've been wonderful. Appreciate your time. This content is far long by recent standards. Thanks for reading. 

[REGEXP-MDN]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

[ALTERNATING-ANSWER]: https://stackoverflow.com/questions/45504400/regex-match-pattern-of-alternating-characters

[REGEXP-SYMBOL]: https://stackoverflow.com/questions/8359566/regex-to-match-symbols