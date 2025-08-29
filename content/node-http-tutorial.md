+++
title = "Node HTTP tutorial"
date = 2025-08-29T20:01:22.618+01:00
draft = false
description = "Learn how to create HTTP server and client applications in JavaScript using the Node.js HTTP module, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Node HTTP tutorial

last modified last modified October 18, 2023

 

In this article we show how to create HTTP server and client applications in
JavaScript with HTTP module.

## HTTP

HTTP is a Node.js module which can be used to create HTTP server and
client applications in JavaScript. Popular JavaScript frameworks including
Express and HapiJS are built on top of the HTTP module.

This tutorial teaches you the basics of HTTP interaction. To create real web
applications, we should use a complete web framework such as JavaScript's
Express or PHP's Symfony.

## Setting up HTTP

First, we install the HTTP module.

$ npm init -y

We initiate a new Node.js application.

$ npm i http

We install HTTP with npm i http command.

## Node HTTP simple server

A server application is created with createServer.

simple.js
  

const http = require('http');

http.createServer((req, res) =&gt; {

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello there');
    res.end();

}).listen(8080);

console.log('server running on port 8080');

The example creates a very simple HTTP server which sends a text message
to the client. The server runs on port 8080.

const http = require('http');

First, we include the HTTP module.

http.createServer((req, res) =&gt; {

We create a web application with the createServer function.
It accepts a handler function which receives two parameters:
the request and response objects.

res.writeHead(200, { 'Content-Type': 'text/plain' });

With the writeHead method, we write a header to the response.
We specify the status code and the content type.

res.write('Hello there');

We write data to the response.

res.end();

We send the response to the client.

$ node simple.js
server running on port 8080

We start the server.

$ curl localhost:8080
Hello there

With the curl tool, we create a GET request to the server and
receive the message.

## Node HTTP send JSON

In the next example, we create a server that sends a JSON response.
JSON (JavaScript Object Notation) is a lightweight data-interchange format.

send_json.js
  

const http = require('http');

const server = http.createServer((req, res) =&gt; {

    if (req.url == '/now') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ now: new Date() }));
        res.end();

    } else {

        res.end('Invalid request');
    }
});

server.listen(8080);

console.log('server running on port 8080');

The application responds to the /now request path by sending
current date in JSON.

if (req.url == '/now') {

We check if the request URL is equal to /now.

res.writeHead(200, { 'Content-Type': 'application/json' });

We inform the client that we send JSON response in the header with the
appropriate content type.

res.write(JSON.stringify({ now: new Date() }));

We write the current date in JSON to the response.

## Node HTTP send HTML

Next, we are going to send HTML data to the client.

send_html.js
  

const http = require('http');

const server = http.createServer(function (req, res) {

    if (req.url == '/') {

        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write('&lt;html&gt;&lt;body&gt;&lt;p&gt;This is home page.&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;');
        res.end();

    } else if (req.url == "/contact") {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('&lt;html&gt;&lt;body&gt;&lt;p&gt;This is contact page&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;');
        res.end();

    } else if (req.url == "/admin") {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('&lt;html&gt;&lt;body&gt;&lt;p&gt;This is admin page&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;');
        res.end();

    } else {

        res.end('Invalid request');
    }

});

server.listen(8080);

console.log('server running on port 8080');

We specify the text/html content type and write HTML tags to the
response.

**Note: ** In real-world applications, we do not write HTML
code into the response. We use templates.

## Node HTTP query parameters

Clients can communicate with servers by adding query parameters
to the URL.

query_params.js
  

const http = require('http');
const url = require('url');

http.createServer((req, res) =&gt; {

    let q = url.parse(req.url, true).query;

    let msg = `${q.name} is ${q.age} years old`;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(msg);
    res.end();

}).listen(8080);

console.log('server running on port 8080');

In the example, the server responds with a message built from query parameters.

const url = require('url');

To parse the query parameters, we use the url module.

let q = url.parse(req.url, true).query;

We get the query object which has the values.

let msg = `${q.name} is ${q.age} years old`;

We build the message from the query parameters.

$ curl "localhost:8080/?name=Peter&amp;age=34"
Peter is 34 years old

After we start the server, we create a request with curl.
We specify the query parameters.

## Node HTTP server

The following example creates a more complex HTTP server. We have three HTML
files in the docs subdirectory.

docs/about.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;About page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;This is about page.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the about.html file.

docs/contact.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Contact page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;This is contact page.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the contact.html file.

docs/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        This is home page.
    &lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

This is the index.html file.

http_server.js
  

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) =&gt; {

   let pathname = url.parse(req.url).pathname;

   console.log(`Request for ${pathname} received`);

   if (pathname == '/') {

      pathname = '/index.html';
   }

   fs.readFile('docs/' + pathname.substr(1), (err, data) =&gt; {

      if (err) {

         console.error(err);

         res.writeHead(404, { 'Content-Type': 'text/plain' });
         res.write('404 - file not found');

      } else {

         res.writeHead(200, { 'Content-Type': 'text/html' });
         res.write(data.toString());
      }

      res.end();
   });
});

server.listen(8080);

console.log('server running on port 8080');

```
const fs = require('fs');

```

We use the fs module to read the HTML files.

The example reads HTML files from the filesystem.

let pathname = url.parse(req.url).pathname;

We determine the pathname, which is the file name to be loaded.

if (pathname == '/') {

    pathname = '/index.html';
}

For the root page, we send index.html.

fs.readFile('docs/' + pathname.substr(1), (err, data) =&gt; {

With the readFile method, we read the contents
of the HTML file.

if (err) {

  console.error(err);

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('404 - file not found');

} ...

In case of an error, we send 404 code to the client.

} else {

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(data.toString());
}

If the file was found and read, we send the contents of
the file to the client.

## Node HTTP GET request

We can use the HTTP module to create client requests as well.

http_get.js
  

const http = require('http');

const options = {
    hostname: 'webcode.me',
    port: 80,
    path: '/',
    method: 'GET'
};

const req = http.request(options, (res) =&gt; {

    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) =&gt; {

        process.stdout.write(d);
    });
});

req.on('error', (err) =&gt; {

    console.error(err);
});

req.end();

The example creates an HTTP GET request to the webcode.me.

const options = {
    hostname: 'webcode.me',
    port: 80,
    path: '/',
    method: 'GET'
};

The options contain the hostname, port, path, and HTTP method of the
generated request.

const req = http.request(options, (res) =&gt; {

A request is generated with request.

res.on('data', (d) =&gt; {

    process.stdout.write(d);
});

We continuously write incoming data to the console in the data event handler.

$ node http_get.js
statusCode: 200
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
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

Alternatively, we can use the get method.

http_get.js
  

const http = require('http')

const req = http.get({ host: 'webcode.me', path: '/' }, (res) =&gt; {

    // Continuously update stream with data
    let content = '';

    res.on('data', (chunk) =&gt; {
        content += chunk;
    });

    res.on('end', () =&gt; {

        console.log(content);
    });
});

req.end();

We generate a GET request to the same website.

// Continuously update stream with data
let content = '';

res.on('data', (chunk) =&gt; {
    content += chunk;
});

We continuously add retrieved chunks of data to the
content variable.

res.on('end', () =&gt; {

    console.log(content);
});

In the end, we print the variable to the console.

## Node HTTP POST request

The following example creates a POST request to the httpbin.org
website. This is a free site where we can test our requests. Since the site
uses HTTPS protocol, we use the https module.

http_post.js
  

const https = require('https');

let payload = JSON.stringify({
    "name": "Peter",
    "age": 34
});

let headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload, 'utf8')
};

let options = {
    host: 'httpbin.org',
    port: 443,
    path: '/post',
    method: 'POST',
    headers: headers
};

let reqPost = https.request(options, (res) =&gt; {
    console.log("status code: ", res.statusCode);

    res.on('data', (chunks) =&gt; {

        process.stdout.write(chunks);
    });
});

reqPost.write(payload);
reqPost.end();

reqPost.on('error', (err) =&gt; {

    console.error(err);
});

The example sends data to the testing website. The server respons with
data which includes the payload that we have sent.

const https = require('https');

We use the https module.

payload = JSON.stringify({
    "name": "Peter",
    "age": 34
});

This is the payload to be send.

let headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload, 'utf8')
};

These are the headers. We send JSON data. We specify the content length.

let options = {
    host: 'httpbin.org',
    port: 443,
    path: '/post',
    method: 'POST',
    headers: headers
};

These are the options of the POST request. The HTTPS stardart port is 443.

let reqPost = https.request(options, (res) =&gt; {
    console.log("status code: ", res.statusCode);

    res.on('data', (chunks) =&gt; {

        process.stdout.write(chunks);
    });
});

In the data event handler of the post call, we write the data to the console.

reqPost.write(payload);

We write the payload data to the POST request.

reqPost.end();

The request is sent.

## Source

[JS HTTP module](https://nodejs.org/api/http.html)

In this article we have worked with the JavaScript HTTP module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)