+++
title = "JavaScript Canvas strokeRect Tutorial"
date = 2025-08-27T23:22:03.596+01:00
draft = false
description = "Learn how to use JavaScript Canvas stroke
methods effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas strokeRect Tutorial

last modified April 3, 2025

This tutorial explores the Canvas strokeRect method in JavaScript. The
strokeRect method draws rectangular outlines on HTML canvas elements.
Understanding this method is essential for creating wireframe graphics.

## Basic Definition

The strokeRect method draws a rectangle outline on the canvas. Unlike fillRect,
it only draws the border, not the interior. The rectangle's appearance can be
customized with stroke properties.

The method takes four parameters: x, y, width, and height. These define the
rectangle's position and dimensions. The stroke style and line width affect
how the outline appears.

## Basic strokeRect Example

This example demonstrates the simplest use of strokeRect to draw a rectangle.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic strokeRect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a black rectangle outline at position (50,50) with 200px
width and 100px height. The line width is set to 2 pixels for the stroke.

The strokeStyle property defaults to black if not specified. The rectangle
will be drawn relative to the canvas coordinate system starting from top-left.

## Customized strokeRect

This example shows how to customize the stroke appearance with different styles.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Customized strokeRect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Red rectangle with thick border
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 8;
    ctx.strokeRect(50, 50, 100, 100);
    
    // Dashed blue rectangle
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 3]);
    ctx.strokeRect(200, 50, 100, 100);
    ctx.setLineDash([]); // Reset dash pattern
    
    // Rounded corners rectangle
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.strokeRect(50, 200, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example draws three rectangles with different stroke customizations.
The first has a thick red border, the second uses a dashed blue pattern.

The third rectangle demonstrates rounded corners using the lineJoin property.
Each rectangle shows different aspects of stroke customization possibilities.

## Multiple strokeRect Calls

This example shows how to draw multiple rectangles with a single stroke call.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple strokeRect Calls&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 4;
    
    // Draw grid of rectangles
    for (let x = 0; x &lt; 5; x++) {
        for (let y = 0; y &lt; 4; y++) {
            ctx.strokeRect(50 + x * 90, 50 + y * 90, 80, 80);
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a 5x4 grid of purple rectangles using nested loops. Each
rectangle is 80x80 pixels with 10px spacing between them.

The example demonstrates how strokeRect can be efficiently used in loops to
create complex patterns. All rectangles share the same stroke properties.

## Animated strokeRect

This example animates a rectangle outline using strokeRect and requestAnimationFrame.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animated strokeRect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let size = 10;
    let growing = true;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 5;
        ctx.strokeRect(
            canvas.width/2 - size/2,
            canvas.height/2 - size/2,
            size, size
        );
        
        if (growing) {
            size += 2;
            if (size &gt; 200) growing = false;
        } else {
            size -= 2;
            if (size &lt; 10) growing = true;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This animation creates a rectangle that grows and shrinks continuously. The
rectangle is centered on the canvas and pulses between 10px and 200px.

The animation loop clears the canvas each frame and redraws the rectangle
with updated size. The growing boolean controls the direction of size change.

## Interactive strokeRect

This example creates an interactive rectangle that follows mouse movement.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Interactive strokeRect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="600" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let mouseX = 0;
    let mouseY = 0;
    
    canvas.addEventListener('mousemove', (e) =&gt; {
        mouseX = e.clientX - canvas.offsetLeft;
        mouseY = e.clientY - canvas.offsetTop;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(0, 100, 255, 0.7)';
        ctx.lineWidth = 8;
        ctx.strokeRect(mouseX - 50, mouseY - 50, 100, 100);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a blue rectangle that follows the mouse cursor. The rectangle
is centered around the mouse position with 100px width and height.

The mousemove event updates the rectangle position. The clearRect method
ensures only one rectangle is visible at a time as it moves.

## Source

[MDN strokeRect Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect)

This tutorial covered the strokeRect method from basic to advanced usage.
These examples demonstrate how to create static, animated, and interactive
rectangle outlines on HTML canvas.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).