+++
title = "JavaScript classList.toggle"
date = 2025-08-29T19:53:17.425+01:00
draft = false
description = "Learn how to use JavaScript's classList.toggle method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript classList.toggle

last modified April 2, 2025

In this article, we explore the classList.toggle method in
JavaScript. This method is essential for dynamic CSS class manipulation,
allowing developers to add or remove classes from elements with ease.

## Basic Definition

The classList.toggle method adds or removes a CSS class from an
element. If the class exists, it removes it; if it doesn't exist, it adds it.
This provides a simple way to switch between visual states.

The method returns true if the class is added and false if it is removed. It
optionally accepts a second boolean parameter to force add or remove the class.

## Basic classList.toggle

This example demonstrates how to toggle a simple CSS class on a div element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic classList.toggle&lt;/title&gt;
    &lt;style&gt;
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;Click me to highlight!&lt;/div&gt;

&lt;script&gt;
    const element = document.getElementById('content');
    element.addEventListener('click', function() {
        this.classList.toggle('highlight');
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element with an event listener. When
clicked, the highlight class is toggled on the element.

This demonstrates the fundamental usage of classList.toggle to
dynamically change element styling. The method automatically handles both
adding and removing the class.

## Toggle with Button Control

This example shows how to toggle a class using a separate button element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Toggle with Button&lt;/title&gt;
    &lt;style&gt;
        .active {
            color: red;
            border: 2px solid red;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="text"&gt;This text can be activated&lt;/p&gt;
&lt;button id="toggleBtn"&gt;Toggle Active State&lt;/button&gt;

&lt;script&gt;
    const text = document.getElementById('text');
    const button = document.getElementById('toggleBtn');
    
    button.addEventListener('click', function() {
        text.classList.toggle('active');
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a paragraph and a button. When the button is clicked, the
active class is toggled on the paragraph element.

This demonstrates how classList.toggle can be controlled by
separate elements. The styling changes are kept in CSS while JavaScript
handles the state changes.

## Forced Toggle with Boolean Parameter

This example demonstrates the optional force parameter of toggle.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Forced Toggle&lt;/title&gt;
    &lt;style&gt;
        .hidden {
            display: none;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="box"&gt;Content to show/hide&lt;/div&gt;
&lt;button onclick="showContent()"&gt;Show&lt;/button&gt;
&lt;button onclick="hideContent()"&gt;Hide&lt;/button&gt;

&lt;script&gt;
    const box = document.getElementById('box');
    
    function showContent() {
        box.classList.toggle('hidden', false);
    }
    
    function hideContent() {
        box.classList.toggle('hidden', true);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have two buttons that force the hidden class
to be either added or removed, rather than toggling. The second parameter
controls this behavior.

This shows how classList.toggle can be used to explicitly add or
remove classes without checking current state. The force parameter makes the
method behave like add or remove.

## Toggle Multiple Classes

This example shows how to toggle multiple classes simultaneously.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Classes&lt;/title&gt;
    &lt;style&gt;
        .big {
            font-size: 2em;
        }
        .blue {
            color: blue;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="text"&gt;Click to change my appearance&lt;/p&gt;

&lt;script&gt;
    const text = document.getElementById('text');
    text.addEventListener('click', function() {
        this.classList.toggle('big');
        this.classList.toggle('blue');
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we toggle two different classes on a paragraph element when clicked. Both
classes are added or removed together, creating a compound visual change.

This demonstrates how multiple classList.toggle calls can be used
together to create more complex styling changes. Each class is toggled
independently of the others.

## Dark/Light Mode Toggle

This example creates a complete dark/light mode toggle for a page.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dark Mode Toggle&lt;/title&gt;
    &lt;style&gt;
        body {
            background: white;
            color: black;
            transition: all 0.3s ease;
        }
        body.dark {
            background: #222;
            color: white;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;Dark Mode Example&lt;/h1&gt;
&lt;p&gt;Click the button to toggle dark mode&lt;/p&gt;
&lt;button id="modeToggle"&gt;Toggle Dark Mode&lt;/button&gt;

&lt;script&gt;
    const toggle = document.getElementById('modeToggle');
    toggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this practical example, clicking the button toggles a dark class
on the body element. The CSS handles all the styling changes for dark mode.

This demonstrates a real-world use case for classList.toggle. The
transition property creates a smooth animation between the two states.

## Source

[MDN classList.toggle Documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle)

In this article, we have shown how to use classList.toggle in
JavaScript. This method is fundamental for dynamic class manipulation and state
management in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).