---
title: "How to Energize a Scary Terminal With Little Scripts"
subtitle: "Three valuable tools to finally conquer fear of terminals. Git Aliases, Bash Aliases, and One click snippets."
tags: ["git","bash","aliases","terminal","dev-workflow"]
author: "vijayabharathib"
date: "2017-11-23T23:00:25+05:30"
publishdate: "2017-11-23T23:00:25+05:30"
draft: "false"
image: "/img/005_one_click/little-tools.png"
image_alt: "Little iron tool tips"
image_credit: "Photo by Matt Artz on Unsplash"
---

A combination of aliases and bash scripts can make you very productive in your dev workflow. Use it long enough and you'll even forget the original commands beneath the aliases. Which isn't actually a bad thing [until you get a shiny new laptop and have no idea where you placed your aliases in the old one]

**Don't miss** the `gif` showing one-click icons at work towards the end.

## 01. Git Aliases

If terminal is the dungeon to people new to tech, Git tends to be the darkest passage, intimidating with long stretch of commands.

 **Git is beautiful.**Try this [game](https://try.github.io/).

Part of making `git` easier to use, is to set up your own aliases. That is, once you understand the underlying commands. This is not to give you **all** the useful aliases. Instead, point you at the possibilities so that you can build your own list. 

### Flying Solo

Let's say you are hacking on your own. You stage and commit all day, may be your code or your writings for the blog. You'll find a bunch of aliases very useful.

```bash
git config --global alias.s status
git config --global alias.aa 'add --all'
git config --global alias.cm 'commit -am'
git config --global alias.up 'push'
```

Make sure you have a well defined `.gitignore` to avoid tracking unnecessary files such as `node_modules`. This will help you when you use `git aa` to stage all files.

All these aliases are stored in a config file under home directory. Take a look into `~/.gitconfig`. You can even edit the config file directly, just ensure you don't trip it off.

### Code Collaboration

When you are collaborating in a team, a whole other list of commands may be useful. Remember, rebase rewrites history. It is [advised only for local branches](https://coderwall.com/p/7aymfa/please-oh-please-use-git-pull-rebase), to clean up your code on top of remote branch.

```bash
git config --global alias.pr 'pull --rebase upstream master'
```

Here is one from [Harry] (https://csswizardry.com/2017/05/little-things-i-like-to-do-with-git/) about aliasing `blame` to `praise` and other nuggets that you may find useful.

### Advanced Aliases

```bash
git config --global alias.ls 'log --pretty=format:"%C(yellow)%h %C(green)%s %Creset(%ad)" --date=relative'
```

`%C(yellow)` marks the token following the color code in red. In our case above, `%h` stands for the commit hash, which will be painted yellow on our terminal. %Creset, without brackets, takes you back to default terminal font color. `--date=relative` tells you  `days/weeks ago` instead of an actual date.

### References
You can learn more about decorating in [git-scm.com](https://git-scm.com/docs/pretty-formats). There is a whole bunch
of information that you can extract such as `%h`, `%n` and so on. By the way, **that's a whole free book on git**. Start from page 1.

I learned a lot of useful tricks from Nicola a while back from his 2014 Atlassian summit talk. I couldn't find the video, but I found
[his slide](https://www.slideshare.net/GoAtlassian/becoming-a-git-master-nicola-paolucci). Don't miss that anonymous function within aliases.

Here is a list of his [git aliases](http://bit.do/git-aliases). But, in his own words, do not just copy aliases. Build them as you go, adding only the aliases that are useful to you. Otherwise, it'll just be like spending hours curating articles/books that we'll never read.

## 02. Bash Aliases

`Git` is not the only `command line interface` (CLI) that asks for some typing on the terminal. Think about `bundle exec rails db:migrate` on a terminal or `docker-compose exec npm run script` that you run on a container. How about something shorter? 

If you use commands that are longer, on a daily basis, consider setting up bash aliases.

The syntax is very simple.

```bash
alias new_cmd='never-ending-command; and another command'
```

The recent one I have set up is for docker commands. Should serve as example.

```bash
alias dc='docker-compose'
alias de='docker-compose exec'
alias up='cd ~/Projects/docker_project/; dc up'
```

Are you thinking what I am thinking? Forget about git aliases? What do we name bash alias for `git pull --rebase upstream master`?

How about `gprum`? Go wild.

## 03. One-Click Snippets

One click, on your custom designed desktop icon, with your own logo, and you'll have these ready to roll:

* Opens your project folder in VS Code/atom
* A terminal running dev server
* Another tab running tests / hot reloading
* Last tab that opens with git status
* The last tab stays open for you to `git` things done.
* If your dev server doesn't open browser, you can open it here

There is something magical when you can just tap on an icon and the entire environment springs up for you. One tap and you get your text editor, web server and tests running already.

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

### Watch One-click Icon in Action

Here is a gif showing my recent one-click script.
![One Click To Jumpstart Work](/img/005_one_click/one-click-small.gif)

A larger one, 2.6MB, [here](/img/005_one_click/one-click.gif) if you want to take a closer look.

Here is one more I use to start writing this blog. 

* Opens up blog folder on VS code
* Loads up `localhost` on firefox 
* Opens up `hugo server` on terminal 

I use elementary OS and default `pantheon-terminal` that comes with it. That little `&` at the end of `firefox` gives control back to the script. Otherwise, my terminal wouldn't open until I close `firefox`.

```bash
#!/bin/bash

export WORK_DIR="~/pineboat"
/opt/firefox/firefox localhost:1313 &
code $WORK_DIR
pantheon-terminal -e 'bash -c "cd $WORK_DIR;hugo server -wvFD"'
```
Finally, I've setup a desktop file with the logo of my blog. 
Pretty sweet, isn't it? 

Hope that was useful. Spread it to your friends and followers if you think they'll enjoy this post. Any issues, log it under this [github issue](https://github.com/pineboat/pineboat.github.io/issues/4).

Thanks for your time and attention! 