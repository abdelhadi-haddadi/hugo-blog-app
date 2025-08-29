+++
title = "JavaScript Canvas Clip Tutorial"
date = 2025-08-27T23:21:45.905+01:00
draft = false
description = "Learn how to use JavaScript Canvas clipping
paths effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Clip Tutorial

last modified April 3, 2025

In this article, we explore the Canvas clipping methods in JavaScript. Clipping
paths allow you to restrict drawing to specific regions of the canvas. This
powerful technique enables creative effects and optimized rendering.

## Basic Definition

Canvas clipping is the process of defining a region where drawing operations
will be visible. Anything drawn outside the clipping path will not be shown.
The clipping path acts like a mask for subsequent drawing operations.

The main clipping method is clip, which uses the current path
as the clipping region. Multiple clipping paths can be combined using path
operations. The clipping region can be saved and restored with the canvas state.

## Basic Clip Usage

This example demonstrates how to create a simple circular clipping region.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Clip&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create circular clipping path
    ctx.beginPath();
    ctx.arc(150, 100, 80, 0, Math.PI * 2);
    ctx.clip();
    
    // Draw rectangle (only visible inside circle)
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 300, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a circular path and call clip.
This sets the clipping region to the circle. The blue rectangle that follows
is only visible within this circular area.

The clipping path persists until the canvas state is restored or reset.
All subsequent drawing operations will be clipped to this region.

## Clipping with Complex Paths

This example shows how to create a star-shaped clipping region.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Path Clip&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create star-shaped clipping path
    ctx.beginPath();
    ctx.moveTo(150, 50);
    ctx.lineTo(175, 125);
    ctx.lineTo(250, 125);
    ctx.lineTo(190, 175);
    ctx.lineTo(210, 250);
    ctx.lineTo(150, 200);
    ctx.lineTo(90, 250);
    ctx.lineTo(110, 175);
    ctx.lineTo(50, 125);
    ctx.lineTo(125, 125);
    ctx.closePath();
    ctx.clip();
    
    // Draw gradient (only visible inside star)
    const gradient = ctx.createLinearGradient(0, 0, 300, 300);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1, 'yellow');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 300);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a complex star-shaped path using multiple lineTo
calls. The clip method converts this path into a clipping region.

The gradient fill that follows is only visible within the star shape.
This demonstrates how any complex path can be used as a clipping mask.

## Multiple Clipping Regions

This example shows how to combine multiple clipping paths.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Clipping Regions&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // First clipping circle
    ctx.beginPath();
    ctx.arc(100, 100, 60, 0, Math.PI * 2);
    ctx.clip();
    
    // Second clipping circle (intersects with first)
    ctx.beginPath();
    ctx.arc(200, 100, 60, 0, Math.PI * 2);
    ctx.clip();
    
    // Draw pattern (only visible in intersection)
    ctx.fillStyle = 'green';
    for (let x = 0; x &lt; 300; x += 20) {
        for (let y = 0; y &lt; 200; y += 20) {
            ctx.fillRect(x, y, 10, 10);
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates two overlapping circular clipping regions. The effective
clipping area becomes the intersection of both circles where they overlap.

The grid pattern is only drawn where both clipping circles intersect.
This demonstrates how multiple clip calls combine to create complex regions.

## Clipping with Save/Restore

This example demonstrates using save/restore to manage clipping states.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Save/Restore Clip&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Save initial state
    ctx.save();
    
    // Create first clipping region (left circle)
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, Math.PI * 2);
    ctx.clip();
    
    // Draw in first region
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(0, 0, 400, 200);
    
    // Restore state and create second clipping region
    ctx.restore();
    ctx.beginPath();
    ctx.arc(300, 100, 80, 0, Math.PI * 2);
    ctx.clip();
    
    // Draw in second region
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fillRect(0, 0, 400, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use save and restore to manage different
clipping states. The first clipping circle is created after saving the state.

After drawing, we restore to the original state and create a second clipping
circle. This allows us to have separate clipping regions without overlap.

## Text Clipping Effect

This example creates a clipping effect using text as the clipping path.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Text Clipping Effect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set large font for clipping
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Create text clipping path
    ctx.beginPath();
    ctx.fillText('CLIP', 250, 100);
    ctx.clip();
    
    // Draw gradient inside text
    const gradient = ctx.createLinearGradient(0, 0, 500, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'blue');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creative example uses text as a clipping path. The fillText
method creates the text path which is then used for clipping.

The gradient fill that follows is only visible within the text characters.
This technique can be used to create interesting text effects and masks.

## Source

[MDN Canvas clip Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip)

In this article, we have explored various techniques for using clipping paths
on HTML canvas. Mastering clipping enables advanced graphical effects and
optimized rendering in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).