---
title: Leverage xargs to Achive More on Your Terminal
subtitle: xargs is the iterator
tags: ["Terminal","Commands","Workflow","Xargs"]
categories: ["Workflow"]
author: vijayabharathib
date: "2018-10-23T23:00:25+05:30"
draft: true
image: "/img/hero.jpeg"
image_alt: "Little iron tool tips"
image_credit: "Photo by Who??"
---

* `{}` is the default list marker (name for each input passed). This can be changed by using `xargs -I name` instead of `xargs -I {}`. This has two other options from `man` pages. `xargs --replace=name` or `xargs -iname` (`-i` being single char flag, its value has to follow immediately)
* `-t` will show the command that was executed
* `-p` will ask your permission before executing the command. Enter is `no` by default. You'll have to type `y` and then hit Enter.
* `du -sh .` for current dir. `du -sh *` for all files and dirs (excluding the total that came from `du -sh .`). But `ls -d */` lists only dirs. This can be used to find folder size via `ls -d */ | xargs du -sh`

References:

https://shapeshed.com/unix-xargs/
https://www.cyberciti.biz/faq/linux-unix-bsd-xargs-construct-argument-lists-utility/
https://www.npmjs.com/package/blink-diff