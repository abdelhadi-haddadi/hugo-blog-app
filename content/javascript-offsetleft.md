+++
title = "JavaScript offsetLeft"
date = 2025-08-29T19:53:26.391+01:00
draft = false
description = "Learn how to use JavaScript's offsetLeft property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript offsetLeft

last modified April 2, 2025

In this article, we explore the offsetLeft property in JavaScript.
This property is essential for determining an element's position relative to its
offset parent in the DOM.

## Basic Definition

The offsetLeft property returns the number of pixels that the upper
left corner of the current element is offset to the left within its offset
parent. The offset parent is the nearest ancestor element with a positioned
layout.

If no offset parent exists, the property returns the distance from the outer
left edge of the element to the inner left edge of the viewport. This property
is read-only and returns an integer value.

## Basic offsetLeft Example

This example demonstrates how to access the offsetLeft value of a simple div.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic offsetLeft&lt;/title&gt;
    &lt;style&gt;
        #container {
            position: relative;
            margin: 50px;
            border: 1px solid black;
            width: 300px;
            height: 200px;
        }
        #box {
            position: absolute;
            left: 40px;
            top: 30px;
            width: 100px;
            height: 100px;
            background-color: lightblue;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div id="box"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const box = document.getElementById('box');
    console.log('offsetLeft:', box.offsetLeft);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a container div with relative positioning and a
nested box div with absolute positioning. The JavaScript code logs the box's
offsetLeft value to the console.

The output will be 40, matching the left CSS property value, because the
container is the offset parent. This demonstrates how offsetLeft measures the
distance from the offset parent's left edge.

## offsetLeft with Different Offset Parents

This example shows how offsetLeft changes with different offset parent scenarios.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;offsetLeft with Different Parents&lt;/title&gt;
    &lt;style&gt;
        body {
            margin: 0;
            padding: 20px;
        }
        #parent1 {
            position: relative;
            left: 50px;
            border: 1px solid red;
            padding: 20px;
            margin-bottom: 20px;
        }
        #parent2 {
            border: 1px solid blue;
            padding: 20px;
        }
        .child {
            width: 100px;
            height: 100px;
            background-color: lightgreen;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parent1"&gt;
    &lt;div class="child" id="child1"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;div id="parent2"&gt;
    &lt;div class="child" id="child2"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const child1 = document.getElementById('child1');
    const child2 = document.getElementById('child2');
    
    console.log('Child1 offsetLeft:', child1.offsetLeft);
    console.log('Child2 offsetLeft:', child2.offsetLeft);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have two parent divs with different positioning. The first parent has
relative positioning, making it the offset parent for its child. The second
parent has static positioning.

The first child's offsetLeft will be 20 (padding), while the second child's
offsetLeft will be relative to the viewport since its parent isn't positioned.
This shows how offset parent affects offsetLeft values.

## Dynamic offsetLeft Changes

This example demonstrates how offsetLeft changes when element position changes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic offsetLeft&lt;/title&gt;
    &lt;style&gt;
        #container {
            position: relative;
            width: 400px;
            height: 200px;
            border: 1px solid black;
        }
        #movable {
            position: absolute;
            width: 50px;
            height: 50px;
            background-color: coral;
            left: 20px;
            transition: left 0.5s;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div id="movable"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="moveBox()"&gt;Move Box&lt;/button&gt;
&lt;p id="positionInfo"&gt;Current offsetLeft: 20&lt;/p&gt;

&lt;script&gt;
    function moveBox() {
        const box = document.getElementById('movable');
        const info = document.getElementById('positionInfo');
        
        const currentLeft = parseInt(box.style.left) || 20;
        const newLeft = currentLeft + 30;
        
        box.style.left = newLeft + 'px';
        info.textContent = 'Current offsetLeft: ' + box.offsetLeft;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a movable box inside a container. Clicking the button
moves the box right by 30 pixels and updates the displayed offsetLeft value.

This demonstrates how offsetLeft dynamically reflects changes to an element's
position. The property updates immediately when the element's position changes,
making it useful for real-time positioning calculations.

## Comparing offsetLeft with Other Position Properties

This example compares offsetLeft with clientLeft and scrollLeft properties.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Position Properties Comparison&lt;/title&gt;
    &lt;style&gt;
        #comparison {
            position: relative;
            width: 300px;
            height: 150px;
            border: 5px solid black;
            padding: 20px;
            margin: 50px;
            overflow: auto;
        }
        #content {
            width: 500px;
            height: 100px;
            background-color: lightyellow;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="comparison"&gt;
    &lt;div id="content"&gt;Scrollable content to demonstrate differences&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="showValues()"&gt;Show Values&lt;/button&gt;
&lt;div id="output"&gt;&lt;/div&gt;

&lt;script&gt;
    function showValues() {
        const element = document.getElementById('comparison');
        const output = document.getElementById('output');
        
        output.innerHTML = `
            &lt;p&gt;offsetLeft: ${element.offsetLeft}&lt;/p&gt;
            &lt;p&gt;clientLeft: ${element.clientLeft}&lt;/p&gt;
            &lt;p&gt;scrollLeft: ${element.scrollLeft}&lt;/p&gt;
        `;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a scrollable container and compares three different left
position properties: offsetLeft, clientLeft, and scrollLeft. Each property
measures a different aspect of the element's position.

offsetLeft shows the distance from the offset parent, clientLeft shows the
width of the left border, and scrollLeft shows the scrolled horizontal pixels.
This helps understand when to use each property.

## Practical Use Case: Tooltip Positioning

This example demonstrates a practical use of offsetLeft for tooltip positioning.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Tooltip Positioning&lt;/title&gt;
    &lt;style&gt;
        .item {
            display: inline-block;
            width: 100px;
            height: 50px;
            margin: 10px;
            background-color: lightblue;
            text-align: center;
            line-height: 50px;
            position: relative;
        }
        .tooltip {
            position: absolute;
            background-color: black;
            color: white;
            padding: 5px;
            border-radius: 3px;
            white-space: nowrap;
            top: -30px;
            visibility: hidden;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="item" onmouseover="showTooltip(this)" onmouseout="hideTooltip(this)"&gt;
    Item 1
    &lt;div class="tooltip"&gt;This is item 1&lt;/div&gt;
&lt;/div&gt;
&lt;div class="item" onmouseover="showTooltip(this)" onmouseout="hideTooltip(this)"&gt;
    Item 2
    &lt;div class="tooltip"&gt;This is item 2&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    function showTooltip(element) {
        const tooltip = element.querySelector('.tooltip');
        tooltip.style.left = (element.offsetLeft + element.offsetWidth/2 - 
                            tooltip.offsetWidth/2) + 'px';
        tooltip.style.visibility = 'visible';
    }
    
    function hideTooltip(element) {
        const tooltip = element.querySelector('.tooltip');
        tooltip.style.visibility = 'hidden';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this practical example, we use offsetLeft to position tooltips centered above
their respective items. The tooltip's left position is calculated based on the
item's offsetLeft and width.

This demonstrates how offsetLeft can be used in real-world scenarios to create
dynamic, positioned elements. The calculation centers the tooltip by accounting
for both the item's position and the tooltip's width.

## Source

[MDN offsetLeft Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft)

In this article, we have shown how to use the offsetLeft property
in JavaScript. This property is fundamental for determining element positions
and creating dynamic layouts in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).