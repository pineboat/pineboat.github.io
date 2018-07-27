---
author: "vijayabharathib"
title: "Why CSS Selectors are the most useful Selenium WebDriver locators?"
subtitle: "When Front end developers need to locate elements on a web page, they use CSS selectors! Why not for selenium webdriver automation?"
date: "2018-07-10T22:45:59+05:30"
publishdate: "2018-07-10T22:45:59+05:30"
tags: ["CSS Selectors","XPath","Selenium","WebDriver"]
categories: ["Testing"]
image: "/img/008_css_selectors/comparison_with_title.png"
image_alt: "Image showing CSS selector syntax samples"
image_credit: "image created via carbon.now.sh"
---

A wide variety of locators are being used in Selenium Web Driver automation. **CSS selectors** come last when you ask the question, "What are all the locators do you use frequently and why?"

**XPath** tops the list as one size fits all solution. There is also a tendency to use `XPath` even when a proper `id` is available. 

Often, it is also lack of exposure to CSS selectors that drives them towards other options. People have mentioned that they are able to get the job done with other selectors. Fair enough, no harm was done.

## Why do you have to pay attention to CSS selectors?

Answer this question. When you want to put a nail on the wall, will you use a brick, cobblestone or hammer?

Brick and cobblestone can do the job. But, **Hammer** is the tool for the job.

Just like that, there are ways to identify elements in an HTML document/DOM. But CSS selectors are the tool for the job. They have a [specification that browsers need to follow](https://www.w3.org/TR/selectors-3/)

If you are an automation engineer working on UI automation, invest time in learning CSS selectors (how about reading through the rest of the article?). You will reap benefits that are much more.

I can hear your question: "But, it is so easy to copy the XPath. How about CSS selectors?" Trust me, in many browsers, the option is right there next to `Copy XPath`. You'll find `Copy CSS Selector` or `Copy Selector`. 

Do you know why? Because the front-end developers use CSS selectors to apply visuals and behaviors of the web pages even before they come down to testing. 

## Why CSS Selectors Were Invented?

Have you ever wondered why all those classes and IDs are there? Did you ask anyone that I'd need some ID/classes included in these elements so that I can automate tests for this UI? 

If not you, then who asked for those attributes? 

The story goes back to the days when styles were added to HTML documents. This was before UI testing was automated. Each browser had its own way of styling documents. Document (HTML) authors were not in control as to how their documents were presented to readers. Authors needed a way to target tags and apply styles to arrive at the layout they wanted. [Håkon Wium Lie](https://www.w3.org/Style/CSS20/history.html) proposed what would become the current cascading style language. 

Selectors to target specific elements was specified formally by [CSS Working Group](https://www.w3.org/Style/CSS/members). The browser developers take that specification as the requirement and build the browsers to support CSS.

Attributes such as `id` and `class` were added as hooks to target specific elements. They are there to help front-end developers style and attach behaviors to elements. **Automation engineers can piggyback** on the same provisions, CSS selectors, to identify elements.

## How CSS selectors are used?

To style an element, FEDs need to locate the element first and then apply styling rules.

It looks like this:
```css
#logo{
 color: white;
 background: black;
}
```

That CSS snippet says, apply `color` and `background` styles to any element with an ID of `logo`. Normally, ID will be unique in any HTML document carefully crafted. But there are chances for multiple developers working on the same page to use the same ID for different elements. Most of the time, without knowing it is already being used. Don't worry, they'll eventually catch up with that bug, but the point is the browser throws no warning. You should tell the developers when you find such scenarios.

The javascript developer who wants to take the `logo` for a spin writes code like this:

```js
let element=document.querySelector("#logo");
rotate(element);
```

Don't worry about the implementation of `rotate`, but just look at the first line. `document.querySelector` is a native API available to select elements in a browser. ...and it takes CSS selector syntax.

In fact, you can use it within **JavascriptExecutor**.

Since FEDs are using CSS selectors to locate elements (either to style them / amend the elements / to attach behavior to elements), it makes sense for the UI test automation engineers also to use the same API to locate elements.

Convinced? Here is a preview of different selectors replaced by CSS selector.

```js
 Other Selectors          => By.cssSelector
------------------------  => --------------
 By.className("register") => ".register"
 By.tagName("table")      => "table"
 By.id("unique_id")       => "#unique_id"
 By.name("login")         => "[name=login]"
 By.xpath("//body/nav")   => "body > nav"
 By.xpath("//body//nav")  => "body nav"
```
## Four Selectors

Let's look at primitive selectors to start with. There are just about 4 you need to master and this is the easy part.

### Hash `#` for IDs

Any element with a particular ID can be located using `By.cssSelector` by prefixing a hash `#` to the ID. 

For example:
```js
By.cssSelector("#logout")
```

`#logout` will help you locate an element that has ID with a value `logout`. It doesn't matter what the tag name is. It could be a link or a button, but `cssSelector` finds it.

Usually, the ID is unique. It's a fair assumption that there's usually one. Assumptions can go wrong. Twenty developers working on a very busy UI might end up slipping the same ID on two different elements. So, if you wanted to pair it with a tag, you can do so. Put the tag name in front of the ID.

```js
By.cssSelector("a#logout")
```
This selector is even more specific. It says, *find an anchor tag (a link) with an ID valued as `logout`*.

### Dot `.` for Classes

Now that we know how to deal with IDs, locating elements by class names will only be easier than ever.

You need to prefix a dot `.` to the class name to find an element with such a class.

Example overdue:
```js
By.cssSelector(".btn_red")
```

That's going to be a red button (if the developer adds relevant styles), but let's not worry about that. This selector will identify an element with a class `btn_red`. If more than one element is found, the first one is returned.
 
And if you wanted to combine a tag name and a class name? 

```js
By.cssSelector("a.btn_red")
```

That makes sense, isn't it?

### Tag stays the same
Now, this one is even easier. What if you want to locate a particular element using its tag name? **No prefix, no suffix**. Just the tag name will do.

```js
By.cssSelector("table")
```

That will give you the first table on the page. 

### `[attr]` for Attributes

The last selector among the four. This is entirely based on attributes within an element. HTML elements tend to have attributes such as `id`, `name`, `class`, `type`, `src`, `href`, `alt` and a lot more under `data-` prefix.

All these attributes can be used to identify elements if you know that their attributes are uniquely identifiable.

Here is an example:
```html
<img src="logo.png" class="top">
```

The locator could be any one of these:
```js
By.cssSelector("[src]")
By.cssSelector("[src=logo.png]")
By.cssSelector("img[src=logo.png]")
By.cssSelector("img.top[src=logo.png]")
```
* The first one identifies all elements with a `src` attribute
* The second one locates by `src` attribute with a specific value
* Third one uses tag name, attribute and its value
* Fourth one uses tag name, class name, attribute & specific value

They all differ in their specificity. The last one is very specific, the first one is very generic.

It is also possible to specify conditions such as `starts with`, `ends with` or `contains` for attribute values. 

Few examples:

The html first:
```html
<input type="text" class="form_text">
<input type="email" class="form_email">
<input type="radio" class="form_radio">
```

And a few locators using attributes:

By.cssSelector | Description
---------------|------------
`"input[type*=form]"` | input elements with type attribute containing the text `form` in the value
`"input[type^=form]"` | input elements with type attribute starting with `form`
`"input[type$=radio]"` | input elements with type attribute ending with `radio`

## Four Combinators

We saw four different selectors that form the basis of CSS selectors family. We'll now look at four combinators that give special powers to those CSS selectors.

### Plus `+` for Adjacent Sibling

If you want to select an element that follows another element, you can use adjacent sibling combinator using a plus `+`.

Let's set up some sample HTML:
```html
<div id='profile'>
 <img src='head.png'>
 <h1>Mr.Neo</h1>
 <p>The one</p>
</div>
```

If you wanted to select all `h1` tags that are placed right after an `img` tag, you can use the following:
```js
By.cssSelector('img + h1')
```

If you wanted to select all `p` tags that follow a `h1` tag, this would help:
```js
By.cssSelector('h1 + p')
```

It is the rightmost element that is selected. For example, while using `h1 + p`, the `p` element is selected. `h1` is there as a supporting actor.

Finally, what if you wanted to select `img` tag from the previous HTML snippet? Food for thought.

### Tilde `~` for General Sibling

We saw what plus `+` does. What if you wanted to check if an element is a sibling of another element, not necessarily an immediate sibling?

That's where the general sibling combinator comes to rescue. It uses tilde `~` sign to indicate a general sibling.

Let's set up a HTML snippet showing your name and photos:
```html
<div>
 <h1> Your name!</h1>
 <img src='pic1.png'>
 <img src='pic2.png'>
 <img src='pic3.png'>
</div>
```

If you wanted to access all images that are a sibling of a `h1` tag, you can use the general sibling combinator. If there is only one `img`, you'll get just that.

```js
By.cssSelector('h1 ~ img')
```
In this instance, it doesn't matter if the `img` tags follow `h1` immediately. What matters is, they all have the same parent and `img` tags are a sibling to `h1`.

What if you use `img ~ img`? You'll get the last two. Go figure.

And by the way, your dear most `xpath` gives you a way to get elements by sibling via special function: 
```js
 By.xpath("//img/following-sibling::h1")
```

### Angle Bracket `>` For Children
Siblings are fine. But children started crying now. Let's pay attention to them. These are widely used combinators too. You can target an element which is a direct child of a parent element using RIGHT ANGULAR BRACKET `>` sign.

We can reuse some of our earlier HTML snippets:
```html
<div id='profile'>
 <img src='head.png'>
 <h1>Mr.Neo</h1>
 <p>The one</p>
 <div id='crew'>
 <img src='crew1.png'>
 <h2>Mr. Morpheus</h2>
 <p>The other one</p>
 </div>
</div>
```

All three elements can be located using the following options:
```js
By.cssSelector('#profile > img')
By.cssSelector('#profile > h1')
By.cssSelector('#profile > p')
```

These selectors do not locate `img` or `p` tags within the `crew` section. Because they are not direct children of `#profile` element. They are descendants, but not children.

### Space ` ` for Descendants 
We are now down to the fourth and last combinator, the descendant combinator which is designated by a white space ` `.

Let's use the same HTML:
```html
<div id='profile'>
    <img src='head.png'>
    <h1>Mr.Neo</h1>
    <p>The one</p>
    <div id='crew'>
        <img src='crew1.png'>
        <h2>Mr. Morpheus</h2>
        <p>The other one</p>
    </div>
</div>
```

Here is what happens:

Locator | Description
--------|------------
`#profile img` | targets two `img` tags
`#profile h1` | targets the only `h1` tag
`#profile h2` | targets the only `h2` in there
`#profile p` | targets two `p` tags

You see the difference. Descendant combinator selects all matching tags as long as they are descendants of the parent element given.

A small white space has so much meaning!

## Twenty Four Pseudo Classes

There are about 24 pseudo-classes to help you. You can find them in [the specification](https://www.w3.org/TR/selectors-3/#pseudo-classes). But, we'll look at four to pique your interest.

### :not

This one is to negate all you've learned so far. What will do without negatives?
Let's say you want to target an element without a particular class/id/attribute. `:not` will come to your aid.

The HTML:
```html
<input type="text" class="required" />
<input type="text" class="required"/>
<input type="text">
<input type="radio">
<input type="email">
```

If you wanted to locate an input box that is not mandatory (which does not have a class `required` so to speak):

```js
By.cssSelector('input:not(.required)')
```

If you wanted to select all inputs that are not `email` type, then `'input:not([type=email])'` will do.

And you can chain them too, like this: `input:not([type=radio]).not(.required)`. That would give you all inputs that are not radio buttons and do not have a class `required`. In this case, that's just one `text` type and another `email` type inputs.

### :nth-child

This one helps you with targeting a particular element based on its position.

```html
<div id='profile'>
    <h1>Name</h1>
    <img src='pic.png' />
    <img src='background.png' />
    <p>Summary...</p>
    <p>Details...</p>
    <p>Conclusion...</p>
</div>
```
Remember child selector from previous sections. We are going to use it. How do you say, "Get me the second child within the profile". `#profile > *:nth-child(2)` will do. `*` denotes any tag and `nth-child` looks for a particular child based on the number you've given.

You could have used the right tag name instead of `*`, as in `#profile > img:nth-child(2)`. You need to be careful when the tag name does not match. No element will be selected if you use a tag name that is not there. For example, `#profile > h1:nth-child(2)` returns nothing, as the second child is not a `h1` tag.

`:nth-child` takes input like a number, `odd`, `even` and `3n+2`. You can read `3n+2` like, every 3rd element starting from the 2nd element. MDN defines it as `An+B`. This is used more in terms of styling elements. May not be so much for test automation. Let's leave it right there. 

There is another one to get an element counting from bottom: **:nth-last-child**. For example, `#profile > *:nth-last-child(1)` will give you the last child, which is `p` tag that has the text "Conclusion...". The spec has `:last-child` as a pseudo-class that will give you the similar outcome.

I'll leave you to guess what **:first-child** would return.

### :nth-of-type

While `nth-child` takes all children into account, `nth-of-type` takes only the tag type into account. Let's use the same piece of code.

```html
<div id='profile'>
    <h1>Name</h1>
    <img src='pic.png' />
    <img src='background.png' />
    <p>Summary...</p>
    <p>Details...</p>
    <p>Conclusion...</p>
</div>
```
We've seen that, `#profile > img:nth-child(1)` would return nothing, as first child is `h1`, but `#profile > img:nth-of-type(1)` returns the first image. The spec also has something called `:first-of-type` as a shorter version.

What do you do to count from the bottom (reverse order)? Yeah, **:nth-last-of-type** will come to your help. You also have **:last-of-type** to get the bottom-most child of the specified type.

### :disabled

One last pseudo-class we'll look at is `:disabled`. This is handy when you look for a particular element that is either disabled or enabled. In fact, [the specification](https://www.w3.org/TR/selectors-3/#pseudo-classes) has classes like `:enabled`, `:checked` and other pseudo-classes for you to use.

## In Xpath's defense

>Knowing CSS selectors and then choosing XPath as a solution is different from NOT knowing CSS selectors and choosing XPath.

Final words, do not get discouraged if you have been using `XPath` all the while. By now, you would have seen that they are very similar in nature. They have their own pros and cons. `cssSelectors` perform well as they are natives to the browser. `XPath` is more readable in certain instances. Whichever gets the job done is ok. One of these make your code readable? Go for that. Performs well over the other, choose that. Just don't limit your options. 

In my experience, test automation engineers started using `XPath` universally. So, this article was to add a counterweight to `cssSelectors` so that the scale is balanced against `XPath`. In fact, John Resig, creator of jQuery has written about such a [comparison showing how powerful xPath][john-resig] can be.

All righty! **Thank you so much** if you managed to reach this far. Hope it was useful and you get to try your hands on cssSelectors the next time you target an element.

If you think this would help, **[spread](#share)** it to your teams and friends. [Hit me up on twitter](https://twitter.com/vijayabharathib) if you want to discuss. You can also use this [github issue I've set up for discussion on this article](https://github.com/pineboat/pineboat.github.io/issues/7).

See you in the next article.

## References

* [Try this diner game for practice.](https://flukeout.github.io/)
* [Official specification Level 3](https://www.w3.org/TR/selectors-3/)
* [Official draft Level 4](https://drafts.csswg.org/selectors-4/)
* [The ever friendly MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

[john-resig]:https://johnresig.com/blog/xpath-css-selectors/