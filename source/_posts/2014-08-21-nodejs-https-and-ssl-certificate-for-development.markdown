---
layout: post
title: "Node.js HTTPS and SSL Certificate for Development"
date: 2014-08-21 22:57:38 -0600
comments: true
cover: /images/nodejs-logo-green.png
categories: nodejs javascript
tags:
  - node.js
  - security
  - javascript
  - back-end
---

HTTPS is the HTTP protocol over TLS/SSL and HTTPS is required to protect your data. It is the most popular network protocol for establishiing secure connections for exchanging documents on the internet. It is basically HTTP carried over a TCP socket, which has been secured using SSL. Transport Layer Security (TLS) and Secure Sockets Layer (SSL) are cryptographic protocols designed to provide communication security. In this post I'll show how to create a self-signed SSL certificate and set up an express 4.0 project that uses it for local development purposes.

### Self-Signed SSL Certificate

There are two kinds of certificates: those signed by a '[Certificate Authority](http://en.wikipedia.org/wiki/Certificate_authority)', or CA, and 'self-signed certificates'. A Certificate Authority is a trusted source for an SSL certificate, and using a certificate from a CA allows your users to be trust the identity of your website. In most cases, you would want to use a CA-signed certificate in a production environment - for testing purposes, however, a self-signed certicate will do just fine.
<!--more-->
To genereate a certificate all you need is openssl

<pre><code class="console">
$ where openssl
/usr/bin/openssl  /usr/local/bin/openssl
</code></pre>

You can install it using homewbrew `brew install openssl` on Mac OS, on linux use `sudo apt-get install openssl`, on windows you can use [this installer](http://gnuwin32.sourceforge.net/packages/openssl.htm).

To update openssl on mac os run the following commands
<pre><code class="console">
brew update
brew install openssl
brew link --force openssl
</code></pre>

Run the these commands to generate a self-signed certificate.

<pre><code class="console">
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
</code></pre>

You will get a cert.pem (the certificate) and key.pem (the private key). This is all you need for a SSL connection.

In the second command, when prompted for "Common Name (eg, YOUR name) []:", do not give your name. It is actually the domain name field, so enter your domain name. Not giving your domain name will result in "domain mismatch" errors.

This certificate will trigger warnings in your browser, since it is self-signed.

When generating the key you might encounter the following error: `unable to write 'random state'`, the most common reason for this happening seems to be that the .rnd file in your home directory is owned by root rather than your account. [more on stackoverflow](http://stackoverflow.com/questions/94445/using-openssl-what-does-unable-to-write-random-state-mean)   


### Create an HTTPS Server

The HTTPS server and client API is almost identical to the HTTP API, so pretty much everything said above applies to them. In fact, the client API is the same, and the HTTPS server only differs in that it needs a certificate file.

Secure Server
<pre><code class="javascript">
var https = require('https');
var fs = require('fs');

var pkey = fs.readFileSync('key.pem');
var pcert = fs.readFileSync('cert.pem')

var options = {
    key: pkey,
    cert: pcert
};

var server = https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
}).listen(443);
</code></pre>


Socket.io Client lang:javascript
<pre><code class="javascript">
var socket = io.connect('https://localhost:443/',{secure: true});
</code></pre>

&nbsp;   

{% blockquote Nodejitsu http://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server %}
NODE PRO TIP: Note fs.readFileSync - unlike fs.readFile, fs.readFileSync will block the entire process until it completes. In situations like this - loading vital configuration data - the sync functions are okay. In a busy server, however, using a synchronous function during a request will force the server to deal with the requests one by one!
{% endblockquote %}

For a complete guide to OpenSSL I highly recommend this article by Digital Ocean: [OpenSSL Essentials: Working with SSL Certificates, Private Keys and CSRs](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs)


__References__   
 - [Painless Self Signed Certificates in node.js ](https://github.com/coolaj86/node-ssl-root-cas/wiki/Painless-Self-Signed-Certificates-in-node.js)   
 - [Nodejitsu Docs: How to create an HTTPS server](http://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server)    
 - [Heroku Dev Center: Creating a Self-Signed SSL Certificate](https://devcenter.heroku.com/articles/ssl-certificate-self)         
 - [How to create a self-signed SSL Certificate](http://www.akadia.com/services/ssh_test_certificate.html)
