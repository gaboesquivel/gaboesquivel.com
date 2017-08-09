---
title: "Best Practices for Designing RESTful APIs"
subtitle: "Plan and design robust and maintainable APIs"
date: 2015-10-03
categories:
  - software development
cover: /img/2015/10/web-api.jpg
description: When designing an API there are important decisions that have great impact on the way other applications will interact with the service.
---

An application-programming interface (API) exposes functionality of a software application for other software clients to use. Through APIs applications interact with each other and share data without any user knowledge or intervention.

Modern web applications typically have RESTful JSON APIs. REST stands for [Representational State Transfer](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) and it is a software architecture style consisting of guidelines and best practices for building scalable web services. JSON stands for JavaScript Object Notation and it is a minimal, readable format for structuring data.

<div class='center-align-wrapper'>
	<img src='/img/2015/10/API-Diagram.png' class='no-border'/>
</div>

When designing an API there are important decisions that have great impact on the way other applications will interact with the service. Once an API has been defined and other software clients make use of it, changes to the API are costly and should be avoided. By following standards and best practices you reduce the need to API changes to a minimum.
<!-- more -->
The following is a list of __pragmatic best practices__ applicable both to public and private APIs:

## Keep your base URLs simple
The key principles of REST involve separating your API into logical [resources](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_2_1_1) and each of these resources will typically have a base url. Simple and intuitive base URL design will make using your API easy.

The base url should consist of plural nouns for those resources and verbs should be avoided. For instance if we are creating the API for interacting with buildings on a construction management system the base url for that resource would be `/api/buildings` and in order to identify a single building resource we use its [URN](https://en.wikipedia.org/wiki/Uniform_resource_name) "/buildings/{buildingId}". These other urls should be avoided `/api/getAllBuildings`, `/api/getCompletedBuildings`, `/api/building`.

## Use Standard Methods
Always use HTTP verbs for CRUD (Create-Read-Update-Delete) operations. The primary and most-commonly-used HTTP methods are POST, GET, PUT, and DELETE and in a REST API these methods correspond to create, read, update, and delete operations, respectively. There are other verbs, too, but they are utilized with less frequently.

## Allow HTTP method overriding
Some proxies support only POST and GET methods. To support a RESTful API with these limitations, the API needs a way to override the HTTP method.
Use the custom HTTP Header `X-HTTP-Method-Override` to override the POST Method.

## Use REST Metadata
In addition to exposing application data, resources can also include other information that is specific to the RESTful API. Such information includes URLs and relationships.
The following table lists generic attributes that are defined and have a specific meaning on all resources. They should not be used for mapping application model attributes.

<table>
  <tr>
    <th>Attribute</th>
    <th>Type</th>
    <th>Meaning</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>Identifies the unique ID of a resource.</td>
  </tr>
  <tr>
    <td>href</td>
    <td>String</td>
    <td>Identifies the URL of the current resource.</td>
  </tr>
  <tr>
    <td>link</td>
    <td>Object</td>
    <td>Identifies a relationship for a resource. This attribute is itself an object and has "rel" "href" attributes.</td>
  </tr>
</table>


Presenting the fully qualified URL for every resource aids discoverability by allowing for new resources to be consumed by just embedding a new reference (link). Pagination is a great example for when to use linking when returning resource collections.

<pre><code class="json">
{
  "href" : "https://mycompany.com/api/buildings?offset=50&amp;limit=50",
  "offset": 50,
  "limit": 50,
  "first": {
      "href": "https://mycompany.com/api/buildings"
  },
   "prev": {
      "href": "https://mycompany.com/api/buildings"
  },
  "next": {
      "href": "https://mycompany.com/api/buildings?offset=100&amp;limit=50"
  },
  "last": {
      "href": "https://mycompany.com/api/buildings?offset=550&amp;limit=50"
  },
  "items": [
    {
      ... building 51 name/value pairs ...
    },
    ...,
    {
      ... building 100 name/value pairs ...
    }
  }
}
</code></pre>

## Simplify Associations
Resources almost always have relationship to other resources. Represent this associations in the URL.  Eg:
`GET api/buildings/6543/assets` This url will return all assets of that specific building and you could create assets for that building using `POST api/buildings/6543/assets`

## Complexities Under the Query String
Most APIs need to perform tasks that go beyond the resource level scope of the uniform resource locator (URL),  these tasks can include filtering by state or other attributes associated with a resource. Eg. `/api/buildings?completed=true&location=us` this is how you will query for all completed buildings in the US.

Typically when you request a resource on a RESTful API you will have nested resources that will come in the form of a reference. Query string flags can be used for resource expansion when you know in advance that you are going to need the extra information about the related resources and you aim reduce to API requests for performance. In this case you can optionally specify which relationships to expand in the query string. Eg. `api/buildings?expand=assets`

## Handle Errors with HTTP Status Codes and Messages
Your API should respond with the appropriate [http status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) along with a message in the response body, a message for the developer and a message for the end-user when appropriate. Eg. 404 Status `{"errors":[{"message":"Sorry, that page does not exist","code":34}]}` in addition to descriptive error text. Error messages may contain machine-parseable codes.

There are many http status codes, however most API providers use a small subset. These codes should suffice:

200 OK – [GET]   
201 CREATED – [POST/PUT/PATCH]    
204 NO CONTENT – [DELETE]    
304 NOT MODIFIED    
400 INVALID REQUEST – [POST/PUT/PATCH]    
401 UNAUTHORIZED    
403 FORBIDDEN    
404 NOT FOUND       
500 INTERNAL SERVER ERROR  

## Always use HTTPS/TLS
No exceptions here. HTTPS matters. All communications should be secured by default. With https information remains confidential from prying eyes because only your browser and the server can decrypt the traffic. Today, your web APIs can get accessed from anywhere there is internet: coffee shops, airports among others. Not all of these networks are secure. Many don't encrypt communications at all, allowing for easy eavesdropping or impersonation if authentication credentials are hijacked. For more in depth explanation of why https matters watch [HTTPS Everywhere](https://www.youtube.com/watch?v=cBhZ6S0PFCY) , a talk given by Ilya Grigorik and Pierre Far at Google I/O 2014.

## Versioning
Software applications are never finished, they are constantly evolving and whenever breaking changes in your API are inevitable you need to introduce a new version.

#### URL for API versioning
The most pragmatic way to manage API versions it to put the version number at the base of your URL, for example `api.example.com/v1/path/to/resource`.  Versioning by URL allows developers to figure out which version of the service is in use at a glance. Just look at the HTTP request URL, and you know everything.  `/api/v1/`  `/api/v2/` and so forth. You can also use the API version as a parameter `?version=v2` if you want to provide a different way to query different versions thru the url.

#### Support Accept Header

RFC4288 section 3.2 outlines how a vendor, i.e. an application, can make use of customizable MIME types in the Accept header.  An application can make use of this to include a version number as part of the Accept header used for content negotiation.

<pre><code class="apache">GET /api/buildings/1234 HTTP/1.1
Accept: application/vnd.constructionManagementApp-v1+json
</code></pre>

The vnd part is the vendor definition as outlined in [RFC4288](http://tools.ietf.org/html/rfc4288#section-3.2).

## Attribute Names in camelCase
snake_case is easy to read, however if you are using JSON it makes sense to follow [JavaScript's naming conventions](https://github.com/rwaldron/idiomatic.js#user-content-naming) specially if the consumer applications are likely to be written in javascript too.

## Clean Responses
In the JSON responses don't include internal-specific names (e.g. "node" and "taxonomy term").

## Mock Responses
It is suggested that each resource accept a 'mock' parameter on the testing server. Passing this parameter should return a mock data response (bypassing the backend).

Implementing this feature early in development ensures that the API will exhibit consistent behavior, supporting a test driven development methodology.

Note: If the mock parameter is included in a request to the production environment, an error should be raised.

## Provide Documentation
Always provide documentation for an API. Documentation is important. There are tools that auto-generate very stylish documentation for an APIs based on annotations on your API functions, [apidoc](http://apidocjs.com/) and [slate](https://github.com/tripit/slate) generate excellent API documentation sites.


<div class="notes">
This article is inspired in lessons learned through experience and also borrows from:   
<ul>
	<li><a href="http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api">Best Practices for Designing a Pragmatic RESTful API</a>, by Vinay Sahni</li>
	<li><a href="http://pages.apigee.com/web-api-design-ebook.html">Web API Design</a>, by Brian Mulloy, Apigee</li>
	<li><a href="http://www.ics.uci.edu/~fielding/pubs/dissertation/top.ht">Fielding's Dissertation on REST</a></li>
</ul>  
</div>
