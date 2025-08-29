+++
title = "JavaScript classList.remove"
date = 2025-08-29T19:53:17.447+01:00
draft = false
description = "Learn how to use JavaScript's classList.remove method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript classList.remove

last modified April 2, 2025

In this article, we explore the classList.remove method in
JavaScript. This method is essential for dynamic CSS class manipulation,
allowing developers to remove classes from DOM elements programmatically.

## Basic Definition

The classList.remove method removes one or more class names from
an element's class attribute. It is part of the DOMTokenList interface
returned by the classList property.

This method provides a clean way to manipulate CSS classes without directly
working with the className string. It automatically handles whitespace and
duplicates, making it safer than string manipulation.

## Removing a Single Class

This example demonstrates how to remove a single class from an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Remove Single Class&lt;/title&gt;
    &lt;style&gt;
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="text" class="highlight"&gt;This text will lose its highlight.&lt;/p&gt;
&lt;button onclick="removeHighlight()"&gt;Remove Highlight&lt;/button&gt;

&lt;script&gt;
    function removeHighlight() {
        const textElement = document.getElementById('text');
        textElement.classList.remove('highlight');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a paragraph with the 'highlight' class that gives it
a yellow background. The button click triggers the removal of this class using
classList.remove.

The method takes the class name as a string argument. If the class doesn't
exist on the element, the method silently fails without throwing an error.

## Removing Multiple Classes

This example shows how to remove multiple classes from an element at once.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Remove Multiple Classes&lt;/title&gt;
    &lt;style&gt;
        .big {
            font-size: 2em;
        }
        .red {
            color: red;
        }
        .border {
            border: 2px solid black;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="box" class="big red border"&gt;Styled Box&lt;/div&gt;
&lt;button onclick="stripStyles()"&gt;Remove Styles&lt;/button&gt;

&lt;script&gt;
    function stripStyles() {
        const box = document.getElementById('box');
        box.classList.remove('big', 'red', 'border');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a div with three classes that apply different styles. The button
click removes all three classes simultaneously by passing multiple arguments to
classList.remove.

Each argument represents a class to remove. The method processes them in order,
and non-existent classes are simply ignored. This is more efficient than
calling remove multiple times.

## Conditional Class Removal

This example demonstrates removing a class only if it exists on the element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Conditional Removal&lt;/title&gt;
    &lt;style&gt;
        .active {
            background-color: lightgreen;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="panel"&gt;Content Panel&lt;/div&gt;
&lt;button onclick="toggleActive()"&gt;Toggle Active&lt;/button&gt;

&lt;script&gt;
    function toggleActive() {
        const panel = document.getElementById('panel');
        
        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
        } else {
            panel.classList.add('active');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows a common pattern of toggling a class. We first check if the
class exists using classList.contains, then remove it if present.

This approach ensures we only remove the class when necessary. The
classList.toggle method could also be used here for simpler code.

## Removing Classes After Animation

This example shows how to remove animation classes after the animation completes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animation Class Removal&lt;/title&gt;
    &lt;style&gt;
        .animate {
            animation: fadeIn 1s;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="message"&gt;Hello, World!&lt;/div&gt;
&lt;button onclick="animateMessage()"&gt;Animate&lt;/button&gt;

&lt;script&gt;
    function animateMessage() {
        const msg = document.getElementById('message');
        msg.classList.add('animate');
        
        msg.addEventListener('animationend', function() {
            msg.classList.remove('animate');
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we add an animation class to trigger a fade-in effect, then remove it
after the animation completes by listening for the animationend
event.

This pattern prevents animation classes from persisting unnecessarily and
allows the animation to be retriggered. It's a clean way to handle one-time
animations.

## Removing Classes from Multiple Elements

This example demonstrates removing a class from multiple elements at once.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Elements&lt;/title&gt;
    &lt;style&gt;
        .selected {
            outline: 2px solid blue;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="item selected"&gt;Item 1&lt;/div&gt;
&lt;div class="item selected"&gt;Item 2&lt;/div&gt;
&lt;div class="item selected"&gt;Item 3&lt;/div&gt;
&lt;button onclick="clearSelection()"&gt;Clear Selection&lt;/button&gt;

&lt;script&gt;
    function clearSelection() {
        const items = document.querySelectorAll('.item');
        
        items.forEach(item =&gt; {
            item.classList.remove('selected');
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we select all elements with the 'item' class and remove the
'selected' class from each one. This demonstrates batch processing of elements.

We use querySelectorAll to get the NodeList, then iterate with
forEach. The classList.remove method works the same
way on each element in the collection.

## Source

[MDN classList Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

In this article, we have shown how to use classList.remove in
JavaScript. This method is fundamental for dynamic CSS class manipulation in
modern web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).