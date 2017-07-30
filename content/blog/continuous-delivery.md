---
title: "On Continuous Delivery"
subtitle: A more efficient way to build and operate software services
date: 2015-07-10 14:15:13 -0600
cover: /images/2015/07/continuous-delivery.png
description: Continuous delivery is practice in software development in which development teams work in a way that allows companies to update their systems at any point in time or continuously through automated processes, the system’s code base is always deployable and tested.
categories:
- continuous delivery
- continuous integration
- software development
- devOps
---

Continuous delivery is practice in software development in which development teams work in a way that allows companies to update their systems at any point in time or continuously through automated processes, the system’s code base is always deployable and tested.

## Why is it important?

Continuous delivery is a more efficient way to build software as it enables a team to get constant feedback on the application’s changes and updates, allowing you detect problems early and consequently improve quality, reduce costs and deployment frictions. This constant feedback also gives the team a realistic view of development progress instead of relying on perceptions.

Continuous Delivery gives a company the ability to react quickly and respond to change. Having fluid a process of software development allows you to make changes on your strategy more easily and rapidly.
<!--more-->

It allows a company to increase its capacity and scale more easily. A continuous process facilitates working with bigger development teams. Batch processes like iteration planning, release planning, and release testing become exponentially harder to organize as you involve an increasing number of people. Continuous delivery solves this problem by skipping batch processes.

## Basic Principles

- __Visibility__ – All aspects of the delivery system including building, deploying testing, and releasing are visible to every member of the team to promote collaboration.
- __Feedback__ – Team members learn of problem ASAP when they occur so that they are able to fix them as quickly as possible.
- __Continually Deploy__ – Through a fully automated process, you can deploy and release any version of the software to any environment.

## Automation is the Foundation of Continuous Delivery

In order achieve continuous delivery you need high automation of the delivery process. After a developer commits, everything should be completely automated, including reports, metrics, release notes, etc.

## Continuous Integration

In order to deliver continuously you also need to do Continuous Integration. That means developers have to continuously integrate their code, at least once a day. Successful integration is determined by an integration server that builds the system and runs the test suite every time new code is added, if tests failed the dev team receives a notification, this allows the team to fix the problem as soon as it appears.

### Integration Strategies
Numerous different integration models are possible and they are tight to the version control strategy. Andy Singleton, proposed a [four pattern categorization](continuousagile.com/unblock/cd_four_patterns.html) in his book Unblock:

#### Centralized
The centralized pattern is the traditional pattern popularized by Jez Humble. You put all of your changes together into one central code version, and continuously run automated tests on them. The goal is to integrate as early as possible, find problems as early as possible, and train your team to avoid them. It is easy to set up, and scales to support complex centralized build and test systems.

#### Distributed
The distributed pattern is used by many SaaS companies that want to release every change. Each change is tested in a separate branch, and then released before it hits problems from integration with other changes.

#### Review branch
The review branch system allows you to produce more reliable code from bigger teams, by testing and reviewing each change before it goes into a centralized shared version. This is a best practice.

#### MAXOS
The MAXOS pattern organizes continuous delivery of complex systems, which are built from multiple servers and services that communicate with each other. The team maintaining one service builds and releases changes, often using a review branch system. Before a service is promoted into production, it gets tested in a centralized continuous integration system to make sure that it works with the pre-release version of all of the other services.

### Team Commitment and Development Workflow

Continuous integration is not only about automated testing but an organizational process. To successfully integrate code continuously a development team must commit to follow best practices of continuous integration and take more responsibility for delivering release-ready code and features.

- Master branch should always be deployable.
- Keep it fast: measure automatically and continuously improve it.
- Use feature toggles to turn on and off new features. aka feature switches.
- Over Communicate: communication plays a primary role in continuous integration.
- Check in frequently.
- Don’t check in broken code.
- Don’t check in untested code.
- Always verify the system builds after check in.
