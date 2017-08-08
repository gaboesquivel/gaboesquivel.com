---
title: "Automatic Node.js Version Switching"
subtitle: How to automatically switch to right node version
date: 2015-07-18
cover: /images/2015/07/nodejs.png
description: When working on multiple Node.js projects it is important to configure your development environment to automatically switch to right node version for a particular project.
categories:
- nodejs
---


When working on multiple Node.js projects it is important to configure your development environment to automatically switch to right node version for a particular project. You can automate this task on many different ways. I opted for using using a module called [avn](https://github.com/wbyoung/avn) that works both with [nvm](https://github.com/creationix/nvm) and [n](https://github.com/visionmedia/n) for automatic Node.js version switching. In my case I use nvm as my version manager. In order to achieve automatic version switching with avn you need to add a `.node-version` at the root of your projects specifying the node version required.

After installing avn, when you cd into a directory with a `.node-version` file, avn will automatically detect the change and use your installed version manager to switch to that version of node. If that node version is not available you have install it, avn won't try to do so, it will only attempt to switch to that version and notify you if it is not available on your environment.

It is important to mention that as good practice you should always specify that node version on the package.json file on the [engines attribute](https://docs.npmjs.com/files/package.json#engines) `"engines" : { "node" : "0.12.7" } }`

_UPDATE: March 25, 2016_  
Kikobeats just released [nodengine](https://github.com/Kikobeats/nodengine) which does exactly the same but it reads from the engines field in the package.json
