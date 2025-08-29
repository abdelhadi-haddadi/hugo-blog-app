+++
title = "Document.createElement tutorial"
date = 2025-08-29T19:53:07.266+01:00
draft = false
description = "Document.createElement tutorial shows how to create a new DOM element with Document.createElement() in JavaScript."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Document.createElement tutorial

last modified August 24, 2023

Document.createElement tutorial shows how to create a new DOM element with
Document.createElement in JavaScript.

 

## Document.createElement

Document.createElement() creates a new DOM element. 

After the element is created, we insert it into the document with appendChild.

## Document.createElement example

The following example demonstrates the usage of the document's createElement
function.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document.createElement&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;button id="mybtn"&gt;Create&lt;/button&gt;
    
    &lt;script src="main.js"&gt;&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In the example, we have a Create button which creates a new paragraph
when we click on it.

main.js
  

const btn = document.getElementById('mybtn');
btn.addEventListener('click', generateElement);

function generateElement() {

    let el = document.createElement("p");
    el.innerText = 'A paragraph';

    document.body.appendChild(el);
}

The JavaScript code adds an event listener to the button. The handler function
creates a new element with document.createelement
and inserts a text into the element. The element is then appended to the 
document's body tag using appendChild function.

In this article we have shown how to create new elements with
document.createElement function.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.