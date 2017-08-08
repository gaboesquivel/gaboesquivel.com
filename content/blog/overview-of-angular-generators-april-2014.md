---
title: "Overview of Angular Generators – April 2014"
subtitle: "A quick walkthrough and comparison"
description: This is a short and opinionated review of the AngularJS generators on npm as of April 19th, 2014.
date: 2014-04-19
cover: /images/2014/04/angular-logo.png
categories:
  - javascript
  - angularjs
  - software development
  - front-end
tags:
  - yeoman-generator
  - yeoman
  - angular
  - front-end
  - slush
  - angular generator
---

This is a short and opinionated review of the AngularJS generators on npm as of April 19th, 2014.

There are a lot of generators on npm and it's a little hard to decide which one to use or fork, since we don't want to reinvent the wheel. Currently the only way to compare them is to try them one by one and that's a very time consuming task. In this post I'll try to give you an overview of some generators I've explored recently hoping it will save you some time. I’ll follow [Cliff Meyer's Code Organization Categorization](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript) to describe their code structure.

Most generators still use the "Sock Drawer" directory organization, an approach that I personally avoid, it doesn't scale well but it works for small projects. I prefer a modular structure as suggested on latest [Google's Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub).

Some of the benefits of modularization are:

__Encapsulation:__ Code, styles and tests related to specific feature will be contained on the same directory.   
__Context:__  Code lives in given context by feature. This is specially important to developers new to the application, who will find it easier to connect the dots.   
__Code Reusabilty:__ You would be able to reuse modules across projects and clients, Eg mobile and web-client could share autentication modules or resources ( models ).

Here's a list of Angular generators and their characteristics (some of them are fullstack generators):
<!--more-->

##generator-angular v0.8.0

The angular generator maintained by the yeoman members. It generates all the boilerplate you need to get started and has subgenerators to scaffold the different angular object types. The app generator also optionally installs Bootstrap and additional AngularJS modules.

- __build system__: grunt   
- __code organization__: sock drawer   
- __subgenerators__: angular controllers, directives, filters, routes, services, providers, factories, values, constants, decorators and views. `--coffee` flag in case you prefer to use CoffeeScript    
- __dependency mgr__: bower  
- __testing__: karma for unit and E2E tests  
- __css preprocessors__: optional sass with compass  
- __deployment__:  false
- __optimization__: true  
- __continuous integration__: travis  
- __live reload__: true
- __source_maps__: false
- __modules__: optional angular-resource, angular-cookies, angular-sanitize, angular-route. not optional angular-mocks,angular-scenario   
- __code linting__: jshint src and tests
- __goodies__: autoprefixer, editorconfig, cache buster       
- optional Twitter Bootstrap
- by default, new scripts are added to the index.html file. optional `--skip-add`
- automatically runs `npm install` and `bower install`
- static node server

maintained by [Yeoman Members](https://github.com/yeoman/generator-angular/graphs/contributors)   
npm: https://www.npmjs.org/package/generator-angular   
github: https://github.com/yeoman/generator-angular   


##generator-angular-fullstack v1.4.2

Yeoman generator for creating MEAN stack applications: MongoDB, Express, AngularJS, and Node. It is based on generator-angular,it also has subgenerators to scaffold the different angular object types and it optionally installs Bootstrap, additional AngularJS modules and MongoDB integration with Mongoose.

- __build system__: grunt
- __code organization__: sock drawer   
- __subgenerators__: angularjs subgenerators for controllers, directives, filters, routes, services, providers, factories, values, constants, decorators and views. And a fullstack subgenerator for deployment.   
- __dependency mgr__:  bower
- __testing__:  karma for unit and E2E tests  
- __css preprocessors__: optional sass with compass
- __deployment__:   easy deployment workflow. OpenShift, Heroku, custom
- __optimization__: true
- __continuous integration__:   travis   
- __live reload__: client and server files
- __source_maps__: false
- __modules__: optional angular-resource, angular-cookies, angular-sanitize, angular-route. not optional angular-mocks, angular-scenario   
- __code linting__: jshint src and tests    
- __goodies__: autoprefixer, cdnify
- optional Twitter Bootstrap
- optional MongoDB integration with Mongoose
- support for Jade and CoffeeScript
- optional Passport integration for adding user accounts
- express server integrated with grunt tasks
- autorun `npm install` and `bower install`
- by default, new scripts are added to the index.html file. optional --skip-add

maintained by [daftmonk](https://github.com/DaftMonk)   
npm: https://www.npmjs.org/package/generator-angular-fullstack     
github: https://github.com/DaftMonk/generator-angular-fullstack


##generator-cg-angular v3.0.3

A generator for large applications. Organize code however the developer wishes. All subgenerators prompt the user for the directory to place the created files. Fully supports Angular's Best Practice Guidelines for app structure.

- __build system__: supports grunt and gulp   
- __code organization__: In v3.0, all subgenerators for partials, services, directives, and filters, allow the user to specify where to save the new files, thus you can create your own directory structure (including nesting) as you desire.
- __subgenerators__: angularjs subgenerators for directives, partials, service, filters and modules   
- __dependency mgr__:  bower   
- __testing__:  grunt-contrib-jasmine, Headless testing with Jasmine, PhantomJS   
- __css preprocessors__: Less
- __deployment__: false   
- __optimization__: true  
- __continuous integration__: false   
- __live reload__: true
- __source_maps__: false
- __modules__: optional ui-router. not optional angular-animate, angular-resource, angular-cookies, angular-mocks, angular-ui-utils, angular-bootstrap    
- __code linting__: jshint src and tests
- __goodies__: editorconfig
- appName prompt
- autorun `npm install` and `bower install`

maintained by [cgross](https://github.com/cgross)   
npm: https://www.npmjs.org/package/generator-cg-angular      
github:  https://github.com/cgross/generator-cg-angular    


##generator-boom v0.1.8

Boom uses Gulp instead of Grunt, Protractor (E2E tests) and BrowserSync is pre-configured. Good Stuff!

- __build system__: gulp   
- __code organization__: Sock Drawer code organization by default  
- __subgenerators__: angularjs subgenerators for controllers, directives, filters, routes, services, providers, factories, values, constants, decorators and views. Constants and Values will be added in main.js (No new file will be created). Adding Routes will also create and link the css and controller in their respective folders. Subgenerators for fonts, styles and views and tests.   
- __dependency mgr__: bower  
- __testing__:  Protractor (E2E tests) pre-configured
- __css preprocessors__: sass
- __deployment__:   false
- __optimization__:  true
- __continuous integration__: false  
- __live reload__: true
- __source_maps__: false
- __modules__: optional angular-resource, angular-cookies, angular-sanitize, angular-route, angular-animate, angular-ui(ui-utils, bootstrap, ui-router, ng-grid)
- __code linting__: jshint src and tests
- __goodies__: editorconfig, browsersync pre-configured
- development and production code are separated
- optional jquery or zepto
- optional modernizr
- FontFace - Add @fontface on fly
- Share code with client using command gulp zip (Will create the .zip file of build folder)
- static node server
- autorun `npm install` and `bower install`

maintained by [aamirshah](https://github.com/aamirshah)   
npm: https://www.npmjs.org/package/generator-boom   
github: https://github.com/aamirshah/generator-boom


##generator-meanjs v0.0.8

MEAN.JS is a full-stack JavaScript solution, which provides a solid starting point for MongoDB, Node.js, Express, and AngularJS based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.

- __build system__: grunt    
- __code organization__: modular
- __subgenerators__: Subgenerators for Angular and Express: crud-module, angular-module, angular-route, angular-controller, angular-view, angular-service, angular-directive, angular-filter, angular-config, angular-test, express-model, express-controller, express-route, express-test
- __dependency mgr__: bower  
- __testing__:  unit tests with karma
- __css preprocessors__: false
- __deployment__: false
- __optimization__: false   
- __continuous integration__: travis   
- __live reload__: true   
- __source_maps__: false
- __modules__: optional angular-resource, angular-cookies, angular-sanitize, angular-route, angular-touch, article crud. not optional angular-mocks   
- __code linting__: jshint src and tests
- __goodies__: procfile
- appName, description and author prompts
- autorun `npm install` and `bower install`

maintained by [amoshaviv](https://github.com/amoshaviv)    
npm: https://www.npmjs.org/package/generator-meanjs    
github: https://github.com/meanjs/generator-meanjs    

Here's the explanation about Mean.js and Mean.io - http://tmblr.co/Z7XDmo17TG_o4  


##generator-hyper-angular v0.1.6

HyperAngular (generator-hyper-angular) is a Yeoman generator for AngularJS/Express/node.js apps emphasizing modularity, configuration, and testing. It's designed to provide plenty of tooling to help you code expressively at all scales, while putting up railings to keep your code consistent and clean. It stamps out a simple application that tests itself and self-documents the structure of the generated template

- __build system__:  grunt    
- __code organization__: sock drawer   
- __subgenerators__: false
- __dependency mgr__: bower  
- __testing__:  unit test with karma and e2e with protractor  
- __css preprocessors__: less
- __deployment__: false  
- __optimization__: true   
- __continuous integration__:  travis
- __live reload__: true
- __source_maps__: false
- __modules__: optional angular-ui-router. not optional angular-resource, angular-mocks   
- __code linting__: jshint src and tests
- __goodies__:
- appName prompt
- prompts for protocol, host and port
- prompt for Github user and License  
- autorun `npm install` and `bower install`

maintained by [jprystowsky](https://github.com/jprystowsky)    
npm: https://www.npmjs.org/package/generator-hyper-angular   
github: https://github.com/jprystowsky/generator-hyper-angular   


##slush-angular v0.3.0

A slush generator for AngularJS using the Google Angular App Structure Recommendations.
This is not a yeoman generator, it is built with [slush](https://github.com/klei/slush) a gulp based alternative to yeoman. You can choose between LESS, Stylus, and Sass to use as the CSS Preprocessor.

- __build system__: gulp   
- __code organization__: modular   
- __subgenerators__: false
- __dependency mgr__: bower   
- __testing__: unit tests with karma  
- __css preprocessors__: Stylus, Less, Sass
- __deployment__:  false   
- __optimization__: true   
- __continuous integration__: false  
- __live reload__: true
- __source_maps__: false  
- __modules__: not optional angular-route, angular-route
- __code linting__: jshint src and tests
- __goodies__: optional todoList example, csslint, editorconfig, lazypipe  
- appName prompt
- autorun `npm install` and `bower install`

maintained by:  [joakimbeng](https://github.com/joakimbeng)   
npm : https://www.npmjs.org/package/slush-angular    
github: https://github.com/klei/slush-angular  


##generator-ngbp v0.0.5

Yeoman generator based on the [ngBoilerplate kickstarter](https://github.com/ngbp/ngbp), a best-practice boilerplate for scalable Angular projects built on a highly modular, folder-by-feature structure.

- __build system__: grunt    
- __code organization__: modular  
- __subgenerators__: only one subgenerator at the moment ngbp:module  
- __dependency mgr__: bower  
- __testing__: unit tests with karma  
- __css preprocessors__: Less
- __deployment__: false  
- __optimization__: true   
- __continuous integration__: false   
- __live reload__: true
- __source_maps__:  false  
- __modules__: optional angular-resource. not optional angular-ui-router, angular-bootstrap, angular-mocks
- __code linting__: jshint src and tests
- __goodies__: autoprefixer, editorconfig, cache buster
- appName prompt
- prompt for copyright in html
- coffeeScript support

maintained by:  [thardy](https://github.com/thardy/generator-ngbp)   
npm : https://www.npmjs.org/package/generator-ngbp   
github: https://github.com/thardy/generator-ngbp   


##generator-gulp-ng v1.0.1

This is a yeoman generator for an angularjs project that follows the Best Practice Recommendations for Angular App Structure. It takes advantage of the gulp build tool and makes use of bower and npm for dependency management.

- __build system__: gulp    
- __code organization__: modular  *follows google's best practices document
- __subgenerators__: no subgenerators  
- __dependency mgr__: bower  
- __testing__: unit tests with karma  
- __css preprocessors__: false
- __deployment__: false  
- __optimization__: true   
- __continuous integration__: false   
- __live reload__: true
- __source_maps__:  false  
- __modules__: not optional angular-route
- __code linting__: jshint src and tests
- __goodies__: template cache

maintained by:  [henyojess](https://github.com/henyojess)   
npm : https://www.npmjs.org/package/generator-gulp-ng   
github: https://github.com/henyojess/generator-gulp-ng


##generator-klei v0.4.3

A Yeoman generator for generating module or app boilerplates! MEAN-stack (all parts optional) with scalability in mind and with Grunt and Bower sweetness.

- __build system__: grunt    
- __code organization__: modular
- __subgenerators__: klei:api   
- __dependency mgr__: bower  
- __testing__: unit tests with karma  
- __css preprocessors__: stylus
- __deployment__: false  
- __optimization__: true   
- __continuous integration__: false   
- __live reload__: true
- __source_maps__:  false  
- __modules__: not optional angular-route, angular-mocks, restangular
- __code linting__: jshint src and tests
- __goodies__: optional todo list example, editorconfig, csslint, template cache
- appName prompt
- optional REST API scaffolding with Express
- optional MongoDB with Mongoose
- autorun `npm install` and `bower install`


maintained by: [joakimbeng](https://github.com/joakimbeng)   
npm : https://www.npmjs.org/package/generator-klei    
github: https://github.com/klei-dev/generator-klei



For more AngularJS generators go to @substack’s npmsearch.com and “type angular & yeoman-generator” or [click here]( http://npmsearch.com/?q=angular%20&%20yeoman-generator).    
There's also [Yeoman Community Generators Search](http://yeoman.io/community-generators.html)

Happy Forking! You may also want to [create your own yeoman generator](http://code.tutsplus.com/tutorials/build-your-own-yeoman-generator--cms-20040)

I published this repo https://github.com/gaboesquivel/angular-generators to hold this information until we have a better way to search and filter generators. If you'd like update information of one of the generators listed or add a new one go ahead and PR.  

Please leave your comments. :)
