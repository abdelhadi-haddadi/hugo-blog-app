+++
title = "JavaScript Canvas lineCap Tutorial"
date = 2025-08-27T23:21:55.015+01:00
draft = false
description = "Learn how to use JavaScript Canvas lineCap property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas lineCap Tutorial

last modified April 3, 2025

In this article, we explore the Canvas lineCap property in JavaScript. This
property controls how the ends of lines are rendered in HTML canvas drawings.
Understanding lineCap is essential for creating polished graphics.

## Basic Definition

The lineCap property determines the shape used to draw the endpoints of lines.
It affects lines drawn with stroke(), strokeRect(), and other stroke methods.
There are three possible values: butt, round, and square.

The default value is butt, which creates flat edges perpendicular to the line.
Round adds semicircular ends, while square adds square ends extending beyond
the line's length.

## Basic lineCap Demonstration

This example shows all three lineCap values applied to simple lines.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic lineCap&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Guide line to show actual length
    ctx.strokeStyle = 'lightgray';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(350, 50);
    ctx.stroke();
    
    // Butt lineCap (default)
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 15;
    ctx.lineCap = 'butt';
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    ctx.stroke();
    
    // Round lineCap
    ctx.strokeStyle = 'blue';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(300, 50);
    ctx.stroke();
    
    // Square lineCap
    ctx.strokeStyle = 'green';
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(350, 50);
    ctx.lineTo(450, 50);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example draws three horizontal lines with different lineCap values.
A light gray guide line shows the actual length of each line segment.

The red line uses butt (default), blue uses round, and green uses square.
Notice how round and square extend beyond the line's endpoints.

## lineCap with Dashed Lines

This example demonstrates how lineCap affects dashed lines.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;lineCap with Dashes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set dash pattern
    ctx.setLineDash([20, 10]);
    
    // Butt lineCap
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 10;
    ctx.lineCap = 'butt';
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(350, 50);
    ctx.stroke();
    
    // Round lineCap
    ctx.strokeStyle = 'blue';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(350, 100);
    ctx.stroke();
    
    // Square lineCap
    ctx.strokeStyle = 'green';
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(350, 150);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we apply the same dash pattern ([20,10]) to three lines with different
lineCap values. The pattern means 20px dashes with 10px gaps.

The red line (butt) has sharp ends on each dash. The blue line (round) has
rounded ends, and green (square) has squared-off ends extending the dash.

## lineCap with Arcs

This example shows how lineCap affects open arcs and circles.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;lineCap with Arcs&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Butt lineCap arc
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 15;
    ctx.lineCap = 'butt';
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 1.5, false);
    ctx.stroke();
    
    // Round lineCap arc
    ctx.strokeStyle = 'blue';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(200, 100, 50, 0, Math.PI * 1.5, false);
    ctx.stroke();
    
    // Square lineCap arc
    ctx.strokeStyle = 'green';
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.arc(300, 100, 50, 0, Math.PI * 1.5, false);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example draws three 270-degree arcs with different lineCap values.
Each arc starts at the right (0 radians) and goes counter-clockwise.

The red arc (butt) has flat ends at both endpoints. The blue arc (round)
has rounded ends, while green (square) has squared-off ends extending
beyond the arc's endpoints.

## lineCap with Complex Paths

This example demonstrates lineCap behavior with more complex paths.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;lineCap with Complex Paths&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Butt lineCap
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 10;
    ctx.lineCap = 'butt';
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 150);
    ctx.lineTo(250, 50);
    ctx.stroke();
    
    // Round lineCap
    ctx.strokeStyle = 'blue';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(150, 250);
    ctx.lineTo(250, 150);
    ctx.stroke();
    
    // Square lineCap
    ctx.strokeStyle = 'green';
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(150, 350);
    ctx.lineTo(250, 250);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example draws three zigzag paths with different lineCap values.
Each path consists of two connected line segments forming a "V" shape.

The red path (butt) shows flat ends at the start and end points. The blue
path (round) has rounded ends, while green (square) has squared-off ends
extending beyond the path's endpoints.

## Practical Application: Custom Arrowheads

This example shows how to use lineCap to create custom arrowheads.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Arrowheads&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw arrow with round lineCap
    function drawArrow(x, y, length, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        
        // Shaft
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + length - 20, y);
        ctx.stroke();
        
        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(x + length - 30, y - 15);
        ctx.lineTo(x + length, y);
        ctx.lineTo(x + length - 30, y + 15);
        ctx.stroke();
    }
    
    drawArrow(50, 50, 300, 'blue');
    drawArrow(50, 100, 250, 'red');
    drawArrow(50, 150, 200, 'green');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a reusable arrow-drawing function that uses round
lineCap for both the shaft and arrowhead. The round ends create a
polished look.

The function draws the arrow shaft and then the arrowhead as two separate
paths. The round lineCap gives the arrowhead a smooth appearance at the tip.

## Source

[MDN Canvas lineCap Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap)

In this article, we have explored the lineCap property and its effects on
different types of canvas drawings. Mastering lineCap helps create more
polished and professional-looking graphics in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).