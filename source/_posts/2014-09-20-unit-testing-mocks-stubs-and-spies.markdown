---
layout: post
title: "Unit Testing: Mocks, Stubs and Spies"
date: 2014-09-20 07:00:26 -0600
comments: true
cover: /images/2014/09/bug-software.png
categories: 
  - software testing
  - software development
tags:
  - unit testing
  - web applications
  - testing
---

In unit testing isolation is key. The class/object/function you are testing is called the System Under Test (SUT) and the SUT often interacts with other part of the system, these parts are called Collaborators or Depedencies. When testing the simulation of the collaborators/dependencies and behaviors of these dependencies allows you to to test the units in isolation. Gerard Meszaros author of xUnit Test Patterns uses the term "Test Double" as the generic term for any kind of pretend object used in place of a real object for testing purposes. The name comes from the notion of a Stunt Double in movies. 

Mocks, Stubs, Spies, Dummies and Fakes are types of test doubles that will help you to accomplish the goal of isolation. There are several libraries that provide tools to easily create these objects in your tests. Sinon.js is a javascript library that provides standalone test spies, stubs and mocks with no dependencies that work with any unit testing framework. 

__Dummies__

Dummy objects are passed around but never actually used. Usually they are just used to fill parameter lists. It is an object that simply implements an Interface, and does nothing else. It's not intended to be used in your tests and will have no effect on the behaviour, sometimes a null object could be sufficient. An example would be passing an object into a constructor that isn't used in the path you're taking, or a simple object to add to a collection.

{% codeblock lang:javascript %}


var TaskManager = function(){
	var taskList = [];
	
	return {
		addTask: function(task){
			taskList.push(task);
		},
		tasksCount: function(){
			return taskList.length;
		}
	}
}

// Test
var assert = require("assert")
describe('add task', function(){
	it('should keep track of the number of tasks', function(){
	  var DummyTask = function(){ return {} };
	  var taskManager = new TaskManager();
	
	  taskManager.addTask(new DummyTask);
	  taskManager.addTask(new DummyTask);

	  assert.equal( taskManager.tasksCount(), 2 );

	})
})


{% endcodeblock %}

__Spies__

A test spy is an object that records its interaction with other objects throughout the code base. When deciding if a test was successful based on the state of available objects alone is not sufficient, we can use test spies and make assertions on things such as the number of calls, arguments passed to specific functions, return values and more.

Test spies are useful to test both callbacks and how certain functions/methods are used throughout the system under test. The following simplified example shows how to use spies to test how a function handles a callback:

{% codeblock lang:javascript %}
"test should call subscribers on publish": function () {
    var callback = sinon.spy();
    PubSub.subscribe("message", callback);

    PubSub.publishSync("message");

    assertTrue(callback.called);
}
{% endcodeblock %}


__Stubs__ 

Test stubs are fake objects with pre-programmed behavior ( Simulation of behaviour from other units ), Most of times they are simply returning fixed values. They are typically used for one of two reasons:

- To avoid some inconvenient interface - for instance to avoid making actual requests to a server from tests.   
- To feed the system with known data, forcing a specific code path.   

Javascript is flexible enough to accomplish this easily without any library

{% codeblock lang:javascript %}
"example of simple stub without any lib": function () {
    var task = { completed = true }
}
{% endcodeblock %}

__Fakes__

Fake objects have working implementations, but usually take some shortcut which makes them not suitable for production (an in memory database is a good example). The simplest way to think of a Fake is as a step up from a Stub. This means not only does it return values, but it also works just as a real Collaborator would.

__Mocks__

When most people talk about Mocks what they are actually referring to are Test Doubles. A Test Double is simply another object that conforms to the interface of the required Collaborator, and can be passed in in its place. There are very few classes that operate entirely in isolation. Usually they need other classes or objects in order to function, whether injected via the constructor or passed in as method parameters. These are known as Collaborators or Depencies.





-- Use your own words to avoid referencing at the end --
References: 

[Mocks Aren't Stubs](http://martinfowler.com/articles/mocksArentStubs.html) by Martin Fowler
[Test Doubles: Mocks vs Stub](http://adamcod.es/2014/05/15/test-doubles-mock-vs-stub.html) by Adam Brett

http://blog.codeship.io/2014/01/22/testing-frontend-javascript-code-using-mocha-chai-and-sinon.html
https://github.com/nelsonic/learn-mocha

http://xunitpatterns.com/
http://andyshora.com/unit-testing-best-practices-angularjs.html
http://www.htmlgoodies.com/html5/javascript/spy-on-javascript-methods-using-the-jasmine-testing-framework.html#fbid=ciEFlkF0M7j
http://qafoo.com/talks/13_06_ipc_se_mocks_stubs_and_spies.pdf


http://cjohansen.no/en/javascript/javascript_test_spies_stubs_and_mocks -- maybe

http://angular-tips.com/blog/2014/03/introduction-to-unit-test-spies/

http://www.pubnub.com/blog/javascript-testing-idiot-proofing-your-code/
