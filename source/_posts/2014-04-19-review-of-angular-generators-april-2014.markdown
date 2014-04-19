---
layout: post
title: "Review of Angular Generators – April 2014"
#date: 2014-04-19 17:03:35 -0500
comments: true
categories:
  - javasript
  - angular
  - software development
tags:
  - yeoman-generator
  - yeoman
  - angular
  - front-end
---

This is a quick review of the AngularJS generators as of April 19, 2014.

I’ll follow [cliffmeyers code organization categorization](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript) to describe them 

##generator-angular 
 
- Provides angularjs subgenerators for controllers, directives, filters, routes, services, providers, factories, values, constants, decorators and views
- It has a `--coffee` flag in case you prefer to use CoffeeScript
- By default, new scripts are added to the index.html file.
- Supports Bower Components
- Karma for Unit and E2E Tests
- Optional SASS and Compass
- Optional Bootstrap
- Sock Drawer code organization
- Grunt
- Live reload

Maintained by [Yeoman members](https://github.com/yeoman/generator-angular/graphs/contributors)

npm: https://www.npmjs.org/package/generator-angular

github: https://github.com/yeoman/generator-angular


##generator-angular-fullstack 

-	Express server integrated with grunt tasks
-	Live reload of client and server files
-	Support for Jade and CoffeeScript
-	Easy deployment workflow. OpenShift, Heroku, custom
-	Optional MongoDB integration
-	Optional Passport integration for adding user accounts
-	Provides angularjs subgenerators for controllers, directives, filters, routes, services, providers, factories, values, constants, decorators and views
-	Fullstack subgenerator for deployment
-	By default, new scripts are added to the index.html file.
-	Supports bower components
-	Sock Drawer code organization

Maintained by [daftmonk]()

npm: https://www.npmjs.org/package/generator-angular-fullstack

github: 

##generator-cg-angular 

- Provides angularjs subgenerators for directives, partials, service, filters and modules
- Supports grunt 
- Supports gulp
- Supports Bower components
- Less
- In v3.0, all subgenerators for partials, services, directives, and filters, allow the user to specify where to save the new files. Thus you can create your own directory structure. Sock Drawer code organization by default

Maintained by [cgross]()

npm: https://www.npmjs.org/package/generator-cg-angular

github: 


##generator-boom  

- Uses Gulp instead of Grunt
- Live Reload pre-configured
- BrowserSync pre-configured
- Development and Production code are separated
- AngularUI included (optional)
- JSHint pre-configured
- Protractor (E2E tests) pre-configured
- FontFace - Add @fontface on fly
- Constants and Values will be added in main.js (No new file will be created)
- Adding Routes will also create and link the css and controller in their respective folders.
- Provides angularjs subgenerators for controllers, directives, filters, routes, services, providers, factories, values, constants, decorators and views 
- Subgenerators for fonts, styles and views and tests
- Use gulp buildfor dev mode and gulp build:prod for production.
- Share code with client using command gulp zip (Will create the .zip file of build folder)
- Sock Drawer code organization by default

Maintained by [cse.aamir]()

npm: https://www.npmjs.org/package/generator-boom

github: 


## generator-meanjs
 
-	Subgenerators for Angular and Express: crud-module, angular-module, angular-route, angular-controller, angular-view, angular-service, angular-directive, angular-filter, angular-config, angular-test, express-model, express-controller, express-route, express-test
-	Grunt
-	Modular Code Organization
-	Plain CSS
-	Bower Components
-	LiveReload

Maintained by [amoshaviv]()

npm: https://www.npmjs.org/package/generator-meanjs

github: 


##generator-hyper-angular

- Optional UI Router
- Prompts for host and port
- Github user and License prompt 
- Bower Components
- Sock Drawer code organization
- Grunt

maintained by [jprystowsky]()
npm: https://www.npmjs.org/package/generator-hyper-angular
github: https://github.com/thardy/generator-ngbp 


##slush-angular


- appName prompt
- Supports Stylus, Less, Sass
- Gulp
- Live Reload
- Bower 
- Unit test with Karma

maintained by:  joakimbeng
npm : https://www.npmjs.org/package/slush-angular 
github: https://github.com/klei/slush-angular


## generator-ngbp

-	Grunt
-	Modular Code Organization
-	only one subgenerator at the moment ngbp:module
-	Unit Tests with karma
-	Less
-	Bower Components
-	LiveReload

maintained by:  
npm : 
github: 

For more AngularJS generators go to @substack’s npmsearch.com and “type angular & yeoman-generator” or [click here]( http://npmsearch.com/?q=angular%20&%20yeoman-generator)

I’ll revisit this post later with more detailed info, if you want to collaborate with me just PR to my blog’s repo :).  
