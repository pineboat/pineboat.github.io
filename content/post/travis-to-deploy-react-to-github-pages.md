---
author: "vijayabharathib"
date: "2017-08-23T22:45:25+05:30"
publishdate: "2017-08-23T22:45:25+05:30"
subtitle: "When you are ready to build apps for production, you need a better workflow. You need to befriend a terminal to publish to github pages. All this becomes easier with continuous integration via Travis CI."
tags : ["DevOps","React","GitHub Pages","Travis CI","Deployment"]
categories: ["Deployment"]
title : "How to quickly wire travis to deploy React site to github pages"
draft: false
image: "/img/react-continuous-deployment/reverse-react2.gif"
image_alt: "React in reverse"
image_credit: "Gif using Peek and GIMP"
---

It's quite common to hack with apps on codepen when you are starting out. There will soon be a time when you want to publish your own web apps to the whole world. They could be side projects or projects for a client. A good development workflow will make a world of difference at this point.

Here is the deal, we are going to set up a development workflow using the following tools,

* create-react-app
* `npm` scripts
* Travis-CI

We'll wire Travis-CI & GitHub together. At the end, we'll to get a nice & shiny badge Like the one below. But more than the look, the badge signifies a function. It's a sign of Travis CI testing, building and publishing our commits to GitHub. Travis-CI publishes only if the tests pass.

Get ready to get these badges on your repository:
![Build Status](https://travis-ci.org/vijayabharathib/fcc-project-react-recipies.svg?branch=master)

I have organized the whole workflow in stages. One sitting should do for each stage. That's within about 50 minutes or 2 [pomodori](https://cirillocompany.de/pages/pomodoro-technique).

## Stage 01 - Run create-react-app locally

### 01. Get your git repository ready

The first thing is to create a new repository on [GitHub.com](https://github.com). Hope you have an account, if not, it's time already to register for one. Public repositories are free anyway. When you create a new repository, GitHub lets you to create files for `.gitignore`, `license` and  `README.md`.

>If you are starting with git for the first time, A whole [book](https://git-scm.com/book/en/v2) is there online free for you to read. You also have an elegant [help](https://help.github.com/) section from GitHub itself.

Here is how our new repository looks like, to start with:
![Fresh Git Repository](/img/react-continuous-deployment/new_github_repository_compressed.png)

All right, let's get that on our terminal. Do you see that bright green button on the above image showing 'Clone or Download'? That'll give us the URL to the repository. On your terminal, run these commands.

```bash
git clone git@github.com:pineboat/react-continuous-deployment.git
```
That command will download the contents of the repository into a new directory. It names the directory the same as the repository. In our case, the directory will be `react-continuous-deployment`. If you want to make sure a link to original repository is ready, use the command `git remote -v`. Now that we are set to push our changes to GitHub, let's get react up and running.

### 02. Up and running with Create-React-App
Starting a fresh react project from scratch might take longer than you'd expect. Especially when you are not using any predefined scaffolds. There are several pre-built solutions that we can use to get started. I chose official [`create-react-app`](https://github.com/facebookincubator/create-react-app) because I've tried it first. When you don't have to micromanage your configurations, this will be a clean start to hit the ground coding.

As the repository README shows, you only have to install it once globally. There onwards, you can use it to scaffold as many project as you like. To get it installed:

```bash
npm install -g create-react-app
```

Once that's installed, you can run it from any directory to create a new app. For our purpose, let's give it our repository's name:
```bash
create-react-app react-continuous-deployment
```
That'll NOT create a new folder as we already have the folder. Instead it'll start installing necessary `node_modules` and scaffold scripts within existing folder.

But if you wanted a fresh application, you can use `create-react-app fancy-app-name`. But you'll have to then create git repository and connect it to GitHub, which is not too difficult either. You can use this [help](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) page from GitHub.

Has that installation finished yet? It shouldn't take more than 5 minutes. For me, it took about 15 minutes. Don't let that scare you. I am using a 150 mb/s 4G data card that gives you about 512kbps of download speed on its best day.

The nice thing is, the installation moved our old README.md aside. The terminal shows this sweet message:
```bash
You had a `README.md` file, we renamed it to `README.old.md`
```
The terminal would also have shown you the enormous list of packages in a tree structure. Quite scary again. But most of them are dependencies between packages. They are there to help you develop your app. The final product will only have necessary javascript such as react.js & react-dom.js. We'll go there in a while.

For now, let's wake our application up. Once installation is over, create-react-app will give us a list of commands which will be handy. Here is a catalog for reference:

Command | Description
-----|-----
`npm start` | Start development server
`npm run build` | Bundles the app into static files for production.
`npm test` | Start the test runner
`npm run eject` | This is serious business. See [here][npm-eject].
`npm run deploy` | To deploy the build to gh-pages branch

> `npm start` and `npm test` built-in node commands that are recognized by default. You need to run other scripts such as build, eject and deploy using an extra run flag: `npm run script_name`

We'd add a few more in the process as we go. But, it's time to load our site on a browser. Get inside the application directory and run:

```bash
npm start
```

Thats' magic, a new browser tab opens and you see a nice react wheel churning. The view must be challenging you to build the next best app the internet is about to witness. So this is what we get:

![Scaffolded React App Landing Page](/img/react-continuous-deployment/react-wheel.gif)

Bonus: That was a pretty neat gif isn't it? Except of course my cursor coming in unceremoniously. I captured this gif with this tiny tool named [Peek](https://github.com/phw/peek), check it out when you need it.

All right, Well done! Hope that didn't take more than 45 minutes. If you are running into issues, pay attention to the error messages and try to fix them. When you are close to the point of frustration,  head over to stakoverflow for help. Or leave your question in tweet to me @pineboat / leave it in this post's [github issue][github-issue].

Before we hack into any of the files, let's just get the code committed and pushed to GitHub repository. Below commands will do:
```bash
git status
git add --all
git commit -m "Initial Scaffold, this is your own message"

```

If you run `git status` again, it'll report that
```bash
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
  nothing to commit, working directory clean
```
That's right, we have made and committed changes locally. There are no uncommitted changes. But we are ahead of the cloud version of our repository. It's time to publish them to a safehouse, I mean GitHub. All you need to run is `git push origin master`. You'll get a nice report showing a hash like `fb74259..045ec7a`, which is a reference for our commit. Your hash will obviously be different.

Check your GitHub.com repository, surprised? `create-react-app` has replaced our tiny `README.md` with its own. It's huge and helpful, we'll keep that for now before we write our own.

## Stage 2: Porting site over to GitHub Pages
This is stage 2, where we build and deploy our site to GitHub pages.

### 03. Build static site

Let's take a look at the final build. You just have to run `npm run build` on the terminal. Make sure that you are within the application directory for all the commands. We get this nice text showing us what has happened and what else can we do.

```bash
$ npm run build

> react-continuous-deployment@0.1.0 build /home/weebee/Projects/blog_projects/react-continuous-deployment
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  48.12 KB  build/static/js/main.9fdf0e48.js
  288 B     build/static/css/main.cacbacc7.css

The project was built assuming it is hosted at the server root.
To override this, specify the homepage in your package.json.
For example, add this to build it for GitHub Pages:

  "homepage" : "http://myname.github.io/myapp",

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build
```
The `npm run build` command does what's asked for. It builds our app, optimizes and  minifies assets. Finally places everything in a folder called 'build'. Towards the bottom, the suggestion is to install `serve` npm package to start a local server. But most of the times, if you are on linux, you'll already have python installed. It's quite easy to start a local server if you have python. Step into the build directory and start a server, see following commands:

```bash
cd build
python -m SimpleHTTPServer
```
Python command by default starts the server on port 8000. So, `http://localhost:8000` will serve the production version of the website. It uses assets from  your local 'build' directory created just now.

If that looks good, we are going to get it over to github pages.

### 04. Primer on GitHub pages

GitHub pages are hosting solution provided by GitHub itself for repositories. There are few places where you can host your site, all within a repository:

* You can use master branch (the default one) to host your website. If you have an `index.html`, it'll show up. Otherwise, your README.md will show up.
* You can also use `docs` folder in a master branch to host your site. The usecase would be when you have a software / library developed on GitHub. You might want to host the documentation along in the same repository.
* You can use gh-pages branch to host your site.

There is an exception. Your repository name should not be `<your_user_name>.github.io` or `<orgname>.github.io`. These are special names and they limit you to use master branch.

Once you host your website, you can load it in the following urls. It depends on whether your repository is under your account / an organization account:

```
 https://<your_user_name>.github.io/<your_repository_name>/
 https://<organization_name>.github.io/<your_repository_name>/
```
With that understanding, let's equip our repository to go live.

### 05. Publish to GitHub pages

The new README.md given to us by the create-react-app has a separate section on GitHub pages. There are few things we need to do.

#### Additions to `package.json` file

```json
"homepage": "http://<your_user_name>.github.io/<your_repository_name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
>Note: Usually, the last section / entry in a json doesn't need a comma, all others should have one.

#### Install gh-pages package

This one is easy. Just run the following command while you are inside the project directory:
`npm install --save gh-pages`.

The `--save` flag will add `gh-pages` as a dependency to `package.json`. This is to ensure anyone else who clones your project can also get it when they run 'npm install'.

Here is a snapshot of `git diff` command showing all we have added since `package.json` was created.

![Git Diff showing above additions to package.json](/img/react-continuous-deployment/git-diff-add-gh-pages-package.png)

#### Deploy to gh-pages branch

Finally, let's run `npm run deploy`. It will automatically run `predeploy`, to generate the production build we've seen earlier. It will then deploy the build to our repository under a new branch named `gh-pages`.

Check if you get a `Published` status as the last statement. If so, you've successfully deployed the production build to GitHub. Here is the output,

![output of npm run deploy](/img/react-continuous-deployment/output-of-npm-run-deploy.png)

#### Select gh-pages branch to be published

Let's head over to GitHub repository and publish our site. Open up the repository and go to settings tab at the top. It looks like this image below, wait a minute! GitHub has automatically published my `gh-pages` branch. There is nothing more for me to do. It also shows the URL in which I can access the site.

Point 4 above should actually say 'Do nothing'. It's all done and ready for us to consume.

![published github pages settings](/img/react-continuous-deployment/published-github-pages_compressed.png)


>Note: The URL shown for my repository may be misleading you.  That's because I have created this repository under an organization entry I've created. That's PineBoat for my blog. GitHub uses my custom domain to place this under (which isn't something I expected until I tried this).

So far, so good. Have you had prior experience in git and node packages, you'd have had no trouble reaching this far. In fact the default `README.md` had enough to help me this far. If you had no experience, hope you enjoyed the journey.

But we are aspiring for a continuous deployment workflow. We are starting to navigate some uncharted waters. One would argue nothing is uncharted in the internet. I would agree and still create my own map.

## Stage 3: Continuous Deployment
This is where we bring in bots to do most of the deployment we have done in stage 2.

### 06. Wire in Travis-CI for automatic build

Let's get Travis CI to do the deploy job for us. There is no harm in building and deploying your site on your own. As we have seen, all it takes is a few more minutes of our valuable time. However, when you run into larger projects of scale, it's better to let trusted bots do some of the jobs. Travis CI is one such service.

We can take advantage of Travis CI to build and deploy whenever we commit our code to the repository.

#### Sign Up to Travis CI
It would be annoying if I start with 'if you have a github account' now. I'm sure you have one by now and we can use that to sign up to Travis CI.

#### Connect to GitHub Repository
Watch out for the permissions. If your repository does not get listed, click on that 'sync' button and refresh the page. For me, I had to grant permission to 'PineBoat' organization before I could see the repository.

Travis CI shows you the steps. Flick that switch against your repository to connect it.

Click on the repository name to open it up. It'll show a build staus as 'unknown' and a larger note saying 'No builds for this repository'.

![travis first time repository with unknown build status](/img/react-continuous-deployment/travis-first-time-repository-compressed.png)

Not for long, let's change it.

#### Add `.travis.yml` to the repository

Here is the `.travis.yml` that needed to be added. Have a look and stay with me while I clear some of the questions you might get.

```yml
language: node_js
node_js:
  - "node"

after_success:
  - git config --global user.name "vijayabharathi"
  - git config --global user.email "vijayabharathib@users.noreply.github.com"
  - git remote rm origin
  - git remote add origin https://vijayabharathib:${GH_TOKEN}@github.com/pineboat/react-continuous-deployment.git
  - npm run deploy
```
The YAML syntax is slightly different from `json`. [This page](http://docs.ansible.com/ansible/latest/YAMLSyntax.html) might help. Time to break it down. You probably figured out most of those text. Here is an account in plain English.

This is a node project. Take the latest node version. Node runs `npm test` by default. So, if the test is successful, add my git username and email. Then add git remote origin for the repository. Use my user name and the GH_TOKEN generated as credentials. Finally, run `npm run deploy` command. Which you'll recall, will run `npm run predeploy` before running `npm run deploy`.

#### Commit and watch Travis CI build
That's it, keep your Travis-CI repository page open. On your terminal, add changes, commit and push them to GitHub. In case you need a reminder, here is the list of commands:
```bash
git add --all
git commit -m "add .travis.yml configuration for automatic build"
git push origin master
```
If you switch to Travis-CI page, you'll see the page coming alive once `git push` is over (or in a few seconds lag). The build starts automagically. You'll know if it is successful. Mine was and here is the Travis-CI page showing nice green status.
![travis successful build](/img/react-continuous-deployment/travis-successful-build.png)

And the log shown is no less than 2500 lines. Glad Travis-CI shows only what we need to see. A clear indication of steps followed as shown below in the image.
![travis log showing test pass status and subsequent deployment to gh-pages](/img/react-continuous-deployment/travis-log.png)

### 07. Spot check, did we really succeed?
This is where automated tests that run on production may come in handy. But that's for another day. Selenium and WebDriver can wait until we finish this wiring. Let's manually check if Travis-CI really did publish to GitHub pages.

#### Another trial, this time with changes to code

Last time, we couldn't really see any difference in our application after deployment. That's because we didn't make any. So, there was no way to tell if the build was successful. Though, technically, you can load gh-pages branch and look into the commits, but I digress.

This time, let's make some small changes. Time to take the react wheel back in time.

Just to changes. One, within `src/App.css` file, there is a section for animation named `@keyframes App-logo-spin`. Change that `360deg` to `-360deg`. This is to spin the wheel counter clockwise.

Two, load that `src/logo.svg` file and change the fill color from `#61DAFB` to `#DA61FB`. If your dev server is running via `npm start`, you can already see a purple wheel running counter clockwise. If not, never mind, add the changes to the stash, commit and push them to the repository. Watch if the build is successful in Travis-CI and then head over to your github page.

Alas, I don't see that purple wheel, still the default blue one.

#### Fix the missing GH_TOKEN

Though Travis-CI reported that all is well, it's not. If you open up the gh-pages branch, you'll see the original commit we made from local terminal. No other commits. That means, the `after_success` commands were not so successful.

If you expand `npm run deploy` section in the log, you'll see some authentication errors. That's because we've not given Travis-CI permission to write to our repository.

You can create a new token from [Personal access tokens](https://github.com/settings/tokens) page from GitHub.com. Remember to give access to public repository alone. Just one tickmark against `public_repo` will do. **Don't miss this.** Once you generate a token, copy it. GitHub rightly warns that you will not be able to see it again.

Head over to Travis-CI, click on 'More Options' for your repository and chose settings. It'll show severl sections, but **Environment Variables** is the one to look for.

Name the token as `GH_TOKEN` and past the token under value field. Click add. Do not switch on the 'Display value in logs' as it might be visible to people if you send the logs out. The token is equivalen to your password.

That's it, now Travis-CI can write to our repository.

Go back to the **Current** tab of the repository and click on **Restart build**. Once the build is over, you can check the logs and check the gh-pages branch on GitHub. You should see a new commit.

Congrats, that's our first automated deployment. How about the `github.io` website itself? No amount of refresh would bring the much needed purple wheel.

#### Ask service worker to take a break

Still the wheel is bleeding blue. But `gh-pages` branch in the repository shows a second commit. Let's compare the `index.html` on the repository and on the web page source. They are pointing at different css and js files. The hash suffix is our clue.

This seems to be the result of energetic javascript service worker. It has cached the page for offline use. But this conclusion needs more research. In the mean time, let's just stop the service worker and clear the storage.

If you are on chrome, dev tools can be accessed from menu (or pressing F12). 'Application' tab on Chrome DevTools has 'Clear Storage' section. Check all entries and finally click on that 'Clear site data'.

Refresh and bhoom! Here is our reverse wheel in bright purple. Time for celebration.

![new version of the website showing purple react wheel spinning counter clockwise](/img/react-continuous-deployment/reverse-react2.gif)

>Note: there must be a better way to do this automatically. Would be a pain if we have to stop and clean service worker and storage each time to get the changes online. Topic for more research.

## Stage 4: Badge of honor from Travis CI

There is one final task in front of us. That is to get a shiny Travis-CI build status badge over to our repository's `README.md`.

Open up Travis-CI and click on the `build:passing` badge. It'll show a dialog with options to port the image. Leave the branch as master, Select 'Markdown' instead of 'Image URL'. Copy the text given.

Paste it in the `README.old.md`, which was left to us by `create-react-app` so graciously. Write your own content. You can delete the default `README.md` from the repository and rename the `README.old.md` to `README.md`.

Add the changes to git staging, commit and push to the cloud. Now the repository should show the batch you always wanted. Here is the URL shown for our pet project,
```html
https://travis-ci.org/pineboat/react-continuous-deployment.svg?branch=master
```
And here is the image:
[![Build Status](https://travis-ci.org/pineboat/react-continuous-deployment.svg?branch=master)](https://travis-ci.org/pineboat/react-continuous-deployment)

>We are done here! Time for celebration.

I'd like to leave you with a question. If you are working in a large teams using similar workflow, what are the challenges and how would you solve them? Write a post and let me know.

Thank you so much for reading. Hope you found it useful.

Reply via a tweet if you have any feedback. You can find a twitter button below. Alternatively, I keep an [issue open][github-issue] on GitHub for you to interact.

[npm-eject]: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject
[github-issue]: https://github.com/pineboat/pineboat.github.io/issues/2
