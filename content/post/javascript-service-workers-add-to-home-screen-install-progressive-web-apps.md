---
draft: true
author: "vijayabharathib"
title: "Develop a Progressive Web App and Install it in Under 6 Minutes"
subtitle: "Adding JavaScript service workers to your site shouldn't take hours. You can set one up in minutes."
date: "2018-09-06T21:15:59+05:30"
tags: ["Service Workers","Javascript","PWA"]
image: "/img/newlogo.png"
image_alt: "important message about image"
image_credit: "credit the image owner"
---
Creating a web page is surprisingly easy. All you need is a single HTML file. But converting it to a [Progressive Web App][PWA_POST] that you can install is shockingly easier. You need two more files, with less than 10 lines each.

I have created a repository named [pwa-features][PWA_REPO] that you can use for reference.

Let's get that HTML file out of the way first.

## HTML - The King

Create a file named `index.html`. This will be the entry point to our site.

```html
<html>
<body>
  <h1>Web App</h1>
</body>
</html>
```

You can open this file directly on a browser. But you are a web  developer now. You'll use a web server to serve the files to the browser. 

If you have Python installed on your machine, you can readily serve the local folder using the following command on a terminal:

```
python -m SimpleHTTPServer
```

Just ensure you are inside the project folder where you stored `index.html`. It serves the web under `localhost:8000` by default. That's your development URL. You put that on the browser and you'll get the contents of `index.html` rendered.

All you see is **Web App** heading in the page. Next up is the manifest.

## Manifest - The Queen 

Web App Manifest is a `json` file (with key/value pairs of information about the application). Create a file named `manifest.json` in the same place where you created `index.html`.

You need to have four keys within the file.

1. `name`
2. `start_url`
3. `display`
4. `icons`

These four keys tell the browser about your website and how to show that when it is installed.

The manifest file:

```json
{
  "name": "PWA Demo",
  "start_url": ".",
  "display": "standalone",
  "icons": [{
    "src": "images/logo-192.png",
    "sizes": "192x192",
    "type": "image/png"
  }, {
    "src": "images/logo-512.png",
    "sizes": "512x512",
    "type": "image/png"
  }]
}
```
You can reuse the png from the [pwa-features][PWA_REPO] repository. Or you can create your own. Either way, create a folder named `images` and place two place two `png` images with appropriate size.

Now that the Web App Manifest is ready, we can point our website at it. Place a `link` tag inside the `head` portion pointing at the json file. 

Back to the HTML.

```html
<html>
<head>  
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <h1>Web App</h1>
</body>
</html>
```

If you are using Chrome, get into **Dev tools**, under **application** tab, you'll be able to see the application details with images.

Within the same tag, you have option to **Add to home screen**. If you try that now, You should get an error like this: 

```
The site cannot be installed, no matching service worker detected.
```

There in lies our clue. We need a service worker. Let's hire one.

## Service Worker - The Knight

Service worker is a piece of JavaScript that can be used to intercept network requests by the browser. It can also run background synchronization jobs for us. Though it doesn't have direct access to the DOM, above mentioned capabilities will come in handy for us later in the series.

But for now, we need a simple worker who can help us qualify the browser needs. Chrome needs a service worker to recognize our humble HTML file as a progressive web app.

All right, first, we need to code the worker itself. This is the simplest of the three. 

I have named the file as `sw01.js`, But you can give it a cheeky one if you want. 

```js
self.addEventListener('fetch', event=> {
    let response=fetch(event.request);
    event.respondWith(response);
});
```

That's the whole service worker boilerplate. It listens to `fetch` events from the browser. Takes that request, send it to the network and responds with whatever it received.

No magic here. Nothing useful. In fact, if anything, this service worker just added few milli-seconds delay to the network request by being the middle agent.

We are going to delegate a lot of useful tasks to this simple worker later. But this will do for now.

Now, time to register the worker as our employee in the browser. This is all we have in our `index.html`.

```html
<html>
<head>
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <h1>Web App</h1>
</body>
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=> {
      navigator
      .serviceWorker
      .register('sw01.js')
      .then(()=>console.log("Ready."))
      .catch(()=>console.log("Err..."));
    });
  }
</script>
</html>
```

What happens now is very simple, the browser loads `index.html` and fires the content of the `<script>` tag at the bottom. 

If you are new `then` and `catch`, don't worry. You are new to [Promises] in JavaScript. Though it is not important to understand each line now, it will be useful for you to understand [Run to completion][RTC-POST] and [Asynchronous JavaScript Programming using Promises][PROMISES-POST]. 

Service workers use Promises extensively. This series will use Promises going forward, though not extensively on this article.

The script tag has following instructions:

1. Check if `serviceWorker` is supported.
2. If yes, add a listener to the `window.load` event. This is to ensure the page is fully loaded before we start using `serviceWorker`
3. When the page is loaded, register the `sw01.js` as the file where we have programmed our service worker.
4. If the registration is successful, print `Ready` to the console. If not, well, `Err...`

If you refresh the browser window on `localhost:8000` now, you can see `Ready` printed on the console. Chrome shows a pop up `Add this app to the shelf to access it easily later`. 

Click on the `Add to home screen` link within the dev tools. You don't see any error. Instead, the app is added to the list of applications. In my case, I'm using [Elementary OS](https://elementaryos.io), which shows the application in the list.

That's less than 40 lines, including the manifest to convert a bare `html` file into an app that you can install.

So far, we've used only the `localhost` development environment. To go online, we can use GitHub itself. It is very easy to switch on [Github Pages][GH_PAGES] for this repository and install this app from internet. 

You need to ensure that the relative path is set up properly. GitHub pages use repository name in the URL. So, any resource URL mentioned with a slash (/) will fail as it takes from the root (which is normally the URL for user without repository). 

So instead of `/sw01.js` , use `sw01.js`. Instead of `/manifest.json`, use `manifest.json`. 

Once you turn on GitHub pages, your repository is automatically available as a web app.

For example, [the pwa-features repository][PWA_REPO] has been turned into a web app that we can access via https://vijayabharathib.github.io/pwa-features/, thanks to GitHub.

If you access it on your mobile browser like Chrome or Brave, it should show a pop up to add the site to your home screen in 30 seconds.

References:

1. [Web App Manifest Specification](https://w3c.github.io/manifest/)
2. Web App Manifest [on MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest) and [on Google Web Fundamentals](https://developers.google.com/web/fundamentals/web-app-manifest/)
3. Add to Home Screen [A2HS reference on MDN](https://developer.mozilla.org/en-US/docs/Web/Apps/Progressive/Add_to_home_screen#How_do_you_make_an_app_A2HS-ready)
4. Add to Home Screen - [A2HS Reference on Google Web Fundamentals](https://developers.google.com/web/fundamentals/app-install-banners/)

**Hope it helps you get started, thanks for reading.** We just scratched the surface with a boiler plate. There is so much capability that we can leverage, but that has to wait until next.

[Stay tuned to the next round of posts covering Offline capabilities](http://eepurl.com/cYynNv). 

If you want to discuss more on this, leave an email with me on [writer@vijayabharathi.in](mailto:writer@vijayabharathi.in) for your queries. There is also a github issue where we can discuss this further. If you are more social type, [come and say hi on twitter](https://twitter.com/vijayabharathib)!

[PWA_REPO]: https://github.com/vijayabharathib/pwa-features/tree/master/10.manifest

[PWA_POST]: /post/progressive-web-apps-reclaim-users-all-you-need-to-know/

[GH_PAGES]: https://pages.github.com/

[RTC-POST]: /post/javascript-run-to-completion-event-loop-asynchronous-foundations/
[PROMISES-POST]: /post/javascript_promise_fix_callback_async_await_future_error_handle/