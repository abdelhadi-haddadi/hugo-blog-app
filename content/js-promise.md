+++
title = "JS promise"
date = 2025-08-29T20:01:34.726+01:00
draft = false
description = "Learn how to work with JavaScript Promises for managing asynchronous operations, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JS promise

last modified last modified October 18, 2023

 

In this article we show how to work with promises in JavaScript.

A represents a potential value, or error, that will be available at some time in
the future.

A Promise can have one of the states:

    - pending - initial state, neither fulfilled nor rejected

    - fulfilled - the operation was completed successfully

    - rejected - the operation has failed

We work with promises using either callbacks or async/await keywords.

Promises are called futures in some programming languages.

## JS Promise.resolve

The Promise.resolve method returns a Promise object that is
resolved with a given value.

main.js
  

let promise = new Promise(resolve =&gt; {

    setTimeout(() =&gt; resolve(2), 2000);
});

promise.then(val =&gt; console.log(val));

console.log('finished');

We create a promise which resolves after two seconds with an integer value. The
then function attaches callbacks for the resolution and/or
rejection of the promise.

$ node main.js
finished
2

In the next example, we use the async/await keywords.

main.js
  

async function doWork() {

    let res = await promise;
    console.log(res);
}

let promise = new Promise(resolve =&gt; {

    setTimeout(() =&gt; resolve(2), 2000);
});

doWork();

console.log('finished');

The await keyword is used to wait for a Promise. It can only be
used inside an async function.

## JS promise error

The Promise.reject method returns a Promise object that is rejected
with a given reason.

main.js
  

let promise = new Promise((resolve, reject) =&gt; {

    let b = Math.random() &lt; 0.3;

    if (b) {
        resolve(10);
    } else {
        reject("promise error");
    }
});

promise.then(val =&gt; console.log(val)).catch(err =&gt; {
    console.log(`${err}`)
});

console.log('finished');

In the example, we simulate an error with Math.random. We catch
the error with catch method.

$ node main.js
finished
promise error
$ node main.js
finished
promise error
$ node main.js
finished
10

## JS chaining promises

It is possible to execute multiple asynchronous operations with chaining.

main.js
  

let p = new Promise((resolve) =&gt; {
    resolve(1);
});

let r = p.then(val =&gt; val + 2).then(val =&gt; val + 3)
    .then(val =&gt; val + 4).then(val =&gt; console.log(val));

console.log('finished');

The example adds four integers via chaining of promises.

$ node chain.js
finished
10

## JS Promise.all

The Promise.all method takes an iterable of promises as a parameter
and returns a single promise that resolves to an array of the results of the
given promises.

This returned promise resolves when all promises have resolved. It rejects
immediately upon any of the input promises rejecting with error.

main.js
  

const p1 = new Promise((resolve) =&gt; setTimeout(resolve, 100, 100));
const p2 = new Promise((resolve) =&gt; setTimeout(resolve, 300, 200));
const p3 = new Promise((resolve) =&gt; setTimeout(resolve, 500, 300));

const promises = [p1, p2, p3];

Promise.all(promises).then((data) =&gt;
    console.log(data.reduce((total, next) =&gt; total + next)));

console.log('finished');

In the example, we wait for all promises to finish and in the end, we calculate
the sum of returned values.

$ node all.js
finished
600

## JS multiple requests with axios

In the next example, we use the axois library to execute multiple get requests.
Axios is a promise-based HTTP client for Node and the browser.

$ npm i axios

We install the Axios library.

main.js
  

const axios = require('axios');

async function makeRequests(urls) {

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

makeRequests(urls);

We wait for all requests to finish with Promise.all. After
completion, we go through the array of responses and server name and response
status.

$ node main.js
http://webcode.me -&gt; nginx/1.6.2: 200
https://example.com -&gt; ECS (dcb/7ECA): 200
http://httpbin.org -&gt; gunicorn/19.9.0: 200
https://clojure.org -&gt; AmazonS3: 200
https://fsharp.org -&gt; GitHub.com: 200
https://symfony.com -&gt; cloudflare: 200
https://www.perl.org -&gt; Combust/Plack (Perl): 200
https://www.php.net -&gt; myracloud: 200
https://www.python.org -&gt; nginx: 200
https://code.visualstudio.com -&gt; Microsoft-IIS/10.0: 200
https://github.com -&gt; GitHub.com: 200

## JS create PDF with Puppeteer

In the following example, we genearate a PDF file from a webpage using
the Puppeteer library.

$ npm i puppeteer

We install Puppeteer.

main.js
  

const puppeteer = require('puppeteer');

(async () =&gt; {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://webcode.me');
  await page.pdf({ path: 'webcode.pdf', format: 'a5' });

  await browser.close();
})();

The whole task consists of several asynchronous operations, which are handled
with async/await keywords.

## Source

[JS Promise - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

In this article we have worked with promises in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)