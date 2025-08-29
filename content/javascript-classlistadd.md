+++
title = "JavaScript classList.add"
date = 2025-08-29T19:53:16.329+01:00
draft = false
description = "Learn how to use JavaScript's classList.add method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript classList.add

last modified April 2, 2025

In this article, we explore the element.classList.add method in
JavaScript. This method is essential for dynamically manipulating CSS classes
on DOM elements, allowing for flexible styling and state management.

## Basic Definition

The classList.add method adds one or more class names to an
element's class attribute. If the class already exists on the element, it
won't be added again, preventing duplicates.

The classList property provides methods to manipulate an element's
classes without directly working with strings. It's more convenient than
modifying the className property directly.

## Adding a Single Class

This example demonstrates how to add a single CSS class to an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Adding Single Class&lt;/title&gt;
    &lt;style&gt;
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="text"&gt;This text will be highlighted.&lt;/p&gt;
&lt;button onclick="highlightText()"&gt;Highlight&lt;/button&gt;

&lt;script&gt;
    function highlightText() {
        const textElement = document.getElementById('text');
        textElement.classList.add('highlight');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a paragraph and a button. When the button is clicked,
the highlightText function adds the 'highlight' class to the
paragraph using classList.add.

This demonstrates the basic usage of classList.add to apply CSS
styles dynamically. The method is called on an element's classList
property with the class name as an argument.

## Adding Multiple Classes

This example shows how to add multiple classes to an element at once.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Adding Multiple Classes&lt;/title&gt;
    &lt;style&gt;
        .big {
            font-size: 24px;
        }
        .red {
            color: red;
        }
        .border {
            border: 2px solid black;
            padding: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;This content will be styled.&lt;/div&gt;
&lt;button onclick="styleContent()"&gt;Style Content&lt;/button&gt;

&lt;script&gt;
    function styleContent() {
        const content = document.getElementById('content');
        content.classList.add('big', 'red', 'border');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a div element and a button. When clicked, the button adds three
classes ('big', 'red', and 'border') to the div using a single
classList.add call.

This demonstrates that classList.add can accept multiple arguments,
each representing a class to add. The classes are added in the order specified.

## Toggle Element Visibility

This example demonstrates using classList.add to show/hide elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Toggle Visibility&lt;/title&gt;
    &lt;style&gt;
        .hidden {
            display: none;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="message" class="hidden"&gt;This message was hidden!&lt;/p&gt;
&lt;button onclick="showMessage()"&gt;Show Message&lt;/button&gt;

&lt;script&gt;
    function showMessage() {
        const message = document.getElementById('message');
        message.classList.remove('hidden');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a hidden paragraph and a button. When the button is
clicked, the hidden class is removed to show the paragraph.

While this example uses classList.remove, it demonstrates how
classList.add would work for the opposite functionality (hiding
the element). The classList methods work together for complete
class manipulation.

## Dynamic Theme Switching

This example shows how to use classList.add to switch themes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Theme Switching&lt;/title&gt;
    &lt;style&gt;
        body {
            transition: background-color 0.3s, color 0.3s;
        }
        .dark {
            background-color: #333;
            color: white;
        }
        .light {
            background-color: white;
            color: black;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body class="light"&gt;

&lt;h1&gt;Theme Switcher&lt;/h1&gt;
&lt;button onclick="switchToDark()"&gt;Dark Theme&lt;/button&gt;
&lt;button onclick="switchToLight()"&gt;Light Theme&lt;/button&gt;

&lt;script&gt;
    function switchToDark() {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    }
    
    function switchToLight() {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a page with two theme options. The buttons switch between light
and dark themes by adding and removing the appropriate classes.

This demonstrates a practical use of classList.add for theme
switching. The transition property creates a smooth color change effect when
themes are switched.

## Form Validation Styling

This example shows how to use classList.add for form validation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Form Validation&lt;/title&gt;
    &lt;style&gt;
        .error {
            border: 2px solid red;
        }
        .success {
            border: 2px solid green;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" id="username" placeholder="Enter username"&gt;
&lt;button onclick="validateInput()"&gt;Validate&lt;/button&gt;
&lt;p id="message"&gt;&lt;/p&gt;

&lt;script&gt;
    function validateInput() {
        const input = document.getElementById('username');
        const message = document.getElementById('message');
        
        if (input.value.length &lt; 3) {
            input.classList.add('error');
            input.classList.remove('success');
            message.textContent = 'Username must be at least 3 characters';
        } else {
            input.classList.add('success');
            input.classList.remove('error');
            message.textContent = 'Username is valid!';
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we validate a username input field. If validation fails, we add
an 'error' class; if it passes, we add a 'success' class.

This demonstrates how classList.add can be used for visual feedback
in form validation. The method helps maintain clean separation between
JavaScript logic and CSS styling.

## Source

[MDN classList Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

In this article, we have shown how to use element.classList.add
in JavaScript. This method is fundamental for dynamic CSS class manipulation
in modern web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).