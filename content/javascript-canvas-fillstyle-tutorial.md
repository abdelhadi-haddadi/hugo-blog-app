+++
title = "JavaScript Canvas fillStyle Tutorial"
date = 2025-08-27T23:21:50.839+01:00
draft = false
description = "Learn how to use JavaScript Canvas fillStyle property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas fillStyle Tutorial

last modified April 3, 2025

In this article, we explore the Canvas fillStyle property in JavaScript. This
property is essential for filling shapes and paths with colors, gradients, or
patterns on HTML canvas. Mastering fillStyle is crucial for creating graphics.

## Basic Definition

Canvas fillStyle is a property that specifies the color, gradient, or pattern
to use inside shapes. Unlike stroke which draws outlines, fillStyle colors the
interior of shapes. It works with fill methods like fillRect.

The fillStyle property accepts color strings, gradient objects, and pattern
objects. It can be changed anytime to apply different fills to different shapes.
The default fillStyle is black (#000000).

## Basic fillStyle Usage

This example demonstrates how to fill a rectangle with a solid color.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas fillStyle&lt;/title&gt;
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
context. We set the fillStyle to 'blue' and draw a filled rectangle.

The fillRect method draws a filled rectangle at position (50,50)
with width 200 and height 100. This shows the simplest way to use fillStyle.

## Custom Path with fillStyle

This example shows how to create a custom path and fill it with a color.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Path fillStyle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 150);
    ctx.lineTo(250, 50);
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a custom triangular path using path-drawing methods. The path
is closed with closePath to connect the last point to the first.

We use rgba color notation for fillStyle, which allows transparency (0.5 alpha).
The fill method fills the path with our semi-transparent red color.

## Gradient fillStyle

This example demonstrates how to fill a shape with a linear gradient.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient fillStyle&lt;/title&gt;
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

This example creates a linear gradient that transitions from red to yellow to
blue. The gradient is applied as the fillStyle for a rectangle.

The createLinearGradient defines the gradient direction (horizontal
here). addColorStop adds color transition points. The gradient is
then used to fill a rectangle.

## Pattern fillStyle

This example shows how to fill a shape with an image pattern.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pattern fillStyle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;img id="patternImg" src="texture.png" style="display:none"&gt;

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

Here we create a pattern from an image and use it as fillStyle. The image is
hidden but loaded to create the pattern. Patterns can tile in different ways.

The createPattern method takes an image and repeat style. We use
'repeat' to tile the image. The pattern is then used to fill a rectangle when
the image loads.

## Multiple fillStyle Usage

This example demonstrates using different fillStyle values for multiple shapes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple fillStyle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // First shape with color
    ctx.fillStyle = '#FF5733';
    ctx.fillRect(50, 50, 100, 100);
    
    // Second shape with gradient
    const gradient = ctx.createRadialGradient(300, 100, 10, 300, 100, 60);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'purple');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(300, 100, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Third shape with pattern
    const patternCanvas = document.createElement('canvas');
    const pCtx = patternCanvas.getContext('2d');
    patternCanvas.width = 20;
    patternCanvas.height = 20;
    pCtx.fillStyle = 'black';
    pCtx.fillRect(0, 0, 10, 10);
    pCtx.fillRect(10, 10, 10, 10);
    
    const pattern = ctx.createPattern(patternCanvas, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(50, 180, 300, 80);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows three different shapes, each with a different fillStyle:
solid color, radial gradient, and programmatically created pattern.

We create a red square, a circle with white-to-purple radial gradient, and a
rectangle filled with a checkerboard pattern made on a separate canvas.

## Source

[MDN Canvas fillStyle Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)

In this article, we have explored various techniques for filling shapes and
paths on HTML canvas. Mastering fillStyle is essential for creating visually
appealing graphics and visualizations in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).