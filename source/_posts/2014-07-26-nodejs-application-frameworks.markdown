---
layout: post
title: "Node.js Application Frameworks"
date: 2014-07-26 14:51:53 -0600
comments: true
categories: nodejs javascript 
---

Speed in software development is key for building a successful product and one of the tools that helps to deliver faster is an application framework. The app development framework provides an structure, handles repetitive tasks and alleviates the overhead associated with common activities allowing you to focus on features development. Good frameworks will enforce good practices and code reuse (modules).

In this post I'll list some of the most popular NodeJS frameworks and their characteristics.


## Sails - Realtime MVC Framework for Node.js

An MVC web framework with a modern twist, supporting WebSockets, streams, and a data-driven API.

[Sails.js](http://sailsjs.org) is designed to mimic the MVC pattern of frameworks like Ruby on Rails, but with support for the requirements of modern apps: data-driven APIs with scalable, service-oriented architecture. It's especially good for building chat, realtime dashboards, or multiplayer games.

Sails.js is database agnostic. Its ORM, Waterline, provides a simple data access layer that works, no matter what database you're using. It automatically generates a RESTful JSON API for your app and provides basic security and role-based access control by default, and you can add as many custom policies as you like. 

It is built on Express (for routing), EJS (for templating) and Socket.io (for cross-platform WebSockets with graceful degredation) with a convention-over-configuration philosophy, just like Ruby on Rails.

{% youtube GK-tFvpIR7c?rel=0&iv_load_policy=3 %}


## Express - Sinatra Inspired Web Development Framework for Node.js.

[Express.js](http://expressjs.com) is minimal and flexible web application framework, providing a robust set of features for building single and multi page, and hybrid web applications.

It has a myriad of HTTP utility methods and Connect middleware at your disposal for creating a robust user-friendly API quick and easy. It also has a thin layer of features fundamental to any web application, without obscuring features that you know and love in node.js

{% youtube LB32jTKzJkE?rel=0&iv_load_policy=3 %}


## Hapi - A Rich Framework for Building Applications and Services

[Hapi](http://hapijs.com/) enables developers to focus on writing reusable application logic instead of spending time building infrastructure.

It shines with essential built-in features that your API server or webpage mostly needs. Hapi was built by Walmart labs (Spumko, Eran Hammer) and it is configuration-centric, more declarative. Pretty well battle tested by their mobile app customers.

{% youtube 87NWyGzyVY?rel=0&iv_load_policy=3 %}


## Koa - Next Generation Framework for Node.js

[Koa.js](http://koajs.com) is new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs.

Through leveraging generators Koa allows you to ditch callbacks and greatly increase error-handling. Koa does not bundle any middleware within core, and provides an elegant suite of methods that make writing servers fast and enjoyable.

{% youtube aTTjednotGQ?rel=0&iv_load_policy=3 %}


There are many other NodeJS frameworks, you can find a categorized list at [nodeframework.com](http://nodeframework.com/) 
