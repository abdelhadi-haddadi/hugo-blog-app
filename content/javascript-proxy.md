+++
title = "JavaScript proxy"
date = 2025-08-29T20:01:34.717+01:00
draft = false
description = "Understand how to use JavaScript Proxy to intercept and customize object operations, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript proxy

last modified last modified October 18, 2023

 

In this tutorial, we show how to create and use a proxy in JavaScript. 

A proxy server is a server application that acts as an intermediary
between a client requesting a resource and the server providing that resource.  

Proxies are used for various reasons, including authorization, anonymization,
load balancing and logging.

## JS proxy example

In our example, we use Express framework and http-proxy module. We are going 
to send a simple HTTP GET request to webcode.me website, which is going to 
be proxied over a local Express-based web application.

$ npm install express http-proxy

We install the two modules.

server.js
  

const express = require('express');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const app = express();

app.get('*', (req, res) =&gt; {

    console.log('Request', req.method, req.url);
    proxy.web(req, res, { target: `${req.protocol}://${req.hostname}` });
});

app.listen(3000, () =&gt; console.log('Application started on port 3000'));

This is a simple Express applications which logs the request and sends it to 
the final target.

app.get('*', (req, res) =&gt; {

    console.log('Request', req.method, req.url);
    proxy.web(req, res, { target: `${req.protocol}://${req.hostname}` });
});

All requests are forwarded to the final destination. We log the request details 
to the console.

client.js
  

const axios = require('axios');

async function doGetRequest() {

    const res = await axios.get('http://webcode.me', {

        proxy: {
            host: 'localhost',
            port: 3000
        }
    });

    console.log(res.data);
}

doGetRequest();

With Axios, we create a GET request to the http://webcode.me
webpage. It is sent via the proxy listening on localhost:3000.

$ node server.js 
Application started on port 3000

We start the server application.

$ node main.js 
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;link rel="stylesheet" href="format.css"&gt;
    &lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is a beautiful day. We go swimming and fishing.
    &lt;/p&gt;
    
    &lt;p&gt;
         Hello there. How are you?
    &lt;/p&gt;
    
&lt;/body&gt;
&lt;/html&gt;

We create a GET requst and receive a response. The server logs the
Request GET http://webcode.me/ message to the console.

## Source

[JS Proxy - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

In this article we have worked with a proxy in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)