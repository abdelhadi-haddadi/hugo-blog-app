+++
title = "Axios tutorial"
date = 2025-08-29T20:01:09.022+01:00
draft = false
description = "Learn how to make GET and POST requests in JavaScript using the Axios library, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Axios tutorial

last modified last modified October 18, 2023

 

Axios tutorial shows how to generage requests in JavaScript using Axios client
library. Check the [JavaScript fetch](/javascript/fetch/) tutorial
for an alternative way of creating requests in JavaScript.

## Axios

Axios is a promise based HTTP client for the browser and Node.js.
Axios makes it easy to send asynchronous HTTP requests to REST endpoints and
perform CRUD operations. It can be used in plain JavaScript or with a library
such as Vue or React.

In this article we work with Axios in a Node.js application.

## Setting up Axios

First, we install Axios.

$ node -v
v18.2.0

We use Node.js version 18.2.0.

$ npm init -y

We initiate a new Node.js application.

$ npm i axios

We install Axios with npm i axios command.

## Axios making requests

There are multiple methods for creating requests in axios.

axios(config) 
axios(url[, config])

These are basic methods for generating requests in axios.

axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

These are method aliases, created for convenience.

## Axios Response object

When we send a request to a server, it returns a response. The Axios response object
consists of:

  - data - the payload returned from the server

  - status - the HTTP code returned from the server

  - statusText - the HTTP status message returned by the server

  - headers - headers sent by server

  - config - the original request configuration

  - request - the request object

## Axios GET request with callbacks

In the first example, we create a simple GET request. We use callbacks.

main.js
  

const axios = require('axios');

axios.get('http://webcode.me').then(resp =&gt; {

    console.log(resp.data);
});

We generate a simple GET request and show the output.

const axios = require('axios');

The Axios library is included.

axios.get('http://webcode.me').then(resp =&gt; {

    console.log(resp.data);
});

With get, we send a GET request. We output the data from the
response. The data is HTML code.

$ node main.js
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge"&gt;
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

## Axios GET request with async/await

The following example creates the same request. This time
we use async/await syntax.

main.js
  

const axios = require('axios');

async function doGetRequest() {

  let res = await axios.get('http://webcode.me');

  let data = res.data;
  console.log(data);
}

doGetRequest();

The example creates a simple GET request utilizing async/await
syntax.

## Axios basic API

The get, post, or delete methods are
convenience methods for the basic axios API: axios(config)
and axios(url, config).

main.js
  

const axios = require('axios');

async function makeRequest() {

    const config = {
        method: 'get',
        url: 'http://webcode.me'
    }

    let res = await axios(config)

    console.log(res.status);
}

makeRequest();

The example creates a GET request to webcode.me.

const config = {
    method: 'get',
    url: 'http://webcode.me'
}

We specify the details of the request in the configuration object.

## Axios HEAD request

A HEAD request is a GET request without a message body. In Axios, a HEAD
request is created with head.

main.js
  

const axios = require('axios');

async function doHeadRequest() {

  let res = await axios.head('http://webcode.me');

  console.log(`Status: ${res.status}`)
  console.log(`Server: ${res.headers.server}`)
  console.log(`Date: ${res.headers.date}`)
}

doHeadRequest();

The example shows the status, server name, response date from
a response generated with a HEAD request.

$ node main.js
Status: 200
Server: nginx/1.6.2
Date: Sun, 19 Jun 2022 12:49:06 GMT

## Axios status code

HTTP response status codes indicate whether a specific HTTP request has been
successfully completed. Responses are grouped in five classes:

    - Informational responses (100–199)

    - Successful responses (200–299)

    - Redirects (300–399)

    - Client errors (400–499)

    - Server errors (500–599)

main.js
  

const axios = require('axios');

async function makeRequest() {

    const config = {
        method: 'head',
        url: 'http://webcode.me'
    }

    let res = await axios(config)

    console.log(res.status);
}

makeRequest();

We get the status code from the status property of the response.

$ node main.js
200

## Axios custom header

In the following example, we send a custom header.

main.js
  

const axios = require('axios');

async function makeRequest() {

    const config = {
        method: 'get',
        url: 'http://webcode.me',
        headers: { 'User-Agent': 'Axios - console app' }
    }

    let res = await axios(config)

    console.log(res.request._header);
}

makeRequest();

The example sends a customized header.

const config = {
    method: 'get',
    url: 'http://webcode.me',
    headers: { 'User-Agent': 'Axios- console app' }
}

The custom data is added to the headers attribute of the
configuration object.

console.log(res.request._header);

We verify the sent data.

$ node main.js
GET / HTTP/1.1
Accept: application/json, text/plain, */*
User-Agent: Console app
Host: webcode.me
Connection: close

## Axios GET request query parameters

In the following example, we append some query parameters to the URL. 

main.js
  

const axios = require('axios');
const url = require('url');

async function doGetRequest() {

    let payload = { name: 'John Doe', occupation: 'gardener' };

    const params = new url.URLSearchParams(payload);

    let res = await axios.get(`http://httpbin.org/get?${params}`);

    let data = res.data;
    console.log(data);
}

doGetRequest();

We use the URLSearchParams of the url module to
transform the JSON object into suitable URL query form. 

$ node main.js
{
  args: { name: 'John Doe', occupation: 'gardener' },
  headers: {
    Accept: 'application/json, text/plain, */*',
    Host: 'httpbin.org',
    'User-Agent': 'axios/0.21.1',
    'X-Amzn-Trace-Id': 'Root=1-6023ba22-48b1ff807ea9d934457abbcd'
  },
  ...
  url: 'http://httpbin.org/get?name=John+Doe&amp;occupation=gardener'
}

## Getting Github information

Many online services contain public APIs. In the following example,
we generate a request to a Github API.

main.js
  

const axios = require('axios');

async function getNumberOfFollowers() {

  let res = await axios.get('https://api.github.com/users/janbodnar');

  let nOfFollowers = res.data.followers;
  let location = res.data.location;

  console.log(`# of followers: ${nOfFollowers}`)
  console.log(`Location: ${location}`)
}

getNumberOfFollowers();

In the example, we get the number of followers and location of a user.

$ node main.js 
# of followers: 324
Location: Bratislava

## Axios POST JSON request

A POST request is created with post method.

Axios automatically serializes JavaScript objects to JSON when passed to the  
post function as the second parameter; we do not need to serialize
POST bodies to JSON.

main.js
  

const axios = require('axios');

async function doPostRequest() {

    let payload = { name: 'John Doe', occupation: 'gardener' };

    let res = await axios.post('http://httpbin.org/post', payload);

    let data = res.data;
    console.log(data);
}

doPostRequest();

The example creates a POST request to an online testing service. The payload 
is the second parameter to the post function.

$ node main.js
{
  args: {},
  data: '{"name":"John Doe","occupation":"gardener"}',
  files: {},
  form: {},
  headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Length': '43',
      'Content-Type': 'application/json',
      Host: 'httpbin.org',
      'User-Agent': 'axios/0.27.2',
      'X-Amzn-Trace-Id': 'Root=1-62af1bac-13b255536674047051875828'
  },
  json: { name: 'John Doe', occupation: 'gardener' },
  ...
  url: 'http://httpbin.org/post'
}

## Axios POST FORM request

In the following example, we generate a POST request with form data.

$ npm i form-data

We install the form-data module.

With application/x-www-form-urlencoded the data is sent in the body of the
request; the keys and values are encoded in key-value tuples separated by
'&amp;', with a '=' between the key and the value. 

main.js
  

const axios = require('axios');
const FormData = require('form-data');

async function doPostRequest() {

    const form_data = new FormData();
    form_data.append('name', 'John Doe');
    form_data.append('occupation', 'gardener');

    let res = await axios.post('http://httpbin.org/post', form_data, 
        { headers: form_data.getHeaders() });

    let data = res.data;
    console.log(data);
}

doPostRequest();

To produce form data in the appropriate format, we use the FormData object. 

$ node main.js
{
  args: {},
  data: '',
  files: {},
  form: { name: 'John Doe', occupation: 'gardener' },
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Length': '284',
    'Content-Type': 'multipart/form-data; boundary=--------------------------487292688876562281304473',
    Host: 'httpbin.org',
    'User-Agent': 'axios/0.27.2',
    'X-Amzn-Trace-Id': 'Root=1-62af1c03-32fb934410edf8130cabe019'
  },
  json: null,
  ...
  url: 'http://httpbin.org/post'
}

## Axios download image

The following example shows how to download an image with Axios.

main.js
  

const axios = require('axios');
const fs = require('fs');

var config = {
    responseType: 'stream'
};

let url = 'https://images.dog.ceo/breeds/setter-english/n02100735_4870.jpg';

async function getImage() {

    let resp = await axios.get(url, config);
    resp.data.pipe(fs.createWriteStream('image.jpg'));
}

getImage();

The example retrieves an image from an online service, which keeps images of dogs.

const axios = require('axios');
const fs = require('fs');

We include axios and fs modules.

var config = {
    responseType: 'stream'
};

We specify the response type in the configuration object.

let resp = await axios.get(url, config);

We get the image.

resp.data.pipe(fs.createWriteStream('image.jpg'));

With the help of the fs module, we save the image to disk.

## Axios multiple requests

We can create multiple requests in one shot with Axios.

main.js
  

const axios = require('axios');

async function doRequests(urls) {

    const fetchUrl = (url) =&gt; axios.get(url);
    const promises = urls.map(fetchUrl);

    let responses = await Promise.all(promises);

    responses.forEach(resp =&gt; {
        let msg = `${resp.config.url} -&gt; ${resp.headers.server}: ${resp.status}`;
        console.log(msg);
    });
}

let urls = [
    'http://webcode.me',
    'https://example.com',
    'http://httpbin.org',
    'https://clojure.org',
    'https://fsharp.org',
    'https://symfony.com',
    'https://www.perl.org',
    'https://www.php.net',
    'https://www.python.org',
    'https://code.visualstudio.com',
    'https://github.com'
];

doRequests(urls);

The example generates async requests to the given list of urls. It prints
the web site's url, server name, and status code.

const fetchUrl = (url) =&gt; axios.get(url);

The axios.get makes an async request and returns a promise.

let responses = await Promise.all(promises);

We collect all promises with Promise.All. The method resolves after
all of the given promises have either fulfilled or rejected.

$ node multiple_requests.js
http://webcode.me -&gt; nginx/1.6.2: 200
https://example.com -&gt; ECS (dcb/7F83): 200
http://httpbin.org -&gt; gunicorn/19.9.0: 200
https://clojure.org -&gt; AmazonS3: 200
https://fsharp.org -&gt; GitHub.com: 200
https://symfony.com -&gt; cloudflare: 200
https://www.perl.org -&gt; Combust/Plack (Perl): 200
https://www.php.net -&gt; myracloud: 200
https://www.python.org -&gt; nginx: 200
https://code.visualstudio.com -&gt; Microsoft-IIS/10.0: 200
https://github.com -&gt; GitHub.com: 200

## Using Axios with JSON Server

JSON Server is a wonderful tool, which allows us to create fake REST APIs
easily.

$ npm i -g json-server

We install json-server.

users.json
  

{
  "users": [
    {
      "id": 1,
      "first_name": "Robert",
      "last_name": "Schwartz",
      "email": "rob23@gmail.com"
    },
    {
      "id": 2,
      "first_name": "Lucy",
      "last_name": "Ballmer",
      "email": "lucyb56@gmail.com"
    },
    {
      "id": 3,
      "first_name": "Anna",
      "last_name": "Smith",
      "email": "annasmith23@gmail.com"
    },
    {
      "id": 4,
      "first_name": "Robert",
      "last_name": "Brown",
      "email": "bobbrown432@yahoo.com"
    },
    {
      "id": 5,
      "first_name": "Roger",
      "last_name": "Bacon",
      "email": "rogerbacon12@yahoo.com"
    }
  ]
}

This is our test data.

### Starting JSON server

The JSON server is started with the json-server, which we have installed globally.

$ json-server --watch users.json    

The --watch option is used to specify the data for the server.

$ curl localhost:3000/users/2/
{
  "id": 2,
  "first_name": "Lucy",
  "last_name": "Ballmer",
  "email": "lucyb56@gmail.com"
}

With the curl command, we get the user with Id 2.

## Posting a user

We post a new user.

main.js
  

const axios = require('axios');

async function makePostRequest() {

    params = {
        id: 6,
        first_name: 'Fred',
        last_name: 'Blair',
        email: 'freddyb34@gmail.com'
      }

    let res = await axios.post('http://localhost:3000/users/', params);

    console.log(res.data);
}

makePostRequest();

The example posts a new user.

let res = await axios.post('http://localhost:3000/users/', params);

The post parameters are passed as the second parameter to the post
method.

### Getting users

We get users from the test server.

main.js
  

const axios = require('axios');

async function doGetRequest() {

  let res = await axios.get('http://localhost:3000/users/');

  let data = res.data;
  console.log(data);
}

doGetRequest();

This program retrieves all users from our test server.

$ node main.js
[ { id: 1,
    first_name: 'Robert',
    last_name: 'Schwartz',
    email: 'rob23@gmail.com' },
  { id: 2,
    first_name: 'Lucy',
    last_name: 'Ballmer',
    email: 'lucyb56@gmail.com' },
  { id: 3,
    first_name: 'Anna',
    last_name: 'Smith',
    email: 'annasmith23@gmail.com' },
  { id: 4,
    first_name: 'Robert',
    last_name: 'Brown',
    email: 'bobbrown432@yahoo.com' },
  { id: 5,
    first_name: 'Roger',
    last_name: 'Bacon',
    email: 'rogerbacon12@yahoo.com' },
  { id: 6,
    first_name: 'Fred',
    last_name: 'Blair',
    email: 'freddyb34@gmail.com' } ]

## Deleting a user

A resource is deleted with delete.

main.js
  

const axios = require('axios');

async function doDeleteRequest() {

    let res = await axios.delete('http://localhost:3000/users/2/');

    console.log(res.status);
}

doDeleteRequest();

The example deletes the user with Id 2.

## Axios proxy

A proxy is an intermediary between a client requesting a resource and the server
providing that resource. 

main.js
  

const axios = require('axios');

async function doGetRequest() {

    let host = 'proxy';
    let port = 8080;

    const res = await axios.get('http://webcode.me', {
        proxy: {
            host: host,
            port: port 
        }
    });

    console.log(res.data);
}

doGetRequest();

The example creates a web request through a proxy.

## Source

[Axois documentation](https://axios-http.com/docs/intro)

In this article we have worked with JavaScript Axios module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)