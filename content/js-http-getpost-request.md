+++
title = "JS HTTP GET/POST request"
date = 2025-08-29T20:01:21.303+01:00
draft = false
description = "Understand how to send HTTP GET and POST requests in JavaScript using Fetch API and Axios, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JS HTTP GET/POST request

last modified last modified October 18, 2023

 

In this article we show how to create HTTP GET and POST requests in JavaScript.
We use the Fetch API and the Axios library.

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP protocol is the foundation of data communication for the World Wide Web.

## HTTP GET

The HTTP GET method requests a representation of the specified resource. 
Requests using GET should only retrieve data.

## HTTP POST

The HTTP POST method sends data to the server. It is often used when 
uploading a file or when submitting a completed web form.

## The Fetch API

The Fetch API provides a JavaScript interface for accessing and manipulating
parts of the HTTP pipeline, such as requests and responses. The API originates
in the browser. 

The fetch is a global function which takes url and options
parameters and returns a promise. The promise resolves to the response of the
request. 

let promise = fetch(url, [options])

If we do not provide the options, a simple GET request downloading
the contents of the url is generated.

## Axios

Axios is a promise based HTTP client for the browser and Node.js.
Axios makes it easy to send asynchronous HTTP requests to REST endpoints and
perform CRUD operations. It can be used in plain JavaScript or with a library
such as Vue or React.

## JS fetch GET request

The following example creates a simple GET request and processes the result 
as text.

&lt;script&gt;
    async function doRequest() {
        let url = 'http://webcode.me';
        let res = await fetch(url);

        if (res.ok) {

            let text = await res.text();

            return text;
        } else {
            return `HTTP error: ${res.status}`;
        }
    }

    doRequest().then(data =&gt; {
        console.log(data);
    });

&lt;/script&gt;

We get the contents of the webcode.me webpage.

let url = 'http://webcode.me';
let res = await fetch(url);

The fetch method takes only the URL as parameter. In such a case, 
the default request is the GET request.

let text = await res.text();

We get the body from the request as plain text.

## JS fetch POST request

In the next example we create a POST request with JSON data.

&lt;script&gt;
    async function doRequest() {

        let url = 'http://httpbin.org/post';
        let data = {'name': 'John Doe', 'occupation': 'John Doe'};

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {

            // let text = await res.text();
            // return text;

            let ret = await res.json();
            return JSON.parse(ret.data);

        } else {
            return `HTTP error: ${res.status}`;
        }
    }

    doRequest().then(data =&gt; {
        console.log(data);
    });

&lt;/script&gt;

The POST request is sent to http://httpbin.org/post.

let data = {'name': 'John Doe', 'occupation': 'John Doe'};

This is the data to be sent.

let res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});

We set the method parameter to POST and choose the 
application/json for the content type. The data is stringified 
to the body parameter.

let ret = await res.json();
return JSON.parse(ret.data);

We get the data back as JSON string and parse it into the JSON object.

## JS GET request with Axios

The following example creates a GET reqeust with Axios library.

$ npm i axios

We install the Axios module.

main.js
  

const axios = require('axios');

async function doGetRequest() {

  let res = await axios.get('http://webcode.me');

  let data = res.data;
  console.log(data);
}

doGetRequest();

The example retrieves a home page from a simple website. It uses the
async/await syntax.

## JS POST request with Axios

In the following example, we generate a POST request with form data.

$ npm i axios form-data

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

## Source

[Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

In this article we created HTTP GET/POST requests in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)