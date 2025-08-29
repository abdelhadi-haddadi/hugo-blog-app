+++
title = "JavaScript Canvas lineTo Tutorial"
date = 2025-08-27T23:21:56.117+01:00
draft = false
description = "Learn how to use JavaScript Canvas lineTo
method effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas lineTo Tutorial

last modified April 3, 2025

In this article, we explore the Canvas lineTo method in JavaScript. This
method is essential for drawing straight lines between points on HTML canvas.
Mastering lineTo is crucial for creating complex paths and shapes.

## Basic Definition

The lineTo method adds a straight line to the current sub-path by connecting
the last point to the specified coordinates. It doesn't draw the line
immediately - you need to call stroke or fill to render it.

The syntax is lineTo(x, y) where x and y are the end point
coordinates. lineTo works with other path methods like moveTo and arc to
create complex drawings.

## Basic lineTo Usage

This example demonstrates how to draw a simple line using lineTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic lineTo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(250, 150);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D rendering
context. We start a new path with beginPath and set the starting point.

The lineTo method draws a line from (50,50) to (250,150). We set stroke
properties and call stroke to render the line. This shows the simplest
lineTo usage.

## Drawing Multiple Lines

This example shows how to draw multiple connected lines using lineTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Lines&lt;/title&gt;
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
    
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a square by drawing four connected lines. Each lineTo connects
to the previous point. The closePath method completes the shape.

Notice how we chain multiple lineTo calls. This creates a continuous path.
The stroke method renders all lines at once with the specified style.

## Creating a Zigzag Pattern

This example demonstrates creating a zigzag pattern using lineTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Zigzag Pattern&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50, 100);
    
    for (let i = 0; i &lt; 8; i++) {
        const x = 50 + i * 40;
        const y = i % 2 === 0 ? 50 : 150;
        ctx.lineTo(x, y);
    }
    
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a zigzag pattern using a loop. The pattern alternates
between top and bottom points. The modulo operator controls the alternation.

Each iteration calculates new coordinates and adds a line segment. This shows
how lineTo can be used programmatically to create complex patterns efficiently.

## Drawing a Star Shape

This example shows how to draw a star shape using lineTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Star Shape&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    const spikes = 5;
    
    ctx.beginPath();
    
    for (let i = 0; i &lt; spikes * 2; i++) {
        const angle = (i * Math.PI / spikes) - Math.PI / 2;
        const r = i % 2 === 0 ? radius : radius / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.closePath();
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 4;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a 5-pointed star using trigonometric calculations. We
alternate between outer and inner points to form the star shape.

The for loop calculates each point's coordinates using cosine and sine. The
first point uses moveTo, while subsequent points use lineTo. This creates
a continuous star path.

## Interactive Line Drawing

This example demonstrates interactive line drawing with mouse events.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Interactive Drawing&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    canvas.addEventListener('mousedown', (e) =&gt; {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    
    canvas.addEventListener('mousemove', (e) =&gt; {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    
    canvas.addEventListener('mouseup', () =&gt; isDrawing = false);
    canvas.addEventListener('mouseout', () =&gt; isDrawing = false);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates an interactive drawing tool. Users can draw lines by
clicking and dragging the mouse. The drawing follows the mouse movement.

Mouse events control the drawing process. mousedown starts a new path,
mousemove draws lines while dragging, and mouseup stops drawing. The
lineCap property makes the lines appear smoother.

## Source

[MDN Canvas lineTo Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo)

In this article, we have explored various techniques for using lineTo to
create lines and shapes on HTML canvas. Mastering this method is essential
for creating detailed graphics and interactive drawings in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).