# [Pineboat.in](https://www.pineboat.in/) - A Tech Blog

Hosted on [Netlify](https://netlify.com).

## Git Workflow

The production branch is published.
The development branch is for theme UI development
The content branch handles new posts. The content branch is also the one connected to [Forestry](https://forestry.io).

### Multiple Git Profiles

Create a file named `config` inside `~/.ssh` folder. One for default work profile, another one for public profile.

```config
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa

Host github.public
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_public_vijayabharathib
```

While cloning a public repository, use a different host name (this is symbolic).

```sh
git clone git@github.public:pineboat/pineboat.git
```

Also set up a local `git config` for public (as the global git config will have work email):
```sh
cd pineboat
git config user.email "y.v@g.com"
git config user.name "vijayabharathib"
```

Cloning a work repository can use normal git clone URL:
```
git clone git@github.com:company/repo.git
```

### First Clone

Right after cloning, the branches need to be set up. Following will do:

```sh
git branch -a
git checkout -b content origin/content
git checkout -b development origin/development
git checkout -b production origin/production
```

The theme will be a `git submodule` and it will be empty after cloning parent repo. It has to be downloaded, which is via:

```sh
git submodule update --init
```

**Note**: The submodule is a problem while working with multiple git ssh profiles.

### Workflow for Content

Before you start, get up to date version of the repo:
```bash
git pull origin production
git checkout content
git rebase origin production
```

After you are done with the writing
```bash
git status
git add --all 
git commit -m "message"
git push content
```

On GitHub.com, you can create a pull request on `production` based on the commit from `content` branch. 

Check the deploy preview on Netlify.com before merging the pull request.


### Workflow for UI/Theme

Before you start, get up to date version of the repo:
```bash
git pull origin production
git checkout development
git merge origin/production
```

The beehive theme is a separate repository. It is NOT a git submodule yet. So, after testing the theme separately, copy over the files using `refresh_theme.sh`. 

Once the theme files are copied over, you need to generate resources like SCSS locally by running plain `hugo` command. This will generate the static site under `public` folder and `resources` folder will have stylesheets.

Remember, you need the `resources` folder, but not the `public` folder ( that is ignored by .gitignore anyways, but in case).

After you are done with the redesigning and generating assets, commit it to Github.

```bash
git status
git add --all 
git commit -m "message"
git push development
```

On GitHub.com, you can create a pull request on `production` based on the commit from `development` branch. 

Check the deploy preview on Netlify.com before merging the pull request.

**The deploy preview will lack styles**. That is because, the `link` tag in `head` will be pointing at a stylesheet from `pineboat.in/styles` as the theme currently uses absolute path. Manually replacing the initial portion of the URL to use **deploy preview** URL from netlify will give you the styles.


## Dependencies

Building the website has dependency on `postcss`. A `package.json` at root level will solve the problem. But to prevent `netlify` from building the `css` files, no `package.json` has been added. Todo: there must be a way to prevent `netlify` from building `package.json`.

For now, the `package.json` from `themes` folder can be copied to project root to install dependencies.

```sh
cd pineboat
cp ./themes/beehive/package.json .
yarn
```