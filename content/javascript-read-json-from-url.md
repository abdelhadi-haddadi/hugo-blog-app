+++
title = "JavaScript read JSON from URL"
date = 2025-08-29T20:01:26.139+01:00
draft = false
description = "Learn how to fetch JSON data from a URL in JavaScript using Fetch API, JQuery, and XMLHttpRequest, with examples and explanations."
image = "images/javascript_json_url.png"
imageBig = "images/javascript_json_url.png"
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript read JSON from URL

last modified last modified October 18, 2023

 

In this article we show how to read data in JSON format
from the provided URL. We use JQuery, Fetch API, and XMLHttpRequest.

## URL

A Uniform Resource Locator (URL), is a reference to a web resource
that specifies its location on a computer network and a mechanism for retrieving
it. A web resource is any data that can be obtained via web, such as HTML
documents, PDF files, PNG images, JSON data, or plain text.

A generic URL has the following form:

scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]

The square brackets indicate that the part is optional. A scheme is a way of
addressing resources, such as http, ftp, mailto, or file.

The part following two slashes is called the authority part. The authority part
contains 1) an optional authentication section of a user name and password,
separated by a colon, followed by an at symbol (@) 2) a host, which is either a
host name of or an IP address, 3) an optional port number, separated from the
host by a colon.

A path is a road to the resource on the host. It may or may not resemble or map
exactly to a file system path. Query string is used to add some criteria to the
request for the resource. It is often a sequence of key/value pairs. The final
part is an optional fragment, which points to a secondary resource, such as a
heading. It is separated from the query string by a hash (#).

## JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange format.
It is easy for humans to read and write and for machines to parse and generate.
The official Internet media type for JSON is application/json.
The JSON filename extension is .json.

In our examples, we use JSON data from http://time.jsontest.com.

{
   "time": "11:27:26 AM",
   "milliseconds_since_epoch": 1494934046126,
   "date": "05-16-2017"
}

The GET request returns this JSON string.

## Reading JSON with JQuery

jQuery is a JavaScript library which is used to manipulate DOM. With
jQuery, we can find, select, traverse, and manipulate parts of a HTML document.

The JQuery $.getJSON method loads JSON-encoded data from a server
using a GET HTTP request.

jQuery.getJSON( url [, data ] [, success ] )

This is the method signature. The url parameter is a string
containing the URL to which the request is sent. The data is a
plain object or string that is sent to the server with the request. The
success is a callback function that is executed if the request
succeeds.

$.ajax({
  dataType: "json",
  url: url,
  data: data,
  success: success
});

$.getJSON is a shorthand for the above call.

js_read_json_url.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;title&gt;JavaScript - read JSON from URL&lt;/title&gt;
    &lt;script src="https://code.jquery.com/jquery-3.2.1.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;div class="mypanel"&gt;&lt;/div&gt;

    &lt;script&gt;
    $.getJSON('http://time.jsontest.com', function(data) {

        var text = `Date: ${data.date}&lt;br&gt;
                    Time: ${data.time}&lt;br&gt;
                    Unix time: ${data.milliseconds_since_epoch}`

        $(".mypanel").html(text);
    });
    &lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In the example, we read JSON data from http://time.jsontest.com.
The returned object has three attributes: date, time, and unix epoch.

var text = `Date: ${data.date}&lt;br&gt;
            Time: ${data.time}&lt;br&gt;
            Unix time: ${data.milliseconds_since_epoch}`

We build the message using the JavaScript template string.

$(".mypanel").html(text);

With JQuery's html method, we append the text to
the div tag.

![javascript_json_url.png](images/javascript_json_url.png)

Figure: Reading JSON from URL with JQuery

In the figure we can see the current date, time, and Unix time.

## Reading JSON with Fetch API

Fetch API is interface for fetching resources. It is similar to
XMLHttpRequest but its API provides a more powerful and flexible
feature set.

&lt;script&gt;
fetch('http://time.jsontest.com')
    .then(res =&gt; res.json())
    .then((out) =&gt; {
        console.log('Output: ', out);
}).catch(err =&gt; console.error(err));
&lt;/script&gt;

The example reads JSON data with Fetch API and prints the returned data to the
console. To see the output, we need to activate the developer console of our
browser.

The fetch method takes one mandatory argument, the path to the
resource we want to fetch. It returns a promise that resolves to the response of
the request.

## Reading JSON with XMLHttpRequest

XMLHttpRequest API provides client functionality for transferring
data between a client and a server. It allows an easy way to retrieve data from
a URL without having to do a full page refresh. As a consequence, a web page has
to update just a part of the page without disrupting what the user is doing.
XMLHttpRequest is used heavily in AJAX programming.

&lt;script&gt;

var getJSON = function(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function() {

        var status = xhr.status;

        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };

    xhr.send();
};

getJSON('http://time.jsontest.com',  function(err, data) {

    if (err != null) {
        console.error(err);
    } else {

        var text = `Date: ${data.date}
Time: ${data.time}
Unix time: ${data.milliseconds_since_epoch}`

        console.log(text);
    }
});

&lt;/script&gt;

This example reads JSON data with XMLHttpRequest.

var xhr = new XMLHttpRequest();

A new instance of XMLHttpRequest is created.

xhr.open('GET', url, true);

The open method initializes a request.

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

In the onload method, we wait for the response from the server.

xhr.send();

The send method sends the request; the request is asynchronous
by default.

## Source

[URL documentation](https://developer.mozilla.org/en-US/docs/Web/API/URL)

In this article we have read JSON data in JavaScript with JQuery, Fetch API,
and XMLHttpRequest.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)