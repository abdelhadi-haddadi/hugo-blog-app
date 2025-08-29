+++
title = "Rollup.js tutorial"
date = 2025-08-29T20:01:38.157+01:00
draft = false
description = "Learn how to use Rollup.js for module bundling in JavaScript, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rollup.js tutorial

last modified last modified October 18, 2023

 

In this article we show how to work with Rollup.js module bundler.

Rollup is a JavaScript module bundler. It compiles smaller pieces of
code into larger library or application bundles.

Rollup allows us to do syntax checks, source code minification, and three
shaking (removing unnecessary code). In addition, we can use a watcher for
continuous updates and generate bundles in different formats such as es, cjs, or
iife.

$ npm i -g rollup

We install Rollup globally.

To use Rollup, we have two basic options. We can use Rollup CLI with an optional 
configuration file (rollup.config.js), or we can use the JavaScript 
API. 

There are alternative bundlers available, such as Webpack or Parcel. While these 
are more generic bundlers, Rollup focuses primarily on JavaScript tasks.

## Basic CLI commands

Here are some basic Rollup CLI commands.

$ rollup main.js -o bundle.js --f es

Here we use the Rollup CLI to create a bundle.js file in the
standard es format.

$ rollup -c -o bundle.js

With this command, we create a bundle using the rollup.config.js 
file.

$ rollup --watch

Using the --watch option, we build continuosly.

## Rollup.js simple example

We start with a simple example.

core.mjs
  

export function hello() {

    console.log('hello there!');
}

We have the core.mjs module file. It exports a hello
function.

main.js
  

import { hello } from "./core.mjs";

hello();

We import a single function from the core.mjs module.

$ rollup main.js -f es

main.js → stdout...
function hello() {

    console.log('hello there!');
}

hello();

We generate the es format. By default, if we do not specify output, it goes to 
the terminal.

$ rollup main.js -f iife -o bundle.js

main.js → bundle.js...
created bundle.js in 21ms

We create a bundle file in the iife format.

$ cat bundle.js 
(function () {
    'use strict';

    function hello() {

        console.log('hello there!');
    }

    hello();

})();

We show the contents of the bundle.js file with cat.

$ node build.js 
hello there!

We run the file.

## Rollup.js config file example

In the following example, we use the rollup.config.js to generate 
a bundle.

src/modules/core.mjs
  

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

In the core.mjs module, we export two constants and a function.

src/main.js
  

import { first_name, last_name, say_message } from "./modules/core.mjs";

console.log(first_name);
console.log(last_name);

say_message();

In the main.js file, we use the imported constants and function.

rollup.config.js
  

export default {
    input: 'src/main.js',
    output: {
        file: 'build/bundle.js',
        format: 'es'
    }
};

In the configuration file, we define the input file, the output file and its 
format. 

$ rollup -c

src/main.js → build/bundle.js...
created build/bundle.js in 12ms

We call the rollup command which generates a bundle based on the 
config file.

$ cat build/bundle.js 
const fname = 'John';
const lname = 'Doe';
const occupation = 'gardener';

function say_message() {

    console.log(`${fname} ${lname} is a ${occupation}`);
}

console.log(fname);
console.log(lname);

This is how the bundle file looks like. 

$ node build/bundle.js 
John
Doe
John Doe is a gardener

## Rollup.js browser example

In the next example, we create a small bundle for a browser. Rollup.js also 
has a plugin system for providing additional functionality.

$ npm i rollup-plugin-terser --save-dev

We install the rollup-plugin-terser. This will minify JS code.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Canvas&lt;/title&gt;
&lt;script type="module" src="../build/bundle.js"&gt;&lt;/script&gt;
&lt;style&gt;
    canvas {
        border: 1px solid #bbb;
    }
&lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;canvas id="myCanvas" width="450" height="450"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt;

We have an HTML file, where we draw on the canvas. The JS code is imported from 
the bundle file located in the build directory.

src/modules/core.mjs
  

export function draw_rectangles() {

    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'brown';
    ctx.fillRect(10, 10, 90, 60);

    ctx.fillStyle = 'rgb(217, 146, 54)';
    ctx.fillRect(130, 10, 90, 60);

    ctx.fillStyle = '#3F79BA';
    ctx.fillRect(250, 10, 90, 60);
}

In the core.mjs module, we have defined the
draw_rectangles function, which draws three rectangles on the
canvas.

src/main.js
  

import { draw_rectangles } from "./modules/core.mjs";

draw_rectangles();

In the main.js file, we import and call the
draw_rectangles function.

rollup.config.js
  

import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/main.mjs',
    output: {
        file: 'build/bundle.js',
        format: 'es'
    },
    plugins: [terser()]
};

In the config file, we set up the input and output files and apply the terser 
plugin. 

$ rollup -c

src/main.mjs → build/bundle.js...
created build/bundle.js in 124ms

We generate the bundle file. Now we can open the index.html file in the browser.

$ cat build/bundle.js 
!function(){let l=document.getElementById("myCanvas").getContext("2d");...

The bundle.js file is minified.

## Using Ramda.js with Rollup

Next, we use the Ramda library with Rollup. Ramda is a functional library
for Node.js. To use Node libraries, we use the
@rollup/plugin-node-resolve plugin.

$ npm i @rollup/plugin-node-resolve --save-dev
$ npm i rollup-plugin-terser --save-dev

For this example, we install node resolve and terser plugins.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;script type="module" src="build/bundle.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    
&lt;/body&gt;
&lt;/html&gt;

We use the final bundle in an HTML file. The output will be shown in the
console. 

src/main.js
  

import * as R from 'ramda';

let nums = [2, 4, 6, 8, 10];

console.log(R.head(nums));
console.log(R.tail(nums));
console.log(R.init(nums));
console.log(R.last(nums));

We use four ramda functions in the main.js file.

rollup.config.js
  

import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'es'
  },
  plugins: [nodeResolve(), terser()]
};

In the config file, we set the input and output files and apply the node resolve 
and terser plugins.

$ rollup -c

We generate the bundle. Now we can open the HTML file in a browser and check 
the browser console tab for output.

In this article we have worked with Rollup.js module bundler.

## Source

[Rollup.js Guide](https://rollupjs.org/introduction/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)