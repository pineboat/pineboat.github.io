---
title: "Drop Keystrokes and Watch Your Productivity Soar"
subtitle: "Git Aliases are inevitable. Bash Aliases are irresistible. One click snippets are truly unstoppable."
tags: ["git","bash","aliases","terminal","dev-workflow"]
author: "vijayabharathib"
date: "2019-12-23T22:45:25+05:30"
publishdate: "2019-12-23T22:45:25+05:30"
draft: "true"
---

A combination of aliases and bash scripts can make you very productive in your dev workflow. Use it long enough and you'll even forget the original commands beneath the aliases, which isn't necessarily a bad thing.


## 01. Git Aliases
If terminal is the dungeon to people new to tech, Git tends to be the darkest passage, intimidating with long stretch of commands.

**Git is beautiful.** Have been copying folders manually as a backup process? Just stay a bit longer with `git`. You will end up saying this : **how on earth did my code survive this long without `git`?**

Part of making `git` easier to use, is to set up your own aliases.  That is, once you understand the underlying commands.

This is not to give you **all** the useful aliases. Instead, point you at the possibilities so that you can build your own. There are tons of references on aliases you can find online.

### Flying Solo
Let's say you are hacking on your own. You stage and commit all day, may be your code or your writings for the blog. You'll find a bunch of aliases very useful. 

```bash
git config --global alias.s status
git config --global alias.aa 'add --all'
git config --global alias.cm 'commit -am'
git config --global alias.up 'push'
```

Make sure you have a well defined `.gitignore` to avoid tracking unnecessary files such as `node_modules`. This will help you when you use `git aa` to stage all files. 

### Code Collaboration

When you are collaborating in a team, a whole other list of commands may be useful. Remember, rebase rewrites history. It is [advised only for local branches](https://coderwall.com/p/7aymfa/please-oh-please-use-git-pull-rebase), to clean up your code on top of remote branch.

```bash
git config --global alias.pr 'pull --rebase upstream master'
```

Here is one from [Harry](https://csswizardry.com/2017/05/little-things-i-like-to-do-with-git/) about aliasing `blame` to `praise` and other nuggets that you may find useful.

### Advanced Aliases
```bash
git config --global alias.ls 'log --pretty=format:"%C(yellow)%h %C(green)%s %Creset(%ad)" --date=relative'
```
`%C(yellow)` marks the token following the color code in red. In our case above, `%h` stands for the commit hash, which will be painted yellow on our terminal. %Creset, without brackets, takes you back to default terminal font color. 

You can learn more about decorating in [git-scm.com](https://git-scm.com/docs/pretty-formats). There is a whole bunch of information that you can extract such as `%h`, `%n`

I learned a lot of useful tricks from Nicola a while back from his 2014 Atlassian summit talk. I couldn't find the video, but I found [his slide](https://www.slideshare.net/GoAtlassian/becoming-a-git-master-nicola-paolucci). 

Here is a list of his [git aliases](http://bit.do/git-aliases). But, in his own words, do not just copy aliases. Build them as you go, adding only the aliases that are useful to you. Otherwise, it'll just be like spending hours curating articles/books that we'll never read.

## 02. Bash Aliases

`Git` is not the only CLI that asks for some typing on the terminal. Think about `docker-compose exec` that you run on a container. That's 19 characters. How about the same with just `de`? 

If you use commands that are longer, on a daily basis. Consider setting up bash aliases.

 The syntax is very simple. 

```bash
alias new_cmd='never-ending-command; and another command'
```
The recent one I have set up is for docker commands. Should serve as example.

```bash
alias dc='docker-compose'
alias de='docker-compose exec'
alias dcup='cd ~/Projects/docker_project/; dc up'
```

Are you thinking what I am thinking? What do we call `git pull --rebase upstream master`?

How about `gprum`?

## 03. One-Click Snippets 

One click, and you'll have these ready to roll:

* Opens your project folder in VS Code
* A terminal running dev server 
* Another tab running tests / hot reloading 
* Last tab that opens with git status
* The last tab stays open for you to `git` things done.

There is something magical when you can just tap on an icon and the entire environment springs up for you.  One tap and you get your text editor, web server and tests running already.


The bash file `get-to-work.sh` looks like this.

```bash
#!/bin/bash

export WD="~/development"
code $WD
gnome-terminal \
--tab --working-directory=$WD \
-e 'bash -c "export BASH_POST_RC=\"npm start\"; exec bash"' \
--tab --working-directory=$WD \
-e 'bash -c "export BASH_POST_RC=\"npm run watch\"; exec bash"' \
--tab --working-directory=$WD \
-e 'bash -c "export BASH_POST_RC=\"git status\"; exec bash"'
```

We have a working directory set up under variable `WD`. Then starts a very long line that folds for 7 lines on a terminal width of 80 characters. Don't let it scare you. If you watch closely, we are opening gnome-terminal with three tabs and running three different commands on them.

Run this command to mark the bash script executable.
```bash
chmod +x get-to-work.sh
```

Let's add a nice desktop icon to our script. `Exec` and `Icon` are important. They need to be in a `.desktop` file. I've named mine as `get-to-work.desktop`. 

```desktop
[Desktop Entry]
Name=Get To Work
Comment=Start coding in an instant.
GenericName=Development Environment
Exec=/home/username/snippets/get-to-work.sh
Icon=/usr/share/icons/logo.png
Type=Application
Terminal=true
StartupNotify=true
Categories=Utility;
```

Use the correct path instead of `/home/username/...`. Make sure you place the `Icon` in an accessible folder where you have permission to at least read the file.

Validate and install the `.desktop` file.

```bash
desktop-file-validate get-to-work.desktop
desktop-file-install get-to-work.desktop
```

That's it. You'll have your logo ready as an application within your launcher. 

Here is a gif showing my recent one-click script. 
![One Click To Jumpstart Work](/img/005_one_click/one-click-small.gif). 

A larger one, 2.6MB, [here](/img/005_one_click/one-click.gif) if you want to take a closer look.
