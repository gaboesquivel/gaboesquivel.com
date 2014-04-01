---
title: Introduction to Reflection in Javavascript
author: gaboesquivel
layout: post
permalink: /reflection-in-javavascript/
dsq_thread_id:
  - 1004567091
categories:
  - javascript
tags:
  - javascript
  - patterns
---
In English, one of the meanings of reﬂection is &#8220;introspection&#8221; : contemplation of one-self. In other words, reﬂection is the ability of a thing to talk about itself.

In programming languages, the incarnation of this deﬁnition appears as follows [BGW93]:  
&#8220;Reﬂection is the ability of a program to manipulate as data something representing the state of the program during its own execution. There are two aspects of such manipulation : introspection and intercession. Introspection is the ability for a program to observe and therefore reason about its own state. Intercession is the ability for a program to modify its own execution state or alter its own interpretation or meaning. Both aspects require a mechanism for encoding execution state as data; providing such an encoding is called reification.&#8221;

Reflective computational systems allow computations to observe and modify properties of their own behavior. The concept of reflection is best understood by reaching back to the study of self-awareness in artificial intelligence: *&#8220;Here I am walking down the street in the rain. Since I&#8217;m starting to get drenched, I should open my umbrella&#8217;*&#8216;. This thought fragment reveals a self-awareness of behavior and state, one that leads to a change in that selfsame behavior and state. It would be desirable for computations to avail themselves of these reflective capabilities, examining themselves in order to make use of meta-level information in decisions about what to do next.

<!--more-->

  
*Reflection-oriented programming* includes self-examination, self-modification, and self-replication. However, the emphasis of the reflection-oriented paradigm is dynamic program modification, which can be determined and executed at runtime.

Computational reﬂection is good for (amongst others) :

*   extending a language / language design
*   building programming environments
*   advanced software development tools
*   building knowledge and learning systems
*   self-modifying / self-optimizing applications

Today, many programming languages offer interesting reﬂective capabilities

*   Common in high-level virtual machine programming languages like Smalltalk and scripting languages
*   Ruby has quite powerful reﬂective features too
*   Note that Java is not fully reﬂective (mostly introspection)

&nbsp;

**Introspection in Javascript **

In modern browsers, to get all property names (not just enumerable properties),  you&#8217;d use <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames" target="_blank">Object.getOwnPropertyNames</a>

Object.getOwnPropertyNames returns an array whose elements are strings corresponding to the enumerable *and non-enumerable* properties found directly upon `obj`. The ordering of the enumerable properties in the array is consistent with the ordering exposed by a  <a href="https://developer.mozilla.org/en/JavaScript/Reference/Statements/for...in" target="_blank">for&#8230;in loop</a> (or by <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys" target="_blank">Object.keys</a>) over the properties of the object.  The ordering of the non-enumerable properties in the array, and among the enumerable properties, is not defined. Items on the prototype chain are not listed (read MDN docs for detailed info)  
<noscript>
  <pre><code class="language-javascript javascript">var arr = ["a", "b", "c"];
print(Object.getOwnPropertyNames(arr).sort()); // prints "0,1,2,length"
 
// Array-like object
var obj = { 0: "a", 1: "b", 2: "c"};
print(Object.getOwnPropertyNames(obj).sort()); // prints "0,1,2"
 
// Printing property names and values using Array.forEach
Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
  print(val + " -&gt; " + obj[val]);
});
// prints
// 0 -&gt; a
// 1 -&gt; b
// 2 -&gt; c
 
// non-enumerable property
var my_obj = Object.create({}, 
                           { getFoo: { value: function() { return this.foo; }, 
                                       enumerable: false 
                                      } 
                           });
my_obj.foo = 1;
 
print(Object.getOwnPropertyNames(my_obj).sort()); // prints "foo, getFoo"</code></pre>
</noscript>

If you want only the enumerable properties, see <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys" target="_blank">Object.keys</a> or use a <a href="https://developer.mozilla.org/en/JavaScript/Reference/Statements/for...in" target="_blank">for&#8230;in loop</a> (although note that this will return enumerable properties not found directly upon that object but also along the prototype chain for the object unless the latter is filtered with hasOwnProperty()).

&nbsp;

**Reflector Object in Javascript (introspection)**

<noscript>
  <pre><code class="language-javascript javascript">// Generated by CoffeeScript 1.3.3
/**
  @author Michael Czolko &lt;michael@czolko.cz&gt;
*/

var Reflector;

Reflector = (function() {
  /**
  		@construct
  		@param {Object} object
  */

  function Reflector(object) {
    this.object = object;
    this.methods = null;
    this.properties = null;
  }

  /**
  		@return array
  */


  Reflector.prototype.getProperties = function() {
    if (this.properties === null) {
      this.scan();
    }
    return this.properties;
  };

  /**
  		@return array
  */


  Reflector.prototype.getMethods = function() {
    if (this.methods === null) {
      this.scan();
    }
    return this.methods;
  };

  /**
  		@return void
  */


  Reflector.prototype.scan = function() {
    var property;
    this.methods = new Array;
    this.properties = new Array;
    for (property in this.object) {
      if (typeof this.object[property] === 'function') {
        this.methods.push(property);
      } else {
        this.properties.push(property);
      }
    }
  };

  /**
  		@param {Function} func
  		@return array
  */


  Reflector.prototype.getParamNames = function(func) {
    var funcStr;
    funcStr = func.toString();
    return funcStr.slice(funcStr.indexOf('(') + 1, funcStr.indexOf(')')).match(/([^\s,]+)/g);
  };

  /**
  		@param {Function} func
  		@return int
  */


  Reflector.prototype.getParamsCount = function(func) {
    return this.getParamNames().length;
  };

  /**
  		@return {Function} func
  */


  Reflector.prototype.getConstructor = function() {
    return this.object.constructor;
  };

  return Reflector;

})();</code></pre>
</noscript>

&nbsp;

Sources:

*http://demetriusj.com/post/6473358396/javascript-reflection-howto*

https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames

*http://tadeze.blogspot.com/2010/01/reflection-oriented-programming.html*

*http://www.cs.indiana.edu/~jsobel/rop.html*

*http://released.info.ucl.ac.be/courses/r+cop/material/01-T-Course%20Introduction.pdf*

*https://www-master.ufr-info-p6.jussieu.fr/2007/Ajouts/Master\_esj20\_2007_2008/IMG/pdf/malenfant-ijcai95.pdf*

*https://github.com/mCzolko/Reflector*

&nbsp;

Note:

I continue exploring reflection oriented programming in javascript, I&#8217;ll possibly review this post soon. Please leave your comments.