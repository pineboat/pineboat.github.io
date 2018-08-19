---
draft: true
author: "vijayabharathib"
title: "Progressive Web Apps Simplified - New Natives on Mobiles"
subtitle: "Progressive Web Apps are like X-Men, with super power mutations who are just like any other web apps."
date: "2018-08-20T21:15:59+05:30"
publishdate: "2018-08-20T21:15:59+05:30"
tags: ["Service Workers","Javascript","PWA"]
image: "/img/009_pwa_introduction/pwa-960.png"
image_alt: "Progressive web apps "
image_credit: "Photo by Daniel Lombraña González on Unsplash"
---

Progressive web apps are normal websites. They aim to provide near-native-app-like experience on phones and tablets with the help of JavaScript. They can be added to your phone's home screen. No need to install from market place (though you can, if you want to).

[Realiable, Fast & Engaging](https://developers.google.com/web/progressive-web-apps/) are touted as three key tenets of PWAs.

Let's look at some of the super-power mutations of PWAs.

>I'm going to call Progressive Web Apps as PWAs here onwards, save few bytes, reduce my carbon foot-print on our planet, no less.

## Works offline

Usually, when you are not connected to any network, websites break down and they do not load. You'll usually end up seeing a network error on browsers when you try to access any site.

Not anymore. PWAs come with a piece of JavaScript called *Service Workers* that can cache information related to the site in advance and in the background. Web developers use this capability to cache and show some meaningful content even when you are not connected to any network. 

## Lives In Your Home (Screen)
I mean to say, *Lives on your home screen*. PWAs are normal websites that are visited using browsers. However, modern browsers can sense a PWA from miles away and can show an option to install the site as an app on your mobile or tablet's home screen.

The next time you want to visit that site, you can launch it from your home screen. It will again open up on a browser, but developers can make it look like a native app with full screen experience if they wanted.

## Experience First, Install Next
Since PWAs are web apps, you can first visit them on your browser. Use them. Then you get to decide if you want it on your home screen. Not the other way around, as it happens for native apps. 

Remember those bulky apps you have downloaded, only to find out that ads take more space than the app and removed it immediately? Well, those days are going away. No need to scroll through market place like Google Play or Apple AppStore. No prior downloading required to use PWAs.

## Capable of Notifications

Or should I say, PWAs have the power to annoy you with notifications. Or help you by being a good assistant. Depends on whether the notifications are relevant.

But the bottom line is, they have the power to use mobile notifications like native applications. They will ask your permission to notify. You then live with that decision for the rest of your life (just joking, you can revert that decision, if you can figure out where to go for that).

## Saves You Money (Data Charges)

PWAs can save money for you. If you are using a PWA often, the PWA can cache most of the re-usable content and serve it locally instead of asking the network to deliver the same content.

Browsers, by default, do this kind of caching on all the sites (unless you specifically asked it not to). However, PWAs give developers more control over what to cache and what to do when something is not in the cache.

Every file that was not requested from the network saves you data consumption charges.

## Saves You Money (Development Cost)
If you are developing web apps, PWAs are good news for you too. You do not need to develop individual apps for iOS, Windows and Android. This is web. Works everywhere. One development is quite enough.

If you really want to go for native apps, it is also possible to just wrap this PWA in a native shell. There are products that can support you **TK; phonegap?**

Again you save development cost of duplicating the app across platforms.

## They are really Fast

Naturally, better caching strategy will lead to faster app as network requests usually take longer when compared to content served locally from caches. Imagine a user in India trying to download an image from the US, you cannot get is faster than the speed of light.

Hence, the PWA responds with speed when most of the content is already cached. This helps you interact with the application quicker when you visit it a second time (or navigate to another page). 


## Platform Independent

This is cool. They work on all operating systems and devices as long as you have a working browser. Why? Say it with me, "they are just normal websites with super powers".

While support for features such as "Adding to home screen", "notifications" are varying across browsers and devices, you'll get the basic experience across all devices and browsers. Features are made available progressivly to supporting systems. These features do not break the functionality of the sites on systems that do not support PWAs well.

For example, apple iPhones come with Safari browser which did not support PWAs for a long time. Hence, there was no "Add to home screen" option. However, the website can be accessed and used on Safari browser nonetheless.

Support for PWAs are being added to Safari and others are catching up too. **TK; ADD references and links to compatibility tables**

## Sharing Via Native Apps
Though this is not necessarily the remit of PWAs, web APIs are now allowing content to be shared from websites via native apps such as Twitter & WhatsApp. This brings web apps pretty close to native apps in terms of experience.

## What will you be missing?
Though PWAs are nearing native apps in providing similar performant experience, there are certain features that are not (yet) available on PWAs, such as sensors used by phones. **TK;needs examples.** There are also pitfals the developer needs to be aware of (which might break the experience for users); **TK; mark firtman links may help here**. 

