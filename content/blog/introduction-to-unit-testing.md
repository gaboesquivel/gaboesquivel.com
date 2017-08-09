---
title: "Software Unit Testing"
subtitle: Understanding the important principles
description: Testing a web application is critical to ensure the program does what is supposed to do and that new functionality and changes don't brake existing parts of the application. Well-tested applications are more easily extended.
date: 2014-09-19
cover: /img/2014/09/bug-software.png
categories:
  - software testing
  - software development
tags:
  - unit testing
  - web applications
  - testing
---

Testing a web application is critical to ensure the program does what is supposed to do and that new functionality and changes don't brake existing parts of the application. Well-tested applications are more easily extended.

Testing can be defined as:
{% blockquote "Oxford Dictionary" %}
Taking measures to check the quality, performance, or reliability of (something), especially before putting it into widespread use or practice.
{% endblockquote %}


There are 3 main levels of testing and they are complementary:   
- __Scenario Testing / End-to-End Testing (E2E)__ : test the whole application by pretending to be a user.     
- __Functional Tests / Medium Level Tests__: a piece of functionality is tested in isolation, by simulating external dependencies.     
- __Unit Tests__: focused on application logic, tests the smallest unit of functionality, typically a method/function.     


Unit testing works by isolating small "units" of code so that it can be tested from every angle. Any kind of dependency that is slow, untested, hard to understand or initialise should be stubbed or mocked so you can focus on what the unit of code is doing, not what its dependencies do. Tests should ideally be written by developers, the same person who writes the functionality, not a QA team. Demoting unit testing to a lower level of priority is almost always a mistake.
<!--more-->
__What is a unit?__ In the best case, it is a pure function that you can deal with in some way. It can also be a whole class or multiple classes working together to achieve one single logical purpose that can be verified. In web applications DOM manipulations come into play as well. People might argue about this definition of Unit, Object-oriented design tends to treat a class as the unit, procedural or functional approaches might consider a single function as a unit. But really it's a situational thing - the team decides what makes sense to be a unit for the purposes of their understanding of the system and its testing. Pragmatism.

In Test Driven Development (TDD) tests are supposed to be written first, before the logic you want to test. You write a test that fails then the necessary code to pass the test and later you can refactor your code to improve it and optimize it. This is known as the "test-driven development mantra" or cycle: "Red - Green - Refactor". However when you starting to work on some functionality you’re going to be changing functions and abstracting parts away, and if you are writing something that is going to change a lot, writing tests would be a waste of time, specially when prototyping. However there are also benefits in writing the tests first. What I believe in is in writing __testable code__ and writing unit tests whenever you consider is good time for it. In general, code that is tightly-coupled or requires complex initialization is hard to test.

Following the SOLID Software Design Principles is a very good way to design code that can be easily tested.

__S__ - Single Responsibility Principle: An object should do exactly one thing, and should be the only object in the codebase that does that one thing.   
__O__ - Open/Closed Principle: software entities should be open for extension, but closed for modification.   
__L__ - Liskov Substitution Principle: objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.   
__I__ - Interface Segregation Principle: many client-specific interfaces are better than one general-purpose interface.    
__D__ - Dependency Inversion Principle: Depend upon Abstractions. Do not depend upon concretions. Dependency injection is one method of following this principle.  

Miško Hevery has a [great talk on unit testing](http://www.youtube.com/watch?v=wEhu57pih5w) (2008) and how to write testable code that I highly recommend you to watch. He talks about object oriented programming best practices and the importance of separating construction and lookup from the business logic through Dependecy Injection.

Some of the of the non-so-obvious benefits of Unit Testing are:   
- It gives you confidence, you know when the code works because you've run the tests, you get instant visual feedback.   
- Good unit tests can help document and define what something is supposed to do.   
- Unit tests help with code re-use. Migrate both your code and your tests to your new project and run the test again.
- It improves software design. When adding a new feature or refactoring an existing solution, testing forces you to think about what the code is supposed to accomplish and focus on that. Thus you end up with a clean and simple design that does exactly what you expect it to do.

The qualities of good unit tests are:    
- __Trustworthy__: The tests results are reliable.   
- __Readability__:  Writing test code that is easy to understand and communicates well.     
- __Maintainability__:  Writing tests that are robust and hold up well over time.     
- __Automation__:  Writing tests that require little setup and configuration (preferably none) and can be run/hooked to save or git push actions.   

If unit testing is written and performed properly and consistently, software projects are a lot more effective at delivering the correct solution in a predictable and managed way. It is our job to verify that each part of an app works individually, so when they are joined together they have a good chance of working as a whole.

A Testing Framework is going to be required. It is possible to write a little application of your own which executes each of the tests and counts the number of successes and failures. But since the work of setting up and tearing down tests, counting successes and failures, and reporting and so on is the same for every test, it makes a lot of sense to use an existing test framework. There are many testing frameworks and tools you can/should use to automate the repetitive tasks. The choice of framework is mostly a matter of taste.

Automated Unit Testing is a great way to continuously check that the units you are working on continue to work as intended. To be effective, automated tests must meet very specific objectives:

1.  Every developer must be able to run the combined collection of all the developer’s tests.
2.  The continuous integration (CI) server must be able to run the entire suite of tests without any manual intervention.

Although through unit tests you can prove the small units work perfectly in isolation, the units of code may blow up when combined and that's why you need Integration Testing, a logical extension of unit testing. In its simplest form, two units that have already been tested are combined into a component and the interface between them is tested. A component, in this sense, refers to an integrated aggregate of more than one unit.


Recommended lectures and talks     

- [Unit Test by Martin Fowler](http://martinfowler.com/bliki/UnitTest.html)
- [Writting Testable Javascript](http://www.youtube.com/watch?v=OzjogCFO4Zo), Talk by Rebecca Murphey at Full Frontal 2012
- [Top 12 Reasons to Write Unit Tests](http://www.onjava.com/pub/a/onjava/2003/04/02/javaxpckbk.html) by Eric M. Burke and Brian M. Coyner, authors of Java Extreme Programming Cookbook.
- [Writting Testable Javascript](http://www.adequatelygood.com/Writing-Testable-JavaScript.html) by Ben Cherry
- [Unit Testing](http://www.youtube.com/watch?v=wEhu57pih5w), Talk by Miško Hevery at Google, 2008
- [SOLID Software Design Principals](http://bit.ly/1r8o54R)
