---
draft: true
author: "vijayabharathib"
title: "Progressive Web Apps Simplified - New Natives on Mobiles"
subtitle: "Progressive Web Apps are like X-Men. They are normal websites with super power mutations. They learned to live on mobile home screen and work offline! You don't know you are using them."
date: "2018-08-21T21:15:59+05:30"
publishdate: "2018-08-21T21:15:59+05:30"
tags: ["Service Workers","Javascript","PWA","Progressive Web Apps"]
image: "/img/009_pwa_introduction/pwa-960.png"
image_alt: "Progressive web apps "
image_credit: "Photo by Daniel Lombraña González on Unsplash"
---

Progressive web apps (PWAs) are normal websites. They aim to provide near-native app-like experience on mobile phones and tablets with the help of JavaScript. This article aims to introduce you to PWA capabilities such as **push notifications**, **offline content**, **full screen** experience and **home screen shortcuts**.

This blog, [pineboat.in](https://www.pineboat.in/) is actually a PWA. If you are reading it on a browser, chances are I'm already making it a PWA without you knowing.

## Compared with Native Apps

Native apps are applications specific to your phone's platform such as Android, iOS or Windows. These applications are built to work only on that platform. You usually download and install them via a marketplace such as  **Google Play**, **AppStore**, or **Microsoft Store**. 

Let's place it on the far left. They usually perform well and responsive to your touches. They have access to all the hardware and sensors in your mobile phone, so their capable range of functionality is quite vast.

On the far right, we have browsers installed on mobiles. Browsers such as Chrome, Safari or Edge are also installed through market place. But once installed, you can access any web app you want. There is no need for any pre-installation to access a website. But the downside is, anytime you want to access a website, you have to launch the browser, load up the URL (which will download necessary files from the server again, costing you money).

>Progressive Web Apps are called as PWAs. I'm going to use that here onwards, save few bytes, reduce my carbon foot-print on our planet, no less.

Now comes the middle-ground, the progressive web apps (PWAs). They also start their journey on the browser when you visit a website. If the website has PWA functionality enabled (which is the case for most of the modern browsers), then:


* They function **almost** like native apps. 
* They cache the data downloaded from server for further use. 
* They have access to sensors like native apps. 
* They can also work when you are offline.
* They can be added to your home screen as any other app
* They can be launched at will, without having to open up a browser first. 
* And no large-sized download and installation required.

Sounds too good to be true? Trust me, they have been around for a while. Chances are some of the most common social networks and eCommerce sites you are using are already PWAs.

All those powers come with fine-print full of exceptions and limitations, which we'll see soon. But the three key tenets of PWAs: [Realiable, Fast & Engaging](https://developers.google.com/web/progressive-web-apps/) are at the core of the concept.

Let's take a closer look at some of the super-power mutations of PWAs.

## Works offline

Usually, when you are not connected to any network, websites break down or they may not load in the first place. You'll usually end up seeing a network error on browsers when you try to access any site. Remember Chrome's dinosaur? Do you know it is actually a game you can play by tapping (or space bar)? 

Not anymore. PWAs come with a piece of JavaScript called *Service Workers* that can cache information related to the site in advance and in the background. If you are a developer, this will help you cache and show some meaningful content even when users are not connected to any network. 

## Lives On Your Home Screen
PWAs are normal websites that are visited via browsers. However, modern browsers can sense a PWA from miles away and can show an option to add the site to your mobile or tablet's home screen. If you accept it, the browser will add the website's logo/icon to your home screen.

The next time you want to visit that site, you can launch it from your home screen. It will open up as a native application. It will still use the browser in the back-end, but you wouldn't be able to use it as standalone browser to launch other sites.

## Experience First, Install Next
Since PWAs are web apps, you can first visit them on your browser. Use them for as long as you want. Then you get to decide if you want it on your home screen. Not the other way around, as it happens for native apps. 

Remember those bulky apps you have downloaded, only to find out that ads take more space than the app and removed it immediately? Well, those days are going away. No need to scroll through market place like Google Play or Apple AppStore. No prior downloading required to use PWAs.

## Capable of Notifications

Or should I say, PWAs have the power to annoy you with notifications. Or help you by being a good assistant. Depends on whether the notifications are relevant.

But the bottom line is, they have the power to use mobile notifications like native applications. They will ask your permission to notify. You then live with that decision for the rest of your life (just joking, you can revert that decision, if you can figure out where to go for that).

>As Uncle Ben said, **with great power comes great responsibility**. It is quite easy to abuse this push notification API and annoy users away from your site straight to your competitors.

## Saves You Money (Data Charges)

PWAs can save money for users. If you are using a PWA often, the PWA can cache most of the re-usable content and serve it locally instead of asking the network to deliver the same content.

Browsers, by default, do this kind of caching on all the sites (unless you specifically asked it not to). However, PWAs give developers more control over what to cache and what to do when something is not in the cache.

Every file that was not requested from the network saves you data consumption charges.

## Saves You Money (Development Cost)
If you are developing web apps, PWAs are good news for you too. You do not need to develop individual apps for iOS, Windows and Android. This is web. Works everywhere. One development is quite enough.

If you really want to go for native apps, it is also possible to just wrap this PWA in a native shell. There are products that can support you **TK; phonegap?**

Again you save development cost of duplicating the app across platforms.

## Saves Money Again - Profit Sharing
If you are an app developer, this is more good news. If you generate revenue out of native apps, your platform provider (Google/Apple/Microsoft...) may already taking a share of your revenue in return for the marketplace they gave you.

In contrast, since PWAs are websites, you do not need a platform or market place. They will work on browsers. And, You do not have to share your profit with the platform provider.

## They are really Fast

Naturally, better caching strategy will lead to faster app as network requests usually take longer when compared to content served locally from caches. Imagine a user in India trying to download an image from the US, *you cannot get is faster than the speed of light*. That's already 100 ms for the round trip for a speedy ray of light.

Hence, the PWA responds with speed when most of the content is already cached and available locally. This helps you interact with the application quicker when you visit it a second time. It also helps navigate to another page on the same site if that page is also using cached resources. 

## Platform Independent

This is cool. They work on all operating systems and devices as long as you have a working browser. Why? Say it with me, "they are just normal websites with super powers".

While support for features such as "Adding to home screen", "notifications" are varying across browsers and devices, you'll get the basic experience across all devices and browsers. Features are made available incrementally to supporting systems. These features do not break the functionality of the sites on systems that do not support PWAs well.

For example, apple iPhones come with Safari browser which did not support PWAs for a long time. Hence, there was no "Add to home screen" option. However, the website can be accessed and used on Safari browser nonetheless.

Support for PWAs are being added to Safari and others are catching up too. **TK; ADD references and links to compatibility tables**

## Sharing Via Native Apps
Though this is not necessarily the remit of PWAs, web APIs are now allowing content to be shared from websites via native apps such as Twitter & WhatsApp. This brings web apps pretty close to native apps in terms of experience.

## What will you be missing?
Though PWAs are nearing native apps in providing similar performant experience, there are certain features that are not (yet) available on PWAs, such as sensors used by phones. **TK;needs examples.** There are also pitfalls the developer needs to be aware of (which might break the experience for users); **TK; mark firtman links may help here**. 

