+++
title = "JavaScript import keyword"
date = 2025-08-29T20:01:22.611+01:00
draft = false
description = "Learn how to use the import keyword in JavaScript for importing modules, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript import keyword

last modified April 16, 2025

In this article we show how to import modules using the import
keyword in JavaScript. The import statement is used to import bindings from
other modules.

## The import keyword

The import keyword is part of ES6 modules and allows you to bring
functionality from other files into your current module. It enables code
organization and reuse across different parts of an application.

Imported values are read-only live bindings to the original module's exports.
Changes in the original module are reflected in the importing module. This
creates a dynamic link between modules.

Import statements must be at the top level of a module and cannot be used
inside functions or blocks. They are hoisted to the top of the module scope.
The module specifier must be a string literal.

## Basic named import

The simplest form of import brings in specific named exports from a module.

main.js
  

// mathUtils.js
export const PI = 3.14159;
export function square(x) { return x * x; }

// main.js
import { PI, square } from './mathUtils.js';

console.log(PI); // 3.14159
console.log(square(5)); // 25

This example shows how to import specific named exports from another module.
The curly braces contain the names of the exports we want to import. The
path must be relative to the current file or an absolute path.

$ node main.js
3.14159
25

## Import with renaming

You can rename imports using the as keyword to avoid naming conflicts.

main.js
  

// mathUtils.js
export function square(x) { return x * x; }

// main.js
import { square as sq } from './mathUtils.js';

console.log(sq(3)); // 9

Here we import the square function but rename it to sq
in our module. This is useful when you need to avoid naming collisions or want
to use a more convenient name locally.

$ node main.js
9

## Import all exports as a namespace

You can import all exports from a module as a single namespace object.

main.js
  

// mathUtils.js
export const PI = 3.14159;
export function square(x) { return x * x; }

// main.js
import * as math from './mathUtils.js';

console.log(math.PI); // 3.14159
console.log(math.square(4)); // 16

The * as math syntax imports all exports from mathUtils.js and makes
them available as properties of the math object. This is useful
when you need many exports from a module.

$ node main.js
3.14159
16

## Default import

Modules can have a default export which can be imported without curly braces.

main.js
  

// logger.js
export default function(message) {
    console.log(`LOG: ${message}`);
}

// main.js
import log from './logger.js';

log('Hello world'); // LOG: Hello world

Default imports don't use curly braces and can be named anything in the importing
module. Each module can have only one default export. This is commonly used for
the main functionality of a module.

$ node main.js
LOG: Hello world

## Mixed default and named imports

You can combine default and named imports in a single statement.

main.js
  

// utils.js
export default function(config) {
    console.log('Initializing with', config);
}
export const VERSION = '1.0.0';

// main.js
import init, { VERSION } from './utils.js';

init({ debug: true });
console.log('Version:', VERSION);

This example shows how to import both a default export and named exports from
the same module. The default import comes first, followed by named imports in
curly braces.

$ node main.js
Initializing with { debug: true }
Version: 1.0.0

## Dynamic imports

JavaScript supports dynamic imports using the import() function.

main.js
  

// math.js
export function add(a, b) { return a + b; }

// main.js
async function loadMath() {
    const math = await import('./math.js');
    console.log(math.add(2, 3)); // 5
}

loadMath();

Dynamic imports return a promise that resolves to the module's exports. This
allows for lazy loading of modules when needed. The import() function can be
used anywhere in your code.

$ node main.js
5

## Import for side effects only

Sometimes you need to import a module only for its side effects, not its exports.

main.js
  

// analytics.js
console.log('Analytics initialized');
export const track = () =&gt; { /* ... */ };

// main.js
import './analytics.js';

console.log('Main module running');

This imports the module without importing any of its exports. The module's code
runs when imported, which might initialize something or modify global state.
This is common with polyfills or initialization scripts.

$ node main.js
Analytics initialized
Main module running

## Source

[import - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

In this article we have demonstrated how to use the import keyword to work with
modules in JavaScript. We covered various import syntax forms and use cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)