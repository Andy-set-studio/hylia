---
title: Update DNS-O-Matic with a Python Script
date: '2012-11-09'
tags:
  - sysadmin
  - python
  - cyber
---

[DNS-O-Matic](http://dnsomatic.com/) is a service from [OpenDNS](http://www.opendns.com/) that updates several dynamic DNS services. This is handy if your router will only update one dynamic DNS provider but you need to update more than one (e.g. I update OpenDNS to make use of their excellent [parental controls](http://www.opendns.com/home-solutions/parental-controls/) and [DynDNS](http://dyn.com/dns/) to register a name on the internet for my home server).

<!--more-->

I've yet to find a router that can update DNS-O-Matic. It's possible to install an updater client on each computer on your network but I'd rather have something requiring less maintenance.

Here's a Python script I wrote that runs on a home server. It's on a cron job to check every 10 minutes.

**Disclaimer** This code is hacked together and is not well tested. Please let me know if you can improve it.

```python
    #!/usr/bin/env python

    # Adapted from: http://ubuntuforums.org/archive/index.php/t-247563.html
    # Need to make sure Python is installed with SSL support on OpenWRT

    from base64 import encodestring
    from socket import gethostbyname
    from urllib import urlencode
    from urllib2 import Request, urlopen

    #Put your username, password and hostname here.
    username='YOURUSERNAME'
    password='YOURPASSWORD'
    # I added the dynname line below and also changed hostname so that it
    # updates all accounts but checks for something with my IP
    hostname='all.dnsomatic.com'
    dynname='YOURDYNNAME'
    #See https://www.dnsomatic.com/wiki/api for explanation of the
    # following parameter values and options
    wildcard='NOCHG'
    mx='NOCHG'
    backmx='NOCHG'

    ############################################
    ## DO NOT EDIT ANYTHING BEYOND THIS POINT ##
    ############################################

    print '\nDNS-O-Matic.com updater is running!!!\n'

    #Get your current dynamic IP
    lookup=gethostbyname(dynname)
    print 'DNS-O-Matic is set to', lookup

    #Get actual external IP.
    ip_external = urlopen('http://myip.dnsomatic.com')
    myip = ip_external.read()
    ip_external.close()
    print 'Your actual IP is' , myip

    #Compare those IPs
    if lookup == myip :
        print 'No change in DNS entry.'
    else:
        #change the DNS entry

        data = {}
        data['hostname'] = hostname
        data['myip'] = myip
        data['wildcard'] = wildcard
        data['mx'] = mx
        data['backmx'] = backmx

        url_values = urlencode(data)

        url = 'https://updates.dnsomatic.com:443/nic/update?' + url_values
        request = Request(url)

        base64string = encodestring(username + ':' + password)[:-1]
        request.add_header("Authorization", "Basic %s" % base64string)
        request.add_header('User-Agent',username + ' - Home User - 1.0')

        htmlFile = urlopen(request)
        htmlData = htmlFile.read()
        htmlFile.close()

        results = htmlData.split()
        if results[0] == 'good':
            print "DNS updated to " + results[1]
        else:
            print 'DNS update failed with error: ' + results[0]
```
