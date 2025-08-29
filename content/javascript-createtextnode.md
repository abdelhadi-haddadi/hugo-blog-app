+++
title = "JavaScript createTextNode"
date = 2025-08-29T19:53:09.484+01:00
draft = false
description = "Learn how to use JavaScript's createTextNode method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript createTextNode

last modified April 2, 2025

In this article, we explore the document.createTextNode method in
JavaScript. This method creates a new text node, which can be added to the DOM
tree to display text content on a web page.

## Basic Definition

The document.createTextNode method creates a new text node with the
specified text content. Text nodes contain only text and cannot have child nodes.

Text nodes are different from element nodes. They represent the textual content
within elements. This method is useful when you need to add plain text to the
DOM without HTML markup.

## Creating a Basic Text Node

This example demonstrates how to create a simple text node and append it to the
document body.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Text Node&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;&lt;/div&gt;

&lt;script&gt;
    const textNode = document.createTextNode('Hello, World!');
    const container = document.getElementById('container');
    container.appendChild(textNode);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a text node with the content "Hello, World!".
We then append this text node to a div element with the ID "container".

The appendChild method is used to add the text node to the DOM.
This demonstrates the fundamental usage of createTextNode to add
text content to a web page.

## Adding Multiple Text Nodes

This example shows how to create and add multiple text nodes to different
elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Text Nodes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="header"&gt;&lt;/div&gt;
&lt;div id="content"&gt;&lt;/div&gt;
&lt;div id="footer"&gt;&lt;/div&gt;

&lt;script&gt;
    const headerText = document.createTextNode('Welcome to our site');
    const contentText = document.createTextNode('Main content goes here');
    const footerText = document.createTextNode('Copyright 2025');
    
    document.getElementById('header').appendChild(headerText);
    document.getElementById('content').appendChild(contentText);
    document.getElementById('footer').appendChild(footerText);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create three separate text nodes with different content. Each text node
is appended to a different div element in the document.

This demonstrates how createTextNode can be used to populate
multiple sections of a page with text content. Each text node is independent
and can be modified separately.

## Combining Text Nodes with Elements

This example demonstrates how to combine text nodes with HTML elements to create
more complex content structures.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Combining Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="article"&gt;&lt;/div&gt;

&lt;script&gt;
    const article = document.getElementById('article');
    
    const title = document.createElement('h2');
    const titleText = document.createTextNode('Article Title');
    title.appendChild(titleText);
    
    const para = document.createElement('p');
    const paraText = document.createTextNode('This is the article content.');
    para.appendChild(paraText);
    
    article.appendChild(title);
    article.appendChild(para);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we create both element nodes (h2 and p) and text nodes. The
text nodes are added to their respective parent elements before the elements
are added to the main article div.

This shows how createTextNode works with element creation to build
structured content. The text nodes provide the actual content while the elements
provide the semantic structure.

## Dynamic Content Updates

This example shows how to use text nodes to dynamically update content on a page.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Updates&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="counter"&gt;Count: &lt;/div&gt;
&lt;button onclick="incrementCounter()"&gt;Increment&lt;/button&gt;

&lt;script&gt;
    let count = 0;
    const counterText = document.createTextNode(count);
    document.getElementById('counter').appendChild(counterText);
    
    function incrementCounter() {
        count++;
        counterText.nodeValue = count;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a counter that increments when a button is clicked. The initial
count is displayed using a text node, which we update by modifying its
nodeValue property.

This demonstrates how text nodes can be used for efficient dynamic updates.
Instead of recreating the text node, we simply update the existing one, which
is more performant for frequent updates.

## Escaping HTML Characters

This example demonstrates how createTextNode automatically escapes
HTML characters, providing protection against XSS attacks.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;HTML Escaping&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="safe-content"&gt;&lt;/div&gt;

&lt;script&gt;
    const maliciousInput = '&lt;script&gt;alert("XSS")&lt;/script&gt;';
    const safeText = document.createTextNode(maliciousInput);
    document.getElementById('safe-content').appendChild(safeText);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we attempt to insert potentially malicious script content as
a text node. The createTextNode method automatically escapes the
HTML characters, rendering them as text rather than executable code.

This shows an important security benefit of using createTextNode
when displaying user-generated content. It helps prevent XSS attacks by
treating all input as literal text.

## Source

[MDN createTextNode Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode)

In this article, we have shown how to use document.createTextNode
in JavaScript. This method is essential for safely adding text content to the
DOM and is particularly useful when working with dynamic content.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).