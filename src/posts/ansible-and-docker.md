---
title: Benefits of Docker for application deployment
date: '2013-12-04'
tags:
  - ansible
  - docker
  - sysadmin
  - cyber
---

I've been working on a project called [Keybits](http://keybits.net) to make it easy to set up a personal server by installing the various applications you might need (blog, chat server, etc.) in [Docker](http://docker.io) containers.

- - -

A few people have asked what the benefits of this are. Since the server is being deployed and maintained using [Ansible](http://www.ansibleworks.com/), why not just install all the applications directly? For example there's a great personal server project that does just this: [Sovereign](https://github.com/al3x/sovereign).

**Outlined below are the advantages Docker brings to the table.**

While researching this post I came across this [excellent piece by Zef Hemel on InfoQ](http://www.infoq.com/articles/docker-containers). It goes into much more detail than I do here and I highly recommend reading it if you're unsure of the benefits of Docker for application deployment. This post distils some of the points Zef makes.

When you're reading through the points below you might be thinking: *'But virtual machines can already achieve most of these things.'* This is very true except for a couple of crucial differences:

1. **Price:** each time you spin up a new virtual machine (e.g. on EC2) you'll need to pay for it. If you're only lightly using an application (e.g. for a personal server) then there are likely already plenty of spare resources on your existing VM. Docker can run many containers on one VM with very little overhead.

2. **Speed of operations:** VM's take several seconds or longer to start and they also take time to backup / snapshot and make images. Docker can start containers almost as quickly as starting a process so they don't all need to be running all the time. Backing up and making images is nearly instantaneous as it uses layered diffs to store images.

### Docker benefits

1. **Isolation of services and applications:** On a personal server you will probably want to run applications with different requirements. You might need Apache and nginx, Rails 3 and Rails 4, PHP4 and PHP5. Trying to get all of these running on the same server natively can be tricky to say the least. With Docker containers you simply package up all the requirements for a given application and nothing will interfere with anything else.

2. **Security:** Containers allow you to sandbox your applications. Docker provides better security than regular process isolation, so if an application is hacked it won't affect the rest of the server.  This benefit is already being taken advantage of in production - for example, [Blitline are now able to allow customers to upload custom ImageMagick scripts](http://blog.docker.io/2013/12/how-blitline-is-using-docker/) without fear of impacting their whole service.

3. **Testability and reproducibility:** If you have some scripts to deploy applications to a server, the outcome when you run those scripts on different hosts or at different times may be different. Perhaps a package in an apt repository has been upgraded since you last ran the deployment script and the upgraded version breaks a dependency? By packaging your applications into containers and freezing them there you can be sure that they will run as tested wherever they are deployed. When you need to upgrade a component in the container it is fast to run the upgrade, test the resulting container and deploy the diff of the new image to your hosts.

4. **Limit resource usage:** Docker makes it easy to limit the CPU and memory available to an application. This way a rogue process or a traffic spike on your blog won't necessarily bring down your whole VM.

5. **Upgrading / downgrading / application versions:** Imagine that a new version of an application comes out. You try it out but really don't like the new UI that has been introduced. How do you roll back on a conventionally deployed application? With a Docker container you can just switch back and use the previous image in a matter of seconds.

6. **Easily remove or add applications:** Don't want an application any more? Simply destroy the container and there will be no traces left on your server. Want to add an optional application? It should be as easy as clicking a button and configuring any application requirements.

## Fantastic but not a panacea

These benefits are very helpful but there is still work to be done to get your applications deployed and keeping them running smoothly:

- You'll need to consider how to manage docker processes with a system process manager (e.g. systemd).
- Working out how to wire up containers with links and do service discovery requires some planning and careful container creation.
- Backing up the data stored in your application databases still requires a robust configuration and backup strategy.

These are the challenges I'm working on now to make adding applications to a personal server as easy as possible.
