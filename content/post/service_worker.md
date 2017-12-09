---
draft: true
author: "vijayabharathib"
title: "Don't be afraid of service workers."
subtitle: "They are plain Javascript bots, ready to comply"
date: "2107-11-12T08:15:59+05:30"
publishdate: "2107-11-12T08:15:59+05:30"
tags: ["Service Workers","Javascript","PWA"]
image: "/img/newlogo.png"
image_alt: "important message about image"
image_credit: "credit the image owner"
---

the sw.js has to be in root most folder to access all other files. otherwise, it'll be limited to access only sub folder.

register sw after page is loaded. https://developers.google.com/web/fundamentals/primers/service-workers/registration

```js


<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load',function(){
            navigator.serviceWorker
                .register('sw.js')
                .then(function(registration){
                    console.log("Your own service worker. Ready to comply.",registration.scope);
                },function(err){
                    console.log("Sorry, service worker didn't check in today",err);
                });
        });
    }
</script>

service workers internals:
https://developers.google.com/web/fundamentals/primers/service-workers/

service worker gotchas : 
https://www.netlify.com/blog/2017/10/31/service-workers-explained/