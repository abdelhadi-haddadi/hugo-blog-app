+++
title = "JavaScript Canvas createPattern Tutorial"
date = 2025-08-29T19:49:33.952+01:00
draft = false
description = "Learn how to use JavaScript Canvas createPattern methods effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas createPattern Tutorial

last modified April 3, 2025

In this article, we explore the Canvas createPattern method in JavaScript. This
method is essential for creating repeating patterns from images, videos, or other
canvas elements. Mastering patterns is crucial for creating textures and designs.

## Basic Definition

Canvas patterns are repeating images used to fill or stroke shapes. The
createPattern method creates a pattern from a source image or
canvas. Patterns can repeat in different ways to create various effects.

The method takes two parameters: the image source and repetition type. The
repetition type can be "repeat", "repeat-x", "repeat-y", or "no-repeat".
Patterns can be used with both fill and stroke operations.

## Basic Pattern from Image

This example demonstrates how to create a simple pattern from an image.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Pattern&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;
&lt;img id="patternImg" src="pattern.png" style="display:none;"&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('patternImg');
    
    img.onload = function() {
        const pattern = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas and load a hidden image. When the
image loads, we create a repeating pattern from it using createPattern.

The pattern is set as the fill style and used to fill the entire canvas.
This demonstrates the simplest way to create and use a pattern from an image.

## Pattern from Another Canvas

This example shows how to create a pattern from another canvas element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Canvas to Canvas Pattern&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="patternCanvas" width="50" height="50" style="display:none;"&gt;&lt;/canvas&gt;
&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    // Create pattern source
    const patternCanvas = document.getElementById('patternCanvas');
    const patternCtx = patternCanvas.getContext('2d');
    
    patternCtx.fillStyle = 'red';
    patternCtx.fillRect(0, 0, 25, 25);
    patternCtx.fillStyle = 'blue';
    patternCtx.fillRect(25, 0, 25, 25);
    patternCtx.fillStyle = 'green';
    patternCtx.fillRect(0, 25, 25, 25);
    patternCtx.fillStyle = 'yellow';
    patternCtx.fillRect(25, 25, 25, 25);
    
    // Use pattern
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const pattern = ctx.createPattern(patternCanvas, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a hidden canvas that serves as our pattern source. We draw a
checkerboard pattern on it with four different colored squares.

We then use this canvas as the source for createPattern and fill
the main canvas with the repeating pattern. This shows how to generate patterns
programmatically.

## Pattern with Different Repeat Types

This example demonstrates the four different pattern repetition types.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pattern Repeat Types&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="400"&gt;&lt;/canvas&gt;
&lt;img id="patternImg" src="tile.png" style="display:none;"&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('patternImg');
    
    img.onload = function() {
        // Repeat
        const pattern1 = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = pattern1;
        ctx.fillRect(0, 0, 200, 200);
        
        // Repeat-x
        const pattern2 = ctx.createPattern(img, 'repeat-x');
        ctx.fillStyle = pattern2;
        ctx.fillRect(200, 0, 200, 200);
        
        // Repeat-y
        const pattern3 = ctx.createPattern(img, 'repeat-y');
        ctx.fillStyle = pattern3;
        ctx.fillRect(0, 200, 200, 200);
        
        // No-repeat
        const pattern4 = ctx.createPattern(img, 'no-repeat');
        ctx.fillStyle = pattern4;
        ctx.fillRect(200, 200, 200, 200);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example divides the canvas into four quadrants, each showing a different
repeat type. The image tile repeats normally, horizontally, vertically, or not
at all depending on the specified repeat type.

The "repeat" type repeats in both directions, "repeat-x" only horizontally,
"repeat-y" only vertically, and "no-repeat" shows just one instance of the
image. Each quadrant demonstrates one type.

## Pattern for Stroke

This example shows how to use a pattern for stroking shapes rather than filling.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pattern Stroke&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;
&lt;img id="patternImg" src="line-pattern.png" style="display:none;"&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('patternImg');
    
    img.onload = function() {
        const pattern = ctx.createPattern(img, 'repeat');
        
        ctx.strokeStyle = pattern;
        ctx.lineWidth = 20;
        
        ctx.beginPath();
        ctx.arc(200, 150, 100, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(350, 250);
        ctx.stroke();
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a pattern from an image and use it as the stroke style instead
of a fill style. We draw a circle and a line with the patterned stroke.

The pattern image should be designed to work well when used as a stroke. The
line width is set to 20px to make the pattern clearly visible in the stroke.

## Animated Pattern

This advanced example demonstrates how to create an animated pattern effect.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animated Pattern&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="patternCanvas" width="50" height="50" style="display:none;"&gt;&lt;/canvas&gt;
&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const patternCanvas = document.getElementById('patternCanvas');
    const patternCtx = patternCanvas.getContext('2d');
    
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let angle = 0;
    
    function animatePattern() {
        // Update pattern source
        patternCtx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
        patternCtx.save();
        patternCtx.translate(25, 25);
        patternCtx.rotate(angle);
        patternCtx.fillStyle = 'red';
        patternCtx.fillRect(-20, -20, 40, 40);
        patternCtx.restore();
        
        // Use updated pattern
        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        angle += 0.05;
        requestAnimationFrame(animatePattern);
    }
    
    animatePattern();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates an animation by continuously updating the pattern source
canvas. We rotate a square in the pattern canvas and use it to fill the main
canvas.

The requestAnimationFrame creates a smooth animation loop. Each
frame updates the pattern source, creating a dynamic, animated pattern effect
across the entire canvas.

## Source

[MDN createPattern Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern)

In this article, we have explored various techniques for creating and using
patterns on HTML canvas. Mastering these methods is essential for creating
complex textures and designs in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).