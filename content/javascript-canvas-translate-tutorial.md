+++
title = "JavaScript Canvas Translate Tutorial"
date = 2025-08-29T19:49:49.465+01:00
draft = false
description = "Learn how to use JavaScript Canvas translate method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Translate Tutorial

last modified April 3, 2025

In this article, we explore the Canvas translate method in JavaScript. This
method moves the canvas origin to a new position, affecting all subsequent
drawing operations. Mastering translation is crucial for complex drawings.

## Basic Definition

Canvas translation moves the origin point (0,0) of the canvas to a new location.
This affects all subsequent drawing operations by offsetting their coordinates.
The translate method doesn't move existing drawings.

The translate(x, y) method takes two parameters: horizontal (x)
and vertical (y) offset values. Positive values move right/down, negative
values move left/up from the current origin.

## Basic Translation

This example demonstrates how to translate the canvas origin and draw a rectangle.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Translation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw at original origin (0,0)
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 50, 50);
    
    // Translate origin to (100,50)
    ctx.translate(100, 50);
    
    // Draw at new origin (0,0 is now at 100,50)
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 50, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example first draws a red square at the original origin (0,0). Then we
translate the origin to (100,50) and draw a blue square at the new origin.

The blue square appears at (100,50) on the canvas because we drew it at
(0,0) after translation. The translation affects all subsequent drawing.

## Multiple Translations

This example shows how multiple translations accumulate their effects.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Translations&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // First translation
    ctx.translate(50, 50);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 50, 50);
    
    // Second translation (relative to first)
    ctx.translate(100, 100);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 50, 50);
    
    // Third translation (relative to previous)
    ctx.translate(100, 100);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 50, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates that translations are cumulative. Each translate
call moves the origin relative to its current position, not the original.

The red square is at (50,50), green at (150,150), and blue at (250,250).
Each translation adds to the previous one, creating a diagonal pattern.

## Translation with Rotation

This example combines translation with rotation to create a rotated pattern.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Translation with Rotation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    
    for (let i = 0; i &lt; 12; i++) {
        ctx.save();
        
        // Move origin to center
        ctx.translate(200, 200);
        
        // Rotate around new origin
        ctx.rotate(i * Math.PI / 6);
        
        // Draw rectangle (offset from center)
        ctx.fillRect(100, -10, 100, 20);
        
        ctx.restore();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a circular pattern of rectangles using translation and
rotation. We first translate to the center, then rotate, then draw.

The save and restore methods preserve and restore
the transformation state. This ensures each rectangle starts from the same
initial state before being transformed.

## Nested Translations

This example demonstrates nested translations for hierarchical drawings.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Nested Translations&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Main body
    ctx.translate(250, 200);
    drawRobot(ctx, 0, 0, 'blue');
    
    // Left arm
    ctx.save();
    ctx.translate(-50, -30);
    drawRobot(ctx, 0, 0, 'red');
    ctx.restore();
    
    // Right arm
    ctx.save();
    ctx.translate(50, -30);
    drawRobot(ctx, 0, 0, 'green');
    ctx.restore();
    
    function drawRobot(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x - 30, y - 50, 60, 100);
        ctx.fillRect(x - 50, y - 30, 20, 60);
        ctx.fillRect(x + 30, y - 30, 20, 60);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a simple robot figure with a main body and two arms.
Each part is drawn relative to its own local coordinate system.

The main body is drawn at the center. Arms are drawn relative to the body
using nested translations. save and restore
maintain the transformation stack.

## Animation with Translation

This example shows how to use translation in an animation loop.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animation with Translation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let x = 0;
    
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Save current state
        ctx.save();
        
        // Translate to current position
        ctx.translate(x, 150);
        
        // Draw square
        ctx.fillStyle = 'purple';
        ctx.fillRect(-25, -25, 50, 50);
        
        // Restore state
        ctx.restore();
        
        // Update position
        x += 2;
        if (x &gt; canvas.width) x = -50;
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example animates a square moving across the canvas using translation.
The square's position is updated each frame, and translation moves it.

We use save and restore to isolate the translation
effect. The animation loop continues indefinitely with requestAnimationFrame.

## Source

[MDN Canvas translate Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate)

In this article, we have explored various techniques for using the translate
method in Canvas. Mastering translation is essential for complex drawings,
animations, and game development in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).