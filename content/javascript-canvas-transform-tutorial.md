+++
title = "JavaScript Canvas Transform Tutorial"
date = 2025-08-29T19:49:48.341+01:00
draft = false
description = "Learn how to use JavaScript Canvas transform methods effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Transform Tutorial

last modified April 3, 2025

In this article, we explore Canvas transform methods in JavaScript. These
methods allow you to manipulate the drawing context for advanced graphics.
Transforms are essential for creating complex visualizations and animations.

## Basic Definition

Canvas transforms modify the coordinate system of the drawing context. They
allow translation, rotation, scaling, and skewing of drawn elements. The
transform state can be saved and restored using context methods.

The main transform methods are translate, rotate,
scale, and transform. These affect all subsequent
drawing operations until the context is reset or restored.

## Basic Translation

This example demonstrates how to use the translate method to move the origin.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Translation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw at original position
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 50, 50);
    
    // Translate and draw again
    ctx.translate(100, 50);
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 50, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows two squares drawn at different positions. The first red
square is drawn at the original origin (0,0). After calling translate,
the origin moves 100px right and 50px down.

The blue square is drawn at the same coordinates (10,10) but appears in a
different location due to the translation. This demonstrates how translation
affects all subsequent drawing operations.

## Rotation Around a Point

This example shows how to rotate a rectangle around its center point.

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
    
    const rectWidth = 100;
    const rectHeight = 60;
    const centerX = 150;
    const centerY = 100;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Math.PI / 4); // 45 degrees
    ctx.fillStyle = 'green';
    ctx.fillRect(-rectWidth/2, -rectHeight/2, rectWidth, rectHeight);
    ctx.restore();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

To rotate around a point, we first translate to that point, then rotate, then
draw the shape offset by half its dimensions. This places the shape's center
at the rotation point.

The save and restore methods preserve the original
transform state. The rectangle is rotated 45 degrees (π/4 radians) around its
center at (150,100).

## Scaling Shapes

This example demonstrates how to scale shapes using the scale method.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scaling Shapes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original shape
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(50, 50, 50, 50);
    
    // Scaled shape
    ctx.scale(2, 0.5);
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fillRect(50, 50, 50, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we draw two overlapping rectangles. The first is drawn normally. The
second is scaled 2x horizontally and 0.5x vertically before drawing.

Note that scaling affects everything including stroke widths and text. The
transparent colors show how the scaled rectangle becomes wider and shorter
while maintaining its position relative to the transformed origin.

## Combining Transforms

This example shows how to combine multiple transforms for complex effects.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Combined Transforms&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    function drawHouse() {
        ctx.fillStyle = 'brown';
        ctx.fillRect(-20, -20, 40, 40);
        ctx.beginPath();
        ctx.moveTo(-30, -20);
        ctx.lineTo(0, -40);
        ctx.lineTo(30, -20);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
    
    ctx.save();
    ctx.translate(100, 100);
    drawHouse();
    
    ctx.translate(150, 0);
    ctx.scale(1.5, 1.5);
    drawHouse();
    
    ctx.translate(150, 0);
    ctx.rotate(Math.PI / 4);
    drawHouse();
    ctx.restore();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example draws three houses using the same drawing function but with
different transforms applied. The first is drawn normally at (100,100).

The second is translated right and scaled up. The third is translated further
right and rotated 45 degrees. This demonstrates how transforms can be combined
to create varied appearances from a single drawing function.

## Advanced Matrix Transform

This example demonstrates using the transform method for custom matrix operations.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Matrix Transform&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original square
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(50, 50, 100, 100);
    
    // Skewed square
    ctx.transform(1, 0.5, -0.5, 1, 150, 50);
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

The transform method applies a custom transformation matrix. The
parameters are: horizontal scale, horizontal skew, vertical skew, vertical
scale, horizontal move, and vertical move.

This example creates a skewed parallelogram effect. The blue square is
transformed with both scaling and skewing components, demonstrating how
complex transforms can be achieved with direct matrix manipulation.

## Source

[MDN Canvas transform Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform)

In this article, we have explored various transform techniques for manipulating
shapes on HTML canvas. Mastering these methods is essential for creating
advanced graphics and animations in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).