+++
title = "Handsontable tutorial"
date = 2025-08-29T20:01:21.446+01:00
draft = false
description = "Learn how to create interactive data grids in JavaScript using the Handsontable library, with examples and explanations."
image = "images/handsontable.png"
imageBig = "images/handsontable.png"
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Handsontable tutorial

last modified last modified October 18, 2023

 

In this article we show how to create a data grid in JavaScript with
Handsontable module.

## Handsontable

Handsontable is a JavaScript library for creating a data grid in
JavaScript. It creates a Spreadsheet-like experience.

In this article we work with Handsontable and Gulp 4. We are using the
community edition of the Handsontable component.

## Setting up Handsontable

First, we install Handsontable

$ npm init -y

We initiate a new Node application.

$ npm i handsontable

We install Handsontable.

$ npm i --global gulp-cli
$ npm i gulp --save-dev
$ npm i --save-dev gulp-minify

We install gulp-cli, gulp, and
gulp-minify modules. You may also run npm link gulp
to create a symbolic link the globally installed gulp.

$ mkdir -p src/js

We create src/js diretories. In the src/js
subdirectory, we have the main.js file.

## Handsontable example

In the following example, we generate a data grid with Handsontable.
We use Gulp to manage our files.

├───build
│   │   index.html
│   ├───css
│   │       handsontable.full.min.css
│   └───js
│           handsontable.full.min.js
│           main-min.js
├───node_modules
└───src
│   │   index.html
│   │
└───────js
            main.js

gulpfile.js
package-lock.json
package.json

This is the project structure after being built with Gulp.

src/js/main.js
  

let data = [
  ["", "Alex", "Frank", "Robert", "Lucy"],
  ["2017", 99, 44, 12, 14],
  ["2018", 22, 21, 44, 67],
  ["2019", 39, 53, 76, 43]
];

let container = document.getElementById('example');
let hot = new Handsontable(container, {
  data: data,
  rowHeaders: true,
  colHeaders: true,
  licenseKey: 'non-commercial-and-evaluation'
});

In the main.js file, we create an instance of the
Handsontable. We add data to the table and configure it.

src/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge"&gt;
    &lt;script src="js/handsontable.full.min.js"&gt;&lt;/script&gt;
    &lt;link rel="stylesheet" href="css/handsontable.full.min.css"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="example"&gt;&lt;/div&gt;

&lt;script src="js/main-min.js"&gt;&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

The data grid is shown in this file. It replaces the div component.
We include the Handsontable dependencies and our minified main JavaScript file.

gulpfile.js
  

const gulp = require("gulp");
const minify = require("gulp-minify");

gulp.task('copyHtml', () =&gt; {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build'))
})

gulp.task('copyJS', () =&gt; {
  return gulp.src('node_modules/handsontable/dist/handsontable.full.min.js')
    .pipe(gulp.dest('build/js'))
})

gulp.task('copyCSS', () =&gt; {
  return gulp.src('node_modules/handsontable/dist/handsontable.full.min.css')
    .pipe(gulp.dest('build/css'))
})

gulp.task('minify', () =&gt; {
  return gulp.src('src/js/main.js', { allowEmpty: true })
    .pipe(minify({noSource: true}))
    .pipe(gulp.dest('build/js'))
})

gulp.task('default', gulp.series(['copyHtml', 'minify', 'copyJS', 'copyCSS']));

The gulpfile.js copies and processes the files into the
build directory.

$ gulp
[10:30:03] Using gulpfile ~\Documents\javascript\hndstable\gulpfile.js
[10:30:03] Starting 'default'...
[10:30:03] Starting 'copyHtml'...
[10:30:03] Finished 'copyHtml' after 31 ms
[10:30:03] Starting 'minify'...
[10:30:03] Finished 'minify' after 35 ms
[10:30:03] Starting 'copyJS'...
[10:30:03] Finished 'copyJS' after 132 ms
[10:30:03] Starting 'copyCSS'...
[10:30:03] Finished 'copyCSS' after 13 ms
[10:30:03] Finished 'default' after 217 ms

We run the gulp command. It executes its tasks and prepares
the page in the build directory.

$ firefox build/index.html

We run the page from the build directory.

![handsontable.png](images/handsontable.png)

Figure: Displaying data in Handsontable component

## Source

[Handsontable documentation](https://handsontable.com/docs/javascript-data-grid/)

In this article we have used Handsontable to create a data grid in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)