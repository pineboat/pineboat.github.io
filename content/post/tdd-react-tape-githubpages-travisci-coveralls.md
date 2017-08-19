+++
author = "vijayabharathib"
date = "2017-08-22T06:14:25+05:30"
publishdate = "2017-08-22T06:14:25+05:30"
subtitle = "How to get a react static site from terminal to github pages with continuous integration via Travis CI."
tags = ["React","TDD","Travis CI"]
title = "Test driven react development with Tape - zero to continuous deployment"
draft=true
+++

Here is the deal, we are going to set up a development workflow using `create-react-app` and `npm` scripts for a react app. We'll wire Travis-CI & Coveralls together to get nice & shiny badges like the one below. But more so to ensure commits from our development box are automatically tested by Travis-CI, built and deployed to github pages if the tests pass.

I have organized the whole workflow in stages that can be done in one sitting (within about 45 minutes).

## Stage 01 - locally run create-react-app

### 01. Get your git repository ready

The first thing is to create a new repository on [GitHub.com](https://github.com). Hope you have an account, if not, it's time already to register for one. Public repositories are free anyway. GitHub gave options to create `.gitignore` and `license` right there during creation along with a `README.md`.

>If you are starting with git for the first time, A whole [book](https://git-scm.com/book/en/v2) is there online free for you to read. You also have an elegant [help](https://help.github.com/) section from GitHub itself.

Here is how our new repository looks like, to start with:
![Fresh Git Repository](/img/react-continuous-deployment/new_github_repository_compressed.png)

All right, let's get that on our terminal. See that bright green button on the above image showing 'Clone or Download', that'll give us the URL to the repository. On your terminal, run these commands.

```bash
$ git clone git@github.com:pineboat/react-continuous-deployment.git
```
That's enough to download the contents of the repository into a new directory named after the repository name. In our case, the directory will be `react-continuous-deployment`. If you want to make sure a link to original repository is ready, use the command `git remote -v`. Now that we are set to push our changes to GitHub, let's get react up and running.

## Up and running with Create-React-App
Starting a fresh react project from scratch without any existing scaffolds might take longer than you might anticipate. There are several pre-built solutions that we can use to quickly get started. I chose official [`create-react-app`](https://github.com/facebookincubator/create-react-app) just because I've tried it first. When you don't have to micromanage your configurations, this will be a clean start to hit the ground coding.

As the repository README shows, you only have to install it once globally. There onwards, you can use it to scaffold as many project as you like. To get it installed:

```bash
$ npm install -g create-react-app
```

Once that's installed, you can run it from any directory to create a new app. For our purpose, let's give it our repository's name:
```bash
$ create-react-app react-continuous-deployment
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
$ npm start
```


## Plug in TAPE and test libraries

## Test coverage report

## Automatic Test Run using npm-watch

## Build static site

## Deploy to github pages

## Wire in TravisCI for automatic build

## Coveralls to report code coverage

## Badge of honor from Travis CI

## Badge of honor from Coveralls

[npm-eject]: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject
