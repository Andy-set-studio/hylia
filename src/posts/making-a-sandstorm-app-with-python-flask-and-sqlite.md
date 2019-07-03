---
title: Making a Sandstorm app with Python, Flask and SQLite
date: '2016-04-05'
draft: true
tags:
  - sandstorm
  - flask
  - python
  - cyber
---

Sandstorm makes it easy to write web appplications that can be safely installed and hosted in the cloud. Many of the security and scalability concerns you'd normally have with deploying an application to a server are mitigated by Sandstorm.

If you're a novice developer looking to get your web application in use, then Sandstorm is a great place to start. This post gives some tips for getting things working on Sandstorm if you're using Python and Flask for development.

<!--more-->

Python, Flask and SQLite make for a very pleasant development experience if you're learning about web application programming. You don't have to take in as much as with a full-on batteries included framework like Django.

Especially if you're developing a personal app which will be ideal for Sandstorm...

Peewee, SQLite - good extensions, full text search....

Tips and tricks to get your app workin in Sandstorm

for imports to work:

- add `__init__.py`
- add pythonpath in sandstorm-pkgdef.capnp under environ... (may be a better way...)
- how to make https work (see git commit) (might be a better way)
- how to remove nginx and uwsgi
- how to make sqlite and files uploads work

to publish I had to put the spk in directory above the app dir (i.e. Development) and then run

```bash
vagrant-spk publish ../permanote.spk
```
from the app dir


## Future work

Sharing of notes ()
