+++
title = "JavaScript Canvas Rect Tutorial"
date = 2025-08-27T23:21:58.881+01:00
draft = false
description = "Learn how to use JavaScript Canvas rectangle methods effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Rect Tutorial

last modified April 3, 2025

In this article, we explore the Canvas rectangle methods in JavaScript. These
methods are essential for drawing rectangles on HTML canvas. Mastering rectangle
drawing is crucial for creating UI elements and visualizations.

## Basic Definition

Canvas rectangles are fundamental shapes drawn using specific methods. The main
methods are fillRect, strokeRect, and
clearRect. Each serves a different purpose in rectangle drawing.

Rectangles are defined by their top-left corner coordinates, width, and height.
You can customize their appearance with colors, gradients, patterns, and more.

## Basic Rectangle Drawing

This example demonstrates how to draw a simple filled rectangle on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Rectangle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D rendering
context. We set the fill color to blue using fillStyle.

The fillRect method draws a filled rectangle at position (50,50)
with width 200 and height 100. This demonstrates the simplest way to create
a rectangle on canvas.

## Stroked Rectangle

This example shows how to draw a rectangle outline (stroke) without fill.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Stroked Rectangle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.strokeRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use strokeRect instead of fillRect to draw
just the outline. The strokeStyle sets the outline color to red.

The lineWidth property controls the thickness of the outline.
This example shows how to create rectangle borders with custom styling.

## Clearing Rectangular Areas

This example demonstrates using clearRect to erase parts of canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Clear Rectangle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw a filled rectangle
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 300, 200);
    
    // Clear a rectangular area
    ctx.clearRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

First, we fill the entire canvas with green. Then we use clearRect
to erase a rectangular area in the middle.

The clearRect method makes pixels transparent. It's useful for
erasing parts of canvas or creating transparent holes in drawings.

## Gradient Filled Rectangle

This example shows how to fill a rectangle with a linear gradient.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient Rectangle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'blue');
    
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

We create a horizontal gradient that transitions from red to yellow to blue.
The createLinearGradient method defines the gradient direction.

Color stops are added with addColorStop. The gradient is then
applied as fill style before drawing the rectangle. This creates a colorful
gradient-filled rectangle.

## Multiple Rectangles with Different Styles

This example demonstrates drawing multiple rectangles with various styles.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Rectangles&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Filled rectangle
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(50, 50, 100, 100);
    
    // Stroked rectangle
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.strokeRect(200, 50, 100, 100);
    
    // Both filled and stroked
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.fillRect(50, 200, 100, 50);
    ctx.strokeRect(50, 200, 100, 50);
    
    // Rounded rectangle (custom function)
    function roundRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }
    
    roundRect(200, 200, 150, 80, 20);
    ctx.fillStyle = 'purple';
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows four different rectangle styles: a semi-transparent filled
rectangle, a stroked rectangle, a combination of both, and a rounded rectangle.

The rounded rectangle is created using a custom function that draws a path with
curved corners. This demonstrates how to extend basic rectangle functionality.

## Source

[MDN Canvas rect Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect)

In this article, we have explored various techniques for drawing rectangles on
HTML canvas. Mastering these methods is essential for creating UI elements and
visualizations in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).