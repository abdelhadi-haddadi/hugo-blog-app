+++
title = "JavaScript Canvas Arc Tutorial"
date = 2025-08-29T19:49:30.577+01:00
draft = false
description = "Learn how to use JavaScript Canvas arc methods effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Arc Tutorial

last modified April 3, 2025

In this article, we explore the Canvas arc methods in JavaScript. These
methods are essential for drawing circles, arcs, and pie charts on HTML canvas.
Mastering arcs is crucial for creating circular graphics and visualizations.

## Basic Definition

Canvas arc refers to a segment of a circle's circumference. The arc method
can draw full circles, partial circles, and pie-shaped wedges. Arcs are
defined by center point, radius, start and end angles, and direction.

The main arc method is arc() which creates a circular arc.
The arcTo() method creates an arc between two tangents.
Angles are measured in radians (0 to 2π for a full circle).

## Basic Circle Drawing

This example demonstrates how to draw a simple circle on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Circle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, Math.PI * 2);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D rendering
context. We begin a path and call the arc() method to define
a circle.

The arc is centered at (150,100) with radius 50. Angles 0 to 2π (Math.PI * 2)
create a full circle. We then stroke the path with blue color and 3px width.

## Partial Arc Drawing

This example shows how to draw a partial arc (a semicircle).

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Partial Arc&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.arc(150, 100, 60, 0, Math.PI); // 0 to π radians (180 degrees)
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we draw a semicircle by specifying angles from 0 to π radians (180 degrees).
The arc is centered at (150,100) with radius 60 pixels.

Note that the arc is drawn clockwise from the start angle to the end angle.
The line is styled with red color and 5px width for better visibility.

## Filled Arc (Pie Slice)

This example demonstrates how to create a filled pie slice.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Filled Pie Slice&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(150, 100); // Center point
    ctx.arc(150, 100, 70, 0, Math.PI / 2); // 0 to 90 degrees
    ctx.closePath(); // Connect back to center
    
    ctx.fillStyle = 'rgba(0, 128, 0, 0.7)';
    ctx.fill();
    ctx.strokeStyle = 'darkgreen';
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a pie slice by first moving to the center point, then drawing
a 90-degree arc (0 to π/2 radians), and closing the path back to center.

The slice is filled with semi-transparent green and outlined with dark green.
This technique is useful for creating pie charts and circular diagrams.

## Counter-Clockwise Arc

This example shows how to draw an arc in the counter-clockwise direction.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Counter-Clockwise Arc&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.arc(150, 100, 60, 0, Math.PI / 2, true); // Counter-clockwise
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Draw reference lines
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(210, 100);
    ctx.moveTo(150, 100);
    ctx.lineTo(150, 40);
    ctx.strokeStyle = 'gray';
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

The key difference here is the sixth parameter to arc() set to
true, which makes the arc draw counter-clockwise. We also draw reference
lines to visualize the angle.

The gray lines show the starting (3 o'clock position) and ending (12 o'clock)
points of the arc. The purple arc is drawn in the opposite direction of
the default clockwise behavior.

## ArcTo Method Example

This example demonstrates the arcTo() method for creating
rounded corners.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;arcTo Method&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw a rectangle with rounded corner using arcTo
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(250, 50);
    ctx.arcTo(300, 50, 300, 100, 50); // Top-right corner
    ctx.lineTo(300, 200);
    ctx.arcTo(300, 250, 250, 250, 50); // Bottom-right corner
    ctx.lineTo(50, 250);
    ctx.arcTo(0, 250, 0, 200, 50); // Bottom-left corner
    ctx.lineTo(0, 100);
    ctx.arcTo(0, 50, 50, 50, 50); // Top-left corner
    ctx.closePath();
    
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 3;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

The arcTo() method creates an arc between two lines (tangents).
It takes five parameters: two control points, an end point, and a radius.

This example draws a rectangle with all four corners rounded. Each corner
uses arcTo() with a 50px radius. The method automatically
calculates the arc that smoothly connects the lines.

## Source

[MDN Canvas arc Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc)

In this article, we have explored various techniques for drawing arcs and
circles on HTML canvas. These methods are fundamental for creating circular
graphics, pie charts, and rounded shapes in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).