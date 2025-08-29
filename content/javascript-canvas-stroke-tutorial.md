+++
title = "JavaScript Canvas Stroke Tutorial"
date = 2025-08-29T19:49:48.363+01:00
draft = false
description = "Learn how to use JavaScript Canvas stroke methods effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Stroke Tutorial

last modified April 3, 2025

In this article, we explore the Canvas stroke methods in JavaScript. These
methods are essential for drawing outlines of shapes and paths on HTML canvas.
Mastering strokes is crucial for creating graphics and visualizations.

## Basic Definition

Canvas stroke refers to the process of drawing the outline of a shape or path.
Unlike fill which colors the interior, stroke draws only the boundary lines.
The stroke style, width, and other properties can be customized.

The main stroke methods are stroke, strokeRect,
and strokeText. These work with path-drawing methods like
lineTo and arc to create outlined shapes.

## Basic Stroke Usage

This example demonstrates how to draw a simple stroked rectangle on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Stroke&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.strokeRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D rendering
context. We set the stroke color to blue and line width to 5 pixels.

The strokeRect method draws a rectangle outline at position
(50,50) with width 200 and height 100. This demonstrates the simplest way
to create a stroked shape on canvas.

## Custom Path with Stroke

This example shows how to create a custom path and stroke it.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Path Stroke&lt;/title&gt;
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
    
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a custom triangular path using beginPath,
moveTo, and lineTo. The closePath
connects the last point to the first.

After defining the path, we set stroke properties and call stroke
to draw the outline. This shows how to stroke complex custom paths.

## Dashed Line Stroke

This example demonstrates creating dashed lines using the lineDash property.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dashed Line Stroke&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(250, 100);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a dashed horizontal line. The setLineDash
method takes an array specifying the length of dashes and gaps.

Here we use [5,3] meaning 5px dashes with 3px gaps. The line is drawn from
(50,100) to (250,100) with green color and 2px width.

## Gradient Stroke

This example shows how to apply a gradient to a stroke.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient Stroke&lt;/title&gt;
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
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 10;
    
    ctx.beginPath();
    ctx.arc(150, 100, 80, 0, Math.PI * 2);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a linear gradient that transitions from red to yellow to blue.
This gradient is applied as the stroke style for a circular path.

The createLinearGradient defines the gradient direction.
addColorStop adds color transition points. The gradient
is then used to stroke a circle with 10px line width.

## Advanced Stroke with Line Joins

This example demonstrates different line join styles for strokes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Line Join Styles&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Round join
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 150);
    ctx.lineTo(150, 50);
    ctx.lineJoin = 'round';
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    
    // Bevel join
    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(250, 150);
    ctx.lineTo(300, 50);
    ctx.lineJoin = 'bevel';
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    
    // Miter join (default)
    ctx.beginPath();
    ctx.moveTo(350, 50);
    ctx.lineTo(400, 150);
    ctx.lineTo(450, 50);
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'green';
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows three different line join styles: round, bevel, and miter.
Each style affects how corners are rendered when lines meet at sharp angles.

The lineJoin property controls this behavior. Round creates
rounded corners, bevel creates flattened corners, and miter creates sharp
pointed corners (default). Each path demonstrates one style.

## Source

[MDN Canvas stroke Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke)

In this article, we have explored various techniques for stroking paths and
shapes on HTML canvas. Mastering these methods is essential for creating
detailed graphics and visualizations in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).