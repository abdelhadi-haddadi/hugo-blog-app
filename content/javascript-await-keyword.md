+++
title = "JavaScript await keyword"
date = 2025-08-29T20:01:07.884+01:00
draft = false
description = "Understand how to use the await keyword in JavaScript for working with promises, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript await keyword

last modified April 16, 2025

In this article we show how to work with asynchronous operations using the
await keyword in JavaScript.

## The await keyword

The await keyword is used to pause the execution of an async
function until a Promise is resolved. It can only be used inside async
functions. This makes asynchronous code look and behave more like synchronous
code.

When await is used, it waits for the Promise to settle. If the
Promise resolves, it returns the resolved value. If rejected, it throws the
rejection value. This simplifies working with Promises and avoids callback
hell.

The await keyword is always used with Promises. It makes
asynchronous code more readable and maintainable. Error handling can be done
with try/catch blocks, similar to synchronous code.

## Basic await example

The following example demonstrates the basic usage of the await
keyword with a simple Promise.

main.js
  

async function fetchData() {
    const data = await new Promise((resolve) =&gt; {
        setTimeout(() =&gt; resolve('Data received'), 1000);
    });
    console.log(data);
}

fetchData();

This example creates a Promise that resolves after 1 second. The await
keyword pauses execution until the Promise resolves. The resolved value is then
assigned to the data variable. Finally, the value is logged to the console.

$ node main.js
Data received

## Await with fetch API

The await keyword is commonly used with the Fetch API.

main.js
  

async function getUser() {
    const response = await fetch('https://api.github.com/users/octocat');
    const data = await response.json();
    console.log(data.name);
}

getUser();

This example fetches user data from GitHub's API. The first await
waits for the fetch request to complete. The second await waits
for the response to be converted to JSON. This shows how await can chain
asynchronous operations cleanly.

$ node main.js
The Octocat

## Error handling with try/catch

Error handling with await can be done using try/catch blocks.

main.js
  

async function fetchWithErrorHandling() {
    try {
        const response = await fetch('https://invalid.url');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchWithErrorHandling();

This example demonstrates error handling when a fetch request fails. The
try block contains the asynchronous operations. If any Promise rejects,
execution jumps to the catch block. This provides a clean way to handle
errors in async code.

$ node main.js
Error: fetch failed

## Await with multiple Promises

Multiple Promises can be awaited either sequentially or in parallel.

main.js
  

async function getMultipleData() {
    const promise1 = Promise.resolve('First');
    const promise2 = Promise.resolve('Second');
    
    const result1 = await promise1;
    const result2 = await promise2;
    
    console.log(result1, result2);
}

getMultipleData();

This example shows sequential awaiting of multiple Promises. Each await
pauses execution until its Promise resolves. For parallel execution,
Promise.all() would be more efficient. This demonstrates the
basic pattern of awaiting multiple operations.

$ node main.js
First Second

## Await with Promise.all

Promise.all() can be used with await for parallel
execution.

main.js
  

async function fetchInParallel() {
    const urls = [
        'https://api.github.com/users/octocat',
        'https://api.github.com/users/torvalds'
    ];
    
    const promises = urls.map(url =&gt; fetch(url).then(res =&gt; res.json()));
    const results = await Promise.all(promises);
    
    results.forEach(user =&gt; console.log(user.name));
}

fetchInParallel();

This example fetches data from multiple URLs in parallel. Promise.all()
waits for all Promises to resolve. The await pauses until all
requests complete. This is more efficient than awaiting each request
sequentially.

$ node main.js
The Octocat
Linus Torvalds

## Await in top-level code

In modern JavaScript, await can be used in top-level code.

main.js
  

const data = await Promise.resolve('Top-level await');
console.log(data);

This example demonstrates top-level await, available in ES modules. The
await keyword can be used outside async functions in module
scope. This simplifies initialization code that needs to wait for async
operations.

$ node main.js
Top-level await

## Practical use case: file reading

Here's a practical example of using await with file operations.

main.js
  

import { promises as fs } from 'fs';

async function readFiles() {
    try {
        const content = await fs.readFile('example.txt', 'utf-8');
        console.log(content);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

readFiles();

This example reads a file asynchronously using Node.js fs module. The
await keyword waits for the file reading operation to complete.
Error handling is done with try/catch. This shows a common real-world use
case for await.

$ node main.js
File content here...

## Source

[await - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

In this article we have demonstrated how to use the await keyword for
asynchronous programming in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)