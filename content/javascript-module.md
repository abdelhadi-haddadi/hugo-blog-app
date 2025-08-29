+++
title = "JavaScript module"
date = 2025-08-29T20:01:28.369+01:00
draft = false
description = "Understand how to use modules in JavaScript for organizing and reusing code, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript module

last modified last modified October 18, 2023

 

In this tutorial, we show how to create and use modules in JavaScript. 

A module is a container for JavaScript code. A module is defined in 
a separate file. The purpose of a module is to organize and isolate code. 

JavaScript did not have a module system for many years. As a result, several
third-party solutions were created. The most popular was CommonJS. In 2015 a
standard JS module system was released. In 2019, the new module system was
ported to Node.js.

Important attributes of modules:

    - modules are deferred by default

    - modules are in strict mode

    - the code in module is executed only once

    - modules have their own, local top-level scope

    - loading external scripts from another origin requires CORS headers

    - code from a module is loaded with import/export

&lt;script type="module" src="main.js"&gt;&lt;/script&gt;

We enable modules in the browser with the type attribute. 

{
  ...
  "main": "main.js",
  "type": "module",
  ...
}

In Node.js, the ES module system is enabled with the type option.

There is a convention to use the .mjs suffix for the modules.

## Export/import keywords

The export keyword marks variables and functions to be accessible 
from the module. The import keyword imports variables and functions 
from modules.

export const name = 'John Doe';    -&gt;    import { name } from 'mymod.mjs';

This is the basic name export. 

export default name = 'John Doe';    -&gt;    import name from 'mymod.mjs';

This is the syntax for the default export. 

export { name as username };    -&gt;    import { username } from 'mymod.mjs';

A rename export syntax. 

export {                                 import {
    fname,                                   fname,
    lname as last_name;        -&gt;            last_name
};                                       } from 'mymod.mjs';

This is the syntax for list export.

## JS module example in browser

In the following example, we create a simple module.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Drawing&lt;/title&gt;
&lt;script type="module" src="main.mjs"&gt;&lt;/script&gt;
&lt;style&gt;
    canvas {
      border: 1px solid black;
    }
  &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;canvas id="board" width="550" height="550"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt; 

we draw on a canvas. The drawing code is located in the 

main.mjs
  

import { drawLine, drawCircle } from './modules/draw.mjs';

let canvas = document.getElementById('board');
let ctx = canvas.getContext('2d');

drawLine(ctx);
drawCircle(ctx);

In the main.mjs module, we import drawLine and 
drawCircle functions fro the draw.mjs module.
We get the canvas object and create a drawing context. Finally, we call 
the imported functions.

modules/draw.mjs
  

export function drawLine(ctx) {
   
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(250, 250);
    ctx.lineWidth = 3;
    ctx.stroke();
}

export function drawCircle(ctx) {

    ctx.beginPath();
    ctx.arc(250, 90, 80, 0, 2*Math.PI);
    ctx.fill(); 
}

We have the definitions of the two functions. They are prefixed with the 
export keywords, which enabes them to be imported inside another 
module.

## JS module example in Node.js

In the next example, we set up a module in Node.js.

{
  ...
  "main": "main.js",
  "type": "module",
  ...
  "license": "ISC"
}

In the package.json file, we set the module type using the
type option.

modules/core.mjs
  

const fname = 'John';
const lname = 'Doe';
const occupation = 'gardener';

function say_message() {

    console.log(`${fname} ${lname} is a ${occupation}`);
}

export {
    fname as first_name,
    lname as last_name,
    say_message
}

In the core.mjs module, we define two constants and a function. 
We export two constants and a function using the export list syntax. We 
rename the two constants.

main.js
  

import { first_name, last_name, say_message } from "./modules/core.mjs";

console.log(first_name);
console.log(last_name);

say_message();

Inside the main.js program, we import the exported values and 
use them in code.

$ node main.js 
John
Doe
John Doe is a gardener

## Source

[JavaScript Modules - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

In this article we have worked with modules in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)