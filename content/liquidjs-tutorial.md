+++
title = "Liquid.js tutorial"
date = 2025-08-29T20:01:27.238+01:00
draft = false
description = "Explore how to use Liquid.js as a template engine in JavaScript applications, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Liquid.js tutorial

last modified last modified October 18, 2023

 

In this article we show how to use Liquid template engine in JavaScript
applications.

## Liquid

Liquid is a JavaScript template engine. It was created by Shopify.
Liquid files have the extension of .liquid; they are a mix of
static data such as HTML and Liquid constructs.

Liquid uses the double curly brace delimiters {{ }} for output
and the curly brace percentage delimiters {% %} for logic.

{% if user != null %}
  Hello {{ user.name }}
{% endif %}

This code is a sample Liquid syntax.

## Template engine

A template engine or template processor is a library designed to combine
templates with a data model to produce documents. Template engines are often
used to generate large amounts of emails, in source code preprocessing, or
producing dynamic HTML pages.

We create a template engine, where we define static parts and dynamic parts. The
dynamic parts are later replaced with data. The rendering function later
combines the templates with data.

## Setting up Liquid.js

First, we install Liquid.js.

$ npm init -y

We initiate a new Node application.

$ npm i liquidjs

We install liquidjs module with nmp i liquidjs.

## Liquid rendering from string

We start with a very simple example that renders from a string.

simple.js
  

const Liquid = require('liquidjs');
const engine = new Liquid();

engine
    .parseAndRender('{{name | capitalize}}', {name: 'lucy'})
    .then(console.log);

The example shows output from a string template. It also uses a filter.

const Liquid = require('liquidjs');
const engine = new Liquid();

We load the Liquid.js module and initiate the engine.

engine
  .parseAndRender('{{name | capitalize}}', {name: 'lucy'})
  .then(console.log);

The parseAndRender function takes a template string and the context
data. Inside the template string, we have a name variable, which is passed to
the capitalize filter. Filters modify the data before output.

$ node simple.js
Lucy

## Liquid sort filter

The sort is one of the array filters available.

sort_filter.js
  

const Liquid = require('liquidjs');
const engine = new Liquid();

nums = [5, 3, 2, 4, 1]
ctx = { data: nums}

engine
    .parseAndRender('Sorted data: {{ data | sort }}', ctx)
    .then(console.log);

The example sorts data passed to the template string.

$ node sort_filter.js
Sorted data: [1,2,3,4,5]

## Liquid render from file

To render output from files, we use the renderFile function.

$ mkdir views

We create a directory where we put our template files.

from_file.js
  

const Liquid = require('liquidjs');
const path = require('path');

const engine = new Liquid({
    root: path.resolve(__dirname, 'views/'),
    extname: '.liquid'
});

engine
    .renderFile('hello', { name: 'Peter' })
    .then(console.log)

The example generates output from a text file.

const engine = new Liquid({
    root: path.resolve(__dirname, 'views/'),
    extname: '.liquid'
});

In the Liquid constructor, we provide the template directory
location and the extension name. The extension name is usually
.liquid.

engine
  .renderFile('hello', { name: 'Peter' })
  .then(console.log)

The first parameter of the renderFile is the template name. The
second parameter is context data.

views/hello.liquid
  

Hello {{ name }}!

In the template file, we use {{}} to output the context variable.

$ node from_file.js
Hello Peter!

## Liquid for tag

Liquid for is an iteration tag which repeatedly executes a block of
code.

users.js
  

const Liquid = require('liquidjs');
const path = require('path');

const engine = new Liquid({
    root: path.resolve(__dirname, 'views/'),
    extname: '.liquid'
});

ctx = { users: [{ name: "Peter", age: 24 }, { name: "Lucy", age: 34 }] };

engine
    .renderFile("users", ctx)
    .then(console.log);

In the example, we define an array of users. The array is looped over in the
template with for.

views/users.liquid
  

There are {{ users | size }} users

{% for user in users -%}
{{ user.name }} is {{ user.age }} years old
{% endfor -%}

The template file outputs the number of users utilizing the size
filter and all the users from the context variable.

{% for user in users -%}
{{ user.name }} is {{ user.age }} years old
{% endfor -%}

We loop over the users array and print the attributs. Whitespace output can be
controlled with dash characters.

$ node users.js
There are 2 users

Peter is 24 years old
Lucy is 34 years old

## Liquid partials

Partials are reusable templates that are included into other templates. Partials
are used for duplicated content such as footers or headers.

Partials are inserted with include directive.

partials.js
  

const Liquid = require('liquidjs');
const path = require('path');

const engine = new Liquid({
    root: path.resolve(__dirname, 'views/'),
    extname: '.liquid'
});

ctx = { name: 'Peter' };

engine
    .renderFile("home", ctx)
    .then(console.log);

This example shows output from home.liquid template, which includes
a Liquid partial.

views/footer.liquid
  

{{ "now" | date: "%Y-%m-%d %H:%M" }}, ZetCode 2007 - 2022

This is a partial for a footer. With the help of the date filter,
it shows current date and time.

views/home.liquid
  

Hello {{ name }}!

{% include 'footer' %}

The footer partial is included with include directive.

$ node partials.js
Hello Peter!

2019-02-13 22:52, ZetCode 2007 - 2022

## Liquid inheritance

Liquid supports template inheritance. Template inheritance is a powerful feature
that reduces code duplication and improves code organization. We define a base
template from which we inherit in other template files. These template files
overwrite specific blocks of the base template file.

inheritance.js
  

const Liquid = require('liquidjs');
const path = require('path');

const engine = new Liquid({
    root: path.resolve(__dirname, 'views/'),
    extname: '.liquid'
});

engine
    .renderFile("derived", { content: 'Some content' })
    .then(console.log)

The example generates output from a derived.liquid template, which
uses inheritance techniquie.

views/base.liquid
  

Header
{% block content %}My default content{% endblock %}
Footer

This is the base.liquid file from which other templates inherit.
The block/endblock directives are used to declare a block of
content which is replaced in the child template.

views/derived.liquid
  

{% layout "base" %}
{% block content %} {{ content }} {% endblock %}

This is the child template. With the layout directive, we inherit
from the base.liquid template. We define the content with the
block/endblock directives.

$ node inheritance.js
Header
 Some content
Footer

## Liquid Express example

In the following example, we use Liquid in an Express application.

$ npm i express

We install the Express web framework.

express-demo.js
  

const express = require("express");
const path = require("path");
const Liquid = require('liquidjs');
const engine = new Liquid();

const app = express();

app.engine('liquid', engine.express());
app.set('views', path.resolve(__dirname, "views"));
app.set('view engine', 'liquid');

app.get("/today", (req, res) =&gt; {

    let today = new Date();
    res.render("show_date", {now: today});
});

app.use((req, res) =&gt; {
    res.statusCode = 404;
    res.end("404 - page not found");
});

app.listen(3000, () =&gt; {

    console.log("Application started on port 3000");
})

The example is a simple web application created with Express. It shows the
current date.

app.engine('liquid', engine.express());
app.set('views', path.resolve(__dirname, "views"));
app.set('view engine', 'liquid');

We integrate Liquid into the Express application.

app.get("/today", (req, res) =&gt; {

    let today = new Date();
    res.render("show_date", {now: today});
});

For the /today path, we show current date. The
show_date.liquid generates the ouput. We pass the now
context variable to the template.

views/show_date.liquid
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Show date&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is {{ now }}
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

The show_date.liquid generates HTML output. It adds the current
date to the content with {{}}.

$ node express-demo.js
Application started on port 3000

We start the application.

$ curl localhost:3000/today
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Show date&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is Wed Feb 13 2019 23:19:07 GMT+0100 (Central European Standard Time)
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

We create a request to the application with the curl tool.

## Source

[Liquid.js tutorial](https://liquidjs.com/tutorials/intro-to-liquid.html)

In this article we have used Liquid.js to generate documents from Liquid
templates and data. We covered Liquid tags, filters, partials, and inheritance.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)