+++
title = "JavaScript Canvas Restore Tutorial"
date = 2025-08-27T23:22:00.009+01:00
draft = false
description = "Learn how to use JavaScript Canvas save and restore methods effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Restore Tutorial

last modified April 3, 2025

In this article, we explore the Canvas save and restore methods in JavaScript.
These methods are essential for managing the drawing state stack in HTML canvas.
Mastering state management is crucial for complex drawings and animations.

## Basic Definition

Canvas save and restore methods manage the drawing state stack. The
save() method pushes the current state onto the stack.
restore() pops the top state from the stack.

The drawing state includes styles, transformations, and clipping paths.
This allows temporary changes without affecting subsequent drawings.
Proper state management is key to efficient canvas programming.

## Basic Save and Restore

This example demonstrates the basic usage of save and restore methods.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Save and Restore&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original state
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);
    
    // Save current state
    ctx.save();
    
    // Change state
    ctx.fillStyle = 'red';
    ctx.fillRect(150, 10, 100, 100);
    
    // Restore original state
    ctx.restore();
    
    // Uses original blue color
    ctx.fillRect(10, 120, 100, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how to preserve the drawing state. We first draw a blue
rectangle, then save the state before changing the fill color to red.

After drawing a red rectangle, we restore the previous state. The final
rectangle uses the original blue color, demonstrating state restoration.

## Nested Save and Restore

This example demonstrates nested save and restore operations.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Nested Save and Restore&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Level 0 state
    ctx.fillStyle = 'black';
    ctx.fillRect(10, 10, 100, 100);
    
    // Save Level 0
    ctx.save();
    
    // Level 1 state
    ctx.fillStyle = 'blue';
    ctx.fillRect(150, 10, 100, 100);
    
    // Save Level 1
    ctx.save();
    
    // Level 2 state
    ctx.fillStyle = 'red';
    ctx.fillRect(290, 10, 100, 100);
    
    // Restore to Level 1
    ctx.restore();
    ctx.fillRect(150, 120, 100, 100);
    
    // Restore to Level 0
    ctx.restore();
    ctx.fillRect(10, 120, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows nested state management. We create three states with
different fill colors, saving each before changing to the next.

When restoring, we return through the states in reverse order. This
demonstrates how the stack works with multiple save operations.

## Save and Restore with Transformations

This example shows save/restore with canvas transformations.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Save/Restore with Transformations&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original state
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 50);
    
    // Save state
    ctx.save();
    
    // Apply transformation
    ctx.translate(200, 100);
    ctx.rotate(Math.PI/4);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 100, 50);
    
    // Restore original state
    ctx.restore();
    
    // Draw with original state
    ctx.fillRect(50, 150, 100, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates saving and restoring transformation states.
We first draw a blue rectangle in the original coordinate system.

After saving the state, we translate and rotate the canvas, then draw
a red rectangle. After restoring, subsequent drawings use the original
untransformed coordinates.

## Save and Restore with Clipping

This example shows save/restore with clipping paths.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Save/Restore with Clipping&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original drawing
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 300, 200);
    
    // Save state
    ctx.save();
    
    // Create clipping path
    ctx.beginPath();
    ctx.arc(200, 150, 100, 0, Math.PI * 2);
    ctx.clip();
    
    // Draw with clipping
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 300, 200);
    
    // Restore state (removes clipping)
    ctx.restore();
    
    // Draw without clipping
    ctx.fillStyle = 'green';
    ctx.fillRect(100, 100, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates managing clipping paths with save/restore.
We first draw a blue rectangle covering the entire drawing area.

After saving the state, we create a circular clipping path and draw
a red rectangle (only visible within the circle). After restoring,
the clipping is removed and we can draw normally again.

## Complex Example with Multiple States

This example combines multiple state changes with save/restore.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Save/Restore Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Initial state
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, 500, 400);
    
    // Save state 1
    ctx.save();
    ctx.fillStyle = 'blue';
    ctx.translate(100, 100);
    ctx.fillRect(0, 0, 100, 100);
    
    // Save state 2
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.rotate(Math.PI/4);
    ctx.fillRect(0, 0, 100, 100);
    
    // Save state 3
    ctx.save();
    ctx.fillStyle = 'green';
    ctx.scale(1.5, 1.5);
    ctx.fillRect(50, 50, 100, 100);
    
    // Restore to state 2
    ctx.restore();
    ctx.fillRect(0, 0, 100, 100);
    
    // Restore to state 1
    ctx.restore();
    ctx.fillRect(150, 0, 100, 100);
    
    // Restore to initial state
    ctx.restore();
    ctx.fillRect(300, 100, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This complex example shows multiple state changes with transformations.
We start with a gray background, then create three nested states.

Each state adds new transformations and style changes. When restoring,
we step back through each state, demonstrating how the stack works.
The final rectangle uses the original untransformed state.

## Source

[MDN Canvas save Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save)

[MDN Canvas restore Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore)

In this article, we have explored the save and restore methods in Canvas.
These powerful tools help manage complex drawings by preserving states.
Proper use of these methods leads to cleaner, more maintainable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).