+++
title = "ParentNode.childElementCount tutorial"
date = 2025-08-29T19:53:06.145+01:00
draft = false
description = "childElementCount tutorial shows how to count the number of child elements of a DOM element in JavaScript in a document."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ParentNode.childElementCount tutorial

last modified August 24, 2023

ParentNode.childElementCount tutorial shows how to count the number of child
elements of an element in JavaScript in a document.

## ParentNode.childElementCount

ParentNode.childElementCount returns the number of children of this
ParentNode which are elements. The property is implemented both by document and
element of the DOM.

To determine the child elements, we can use ParentNode.children property.

## ParentNode.childElementCount example

The following example counts the number of child elements of a selected element.
We select the element by clicking on it.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;ParentNode.childElementCount&lt;/title&gt;
    &lt;link rel="stylesheet" href="main.css"&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;div id="first"&gt;
        &lt;p&gt;paragraph 1&lt;/p&gt;
        &lt;p&gt;paragraph 2&lt;/p&gt;
        &lt;p&gt;paragraph 3&lt;/p&gt;
    &lt;/div&gt;

    &lt;div id="second"&gt;
        &lt;p&gt;paragraph 1&lt;/p&gt;
        &lt;p&gt;paragraph 3&lt;/p&gt;
    &lt;/div&gt;

    &lt;div id="output"&gt;&lt;/div&gt;

    &lt;button id="count"&gt;Count&lt;/button&gt;

&lt;script src="main.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

In the document, we have a couple of elements. The button event handler
outputs the number of child elements in the output div.

main.css
  

* {
    margin:10px;
}

div {
    border: 1px solid steelblue;
    width: 200px; height: 150px;
}

This is some basic styling for the document.

main.js
  

let selected = document.body;

let btn = document.getElementById('count');
let output = document.getElementById('output');

btn.addEventListener('click', countElements);

function countElements(e) {

    let nOfElements = selected.childElementCount;
    output.innerHTML = `The ${selected.localName} has ${nOfElements} elements`;
}

document.onclick = e =&gt; {

    if (e.target.localName != 'button') {

        selected = e.target;
    }
}

There are two event handlers.

function countElements(e) {

    let nOfElements = selected.childElementCount;
    output.innerHTML = `The ${selected.localName} has ${nOfElements} elements`;
}

We determine the number of children with childElementCount property
and output the message into the div's innerHTML.

document.onclick = e =&gt; {

    if (e.target.localName != 'button') {

        selected = e.target;
    }
}

We determine the clicked element in the document's handler. We skip the button
element.

In this article we have shown how to count child elements of a DOM element.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.