+++
title = "JavaScript Canvas moveTo Tutorial"
date = 2025-08-27T23:21:57.665+01:00
draft = false
description = "Learn how to use JavaScript Canvas moveTo method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas moveTo Tutorial

last modified April 3, 2025

In this article, we explore the Canvas moveTo method in JavaScript. This
method is essential for drawing paths on HTML canvas. It sets the starting
point for drawing operations without creating any visible marks.

## Basic Definition

The moveTo method moves the drawing cursor to specified coordinates
without drawing anything. It's like lifting a pen and moving it to a new
position on paper before starting to draw.

This method is always used with other path-drawing methods like lineTo,
arc, or quadraticCurveTo. It's called after
beginPath to start a new sub-path.

## Basic moveTo Usage

This example demonstrates how to draw a simple line using moveTo and lineTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic moveTo Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50, 50);  // Start point
    ctx.lineTo(250, 150); // End point
    ctx.stroke();        // Draw the line
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D rendering
context. We start a new path with beginPath.

The moveTo method sets the starting point at (50,50). Then
lineTo draws a line to (250,150). Finally, stroke
renders the line visible.

## Drawing Multiple Lines

This example shows how to draw multiple connected lines using moveTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Lines with moveTo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    ctx.lineTo(150, 150);
    ctx.lineTo(50, 150);
    ctx.closePath();
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a square shape using multiple lineTo calls. The initial
moveTo sets the starting point at the top-left corner.

Each lineTo draws to the next corner. closePath
connects back to the start point. The stroke method renders
the complete square outline.

## Disconnected Paths

This example demonstrates how to create disconnected paths using moveTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Disconnected Paths&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    // First line
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    
    // Second disconnected line
    ctx.moveTo(50, 100);
    ctx.lineTo(150, 100);
    
    // Third disconnected line
    ctx.moveTo(50, 150);
    ctx.lineTo(150, 150);
    
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example draws three horizontal lines that aren't connected. Each new
moveTo starts a new sub-path at a different y-coordinate.

Without the moveTo calls between lines, they would all connect
vertically. This shows how moveTo can create separate path segments.

## Drawing a Triangle

This example shows how to draw a triangle using moveTo and lineTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Drawing a Triangle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(150, 50);  // Top point
    ctx.lineTo(250, 150); // Bottom right
    ctx.lineTo(50, 150);  // Bottom left
    ctx.closePath();      // Connect back to top
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a triangle by connecting three points. The moveTo
sets the starting point at the top vertex (150,50).

Two lineTo calls draw to the bottom corners. closePath
completes the shape by connecting back to the starting point. The triangle
outline is then stroked.

## Complex Shape with Multiple moveTo

This example demonstrates a more complex shape using multiple moveTo calls.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Shape with moveTo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    // First shape (house)
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.lineTo(200, 200);
    ctx.lineTo(100, 200);
    ctx.closePath();
    
    // Roof
    ctx.moveTo(100, 100);
    ctx.lineTo(150, 50);
    ctx.lineTo(200, 100);
    
    // Door
    ctx.moveTo(140, 200);
    ctx.lineTo(140, 160);
    ctx.lineTo(160, 160);
    ctx.lineTo(160, 200);
    
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example draws a simple house shape with multiple components. Each
structural element starts with a new moveTo call.

The main house body is a square. The roof is a triangle above it. The door
is a smaller rectangle at the base. All parts are drawn in one path but
are separate sub-paths.

## Source

[MDN Canvas moveTo Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo)

In this article, we have explored various techniques for using the moveTo
method to create paths on HTML canvas. Mastering this method is essential
for creating complex drawings and graphics in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).