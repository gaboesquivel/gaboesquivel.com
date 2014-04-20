---
layout: post
title: "Introduction to Gulp.js – Code Over Configuration"
#date: 2014-04-20 09:57:51 -0500
comments: true
categories:
  - javasript
  - software development
  - front-end
tags:
  - front-end
  - build system
---

Automation of repetitive and critical tasks is key to develop a successful software product. Automated tasks will minimize software cost, reduce software delivery time, as well as improving the product quality, reduce human error. Investing time in automating tasks will allow you to focus on developing features. 

*“War is of vital importance to the state; hence it is a subject of inquiry which can on no account be neglected”* - Sun Tzu, Art of War

In this post I will introduce you to Gulp.js, a javascript task runner that helps you automate your development process. 

##Setting Up your Web App Build System

When developing modern web applications there are critical task you want to automate:

- compressing new or modified images
- removing console and debugger statements from scripts
- css preprocessing ( sass, less, …)
- concatenating and minifying css and javascript files
- testing: code linting, unit testing, e2e tests
- deploying updates to a production server

There are many tools that will help you automate these tasks. Which one to choose? Grunt, Gulp, Broccoli,…

Back in 2012 Grunt.js came out and it was quickly adopted by the community, plugins started to proliferate and it became king for task automation on the client side, playing well with Bower and Yeoman. Like many other developers I’ve been using Grunt on my projects and it gets the job done. But recently I discovered Gulp, another open source project with faster build times and a Unix/Node philosophical approach to solve problems.

Gulp.js focuses on code over configuration. By harnessing the power of Node streams, it enables faster build times by avoiding the need to write temporary files to disk. This is one of the main differences with Grunt. Stream instances are basically Unix pipes. They can be readable, writable or both and are easy to reason about -- you can pipe a readable stream to a writable stream by doing readableStream.pipe(writableStream).

*“Streams come to us from the earliest days of unix and have proven themselves over the decades as a dependable way to compose large systems out of small components that do one thing well.   
You can then plug the output of one stream to the input of another and use libraries that operate abstractly on streams to institute higher-level flow control.”*
-substack

Other advantages of using Gulp are:
- Using standard libraries to accomplish tasks
- Small, idiomatic Node modules that do one thing well
- Tasks are executed with maximum concurrency
- Really simple and elegant API

Learning new flow control techniques will make you more efficient. You can learn more about node streams by reading the [Stream Handbook](https://github.com/substack/stream-handbook) by James Halliday and by playing on the (Node.js Stream Playground) [http://nodestreams.com/ ] by John Resign. Another great resource is (Node Streams: How do they work?)[http://maxogden.com/node-streams.html] by Max Ogden, it comes with a screencast version of the article.

Gulp has only few functions to learn:    
__task(name, fn)__ : it registers the function and you can optionally specify some dependencies if other tasks need to run first.    
__run(tasks...)__ : runs all tasks with maximum concurrency.    
__watch(glob, fn)__ : runs a function when a file that matches the glob changes    
__src(glob)__ :  returns a readable stream. Takes a file system glob and starts emitting files that match. This is piped to other streams.   
__dest(folder)__ : returns a writable stream. File objects piped to this are saved to the file system.   

The Gulp.js team is working on bringing in a new task system to improve efficiency ( even more ) and it might include some API changes, you can follow the progress here https://github.com/gulpjs/gulp/issues/355

##So why should I use Gulp instead of Grunt?

[@markdalgleish](http://twitter.com/markdalgleish) published a great presentation that covers the history of Grunt and Gulp and their differences: http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt

Another great article on this matter that is worth reading is [Gulp, Grunt, Whatever..](http://blog.ponyfoo.com/2014/01/09/gulp-grunt-whatever) by Nicolas Bevacqua [@nzgb](http://twitter.com/nzgb)

The main reasons why I decided to switch to Gulp are:   	
- Grunt uses JSON-like data configuration files; Gulp uses leaner, simpler JavaScript code.   
- Grunt plugins often perform multiple tasks; Gulp plugins are designed to do one thing only.   
- Grunt requires plug-ns for basic functionality such as file watching; Gulp has them built-in.   

You can also learn more from the creator of Gulp on this Javascript Jabber episode: [JSJ Gulp.js with Eric Schoffstall](http://javascriptjabber.com/097-jsj-gulp-js-with-eric-schoffstall/)

Find plugins at http://gulpjs.com/plugins/ and https://npmjs.org/browse/keyword/gulpplugin 

##Conclusion

Gulp.js and node streams are more natural to understand than a huge config file and it also provides more flexibility and speed. Grunt is more mature and they will be adding (orchestrator)[ https://github.com/orchestrator/orchestrator] soon. The Yeoman team don't have any plans on dropping our support for Grunt. They think that both Grunt and Gulp can happily co-exist and hope to support both communities with automation tooling. If you are using it successfully, there’s no reason to switch Gulp unless you really want or need more flow control and you feel confortable working with streams and living on the edge.
  

Sources   
http://slides.com/contra/gulp   
http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt   
http://yeoman.io/blog/gulp-explore.html   

