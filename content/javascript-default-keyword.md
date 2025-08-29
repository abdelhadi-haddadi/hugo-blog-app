+++
title = "JavaScript default keyword"
date = 2025-08-29T20:01:14.556+01:00
draft = false
description = "Explore how to use the default keyword in JavaScript for handling default cases in switch statements and module exports, with examples."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript default keyword

last modified April 16, 2025

In this article we explore the default keyword in JavaScript,
covering its usage in switch statements, export/import statements, and
function parameters.

## The default keyword

The default keyword in JavaScript serves multiple purposes. It's
primarily used in switch statements as a fallback case and in module systems
for default exports/imports. It provides a way to handle unspecified cases.

In switch statements, default executes when no other cases match.
In modules, it marks the primary export/import. The keyword helps make code
more robust and flexible by providing fallback behavior.

Understanding default is crucial for writing comprehensive switch
statements and working with JavaScript modules. It's a fundamental part of
modern JavaScript development.

## Basic default in switch statement

The most common use of default is in switch statements as a fallback.

main.js
  

const day = 'Sunday';

switch (day) {
    case 'Monday':
        console.log('Start of work week');
        break;
    case 'Friday':
        console.log('End of work week');
        break;
    default:
        console.log('Weekend or other day');
}

Here, default handles any day that isn't Monday or Friday. It acts
as a catch-all for unspecified cases. The default case ensures some code always
executes, even with unexpected input.

$ node main.js
Weekend or other day

## Default export in modules

The default keyword is used to mark the primary export of a module.

math.js
  

const PI = 3.14159;

export default function circleArea(r) {
    return PI * r * r;
}

This module exports a default function for calculating circle area. A module can
have only one default export. Default exports can be imported with any name.

main.js
  

import calculateArea from './math.js';

console.log(calculateArea(5));

```
$ node main.js
78.53975

```

## Default import syntax

Default imports don't need curly braces and can use any name.

main.js
  

import myFunction from './module.js';

myFunction();

This shows how default imports differ from named imports. The imported value can
be referenced with any identifier. Default imports are more flexible in naming.

## Default parameters in functions

While not using the default keyword, default parameters serve a
similar purpose of providing fallback values.

main.js
  

function greet(name = 'Guest') {
    console.log(`Hello, ${name}!`);
}

greet();          // Uses default
greet('Alice');   // Overrides default

Default parameters provide values when arguments are omitted. They make functions
more robust by handling missing inputs gracefully. This pattern is conceptually
similar to default cases.

$ node main.js
Hello, Guest!
Hello, Alice!

## Combining default and named exports

A module can have both default and named exports.

utils.js
  

export const version = '1.0';

export default function main() {
    console.log('Main function');
}

main.js
  

```
import mainFunc, { version } from './utils.js';

mainFunc();
console.log(`Version: ${version}`);

```

This shows how to mix default and named exports in one module. The default export
is imported without braces, while named exports use destructuring syntax.

$ node main.js
Main function
Version: 1.0

## Default case with break

The default case in switch statements can use break.

main.js
  

const grade = 'B';

switch (grade) {
    case 'A':
        console.log('Excellent');
        break;
    case 'B':
        console.log('Good');
        break;
    default:
        console.log('Unknown grade');
        break;
}

Though not required after the last case, including break in
default is good practice. It prevents errors if cases are added
later. This makes the code more maintainable.

$ node main.js
Good

## Default export of objects

Objects can be exported as default values from modules.

config.js
  

const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000
};

export default config;

main.js
  

```
import appConfig from './config.js';

console.log(`API: ${appConfig.apiUrl}`);
console.log(`Timeout: ${appConfig.timeout}ms`);

```

This demonstrates exporting an object as the default export. The entire object
can be imported with a single identifier. This is useful for configuration
objects or primary data structures.

$ node main.js
API: https://api.example.com
Timeout: 5000ms

## Source

[export - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

In this article we have demonstrated how to use the default keyword in various
contexts in JavaScript, including switch statements and module exports.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)