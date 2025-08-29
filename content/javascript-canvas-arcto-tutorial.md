+++
title = "JavaScript Canvas arcTo Tutorial"
date = 2025-08-27T23:21:44.755+01:00
draft = false
description = "Learn how to use JavaScript Canvas arcTo method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas arcTo Tutorial

last modified April 3, 2025

In this article, we explore the Canvas arcTo method in JavaScript. This
method creates rounded corners between lines or complex curved paths.
Understanding arcTo is essential for creating smooth, professional graphics.

## Basic Definition

The arcTo method creates an arc between two tangent lines on canvas.
It requires five parameters: x1, y1, x2, y2, and radius. The arc connects
the current point to the new point via a curve.

Unlike arc, which draws full circles or parts of circles,
arcTo creates curves between lines. It's particularly useful
for creating rounded rectangles or smooth path transitions.

## Basic arcTo Example

This example demonstrates how to draw a simple curve using arcTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic arcTo Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.arcTo(150, 50, 150, 150, 50);
    ctx.lineTo(150, 150);
    
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a path starting at (50,50). The arcTo method
takes control point (150,50) and end point (150,150) with radius 50.

The curve connects the starting point to the end point via the control point.
The lineTo completes the path to the end point before stroking.

## Rounded Rectangle with arcTo

This example shows how to create a rectangle with rounded corners using arcTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Rounded Rectangle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    function roundedRect(x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.arcTo(x + width, y, x + width, y + radius, radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        ctx.lineTo(x + radius, y + height);
        ctx.arcTo(x, y + height, x, y + height - radius, radius);
        ctx.lineTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
        ctx.closePath();
    }
    
    roundedRect(50, 50, 200, 100, 20);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 4;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code defines a roundedRect function that uses four arcTo
calls to create rounded corners. Each corner is created by drawing lines and
connecting them with arcs.

The function takes position, dimensions, and corner radius parameters. This
demonstrates arcTo's practical use in creating common UI elements.

## Complex Path with Multiple arcTo

This example creates a complex path with multiple curves using arcTo.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex arcTo Path&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.arcTo(150, 50, 250, 100, 60);
    ctx.arcTo(350, 150, 250, 200, 40);
    ctx.arcTo(150, 250, 50, 200, 80);
    ctx.arcTo(50, 100, 150, 50, 30);
    ctx.closePath();
    
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 5;
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(200, 100, 200, 0.3)';
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a complex, closed path with four arcTo calls.
Each arcTo creates a curve between segments of the path, resulting in a
smooth, organic shape.

The path is both stroked and filled to demonstrate how arcTo can be used
to create complex filled shapes with smooth curves.

## Interactive arcTo Example

This example shows arcTo in action with mouse interaction.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Interactive arcTo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    let radius = 30;
    
    function draw(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.moveTo(50, 150);
        ctx.arcTo(x, y, 350, 150, radius);
        ctx.lineTo(350, 150);
        
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Draw control point
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    canvas.addEventListener('mousemove', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        draw(e.clientX - rect.left, e.clientY - rect.top);
    });
    
    draw(200, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This interactive example updates the arcTo curve as the mouse moves. The
control point (red dot) follows the mouse position, showing how arcTo
responds to different control points.

The curve always connects from (50,150) to (350,150), with the mouse
position determining the control point. This demonstrates arcTo's dynamic
nature.

## arcTo vs arc Comparison

This example compares arcTo with the simpler arc method.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;arcTo vs arc&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // arcTo example
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.arcTo(200, 50, 350, 100, 50);
    ctx.lineTo(350, 100);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // arc example for comparison
    ctx.beginPath();
    ctx.arc(200, 100, 100, Math.PI, 0);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code shows both arcTo (blue) and arc (red) methods creating similar
curves. The arcTo curve connects two points via a control point, while
arc draws a standard semicircle.

The comparison highlights when to use each method: arcTo for connecting
paths with curves, and arc for drawing circular segments independently.

## Source

[MDN Canvas arcTo Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arcTo)

In this article, we have explored the arcTo method for creating curved paths
on HTML canvas. Mastering arcTo is essential for creating professional,
smooth graphics in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).