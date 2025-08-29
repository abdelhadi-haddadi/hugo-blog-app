+++
title = "Gulp minify"
date = 2025-08-29T19:57:50.680+01:00
draft = false
description = "Gulp minify tutorial shows how to minify JS code with gulp-minify plugin."
image = ""
imageBig = ""
categories = ["gulp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Gulp minify

last modified October 18, 2023 

In this article we show how to minify JS code with gulp-minify plugin.

## Gulp

Gulp is a Node task runner. It is a streaming build system in
front-end web development. It helps automate such tasks as copying files,
minifying JavaScript code, or compiling TypeScript to JavaScript.

The gulp-minify plugin minifies JS files. The resulting files are
lighter. The minified files have the -min.js extension.

## Installing Gulp and gulp-minify

We initiate a Node.js project and install Gulp and gulp-minify plugin.

$ npm init -y 
$ npm i --global gulp-cli
$ npm i gulp --save-dev

We initiate a Node project and install Gulp and Gulp CLI.  

$ npm i --save-dev gulp-minify

We install the gulp-minify plugin.

## Gulp-minify example

The following example demonstrates the usage of gulp-minify. We
have an HTML table which displays countries and their populations. There is a
Sort button which sorts the second column containing the population values. The
JS code that sorts the table is being minified with gulp-minify.

$ mkdir public/js -p
$ mkdir src/js -p
$ touch public/index.html gulpfile.js src/js/main.js

We create two directories and three empty files.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Countries&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;table id="tbl"&gt;
        &lt;tr&gt;
            &lt;th&gt;Country&lt;/th&gt;
            &lt;th&gt;Population&lt;/th&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Slovakia&lt;/td&gt;
            &lt;td&gt;5429000&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Norway&lt;/td&gt;
            &lt;td&gt;5271000&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Croatia&lt;/td&gt;
            &lt;td&gt;4225000&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Russia&lt;/td&gt;
            &lt;td&gt;143439000&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Mexico&lt;/td&gt;
            &lt;td&gt;122273000&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Vietnam&lt;/td&gt;
            &lt;td&gt;95261000&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Sweden&lt;/td&gt;
            &lt;td&gt;9967000&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Iceland&lt;/td&gt;
            &lt;td&gt;337600&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Israel&lt;/td&gt;
            &lt;td&gt;8622000&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Hungary&lt;/td&gt;
            &lt;td&gt;9830000&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Germany&lt;/td&gt;
            &lt;td&gt;82175700&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Japan&lt;/td&gt;
            &lt;td&gt;126650000&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/table&gt;

    &lt;button id="mybtn"&gt;Sort&lt;/button&gt;

    &lt;script src="js/main-min.js"&gt;&lt;/script&gt;

&lt;/body&gt;

&lt;/html&gt;

This is the index.html file. It loads the main-min.js file, 
which is the minified version of the JS main.js file. 

src/js/main.js
  

let btn = document.getElementById('mybtn');

btn.addEventListener('click', sortTable);

function sortTable() {

    const tbl = document.getElementById("tbl").tBodies[0];

    let store = [];

    for (let i = 0, len = tbl.rows.length; i &lt; len; i++) {

        let row = tbl.rows[i];
        let value = parseInt(row.cells[1].textContent || row.cells[1].innerText);

        if (!isNaN(value)) {
            store.push([value, row]);
        }
    }

    store.sort((x, y) =&gt; {
        return x[0] - y[0];
    });

    for (let i = 0, len = store.length; i &lt; len; i++) {

        tbl.appendChild(store[i][1]);
    }

    store = null;
}

The code sorts the second column of the table.

gulpfile.js
  

const { src, dest }  = require("gulp");
const minify = require("gulp-minify");

function minifyjs() {

    return src('src/js/main.js', { allowEmpty: true }) 
        .pipe(minify({noSource: true}))
        .pipe(dest('public/js'))
}

exports.default = minifyjs;

This is the gulpfile.js that contains our Gulp tasks.

function minifyjs() {

    return src('src/js/main.js', { allowEmpty: true }) 
        .pipe(minify({noSource: true}))
        .pipe(dest('public/js'))
}

The src() creates a stream for reading the main.js file. 
With pipe() we pass the streamed data to the minify()
function. In the end, we pass the compiled data to the dest(),
which in turn creates a stream for writing the data to the file system.
The final file is copied into the public/js directory.

exports.default = minifyjs;

The default task is a task that is executed if no task name is specified 
with Gulp CLI. It runs the minifyjs task.

$ gulp 
[20:23:47] Using gulpfile ~/Documents/prog/js/gulp-lib/gulpfile.js
[20:23:48] Starting 'default'...
[20:23:48] Finished 'default' after 71 ms

We run the default task. The main-min.js file is generated.

In this article we have used gulp-minify to minify JS code.

You might also be interested in the following related tutorials: 
[Node Sass tutorial](/javascript/nodesass/), 
[Gulp getting started tutorial](/gulp/getting-startee/), and
[Gulp Sass tutorial](/gulp/sass/). 

List [all JavaScript tutorials](/all#js).

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.