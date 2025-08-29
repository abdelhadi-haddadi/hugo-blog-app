+++
title = "JavaScript JSON pretty print"
date = 2025-08-29T20:01:24.880+01:00
draft = false
description = "Learn how to pretty print JSON data in JavaScript with stylistic formatting, including indentation and coloring."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript JSON pretty print

last modified last modified October 18, 2023

 

In this article we show how to pretty print JSON data in
JavaScript. Pretty printing is a form of stylistic formatting including
indentation and colouring.

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write and for machines to parse and
generate. The official Internet media type for JSON is
application/json. The JSON filename extension is
.json.

## JSON.stringify

The JSON.stringify function converts a JavaScript object or value
to a JSON string. We can use the function to pretty print JSON output.
Note that on terminal, the console.log and console.dir
functions automatically pretty print JSON data. The output is also coloured on 
terminals that support coloured output. 

Web browsers do not automatically pretty print JSON output; we can prettify 
the JSON output with JSON.stringify.

## JS JSON pretty print with JSON.stringify

The JSON.stringify function has a space option, which inserts white
space into the output JSON string for readability purposes. The maximum value
for space is 10; a value smaller than 1 provides no space.

stringify.js
  

let data = {
    'username': 'John Doe',
    'email': 'john.doe@example.com',
    'state': 'married',
    'profiles': [
        {'name': 'jd7', 'job': 'actor' },
        {'name': 'johnd7', 'job': 'spy'}
    ],
    'active': true,
    'employed': true
};

console.log(JSON.stringify(data, null, 2));

In the example, we add 2 space characters to the JSON output. We don't use the 
replacer, so we pass null as the second argument.

$ node stringify.js 
{
  "username": "John Doe",
  "email": "john.doe@example.com",
  "state": "married",
  "profiles": [
    {
      "name": "jd7",
      "job": "actor"
    },
    {
      "name": "johnd7",
      "job": "spy"
    }
  ],
  "active": true,
  "employed": true
}

In the following example, we fetch a user from a fake service. We use the axios
library for fetching the user. Use npm i axios
to install it.

get_user.js
  

const axios = require('axios');

async function makeGetRequest() {

  let res = await axios.get('https://jsonplaceholder.typicode.com/users/2');

  let data = res.data;
  console.log(JSON.stringify(data, null, 4));
}

makeGetRequest();

We fetch a single user from the using the fake API 
https://jsonplaceholder.typicode.com/users/2 URL. We use four
spaces for indentation.

$ node get_user.js 
{
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
        }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
    }
}

In the next example, we retrieve data with the fetch function 
inside a browser. We prettify the output with JSON.stringify.

test.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;script&gt;
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response =&gt; response.json())
            .then(json =&gt;
                document.body.appendChild(document.createElement('pre')).innerHTML = JSON.stringify(json, null, 4));
    &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;

We fetch one todo object from the testing website.

## Source

[JSON.stringify documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

In this article we have prettified JSON output in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)