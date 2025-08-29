+++
title = "The dataset tutorial"
date = 2025-08-29T19:53:08.380+01:00
draft = false
description = "The dataset tutorial shows how to read and write custom data attributes with using dataset property."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# The dataset tutorial

last modified August 24, 2023

The dataset tutorial shows how to read and write custom data attributes 
with using dataset property.

## The dataset

The dataset property on the HTMLElement interface provides read/write access
to all the custom data attributes (data-*) set on the element. This access
is available both in HTML and within the DOM.  

## The dataset example

The following example demonstrates the usage of the dataset attribute.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;link rel="stylesheet" href="main.css"&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;h2&gt;Reading words from a dataset&lt;/h2&gt;

    &lt;div data-words="coin, marble, forest, falcon, mountain"&gt;&lt;/div&gt;

    &lt;div id="output"&gt;...&lt;/div&gt;
    
    &lt;button id="read"&gt;Read&lt;/button&gt;

    &lt;script src="main.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

In the example, we have a list of words inside a custom data-words
property. The button reads the words and outputs them into another div element.

main.css
  

button {
    width: 4em; height: 2em;
}

* {
    margin: 10px 10px;
}

This is some basic styling for the document.

main.js
  

let dataEl = document.querySelector("div[data-words]");
let output = document.getElementById("output");

let btn = document.getElementById("read");
btn.addEventListener('click', () =&gt; {

    let mywords = dataEl.dataset.words;
    output.innerHTML = mywords;
});

In the button handler, we read the words and insert them into the output 
div element.

## Express example

In the following example, we create simple web application that sends 
the data to the document. We use Express framework and Liquid.js template 
engine.

$ ls -Inode_modules -R
.:
index.js  package.json  package-lock.json  public  views

./public:
main.css  main.js

./views:
home.liquid

These are the contents of the project.

index.js
  

const express = require("express");
const path = require("path");
const Liquid = require('liquidjs');

const engine = new Liquid();
const app = express();

app.engine('liquid', engine.express());
app.set('views', path.resolve(__dirname, "views"));
app.use("/public", express.static(__dirname + "/public"));
app.set('view engine', 'liquid');

app.get("/words", (req, res) =&gt; {

    const words = ['coin', 'marble', 'forest', 'falcon', 'mountain'];
    const data = words.join(', ');

    res.render("home", { data });
});

app.use((req, res) =&gt; {
    res.statusCode = 404;
    res.end("404 - page not found");
});

app.listen(3000, () =&gt; {

    console.log("Application started on port 3000");
})

This is a simple Express application. It sends a home.liquid template 
to the client for the /home request. The template also receives 
the words data.

app.use("/public", express.static(__dirname + "/public"));

Static assets go in the public directory.

views/home.liquid
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;words&lt;/title&gt;
    &lt;link rel="stylesheet" href="public/main.css"&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;div data-words='{{data}}'&gt;&lt;/div&gt;

    &lt;div id="output"&gt;...&lt;/div&gt;
    
    &lt;button id="read"&gt;Read&lt;/button&gt;

    &lt;script src="public/main.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

Inside the template, we add the data to the data-words property using
the {{}} syntax.

public/main.css
  

button {
    width: 4em; height: 2em;
}

* {
    margin: 10px 10px;
}

We have the same styling.

public/main.js
  

let dataEl = document.querySelector("div[data-words]");
let output = document.getElementById("output");

let btn = document.getElementById("read");
btn.addEventListener('click', () =&gt; {

    let mywords = dataEl.dataset.words;
    output.innerHTML = mywords;
});

The main.js is also unchanged.

In this article we have worked with the document's dataset property.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.