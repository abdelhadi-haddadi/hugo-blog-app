+++
title = "JavaScript Canvas fillRect Tutorial"
date = 2025-08-29T19:49:36.175+01:00
draft = false
description = "Learn how to use JavaScript Canvas fillRect method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas fillRect Tutorial

last modified April 3, 2025

In this article, we explore the Canvas fillRect method in JavaScript. This
method is essential for drawing filled rectangles on HTML canvas. Mastering
fillRect is crucial for creating graphics and visualizations.

## Basic Definition

The fillRect method draws a filled rectangle on the canvas. It takes four
parameters: x, y coordinates of the top-left corner, width, and height.
The rectangle is filled using the current fill style.

Before using fillRect, you must set the fill style with fillStyle property.
This can be a color, gradient, or pattern. The method is part of the Canvas
2D API's drawing operations.

## Basic fillRect Usage

This example demonstrates how to draw a simple filled rectangle on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas fillRect&lt;/title&gt;
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
context. We set the fill color to blue using fillStyle property.

The fillRect method draws a filled rectangle at position (50,50) with width
200 and height 100. This demonstrates the simplest way to create a filled
rectangle on canvas.

## Multiple Rectangles with Different Colors

This example shows how to draw multiple rectangles with different fill colors.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple fillRect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // First rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 100, 100);
    
    // Second rectangle
    ctx.fillStyle = 'green';
    ctx.fillRect(200, 50, 150, 100);
    
    // Third rectangle
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fillRect(100, 150, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we draw three rectangles with different colors and transparency. Each
rectangle is drawn after setting a new fillStyle.

The third rectangle uses rgba color with alpha transparency (0.5). This shows
how to create semi-transparent filled rectangles on canvas.

## Gradient Filled Rectangle

This example demonstrates creating a rectangle filled with a linear gradient.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient fillRect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'blue');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a linear gradient that transitions from red to yellow to blue.
This gradient is applied as the fill style for our rectangle.

The createLinearGradient defines the gradient direction (horizontal in this
case). addColorStop adds color transition points. The gradient is then used
to fill the rectangle.

## Pattern Filled Rectangle

This example shows how to fill a rectangle with an image pattern.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pattern fillRect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;img id="patternImg" src="pattern.png" style="display:none;"&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('patternImg');
    
    img.onload = function() {
        const pattern = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(50, 50, 200, 100);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example loads an image and uses it as a repeating pattern to fill a
rectangle. The image is hidden from view but used as a texture.

The createPattern method creates a pattern from the image. The 'repeat' option
tiles the image in both directions. The pattern is then used as fillStyle.

## Animated fillRect

This example demonstrates animation using fillRect with requestAnimationFrame.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animated fillRect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let x = 0;
    const speed = 2;
    
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw rectangle
        ctx.fillStyle = 'purple';
        ctx.fillRect(x, 50, 50, 50);
        
        // Update position
        x += speed;
        if (x &gt; canvas.width) x = -50;
        
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a simple animation where a rectangle moves across the
canvas. The animation loop is created using requestAnimationFrame.

Each frame clears the canvas, draws the rectangle at its current position,
then updates the position. The rectangle wraps around when it exits the canvas.

## Source

[MDN Canvas fillRect Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect)

In this article, we have explored various techniques for drawing filled
rectangles on HTML canvas. Mastering fillRect is essential for creating
graphics and visualizations in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).