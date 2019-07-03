---
title: Minimising friction for blogging with Hugo
date: '2017-05-05'
tags:
  - cyber
---

I was pretty inspired that [Levlaz was inspired](https://levlaz.org/posting-to-wordpress-via-email-with-mutt/) by Derek Sivers' post about OpenBSD. While I was hanging out in my terminal trying to remember how to get a blog post published with my super cool static site generating tool (Hugo), I was reminded that I needed to minimise friction for posting here.

So I wrote a  shell script to make it super easy to edit and publish a blog post:

```bash
#!/bin/zsh

if [ $1 = "new" ];
then
  if [ $2 ];
  then
    POST=$2
    cd ~/projects/keybits.net && hugo new post/$POST.md && \
      /usr/bin/open -a "/Applications/Google Chrome.app" 'http://localhost:1313' && \
      code content/post/$POST.md && hugo server --cleanDestinationDir
  else
    echo "No post name specified"
  fi
elif [ $1 = "publish" ];
then
  if [ $POST ];
  then
    echo "Are you sure you want to publish $POST?"
    select yn in "Yes" "No"; do
      case $yn in
       Yes ) cd ~/projects/keybits.net && \
             git add content/post/$POST.md && \
             git commit -m "Publish $POST" && \
             git push; return;;
        No ) return;;
      esac
    done
  else
    echo "No post env var set"
  fi
else
  echo "First argument must be 'new' or 'publish'"
fi
```

I saved this to `/usr/local/bin/blog-post.sh` and added to my aliases like so:

```bash
alias blog-post='. /usr/local/bin/blog-post.sh'
```

Note the 'dot space' which runs the script under the running shell so that we can set the post title as an env var for use when publishing the post later. So now I can type `blog-post new having-the-best-day-of-my-life` from anywhere in my terminal to:

- create a new markdown file with that name in my blog directory
- have hugo pre-populate it with the post date and title metadata
- start my editor with the markdown file open (VS Code in my case - substitute `code` for your favourite editor)
- open a browser tab with the local development site so I can preview what I'm writing
- start the hugo development server which has auto-reloading

Now I can write my blog post and saving the file will give an instant preview in the browser.

When I'm done I go back to the terminal and hit `ctrl+c` to stop the development server.

Now I can type `blog-post publish` which will check that I want to publish the post, and if I choose yes, create a commit and push to GitHub. Since I'm using Netlify, this will trigger a rebuild of my site and the post will be live.

## Summary of blog publishing workflow

- `blog-post new having-the-best-day-of-my-life`
- edit post and save
- `blog-post publish`

This makes me pretty happy since the only thing I wasn't liking about using a static site generator was the friction involved in publishing posts. Now that I've removed that, I can't wait to share more geeky stuff with the world.
