---
title: Software development choices
date: '2013-05-07'
tags:
  - programming
  - python
  - linux
  - cyber
---

For the last 15 years I have spent most of my work time using computers and the internet. I've designed websites, administered servers, customised WordPress and run Distance Learning courses using Moodle. The focus has always been on providing a service to people using pre-built tools.

<!--more-->

Now I'm excited to be making a change and will be creating web applications from the ground up. As I've been immersed in the internet for many years I have a lot of [domain knowledge](http://en.wikipedia.org/wiki/Domain_knowledge). I know how a web application hangs together, I've learnt about [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) frameworks and [REST API's](https://en.wikipedia.org/wiki/Representational_state_transfer). Setting up a secure VPS with SSH from the terminal is something I take for granted so these things are not covered here. What I lack is programming experience as up until now I've been busy hacking bits of code and copy-pasting snippets to get things to do what I want as quickly as possible.

## Aim of this post:

1. summarise the software development choices I've made
2. point the interested reader at the books and resources I've found useful

It was written primarily for a couple of friends who were wondering what I've been up to.

**Disclaimer:** You could make different choices for just about everything I suggest here. I won't be trying too hard to defend my decisions if they upset you.

## Aims of the choices

- allow me to develop software primarily for the web
- use good quality, well designed tools
- be able to understand what's going on so I can fix things
- use open source software everywhere possible.

### Analogy - building a house compared to building a web application

I designed and built the house we live in. Having no previous experience in building or architecture I learned as I went. I got a lot of help from people but I contributed to every process. What we ended up with works well:

- the main design goal of being highly insulated and energy efficient has been achieved
- it's made of good quality materials that can be repaired
- I understand how it works and where things are so I can fix things if they go wrong

It's by no means perfect and isn't exactly a show-case for beautiful design. But it works, and that's because building a house is not extremely difficult. It's useful to have a few good quality tools and compliant materials. For these reasons our house is mostly timber as it's easy to work with and there are some great modern tools available (e.g. mitre saws and cordless screwdrivers).

Building something truly beautiful (a cathedral) or something very technical (a skyscraper) requires people more highly trained and cleverer than I am.

I now want to make the equivalent of a house in software development terms: [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) web applications. In 2013 these are not that difficult!

Sure I can look at geniuses like [Fabrice Bellard](http://bellard.org/) and know that I'll never be able to program like he can. I can also look at those who design programming languages and conjure clever algorithms and feel humbled. It's been observed that expert programmers have over [10,000 hours experience]((http://norvig.com/21-days.html)) in a language. In building terms these people are constructing cathedrals and skyscrapers. I don't need a cathedral or a skyscraper. I'd like to build the equivalent of a house.

With modern tools, languages and the internet, it's quite straightforward to teach yourself enough to build something useful. It might not be the most elegant version possible. But as long as it works and I know how to fix and improve it then I'll be happy.

Perhaps the most important thing is the irrational love of working with a computer and the internet - I think about this stuff all the time. Motivation is not a problem!

## Development environment and tools

Open source software is extremely important to me. For years I wished that I could have a desktop Linux that actually worked with all my hardware and looked beautiful.

In 2012 this finally became a reality and I settled on Xubuntu. (Another post is upcoming on this setup.) Debian unstable with XFCE would suffice just as well.

Whilst most modern open source servers and databases run on Windows it's not their natural home. For this reason nearly all web application developers use Mac OSX or Linux. A good terminal and a package manager are wonderful things. You should get familiar with your shell (Bash for me) and package manager before doing too much programming learning.

Even in the age of easy virtualisation for development work, using the same platform on the desktop as that which you deploy to means one less context switch to make. Ubuntu LTS releases are what I run on the server.

For writing code use [Sublime Text](http://www.sublimetext.com/) (I'll make an exception to open source requirements here). There are lots of guides out there for getting Sublime set up with the packages and settings you need.

(I'm planning another post on my Sublime Text setup with links to useful reources.)

Learn the basics of [VIM](http://www.vim.org/) for editing files on remote machines or in the terminal. If you get good enough at VIM to be more productive than you are in Sublime Text then please let me know and I will be very impressed. It's certainly possible but I'm just not hard-core enough!

[WebStorm](http://www.jetbrains.com/webstorm/) and [PyCharm](http://www.jetbrains.com/pycharm/) are great IDE's for the languages I use but I still prefer the speed and flexibility of Sublime Text.

## Version control

Learning about version control is, in my opinion, required before you start learning to code. I quite like Mercurial but Git is the de-facto standard for open source software projects thanks to GitHub.

To learn Git for basic usage all you need to read is [Pro Git](http://git-scm.com/book/). Then start practising with some text files. If you're prepared to install Java on your machine then [SmartGitHg](http://www.syntevo.com/smartgithg/index.html) is the nicest GUI I've found on Linux and it really helps with visualising changes and logs.

## Database design, RDMSs and noSQL stuff

At high school I wrote a primitive database management system in BASIC on a BBC micro. Unfortunately nobody introduced me to [Ted Codd](http://en.wikipedia.org/wiki/Edgar_F._Codd) and Relational Theory at that point so I missed out on being inspired at an early age. Better late than never though, and in my twenties I read some great articles on relational database design and theory in PC Pro magazine by [Mark Newton](http://www.ecats.co.uk/team.asp#mark).These are still in a folder in my draw.

Today the NoSQL / RDBMS debates rage all over the internet. To save yourself some time: NoSQL data stores are not a replacement for RDBMS's - they're good at different things. You need to pick the right tool for the job.

Some of the decision on what to use also depends on where you want the rules that enforce data integrity to be: in your application or in the data store? NoSQL data stores are great for early prototyping as you can iterate rapidly without migrations. But [SQL can be agile](http://lucumr.pocoo.org/2012/12/29/sql-is-agile/)!

For most classes of web application that I'm interested in [PostgreSQL](http://www.postgresql.org/) is the best choice. I'm happy to define the schema up front and enjoy the fact that if the application code should change then that database will remain coherent. It's not just [old folk](http://www.dbdebunk.com/) who promote the benefits of relational databases and I recommended reading 'SQL is Agile' by Armin Ronacher linked above.

Good books to learn all you need for basic web application database design are:

- [Database Design for Mere Mortals](http://www.amazon.co.uk/Database-Design-Mere-Mortals-Relational/dp/0321884493/ref=sr_1_1?ie=UTF8&qid=1367669567&sr=8-1)
- [Beginning Databases With PostreSQL - From Novice To Professional, 2nd Ed](http://www.amazon.co.uk/Beginning-Databases-PostgreSQL-Novice-Professional/dp/1590594789/ref=sr_1_fkmr0_2?s=books&ie=UTF8&qid=1367669654&sr=1-2-fkmr0)

In NoSQL land I have a great interest in [CouchDB](http://couchdb.apache.org/) and [PouchDB](http://pouchdb.com/) for making offilne personal information applications. For me these really shine when each user can have their own database. The replication possibilities are very exciting. The attitude of the developers around both these projects is fantastic and having lurked around on mailing lists and twitter I feel like they're my friends already!

CouchDB isn't right for everything and in multi-user CRUD applications I'd still go for PostgreSQL.

[RethinkDB](http://www.rethinkdb.com/) also looks great and I've enjoyed experimenting with ReQL but it's still a bit new for me to commit to at this time. If I had to choose between MongoDB and RethinkDB I'd go for RethinkDB.

[Redis](http://redis.io/) is extremely great for logging and [session management](http://flask.pocoo.org/snippets/75/).

## A general purpose language - Python

Python and Ruby are the two big candidates here. Both are slow and interpreted but that doesn't really matter in most web applications until you reach massive scale. The elegance and ecosystem of both languages is wonderful.

I really like Ruby but never got into Rails. Sinatra is a fantastic framework. But I've now decided to focus on Python as I found more useful projects in Python land.

Python 3 has been available for ages and it looks like many projects are starting to embrace Python 3 compatibility. But Python 2.7 is still the version to use for now - so that's what you want to be working with.

You'll want to get PIP and Virtualenv installed fairly early on. I like Virtualenvwrapper too. [Here's a nice guide](http://flexion.org/posts/2012-12-python-and-virtualenv-on-archlinux-and-ubuntu.html) to help get you started.

**[iPython notebook](http://ipython.org/ipython-doc/dev/interactive/htmlnotebook.html)** is a brilliant tool for learning Python.

This will transform your learning. Here are some [instructions for getting set up on Ubuntu](http://pythonadventures.wordpress.com/2012/03/31/ipython-notebook/). As you read the books below, do the exercises and write code and notes in your iPython notebook. Absolutely superb - I wish I'd had this when I started learning Python. (Press ctrl + s to save regularly.)

Here's how I'd recommend learning Python:

- read [Core Python Programming 2nd Edition](http://www.amazon.co.uk/Core-PYTHON-Programming-Wesley-Chun/dp/0132269937/ref=sr_1_1?ie=UTF8&qid=1367951044&sr=8-1) - **just Part 1**
- Use [Quick Python book](http://www.amazon.co.uk/Quick-Python-Book-Naomi-Ceder/dp/193518220X/ref=sr_1_1?s=books&ie=UTF8&qid=1367951162&sr=1-1) and [Python Essential Reference](http://www.amazon.co.uk/Python-Essential-Reference-Developers-Library/dp/0672329786/ref=sr_1_1?s=books&ie=UTF8&qid=1367951195&sr=1-1) as backup as well as the [online documentation](http://docs.python.org/release/2.7.4/)
- write a couple of small applications using only Python and the standard library
- Then read [Core python applications 3rd edition](http://www.amazon.co.uk/Core-Python-Applications-Programming-Wesley/dp/0132678209/ref=sr_1_2?s=books&ie=UTF8&qid=1367951343&sr=1-2) and [The Python standard library](http://www.amazon.co.uk/Python-Standard-Library-Example-Developers/dp/0321767349/ref=sr_1_1?s=books&ie=UTF8&qid=1367951376&sr=1-1) by example.

You don't need to read everything in these books but pick out chapters that you find interesting and especially those related to web application development. I'd definitely recommend reading about sockets, TCP and threading. Do the exercises and write small applications.

Other things to look at include the [Python Guide](http://docs.python-guide.org/en/latest/) by Kenneth Reitz and also, read the source code and play with his [Requests](http://docs.python-requests.org/en/latest/) library.

For debugging I'd recommend using [pudb](https://github.com/inducer/pudb) instead of pdb (here's a [good intro](http://asmeurersympy.wordpress.com/2011/08/08/hacking-pudb-now-an-even-better-python-debugger/))

Python's unittest is a decent testing framework. You'll find some good advice on Test Driven Development and Behaviour Driven Development in the [Python Testing Cookbok](http://www.amazon.co.uk/Python-Testing-Cookbook-Greg-Turnquist/dp/1849514666/ref=sr_1_1?s=books&ie=UTF8&qid=1367954529&sr=1-1).

For some of the ideas I have these Python applications will be extremely useful:

- [Ansible](http://ansible.cc/) for automated provisioning over SSH.
- [Radicale](http://radicale.org/) - caldav and cardav server
- [NoPriv](https://raymii.org/s/software/Nopriv.py.html) - email backup script
- [PgBarman](http://www.pgbarman.org/) - PostgresQL backup and recovery
- [Lamson](http://lamsonproject.org/) - Python SMTP server
- [Leselys](https://github.com/socketubs/leselys) - Self hosted news reader

## Web frameworks - Django and Flask

> [Probably the biggest mistake you can make] **Spending too much Time with the Choice of Framework**. If you have a small application (say less than 10.000 lines of code) the framework probably isn't your problem anyways. And if you have more code than that, it's still not that hard to switch systems when you really have to. [Armin Ronacher - 'Common Mistakes as Python Web Developer'](http://lucumr.pocoo.org/2010/12/24/common-mistakes-as-web-developer/)

I committed this mistake and spent the last couple of years dabbling in lots of frameworks. It was great fun and I learnt a lot - but it doesn't help you make anything useful.

Django is the 'batteries included' framework of choice for Python. It's fantastic when you need to build a project that fits with Django's way of doing things. A lot of CMS type sites, blogs and directories fit this description very well. It can of course handle a much broader set of problems as well.

When the project is smaller I like to make my own choices about what to use where. As I already have three links to his writing in this piece you'll understand why the author of [Flask](http://flask.pocoo.org/) has impressed me. So Flask it is, if you're learning your first web framework. It's gained enough popularity to have a decent amount of online help and tips. The [documentation](http://flask.pocoo.org/docs/) is fantastic.

After learning the basics from the Quick Start Guide and Tutorial, you need to do the [Flask Mega Tutorial](http://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world). This will teach you a lot about how a modern web application hangs together.

[SQL alchemy](http://www.sqlalchemy.org/) is a brilliant Database Abstraction Layer (DAL) and Object Relational Mapper (ORM) when you need it. Read the docs and try [this ORM introduction](http://www.blog.pythonlibrary.org/2012/07/01/a-simple-sqlalchemy-0-7-0-8-tutorial/).  SQL ALchemy's author, Mike Bayer, even has a [three hour tutorial](http://techspot.zzzeek.org/2013/04/04/introduction-to-sqlalchemy-pycon-2013-wrapup/) from Pycon 2013 to follow along with. How great is that?!

## What about node, Meteor, Go and all the other super cool new stuff?

I can see the benefits of things built on top of [Node](http://nodejs.org/) like [Express](http://expressjs.com/) and, more comprehensively, [Meteor](http://meteor.com/) for real-time apps. But I really prefer coding in Python than JavaScript and for the apps I want to make a more traditional web stack will do just fine.

[Go](http://golang.org/) looks like a brilliant language which can easily be used for writing web applications. As a compiled language the performance is wonderful but it's still new and for a novice programmer like me I'd rather have the vast Python ecosystem of existing code and learning resources than the speed of Go. It's on my list of things to learn in the future!

## JavaScript, HTML and CSS

You need to know something about all of these. I guess I take it for granted that I'm reasonably competent with HTML and CSS. There are endless resources for learning the basics on the web. I've recently enjoyed [HTML5 boilerplate web development](http://www.amazon.co.uk/HTML5-Boilerplate-Development-Manian-Divya/dp/1849518505/ref=sr_1_1?s=books&ie=UTF8&qid=1367954187&sr=1-1) which covers a lot of really useful modern techniques.

Learning JavaScript is unavoidable. I'd recommend reading [Eloquent Javascript](http://eloquentjavascript.net/) followed by [Professional JavaScript for Web Developers](http://www.amazon.co.uk/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691/ref=sr_1_1?s=books&ie=UTF8&qid=1367954357&sr=1-1).

You'll want to use Firebug or the Chrome Developer Tools a lot. [25 Secrets of the Browser Developer Tools](http://www.andismith.com/blog/2011/11/25-dev-tool-secrets/) is a great starting point. Follow that with [Modern Web Development Part 1](http://jtaby.com/blog/2012/04/23/modern-web-development-part-1).

[AngularJS](http://angularjs.org/) is taking off in a big way at the moment. It really clicked for me and when I need to create some complex frontend interaction I'll be using Angular. There are lots of learning resources on the web. I'd start with [John Lindquist's videos](http://www.egghead.io/).

Have a read about [Yeoman](http://yeoman.io/) which will also introduce you to Bower and Grunt. (Gotta love all the names in the JavaScript world.)

A recent entrant in JavaScript testing land is [Intern](http://theintern.io/) which looks excellent.

This section has glossed over quite a lot and assumed you might know why you'd need something like Angular... but this post is already long enough and if you've got this far then I'll assume you're interested enough to find out for yourself.

## Conclusion

That'll keep you busy for a while! Here's what to do every day:

1. read books
2. write code
3. look up answers on the web
4. repeat every day

Have fun!
