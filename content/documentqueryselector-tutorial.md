+++
title = "Document.querySelector Tutorial"
date = 2025-08-29T20:01:35.952+01:00
draft = false
description = "Learn how to use Document.querySelector to select HTML elements in JavaScript, with examples and explanations."
image = "images/queryselector.png"
imageBig = "images/queryselector.png"
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Document.querySelector Tutorial

last modified Last modified: March 20, 2025

 

In this article, we demonstrate how to use querySelector to select
HTML elements in JavaScript with practical examples.

## Document.querySelector

The querySelector method, part of the Document object, retrieves
the first element in the document matching a specified CSS selector. If no match
is found, it returns null.

In contrast, querySelectorAll returns a static
NodeList containing all elements that match the given selector
group. This list does not update with document changes.

## Document.querySelector Example

The following example illustrates how to use both
querySelector and querySelectorAll
to manipulate HTML elements dynamically.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Document.querySelector&lt;/title&gt;
  &lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/components/button.min.css"&gt;
&lt;style&gt;

body { margin: 3em }

.selected { background-color: #eee }

.container {
    display: grid;
    grid-template-columns: 100px 100px 100px 100px 100px;
    grid-template-rows: 50px;
    grid-column-gap:5px;
    margin-bottom: 1em;
}

div&gt;div {
    border: 1px solid #ccc;
}

&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="container"&gt;
&lt;div&gt;&lt;/div&gt;
&lt;div&gt;&lt;/div&gt;
&lt;div&gt;&lt;/div&gt;
&lt;div&gt;&lt;/div&gt;
&lt;div&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;button id="first" type="submit" class="ui grey button"&gt;First&lt;/button&gt;
&lt;button id="all" type="submit" class="ui brown button"&gt;All&lt;/button&gt;
&lt;button id="clear" type="submit" class="ui brown button"&gt;Clear&lt;/button&gt;

&lt;script src="main.js"&gt;&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This HTML document features five bordered div
elements within a container, styled as a grid.
Three buttons trigger visual changes to these divs.

&lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/components/button.min.css"&gt;

We enhance the document's appearance using the Semantic
UI framework for consistent button styling.

.selected { background-color: #eee }

The .selected class applies a light gray
background to highlighted div elements.

.container {
    display: grid;
    grid-template-columns: 100px 100px 100px 100px 100px;
    grid-template-rows: 50px;
    grid-column-gap:5px;
    margin-bottom: 1em;
}

The .container class uses CSS Grid to
arrange five divs in a single row with
equal column widths and a small gap between them.

div&gt;div {
    border: 1px solid #ccc;
}

Inner divs within the container have a
light gray border for clear visual separation.

&lt;div class="container"&gt;
&lt;div&gt;&lt;/div&gt;
&lt;div&gt;&lt;/div&gt;
&lt;div&gt;&lt;/div&gt;
&lt;div&gt;&lt;/div&gt;
&lt;div&gt;&lt;/div&gt;
&lt;/div&gt;

Five empty div elements are nested in a
parent div with the container class.

&lt;button id="first" type="submit" class="ui grey button"&gt;First&lt;/button&gt;
&lt;button id="all" type="submit" class="ui brown button"&gt;All&lt;/button&gt;
&lt;button id="clear" type="submit" class="ui brown button"&gt;Clear&lt;/button&gt;

Three buttons control the div elements:
"First" highlights the first div, "All"
highlights all divs, and "Clear" removes
the highlights. Semantic UI styles enhance their look.

&lt;script src="main.js"&gt;&lt;/script&gt;

The JavaScript logic resides in an external
main.js file, linked at the document's end.

main.js
  

document.getElementById("first").onclick = (e) =&gt; {

  let tag = document.querySelector(".container div:first-child");

  tag.className = "selected";

};

document.getElementById("all").onclick = (e) =&gt; {

  let tags = document.querySelectorAll(".container div");

  tags.forEach( tag =&gt; {
      tag.className = "selected";
  });

};

document.getElementById("clear").onclick = (e) =&gt; {

  let tags = document.querySelectorAll(".container div");
  tags.forEach( tag =&gt; {
      tag.classList.remove("selected");
  });

};

The main.js file defines the behavior for each button, using
querySelector and querySelectorAll to manipulate the
DOM.

document.getElementById("first").onclick = (e) =&gt; {

An event listener is attached to the "First" button
using the onclick property, selected via
getElementById.

let tag = document.querySelector(".container div:first-child");

The querySelector method targets the
first div inside the .container
using the :first-child pseudo-class.

tag.className = "selected";

The selected class is assigned to the
targeted div, applying the gray background.

let tags = document.querySelectorAll(".container div");

The querySelectorAll method retrieves
all div elements within the .container
as a NodeList.

tags.forEach( tag =&gt; {
  tag.className = "selected";
});

Using forEach, we iterate over the
NodeList and apply the selected
class to each div element.

![queryselector.png](images/queryselector.png)

Figure: Selecting elements with Document.querySelector

This screenshot shows the first div
highlighted with a gray background after clicking
the "First" button, demonstrating the effect.

## Source

[Document: querySelector Method](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

In this tutorial, we explored the use of
querySelector and querySelectorAll
for selecting and manipulating HTML elements.

## Author

My name is Jan Bodnar, a passionate programmer
with extensive experience. Since 2007, I've
written over 1,400 articles and 8 e-books,
drawing from more than eight years of teaching.

List [all JavaScript tutorials.](/all/#js)