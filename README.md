# [Pineboat.in](https://www.pineboat.in/) - A Tech Blog

Hosted on [Netlify](https://netlify.com).

## Git Workflow

The production branch is published.
The development branch is for theme UI development
The content branch handles new posts. The content branch is also the one connected to [forestry.io].

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

