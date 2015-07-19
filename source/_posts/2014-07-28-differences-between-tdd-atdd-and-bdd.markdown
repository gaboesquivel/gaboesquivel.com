---
layout: post
title: "Differences between TDD, ATDD and BDD"
date: 2014-07-28 14:36:30 -0600
comments: true
categories: 
  - software development 
  - software testing
---

__Test-driven development (TDD)__ is a technique of using automated unit tests to drive the design of software and force decoupling of dependencies. The result of using this practice is a comprehensive suite of unit tests that can be run at any time to provide feedback that the software is still working.

The concept is to "get something working now and perfect it later." After each test, refactoring is done and then the same or a similar test is performed again. The process is iterated as many times as necessary until each unit is functioning according to the desired specifications.


__ATDD__ stands for __Acceptance Test Driven Development__, it is also less commonly designated as Storytest Driven Development (STDD). It is a technique used to bring customers into the test design process before coding has begun. It is a collaborative practice where users, testers, and developers define automated acceptance criteria. ATDD helps to ensure that all project members understand precisely what needs to be done and implemented. Failing tests provide quick feedback that the requirements are not being met. The tests are specified in business domain terms. Each feature must deliver real and measurable business value: indeed, if your feature doesn’t trace back to at least one business goal, then you should be wondering why you are implementing it in the first place.

__Behavior-Driven Development (BDD)__ combines the general techniques and principles of TDD with ideas from domain-driven design. BDD is a design activity where you build pieces of functionality incrementally guided by the expected behavior. The focus of BDD is the language and interactions used in the process of software development. Behavior-driven developers use their native language in combination with the language of Domain Driven Design to describe the purpose and benefit of their code. 

A team using BDD should be able to provide a significant portion of "functional documentation" in the form of User Stories augmented with executable scenarios or examples.  BDD is usually done in very English-like language helps the Domain experts to understand the implementation rather than exposing the code level tests. It's usually defined in a GWT format: GIVEN WHEN & THEN.


## Differences

TDD is rather a paradigm than a process. It describes the cycle of writing a test first, and application code afterwards – followed by an optional refactoring. But it doesn’t make any statements about: Where do I begin to develop? What exactly should I test? How should tests be structured and named? .When your development is Behavior-Driven, you always start with the piece of functionality that’s most important to your user.

TDD and BDD have language differences, BDD tests are written in an english-like language.

BDD focuses on the behavioural aspect of the system unlike TDD that focuses on the implementation aspect of the system.

ATDD focuses on capturing requirements in acceptance tests and uses them to drive the development. (Does the system do what it is required to do?)

BDD is customer-focused while ATDD leans towards the developer-focused side of things like [Unit]TDD does. This allows much easier collaboration with non-techie stakeholders, than TDD.

TDD tools and techniques are usually much more techie in nature, requiring that you become familiar with the detailed object model (or in fact create the object model in the process, if doing true test-first canonical TDD). The typical non-programming executive stakeholder would be utterly lost trying to follow along with TDD.

BDD gives a clearer understanding as to what the system should do from the perspective of the developer and the customer. 

TDD allows a good and robust design, still, your tests can be very far away of the users requirements. BDD is a way to ensure consistency between requirements and the developer tests.
