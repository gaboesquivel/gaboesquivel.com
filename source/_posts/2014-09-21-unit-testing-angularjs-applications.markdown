---
layout: post
title: "Unit Testing AngularJS Applications"
date: 2014-09-21 07:00:26 -0600
comments: true
cover: /images/2014/09/bug-software.png
categories: 
  - software testing
  - angularjs
  - javascript
tags:
  - angularjs
  - web applications
  - javascript
  - testing
  - karma
  - mocha
  - jasmine
---


Unit testing works by isolating small "units" of code so that it can be tested with the objective of ensuring that each unit works as intented. If you are not familiar with the concept, [introduction to unit testing](/blog/2014/introduction-to-unit-testing) will help you understand the concept, why you should do it and its benefits. In short tests reduce bugs, provide accurate documentation and improve design. In this article I'll describe to unit test angularjs applications. AngularJS helps you build testable applications.


## Karma Test Runner, Testing Frameworks and Libraries

__Karma__ is the tool that executes the tests in browsers, a test runner built by the AngularJS team. While originally built specifically for AngularJS, it is now usable with pretty much any framework. It takes care of starting browsers, running the tests and reporting the results. Every browser we care about is supported and it integrates with most libraries and CI environments. Karma works by spawning up each browser that is specified within its configuration file and then running JavaScript code against those browsers to see if they pass certain tests.
Communication between Karma and each of the browsers is handled with the karma service running in the terminal using socket.io. Each time a test is run, Karma records its status and then tallies up which browsers have failed for each test and which ones passed and timed out. This makes each test work 100% natively in each browser without the need to test individually. Also, since the Karma service runs on a port and keeps track of browsers by itself, you can easily hook up other browsers and devices to it just by visiting its broadcasting port.

__Jasmine__ and __Mocha__ are the most popular testing frameworks used in Angular applications. Jasmine uses a Behaviour-driven Development (BDD) style, whilst Mocha allows you to choose a style of your preference. You can configure Mocha for BDD (jasmine style) or TDD (qunit style) easily. Jasmine is a complete framework that is shipped with all necessary features for testing (e.g. spies and mocks) and is relatively easier to get started. Mocha in the other hand is more flexible but it needs to be extended with several additional libraries such as Chai.js (assertion library) and Sinon.js (spy library). 

By default Karma comes with Jasmine, however I prefer to use Mocha, which you can add by installing karma-mocha, and an assertion library called Chai. The main reasons I prefer Mocha are that its to same testing framework I use in Node.js apps and it's flexibility allows you to setup the test environment you want. Mocha also shines at asynchronous testing.

###Stubs, Mocks and Spies in General

__Stubs__  
- Simulation of behaviour from other units  
- Most stubs are simply returning fixed values  

__Spies__  
- Augment certain methods/units with the abillity to track calls   
- The normal functionallity of the method is hereby not compromised

__Mocks__  
- A combination of Stubs and Spys   
- Override certain parts of a unit with stubs and automatically validate their calling structure against a predefined scheme


Mocks, Stubs and Spies will help you to accomplish the goal of isolation. There are several libraries that provide tools to easily create these objects in your tests. Jasmine API provides functions to work with these type of objects. Sinon.js is another library that provides standalone test spies, stubs and mocks with no dependencies that work with any unit testing framework.

In my article [Unit Testing: Mocks, Stubs and Spies](/blog/2014/unit-testing-mocks-stubs-and-spies/) I describe more in detail these type object and it differences.  

__Managing Mock Data in AngularJS__

- [Cleaner and maintainable object mocking in unit testing through angular modules](http://mukhanblogs.weebly.com/blogs/cleaner-and-maintainable-object-mocking-in-unit-testing-through-angular-modules)


Object Mocking http://mukhanblogs.weebly.com/blogs/cleaner-and-maintainable-object-mocking-in-unit-testing-through-angular-modules

Angular-Mock

+++++++++ starts copy  ... http://savanne.be/articles/testing-with-angular-js/
Faking HTTP

Unit tests run in complete isolation of the outside world. This makes them fast (we can replace slow external systems with fake fast ones) and powerful (we can simulate failures and other freak accidents).

This also means that there's no HTTP. The angular-mocks library provides an implementation of $httpBackend which disables all normal calls through $http. Instead, it allows creating mock responses. This gives us the exact control over network calls and allows you to verify that it does exactly what you want.

Faking time

There's no real time either. You need to manually control time in your unit tests. This allows you to precisely validate timed functionality and lets you test tricky async code in a synchronous way. But best of all: it eliminates the waiting from your tests, which means they're ridiculously fast.

$digest

Even the event loop is stopped during unit testing. Callbacks to promises won't happen automatically. You can push things forward by calling $rootScope.$digest(). Give it a go when things that should happen don't seem to be going forward.

You'll learn way more than you ever wanted to know about the Angular.JS digest loop during unit testing. This is a good thing, it's also a pain in the ass. Just know when to digest.


Use $provide to remove deep dependencies

++++++++++ ends copy


## How to write tests. Process of unit testing ... with examples

1. Isolate the functionality
2. Set expectations
3. Compare given conditions
4. Compare the given conditions with the expectation



##Testing Services

{% codeblock directive.js %}
describe('directive: svg-circle', function() {
  var element, scope;

  beforeEach(module('app'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    element =
        '<svg-circle size="{{size}}" stroke="black" fill="blue"></svg-circle>';

    scope.size = 100;

    element = $compile(element)(scope);
    scope.$digest();
  }));
});
{% endcodeblock %}

##Testing Controllers

##Testing Directives


To test a directive we need to create and compile it

 https://github.com/vojtajina/ng-directive-testing

 http://angular-tips.com/blog/2014/06/introduction-to-unit-test-directives/

-- Handling External Templates
http://www.portlandwebworks.com/blog/testing-angularjs-directives-handling-external-templates

##Testing Filters


automate tests with GRUNT or GULP... etc

Conclusion

Further Reading

There are two great articles at yearofmoo.com callded ["Full Spectrum Testing With AngularJS and Karma"](http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html) and ["Advanced Testing and Debugging in AngularJS"](http://www.yearofmoo.com/2013/09/advanced-testing-and-debugging-in-angularjs.html) that dive deeper in this subject.

https://github.com/Calvitium/tdd-angularjs-jasmine-vs-mocha

http://blog.codeship.io/2014/01/22/testing-frontend-javascript-code-using-mocha-chai-and-sinon.html

Theres's a great collection of [test patterns in angularjs on github](https://github.com/daniellmb/angular-test-patterns) published by Daniel Lamb (@daniellmb)


---

http://angular-tips.com/blog/categories/unit-test/

http://savanne.be/articles/testing-with-angular-js/

http://dailyjs.com/2013/05/16/angularjs-5/

http://stackoverflow.com/questions/4904096/whats-the-difference-between-unit-functional-acceptance-and-integration-test

Example of unit test https://github.com/markcoleman/angular-unittest

for E2e too http://blog.codeship.io/2013/10/31/unit-testing-best-practices-in-angularjs.html

http://qafoo.com/talks/13_06_ipc_se_mocks_stubs_and_spies.pdf

https://www.youtube.com/watch?v=9-kumGACGYk&feature=autoshare !!!

http://nathanleclaire.com/blog/2014/04/12/unit-testing-services-in-angularjs-for-fun-and-for-profit/

------------

Descartado


There also [E2E Testing](#) and other type in the middle. The third testing approach for testing AngularJS applications is known as Midway Testing
https://github.com/yearofmoo/ngMidwayTester

Slush-angular is great scaffolding project based on slush that will generate the boilerplate to start an angular app using Mocha and Chai for Unit Testing. For a Full There are many other generators, you can google them.

Recomended Articles


Sources:
- http://cjohansen.no/en/javascript/javascript_test_spies_stubs_and_mocks

----------------------------------
Done

http://angular-tips.com/blog/2014/03/introduction-to-unit-test-spies/




