---
layout: post
title: "On Continuous Delivery"
date: 2015-07-10 14:15:13 -0600
comments: true
cover: /images/2015/07/continuous-delivery.png
description: Continuous delivery is practice in software development in which development teams work in a way that allows companies to update their systems at any point in time or continuously through automated processes, the system’s code base is always deployable and tested.
categories: 
- continuous delivery
- continuous integration
- software development
- devOps
---

Continuous delivery is practice in software development in which development teams work in a way that allows companies to update their systems at any point in time or continuously through automated processes, the system’s code base is always deployable and tested.

##Why is it important?

Continuous delivery is a more efficient way to build software as it enables a team to get constant feedback on the application’s changes and updates, allowing you detect problems early and consequently reducing costs and deployment frictions. It also gives the team a realistic view of development progress instead of relying on perceptions.  

It gives a company the ability to react quickly and respond to change. Having fluid a process of software development allows you to make changes on your strategy more easily and rapidly. 

##Continuous Integration and Automated Development Operations

In order achieve continuous delivery you need high automation of the delivery process and the developers have to continuously integrate their code, at least once a day. Successful integration is determined by an integration server that builds the system and runs the test suite every time new code is added, if tests failed the dev team receives a notification, this allows the team to fix the problem as soon as it appears.  

### Team Commitment and Development Workflow

Continuous integration is not only about automated testing but an organizational process. To successfully integrate code continuously a development team must commit to follow best practices of continuous integration. At [Cortical Touch](http://corticaltouch.com) our process relies on the following principles and practices: 

- Master branch should always be deployable, we treat the master branch as a read-only. All commits to master are automatically deployed to a staging server if automated tests pass on the CI server ( usually codeship ).
- Once tested by a human and approved, we manually deploy to production server.
- Use feature toggles to turn on and off new features
- Continuous integration on develop branch ( we use a simplified multistage git flow)
- Over Communicate: communication plays a primary role in continuous integration 
- Check in frequently
- Don’t check in broken code
- Don’t check in untested code
- Don’t check in when the build is broken
- Always verify the system builds after check in





