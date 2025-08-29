+++
title = "JavaScript async keyword"
date = 2025-08-29T20:01:07.893+01:00
draft = false
description = "Learn how to use the async keyword in JavaScript for handling asynchronous operations, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript async keyword

last modified April 16, 2025

In this article we show how to work with asynchronous operations using the
async keyword in JavaScript.

## The async keyword

The async keyword is used to declare asynchronous functions in
JavaScript. An async function always returns a Promise, either resolved or
rejected. This allows writing asynchronous code that looks synchronous.

Async functions work with the await keyword to pause execution until
a Promise is settled. This syntax simplifies working with Promises and avoids
callback hell. Async/await makes asynchronous code easier to read and maintain.

Without async/await, asynchronous operations required chaining .then() calls or
using callbacks. The async/await syntax provides a cleaner alternative to these
patterns while maintaining the same functionality.

## Basic async function

The following example demonstrates the basic usage of the async
keyword.

main.js
  

async function greet() {
    return 'Hello, World!';
}

greet().then(message =&gt; console.log(message));

This simple async function returns a string, which is automatically wrapped in
a resolved Promise. We call the function and use .then() to handle the result.
The function appears synchronous but works asynchronously.

$ node main.js
Hello, World!

## Async function with await

The real power of async functions comes when combined with await.

main.js
  

function resolveAfter2Seconds() {
    return new Promise(resolve =&gt; {
        setTimeout(() =&gt; {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
}

asyncCall();

This example shows an async function waiting for a Promise to resolve. The
await keyword pauses execution until the Promise settles. The code
appears sequential but runs asynchronously without blocking the main thread.

$ node main.js
calling
resolved

## Error handling with try/catch

Async functions allow using try/catch blocks for error handling.

main.js
  

async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();

This example demonstrates error handling in async functions. The try block
contains asynchronous operations that might fail. Any errors are caught in the
catch block, similar to synchronous error handling.

$ node main.js
Error: TypeError: fetch failed

## Parallel execution with Promise.all

Multiple async operations can be executed in parallel using Promise.all.

main.js
  

async function fetchMultiple() {
    const [users, posts] = await Promise.all([
        fetch('https://api.example.com/users').then(res =&gt; res.json()),
        fetch('https://api.example.com/posts').then(res =&gt; res.json())
    ]);
    
    console.log('Users:', users);
    console.log('Posts:', posts);
}

fetchMultiple();

This example shows how to run multiple async operations simultaneously.
Promise.all waits for all Promises to resolve before continuing. This is more
efficient than awaiting each operation sequentially.

$ node main.js
Users: [...]
Posts: [...]

## Async arrow functions

Arrow functions can also be declared as async.

main.js
  

const fetchUser = async (userId) =&gt; {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    return response.json();
};

fetchUser(42).then(user =&gt; console.log(user));

This example demonstrates an async arrow function. The syntax is similar to
regular arrow functions but with the async keyword. The function returns a
Promise that resolves with the parsed JSON data.

$ node main.js
{ id: 42, name: 'John Doe' }

## Async class methods

Class methods can also be declared as async.

main.js
  

class DataFetcher {
    async getData(url) {
        const response = await fetch(url);
        return response.json();
    }
}

const fetcher = new DataFetcher();
fetcher.getData('https://api.example.com/data')
    .then(data =&gt; console.log(data));

This example shows an async method in a class. The method follows the same rules
as standalone async functions. It returns a Promise that resolves with the
fetched data.

$ node main.js
{ data: [...] }

## Practical use case: API requests

Here's a practical example of using async/await for API requests.

main.js
  

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.weather.com/${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const weather = await response.json();
        return weather;
    } catch (error) {
        console.error('Failed to fetch weather:', error);
        return null;
    }
}

getWeather('london').then(weather =&gt; {
    if (weather) {
        console.log(`Temperature: ${weather.temp}°C`);
    }
});

This example demonstrates a real-world async function for fetching weather data.
It includes error handling and proper response checking. The async/await syntax
makes the code more readable than Promise chaining.

$ node main.js
Temperature: 15°C

## Source

[async - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

In this article we have demonstrated how to use the async keyword for
asynchronous programming in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)