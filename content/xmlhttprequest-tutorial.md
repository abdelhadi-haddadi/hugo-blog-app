+++
title = "XMLHttpRequest tutorial"
date = 2025-08-29T20:01:44.935+01:00
draft = false
description = "Master making HTTP requests in JavaScript using XMLHttpRequest, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# XMLHttpRequest tutorial

last modified last modified October 18, 2023

 

In this article we show how to make HTTP request in JavaScript with
XMLHttpRequest.

## XMLHttpRequest

XMLHttpRequest is a built-in browser object that allows to make HTTP
requests in JavaScript. XMLHttpRequest API provides client functionality for
transferring data between a client and a server. It allows an easy way to
retrieve data from a URL without having to do a full page refresh.

As a consequence, a web page has to update just a part of the page without
disrupting what the user is doing. XMLHttpRequest is used heavily in AJAX
programming. XMLHttpRequest works in two modes of operation: synchronous and
asynchronous. Despite its name, XMLHttpRequest can operate on any data, not only
XML.

## XMLHttpRequest example

The following example creates a request to a testing site and 
returns the current datetime. 

fetch_time.js
  

let getJSON = (url, callback) =&gt; {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = () =&gt; {

        let status = xhr.status;

        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };

    xhr.send();
};

getJSON('http://time.jsontest.com', (err, data) =&gt; {

    if (err != null) {
        console.error(err);
    } else {

        let text = `Date: ${data.date}
Time: ${data.time}
Unix time: ${data.milliseconds_since_epoch}`

        console.log(text);
    }
});

This example reads JSON data with XMLHttpRequest.

let xhr = new XMLHttpRequest();

A new instance of XMLHttpRequest is created.

xhr.open('GET', url, true);

The open method initializes a GET request to the specified URL. The
third parameter true makes it an asynchronous request.

xhr.responseType = 'json';

The responseType value defines the response type.

xhr.onload = function() {

    var status = xhr.status;
    
    if (status == 200) {
        callback(null, xhr.response);
    } else {
        callback(status);
    }
};

Inside the onload method, we wait for the response from the server.

xhr.send();

The send method sends the request; the request is asynchronous by
default.

    let text = `Date: ${data.date}
Time: ${data.time}
Unix time: ${data.milliseconds_since_epoch}`

    console.log(text);

We log the date, time, and the Unix time to the console.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge"&gt;
    &lt;title&gt;Consume XML request&lt;/title&gt;

    &lt;script src="fetch_time.js"&gt;&lt;/script&gt;

&lt;/head&gt;

&lt;body&gt;

&lt;/body&gt;

&lt;/html&gt;

The code is loaded into HTML page. After we load the page in the browser, we go
to the browser console, which is available in developer tools.

## Source

[XMLHttpRequest - language reference](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

In this article we have created a HTTP request in JavaScript with
XMLHttpRequest.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)