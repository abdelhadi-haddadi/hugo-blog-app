+++
title = "JavaScript getBoundingClientRect"
date = 2025-08-29T19:53:21.907+01:00
draft = false
description = "Learn how to use JavaScript's getBoundingClientRect method effectively with examples. Master element positioning in web development."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript getBoundingClientRect

last modified April 2, 2025

This article explores the getBoundingClientRect method in JavaScript.
It provides detailed information about an element's size and position relative
to the viewport. This is essential for precise element positioning.

## Basic Definition

The getBoundingClientRect method returns a DOMRect object containing
size and position information about an element. The returned object includes
properties like top, right, bottom, left, width, and height.

These values are relative to the viewport (visible portion of the page). The
method is commonly used for element positioning, collision detection, and
animation calculations. It provides pixel-perfect measurements.

## Basic getBoundingClientRect

This example demonstrates how to get basic position information of an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic getBoundingClientRect&lt;/title&gt;
    &lt;style&gt;
        #box {
            width: 150px;
            height: 100px;
            background: lightblue;
            margin: 50px;
            padding: 20px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="box"&gt;Sample Box&lt;/div&gt;
&lt;button onclick="showPosition()"&gt;Show Position&lt;/button&gt;

&lt;script&gt;
    function showPosition() {
        const box = document.getElementById('box');
        const rect = box.getBoundingClientRect();
        
        console.log('Top:', rect.top);
        console.log('Right:', rect.right);
        console.log('Bottom:', rect.bottom);
        console.log('Left:', rect.left);
        console.log('Width:', rect.width);
        console.log('Height:', rect.height);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a styled div element and a button. When clicked, the button
logs the element's position and dimensions to the console. The values include
padding and border but not margin.

The getBoundingClientRect method returns all position-related
properties in one call. This is more efficient than querying individual
properties separately.

## Element Visibility Detection

This example shows how to check if an element is visible in the viewport.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Visibility Detection&lt;/title&gt;
    &lt;style&gt;
        #longContent {
            height: 2000px;
        }
        #target {
            position: absolute;
            top: 1500px;
            width: 200px;
            height: 100px;
            background: coral;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="longContent"&gt;Scroll down&lt;/div&gt;
&lt;div id="target"&gt;Target Element&lt;/div&gt;
&lt;button onclick="checkVisibility()"&gt;Check Visibility&lt;/button&gt;

&lt;script&gt;
    function checkVisibility() {
        const target = document.getElementById('target');
        const rect = target.getBoundingClientRect();
        
        const isVisible = (
            rect.top &gt;= 0 &amp;&amp;
            rect.left &gt;= 0 &amp;&amp;
            rect.bottom &lt;= (window.innerHeight || document.documentElement.clientHeight) &amp;&amp;
            rect.right &lt;= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        alert(isVisible ? 'Element is visible' : 'Element is not visible');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a long page with a target element positioned far down. The
script checks if the target element is currently visible in the viewport.

The visibility check compares the element's position with the viewport
dimensions. This technique is useful for lazy loading or scroll-based
animations.

## Element Centering

This example demonstrates how to center an element using position data.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Element Centering&lt;/title&gt;
    &lt;style&gt;
        #container {
            position: relative;
            width: 400px;
            height: 400px;
            border: 1px solid black;
        }
        #box {
            position: absolute;
            width: 100px;
            height: 100px;
            background: lightgreen;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div id="box"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="centerElement()"&gt;Center Box&lt;/button&gt;

&lt;script&gt;
    function centerElement() {
        const container = document.getElementById('container');
        const box = document.getElementById('box');
        
        const containerRect = container.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        
        const centerX = (containerRect.width - boxRect.width) / 2;
        const centerY = (containerRect.height - boxRect.height) / 2;
        
        box.style.left = `${centerX}px`;
        box.style.top = `${centerY}px`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code centers a box within its container when the button is clicked. It
calculates the center position using the dimensions from both elements.

The example shows how getBoundingClientRect can be used for precise
positioning calculations. This technique works regardless of the container's
position in the document.

## Collision Detection

This example implements basic collision detection between two elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Collision Detection&lt;/title&gt;
    &lt;style&gt;
        #container {
            position: relative;
            width: 500px;
            height: 300px;
            border: 1px solid black;
        }
        #box1, #box2 {
            position: absolute;
            width: 80px;
            height: 80px;
        }
        #box1 {
            background: lightblue;
            left: 50px;
            top: 50px;
        }
        #box2 {
            background: pink;
            left: 100px;
            top: 100px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div id="box1"&gt;Box 1&lt;/div&gt;
    &lt;div id="box2"&gt;Box 2&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="checkCollision()"&gt;Check Collision&lt;/button&gt;
&lt;p id="result"&gt;&lt;/p&gt;

&lt;script&gt;
    function checkCollision() {
        const box1 = document.getElementById('box1');
        const box2 = document.getElementById('box2');
        const result = document.getElementById('result');
        
        const rect1 = box1.getBoundingClientRect();
        const rect2 = box2.getBoundingClientRect();
        
        const isColliding = !(
            rect1.right &lt; rect2.left || 
            rect1.left &gt; rect2.right || 
            rect1.bottom &lt; rect2.top || 
            rect1.top &gt; rect2.bottom
        );
        
        result.textContent = isColliding ? 'Collision detected!' : 'No collision';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example checks if two positioned elements overlap. The collision detection
algorithm compares the boundaries of both elements.

The technique is useful for games, drag-and-drop interfaces, or any application
where element interaction matters. The algorithm can be extended for more
complex shapes.

## Scroll Position Tracking

This example tracks an element's position relative to the viewport during scroll.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scroll Tracking&lt;/title&gt;
    &lt;style&gt;
        #longContent {
            height: 2000px;
        }
        #tracker {
            position: fixed;
            top: 10px;
            right: 10px;
            background: white;
            padding: 10px;
            border: 1px solid black;
        }
        #target {
            position: absolute;
            top: 800px;
            width: 200px;
            height: 100px;
            background: gold;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="tracker"&gt;Scroll position: &lt;span id="position"&gt;0&lt;/span&gt;&lt;/div&gt;
&lt;div id="longContent"&gt;Scroll down to track the yellow box&lt;/div&gt;
&lt;div id="target"&gt;Target Element&lt;/div&gt;

&lt;script&gt;
    window.addEventListener('scroll', function() {
        const target = document.getElementById('target');
        const positionDisplay = document.getElementById('position');
        
        const rect = target.getBoundingClientRect();
        positionDisplay.textContent = `Top: ${Math.round(rect.top)}px`;
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a long scrolling page with a fixed position display. The
display shows the target element's current top position relative to the viewport.

The example demonstrates how getBoundingClientRect can be used in
scroll event handlers. This is useful for scroll-based animations or UI effects.

## Source

[MDN getBoundingClientRect Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

This article covered the getBoundingClientRect method with practical
examples. It's a powerful tool for element positioning and measurement in modern
web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).