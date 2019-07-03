---
title: Automatically use correct SSH key for remote Git repo
date: '2013-10-07'
tags:
  - git
  - cyber
---


If you have more than one GitHub account, or push to remote repositories using various accounts, it's handy if the correct SSH key will automatically be used for the project you are working on. This post explains how to achieve that.

- - -

## Create keys for each GitHub account

Generate a new key pair:

```bash
ssh-keygen -t rsa -C "github-user1" -f "github-user1"
```

The `-C` option is just a comment to help you identify the key. The `-f` option specifies the file name for the key pair. You can choose how to name the key pair - I'd suggest something like `github-user1` where user1 is your GitHub username.

Enter a strong passphrase when prompted and make sure to remember it!

You'll now have a public and private key in your `~/.ssh/` folder.

Repeat the above for each GitHub account you want to use.

## Add the public key to the relevant GitHub account

The [GitHub documentation](https://help.github.com/articles/generating-ssh-keys#step-3-add-your-ssh-key-to-github) will help you with this.

## Configure SSH

In `~/.ssh/` create a file called `config` with contents based on this:

```bash
#user1 account
Host github.com-user1
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-user1

#user2 account
Host github.com-user2
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-user2
  ```

Replace `user1` or `user2` with your GitHub usernames

## *[optional]* Getting your keys on a keyring

Depending on your operating system you'll need to find out how best to do this. Using a keyring saves typing passphrases all the time.

I use Xubuntu which comes with [gnome-keyring](https://wiki.gnome.org/GnomeKeyring). This starts on system startup (Settings > Session and Startup > Advanced > Launch Gnome services on startup) and adds all keys in `~/.ssh/` when I log in to the system.

You can check the keys on your keyring with `ssh-add -L`

## Configure your Git repo

You can clone an existing GitHub repo if you don't already have a local copy. The following syntax will ensure the remote is configured correctly to work with our setup:

```bash
git clone git@github.com-user1:user1/your-repo-name.git your-repo-name_user1
```

Go to the local Git repo that you want to configure (or the one you just cloned) and enter:

```bash
git config user.name "user1"
git config user.email "user1@example.com"
```

Where `user1` matches the values you used earlier in your ssh config.

If you cloned using the above command then you're all set. If the repo was already present you might need to customise your Git remote. Check your current remotes with `git remote -v`

Assuming you want to update `origin` you'll need to do:

```bash
git remote set-url origin git@github.com-user1:user1/your-repo-name.git
```

Make sure that the bit between `:` and `@` matches the relevant `Host` defined earlier in your ssh config. This will make sure that Git uses the correct key.

You can now `git push` as normal and the correct key will automatically be used.

**Credit:** most of the information in this post is gleaned from [this Gist](https://gist.github.com/jexchan/2351996). I've rewritten for clarity and added some information about using keyrings.
