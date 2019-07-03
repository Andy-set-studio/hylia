---
title: Configure autoreload for IPython
date: '2014-01-12'
tags:
  - python
  - cyber
---

[IPython](http://ipython.org/) is truly wonderful for developing with Python. It comes with useful defaults, but one thing I was missing was autoreloading of modules. [These answers on stackoverlflow](http://stackoverflow.com/questions/1907993/autoreload-of-modules-in-ipython) include everything you need but the correct solution for newer versions of IPython (1.1.0 at the time of writing) isn't spelled out in one place, so I had to combine elements of several answers.

- - -

What I ended up doing was:

````bash
ipython profile create
````

Then edit `~/.config/ipython/profile_default/ipython_config.py` and add:

````python
c.InteractiveShellApp.extensions = ['autoreload']
c.InteractiveShellApp.exec_lines = ['%autoreload 2']
c.InteractiveShellApp.exec_lines.append('print("Warning: disable autoreload in ipython_config.py to improve performance.")')
````

You will now be able to load IPython, import a module and have it automatically reload when you make changes to it.
