---
layout: post
title:  "Jekyll blog on GitHub pages with custom domain and SSL!"
excerpt: "Setup Jekyll blog on GitHub pages with custom domain, custom theme and SSL along with google analytics."
date:   2017-05-19 23:56:47 +0530
categories: jekyll github ssl
author: vijayabharathib
---
## Why?
Why not? That's a very good question to have your own blog or app as an answer. The Internet is invaluable because of so many people sharing knowledge.Anyone can consume and everyone can contribute. What stops some people is the idea that setting up a website is an overhead.

## Must have
Just a small step, actually, two small steps and you can be up and running with a website in 10 minutes.

### Step 1: Get Jekyll

Jekyll is a nice little software that translates markdown into static HTML pages. Best fit for blogs and product documentations. Markdown is a neat way of writing articles, you can get to know GitHub flavored markdown on, well, [GitHub][GFM]. But that comes later, let's roll on with Jekyll.

> GitHub pages are fueled by Jekyll in the backyard of GitHub.

There are three ways you can get Jekyll,
1. Far left (easy): Fork a repository in GitHub (no local server)
2. Far right (hard): Install Jekyll gem (but you'll need ruby (before that you may need rvm/rbenv))
3. Mid ground (fun), get a docker with jekyll and its dependencies (but you'll need docker)


The easiest way is to fork a jekyll repository from GitHub and start from there. There is one for this very purpose, called [jekyll-now] on GitHub, but to be honest, you can fork any jekyll theme as starting point. By the way, if you are not on GitHub yet, remind yourself to set your profile up, like 5 years ago (that's what I thought when I first set it up in 2015). It's never too late. It is free if your repository is public and you can purchase if you need to host private repositories.

If you need the site at `username.github.io`, then that should be your repository name when you fork an existing one. Remember to replace username with your user name on github.

Alternatively, if you need to set up a site on a product or company's name, you can create an organization in GitHub. Look for a small + button at the top on GitHub, within that dropdown, you can chose a `New organization`. That's how PineBoat was set up. And the repository name was `pineboat.github.io`. The username does not come into this picture, just the organization name.

#### Run jekyll on docker
Another easier way if you are already comfortable with docker is, just to pull an image with necessary dependencies (such as ruby and relevant gems) and hit the ground running. Here is a [post][docker-for-jekyll] that I found useful.

### Step 2: Go live with GitHub Pages

### Step 3: There is no Step 3

## Should have

### Custom Domain
### Permalinks
### Search Engine Optimization (SEO)
### HTTPS (SSL)
### Place Cloudflare at the front
### Customize Jekyll Theme

## Nice to have
### Google analytics
### At last, content first!
### Way forward
* Tags
* Author
* Search

Author:
{% avatar vijayabharathib %}


[GFM]: https://guides.github.com/features/mastering-markdown/
[jekyll-now]: https://github.com/barryclark/jekyll-now
[docker-for-jekyll]: https://kristofclaes.github.io/2016/06/19/running-jekyll-locally-with-docker/
