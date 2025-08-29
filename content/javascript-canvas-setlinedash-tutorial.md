+++
title = "JavaScript Canvas setLineDash Tutorial"
date = 2025-08-29T19:49:45.035+01:00
draft = false
description = "Learn how to use JavaScript Canvas setLineDash method effectively with examples and detailed explanations. Create custom dashed patterns for your canvas drawings."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas setLineDash Tutorial

last modified April 3, 2025

This tutorial explores the Canvas setLineDash method in JavaScript.
It allows creating dashed or dotted line patterns for strokes on HTML canvas.
Mastering this technique adds visual variety to your drawings.

## Basic Definition

The setLineDash method specifies the dash pattern for strokes.
It accepts an array of numbers that define alternating dash and gap lengths.
The pattern repeats along the length of the stroke.

The method works with all stroke operations including lines, curves, and shape
outlines. It's part of the Canvas 2D API and requires a rendering context.

## Basic Dashed Line

This example demonstrates how to create a simple dashed line on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Dashed Line&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.setLineDash([10, 5]);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(250, 100);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a horizontal dashed line. The setLineDash([10, 5])
sets a pattern of 10px dashes with 5px gaps. The line is drawn from (50,100)
to (250,100) with blue color and 3px width.

The pattern repeats automatically along the line. You can adjust the numbers
to create different dash-gap ratios.

## Complex Dash Pattern

This example shows how to create a more complex dash pattern with multiple values.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Dash Pattern&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.setLineDash([20, 5, 5, 5]);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(250, 50);
    ctx.lineTo(250, 150);
    ctx.lineTo(50, 150);
    ctx.closePath();
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use a four-value pattern: [20,5,5,5]. This creates a long dash (20px)
followed by three short gaps (5px each). The pattern repeats for the entire path.

The path forms a rectangle outline. Notice how the dash pattern continues
seamlessly around corners. Complex patterns can create unique visual effects.

## Dotted Line Pattern

This example demonstrates how to create a dotted line using setLineDash.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dotted Line Pattern&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.setLineDash([2, 5]);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.arc(150, 100, 80, 0, Math.PI * 2);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a dotted circle. The pattern [2,5] makes very short dashes
(2px) with longer gaps (5px), effectively creating dots. The line width is
set to 2px for better visibility.

The pattern works equally well with curved paths like circles. The dots are
evenly spaced along the circumference of the circle.

## Dynamic Dash Animation

This example shows how to animate a dashed line by changing the dash offset.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dash Animation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let offset = 0;
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.setLineDash([15, 5]);
        ctx.lineDashOffset = -offset;
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.moveTo(50, 100);
        ctx.lineTo(250, 100);
        ctx.stroke();
        
        offset++;
        if (offset &gt; 20) offset = 0;
        
        requestAnimationFrame(draw);
    }
    
    draw();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example animates a dashed line by continuously changing the
lineDashOffset property. The offset shifts the dash pattern
along the line, creating a marching ants effect.

The animation loop clears the canvas, updates the offset, and redraws the line.
The offset resets after reaching 20 to create a seamless loop.

## Custom Dash Pattern for Shapes

This example applies different dash patterns to various canvas shapes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Shape Dash Patterns&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Rectangle with long dashes
    ctx.setLineDash([20, 10]);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, 100, 100);
    
    // Circle with dotted pattern
    ctx.setLineDash([3, 5]);
    ctx.strokeStyle = 'teal';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(300, 100, 50, 0, Math.PI * 2);
    ctx.stroke();
    
    // Triangle with alternating pattern
    ctx.setLineDash([10, 5, 5, 5]);
    ctx.strokeStyle = 'maroon';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(300, 200);
    ctx.lineTo(250, 250);
    ctx.closePath();
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates three different shapes with unique dash patterns.
Each shape uses a different setLineDash configuration.

The rectangle has long dashes, the circle uses a dotted pattern, and the
triangle has an alternating dash pattern. This shows the versatility of
dashed strokes across different shapes.

## Source

[MDN setLineDash Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash)

This tutorial covered various techniques for creating dashed lines and shapes
using the Canvas setLineDash method. These patterns can enhance
the visual appeal of your canvas drawings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).