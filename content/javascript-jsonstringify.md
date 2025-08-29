+++
title = "JavaScript JSON.stringify"
date = 2025-08-29T20:01:24.866+01:00
draft = false
description = "Understand how to use JSON.stringify in JavaScript to convert objects into JSON strings, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript JSON.stringify

last modified last modified October 18, 2023

 

In this article we show how to convert JavaScript objects into
JSON strings.

## JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. People can easily read and write JSON. It is also easy to create
algorithms for parsing and generating JSON. The official Internet media type for
JSON is application/json. JSON files have extension
.json.

JavaScript provides the following methods for working with JSON:

  - JSON.stringify - converts JS objects into JSON

  - JSON.parse - converts JSON back into a JS object

## JS JSON.stringify

The JSON.stringify method converts a JavaScript object or value to
a JSON string. It can optionally modify or filter values if a replacer
function/array is specified.

let json = JSON.stringify(value [, replacer, space])

The value is the value to convert to a JSON string. The replacer is
either a function that alters the behavior of the stringification process or an
array which servers as a filter for the properties of the value object to be
included in the JSON string.

## JSON.stringify simple values

In the first example, we stringify simple values.

simple_values.js
  

console.dir(JSON.stringify(1));
console.dir(JSON.stringify(5.9));
console.dir(JSON.stringify(true));
console.dir(JSON.stringify(false));
console.dir(JSON.stringify('falcon'));
console.dir(JSON.stringify("sky"));
console.dir(JSON.stringify(null));

The example stringifies simple values, including numbers, booleans, and strings.

$ node simple_values.js 
'1'
'5.9'
'true'
'false'
'"falcon"'
'"sky"'
'null'

## JSON.stringify objects

In the next example, we stringify objects.

objects.js
  

console.dir(JSON.stringify({ x: 5, y: 6 }));
console.dir(JSON.stringify(new Number(6)));
console.dir(JSON.stringify(new String('falcon'))); 
console.dir(JSON.stringify(new Boolean(false)));
console.dir(JSON.stringify(new Date(2020, 0, 6, 21, 4, 5)));
console.dir(JSON.stringify(new Int8Array([1, 2, 3])));
console.dir(JSON.stringify(new Int16Array([1, 2, 3])));
console.dir(JSON.stringify(new Int32Array([1, 2, 3])));
console.dir(JSON.stringify({ x: 2, y: 3, toJSON() { return this.x + this.y; }}));

The example converts simple custom and built-in objects into JSON strings.

$ node objects.js 
'{"x":5,"y":6}'
'6'
'"falcon"'
'false'
'"2020-01-06T20:04:05.000Z"'
'{"0":1,"1":2,"2":3}'
'{"0":1,"1":2,"2":3}'
'{"0":1,"1":2,"2":3}'
'5'

## JSON.stringify array of objects

The next example transforms an array of objects into a JSON string.

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

node stringify.js 
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

## JSON.stringify replacer example

In the following example, we use the replacer function to transform the 
data. 

replacer.js
  

function replacer(key, value) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
}

var user = { name: 'John Doe', occupation: 'gardener', age: 34, 
  dob: new Date('1992-12-31') };

console.dir(JSON.stringify(user, replacer));

The replacer function turns all strings in the user object into 
uppercase.

$ node replacer.js 
'{"name":"JOHN DOE","occupation":"GARDENER","age":34,"dob":"1992-12-31T00:00:00.000Z"}'

Another form of a replacer is an array, which filters out object properties.

replacer2.js
  

var user = { name: 'John Doe', occupation: 'gardener', dob: new Date('1992-12-31') };

console.dir(JSON.stringify(user, ['name', 'occupation']));

In the example, we only include properties in the stringification process
specified in the replacer array: name and occupation.

$ node replacer2.js 
'{"name":"John Doe","occupation":"gardener"}'

## JSON.stringify pretty print

The space option is used to prettify the output. Note that 
console.log or console.dir already prettifies the 
output.

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

In the example, we retrieve data with the fetch function 
inside a browser. We prettify the output with JSON.stringify.

## Source

[JSON.stringify documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

In this article we have converted JavaScript objects into JSON strings with
the JSON.stringify function.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)