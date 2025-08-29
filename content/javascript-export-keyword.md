+++
title = "JavaScript export keyword"
date = 2025-08-29T20:01:16.769+01:00
draft = false
description = "Understand how to use the export keyword in JavaScript for managing module exports, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript export keyword

last modified April 16, 2025

In this article we show how to use the export keyword to share
code between JavaScript modules. The export statement is used when creating
JavaScript modules.

## The export keyword

The export keyword is used to export functions, objects, or
primitive values from a module. This allows other modules to use them via
the import statement. Exports are essential for modular JavaScript.

There are two types of exports: named exports and default exports. Named exports
allow multiple values to be exported, while default exports allow only one per
module. Both can be used in the same module.

Exports are subject to strict mode whether declared or not. The export statement
cannot be used in embedded scripts. It must be in a module with .mjs extension
or with type="module" in script tag.

## Basic named export

The simplest form is exporting a single declaration with the export keyword.

math.mjs
  

export const PI = 3.14159;

export function square(x) {
    return x * x;
}

export class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    area() {
        return PI * this.radius ** 2;
    }
}

This module exports a constant, a function, and a class. Each export is named
and can be imported individually. The exports are available to other modules
using their original names.

To use these exports, another module would import them with matching names.
Named exports must be imported with the exact same name or using aliases.

## Export list

You can group exports at the bottom of the module using an export list.

utils.mjs
  

function greet(name) {
    return `Hello, ${name}!`;
}

const MAX_USERS = 100;

class User {
    constructor(name) {
        this.name = name;
    }
}

export { greet, MAX_USERS, User };

This approach separates declaration from export, making it clearer what the
module exports. The export list can include functions, variables, and classes.
You can also rename exports here using as.

The export list is often preferred for larger modules as it provides a single
place to see all exports. It also makes renaming exports more straightforward.

## Default export

A module can have one default export, typically used for the main functionality.

logger.mjs
  

export default class Logger {
    static log(message) {
        console.log(`[LOG] ${message}`);
    }
    
    static error(message) {
        console.error(`[ERROR] ${message}`);
    }
}

The default export doesn't need a name when imported. There can be only one
default export per module. Default exports are commonly used for classes or
functions that represent the primary purpose of the module.

When importing, you can choose any name for the default export. Default exports
are easier to import but provide less explicit naming than named exports.

## Combining named and default exports

A module can have both named and default exports.

config.mjs
  

const API_KEY = 'abc123';
const MAX_RETRIES = 3;

export default {
    baseUrl: 'https://api.example.com',
    timeout: 5000
};

export { API_KEY, MAX_RETRIES };

Here we export a default configuration object along with some named constants.
This pattern is common when a module has a primary export plus supporting ones.

When importing, you would use both default and named import syntax. The default
export can be any valid JavaScript value including objects, functions, etc.

## Renaming exports

You can rename exports using the as keyword.

auth.mjs
  

function validateCredentials(username, password) {
    // validation logic
}

function createToken(user) {
    // token creation logic
}

export {
    validateCredentials as validate,
    createToken as generateToken
};

This exports the functions with different names than their original declarations.
Renaming can help avoid naming conflicts or provide more descriptive names.

Importing modules would use the exported names, not the original ones. This
feature is particularly useful when dealing with third-party modules.

## Re-exporting

You can re-export items from another module without importing them first.

math-utils.mjs
  

export { PI, square } from './math.mjs';

export function cube(x) {
    return x * x * x;
}

This module re-exports PI and square from math.mjs and adds its own cube function.
Re-exporting is useful for creating aggregate modules that combine functionality.

The original module's items are not available in the current module's scope.
This is purely a forwarding export. It helps create cleaner public APIs.

## Dynamic exports with export *

You can export all named exports from another module at once.

all-utils.mjs
  

export * from './math.mjs';
export * from './logger.mjs';
export * from './auth.mjs';

This exports all named exports from multiple modules into a single module.
Default exports are not included in this pattern. It's useful for creating
facade modules that expose functionality from several sub-modules.

Be careful with naming collisions when using export *. If multiple modules
export items with the same name, the last one exported will win.

## Source

[export - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

In this article we have demonstrated how to use the export keyword to share
code between JavaScript modules. We covered named exports, default exports,
and various export patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)