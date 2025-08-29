+++
title = "JavaScript Canvas createLinearGradient Tutorial"
date = 2025-08-27T23:21:47.187+01:00
draft = false
description = "Learn how to use JavaScript Canvas createLinearGradient
method effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas createLinearGradient Tutorial

last modified April 3, 2025

In this article, we explore the Canvas createLinearGradient method in JavaScript.
This powerful feature allows creating smooth color transitions for fills and
strokes. Mastering gradients is essential for professional-looking graphics.

## Basic Definition

The createLinearGradient method creates a gradient object that transitions
colors along a straight line. It requires defining start and end points for
the gradient direction. Color stops define where colors change along the line.

The method syntax is: createLinearGradient(x0, y0, x1, y1) where
(x0,y0) is the start point and (x1,y1) is the end point. Color stops are
added with addColorStop(position, color).

## Basic Horizontal Gradient

This example demonstrates a simple horizontal gradient from red to blue.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Horizontal Gradient&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1, 'blue');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a canvas with a left-to-right gradient. The gradient starts at
(0,0) and ends at (300,0), covering the canvas width. Two color stops define
the transition.

The first color stop at position 0 (start) is red. The second at position 1
(end) is blue. The gradient is applied as fill style to cover the entire canvas.

## Diagonal Gradient with Multiple Colors

This example shows a diagonal gradient with three color stops.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Diagonal Gradient&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 300, 200);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'green');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a diagonal gradient from top-left to bottom-right. The gradient
has three color stops at positions 0, 0.5, and 1. This creates a smooth
transition between three colors.

The gradient starts red at the top-left corner, becomes yellow in the middle,
and ends green at the bottom-right corner. The fill covers the entire canvas.

## Gradient Stroke for Text

This example applies a gradient to text stroke.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient Text Stroke&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'purple');
    gradient.addColorStop(1, 'blue');
    
    ctx.font = '48px Arial';
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.strokeText('Gradient', 50, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This demonstrates applying a gradient to text outline. The gradient goes from
left to right with three colors. The text is drawn with stroke only, no fill.

The gradient is horizontal (0,0 to 300,0) with color stops at 0, 0.5, and 1.
The strokeText method renders the outlined text using the gradient stroke style.

## Partial Gradient for Shape

This example shows how to apply gradient to part of a shape.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Partial Gradient&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(100, 50, 200, 150);
    gradient.addColorStop(0, 'cyan');
    gradient.addColorStop(1, 'magenta');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here the gradient is defined for only part of the shape. The gradient area is
smaller than the filled rectangle, creating an interesting visual effect.

The gradient runs from (100,50) to (200,150) while the rectangle covers
(50,50) to (250,150). Areas outside the gradient use the nearest color stop.

## Complex Gradient with Transparency

This example combines multiple gradients with transparency effects.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Transparent Gradient&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, 200);
    bgGradient.addColorStop(0, 'lightblue');
    bgGradient.addColorStop(1, 'white');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 300, 200);
    
    // Transparent foreground gradient
    const fgGradient = ctx.createLinearGradient(50, 50, 250, 150);
    fgGradient.addColorStop(0, 'rgba(255,0,0,0.8)');
    fgGradient.addColorStop(0.5, 'rgba(0,255,0,0.5)');
    fgGradient.addColorStop(1, 'rgba(0,0,255,0.2)');
    
    ctx.fillStyle = fgGradient;
    ctx.fillRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example combines two gradients. First, a vertical background gradient is
applied. Then a transparent foreground gradient is drawn on top.

The foreground gradient uses rgba colors with alpha transparency. This creates
a see-through effect where the background shows through the foreground colors.

## Source

[MDN createLinearGradient Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)

In this article, we have explored various techniques for creating and applying
linear gradients in Canvas. These methods are essential for creating visually
appealing graphics and interfaces in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).