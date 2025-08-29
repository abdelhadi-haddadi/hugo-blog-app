+++
title = "JavaScript Canvas Rotate Tutorial"
date = 2025-08-27T23:22:00.019+01:00
draft = false
description = "Learn how to use JavaScript Canvas rotation
methods effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Rotate Tutorial

last modified April 3, 2025

In this article, we explore the Canvas rotation methods in JavaScript. Rotation
is a fundamental transformation that allows you to spin shapes and paths around
a point. Mastering rotation is crucial for creating dynamic graphics.

## Basic Definition

Canvas rotation refers to the process of spinning shapes around a specified
point (usually the origin). The rotation angle is measured in radians, with
positive values rotating clockwise.

The main rotation method is rotate(angle), which applies a rotation
transformation to the canvas. Rotation affects all subsequent drawing operations
until the canvas state is restored.

## Basic Rotation Example

This example demonstrates how to rotate a simple rectangle on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Rotation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Save the default state
    ctx.save();
    
    // Rotate 45 degrees (convert to radians)
    ctx.rotate(Math.PI / 4);
    
    // Draw a rectangle
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 50);
    
    // Restore the default state
    ctx.restore();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we first save the default canvas state. We then rotate
the canvas by 45 degrees (π/4 radians) using the rotate method.

The rectangle is drawn after rotation, so it appears rotated. Finally, we
restore the canvas to its original state using restore.

## Rotation Around a Point

This example shows how to rotate a shape around a specific point.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Rotation Around Point&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const centerX = 150;
    const centerY = 100;
    const angle = Math.PI / 6; // 30 degrees
    
    ctx.save();
    
    // Move to center point, rotate, then move back
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.translate(-centerX, -centerY);
    
    // Draw rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(centerX - 50, centerY - 25, 100, 50);
    
    ctx.restore();
    
    // Mark the rotation point
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

To rotate around a specific point, we first translate to that point, rotate,
then translate back. This technique is essential for controlled rotation.

The example rotates a rectangle 30 degrees around its center point (150,100).
We also draw a small black dot to mark the rotation center.

## Animated Rotation

This example demonstrates smooth animation using rotation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animated Rotation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let angle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.translate(-centerX, -centerY);
        
        // Draw triangle
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 50);
        ctx.lineTo(centerX - 30, centerY + 40);
        ctx.lineTo(centerX + 30, centerY + 40);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
        
        // Increase angle for next frame
        angle += 0.02;
        if (angle &gt; Math.PI * 2) angle = 0;
        
        // Request next animation frame
        requestAnimationFrame(draw);
    }
    
    // Start animation
    draw();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a continuously rotating triangle using the
requestAnimationFrame method for smooth animation.

The rotation angle increases slightly each frame, creating the animation
effect. The canvas is cleared before each redraw to prevent smearing.

## Multiple Rotated Objects

This example shows how to draw multiple objects with different rotations.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Rotated Objects&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    function drawRotatedRect(x, y, width, height, angle, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        ctx.fillStyle = color;
        ctx.fillRect(-width/2, -height/2, width, height);
        
        ctx.restore();
    }
    
    // Draw multiple rotated rectangles
    drawRotatedRect(100, 100, 80, 40, Math.PI/6, 'blue');
    drawRotatedRect(200, 150, 60, 60, Math.PI/4, 'red');
    drawRotatedRect(300, 100, 100, 30, Math.PI/3, 'green');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a helper function drawRotatedRect that draws a
rectangle rotated around its center. The function handles translation and
rotation internally.

We then use this function to draw three rectangles at different positions
with different rotation angles and colors. This demonstrates reusable
rotation code.

## Combining Rotation with Other Transformations

This example combines rotation with scaling and translation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Combined Transformations&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw original shape (reference)
    ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
    ctx.fillRect(100, 100, 100, 50);
    
    // Apply transformations
    ctx.save();
    ctx.translate(200, 150);  // Move origin
    ctx.rotate(Math.PI / 3);  // Rotate 60 degrees
    ctx.scale(1.5, 1.5);      // Scale up
    
    // Draw transformed shape
    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.fillRect(-50, -25, 100, 50); // Draw centered on new origin
    
    ctx.restore();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates how transformations are applied in sequence:
first translation, then rotation, then scaling. The order matters.

We draw a semi-transparent gray rectangle as reference, then a transformed
red rectangle. The transformed rectangle is scaled, rotated, and moved.

## Source

[MDN Canvas rotate Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate)

In this article, we have explored various techniques for rotating shapes on
HTML canvas. Mastering rotation is essential for creating dynamic and
interactive graphics in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).