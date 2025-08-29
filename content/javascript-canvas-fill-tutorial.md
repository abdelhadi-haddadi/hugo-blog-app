+++
title = "JavaScript Canvas Fill Tutorial"
date = 2025-08-27T23:21:49.696+01:00
draft = false
description = "Learn how to use JavaScript Canvas fill
methods effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Fill Tutorial

last modified April 3, 2025

In this article, we explore the Canvas fill methods in JavaScript. These
methods are essential for coloring the interior of shapes and paths on HTML
canvas. Mastering fills is crucial for creating vibrant graphics.

## Basic Definition

Canvas fill refers to the process of coloring the interior of a shape or path.
Unlike stroke which draws outlines, fill colors the entire enclosed area.
The fill style can be solid colors, gradients, or patterns.

The main fill methods are fill, fillRect, and
fillText. These work with path-drawing methods like
arc and rect to create filled shapes.

## Basic Rectangle Fill

This example demonstrates how to draw a simple filled rectangle on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Fill&lt;/title&gt;
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
with width 200 and height 100. This shows the simplest way to create a
filled shape on canvas.

## Custom Path Fill

This example shows how to create a custom path and fill it with color.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Path Fill&lt;/title&gt;
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
    
    ctx.fillStyle = 'red';
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a custom triangular path using beginPath,
moveTo, and lineTo. The closePath
connects the last point to the first.

After defining the path, we set the fill color to red and call fill
to color the interior. This demonstrates filling complex custom paths.

## Circle Fill with Gradient

This example demonstrates filling a circle with a radial gradient.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient Circle Fill&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createRadialGradient(150, 100, 10, 150, 100, 80);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'blue');
    
    ctx.fillStyle = gradient;
    
    ctx.beginPath();
    ctx.arc(150, 100, 80, 0, Math.PI * 2);
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a radial gradient that transitions from white to blue.
The gradient is centered at (150,100) with inner radius 10 and outer 80.

The createRadialGradient defines the gradient properties.
addColorStop adds color transition points. The gradient
is then used to fill a circle with radius 80px.

## Pattern Fill

This example shows how to fill a shape with an image pattern.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pattern Fill&lt;/title&gt;
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
        ctx.fillRect(0, 0, 300, 200);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example loads an image and uses it as a repeating pattern to fill
the entire canvas. The image is hidden with CSS but still accessible.

The createPattern method creates a pattern from the image.
We set this pattern as the fill style and apply it to a rectangle covering
the whole canvas.

## Complex Shape with Fill Rule

This example demonstrates the even-odd fill rule for complex shapes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Fill Rule Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    // Outer rectangle
    ctx.rect(50, 50, 200, 100);
    // Inner rectangle
    ctx.rect(100, 75, 100, 50);
    
    ctx.fillStyle = 'purple';
    ctx.fill('evenodd');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a rectangle with another rectangle inside it. Using
the even-odd fill rule, the inner area isn't filled, creating a frame effect.

The fill method accepts an optional fill rule parameter.
'evenodd' means areas with odd crossing counts aren't filled, while
'nonzero' (default) fills all enclosed areas.

## Source

[MDN Canvas fill Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill)

In this article, we have explored various techniques for filling paths and
shapes on HTML canvas. Mastering these methods is essential for creating
colorful graphics and visualizations in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).