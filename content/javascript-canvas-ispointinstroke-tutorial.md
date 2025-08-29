+++
title = "JavaScript Canvas isPointInStroke Tutorial"
date = 2025-08-29T19:49:38.357+01:00
draft = false
description = "Learn how to use JavaScript Canvas isPointInStroke method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas isPointInStroke Tutorial

last modified April 3, 2025

In this article, we explore the Canvas isPointInStroke method in JavaScript.
This method detects if a point is inside a stroked path. It's essential for
creating interactive canvas applications with hit detection.

## Basic Definition

The isPointInStroke method checks if a point is on the stroke
of a path. It returns true if the point is inside the stroke area, considering
the current stroke style, line width, and other stroke properties.

This method is useful for interactive applications where you need to detect
if a user clicked on a stroked path. It works with both simple shapes and
complex paths.

## Basic isPointInStroke Usage

This example demonstrates how to detect clicks on a stroked rectangle.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic isPointInStroke&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click on the canvas&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 10;
    ctx.strokeRect(50, 50, 200, 100);
    
    canvas.addEventListener('click', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.rect(50, 50, 200, 100);
        
        if (ctx.isPointInStroke(x, y)) {
            output.textContent = 'Clicked on the stroke!';
        } else {
            output.textContent = 'Clicked outside the stroke';
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a blue rectangle with a 10px stroke. When the canvas is
clicked, it checks if the click was on the stroke using isPointInStroke.

The click coordinates are converted to canvas space. We recreate the path
before checking to ensure accurate hit detection. The result is displayed
below the canvas.

## Detecting Points in a Custom Path

This example shows how to detect points in a stroked custom path.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Path Detection&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click on the triangle&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(150, 50);
    ctx.lineTo(50, 150);
    ctx.lineTo(250, 150);
    ctx.closePath();
    
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 8;
    ctx.stroke();
    
    canvas.addEventListener('click', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Recreate path for detection
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(50, 150);
        ctx.lineTo(250, 150);
        ctx.closePath();
        
        if (ctx.isPointInStroke(x, y)) {
            output.textContent = 'Clicked on the triangle stroke!';
        } else {
            output.textContent = 'Clicked outside the stroke';
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a red triangle with an 8px stroke. The click handler
recreates the path and checks if the click was on the stroke.

Note that we must recreate the exact same path before calling isPointInStroke.
The method only works with the current path in the context.

## Interactive Stroke Detection

This example creates an interactive application that highlights when the mouse
is over a stroked circle.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Interactive Stroke Detection&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    function drawCircle(highlight = false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.arc(150, 150, 100, 0, Math.PI * 2);
        
        ctx.strokeStyle = highlight ? 'green' : 'blue';
        ctx.lineWidth = 15;
        ctx.stroke();
    }
    
    drawCircle();
    
    canvas.addEventListener('mousemove', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.arc(150, 150, 100, 0, Math.PI * 2);
        
        if (ctx.isPointInStroke(x, y)) {
            drawCircle(true);
        } else {
            drawCircle(false);
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a circle that changes color when the mouse hovers over
its stroke. The mousemove event checks the cursor position against the stroke.

The drawCircle function redraws the circle with different colors based on
whether the mouse is over the stroke. This creates a visual feedback effect.

## Detecting Points in Text Stroke

This example demonstrates how to detect clicks on stroked text.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Text Stroke Detection&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click on the text&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    ctx.font = '48px Arial';
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 3;
    ctx.strokeText('Click Me', 50, 120);
    
    canvas.addEventListener('click', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.font = '48px Arial';
        ctx.strokeText('Click Me', 50, 120);
        
        if (ctx.isPointInStroke(x, y)) {
            output.textContent = 'Clicked on the text stroke!';
        } else {
            output.textContent = 'Clicked outside the text';
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates stroked text and detects clicks on it. The text is drawn
with a 3px purple stroke using strokeText.

When checking for clicks, we must recreate the exact same text path with
the same font and position. The method works with text just like other paths.

## Advanced: Detecting Points in Complex Paths

This example shows how to detect points in a complex stroked path with curves.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Path Detection&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="300"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click on the path&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    // Draw complex path
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(150, 50);
    ctx.quadraticCurveTo(250, 50, 350, 150);
    ctx.bezierCurveTo(370, 200, 430, 200, 450, 150);
    ctx.lineTo(400, 250);
    ctx.closePath();
    
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 10;
    ctx.stroke();
    
    canvas.addEventListener('click', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Recreate complex path
        ctx.beginPath();
        ctx.moveTo(50, 150);
        ctx.lineTo(150, 50);
        ctx.quadraticCurveTo(250, 50, 350, 150);
        ctx.bezierCurveTo(370, 200, 430, 200, 450, 150);
        ctx.lineTo(400, 250);
        ctx.closePath();
        
        if (ctx.isPointInStroke(x, y)) {
            output.textContent = 'Clicked on the complex path stroke!';
        } else {
            output.textContent = 'Clicked outside the path';
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a complex path with lines, quadratic curves, and Bezier
curves. The path is stroked with a thick orange line.

The click detection works the same way as simpler paths, but demonstrates
that isPointInStroke can handle complex paths with curves accurately.

## Source

[MDN isPointInStroke Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInStroke)

In this article, we have explored the isPointInStroke method for detecting
points in canvas strokes. This powerful feature enables interactive canvas
applications with precise hit detection on stroked paths.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).