---
layout: post
title: "Overview of Angular Generators – April 2014"
#date: 2014-04-19 17:03:35 -0500
comments: true
categories:
  - javasript
  - angular
  - software development
  - front-end
tags:
  - yeoman-generator
  - yeoman
  - angular
  - front-end
---

This is a short and opinionated review of the AngularJS yeoman generators on npm as of April 19, 2014.

There are a lot of yeoman generators on npm and it's a little hard to decide which one to use or fork, since we don't want to reinvent the wheel. Currently the only way is to compare them is to try them one by one and that's a very time consuming task. In this post I'll try to give you an overview of some of the generators I've explore recently hoping it will save you some time. I’ll follow [Cliff Meyer's Code Organization Categorization](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript) to describe them.

Most generators still use the "Sock Drawer" directory organization, an approach that I personally avoid. I prefer a modular structure that enfor as suggested on latest [Google's Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub). 

Some of the benefits of modularization are:

__Encapsulation:__ Code, styles and tests related to specific feauture will be contained on the same directory.   
__Context:__  Code lives in given context by feature. This is especially important to developers new to the application, who will find it easier to connect the dots.   
__Code Reusabilty:__ You would be able to reuse modules across projects and clients, Eg mobile and web-client could share autentication modules or resources ( models ).

Here's a list of some Angular generators and their characteristics:


##generator-angular 

- __build system__: grunt   
- __code organization__: sock drawer   
- __subgenerators__: angular controllers, directives, filters, routes, services, providers, factories, values, constants, decorators and views. `--coffee` flag in case you prefer to use CoffeeScript    
- __dependency mgr__: bower  
- __testing__: karma for unit and E2E tests  
- __css preprocessors__: optional sass and compass  
- __deployment__:  false 
- __optimization__: true  
- __continuous integration__: travis  
- __live reload__: true   
- optional Twitter Bootstrap
- by default, new scripts are added to the index.html file. optional --skip-add


maintained by [Yeoman Team](https://github.com/yeoman/generator-angular/graphs/contributors)   
npm: https://www.npmjs.org/package/generator-angular   
github: https://github.com/yeoman/generator-angular   


##generator-angular-fullstack 

- __build system__: grunt
- __code organization__: sock drawer   
- __subgenerators__: angularjs subgenerators for controllers, directives, filters, routes, services, providers, factories, values, constants, decorators and views. And a fullstack subgenerator for deployment.   
- __dependency mgr__:  bower 
- __testing__:  karma for unit and E2E tests  
- __css preprocessors__: 
- __deployment__:   easy deployment workflow. OpenShift, Heroku, custom
- __optimization__: true
- __continuous integration__:   travis   
- __live reload__: client and server files   
- __goodies_: autoprefixer, cdnify
- Optional MongoDB integration
- Support for Jade and CoffeeScript
- Optional Passport integration for adding user accounts
- Passport boilerplate
- by default, new scripts are added to the index.html file. optional --skip-add


maintained by [daftmonk](https://github.com/DaftMonk)   
npm: https://www.npmjs.org/package/generator-angular-fullstack
github: https://github.com/DaftMonk/generator-angular-fullstack


##generator-cg-angular 

- __build system__: supports grunt and gulp   
- __code organization__: In v3.0, all subgenerators for partials, services, directives, and filters, allow the user to specify where to save the new files. Thus you can create your own directory structure. Sock Drawer code organization by default.   
- __subgenerators__: angularjs subgenerators for directives, partials, service, filters and modules   
- __dependency mgr__:  bower   
- __testing__:  grunt-contrib-jasmine, Headless testing with Jasmine, PhantomJS   
- __css preprocessors__: Less
- __deployment__: false   
- __optimization__: true  
- __continuous integration__: false   
- __live reload__: true 
- __source_maps__: ?

maintained by [cgross](https://github.com/cgross)   
npm: https://www.npmjs.org/package/generator-cg-angular      
github:  https://github.com/cgross/generator-cg-angular    


##generator-boom  

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
- __source_maps__: ?  
- BrowserSync pre-configured
- Development and Production code are separated
- AngularUI included (optional)
- JSHint pre-configured
- FontFace - Add @fontface on fly
- Share code with client using command gulp zip (Will create the .zip file of build folder)

Maintained by [cse.aamir](https://github.com/aamirshah)   
npm: https://www.npmjs.org/package/generator-boom   
github: https://github.com/aamirshah/generator-boom


## generator-meanjs
 
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

maintained by [amoshaviv](https://github.com/amoshaviv)    
npm: https://www.npmjs.org/package/generator-meanjs    
github: https://github.com/meanjs/generator-meanjs    

Here's the explanation about Mean.js and Mean.io - http://tmblr.co/Z7XDmo17TG_o4  


##generator-hyper-angular

- __build system__:  grunt    
- __code organization__: sock drawer   
- __subgenerators__: 
- __dependency mgr__: bower  
- __testing__:  unit test with karma and e2e with protractor  
- __css preprocessors__: less
- __deployment__: false  
- __optimization__: true   
- __continuous integration__:  travis 
- __live reload__: true 
- __source_maps__: false   
- optional UI Router
- prompts for host and port
- prompt for Github user and License  

maintained by [jprystowsky](https://github.com/jprystowsky)    
npm: https://www.npmjs.org/package/generator-hyper-angular   
github: https://github.com/jprystowsky/generator-hyper-angular   


##slush-angular

- __build system__: gulp   
- __code organization__: modular   
- __subgenerators__: false
- __dependency mgr__: bower   
- __testing__: unit tests with karma  
- __css preprocessors__: Stylus, Less, Sass
- __deployment__:  false   
- __optimization__: true   
- __continuous integration__:   
- __live reload__: true 
- __source_maps__:  ?  
- appName prompt

maintained by:  [joakimbeng](https://github.com/joakimbeng)   
npm : https://www.npmjs.org/package/slush-angular    
github: https://github.com/klei/slush-angular  

This is not an Yeoman Generator, it based on slush

## generator-ngbp

- __build system__: grunt    
- __code organization__: modular  
- __subgenerators__: only one subgenerator at the moment ngbp:module  
- __dependency mgr__: bower  
- __testing__: Unit Tests with karma  
- __css preprocessors__: Less
- __deployment__: false  
- __optimization__: true   
- __continuous integration__:   
- __live reload__: true 
- __source_maps__:  ?  


maintained by:  [thardy](https://github.com/thardy/generator-ngbp)   
npm : https://www.npmjs.org/package/generator-ngbp   
github: https://github.com/thardy/generator-ngbp   



For more AngularJS generators go to @substack’s npmsearch.com and “type angular & yeoman-generator” or [click here]( http://npmsearch.com/?q=angular%20&%20yeoman-generator). There's also [Yeoman Community Generators Search](http://yeoman.io/community-generators.html)


I also created this repo https://github.com/gaboesquivel/angular-generators to hold this information until we have a better way to search and filter generators. If you'd like update information of one of the generators listed or add a new one go ahead and PR.  

Please leave your comments. :)
