---
draft: true
author: "vijayabharathib"
title: "Progressive Web Apps Simplified - New Natives on Mobiles"
subtitle: "Progressive Web Apps are like X-Men. They are normal websites with super power mutations. They learned to live on mobile home screen and work offline! You don't know you are using them."
date: "2018-08-25T21:15:59+05:30"
publishdate: "2018-08-25T21:15:59+05:30"
tags: ["Service Workers","Javascript","PWA","Progressive Web Apps"]
categories: ["Web Development"]
image: "/img/009_pwa_introduction/pwa-960.png"
image_alt: "Progressive web apps "
image_credit: "Photo by Daniel Lombraña González on Unsplash"
---

Progressive web apps (PWAs) are normal websites infused with additional functionality. They are capable of **push notifications**, **offline content**, **full screen** experience and **home screen shortcuts**. They aim to provide near-native app-like experience on mobile phones, tablets and even on desktop browsers. 

If you are contributing to web development, you should seriously consider making it a PWA. 

If you need a brief history, [Amberley Romo][AMBERLEY] has [written an origin story][WHAT_IS_PWA] on progressive web apps. 

This blog, [pineboat.in][PINEBOAT] is actually a PWA. If you are reading it on a browser, chances are, you are already using a PWA without knowing. And building it wasn't hard.

Jump right into this outline showing benefits of PWAs.

## Article Sections:

* [Compared with Native Apps](#compared-with-native-apps)
* [Works Offline](#works-offline)
* [Lives On Your Home Screen](#lives-on-your-home-screen)
* [Experience First, Install Next](#experience-first-install-next)
* [Capable of Notifications](#capable-of-notifications)
* [Saves Data Charges](#saves-data-charges)
* [Increases Profit](#increases-profit)
* [Saves Development Cost](#saves-development-cost)
* [Collaborate with Native Apps](#collaborate-with-native-apps)
* [They Are Really Fast](#they-are-really-fast)
* [What Will You Be Missing?](#what-will-you-be-missing)

## Compared with Native Apps

Native apps are applications specific to your device's platform such as Android, iOS, Linux or Windows. These applications are specially built to work only on that platform. You usually download and install them via a marketplace such as  **Google Play**, **AppStore**, or **Microsoft Store**. 

Let's place it on the far left on our imaginary scale. They are usually high performing apps and quite responsive to your interactions such as touch. They have access to all the hardware and sensors in your mobile phone, so the are capable a vast range of useful functions.

On the far right, we have our humble websites. They are accessed through browsers installed on mobiles. Browsers such as Chrome, Safari or Edge are also installed through market place. 

But once installed, you can access any website on the browser. There is no need for any pre-installation to access a website (if you jump start and say *flash*, you run the risk of revealing your age!). 

But the downside is, anytime you want to access a website a second time, you have to launch the browser and type in the URL to load up the website again. You are smart, you have added the website as a bookmark didn't you? Well, you are one step ahead. 

But still, your browser will download necessary files from the server again, costing you time & money. If it takes longer, you'll be tempted to check that sweet popup thrown at you by a native app. Several hours of digital smoking later, you don't even remember you were on a browser waiting for a site to load. 

That site lost a wonderful customer, who initiated an interaction a second time on her own. Surely, you don't want to be that site owner, do you?

No, not all is lost! Now comes the middle-ground, the progressive web apps (PWAs). They also start their journey on the browser when you visit a website. If the website is a PWA, then you are in for a treat:

* It functions **almost** like native app. 
* It caches the data downloaded from server for further use. 
* It has access to sensors like native apps. 
* It can also work when you are offline.
* It can be added to your home screen as any other app
* It can be launched at will, without having to open up a browser first. 
* It is quite secure.
* It can also re-engage you with new content via popups
* And no large-sized download and installation required for you to try the app first.

Sounds too good to be true? Trust me, they have been around for a while. All those powers come with fine-print full of exceptions and limitations, which we'll see soon.

Time for social proof: Treebo, Trivago, Uber, BookMyShow, Pinterest, Flipkart, Ola, Twitter, MakeMyTrip and Alibaba, all had some good news after they migrated to PWA. These are some names I recognized from [https://www.pwastats.com/], you might be in for a surprise. 

Let's take a closer look at some of the super-power mutations of PWAs.

## Works offline

Usually, when you are not connected to any network, native apps at least show a skeleton or past information. But websites completely break down. You'll usually end up seeing a network error on browsers when you try to access any site.

Remember Chrome's dinosaur? Do you know it is actually a game you can play by tapping (or space bar)? 

Not anymore. PWAs come with a piece of JavaScript called *Service Workers*. These workers can cache information related to the site in advance or during first time use.

When you access the site the second time, if you are offline, the **Service Workers** will still be able to serve content from cache. The website can be designed to show a meaningful offline message and also show cached content that will be useful to the user.

For example, [on this blog][PINEBOAT], you can access any page you have already accessed even if you are offline. The home page is always available. If you try to visit a new page, a proper offline message is given.

Allowing the user to interact with your app, even when they are offline, has tremendous benefits to the user.

## Lives On Your Home Screen
Modern browsers can sense a PWA from miles away. They can show an option to add the site to your mobile or tablet's home screen. I get this even on my [Elementary OS](https://elementary.io/ "Elementary OS home page"), which is a flavor of linux. If you accept it to add a shortcut, the browser will add the website's logo/icon to your home screen or app drawer.

The next time you want to visit that site, you can launch it from your home screen. It will open up just like a native application. It will reuse the assets downloaded earlier to show at least the shell of the application if you are offline.

It will still use the browser in the background, but it doesn't act like a standalone browser. You can't launch other sites. Some PWAs are designed to be full screen, showing no signs that it is a browser.

If you are curious how do they do it, this is enabled by a file named **manifest.json**. This file holds key value pairs of information such as the site name, author, theme color. You can recognize some of them as info shown on home screens. 

## Experience First, Install Next
Since PWAs are web apps, you can first visit them on your browser. Use them for as long as you want. Then you get to decide if you want it on your home screen. Not the other way around, as it happens for native apps. 

Remember those bulky apps you have downloaded, only to find out that ads take more space than the app and removed it immediately? 

Well, those days are going away. No need to scroll through market place like Google Play or Apple AppStore. No prior downloading required to use PWAs. 

In a surprising turn of events, [PWAs are now being accepted as apps][PWA_MICROSOFT_STORE] within market places. For example, Microsoft store can now list your PWA, so that windows 10 users can readily access it from the store itself!

## Capable of Notifications

Or should I say, PWAs have the power to take over your life with annoying notifications. Let's stay positive for the sake of it. PWAs can help you by being a good assistant, by showing [relevant notification with appropriate content in a timely manner](https://developers.google.com/web/fundamentals/push-notifications/ "Push notifications: Timely, Relevant, and Precise"). 

But the bottom line is, they have the power to use mobile notifications like native applications. This is called *re-engaging* the user. 

PWAs will ask your permission to notify. If you accept it, You then live with that decision for the rest of your life (just joking, you can revert that decision, if you can figure out where to go for that).

If you are a developer, listen to [Uncle Ben](https://en.wikipedia.org/wiki/Uncle_Ben "Uncle Ben from Spiderman") first: 

>**With great power comes great responsibility**. It is quite easy to abuse this push notification API and annoy users away from your site straight to your competitors.

## Saves Data Charges

PWAs can save money for users. If you are using a PWA often, the PWA can cache most of the re-usable content and serve it from local cache storage instead of asking the network to deliver the same content.

Browsers, by default, do this kind of caching by default (unless you specifically asked it not to). However, PWAs give developers more control over what to cache and what to do when something is not in the cache.
 
**Every file served locally, saves a network request**, which in turn saves you data consumption charges.

## Saves Development Cost
Remember that imaginary scale where we placed native apps on the far left? That left side was so heavy because there is one app for each platform. The same app has different versions for iOS,  Android and Windows. Sometimes, few are not available on other platforms. 

If you are developing web apps, PWAs are good news for you too. You do not need to develop individual apps for iOS, Windows and Android. This is web. Works everywhere. One development is quite enough.

If you really want to go for native apps, it is also possible to just wrap this PWA in a native shell. There are products that can support you such as [PhoneGap](https://phonegap.com/ "Adobe PhoneGap helps convert PWA to native app") from Adobe.

Again you save development cost of duplicating the app across platforms. Just a shell to contain the PWA will be sufficient.

You need to be mindful about platforms and their limitations. Support for PWAs are being added to Safari. Chrome on Android and Edge on Windows have good support matrix and others are catching up too. Look up at current support spread for  [Service Workers][CAN_SERVICE_WORKERS] and [Web App Manifest][CAN_WEB_MANIFEST].

## Increases Profit
If you are an app developer, there is no end to good news streak. If you generate revenue out of native apps, your platform provider (Google/Apple...) may already taking a share of your revenue in return for the marketplace they gave you.

In contrast, since PWAs are websites, you do not need a platform or market place. They will work on browsers. And, You do not have to share your profit with the platform provider.

Your revenue is yours and yours alone. Time to buy that island you always wanted.

## They are really Fast

Naturally, better caching strategy will lead to faster response from the app. As network requests usually take longer when compared to content served locally from cache storage.

Imagine a user in India trying to download an image from the US, *you cannot get it faster than the speed of light*. That's already 100 ms for the round trip for a speedy ray of light.

But if your developer managed to cache it the first time and serve it instantly from your phone's storage itself, that's like zero time spent in transit.

This allows **users to interact with the application sooner**.

## Collaborate With Native Apps
When you are using a native mobile application, it is easy to share things across applications. For example, you can easily share a tweet from Twitter app to WhatsApp or Facebook and vice-versa.

This is now possible on web apps. Though this is not necessarily the remit of PWAs, web APIs are now allowing content to be shared from websites via native apps such as Twitter, Facebook, Linked-In & WhatsApp. This brings web apps pretty close to native apps in terms of collaboration between apps and sharing experience.

# Secure And Searchable
One of the mandate for PWA is to use HTTPS, which is a secure version of the HTTP protocol used on the web. This ensures that the app and data transmitted is not tampered with. 

Also, the PWA is searchable by bots from search engines. Since PWAs are normal websites (uh, for the 10th time today), their content can be easily indexed and listed down by search engines. So, you get to have traffic from search engines if your content is open to indexing.

For example, it is easy for search engines to index all the hotels listed by a web app. But if it is a native Android or iOS app, search engines cannot index their content unless the app developers enable indexing. That would take extra work and if you own multiple native apps, one for each platform, then you need to repeat that work across.

## The Bad News
There is always another side to each coin.  but there are certain features that are not (yet) available on PWAs. 

For example, native apps can access all the sensors on a mobile phone, while web applications may not have access to full range of sensors. 

There are also pitfalls the developer needs to be aware of (which might break the experience for users). For example, full screen PWAs will need manual navigation especially when your phone does not have a **back** button. 

There is a whole article on medium [detailing problems with PWA on iOS][PWA-PROBLEM] by Max Firtman, who has also written about what is included when [iOS finally started supporting PWAs][PWA-IOS].

The support matrix we saw earlier for [Service Workers][CAN_SERVICE_WORKERS] and [Web App Manifest][CAN_WEB_MANIFEST] shows the gap that has to be bridged by browser makers. 

Be mindful of the population that is using browsers that do not support PWAs yet. 

## Wrap Up
So far, we have established PWAs as close alternatives to native apps. We have seen their super powers. They take little extra effort when compared to building a regular website. But they cut off huge work from building native apps. With the user in mind, they are a huge win-win.

With that, I conclude this simplified introduction to progressive web apps.

If you are not part of the web development community, hopefully, this article has given you some understanding about what's possible when you convert a website into a fully functional PWA.

If you are a developer, then it is surprisingly easy to get one up and running quickly. A bare PWA will only need a small manifest (nothing but a JSON file with a bunch of lines about the app) and a JavaScript file to register a Service Worker. 

Either way, [stay tuned for next round of articles](http://eepurl.com/cYynNv "You should subscribe to the newsletter for further articles") information on how to build a PWA and realize the benefits listed above.

Thanks for reading through, hope it helped. [Leave an email with me on writer@vijayabharathi.in](mailto:writer@vijayabharathi.in) for your queries. 

Headlines:

progressive web app super powers you can digest quickly , EMV 33, HS 63

Jargon free introduction to progressive web apps EMV 42, HS 62

Wicked progressive web apps that actually work offline EMV 37, HS 67

Introducing Ultimate Rewards in the Progressive Web Apps
EMV 25, HX 76

[AMBERLEY]: https://medium.com/@amberleyjohanna "Amberley Romo's medium profile"
[WHAT_IS_PWA]: https://medium.com/@amberleyjohanna/seriously-though-what-is-a-progressive-web-app-56130600a093 "Seriously, though. What is a progressive web app?" 
[PINEBOAT]: https://www.pineboat.in/ "The pineboat.in blog as PWA example"
[PWA-PROBLEM]: https://medium.com/@firt/pwas-are-coming-to-ios-11-3-cupertino-we-have-a-problem-2ff49fd7d6ea "PWAs are coming to iOS 11.3: Cupertino, we have a problem"
[PWA-IOS]: https://medium.com/@firt/progressive-web-apps-on-ios-are-here-d00430dee3a7 "Progressive Web Apps on iOS Are Here"
[CAN_SERVICE_WORKERS]: https://caniuse.com/#feat=serviceworkers "Support information for Service Workers from CanIUse.com"
[CAN_WEB_MANIFEST]: https://caniuse.com/#feat=web-app-manifest "Support information for Web App Manifest from CanIUse.com"
[PWA_MICROSOFT_STORE]: https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps/microsoft-store "Submitting PWAs to Microsoft Store"