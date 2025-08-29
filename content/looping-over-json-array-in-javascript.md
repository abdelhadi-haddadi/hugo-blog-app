+++
title = "Looping over JSON array in JavaScript"
date = 2025-08-29T20:01:24.837+01:00
draft = false
description = "Master how to loop through JSON arrays in JavaScript using the forEach method. This tutorial includes practical examples, syntax, and step-by-step guidance."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Looping over JSON array in JavaScript

last modified last modified July 5, 2025

 

In this tutorial, you'll learn how to loop through a JSON array in
JavaScript using forEach. We provide clear examples and
tips to help you handle dynamic JSON data in real-world projects.

The json-server is a lightweight **JavaScript library**
that lets you quickly set up a **mock REST API** for testing and
prototyping front-end applications. It's ideal for simulating real data without
a backend.

First, we create a project directory an install the json-server
module.

$ mkdir jsonforeach
$ cd jsonforeach
$ npm init -y
$ npm i -g json-server

The JSON server module is installed globally with npm.

## JSON test data

We have some JSON test data:

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

This is a JSON file with an array of user objects. Each object has an id,
first_name, last_name, and email field.

$ json-server --watch users.json

The --watch command is used to specify the data for the server.

$ curl localhost:3000/users/3/
{
  "id": 3,
  "first_name": "Anna",
  "last_name": "Smith",
  "email": "annasmith23@gmail.com"
}

With the curl command, we get the user with Id 3.

## JSON forEach example

In the next example we retrieve data with a GET request using fetch API. We loop
over the returned data with forEach.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;button id="log"&gt;Log&lt;/button&gt;

    &lt;script src="main.js"&gt;&lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;

This is the index.html page. By clicking on the Log
button, we fetch the data from the JSON server test data and log it into the
browser console.

main.js
  

const logBtn = document.getElementById('log');
logBtn.addEventListener('click', fetchData);

async function fetchData() {

    const response = await fetch('http://localhost:3000/users/');
    const data = await response.json();

    data.forEach(obj =&gt; {
        Object.entries(obj).forEach(([key, value]) =&gt; {
            console.log(`${key} ${value}`);
        });
        console.log('-------------------');
    });
}

The fetch function retrieves data as JSON array from the provided
URL. With forEach, we go through the array.

Object.entries(obj).forEach(([key, value]) =&gt; {
    console.log(`${key} ${value}`);
});

We go over the entries of each object and print the key and the value to
the console.

id 1 main.js:12:13
first_name Robert main.js:12:13
last_name Schwartz main.js:12:13
email rob23@gmail.com main.js:12:13
------------------- main.js:14:9
id 2 main.js:12:13
first_name Lucy main.js:12:13
last_name Ballmer main.js:12:13
email lucyb56@gmail.com main.js:12:13
------------------- main.js:14:9
...

This is the output in the browser console.

## forEach with Nested Arrays Example

In this example, we have a JSON array where each user has a nested array of
tasks. We use forEach to iterate over both the users and their
tasks, demonstrating how to handle nested data structures.

nested-app.js
  

// Sample JSON array with nested arrays
const users = [
  {
    id: 1,
    name: 'Alice',
    tasks: [
      { title: 'Fix bugs', completed: true },
      { title: 'Write tests', completed: false }
    ]
  },
  {
    id: 2,
    name: 'Bob',
    tasks: [
      { title: 'Design UI', completed: true },
      { title: 'Create mockups', completed: true }
    ]
  }
];

// Iterate over users and their tasks
users.forEach((user) =&gt; {
  console.log(`User: ${user.name}`);
  user.tasks.forEach((task, index) =&gt; {
    console.log(`  Task ${index + 1}: ${task.title} - ${task.completed ? '✅ Done' : '❌ Not done'}`);
  });
  console.log('---------------------');
});

This code defines a JSON array of users, where each user has a name and a
nested array of tasks. Each task has a title and a completion status. We use
forEach to iterate over the users and their tasks, printing the
user's name and each task's title and completion status to the console.

## Source

[Array forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

In this article we have shown how to iterate over a JSON array with
forEach.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)