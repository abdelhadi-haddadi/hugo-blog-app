+++
title = "Element.innerHtml tutorial"
date = 2025-08-29T19:53:37.543+01:00
draft = false
description = "Element.innerHtml tutorial shows how to read and write HTML content with Element.innerHtml property in JavaScript."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Element.innerHtml tutorial

last modified August 24, 2023

Element.innerHtml tutorial shows how to read and write HTML content with
Element.innerHtml property in JavaScript.

## Element.innerHtml

Element.innerHtml reads or writes the HTML markup contained within
the element. 

To insert the HTML into the document rather than replace the
contents of an element, we use the insertAdjacentHTML method.

## Document.all example

The following example demonstrates the usage of the document's all property.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge"&gt;
    &lt;title&gt;Element.innerHtml&lt;/title&gt;

    &lt;link rel="stylesheet" href="main.css"&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;div class="container"&gt;

        &lt;input id="input" type="text"&gt;
        &lt;div id="output"&gt;&lt;/div&gt;

        &lt;button id="writeBtn"&gt;Write&lt;/button&gt;
        &lt;button id="readBtn"&gt;Read&lt;/button&gt;

        &lt;script src="main.js"&gt;&lt;/script&gt;

    &lt;/div&gt;
&lt;/body&gt;

&lt;/html&gt;

In the document, we have an input element and two buttons. The buttons 
read and write HTML content of a div element.

main.css
  

.container {
    display: flex;
}

#output {
    width: 18em;
    height: 2em;
    border: 1px solid lightblue;
    overflow: hidden;
}

* {
    margin: 15px 5px;
}

This is some basic styling for our document.

main.js
  

const input = document.getElementById('input');
const output = document.getElementById('output');
const writeBtn = document.getElementById('writeBtn');
const readBtn = document.getElementById('readBtn');

writeBtn.addEventListener('click', () =&gt; {

    let val = input.value;
    output.innerHTML = val;

});

readBtn.addEventListener('click', () =&gt; {

    let content = output.innerHTML;
    console.log(content); 
});

We add click listeners to buttons. 

let val = input.value;

We read the entered value from the input.

output.innerHTML = val;

We copy the entered value into the output element using innerHTML
property.

readBtn.addEventListener('click', () =&gt; {

    let content = output.innerHTML;
    console.log(content); 
});

Here we read the HTML content from the output and write it into the console.

In this article we have worked with the element's innerHTML
property.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.