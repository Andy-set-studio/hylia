---
title: 'Progression update: From pilot to alpha'
date: '2018-12-03'
tags:
  - update
  - team
feature_image: '/images/onfido1.jpg'
author: Jonny
---
It’s now been about five months since the inception of Make and Grow (first with the launch of progression.fyi, then Progression Pack). My mission, to (a) codify and measure the maker skillset, enabling better careers for those building software across the world and (b) build a sustainable, grown-up business that I really enjoy working for, is now out of the honeymoon period. Revenue is ramping up, and work is really beginning in earnest.

In these short months, I’ve built a lot, learned a lot, and am now excited to move onto the next stage of product development (and the company’s evolution) by opening up the official Progression alpha program.

The last three months have seen pilot customers of the static Progression Pack product go through team structure organising, team workshops, design assessments (sometimes several times), level and expectation adjustment and ultimately more clarity over the skills in their teams.

I’m hugely excited by and proud of the progress to this point, and hearing from early users has in part validated that there’s a problem here, and that it’s valuable to solve.

![Pilot teams going through assessment and levelling workshops as part of the two month program.](/images/onfido1.jpg "Pilot teams going through assessment and levelling workshops as part of the two month program.")

However, it’s also been a time of huge (and often painful) learning about where Progression Pack falls short, and what needs to exist to truly solve these problems for designers, design teams and ultimately all makers in tech.

Many of these problems are through poor design or understanding of team dynamics (my bad) but a whole load are also unavoidable technical obstacles, brought on by the fact that v0.1 is self hosted and single purchase.

<hr>

I’ll take a separate post to elucidate my early product learnings, but here are a few of the technical limitations of Progression Pack, which I knew about but have reared their collective heads earlier than planned.

Customers have to self-host, which requires signing up to three third-party platforms (Github, Airtable and Netlify). All excellent services, but the overhead of managing the spider's web of interconnected data and dependencies makes it very hard to bug-fix and crazy complicated to get going.
- All the data lives in Airtable. This has been an incredible way to test the product, but as each customer has their own clone of the Airtable base, there are almost unlimited opportunities to break the product with anything from empty rows to changing column names. Some of this brittleness I could undoubtedly design out, but some more guardrails would be ideal.
- Related: every time I want to update content, I have to do it individually for every customer. Not only is this labour intensive and completely unscalable, but the possibility for human copy-paste error is large, and I get no version history which means the ground would have to change under people’s feet. Not good.
Zero auth out of the box. It’s not difficult to implement auth on top of the platform, but it feels like table stakes to be able to securely sign people in.
- I can’t charge anything other than upfront. As I’m giving the content away on day 1, a monthly plan makes no sense — after all, you could cancel on day 2 and still have everything. I also can’t easily scale billing as teams scale (Facebook could pay the same as a 3-designer startup). Most importantly, I can’t offer a free trial period, which I’ve realised is essential when introducing a new SaaS product category to market.
- It’s hard for me to automate transactional events (emails, push, slack messages etc.) — a bit of a no brainer for a product like mine.
- I can’t open the platform up to individual designers. This is a big goal of mine, and for several reasons, it would make no sense to introduce a second product as it stands.
There are actually many more reasons than this, but you get the point.

![A team going through one of the early workshops](/images/octopus1.jpg "A team going through one of the early workshops")

### So, what am I doing about it?

**Clearly, Progression Pack needs a complete rethink.**

So I’ve decided to bite the bullet and am currently building the next version of the product. It won’t have everything, but I’m hoping to have a basic product available in the next month or so, and after getting my first few customers onboard, I’ll be drip-feeding the alpha waiting list onto the product for more feedback.

I’m also dropping the word ‘pack’ — Progression is a better name for a tool that can grow as your team does. _(I’ve been playing with a few other names, but I figured this is the easiest change to make, and I have a tendency to boil the ocean and buy most of the domains on the internet when in this mode, so I’m forcing a choice.)_

![Some early UIs for the progression app](/images/prog-ad-1.png "Some early UIs for the progression app")

So, if you’re currently trying to scale a design team with nothing that answers ‘what does ‘good’ look like?’, do sign up on progressionapp.com. I can’t wait to hear more, and show you what I’m working on.
