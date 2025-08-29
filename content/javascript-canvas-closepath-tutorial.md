+++
title = "JavaScript Canvas closePath Tutorial"
date = 2025-08-27T23:21:47.202+01:00
draft = false
description = "Learn how to use JavaScript Canvas closePath method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas closePath Tutorial

last modified April 3, 2025

In this article, we explore the Canvas closePath method in JavaScript. This
method is essential for completing paths and creating closed shapes on HTML
canvas. Understanding closePath is crucial for drawing polygons and complex
shapes.

## Basic Definition

The closePath method connects the last point in a path to the
first point with a straight line, creating a closed shape. It's different
from manually drawing a line to the starting point as it handles subpaths.

When used with beginPath and path-drawing methods like
lineTo, closePath completes the current subpath.
This is particularly useful for filling or stroking closed shapes.

## Basic closePath Usage

This example demonstrates how to draw a simple triangle using closePath.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic closePath&lt;/title&gt;
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
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D context.
We start a path with beginPath and move to the starting point.

Two lines are drawn to create two sides of a triangle. The closePath
completes the shape by drawing the third side automatically. Finally, we
stroke the path to make it visible.

## Filled Shape with closePath

This example shows how closePath creates a closed shape that can be filled.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Filled Shape with closePath&lt;/title&gt;
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
    
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.strokeStyle = 'blue';
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create the same triangle as before but now we fill it with color.
The closePath ensures the shape is properly closed for filling.

We set a light blue fill color and call fill, then add a blue
stroke outline. This demonstrates how closePath enables both filling and
stroking of shapes.

## Multiple Subpaths with closePath

This example demonstrates using closePath with multiple subpaths in one shape.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Subpaths&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    // First triangle
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 150);
    ctx.lineTo(150, 50);
    ctx.closePath();
    
    // Second triangle
    ctx.moveTo(200, 50);
    ctx.lineTo(250, 150);
    ctx.lineTo(300, 50);
    ctx.closePath();
    
    ctx.fillStyle = 'pink';
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates two separate triangles within one path using multiple
moveTo and closePath calls. Each triangle is
a separate subpath.

Both subpaths are filled and stroked together. The closePath
ensures each triangle is properly closed before moving to the next shape.

## Complex Shape with closePath

This example shows how to create a more complex shape using closePath.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Shape&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    // Main rectangle
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.closePath();
    
    // Cutout triangle
    ctx.moveTo(150, 100);
    ctx.lineTo(250, 100);
    ctx.lineTo(200, 175);
    ctx.closePath();
    
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.strokeStyle = 'darkgreen';
    ctx.lineWidth = 3;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a rectangle with a triangular cutout using two subpaths.
The main rectangle is drawn first and closed with closePath.

Then we add a triangular subpath that will act as a cutout when filled.
The even-odd fill rule (default) makes the triangle appear as a hole in
the rectangle.

## closePath with Arcs

This example demonstrates using closePath with arc segments to create shapes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;closePath with Arcs&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    // Start at top center
    ctx.moveTo(200, 50);
    // Draw right semicircle
    ctx.arc(200, 150, 100, -Math.PI/2, Math.PI/2);
    // Draw left semicircle
    ctx.arc(200, 150, 50, Math.PI/2, -Math.PI/2, true);
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(200, 200, 0, 0.5)';
    ctx.fill();
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 4;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a donut shape with a flat top using arcs and closePath.
We start at the top center and draw two semicircles in opposite directions.

The closePath connects the end of the last arc back to the
starting point, creating a complete shape. The result is filled with a
semi-transparent yellow and stroked with orange.

## Source

[MDN Canvas closePath Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath)

In this article, we have explored various techniques for using closePath to
create closed shapes on HTML canvas. Mastering this method is essential for
drawing polygons and complex shapes in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).