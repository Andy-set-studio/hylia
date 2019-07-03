---
title: Provision a server with Ansible to host Flask apps
date: '2013-06-12'
tags:
 - python
 - flask
 - linux
 - ansible
 - postgresql
 - cyber
---

Setting up a server should be reproducible and easy. Having never got on with Chef and Puppet I have fallen in love with [Ansible](http://ansible.cc).

<!--more-->

## (Small) Production Flask/WSGI application server

Inspired by [this excellent post](http://mattupstate.com/python/devops/2012/08/07/flask-wsgi-application-deployment-with-ubuntu-ansible-nginx-supervisor-and-uwsgi.html) by Matt Wright I have adapted his code to set up a VPS to serve up a Flask app with uWSGI, Nginx and Postgresql. The application is controlled by [Supervisor](https://pypi.python.org/pypi/supervisor).

## What you get

**A server with a running sample Flask application that pulls data from a test database and serves it via uWSGI and Nginx.**

This will get you started for robustly serving your Flask application on a VPS until such a time as it gets busy enough for you to need to move the database to it's own server.

The scripts work for me on Ubuntu 12.04 64bit but should work with small adaptations for other version of Ubuntu or Debian.

I've also added in a basic Node setup and I'll soon add a node application to the test deployment.

**NB This is a work in progress.** Use at your own risk and do let me know via an issue or pull request if you have any suggestions.

My repo on Github: <https://github.com/knitatoms/webapp-server-with-ansible> The README should have enough information to get you started.
