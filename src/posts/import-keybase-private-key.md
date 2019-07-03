---
title: How to import Keybase private key to use locally with GPG
date: '2016-02-20'
tags:
  - security
  - cyber
---

[Keybase](https://keybase.io/) is a very handy way to verify identities. I wanted to use my Keybase key locally with GPG so that I could encrypt and sign things (specifically I was [packaging a Sandstorm app](https://docs.sandstorm.io/en/latest/developing/publishing-apps/#verify-your-identity)).

In order to do that you need to get your Keybase public and private key installed locally. Here's how:

<!--more-->

1: Save your public Keybase key to a file called something like `keybase-public.key`. You can get this by clicking on the key Fingerprint on the keybase website:

![Get Keybase public key](/images/2016/keybase1.png)

2: Save your private Keybase key to a file called `keybase-private.key`. You can get this by clicking on the 'edit' link to the right of the key Fingerprint on the keybase website:

![Get Keybase private key](/images/2016/keybase2.png)

3: Import the keys to gpg:

```bash
gpg --allow-secret-key-import --import keybase-private.key
gpg --import keybase-public.key
```
You may wish to securely delete the private key file now to ensure it doesn't fall into the wrong hands.

4: (Optional) Make the Keybase key your default key.

Get the keyID with `gpg --list-secret-keys` and make a note of the Keybase keyID.

Then edit `~/.gnupg/gpg.conf` and add a line:

```bash
default-key <your-keynase-keyid-here>
```

That's it - you can now use normal GPG commands to encrypt and sign things using your Keybase key.
