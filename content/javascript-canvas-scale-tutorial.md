+++
title = "JavaScript Canvas Scale Tutorial"
date = 2025-08-29T19:49:45.040+01:00
draft = false
description = "Learn how to use JavaScript Canvas scale methods effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Scale Tutorial

last modified April 3, 2025

In this article, we explore the Canvas scale transformation in JavaScript.
Scaling allows you to resize drawings proportionally or disproportionately.
Understanding scaling is crucial for creating responsive graphics.

## Basic Definition

Canvas scaling modifies the size of subsequent drawings by multiplying their
dimensions. The scale(x, y) method takes two parameters for
horizontal and vertical scaling factors.

Scaling affects all drawing operations after it's called. Values greater than
1 enlarge, while values between 0 and 1 shrink drawings. Negative values flip
and scale the content.

## Basic Scaling

This example demonstrates how to scale a simple rectangle on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Scaling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original rectangle
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 50, 50);
    
    // Scaled rectangle
    ctx.fillStyle = 'red';
    ctx.scale(2, 1.5);
    ctx.fillRect(50, 50, 50, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example draws two rectangles - one blue (original) and one red (scaled).
The scale(2, 1.5) makes the red rectangle twice as wide and 1.5
times taller than the original.

Note that scaling affects both the size and position of drawings. The red
rectangle appears larger and shifted because scaling applies to coordinates.

## Scaling from Center

This example shows how to scale an object while keeping it centered.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Centered Scaling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 50;
    
    // Original square
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fillRect(centerX - size/2, centerY - size/2, size, size);
    
    // Scaled square
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.translate(centerX, centerY);
    ctx.scale(1.8, 1.8);
    ctx.translate(-centerX, -centerY);
    ctx.fillRect(centerX - size/2, centerY - size/2, size, size);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

To scale from center, we first translate to the center point, apply scaling,
then translate back. This technique maintains the object's center position.

The blue square is original, while the red square is scaled 1.8 times in both
directions. The semi-transparent colors show how scaling affects the shape.

## Asymmetric Scaling

This example demonstrates different scaling factors for width and height.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Asymmetric Scaling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original circle
    ctx.beginPath();
    ctx.arc(75, 100, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    
    // Scaled ellipse
    ctx.scale(2, 0.5);
    ctx.beginPath();
    ctx.arc(75, 100, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we scale a circle into an ellipse using different x and y scale factors.
The scale(2, 0.5) makes it twice as wide but half as tall.

The blue circle is original, while the red ellipse shows the scaled result.
This demonstrates how to create non-uniform scaling effects on canvas.

## Scaling Text

This example shows how scaling affects text rendering on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scaling Text&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original text
    ctx.font = '20px Arial';
    ctx.fillText('Original Text', 50, 50);
    
    // Uniformly scaled text
    ctx.scale(1.5, 1.5);
    ctx.fillText('Scaled 1.5x', 50, 100);
    
    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    // Distorted text
    ctx.scale(1.8, 0.7);
    ctx.fillText('Distorted', 50, 150);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows three text variations: original, uniformly scaled, and
distorted. Scaling affects all canvas drawing operations including text.

Note the use of setTransform to reset scaling between operations.
The distorted text shows how asymmetric scaling can create unique typography.

## Multiple Scaling Operations

This example demonstrates cumulative scaling effects with multiple operations.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Scaling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Base rectangle
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 50, 50);
    
    // First scaling
    ctx.fillStyle = 'red';
    ctx.scale(1.5, 1.5);
    ctx.fillRect(50, 50, 50, 50);
    
    // Second scaling (cumulative)
    ctx.fillStyle = 'green';
    ctx.scale(0.8, 1.2);
    ctx.fillRect(50, 50, 50, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how scaling operations accumulate. Each scale
call multiplies with previous transformations rather than replacing them.

The blue rectangle is original, red is scaled 1.5x, and green has additional
scaling. The final scaling factors are 1.5×0.8=1.2 for width and 1.5×1.2=1.8
for height.

## Source

[MDN Canvas scale Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale)

In this article, we have explored various techniques for scaling drawings on
HTML canvas. Mastering scaling transformations is essential for creating
flexible and responsive graphics in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).