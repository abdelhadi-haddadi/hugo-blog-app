+++
title = "JavaScript previousElementSibling"
date = 2025-08-29T19:53:29.739+01:00
draft = false
description = "Learn how to use JavaScript's previousElementSibling property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript previousElementSibling

last modified April 2, 2025

In this article, we explore the previousElementSibling property in
JavaScript. This property is essential for DOM traversal, allowing developers to
access the previous sibling element in the DOM tree.

## Basic Definition

The previousElementSibling property returns the previous element
node at the same tree level. It only returns element nodes, ignoring text nodes
and comments.

This property is read-only and belongs to the Element interface. If there are no
previous element siblings, it returns null. It's useful for navigating between
sibling elements without using complex selectors.

## Basic previousElementSibling

This example demonstrates how to access the previous sibling of an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic previousElementSibling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="first"&gt;First div&lt;/div&gt;
&lt;div id="second"&gt;Second div&lt;/div&gt;

&lt;script&gt;
    const secondDiv = document.getElementById('second');
    const previousDiv = secondDiv.previousElementSibling;
    console.log(previousDiv.textContent); // Outputs: First div
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have two div elements. We select the second div and
use previousElementSibling to access its previous sibling.

The property returns the first div element, and we log its text content. This
shows the fundamental usage of previousElementSibling for DOM
navigation between sibling elements.

## Changing Previous Sibling Style

This example shows how to modify the style of a previous sibling element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Changing Previous Sibling Style&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;First paragraph&lt;/p&gt;
&lt;p id="target"&gt;Second paragraph&lt;/p&gt;
&lt;button onclick="highlightPrevious()"&gt;Highlight Previous&lt;/button&gt;

&lt;script&gt;
    function highlightPrevious() {
        const target = document.getElementById('target');
        const previous = target.previousElementSibling;
        previous.style.backgroundColor = 'yellow';
        previous.style.padding = '10px';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have two paragraphs and a button. When clicked, the button finds the
previous sibling of the target paragraph and changes its style.

This demonstrates how previousElementSibling can be used to
dynamically modify the appearance of adjacent elements in response to user
actions.

## Navigation in List Items

This example demonstrates using previousElementSibling in an unordered list.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;List Navigation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li id="second"&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;
&lt;button onclick="showPrevious()"&gt;Show Previous Item&lt;/button&gt;

&lt;script&gt;
    function showPrevious() {
        const current = document.getElementById('second');
        const previous = current.previousElementSibling;
        alert('Previous item: ' + previous.textContent);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a list with three items. The button triggers a function
that finds the previous sibling of the middle list item.

This shows how previousElementSibling can be useful for navigating
through list structures and accessing adjacent items in the DOM.

## Form Field Navigation

This example shows how to navigate between form fields using previousElementSibling.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Form Field Navigation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" placeholder="First name"&gt;
&lt;input type="text" id="lastName" placeholder="Last name"&gt;
&lt;button onclick="focusPrevious()"&gt;Focus Previous Field&lt;/button&gt;

&lt;script&gt;
    function focusPrevious() {
        const lastNameField = document.getElementById('lastName');
        const previousField = lastNameField.previousElementSibling;
        previousField.focus();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have two input fields and a button. When clicked, the button moves focus
to the previous input field relative to the last name field.

This demonstrates a practical use case for previousElementSibling in
form navigation, allowing for intuitive field-to-field movement.

## Checking for Previous Sibling

This example shows how to check if an element has a previous sibling.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Checking for Previous Sibling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="first"&gt;First element&lt;/div&gt;
&lt;div id="second"&gt;Second element&lt;/div&gt;
&lt;button onclick="checkSiblings()"&gt;Check Siblings&lt;/button&gt;
&lt;p id="result"&gt;&lt;/p&gt;

&lt;script&gt;
    function checkSiblings() {
        const first = document.getElementById('first');
        const result = document.getElementById('result');
        
        if (first.previousElementSibling) {
            result.textContent = 'Has previous sibling';
        } else {
            result.textContent = 'No previous sibling';
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we check whether the first div element has a previous sibling.
The result is displayed in a paragraph element.

This demonstrates how to safely use previousElementSibling by first
checking if it exists before attempting to access its properties or methods.

## Source

[MDN previousElementSibling Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling)

In this article, we have shown how to use the previousElementSibling
property in JavaScript. This property is fundamental for DOM traversal and
element navigation in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).