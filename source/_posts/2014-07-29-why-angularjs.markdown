---
layout: post
title: "Reasons to Use AngularJS for Web Applications"
date: 2014-07-29 16:05:35 -0600
comments: true
categories: angularjs 
tags:
  - angularjs
  - frontend development
  - mvc
  - frameworks
  - single page apps
  - javascript
---

<div class='center-align-wrapper'>
	<img src='/images/2014/07/AngularJS-logo.png' class='no-border'/>
</div>

First, a quick introduction... AngularJS is an open-source web application framework for creating single page web apps. It was created by Miško Hevery and Adam Abrons back in 2009 and it's now maintained by Google and community. 

AngularJS is built around the belief that declarative programming should be used for building user interfaces and wiring software components, while imperative programming is excellent for expressing business logic. The framework adapts and extends traditional HTML to better serve dynamic content through two-way data-binding that allows for the automatic synchronization of models and views. As a result, AngularJS de-emphasizes DOM manipulation and improves testability & performance.

AngularJS is winning the frontend framework war. There are other high quality alternatives out there, but few have gained so much developer support, they love developing with it. Even conservative companies now see Angular as an investment and they are paying for AngularJS trainings and tools. This graph of Google Search Trends shows the interest over time:

<div class='center-align-wrapper'>
	<script type="text/javascript" src="//www.google.com/trends/embed.js?hl=en-US&q=angularjs,+emberjs,+knockoutjs,+backbonejs&cmpt=q&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=500&h=330"></script>
</div>

## Concept:  

It is basically and extension to HTML. It is Google's vision of what of browser would be if it was built to render web applications instead of just html documents. It breaks the idea of html/css/js as things that should be handled separately and brings extensibility and modularity in the way of DSL and isolated pieces of html/js/css working together.

The Foundation is what they call the 3 Ds: Directives, Dependency Injection, Data Binding.

__Directives:__ At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element or even transform the DOM element and its children. [more](https://docs.angularjs.org/guide/directive)

__Dependecy Injection:__ Dependency Injection (DI) is a software design pattern that deals with how components get hold of their dependencies. The Angular injector subsystem is in charge of creating components, resolving their dependencies, and providing them to other components as requested. DI is a form of [Inversion of Control](http://martinfowler.com/bliki/InversionOfControl.html) characteristic of extensible frameworks. [more](https://docs.angularjs.org/guide/di)

__Data Binding:__ Data-binding in Angular apps is the automatic synchronization of data between the model and view components. The way that Angular implements data-binding lets you treat the model as the single-source-of-truth in your application. The view is a projection of the model at all times. When the model changes, the view reflects the change, and vice versa. This is a the power of two-way data binding. [more](https://docs.angularjs.org/guide/databinding) 

## So, why AngularJS?

__It Reduces Boilerplate required to built an app.__ You need to write fewer lines of code to get things done. Angular adds a middleware layer that get rids of a lot repetive tasks when dealing with the DOM.  

__Designer-Developer harmony__ through a descriptive UI using HTML. UI has to be declaritive and the app code imperative. Angular requires you to write declaritive markup resulting on much more readable code that is also more friendly to designers and new developers taking over the project. Angular allows you to extend HTML and create your own Domain Specific Language (DSL). Markup becomes self documented, it is a lot easier to understand what an element does and what model is working with without having to lookup on an external file for a reference to it.  

__The Separation of Concerns__:  MVC / MVW pattern on the front-end.   

__Testability:__ One on goals of Angular's design is to facilitate Testing. Unit testing front end code is usually hard because there are so many sticky dependencies. Angular's DI allows you to mock out many of these dependencies and isolate individual components. Besides the ease of unit testing with dependency injection, the Angular team created two very good, robust testing frameworks in Karma and Protractor.   

__Modularity:__ Angular's Module system helps builting apps with a UNIX-like philosophy, small reusable and chainable components that do one thing well, this structure allows you reuse code and make your application easier to maintain.  

__Development Speed__  

__Built-in filters:__ A filter formats the value of an expression for display to the user. They can be used in view templates, controllers or services and it is easy to define your own filter. [more](https://docs.angularjs.org/guide/filter)   

__Community:__ Angular has a vibrant and growing community. It's easy to find modules and components to plug on your project, collaborate and get help on github or through the IRC Channel. 

__Ecosystem:__  Tools, UI Components, Libraries, Tutorials... Some examples are:  

Tools:   
- [Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en) is a chrome plugin that lets you visualize your data bindings and debug your apps more easily. It extends the Developer Tools, adding tools for debugging and profiling AngularJS applications. The extension aims to allow easy detection of performance bottlenecks and offers a a GUI.  
- [WebStorm](http://www.jetbrains.com/webstorm/) is a great IDE with advanced AngularJS support.   
- [Yeoman](http://yeoman.io) helps you to scaffold, built and deploy Angular Apps.   
- [Karma](http://karma-runner.github.io/) and [Protractor](https://github.com/angular/protractor) Test Runners  
- [AngularFire](https://www.firebase.com/docs/web/bindings/angular/quickstart.html) an easy way to hook your Angular app up to a realtime backend. The combination of Angular and Firebase provides a three-way data binding between HTML, JavaScript, and your Firebase backend.   
- [Ionic](http://ionicframework.com/) is mobile web app framework that works on top of Angular. It offers a library of mobile-optimized HTML, CSS and JS components for building highly interactive apps. Built with Sass and optimized for AngularJS.  

Libraries:   
- [Breeze:](http://www.breezejs.com/documentation/breeze-angular-service) a rich set of tools that allow to manipulate data that comes from SQL and NoSQL databases.  
- [Firebase](http://firebase.com): Database in the Cloud that creates Angular specific bindings, SalesForce created a developers tools pack.  

UI Components: there many directives you can you use in the form of web components.   
- [Angular UI](http://angular-ui.github.io/) and Commercial versions like [Kendo UI](http://kendo-labs.github.io/angular-kendo/#/) and [Wijmo](http://wijmo.com/wijmo-officially-supports-angularjs/)  

Tutorials:  
- [egghead.io](http://egghead.io) is great series of small and focused screencasts that will help you getting started with Angular, for videos with a wider scope you can checkout [David Mosher's Youtube Channel](https://www.youtube.com/channel/UC8TXEl4mrSZ4BVOkOJdhXQA)  

__Templating System is HTML all the way through__  

__Template Cache and Routing.__ The community built the [UI Router](http://angular-ui.github.io/ui-router/site/) which is a great routing solution.  

__Integration with Existing Apps:__ Since Angular only starts evaluating the page at the end of the loading process (i.e. once HTML is in the DOM), it is very easy to sprinkle small bits of Angular "magic" on top of existing applications.

__Extensibility:__ Using Directives, Angular allows you to create custom elements and attributes that extend the standard HTML vocabulary. This allows you to create a library of your own reusable components. You can create your own Domain Specific Language (DSL) within HTML using Directives  

__Simplifies the Flow of the Data through Data Binding__  

__Animations:__ the Animations library. Check out http://www.nganimate.org/ and [Matias Niemela's blog](http://www.yearofmoo.com/2013/08/remastered-animation-in-angularjs-1-2.html) on Animations. 

__Angular is built and maintained by dedicated Google engineers.__   


&nbsp;   

###Comparisons with other javascript frameworks for building web apps

Angular vs Ember http://eviltrout.com/2013/06/15/ember-vs-angular.html

Angular vs React http://matthiasnehlsen.com/blog/2014/03/31/birdwatch-with-reactjs/   


