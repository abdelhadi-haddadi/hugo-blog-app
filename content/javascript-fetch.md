+++
title = "JavaScript fetch"
date = 2025-08-29T20:01:17.961+01:00
draft = false
description = "JavaScript fetch tutorial shows how to fetching resources asynchronously in JavaScript using the fetch API."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript fetch

last modified last modified October 18, 2023

 

In this article we show how to fetching resources asynchronously in
JavaScript using the fetch API.

## The fetch function

The fetch is a global function which takes url and options
parameters and returns a promise. The promise resolves to the response of the
request. 

let promise = fetch(url, [options])

If we do not provide the options, a simple GET request downloading
the contents of the url is generated.

When we get the response we can check HTTP status or the headers, but we don't
have the body yet. To get the body of the response, we call one of the following
methods:

    - response.text() – read the response as text

    - response.json() – parse the response as JSON

    - response.formData() – return the response as FormData object

    - response.blob() – return the response as Blob

    response.arrayBuffer() – return the response as ArrayBuffer 
        (low-level representation of binary data)

The fetch function can be used with callbacks and also with 
async/await keywords.

## JavaScript fetch simple example

In the first example, we generate a simple asynchronous GET request with the
fetch function.

&lt;script&gt;
    fetch('http://time.jsontest.com')
        .then(res =&gt; res.json())
        .then((data) =&gt; {

            console.log(data);
        }).catch(err =&gt; console.error(err));
&lt;/script&gt;

In this example, we use callbacks. The time.jsontest.com returns
the current time in JSON format. From the response object, we retrieve the data 
with json function.

Object { date: "01-26-2021", milliseconds_since_epoch: 1611661589016, 
    time: "11:46:29 AM" }

We check the console output in our browser.

&lt;script&gt;

    async function doRequest() {
        let url = 'http://time.jsontest.com';
        let res = await fetch(url);

        if (res.ok) {

            let json = await res.json();

            return json;
        } else {
            return `HTTP error: ${res.status}`;
        }
    }

    doRequest().then(data =&gt; {
        console.log(data);
    });

&lt;/script&gt;

In this example we use the async/await keywords.

if (res.ok) {

The ok property returns a boolean true for the HTTP status code
200-299.

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

This is the output that we can see in the browser console window.

## JS fetch GET request with query parameters

In the following example, we append some query parameters to the URL. 

&lt;script&gt;
    async function doRequest() {

        let url = new URL('http://httpbin.org/get');
        let params = {'name': 'John Doe', 'occupation': 'John Doe'};
        url.search = new URLSearchParams(params);

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

We use the URLSearchParams to transform the JSON object into 
suitable URL query form.

{
  "args": {
    "name": "John Doe", 
    "occupation": "John Doe"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Accept-Language": "en-US,en;q=0.5", 
    "Host": "httpbin.org", 
    "Origin": "null", 
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0", 
    "X-Amzn-Trace-Id": "Root=1-600ff33e-71b89c984ad2878035263a8b"
  }, 
  ...
  "url": "http://httpbin.org/get?name=John+Doe&amp;occupation=John+Doe"
}

We get this output from the httpbin.org webpage.

## JS fetch get image

The following example retrieves an image and displays it on the page.

&lt;script&gt;
    async function doRequest() {
        let url = 'https://dummyimage.com/100x100/499deb/fff';
        let res = await fetch(url);
        let blob = await res.blob(); 

        return blob;
    }

    doRequest().then(blob =&gt; {

        let img = document.createElement('img');
        document.body.append(img);

        img.src = URL.createObjectURL(blob);
    });
&lt;/script&gt;

The example uses the  dummyimage.com webpage to get the image. It
is a small test page for testing purposes.

let blob = await res.blob(); 

To get the image data, we call the blob function.

let img = document.createElement('img');
document.body.append(img);

We programatically create the img tag.

img.src = URL.createObjectURL(blob);

We create the image with the createObjectURL function.

## JS fetch JSON POST request

The following example generates a POST request with JSON data.

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

The request is sent to http://httpbin.org/post.

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

Object { name: "John Doe", occupation: "John Doe" }

## JS fetch POST form data

In the following example, we generate a POST request with form data.

With application/x-www-form-urlencoded the data is sent in the body
of the request; the keys and values are encoded in key-value tuples separated by
'&amp;', with a '=' between the key and the value. 

&lt;script&gt;
    async function doRequest() {

        let url = 'http://httpbin.org/post';

        let formData = new FormData();
        formData.append('name', 'John Doe');
        formData.append('occupation', 'gardener');

        let res = await fetch(url, {
            method: 'POST',
            body: formData,
        });

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

To produce form data in the appropriate format, we use the FormData
object.

{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "name": "John Doe", 
    "occupation": "gardener"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Accept-Language": "en-US,en;q=0.5", 
    "Content-Length": "305", 
    "Content-Type": "multipart/form-data; ... 
    "Host": "httpbin.org", 
    "Origin": "null", 
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0", 
    "X-Amzn-Trace-Id": "Root=1-600ff649-4cd21c6a503e694211f73b0c"
  }, 
  "json": null, 
  ...
  "url": "http://httpbin.org/post"
}

## Source

[Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

In this article we have worked with the JavaScript fetch API.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)