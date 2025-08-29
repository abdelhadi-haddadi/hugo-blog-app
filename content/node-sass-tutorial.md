+++
title = "Node Sass tutorial"
date = 2025-08-29T20:01:32.210+01:00
draft = false
description = "Explore how to use the node-sass module in JavaScript for translating Sass code into CSS, with examples and explanations."
image = "images/bugs.png"
imageBig = "images/bugs.png"
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Node Sass tutorial

last modified last modified October 18, 2023

 

In this article we show how to work with a node-sass module. The node-sass
module is used to translate the Sass code into CSS code.

## Sass

Sass is a preprocessor scripting language that is interpreted or
compiled into Cascading Style Sheets (CSS). Sass contains two syntaxes. The
older syntax uses indentation to separate code blocks and newline characters to
separate rules. The newer syntax, SCSS, uses block formatting like CSS. It uses
braces to denote code blocks and semicolons to separate lines within a block. 

The indented syntax and SCSS files are traditionally given the extensions
.sass and .scss, respectively.

## Node-sass

Node-sass is a library that provides binding for Node.js to LibSass, the C
version of the popular stylesheet preprocessor, Sass. It allows us to natively
compile SCSS files to CSS.

## Node Sass example

In the following example, we create a simple web project that uses the
node-sass module. 

$ mkdir sass
$ mkdir -p public/css

In the project directory, we create three subdirectories. In the
sass directory, we have SCSS code. The SCSS code is translated
into CSS and moved into the public/css directory.

$ npm init -y

We initiate a new Node application.

$ npm i node-sass

We install the node-sass module. We use the module to watch the
SCSS files and automatically translate them into CSS code.

$ npm install -g live-server

In addition, we install live-server, which is a little development
server with live reload capability. 

package.json
  

{
  "name": "nodesass-ex",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "sass": "node-sass -w sass -o public/css"
  },
  "keywords": [],
  "author": "Jan Bodnar",
  "license": "BSD",
  "dependencies": {
    "node-sass": "^5.0.0"
  }
}

In the package.json file, we create a script that runs the
node-sass module. It will watch the sass
directory and output the compiled code into the public/css
directory.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;link rel="stylesheet" href="css/main.css"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    
&lt;div class="container"&gt;

    &lt;h1&gt;Bugs&lt;/h1&gt;

    &lt;table&gt;

        &lt;tr&gt;
            &lt;th&gt;Bug name&lt;/th&gt;
            &lt;th&gt;Description&lt;/th&gt;
        &lt;/tr&gt;

        &lt;tr&gt;
            &lt;td&gt;Assasin bug&lt;/td&gt;
            &lt;td&gt;The assassin bug uses its short three-segmented beak to pierce 
                its prey and eat it.&lt;/td&gt;
        &lt;/tr&gt;

        &lt;tr&gt;
            &lt;td&gt;Bed bug&lt;/td&gt;
            &lt;td&gt;Bed bugs are parasitic insects in the that feed exclusively 
                on blood.&lt;/td&gt;
        &lt;/tr&gt;

        &lt;tr&gt;
            &lt;td&gt;Carpet beetle&lt;/td&gt;
            &lt;td&gt;Considered a pest of domestic houses and, particularly, natural 
                history museums where the larvae may damage natural fibers and 
                can damage carpets, furniture, clothing, and insect collections.&lt;/td&gt;
        &lt;/tr&gt;

        &lt;tr&gt;
            &lt;td&gt;Earwig&lt;/td&gt;
            &lt;td&gt;Earwigs are mostly nocturnal and often hide in small, moist 
                crevices during the day, and are active at night, feeding on 
                a wide variety of insects and plants.&lt;/td&gt;
        &lt;/tr&gt;

    &lt;/table&gt;

&lt;/div&gt;    

&lt;/body&gt;
&lt;/html&gt;

This is an HTML file with some data. This document is styled with a CSS file. 

&lt;link rel="stylesheet" href="css/main.css"&gt;

The CSS code is loaded from css/main directory.

sass/main.scss
  

$myfont: Georgia 1.1em;
$table_head_col: #ccc;
$table_row_col: #eee;
$table_bor_col: #eee;
$container_width: 700px;
$first_col_width: 150px;

div.container {

    margin: auto; 
    font: $myfont;
    width: $container_width;
}

table {

    tr:nth-child(odd) {background: $table_row_col}

    td:first-child {width: $first_col_width}
  
    th {
        background-color: $table_head_col;
    }

    border: 1px solid $table_bor_col;
}

This is our SCSS code. We style the container and the table. The code uses two
important SCSS capabilities: variables and nesting.

The following commands are run in separate terminals; they start two running 
processes.

$ npm run sass

We run the sass script.

$ live-server --open=public

Finally, we start the development server. Now modify the
sass/main.scss file. 

![bugs.png](images/bugs.png)

Figure: Sample application

## Source

[node-sass Github page](https://github.com/sass/node-sass)

In this article we have worked with the node-sass
module. We used the module in a simple web application to compile its SCSS
code into CSS code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)