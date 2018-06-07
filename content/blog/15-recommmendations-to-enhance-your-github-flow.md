---
title: "15 Recommendations to Enhance your Github Flow"
subtitle: "An opinionated list of tips to enhance your workflow on Github."
date: 2018-04-03
description: "An opinionated list of tips to enhance your Github workflow."
cover: /img/2018/05/github-flow.png
categories:
  - software development
  - open source
  - git
  - Github
  - git workflow
---

I've been working on software development for 10 years now and along the way, I've had the opportunity to collaborate on several open source projects and also worked on many non-open source projects where we used Github as our version control repository, on small and large teams.

On my journey, I've followed different workflows depending on the project and today I want to share with you what I consider to be a effective and pragmatic workflow for building and maintaining good quality software that can be applied to any project.

The attributes of good quality software are many: robustness, testability, resilience, modularity, maintainability, usability, security, performance, scalability and more depending on the type of application you are building. On this article I'll mainly focus on the following characteristics:

* Good documentation: readme, documentation sites, and changelogs.
* Well defined coding standards and conventions.
* Proper versioning with semver.
* Automated tests: not too many, focus on functional non-regression tests.
* Developer happiness, sure!

To accomplish this I'm proposing a pragmatic Github flow leveraging open source tools that help facilitate and automate many of the tasks required to achieve this goal.

If you are working on an open source project you want to publish your project Github, that's a fact. Git and Github have radically changed the way OSS is developed by becoming the de-facto common language for version control and definitive place for collaboration respectively.

The official workflow proposed by Github is called **github flow** and it's very well documented on their website [guides.github.com/introduction/flow](https://guides.github.com/introduction/flow/), most open source projects follow this workflow with slightly different flavors.

![](/img/2018/05/github-flow.png)

The Github workflow is very flexible in the sense that it doesn't tell you how to release and document changes, what merge strategy to use when accepting pull request, what tools to use, what commit standards to follow or what to review before accepting a pull request, that's up you and that makes a lot a of sense since there's no universal solution for every team's needs.

The following is a list of recommendations based on my experience:

I work mainly ( almost exclusively ) in JavaScript, many of the tools I'll mention are part of JS ecosystem, however, the principles apply to any language.

### Prioritize your Issues and Track your Progress with Github Projects

In September 2016 Projects feature was launched. It is tool allows you to create kanban style boards to organize, prioritize and track your work at the repository and organization level. If you use Github issues I strongly suggest you make use of the feature for organizing and communicating better the priorities of the project and the current efforts. You can learn more on the following link [help.github.com/articles/tracking-the-progress-of-your-work-with-project-boards](https://help.github.com/articles/tracking-the-progress-of-your-work-with-project-boards/)

### Classify your Issues with Tags

Github provides great filtering functionalities. If you are working on an open source project you want people to collaborate on your project as well as provide a good experience to the developers using it. By tagging your issues developers will able to more easily navigate the issue list, saving them time and allowing them to contribute with less entry friction.

### Leverage Github Templates for Pull Request and Issues

Taking the time to write Github templates for your issues and pull request will certainly pay off; This will force or at least help developers to report bugs and request features in the standard way with all the information you need to address them.

Learn more at [blog.github.com/2016-02-17-issue-and-pull-request-templates](https://blog.github.com/2016-02-17-issue-and-pull-request-templates/)

**Some general guidelines for bug reports**:

Before submitting an issue please check that you've completed the following steps:

* Made sure you're on the latest version
* Used the search feature to ensure that the bug hasn't been reported before

Bug reports should contain the following information:

* Summary: A brief description.
* Steps to reproduce: How did you encounter the bug? Instructions to reproduce it.
* Expected behavior: How did you expect it to behave?
* Actual behavior: How did it actually behave?
* References: Links to any related tickets or information sources.
* If possible, attach visual documentation of the bug. Screenshots, video and/or animated gifs.

**Pull Request General Guidelines**:

* Please make sure that there aren't existing pull requests attempting to address the issue mentioned.
* Check for related issues on the issue tracker.
* Non-trivial changes should be discussed on an issue first.
* Let us know you're working on the issue.
* Develop in a topic branch, not master.
* Provide useful pull request description.
* Follow project commit guidelines.
* Write a good description of your PR.
* Link to the Github issue in the description.

### Use the Command Line

The console is your friend. In my experience learning to interact with Github from the command line is the best use of your time if you work with open source technologies. There are many nice GUIs, however, none of them will give the flexibility of the command line. There's also tooling that will make life much simpler and a more efficient developer that is only available for the command line:

* **hub** is a command-line wrapper for git that makes you better at GitHub. Whether you are a beginner or an experienced contributor to open-source, hub makes it easier to fetch repositories, navigate project pages, fork repos and even submit pull requests, all from the command-line. [hub.github.com](https://hub.github.com/)
* **tj/git-extras** is a set of git utilities such as repo summary, repl, changelog population, author commit percentages and more. [github.com/tj/git-extras](https://github.com/tj/git-extras)

### Follow Strict Commit Message Standards ( Scoped Commits )

Always define and follow clear commit message standards for your projects, some general guidelines are:

* Commit each fix as a separate change.
* Provide useful commit messages.
* Provide a short commit message in the first line (50-100 character). Looking at the output of `gitk` or `git log --oneline` might help you understand why.
* Reference the git issue on the body of your commit message.

Additionally, I strongly suggest you scope your messages for a better changelog generation. When you scope your messages your changelogs can be more informative. The AngularJS commit conventions and changelog generation is a great example [gist.github.com/stephenparish/9941e89d80e2bc58a153#generating-changelogmd](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#generating-changelogmd)

### Define Coding Style Standards and Configure Pre-commit Hooks

Defining coding standards and enforce them through pre-commits hooks is essential for writing maintainable code. By following these standards you make sure all code looks the same regardless who wrote it, facilitating taking over and maintaining code written by someone else.

My recommended setup is Prettier and StandardJS, however, that's a matter of preference, there are many others and you can also configure a custom one, as long as you follow a coding standard you will benefit.

[typicode/husky](https://Github.com/typicode/husky) is a great tool to configure pre-commit hooks.

### Configure Automated Tests and Checks on Pull Requests

Automated functional tests, security and code style checks against every pull request are highly desirable, you don't want to do it manually. A continuous integration server such as TravisCI can be quickly configured to run these test automatically against the topic branch every time a pull request is submitted and Github can be configured to prevent the developer from merging pull requests that don't pass these test. If these automated tests fail Github will display a message on the pull request for the requester to fix them.

Learn more at [docs.travis-ci.com/user/pull-requests](https://docs.travis-ci.com/user/pull-requests/)

### Protect Your Master Branch and Require Code Reviews

Github gives you the possibility to protect your master branch against direct commits, forced pushes and rebase. This is very important when collaborating with others on a project. Additionally, you want code reviews as required step in order to merge code into master. By configuring this on the settings tab of each repository.

By protecting master and enforcing code reviews you are going peace of mind that it'll be unlikely that undesired code will land in master and the no one in the team will affect others modifying the master git history or pushing unreviewed code.

### Squash Your Pull Requests

This is a hot debate: Merge vs Squash vs rebase. I believe squash merge is the best approach for the following reasons:

* not all developers know how to properly rebase a pull request on top of master, that's a fact. Many developers will simply merge master on top of their changes. Squash merge gets rid of those merge messages that are useless to construct a changelog later and add noise to the git log.
* not all contributors will follow the commit guidelines, squash merge allows to control the commit message that land in the master branch.

In order to follow a squash merge workflow successfully it is necessary that every pull request is scoped to a specific feature, bug fix or chore.

### Semver, Github Tags, Releases and Automated Changelogs

Versioning is super important in software and especially in open source projects where a lot of projects will depend on your software. Semantic versioning will make life easier for everyone as they will know exactly when breaking changes where added or if a new version contains a new feature or a bug fix, by just looking the version numbers.

Given a version number MAJOR.MINOR.PATCH, increment the:

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backward-compatible manner, and
* PATCH version when you make backward-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

In addition to changing your package.json version generating a git tag for each version is a good practice.

Learn more at [semver.org](https://semver.org/).

The Conventional Commits specification proposes introducing a standardized lightweight convention on top of commit messages. This convention dovetails with SemVer, asking software developers to describe in commit messages, features, fixes, and breaking changes that they make.

By introducing this convention, we create a common language that makes it easier to debug issues across project boundaries.

[conventionalcommits.org](https://conventionalcommits.org/).

TravisCI can help to automate this process [docs.travis-ci.com/user/deployment/releases](https://docs.travis-ci.com/user/deployment/releases/)

You may also found these packages useful [dominique-mueller/automatic-release](https://github.com/dominique-mueller/automatic-release), [semantic-release/semantic-release](https://github.com/semantic-release/semantic-release).

### Automate Deployments with Tag Hooks

It's not necessary to use release branches as proposed on GitFlow. You take the deployment artifact from your git tags; In the link you will learn more about how to deploy git tags to heroku using TravisCI [docs.travis-ci.com/user/deployment/heroku](https://docs.travis-ci.com/user/deployment/heroku/). It's very simple, you just need to set the tags attribute to true. You can accomplish the same behavior with any other CI server.

For a development environment you can setup hook that deploys the latest master commit and for feature environments, it's ok to have not so long living branches, optionally you could provision ephemeral test environments for each PR request, however, this is more complex and not really required.

### Setup a Github Stream Channel on Your Chat Room

This is a very convenient way to track the activity on your Github repositories from a single place, the place where you communicate with your team is ideal. These are simple notifications stream on a topic room or several ones. But there much more you could do on your chat rooms, in 2013 Github coined the term **ChatOps**, you can learn about it here [youtube.com/watch?v=NST3u-GjjFw](https://www.youtube.com/watch?v=NST3u-GjjFw)

### Automate Dependency Updates

Keeping your dependencies up to date is time-consuming and repetitive task, ideal for automation. Luckily there are many tools that will help you keep your dependencies updated by automatically creating pull requests on your project with the latest versions, your automated non-regression tests will run against that pull request and if it passes chances are your code will continue to work normally once you merge it. Be careful with major version changes, always double check.

A couple tools that will help you are [greenkeeper.io](https://greenkeeper.io) and [david-dm.org](https://david-dm.org/)

### Enhance your Github UI Experience with Extensions

Open source developers have built many useful extensions that enhance your Github's experience, here's a list you may find useful.

* [GitHub Avatars](https://GitHub.com/anasnakawa/chrome-GitHub-avatars) [[chrome](https://chrome.google.com/webstore/detail/avatars-for-GitHub/pgjmdbklnfklcjfbonjfkdhaonlfogbb)] - Display avatars in GitHub news feed.
* [GitHub Awesome Autocomplete](https://GitHub.algolia.com/) [[chrome](https://chrome.google.com/webstore/detail/GitHub-awesome-autocomple/djkfdjpoelphhdclfjhnffmnlnoknfnd)] [[firefox](https://addons.mozilla.org/en-US/firefox/addon/GitHub-awesome-autocomplete/)] – Add instant search capabilities to GitHub search box.
* [GitHub Categoric](https://GitHub.com/ozlerhakan/categoric) [[chrome](https://chrome.google.com/webstore/detail/GitHub-categoric/gbfpmfhnfmobaichcfnhdobencecomhg)] – Categorize your mixed GitHub notifications.
* [GitHub Hovercard](https://GitHub.com/Justineo/GitHub-hovercard) [[chrome](https://chrome.google.com/webstore/detail/GitHub-hovercard/mmoahbbnojgkclgceahhakhnccimnplk)] [[firefox](https://addons.mozilla.org/en-US/firefox/addon/GitHub-hovercard/)] - Neat user/repo/issue hovercard for GitHub.
* [GitHub Isometric Contributions](https://GitHub.com/jasonlong/isometric-contributions) [[chrome](https://chrome.google.com/webstore/detail/isometric-contributions/mjoedlfflcchnleknnceiplgaeoegien?hl=en&gl=US)] [[safari](https://GitHub.com/jasonlong/isometric-contributions/blob/master/safari/isometric-contributions.safariextz?raw=true)] – Render an isometric pixel art version of your GitHub contribution graph.
* [GitHub Linker](https://GitHub.com/octo-linker/chrome-extension) [[chrome](https://chrome.google.com/webstore/detail/octo-linker/jlmafbaeoofdegohdhinkhilhclaklkp)] – Link dependencies in a package or bower file to their GitHub page.
* [GitHub Octotree](https://GitHub.com/buunguyen/octotree) [[chrome](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc)] [[safari](https://GitHub.com/buunguyen/octotree#install-on-safari)] [[firefox](https://addons.mozilla.org/en-US/firefox/addon/octotree/)] [[opera](https://addons.opera.com/en/extensions/details/octotree/)] – Display GitHub code in tree format.
* [GitHub Selfies](https://GitHub.com/thieman/GitHub-selfies) [[chrome](https://chrome.google.com/webstore/detail/GitHub-selfies/ldnpkdnkgkogfnahcnldaedcoadjbkbl)] – Add selfies to your pull requests and comments on GitHub.
* [GitHub Stars Tagger](https://GitHub.com/artisologic/GitHub-stars-tagger) [[chrome](https://chrome.google.com/webstore/detail/GitHub-stars-tagger/aaihhjepepgajmehjdmfkofegfddcabc)] – Add tags to your starred repositories directly on GitHub.
* [Github NPM Hub](https://Github.com/zeke/npm-hub) [[chrome](https://chrome.google.com/webstore/detail/npm-hub/kbbbjimdjbjclaebffknlabpogocablj)] - Explore npm dependencies on GitHub repos
* [Github vscode-icons](https://Github.com/dderevjanik/Github-vscode-icons) [[chrome](https://chrome.google.com/webstore/detail/Github-vscode-icons/hoccpcefjcgnabbmojbfoflggkecmpgd)] show vscode-icons in the repository browser.

You can see more on [GitHub Browser Extensions](https://GitHub.com/showcases/GitHub-browser-extensions).

[Kikobeats/awesome-Github](https://Github.com/Kikobeats/awesome-Github) has more tooling you leverage to improve your github flow.

### Continuous Learning and Improvement

Github and open source software development practices are constantly and rapidly evolving, keep up to date with latest practices and tooling by following Github announcements and following your community standards and practices. GitHub Training & Guides channel on youtube is a great resource. [youtube.com/githubguides](https://www.youtube.com/githubguides)
