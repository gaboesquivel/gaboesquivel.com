---
layout: post
title: "In-Place Editing with contenteditable and AngularJS"
date: 2014-08-23 11:25:19 -0600
comments: true
categories: 
  - angularjs
  - javascript
tags:
  - javascript
  - html5
  - front-end
  - angularjs
---

In-place editing provides an easy way to let the user edit parts of a page without having to be redirected to an edit page. Instead, the user can just click around on a page an edit the elements he or she wishes to change – without reloading the page. This post shows how you can accomplish this using AngularJS and contenteditable html attribute. 

This chart shows the current browser support for contenteditable. <small>source: http://caniuse.com/#feat=contenteditable</small> 

<div class='center-align-wrapper'>
	<img src='/images/2014/08/caniuse-content-editable.jpg' />
</div>

The following directive uses contenteditable attribute and ng-model for data binding.

<p data-height="452" data-theme-id="8070" data-slug-hash="mgCAG" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/gaboesquivel/pen/mgCAG/'>Editing Page Elements with contenteditable</a> by Gabo Esquivel (<a href='http://codepen.io/gaboesquivel'>@gaboesquivel</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

&nbsp;   
<!--more-->

__Known issues__   
- In Chromium/Chrome contenteditable cannot be edited when nested into draggable (https://code.google.com/p/chromium/issues/detail?id=170139). Still not fixed in Chrome version 26.0.1384.2.  
- In Firefox when clicking on contenteditable nested into draggable, cursor is always positioned to the start of editable text. Still not fixed in version 18.0.1.  
- In Internet Explorer contenteditable cannot be applied to the TABLE, COL, COLGROUP, TBODY, TD, TFOOT, TH, THEAD, and TR elements directly, a content editable SPAN, or DIV element can be placed inside the individual table cells (See http://msdn.microsoft.com/en-us/library/ie/ms533690(v=vs.85).aspx).  

__References__  
- [w3.org contenteditable](http://www.w3.org/TR/html/editing.html#contenteditable)   
- [UI Patterns - In Place Editor](http://ui-patterns.com/patterns/inplaceeditor)   
- [Native Rich-Text Editing with the contenteditable Attribute](http://blog.teamtreehouse.com/native-rich-text-editing-with-the-contenteditable-attribute)   
- [Editing Text In-Place using HTML5 ContentEditable](http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/editing-text-in-place-using-html5-content-editable.html)   

