+++
title = "JavaScript offsetTop"
date = 2025-08-29T19:53:27.506+01:00
draft = false
description = "Learn how to use JavaScript's offsetTop property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript offsetTop

last modified April 2, 2025

In this article, we explore the offsetTop property in JavaScript.
This property is essential for measuring element positions in the DOM, allowing
developers to determine exact pixel distances from the top of the viewport.

## Basic Definition

The offsetTop property returns the distance of the current element
relative to the top of the offsetParent node. This measurement is in pixels and
is read-only.

The offsetParent is the closest ancestor element that is positioned (not static).
If no such element exists, the offsetParent is the body element. This affects
how offsetTop values are calculated.

## Basic offsetTop Example

This example demonstrates how to get the offsetTop value of a simple div element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic offsetTop&lt;/title&gt;
    &lt;style&gt;
        #container {
            position: relative;
            margin-top: 50px;
        }
        #target {
            height: 100px;
            background-color: lightblue;
            margin-top: 30px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div id="target"&gt;Target Element&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const element = document.getElementById('target');
    console.log('offsetTop:', element.offsetTop);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a container div with relative positioning and a
target div inside it. The JavaScript code retrieves the target element's
offsetTop value and logs it to the console.

The offsetTop value will be 30px in this case, as that's the margin-top of the
target element. The container's margin doesn't affect this value because it's
the offsetParent.

## offsetTop with Different Positioning

This example shows how different positioning affects the offsetTop value.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;offsetTop with Positioning&lt;/title&gt;
    &lt;style&gt;
        body {
            margin: 0;
            padding: 0;
        }
        #parent1 {
            position: relative;
            top: 100px;
            height: 200px;
            background-color: #eee;
        }
        #parent2 {
            position: absolute;
            top: 50px;
            left: 50px;
            height: 100px;
            background-color: #ddd;
        }
        #child {
            position: relative;
            top: 20px;
            height: 50px;
            background-color: lightgreen;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parent1"&gt;
    &lt;div id="parent2"&gt;
        &lt;div id="child"&gt;Child Element&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const child = document.getElementById('child');
    console.log('Child offsetTop:', child.offsetTop);
    
    const parent2 = document.getElementById('parent2');
    console.log('Parent2 offsetTop:', parent2.offsetTop);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates how nested positioned elements affect offsetTop values.
The child element's offsetTop is relative to parent2, while parent2's offsetTop
is relative to parent1.

The child's offsetTop will be 20px (its top position), while parent2's offsetTop
will be 0px since it's absolutely positioned within parent1. The top property
doesn't affect offsetTop values.

## Scrolling and offsetTop

This example demonstrates how offsetTop behaves with page scrolling.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;offsetTop and Scrolling&lt;/title&gt;
    &lt;style&gt;
        body {
            height: 2000px;
        }
        #fixedElement {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: lightcoral;
            padding: 10px;
        }
        #scrollElement {
            margin-top: 500px;
            height: 100px;
            background-color: lightblue;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="fixedElement"&gt;
    Scroll position: &lt;span id="position"&gt;0&lt;/span&gt;px
&lt;/div&gt;

&lt;div id="scrollElement"&gt;Scroll to see my offsetTop&lt;/div&gt;

&lt;script&gt;
    window.addEventListener('scroll', function() {
        const element = document.getElementById('scrollElement');
        const positionDisplay = document.getElementById('position');
        
        positionDisplay.textContent = window.scrollY;
        console.log('Element offsetTop:', element.offsetTop);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a long page with a fixed position element showing scroll
position and a target element further down. As you scroll, the scroll position
updates but the offsetTop of the target element remains constant.

This demonstrates that offsetTop is not affected by scrolling - it always
measures the distance from the offsetParent, not the viewport. For viewport-
relative measurements, you would use getBoundingClientRect().top instead.

## Dynamic Content and offsetTop

This example shows how offsetTop changes when content is dynamically added.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Content and offsetTop&lt;/title&gt;
    &lt;style&gt;
        #container {
            position: relative;
        }
        .item {
            height: 50px;
            margin-bottom: 10px;
            background-color: lightgreen;
        }
        #target {
            background-color: lightblue;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div class="item"&gt;Item 1&lt;/div&gt;
    &lt;div class="item" id="target"&gt;Target Item&lt;/div&gt;
&lt;/div&gt;

&lt;button onclick="addItem()"&gt;Add Item Above&lt;/button&gt;
&lt;div id="output"&gt;Target offsetTop: 60px&lt;/div&gt;

&lt;script&gt;
    function addItem() {
        const container = document.getElementById('container');
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.textContent = 'New Item';
        
        const target = document.getElementById('target');
        container.insertBefore(newItem, target);
        
        updateOutput();
    }
    
    function updateOutput() {
        const target = document.getElementById('target');
        const output = document.getElementById('output');
        output.textContent = `Target offsetTop: ${target.offsetTop}px`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates how adding elements above a target affects its offsetTop.
Each time the button is clicked, a new item is inserted before the target item.

The target's offsetTop increases by 60px (50px height + 10px margin) with each
new item added above it. This shows how offsetTop dynamically reflects layout
changes in the DOM.

## Comparing offsetTop with Other Position Properties

This example compares offsetTop with clientTop and scrollTop properties.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Comparing Position Properties&lt;/title&gt;
    &lt;style&gt;
        #container {
            position: relative;
            border: 5px solid black;
            padding: 20px;
            margin-top: 50px;
            height: 200px;
            overflow: auto;
        }
        #content {
            height: 500px;
            background-color: lightblue;
            border: 3px solid red;
            padding: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div id="content"&gt;
        Scrollable content area. Scroll down to see values change.
    &lt;/div&gt;
&lt;/div&gt;

&lt;div id="output"&gt;&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const content = document.getElementById('content');
    const output = document.getElementById('output');
    
    container.addEventListener('scroll', function() {
        updateOutput();
    });
    
    function updateOutput() {
        output.innerHTML = `
            &lt;p&gt;content.offsetTop: ${content.offsetTop}px&lt;/p&gt;
            &lt;p&gt;content.clientTop: ${content.clientTop}px&lt;/p&gt;
            &lt;p&gt;container.scrollTop: ${container.scrollTop}px&lt;/p&gt;
        `;
    }
    
    updateOutput();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a scrollable container and compares three different position-
related properties: offsetTop, clientTop, and scrollTop. Each serves a different
purpose in measuring element positions.

offsetTop measures distance to offsetParent, clientTop measures border width,
and scrollTop measures scroll position. As you scroll, only scrollTop changes,
demonstrating how these properties differ.

## Source

[MDN offsetTop Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop)

In this article, we have shown how to use the offsetTop property in JavaScript.
This property is fundamental for measuring element positions and understanding
layout in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).