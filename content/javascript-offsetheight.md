+++
title = "JavaScript offsetHeight"
date = 2025-08-29T19:53:26.369+01:00
draft = false
description = "Learn how to use JavaScript's offsetHeight property to measure element dimensions with examples and detailed explanations. Enhance your web development skills with this tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript offsetHeight

last modified April 2, 2025

In this article, we explore the offsetHeight property in JavaScript.
This property is essential for measuring the height of elements including
padding, borders, and scrollbars (if rendered).

## Basic Definition

The offsetHeight property returns the height of an element in
pixels, including vertical padding and borders. It is a read-only property that
provides the element's layout height.

Unlike clientHeight, offsetHeight includes the element's
borders and scrollbar (if present). It does not include margins or elements
outside the visible area.

## Basic offsetHeight Example

This example demonstrates how to get the height of a simple div element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic offsetHeight&lt;/title&gt;
    &lt;style&gt;
        #box {
            height: 150px;
            padding: 20px;
            border: 5px solid black;
            margin: 30px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="box"&gt;Content&lt;/div&gt;
&lt;button onclick="showHeight()"&gt;Show Height&lt;/button&gt;
&lt;p id="output"&gt;&lt;/p&gt;

&lt;script&gt;
    function showHeight() {
        const box = document.getElementById('box');
        const output = document.getElementById('output');
        output.textContent = `Element height: ${box.offsetHeight}px`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div with specified height, padding, border, and
margin. When the button is clicked, the offsetHeight is displayed.

The reported height will be 200px (150px content + 40px padding + 10px border).
Note that margin is not included in the offsetHeight calculation.

## Comparing offsetHeight with clientHeight

This example shows the difference between offsetHeight and
clientHeight.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Height Comparison&lt;/title&gt;
    &lt;style&gt;
        #container {
            height: 200px;
            padding: 15px;
            border: 10px solid blue;
            overflow: auto;
        }
        #content {
            height: 300px;
            background: #eee;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div id="content"&gt;Scrollable content&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="compareHeights()"&gt;Compare Heights&lt;/button&gt;
&lt;p id="result"&gt;&lt;/p&gt;

&lt;script&gt;
    function compareHeights() {
        const container = document.getElementById('container');
        const result = document.getElementById('result');
        
        result.innerHTML = `
            offsetHeight: ${container.offsetHeight}px&lt;br&gt;
            clientHeight: ${container.clientHeight}px
        `;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a scrollable container with a larger content div. The
offsetHeight includes padding and borders, while
clientHeight only includes padding.

The offsetHeight will be 250px (200px + 30px padding + 20px border)
while clientHeight will be 230px (200px + 30px padding).

## Dynamic Height Measurement

This example demonstrates how offsetHeight changes with dynamic
content.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Height&lt;/title&gt;
    &lt;style&gt;
        #dynamic {
            border: 2px solid green;
            padding: 10px;
            width: 300px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="dynamic"&gt;Initial content&lt;/div&gt;
&lt;button onclick="addContent()"&gt;Add Content&lt;/button&gt;
&lt;button onclick="showHeight()"&gt;Show Height&lt;/button&gt;
&lt;p id="heightDisplay"&gt;&lt;/p&gt;

&lt;script&gt;
    function addContent() {
        const div = document.getElementById('dynamic');
        div.innerHTML += '&lt;br&gt;Additional line of content';
    }
    
    function showHeight() {
        const div = document.getElementById('dynamic');
        const display = document.getElementById('heightDisplay');
        display.textContent = `Current height: ${div.offsetHeight}px`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how offsetHeight changes as content is added to
an element. The height increases as more content makes the element grow taller.

Each click on "Add Content" adds a new line, and "Show Height" displays the
current offsetHeight. This demonstrates the property's dynamic
nature.

## Measuring Hidden Elements

This example explores how offsetHeight behaves with hidden elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Hidden Elements&lt;/title&gt;
    &lt;style&gt;
        #hiddenBox {
            height: 100px;
            padding: 20px;
            border: 5px solid red;
            background: #ffdddd;
        }
        .hidden {
            display: none;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="hiddenBox"&gt;This element can be hidden&lt;/div&gt;
&lt;button onclick="toggleVisibility()"&gt;Toggle Visibility&lt;/button&gt;
&lt;button onclick="checkHeight()"&gt;Check Height&lt;/button&gt;
&lt;p id="heightInfo"&gt;&lt;/p&gt;

&lt;script&gt;
    function toggleVisibility() {
        const box = document.getElementById('hiddenBox');
        box.classList.toggle('hidden');
    }
    
    function checkHeight() {
        const box = document.getElementById('hiddenBox');
        const info = document.getElementById('heightInfo');
        info.textContent = `offsetHeight: ${box.offsetHeight}px`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates that offsetHeight returns 0 for elements
with display: none. The property only measures visible elements.

When the element is visible, it returns the full height (150px). When hidden, it
returns 0. This is important for layout calculations involving hidden elements.

## Responsive Layout Example

This example shows how to use offsetHeight in responsive design.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Responsive Layout&lt;/title&gt;
    &lt;style&gt;
        #responsive {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 3px solid #333;
            resize: both;
            overflow: auto;
        }
        #sizeInfo {
            margin-top: 10px;
            font-weight: bold;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="responsive"&gt;
    Resizable container. Try resizing me by dragging the bottom-right corner.
    &lt;p id="sizeInfo"&gt;&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('responsive');
    const info = document.getElementById('sizeInfo');
    
    function updateSizeInfo() {
        info.textContent = `Current height: ${container.offsetHeight}px`;
    }
    
    // Update on initial load
    updateSizeInfo();
    
    // Update on resize
    container.addEventListener('mouseup', updateSizeInfo);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a resizable container and displays its current height using
offsetHeight. The height updates when the user resizes the element.

The resize: both CSS property makes the element resizable. The
mouseup event triggers the height measurement after resizing.

## Source

[MDN offsetHeight Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight)

In this article, we have explored the offsetHeight property in
JavaScript. This property is crucial for accurate element height measurements
including borders and padding in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).