+++
title = "Click event tutorial"
date = 2025-08-29T19:53:07.262+01:00
draft = false
description = "Document.createElement tutorial shows how to create a new DOM element with Document.createElement() in JavaScript."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Click event tutorial

last modified August 24, 2023

Click event tutorial how to register an event handler for a click event.

 

## Click event

The *click event* is raised when the user clicks on an element. 
It fires after the mousedown and mouseup events, in that order.

An event handler must be registered for an event with addEventListener.

## Click event example

The following example registers an event handler for a click event.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Click event&lt;/title&gt;
    &lt;link rel="stylesheet" href="main.css"&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;div id="output"&gt;&lt;/div&gt;

    &lt;script src="main.js"&gt;&lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;

In the example, we have register a click event handler for the 
body element. We show the coordinates of the mouse pointer in the 
output div.

main.css
  

body {
    height: 100vh;
    padding: 6px;
    border: 1px solid steelblue;
}

This is some styling. Note that in order for the example to work, 
we must set a height for the body.

main.js
  

const el = document.body;
const output = document.getElementById('output');

console.log(el);

el.addEventListener('click', e =&gt; {

    output.innerHTML = `x: ${e.x} y: ${e.y}`;
    console.log(e.x);
});

In the code,  we register a click event handler for the body element.
When the user clicks on the body of the document, the x and y 
coordinates of the mouse pointer are outputted.

output.innerHTML = `x: ${e.x} y: ${e.y}`;

An event object is generated for the click event. We can get some information about
the event from the event object. In our case, we get the x and y 
coordinates.

In this article we have shown how to work with a click event.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.