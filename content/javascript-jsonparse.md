+++
title = "JavaScript JSON.parse"
date = 2025-08-29T20:01:25.982+01:00
draft = false
description = "Explore how to use JSON.parse in JavaScript to convert JSON strings into objects, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript JSON.parse

last modified last modified October 18, 2023

 

In this article we show how to parse JSON strings into JavaScript
objects.

## JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write and for machines to parse and
generate. The official Internet media type for JSON is
application/json. The JSON filename extension is
.json.

## JS JSON.parse

The JSON.parse method parses a JSON string and creates a JavaScript
value or object described by the string. An optional reviver function can be
provided to perform a transformation on the resulting object before it is
returned. The reverse operation is performed with JSON.stringify.

## JSON.parse values

In the first example, we parse JSON strings into JavaScript values.

parse_values.js
  

console.log(JSON.parse('-3'));
console.log(JSON.parse('12'));
console.log(JSON.parse('true'));
console.log(JSON.parse('"falcon"'));

The example parses and prints integers, a boolean value, and a string.

$ node parse_values.js
-3
12
true
falcon

## JSON.parse array

The next example parses a JSON array string into a JavaScript array.

parse_array.js
  

let data = `[
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
  }
]`;

let users = JSON.parse(data);

console.log(typeof users)
console.log('-------------------');
console.log(users[1])
console.log('-------------------');
console.log(users);

We have a JSON string consisting of users. The string is parsed into a
JavaScript array.

let users = JSON.parse(data);

The data is parsed.

console.log(typeof users)

We determine the data type of the returned data.

console.log(users[1])

We print the second user.

console.log(users);

We print the whole array.

$ node parse_array.js 
object
-------------------
{
  id: 2,
  first_name: 'Lucy',
  last_name: 'Ballmer',
  email: 'lucyb56@gmail.com'
}
-------------------
[
  {
    id: 1,
    first_name: 'Robert',
    last_name: 'Schwartz',
    email: 'rob23@gmail.com'
  },
  {
    id: 2,
    first_name: 'Lucy',
    last_name: 'Ballmer',
    email: 'lucyb56@gmail.com'
  },
  {
    id: 3,
    first_name: 'Anna',
    last_name: 'Smith',
    email: 'annasmith23@gmail.com'
  }
]

## JSON.parse nested arrays

In the next example, we parse JSON data that contains nested arrays.

parse_nested_array.js
  

let user = `{
    "username": "John Doe",
    "email": "john.doe@example.com",
    "state": "married",
    "profiles": [
        {"name": "jd7", "job": "actor" },
        {"name": "johnd7", "job": "spy"}
    ],
    "active": true,
    "employed": true
}`;

let data = JSON.parse(user);

function printValues(obj) {
    for(var k in obj) {
        if(obj[k] instanceof Object) {
            printValues(obj[k]);
        } else {
            console.log(obj[k]);
        };
    }
};

printValues(data);

console.log('-------------------');

Object.entries(data).map((e) =&gt; {
    console.log(e);
});

We go over the parsed JSON object with a recursive printValues
function and the Object.entries function.

$ node parse_nested_arrays.js 
John Doe
john.doe@example.com
married
jd7
actor
johnd7
spy
true
true
-------------------
[ 'username', 'John Doe' ]
[ 'email', 'john.doe@example.com' ]
[ 'state', 'married' ]
[
  'profiles',
  [ { name: 'jd7', job: 'actor' }, { name: 'johnd7', job: 'spy' } ]
]
[ 'active', true ]
[ 'employed', true ]

## JSON.parse reviver function

The JSON.parse function can take an optional reviver function as
the second parameter. It can perform a transformation on the resulting object
before it is returned.

reviver.js
  

let data = '{ "name": "John Doe", "dateOfBirth": "1976-12-01", "occupation": "gardener"}';

let user = JSON.parse(data, (k, v) =&gt; {

  if (k == "dateOfBirth") {
    return new Date(v);
  } else {
    return v;
  }
});

console.log(user);

In the example, we use the reviver function to transform a string property into
a date.

## JSON.stringify

The JSON.stringify function converts a JavaScript object or value
to a JSON string.

stringify.js
  

let users = [
    {
        id: 1,
        first_name: 'Robert',
        last_name: 'Schwartz',
        email: 'rob23@gmail.com'
    },
    {
        id: 2,
        first_name: 'Lucy',
        last_name: 'Ballmer',
        email: 'lucyb56@gmail.com'
    },
    {
        id: 3,
        first_name: 'Anna',
        last_name: 'Smith',
        email: 'annasmith23@gmail.com'
    }
];

let data = JSON.stringify(users, null, 2);

console.log(typeof data);
console.log(typeof users);
console.log('------------------');
console.dir(data);
console.log('------------------');
console.dir(users);

In the example, we have an array of users. We transform the array into a JSON
string with the JSON.stringify function.

$ node stringify.js 
string
object
------------------
'[\n' +
  '  {\n' +
  '    "id": 1,\n' +
  '    "first_name": "Robert",\n' +
  '    "last_name": "Schwartz",\n' +
  '    "email": "rob23@gmail.com"\n' +
  '  },\n' +
  '  {\n' +
  '    "id": 2,\n' +
  '    "first_name": "Lucy",\n' +
  '    "last_name": "Ballmer",\n' +
  '    "email": "lucyb56@gmail.com"\n' +
  '  },\n' +
  '  {\n' +
  '    "id": 3,\n' +
  '    "first_name": "Anna",\n' +
  '    "last_name": "Smith",\n' +
  '    "email": "annasmith23@gmail.com"\n' +
  '  }\n' +
  ']'
------------------
[
  {
    id: 1,
    first_name: 'Robert',
    last_name: 'Schwartz',
    email: 'rob23@gmail.com'
  },
  {
    id: 2,
    first_name: 'Lucy',
    last_name: 'Ballmer',
    email: 'lucyb56@gmail.com'
  },
  {
    id: 3,
    first_name: 'Anna',
    last_name: 'Smith',
    email: 'annasmith23@gmail.com'
  }
]

## Source

[JSON.parse - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

In this article we have parsed JSON strings into JavaScript objects with
the JSON.parse function.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)