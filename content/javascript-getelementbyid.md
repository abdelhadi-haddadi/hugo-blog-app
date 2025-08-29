+++
title = "JavaScript getElementById"
date = 2025-08-29T19:53:09.500+01:00
draft = false
description = "Learn how to use JavaScript's getElementById method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript getElementById

last modified April 2, 2025

In this article, we explore the document.getElementById method in
JavaScript. This method is essential for DOM manipulation, allowing developers
to access specific elements by their unique ID attribute.

## Basic Definition

The document.getElementById method returns the element that has the
ID attribute with the specified value. This is one of the most common and
important methods for working with the DOM in JavaScript.

Element IDs should be unique within a page. If multiple elements share the same
ID, getElementById returns the first element it encounters with that
ID.

## Basic getElementById

This example demonstrates how to access a simple div element by its ID.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic getElementById&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;Hello there!&lt;/div&gt;

&lt;script&gt;
    const element = document.getElementById('content');
    console.log(element.textContent);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element with the ID "content". The
JavaScript code retrieves this element using getElementById and
logs its text content to the console.

This demonstrates the fundamental usage of getElementById to access
and work with DOM elements. The method returns the element object, which we can
then manipulate in various ways.

## Changing Element Content

This example shows how to modify the content of an element using getElementById.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Changing Content&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1 id="heading"&gt;Original Heading&lt;/h1&gt;
&lt;button onclick="changeText()"&gt;Change Text&lt;/button&gt;

&lt;script&gt;
    function changeText() {
        const heading = document.getElementById('heading');
        heading.textContent = 'New Heading Text!';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a heading element and a button. When the button is clicked, the
changeText function is called, which uses
getElementById to find the heading and change its text content.

This demonstrates how getElementById can be used in event handlers
to dynamically modify page content. The textContent property is
used to safely set the text, avoiding potential XSS vulnerabilities that might
occur with innerHTML.

## Changing Element Style

This example demonstrates how to change the style of an element using getElementById.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Changing Style&lt;/title&gt;
    &lt;style&gt;
        #colorBox {
            width: 200px;
            height: 200px;
            background-color: blue;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="colorBox"&gt;&lt;/div&gt;
&lt;button onclick="changeColor()"&gt;Change Color&lt;/button&gt;

&lt;script&gt;
    function changeColor() {
        const box = document.getElementById('colorBox');
        box.style.backgroundColor = 'red';
        box.style.borderRadius = '50%';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a colored box and a button. When the button is clicked,
the changeColor function uses getElementById to access
the box and modify its style properties.

This shows how getElementById can be used to dynamically change CSS
properties of elements. The style property provides access to all
CSS properties of an element, allowing for rich visual changes.

## Form Input Handling

This example demonstrates how to get values from form inputs using getElementById.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Form Handling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" id="username" placeholder="Enter your name"&gt;
&lt;button onclick="greetUser()"&gt;Greet&lt;/button&gt;
&lt;p id="greeting"&gt;&lt;/p&gt;

&lt;script&gt;
    function greetUser() {
        const nameInput = document.getElementById('username');
        const greetingElement = document.getElementById('greeting');
        
        greetingElement.textContent = `Hello, ${nameInput.value}!`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a text input field and a button. When the button is clicked, the
greetUser function retrieves the input value using
getElementById and displays a greeting message.

This demonstrates a common use case for getElementById in form
handling. The value property of input elements contains the current
user input, which can be accessed and processed as needed.

## Event Listener Registration

This example shows how to register event listeners using getElementById.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Event Listeners&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="myButton"&gt;Click Me&lt;/button&gt;
&lt;p id="message"&gt;&lt;/p&gt;

&lt;script&gt;
    const button = document.getElementById('myButton');
    const message = document.getElementById('message');
    
    button.addEventListener('click', function() {
        message.textContent = 'Button was clicked!';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we use getElementById to get references to a
button and a paragraph element. We then register a click event listener on the
button that updates the paragraph text when the button is clicked.

This demonstrates how getElementById is often used to get element
references for event listener registration. The addEventListener
method provides a flexible way to handle user interactions.

## Source

[MDN getElementById Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)

In this article, we have shown how to use document.getElementById
in JavaScript. This method is fundamental for DOM manipulation and element
selection in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).