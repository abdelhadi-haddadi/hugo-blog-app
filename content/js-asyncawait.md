+++
title = "JS async/await"
date = 2025-08-29T20:01:07.880+01:00
draft = false
description = "Master asynchronous programming in JavaScript using async and await keywords, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JS async/await

last modified last modified October 18, 2023

 

In this article we show how to do asynchronous programming with async and
await keywords.

JavaScript is an asynchronous programming language. It uses promises to handle
asynchronous operations. Before introducing promises, asynchronous operations
were hadled by callbacks.

A promise is a placeholder for an asynchronous task which is yet to
be completed. (Promises are called futures in some programming languages.) The
async and await keywords enable asynchronous,
promise-based behavior to be written in a cleaner style.

With async keyword, we define an asynchronous function. Every async
function returns a promise. Async functions can contain zero or more await
expressions. The await keyword suspends execution of a function
until the returned promise is fulfilled or rejected.

The await keyword is only valid inside async functions within regular JavaScript
code.

**Note: **Async functions always return a promise. If the return
value of an async function is not explicitly a promise, it is automatically
wrapped in a promise.

## JS async/await simple example

The following is a simple asynchronous JS code utilizing async/await keywords.

main.js
  

const work = () =&gt; {
    return new Promise(resolve =&gt; {
        setTimeout(() =&gt; resolve('doing work'), 3000);
    })
}

const doWork = async () =&gt; {
    console.log(await work());
}

console.log('before');
doWork();
console.log('after');

In the example, we have one asynchronous function.

const work = () =&gt; {
    return new Promise(resolve =&gt; {
        setTimeout(() =&gt; resolve('doing work'), 3000);
    })
}

The work function is a dummy function which represents a task 
lasting three seconds. 

const doWork = async () =&gt; {
    console.log(await work());
}

The doWork is an async function which calls work. With
await, it suspends execution until the work function
is resolved.

doWork();

The doWork function is called.

$ node simple.js 
before
after
doing work

Note that the 'doing work' message is printed after console.log
statements. So esentially, the doWork function does not block 
the statements in the main.js file.

Before async/await keywords were introduced, callbacks were used. 

main.js
  

const work = () =&gt; {
    return new Promise(resolve =&gt; {
        setTimeout(() =&gt; resolve('doing work'), 3000);
    })
}

console.log('before');

work().then(e =&gt; {
    console.log(e);
    console.log('finished');
});

console.log('after');

This is the same example using a callback. It is more difficult to create more
complex asynchronous code with callbacks.

## JS async/await with fetch

The fetch is a global function which takes url and options
parameters and returns a promise. The promise resolves to the response of the
request.

let promise = fetch(url, [options])

If the options are not provided, a simple GET request downloading the contents
of the url is generated. 

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

An asynchronous GET request is generated with fetch in JS code in a browser.

## JS async screenshot

In the next example, we create a screenshot of a webpage. We use the Puppeteer
library.

$ npm i puppeteer

We install Puppeteer with npm i puppeteer command. 

main.js
  

const puppeteer = require('puppeteer');

(async () =&gt; {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://webcode.me');
  await page.screenshot({ path: 'webcode.png' });

  await browser.close();
})();

Inside an anonymous function, we execute several asynchronous operations. 
Each of them is awaited with await.

## Source

[JS async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

In this article we have created asynchronous JS programs with async and await 
keywords. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)