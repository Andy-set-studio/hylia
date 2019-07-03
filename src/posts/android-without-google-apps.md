---
title: Android without Google Apps
date:  '2014-02-10'
tags:
  - keybits
  - android
  - cyber
---

**Vlad Brown has kindly published a translation of this post in Russian: Android без приложений от Google via [softdroid.net](http://softdroid.net/android-bez-prilozheniy-ot-google)**

As part of my [Keybits](http://keybits.net) project I wanted to see how feasible it was to run my entire personal computing environment without being tied to a single major commercial entity. This means using as much open source software as possible on the devices I use:

- - -

1. personal computer (a laptop running Xubuntu)
2. personal server (a virtual private server providing email, web hosting and other services that need to be online and easily addressable from the internet)
3. a mobile phone (an Android device (currently Nexus 4) running Cyanogenmod)

This post focuses on number three.

My Nexus 4 ([like many others](http://forums.androidcentral.com/android-4-4-kitkat/343853-android-os-battery-drain-4-4-2-a.html)) was suffering terrible random battery drain issues since the update to KitKat. This was infuriating as the phone would randomly drain all battery and die for no identifiable reason. And yes, I tried plenty of suggested fixes from the forums but all to no avail. So I was inspired to install a custom ROM to see if that would improve things.

## No Google Apps

I decided to try a pure Cyanogenmod installation as they have a stable release of Android 4.3 for the Nexus 4. There are plenty of guides on the internet to help you learn how to install custom ROMs on your phone so I won't go into that here.  Suffice it to say that this has completely fixed my battery issues so it was definitely a software problem. Cyanogenmod has lots of nice touches not found in the stock ROM that you really value once you get used to it.

What's hopefully more noteworthy is that I decided to try running the phone without Google Apps. To quote from Cyanogenmod on [Google Apps](http://wiki.cyanogenmod.org/w/Google_Apps):

> Google Apps are the proprietary Google-branded applications that come pre-installed with most Android devices, such as the Play Store, Gmail, Maps, etc. Due to licensing restrictions, these apps cannot come pre-installed with CyanogenMod and must be installed separately. The Google Apps are not required to boot or run CyanogenMod, however many users find them beneficial to take full advantage of the Android ecosystem.

<img style="float: right; margin: 0px 0px 15px 15px;" src="/images/2014/android-home.png" />

## Enter F-Droid

Thanks to the wonderful [F-Droid](https://f-droid.org/), I've found it quite easy to get by without Google Apps. In fact it feels great (please note the subjectivity here - this won't be for everyone)!

Here's a quick rundown of the main apps I'm using:

- Email: [K-9](https://f-droid.org/repository/browse/?fdfilter=k9&fdid=com.fsck.k9)
- Web browser: [Firefox](https://f-droid.org/repository/browse/?fdfilter=firefox&fdid=org.mozilla.firefox)
- News Reader: [Newsblur](https://f-droid.org/repository/browse/?fdfilter=newsblur&fdid=com.newsblur)
- Twitter: [Twidere](https://f-droid.org/repository/browse/?fdfilter=twidere&fdid=org.mariotaku.twidere)
- Bookmarks: [Pinboard](https://f-droid.org/repository/browse/?fdfilter=pinboard&fdid=com.pindroid)
- Music: [Apollo](https://f-droid.org/repository/browse/?fdfilter=apollo&fdid=com.andrew.apollo)
- Radio: [Servetream](https://f-droid.org/repository/browse/?fdfilter=servestream&fdid=net.sourceforge.servestream)
- GPS tracking: [OSM Tracker](https://f-droid.org/repository/browse/?fdfilter=osmtracker&fdid=me.guillaumin.android.osmtracker)
- Maps and Navigation: [OsmAnd](https://f-droid.org/repository/browse/?fdfilter=osmand&fdid=net.osmand.plus)

The default calendar, contacts, SMS and camera apps all work fine.

## Syncing calendar, contacts and tasks

Setting up calendar and contact syncing proved to be a pain! I'm using Thunderbird / Lightning on the desktop and it really needs work to make setting up remote Calendars easier.

For now I'm using a hosted solution, [Fruux](https://fruux.com/), which is working really well. Unfortunately the setup process in Thunderbird / Lightning is extremely tedious and there's no way anyone but the die-hard tinkerer would choose to do this over the super simple solution offered by Google. Once it's up and running it's reliable and effective but I hope I don't have to reinstall and reconfigure everything any time soon!

An elegant self hosted solution is not far away. There are a number of Android CardDAV and CalDAV solutions emerging - most notably [DAVdroid](http://davdroid.bitfire.at/what-is-davdroid) since it is open source. On the server I plan to install and configure [Radicale](http://radicale.org/) as part of the Keybits server.

[Owncloud](http://owncloud.org/) can also help you with syncing (and more) but I'm not a fan of it's monolithic approach. If you're interested in what OwnCloud can do for you in this setup, [this post](http://sufficientlysecure.org/index.php/2013/11/26/an-android-without-google/) has some useful suggestions.

## Still using some proprietary apps

It's possible to [download APKs](http://apps.evozi.com/apk-downloader/) of free (as in beer) Android applications and 'side load' them. This is what I've done for some applications that I haven't found suitable open source alternatives for, e.g:

- Read it later offline article reading: Pocket
- ToDo lists and project planning: Trello

I'm planning to replace Pocket with a self hosted solution soon - watch this space!

## Syncing files and zim

I'm using rsync and [SSHelper](http://www.arachnoid.com/android/SSHelper/index.html) to keep files in sync between my laptop and phone. I won't detail the setup for this just now as I plan to replace it with [git-annex](http://git-annex.branchable.com/) when the Android app becomes a bit more stable. Joey is working on this [at the moment](http://git-annex.branchable.com/design/roadmap/) so it shouldn't be too far away!

[Zim](http://zim-wiki.org/) has completely replaced Evernote for me. It's easy to sync notebooks to Android and then view them as text files when you're offline or out and about.

## What about paid apps?

There are a few useful apps that I've previously paid for on the Play Store. I'm happy to do this to suport quality niche applications and avoid ads. Running my phone without the Play Store / Google Play services installed means there's no legal way to get hold of them. I wonder if an independent 'paid for' Android app store could be 'a good thing'?

You can install Google Play services from an APK but it has a few dependencies such as Google login services. The [NOGAPPS](http://forum.xda-developers.com/showthread.php?t=1715375) project on XDA has some suggestions too but I've not tried them as everything seems a bit 'beta'!

## Conclusion: much happiness but room for improvement

As a hacker and tinkerer this approach to mobile computing has brough me a great deal of satisfaction. The knowledge that the applications I'm running are mostly open source and aren't relying on mining personal data to justify their existence is very valuable. It also gives a great feeling of control over your device and, in my case, better stability.

There are still some areas that I'd like to improve and I'll document the solutuions as I find them on this blog.
