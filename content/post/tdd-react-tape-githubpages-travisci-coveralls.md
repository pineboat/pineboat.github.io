+++
author = "vijayabharathib"
date = "2017-08-22T06:14:25+05:30"
publishdate = "2017-08-22T06:14:25+05:30"
subtitle = "How to get a react static site from terminal to github pages with continuous integration via Travis CI."
tags = ["React","TDD","Travis CI"]
title = "Test driven react development with Tape - zero to continuous deployment"
draft=true
+++

How to make deploying react to github pages a breeze

It's quite common to hack with apps on codepen, there will be a time when you want to publish your own web apps. They could be side projects or projects for a client. This is when you might start thinking about having a good development workflow with tools for every stage.

Here is the deal, we are going to set up a development workflow using `create-react-app` and `npm` scripts for a react app. We'll wire Travis-CI & Coveralls together to get nice & shiny badges like the one below. But more so to ensure commits from our development box are automatically tested by Travis-CI, built and deployed to github pages if the tests pass.

Get ready to get these badges on your repository:
![Build Status](https://travis-ci.org/vijayabharathib/fcc-project-react-recipies.svg?branch=master) ![Coverage Status](https://coveralls.io/repos/github/vijayabharathib/fcc-project-react-recipies/badge.svg?branch=master)

I have organized the whole workflow in stages. Each stage can be done in one sitting (within about 50 minutes / 2 pomodoros).

## Stage 01 - Run create-react-app locally

### 01. Get your git repository ready

The first thing is to create a new repository on [GitHub.com](https://github.com). Hope you have an account, if not, it's time already to register for one. Public repositories are free anyway. GitHub gave options to create `.gitignore` and `license` right there during creation along with a `README.md`.

>If you are starting with git for the first time, A whole [book](https://git-scm.com/book/en/v2) is there online free for you to read. You also have an elegant [help](https://help.github.com/) section from GitHub itself.

Here is how our new repository looks like, to start with:
![Fresh Git Repository](/img/react-continuous-deployment/new_github_repository_compressed.png)

All right, let's get that on our terminal. See that bright green button on the above image showing 'Clone or Download', that'll give us the URL to the repository. On your terminal, run these commands.

```bash
git clone git@github.com:pineboat/react-continuous-deployment.git
```
That's enough to download the contents of the repository into a new directory named after the repository name. In our case, the directory will be `react-continuous-deployment`. If you want to make sure a link to original repository is ready, use the command `git remote -v`. Now that we are set to push our changes to GitHub, let's get react up and running.

### 02. Up and running with Create-React-App
Starting a fresh react project from scratch without any existing scaffolds might take longer than you might anticipate. There are several pre-built solutions that we can use to quickly get started. I chose official [`create-react-app`](https://github.com/facebookincubator/create-react-app) just because I've tried it first. When you don't have to micromanage your configurations, this will be a clean start to hit the ground coding.

As the repository README shows, you only have to install it once globally. There onwards, you can use it to scaffold as many project as you like. To get it installed:

```bash
npm install -g create-react-app
```

Once that's installed, you can run it from any directory to create a new app. For our purpose, let's give it our repository's name:
```bash
create-react-app react-continuous-deployment
```
That'll NOT create a new folder as we already have the folder, it'll just start installing necessary `node_modules` and scaffold scripts within existing folder.

But if you wanted a fresh application, without any repository, you can just use `create-react-app fancy-app-name`. But you'll have to then create git repository and connect it to GitHub, which is not too difficult either. You can use this [help](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) page from GitHub.

Has that installation finished yet? Hopefully, it shouldn't take more than 5 minutes. For me, it took about 15 minutes. Don't let that scare you, unless you are using a 150 mb/s 4G data card that gives you about 512kbps of download speed on its best day.

The nice thing is, the installation moved our old README.md aside. The terminal shows this sweet message:
```bash
You had a `README.md` file, we renamed it to `README.old.md`
```
The terminal would also have shown you the enormous list of packages in a tree structure, which is again quite scary. But most of them are to help you develop your app. The final product will only have necessary javascript such as react.js & react-dom.js. We'll go there in a while.

For now, let's wake our application up. If the installation was successful, create-react-app would have given you a list of commands which will be handy. Here is a catalog for reference:

Command | Description
-----|-----
`npm start` | Start development server
`npm run build` | Bundles the app into static files for production.
`npm test` | Start the test runner
`npm run eject` | This is serious business. See [here][npm-eject].
`npm run deploy` | To deploy the build to gh-pages branch

> `npm start` and `npm test` are built-in node commands that are readily recognized. User defined scripts such as build,eject and deploy need to be run using an additional run flag: `npm run script_name`

We'd add a few more in the process as we go. But, it's time to load our site on a browser. Get inside the application directory and run:

```bash
npm start
```

Thats' magic, a new browser tab opens and you see a nice react wheel churning, challenging you to build the next best app the internet is about to witness. So this is what we get:

![Scaffolded React App Landing Page](/img/react-continuous-deployment/react-wheel.gif)

Bonus: That was a pretty neat gif isn't it? Except of course my cursor coming in unceremoniously. I captured this gif with this tiny tool named [Peek](https://github.com/phw/peek), check it out when you need it.

All right, Well done! Hope that didn't take more than 45 minutes. If you are running into issues, pay attention to the error messages and headover to stakoverflow for help while in the process. Or leave your question in tweet to me @pineboat / leave it in this post's github issue.

Before we hack into any of the files, let's just get the initial react wheel committed and pushed to GitHub repository. Below commands will do:
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

Check your GitHub.com repository, you'll see `create-react-app` has replaced our tiny `README.md` with its own. It's huge and helpful, we'll keep that for now before we write our own.

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
The command has built our app, optimized, minified and placed everything in a folder called 'build'. Towards the bottom, the suggestion is to install `serve` npm package to start a local server. But most of the times, if you are on linux, you'll already have python installed. It's quite easy to start a local server if you have python. Step into the build directory and start a server, see following commands:

```bash
cd build
python -m SimpleHTTPServer
```
Python command by default starts the server on port 8000. So, `http://localhost:8000` will show the production version of the website from your local directory.

If that looks good, we are going to get it over to github pages.

### 04. Primer on GitHub pages

GitHub pages are hosting solution provided by GitHub itself for repositories. There are few places where you can host your site, all within a repository:

* You can use master branch (the default one) to host your website. If you have an `index.html`, it'll show up. Otherwise, your README.md will show up.
* You can also use `docs` folder in a master branch to host your site. The usecase would be when you have a software / library and you want to host the documentation along in the same directory.
* You can use gh-pages branch to host your site.

There is an exception. Your repository name should not be `<your_user_name>.github.io` or `<orgname>.github.io`. These are special names and they limit you to use master branch.

Once you host your website, you can load it in the following urls, depending on whether your repository is under your account / an organization account:
```
 https://<your_user_name>.github.io/<your_repository_name>/
 https://<organization_name>.github.io/<your_repository_name>/
```
With that understanding, let's equip our repository to go live.

### 05. Publish to GitHub pages

The new README.md given to us by the create-react-app has a separate section on GitHub pages. There are few things we need to do.

**1. Additions to `package.json` file**

```json
"homepage": "http://<your_user_name>.github.io/<your_repository_name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
>Note: Usually, the last section / entry in a json doesn't need a comma, all others should have one.

**2. Install gh-pages package**

This one is easy. Just run the following command while you are inside the project directory:
`npm install --save gh-pages`.

The `--save` flag will add `gh-pages` as a dependency, so that anyone else who clones your project can also get it when they run 'npm install'.

Here is a snapshot of `git diff` command showing all we have added since `package.json` was created.

![Git Diff showing above additions to package.json](/img/react-continuous-deployment/git-diff-add-gh-pages-package.png)

**3. Deploy to gh-pages branch**

Finally, let's run `npm run deploy`. It will automatically run `predeploy`, which will generate the production build we've seen earlier. It will then deploy the build to our repository under a new branch named `gh-pages`.

If you get a status `Published` as the last statement, you've successfully deployed the production build to GitHub. Here is the output,

![output of npm run deploy](/img/react-continuous-deployment/output-of-npm-run-deploy.png)

**4. Select gh-pages branch to be published**

Let's head over to github repository and publish our site. Open up the repository and go to settings tab at the top. It looks like this image below, wait a minute! GitHub has automatically published my `gh-pages` branch. There is nothing more for me to do. It also shows the URL in which I can access the site.

Point 4 above should actully say 'Do nothing'. It's all done and ready for us to consume.

![published github pages settings](/img/react-continuous-deployment/published-github-pages.png)

>Note: The URL shown for my repository may be misleading you, that's because I have created this repository under an organization entry I've created for my blog. Which is 'PineBoat' obviously and github uses my custom domain to place this under (which isn't something I expected until I tried this).

So far, so good. If you have experience in git and node packages, you'd have had no trouble reaching this far, in fact the default `README.md` had enough to help me this far. If you had no experience, hope you enjoyed the journey.

But as we are aspiring for a workflow for continuous deployment, we are starting to navigate some uncharted waters (but nothing is uncharted these days, may not charted many times we can say).

## Wire in TravisCI for automatic build

## Coveralls to report code coverage

## Badge of honor from Travis CI

## Badge of honor from Coveralls
## Plug in TAPE and test libraries

## Test coverage report

## Automatic Test Run using npm-watch

[npm-eject]: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject
