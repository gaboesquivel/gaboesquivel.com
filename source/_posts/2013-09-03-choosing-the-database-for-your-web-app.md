---
title: Choosing the Database for Your Web App
author: gaboesquivel
layout: post
comments: true
date: 2013-09-03
dsq_thread_id:
  - 1703209346
categories:
  - data architecture
  - software development
  - database
tags:
  - data
  - data architecture
  - database
  - nosql
  - sql
---
When choosing a database for your application, you need ask yourself many questions and there are important rules about Data Architecture

*   there&#8217;s no standard solution that fits all
*   the business and it&#8217;s data defines the architecture
*   you need to find the right tool that does job
*   you can use multiple databases, different types depending on the characteristics of each data subset

&nbsp;

It is very important to decide carefully, after your application grown it could be very difficult to change. The CAP theorem, also known as Brewer&#8217;s theorem, states that it is impossible for a distributed computer system to simultaneously provide all three of the following guarantees:

*   Consistency (all nodes see the same data at the same time)
*   Availability (a guarantee that every request receives a response about whether it was successful or failed)
*   Partition tolerance (the system continues to operate despite arbitrary message loss or failure of part of the system)

<img class="size-full wp-image-591 aligncenter" alt="CAP Theorem - Venn Diagram" src="/images/2013/09/cap_venn.png" width="547" height="520" />  
<!--more-->Once you have defined which of those guarantees is less important for your app and can be sacrificed, you have a smaller subset of options to choose from. However this not the only thing you need to consider, you may want to use a specific framework such as Hibernate, Spring, Django or WordPress, and take advantage of the of-the-shelf capabilities, in that case you want to use a SQL database.

&nbsp;

Other questions that will help you decide which database works best:

1.  What is the data like? What&#8217;s the nature of it?
2.  How is the data updated?
3.  How is the data read?
4.  Do you need limited access permissions?
5.  How important is documentation and community support?

Micah Yoder explains it very well in this video

{% youtube 1AisVHrWHJo %}

&nbsp;

Data Architecture is not just about choosing the right data store, other aspects to analyze are:

*   Low Cost ( preferably open source, no hidden costs&#8230; )
*   Simple to Implement and Scale
*   Learning Curve
*   Rapid Developement
*   Operational Maintenance
*   Ability to Do Online Changes
