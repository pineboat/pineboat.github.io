---
title: "Drop Keystrokes and Watch Your Productivity Soar"
subtitle: "Git Aliases are inevitable. Bash Aliases are irresistible"
tags: ["git","bash","aliases","terminal"]
author: "vijayabharathib"
date: "2019-12-23T22:45:25+05:30"
publishdate: "2019-12-23T22:45:25+05:30"
draft: "true"
---

A combination of aliases and bash scripts can make one very productive in their dev workflow. If you haven't used them, just know this. Those who use aliases know the loss when they switch workstations. To an extent where we forget the original underlying commands.


## 01. Git Aliases

### Flying solo

git config --global alias.s status
git config --global alias.ls 'log --pretty=oneline'
git config --global alias.aa 'add --all'
git config --global alias.cm 'commit -am'
old pc laptop had color coding for --pretty=oneline

### Code Collaboration

### Advanced Aliases


## 02. Bash Aliases

Think about `docker-compose exec` that you run on a container. That's 19 characters. How about the same with just `de`? 

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

Are you thinking what I am thinking? What do we call `git pull --rebase upstream master` - `gprum` may be?

## 03. One-Click Snippets 

One click, and you'll have these ready to roll:
* A terminal running dev server 
* Another tab running tests / hot reloading 
* Another tab that opens your text editor
* The last tab stays open for you to `git` things done.

There is something magical when you can just tap on an icon and the entire environment springs up for you.  One tap and you get your text editor, web server and tests running already.

The bash file `get-to-work.sh` looks like this.

```bash
#!/bin/bash

export WD="~/development"

gnome-terminal \
--tab --working-directory=$WD \
-e 'bash -c "export BASH_POST_RC=\"npm start\"; exec bash"' \
--tab --working-directory=$WD \
-e 'bash -c "export BASH_POST_RC=\"atom $WD\"; exec bash"' \
--tab --working-directory=$WD \
-e 'bash -c "export BASH_POST_RC=\"npm run watch\"; exec bash"'
```

Run this command to mark the bash script as executable.
```bash
chmod +x get-to-work.sh
```


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

desktop-file-validate get-to-work.desktop
desktop-file-install get-to-work.desktop

That's it. You'll have your logo ready as an application within your launcher. 

