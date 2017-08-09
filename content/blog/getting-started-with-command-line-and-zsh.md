---
title: Get Started with Command Line and Z Shell
subtitle: The console is your friend!
description: To develop a web application tooling and workflow are very important. Taking the time to learn and master command line is not only highly recommended but it is required to make use of tools that will help you develop faster and gain more control of your workflow.
date: 2014-04-28
cover: /img/2014/04/oh-my-zsh.png
categories:
  - software development
  - tools
tags:
  - shell
  - scripting
  - tools
  - howto
---

A quick introduction... To develop a web application tooling and workflow are very important. Taking the time to learn and master command line is not only highly recommended but it is required to make use of tools that will help you develop faster and gain more control of your workflow.

This post summarizes what you need to know to get going with command line as well sharing some personal recommendations on the setup of the command prompt on MAC OS X, but it applies to *nix as well.


##What is a Shell?

The Shell is an application that offers interactive console or terminal access to a computer system. It lets you interact with applications on your computer through command line. A command-line interface (CLI) is a mechanism for interacting with a computer operating system or software by typing commands to perform specific tasks, a command-line interpreter then receives, parses, and executes the requested user command.

Most operating systems offer a command line interface, but that doesn't mean the built-in version is best. MAC OS X comes with Terminal, however there's a terminal emulator for Mac OS X that is more customizable and does amazing things out-of-the-box, it's called [iTerm](http://www.iterm2.com/#/section/home). If you are using a windows machine I'd recommend you installing [cygwin](http://lifehacker.com/179514/geek-to-live--introduction-to-cygwin-part-i).

In order to use the command line prompt you will need to memorize commands. Start with the basic system commands, once you mastered that you'll catch up quickly with other tools such as [gulp.js](/blog/2014/shell-is-your-friend-tips-and-how-to-customize-it/). <!--more-->[Sayanee](http://sayan.ee/) runs a great podcast on tech tools called Build Podcast, I recommend you watching this episode to get started.  

{% vimeo 43649618 %}

##Setup

ZSH(Z Shell) is a powerful command interpreter for shell scripting, it is a modern [Unix shell](http://en.wikipedia.org/wiki/Unix_shell) that is backward compatible with bash. The main features of zsh are the true auto tab completion and autocorrect, shared history over all terminals, history sub-string search and the ability to customize your prompt [among many other](http://zsh.sourceforge.net/FAQ/zshfaq01.html).

So Why is Zsh better than Bash? In short:    
- very costumizable prompt    
- autocorrection   
- fast autocompletion that also gives you a keyboard navigable completion list. Let's look at an example,
`Kill <tab>` ouput the list of current processes whereas bash displays a list of files in the current directory.   

<div class="center-align-wrapper">
<img src="/img/2014/04/kill-tab-zsh.png"/>
</div>


Here's what you need to do in order to install or update ZSH on MAC OS X:

Apple comes with the Bash as the default Shell. That might be fine for many users, but I as mentioned before I prefer Z shell, which is already included in Mac OS X Mavericks.

Out of the box Mac OS X version 10.8.x (Lion) comes with zsh version 4.3.11 (i386-apple-darwin12.0). However zsh is currently at version zsh 5.0.2 (x86_64-apple-darwin13.0). You can use [Homebrew](http://brew.sh) to install the newer version.

In order to use homebrew first you need need to install Command Line Tools for Xcode by running: `xcode-select --install` or update to XCode5. The Command Line Tool package gives terminal users many commonly used tools, utilities, and compilers, including make, GCC, clang, perl, svn, git, size, strip, strings, libtool, cpp, what, and many other useful commands that are usually found in default linux installations.

Open the console and run `brew install zsh`  

Now in order to change the default shell to zsh run `chsh -s /bin/zsh`   
Verify your running zsh after opening new terminal with `ps -o comm $$`   

In iTerm settings make sure it is running zsh
<div class="center-align-wrapper">
<img src="/img/2014/04/iterm.png"/>
</div>

###Customization

Customizing the command prompt is different in different shells, I'm going to cover zsh here.

Zsh is widely used by the open source community and because of that there are many open sourced projects with snippets, functions, configurations, themes, plugins, modules you can leverage to personalize your shell prompt.

__[Oh-My-ZSH](http://ohmyz.sh/)__: the is most popular with over 600 contributors on github and many plugins that you can easily integrate. There's a similar project for windows called [oh-my-cygwin](https://github.com/haithembelhaj/oh-my-cygwin)

__[Zach Holman's dotfiles](https://github.com/holman/dotfiles)__: features auto sourcing Zsh files, easy Zsh completion extensions, and a local bin folder for executables. The included Rakefile will symlink anything ending in .symlink to your ~ folder. What's great about Holman's dotfiles is the organization per topic - [here you can read more about it](http://zachholman.com/2010/08/dotfiles-are-meant-to-be-forked/). I believe since then people have started to follow this pattern. There are many dotfiles on github https://github.com/search?q=dotfiles and on the following link you will find a good selection and categorization http://dotfiles.github.io

__[YADR](https://github.com/skwp/dotfiles)__: it is collection of the best bits of all the top dotfile repos, vim and zsh plugins curated in one place, into a simple and cohesive way of working. It has many vim plugins (90+), all under one roof, working together, each plugin researched and configured to be at its best, often with better shortcut keys. Zsh plugins based on [Prezto](https://github.com/sorin-ionescu/prezto) and all things are vimized: irb, postres command line, etc.

I'm currently using Oh-My-ZSH as base for my configuration. You can find the detailed installation steps and documention [here](https://github.com/robbyrussell/oh-my-zsh#setup). YADR has being staled for while and Prezto altough is very well documented doesn't have the community support oh-my-zsh has.
