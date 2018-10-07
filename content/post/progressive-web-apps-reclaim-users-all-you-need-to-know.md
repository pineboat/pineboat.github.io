---
author: "vijayabharathib"
title: "Progressive Web Apps Are All You Need to Reclaim Users"
subtitle: "Progressive Web Apps are like X-Men. They are normal websites with superpower mutations. They learned to live on mobile home screen and work offline! You don't know you are using them."
date: "2018-08-26T15:40:59+05:30"
publishdate: "2018-08-26T15:40:59+05:30"
tags: ["Service Workers","Javascript","PWA","Progressive Web Apps"]
categories: ["Web Development"]
image: "/img/009_pwa_introduction/pwa-960.png"
image_widths: [320,426,640,800,960,1280,1920]
image_alt: "Progressive web apps "
image_credit: "Photo by Daniel Lombraña González on Unsplash"
---

Progressive web apps (PWAs) are normal websites infused with additional functionality. They are capable of **push notifications**, **offline content**, **full screen** experience, and **home screen shortcuts**. They aim to provide near-native app-like experience. They work super fine on mobile phones, tablets and even on desktop browsers across operating systems. 

If you are building a website, you should seriously consider making it a PWA. [Here is why](https://www.pwastats.com/ "Stats from around the planet showing so much user engagement from progressive web apps").

If you need a brief history, [Amberley Romo][AMBERLEY] has [written an origin story][WHAT_IS_PWA] on progressive web apps. 

You don't believe in PWAs? You are in one. This very blog, [pineboat.in][PINEBOAT] is actually a PWA. If you are reading it on a browser, chances are, you are already using a PWA without knowing. And building it wasn't hard.

Let's jump right into this outline showing rich rewards of progressive web apps.

## Article Sections:

* [Compared with Native Apps](#compared-with-native-apps)
* [Work Offline](#work-offline)
* [Live On Your Home Screen](#live-on-your-home-screen)
* [Experience First, Install Next](#experience-first-install-next)
* [Capable of Notifications](#capable-of-notifications)
* [Save Data Charges](#save-data-charges)
* [Save Development Cost](#save-development-cost)
* [Increase Profit](#increase-profit)
* [They Are Really Fast](#they-are-really-fast)
* [Collaborate with Native Apps](#collaborate-with-native-apps)
* [They Are Secure](#secure)
* [They Are Searchable](#searchable)
* [The Bad News](#the-bad-news)
* [Wrap Up](#wrap-up)

## Compared with Native Apps

Native apps are built specific to your device's platform such as Android, iOS, Linux or Windows. They do not work on other platforms. You usually download and install them via a marketplace such as  **Google Play**, **AppStore**, or **Microsoft Store**. 

Let's place these native apps on the far left on our imaginary scale. Their performance is impressive. They respond instantly to your interactions. They have access to all the hardware and sensors. They use that privilege to offer you a vast range of useful functions.

On the far right, we have our humble websites. You access them on your browser of choice. 

You can also install your favorite browser through the marketplace. But once installed, you can access any website on the browser. There is no need for any pre-installation to access a website (if you say **download flash player**, you run the risk of revealing your age!). 

But the downside is, it's a lot more work when you want to access the website again on browser. For both you and the browser. You have to launch the browser and type in the URL to load up the website again. You are smart, you have added the website as a bookmark didn't you? Well, you are one step ahead. 

But still, your browser will **download same content from the server again**. That is going to cost you more time & money. If it takes longer, you'll be tempted to check that sweet popup thrown at you by a native app. Several hours of digital smoking later, you don't even remember you were on a browser waiting for a site to load. 

That site **lost a wonderful customer**, who initiated an interaction a second time on your own. Surely, you don't want to be that site owner, do you?

No, not all is lost! Now comes the middle-ground on the scale. Introducing the progressive web apps (PWAs). They also **start their journey on the browser** when you visit a website. If the website is a PWA, then you are in for a treat:

* You don't need to download anything to use the app first.
* It allows you to install the app from the browser if you wish.
* It downloads only the shell of the app during installation.
* It functions **almost** like a native app from there onwards. 
* It caches previously downloaded data for further use. 
* It has access to sensors like native apps. 
* It can also work when you are offline.
* You can add it to your home screen as any other app
* You can launch it from shortcut without having to open up a browser first. 
* It is quite secure.
* It can also re-engage you with new content via push notification popups

Sounds too good to be true? Trust me, they have been around for a while. All those powers come with fine-print full of exceptions and limitations. We shall see them soon. But you need to pay attention to PWAs as the benefits outweigh the limitations.

**Huge rewards await those who chose PWAs**. You need some [social proof](https://neilpatel.com/blog/social-proof/)?

How about Treebo, Trivago, Uber, BookMyShow, Pinterest, Flipkart, Ola, Twitter, MakeMyTrip and Alibaba? They all reaped awesome rewards after they migrated to PWA. These are just the names I could recognize from https://www.pwastats.com/, you might be in for a surprise. 

Now that the results are compelling, let's take a closer look at some of the super-power mutations of PWAs.

## Work Offline
Let's say you are underground in a dark dungeon. Or just a tube. You are totally disconnected. What happens when you open a native app on your mobile? **Native apps show at least content you have surfed earlier**. 

But load up a website when you are offline. It **completely breaks down**, doesn't it? Yes, Even if you have accessed it earlier. You'll usually end up seeing a network error on browsers. Remember Chrome's dinosaur? Do you know it is actually a game you can play by tapping (or spacebar)? 

Not to worry anymore. PWAs come with a piece of JavaScript called *Service Workers*. These workers can cache information related to the site every time you use it.

Let's say you are back in the tube when you access the site again. You are disconnected again. But **Service Workers** will still be able to serve content from the cache. Websites can be designed to show a meaningful offline message. Better yet, they can show cached content that will be useful to the user. You can even **read full articles on magazines** that are PWAs. 

For example, [on this blog][PINEBOAT], you can access any page you have already accessed even if you are offline. The homepage is always available. If you try to visit a new page, you get a proper offline message.

**Allowing the user to interact with your app, even when they are offline**, has tremendous benefits for the user.

## Live On Your Home Screen
Modern browsers can sense a PWA from miles away. They can show an option to add the site to your mobile or tablet's home screen. I get this even on my [Elementary OS](https://elementary.io/ "Elementary OS home page"), which is a flavor of Linux. If you accept it to add a shortcut, the browser will add the website's logo/icon to your home screen or app drawer.

The next time you want to visit that site, **you can launch it from your home screen**. It will open up just like a native application.

*It will still use the browser in the background*, but it doesn't act like a standalone browser. You can't launch other sites. Some PWAs are designed to be full screen, showing no signs that it is a browser.

If you are curious how do they do it, this is enabled by a file named **manifest.json**. This file holds key-value pairs of information such as the site name, author, theme color. They are usually information shown on home screens. I have written an [article on how to set up a simple skeleton website that you can install on your mobile home screen](/post/javascript-service-workers-add-to-home-screen-install-progressive-web-apps/), you may find it useful to get started.

## Experience First, Install Next
Since PWAs are web apps, you can first visit them on your browser. Use them for as long as you want. Then you get to decide if you want it on your home screen. Not the other way around, as it happens for native apps. 

Remember those bulky apps you have downloaded? Did ads take more space up than the app? I'm sure you removed it instantly. 

Well, those days are going away. No need to scroll through the marketplace like Google Play or Apple AppStore. **No prior downloading required to use PWAs.**

In a surprising turn of events, [PWAs are now being accepted as apps][PWA_MICROSOFT_STORE] within marketplaces. For example, Microsoft store can now list your PWA. Windows 10 users can readily discover and access it from the store itself!

## Capable of Notifications
Or should I say, PWAs have the power to take over your life with annoying notifications? Let's stay positive for the sake of it. **PWAs can help you by being a good assistant.** They actually help you when they show [relevant notification with appropriate content in a timely manner](https://developers.google.com/web/fundamentals/push-notifications/ "Push notifications: Timely, Relevant, and Precise"). 

They have the power to use mobile notifications like native applications. This is called *re-engaging* the user. Reports on changing weather. Informing you when your favorite out-of-stock book is now available. 

PWAs will ask your permission to notify. So you gave permission by accepting the popup request? You then live with that decision for the rest of your life (just joking, you can revert that decision, if you can figure out where to go for that).

If you are a developer, listen to [Uncle Ben](https://en.wikipedia.org/wiki/Uncle_Ben "Uncle Ben from Spiderman") first: 

>**With great power comes great responsibility**. It is quite easy to abuse this push notification API. Easier to annoy users away from your site straight to your competitors.

## Save Data Charges

PWAs can save money for users. If you are using a PWA often, the PWA can cache most of the reusable content. Then they serve it from local cache storage instead of asking the network.

Browsers, by default, do this kind of caching by default (unless you specifically asked it not to). However, PWAs give developers more control over what to cache and what to do when something is not in the cache.
 
**Every file served locally, saves a network request**, which in turn saves you data consumption charges.

## Save Development Cost
Remember that imaginary scale where we placed native apps on the far left? That left side was so heavy because there is one app for each platform. The same app has different versions for iOS,  Android, and Windows. Sometimes, few are not available on other platforms. 

If you are developing web apps, PWAs are good news for you too. **You do not need to develop individual apps for iOS, Windows, and Android.** This is the web. Works everywhere. One development is quite enough.

If you really want to go for native apps, it is also possible to just wrap this PWA in a native shell. There are products that can support you such as [PhoneGap](https://phonegap.com/ "Adobe PhoneGap helps convert PWA to native app") from Adobe.

Again you save development cost of duplicating the app across platforms. Just a shell containing the PWA will be sufficient.

You need to be mindful of platforms and their limitations. Support for PWAs is being added to Safari. Chrome on Android and Edge on Windows have good support matrix and others are catching up too. Look up at current support spread for  [Service Workers][CAN_SERVICE_WORKERS] and [Web App Manifest][CAN_WEB_MANIFEST].

## Increase Profit
If you are an app developer, there is no end to good news streak. If you generate revenue out of native apps, your platform provider (Google/Apple...) may already be taking a share of your revenue in return for the marketplace they gave you.

In contrast, since PWAs are websites, you do not need a platform or marketplace. They will work in browsers. And, You do not have to share your profit with the platform provider.

**Your revenue is yours and yours alone.** Time to buy that island you always wanted.

## They Are Really Fast
Naturally, better-caching strategy will lead to a faster response from the app. As network requests usually take longer when compared to content served locally from cache storage.

Imagine a user in India trying to download an image from the US, *you cannot get it faster than the speed of light*. That's already 100 ms for the round trip for a speedy ray of light.

But if the web developer managed to cache it the first time and serve it instantly from your phone's storage itself, that's like zero time spent in transit.

This allows **users to interact with the application sooner**.

## Collaborate With Native Apps
When you are using a native mobile application, it is easy to share things across applications. For example, you can easily share a tweet from Twitter app to WhatsApp or Facebook and vice-versa.

This is now possible on web apps. This is not necessarily the remit of PWAs, sharing APIs are now available on normal websites. They allow content to be shared from websites via native apps such as Twitter, Facebook...etc. This brings web apps pretty close to native apps. The collaboration between apps and sharing experience is very identical.

## Secure 
One of the mandates for PWA is to use HTTPS, which is a secure version of the HTTP protocol used on the web. This ensures that **the app and data transmitted are not tampered** with. 

## Searchable
PWA is searchable by bots from search engines. Since PWAs are normal websites (uh, for the 10th time today), their **content can be easily indexed and listed down by search engines**. So, you get to have **more traffic** from search engines if your content is open to indexing.

For example, it is easy for search engines to index all the hotels listed by a web app. But if it is a native Android or iOS app, search engines cannot index their content unless the app developers enable indexing. That would take a lot of extra work. If you own multiple native apps, one for each platform, then you need to repeat that work across.

## The Bad News
There is always another side to each coin.  but there are certain features that are not (yet) available on PWAs. 

For example, native apps can access all the sensors on a mobile phone, while web applications may not have access to a full range of sensors. 

There are also pitfalls the developer needs to be aware of (which might break the experience for users). For example, full-screen PWAs will need manual navigation especially when your phone does not have a **back** button. 

There is a whole article on medium [detailing problems with PWA on iOS][PWA-PROBLEM] by Max Firtman, who has also written about what is included when [iOS finally started supporting PWAs][PWA-IOS].

The support matrix we saw earlier for [Service Workers][CAN_SERVICE_WORKERS] and [Web App Manifest][CAN_WEB_MANIFEST] shows the gap that has to be bridged by browser makers. 

Be mindful of the population that is using browsers that do not support PWAs yet. Better yet, be mindful of devises that do not process JavaScript.

## Wrap Up
So far, we have established PWAs as close alternatives to native apps. We have seen their superpowers. They take **very little extra effort** when compared to building a regular website. But the benefits are worth many fold more. They also save you huge effort from building native apps. 

>PWAs are a huge win-win, both for users and organizations.

With that, I conclude this simplified introduction to progressive web apps.

If you are not part of the web development community, hopefully, this article has given you some understanding of what's possible when you convert a website into a fully functional PWA.

If you are a developer, then it is surprisingly easy to get one up and running quickly. A bare PWA will only need a small manifest (nothing but a JSON file with a bunch of lines about the app) and a JavaScript file to register a Service Worker. 

If you are totally new to **Service Worker** arena, get started with this article on [Run to completion][EVENT_RUN] and this one on [Introduction to promises][RETHINK_PROMISES]. *They will help you understand how service workers and fetch API work.* 

Either way, [stay tuned for next round of articles](http://eepurl.com/cYynNv "You should subscribe to the newsletter for further articles") information on how to build a PWA and realize the benefits listed above.

**Thanks for reading** through, hope it helped.

Leave an email with me on [writer@vijayabharathi.in](mailto:writer@vijayabharathi.in) for your queries. There is also a [github issue where we can discuss](https://github.com/pineboat/pineboat.github.io/issues/15 "GitHub issue for discussion on this article") this further. If you are more social type, [come and say hi on twitter!](https://twitter.com/vijayabharathib "Vijay's twitter profile")!

## Further Reading
* [A List Apart Article on PWA by Aaron Gustafson](https://alistapart.com/article/yes-that-web-project-should-be-a-pwa "Yes, that web project should be a PWA")
* [A new way to deliver amazing user experience on the web, By Google](https://developers.google.com/web/progressive-web-apps/ "Progressive Web Apps page")
* [Stories from across the planet showing what PWAs can achieve](https://www.pwastats.com/)

[AMBERLEY]: https://medium.com/@amberleyjohanna "Amberley Romo's medium profile"
[WHAT_IS_PWA]: https://medium.com/@amberleyjohanna/seriously-though-what-is-a-progressive-web-app-56130600a093 "Seriously, though. What is a progressive web app?" 
[PINEBOAT]: https://www.pineboat.in/ "The pineboat.in blog as PWA example"
[PWA-PROBLEM]: https://medium.com/@firt/pwas-are-coming-to-ios-11-3-cupertino-we-have-a-problem-2ff49fd7d6ea "PWAs are coming to iOS 11.3: Cupertino, we have a problem"
[PWA-IOS]: https://medium.com/@firt/progressive-web-apps-on-ios-are-here-d00430dee3a7 "Progressive Web Apps on iOS Are Here"
[CAN_SERVICE_WORKERS]: https://caniuse.com/#feat=serviceworkers "Support information for Service Workers from CanIUse.com"
[CAN_WEB_MANIFEST]: https://caniuse.com/#feat=web-app-manifest "Support information for Web App Manifest from CanIUse.com"
[PWA_MICROSOFT_STORE]: https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps/microsoft-store "Submitting PWAs to Microsoft Store"
[RETHINK_PROMISES]: https://www.pineboat.in/post/javascript_promise_fix_callback_async_await_future_error_handle/ "Re-Think Promises When You Write Async JavaScript"
[EVENT_RUN]: https://www.pineboat.in/post/javascript-run-to-completion-event-loop-asynchronous-foundations/ "Think Event Loop When You Want to Run to Completion"