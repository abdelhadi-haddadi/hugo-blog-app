+++
title = "JavaScript Canvas Save Tutorial"
date = 2025-08-27T23:22:00.012+01:00
draft = false
description = "Learn how to use JavaScript Canvas save
and restore methods effectively with examples and detailed explanations. 
Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Save Tutorial

last modified April 3, 2025

In this article, we explore the Canvas save and restore methods in JavaScript.
These methods are essential for managing the drawing state when working with
complex canvas graphics. Mastering state management is crucial for efficient
canvas programming.

## Basic Definition

Canvas save and restore refer to methods that manage the drawing state stack.
The save() method pushes the current state onto the stack, while
restore() pops the most recently saved state from the stack.

The drawing state includes transformations, styles, clipping paths, and more.
These methods allow temporary changes without affecting subsequent drawings.
They are particularly useful in complex drawing operations.

## Basic Save and Restore

This example demonstrates the basic usage of save and restore methods.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Save/Restore&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original state
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 50);
    
    // Save state
    ctx.save();
    
    // Modify state
    ctx.fillStyle = 'red';
    ctx.fillRect(130, 10, 100, 50);
    
    // Restore state
    ctx.restore();
    
    // Uses original blue color
    ctx.fillRect(250, 10, 100, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how save and restore affect the drawing state. We first
draw a blue rectangle, then save the current state with save().

After changing the fill style to red and drawing another rectangle, we call
restore() to return to the previous state. The third rectangle
uses the original blue color.

## Nested Save and Restore

This example demonstrates nesting multiple save and restore operations.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Nested Save/Restore&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Initial state
    ctx.fillStyle = 'black';
    ctx.fillRect(10, 10, 100, 50);
    
    // First save
    ctx.save();
    ctx.fillStyle = 'blue';
    ctx.fillRect(130, 10, 100, 50);
    
    // Second save
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(250, 10, 100, 50);
    
    // First restore (back to blue)
    ctx.restore();
    ctx.fillRect(10, 80, 100, 50);
    
    // Second restore (back to black)
    ctx.restore();
    ctx.fillRect(130, 80, 100, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how save and restore operations work in a stack (LIFO)
order. We first save the black fill state, then change to blue and save again.

After changing to red and drawing, we restore twice. The first restore returns
to blue, and the second returns to the original black state. This demonstrates
the nested nature of state management.

## Save/Restore with Transformations

This example shows how save and restore work with canvas transformations.

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
    
    // Draw original rectangle
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 50);
    
    // Save state
    ctx.save();
    
    // Apply transformation
    ctx.translate(100, 100);
    ctx.rotate(Math.PI/4);
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 100, 50);
    
    // Restore state
    ctx.restore();
    
    // Draw with original transformation
    ctx.fillStyle = 'green';
    ctx.fillRect(200, 50, 100, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates that save and restore affect not just styles but
also transformations. We first draw a blue rectangle in the default state.

After saving, we apply translation and rotation transformations and draw a
red rectangle. After restoring, the green rectangle is drawn without these
transformations, showing the state was properly restored.

## Save/Restore with Clipping

This example demonstrates using save and restore with clipping paths.

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
    
    // Draw without clipping
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
    
    // Draw without clipping again
    ctx.fillStyle = 'green';
    ctx.fillRect(50, 50, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how clipping paths are affected by save and restore. We
first draw a blue rectangle without any clipping. Then we save the state.

After creating a circular clipping path, we draw a red rectangle that only
appears within the clip. After restoring, the green rectangle is drawn
without clipping, demonstrating the state was properly restored.

## Advanced State Management

This example shows complex state management with multiple properties.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Advanced State Management&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set initial styles
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = '20px Arial';
    
    // Draw with initial state
    ctx.fillRect(50, 50, 100, 50);
    ctx.strokeRect(50, 50, 100, 50);
    ctx.fillText('Initial', 50, 130);
    
    // Save state
    ctx.save();
    
    // Modify multiple properties
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;
    ctx.font = 'italic 16px Times';
    
    // Draw with modified state
    ctx.fillRect(200, 50, 100, 50);
    ctx.strokeRect(200, 50, 100, 50);
    ctx.fillText('Modified', 200, 130);
    
    // Save nested state
    ctx.save();
    
    // Modify again
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 1;
    
    // Draw with second modified state
    ctx.fillRect(350, 50, 100, 50);
    ctx.strokeRect(350, 50, 100, 50);
    ctx.fillText('Nested', 350, 130);
    
    // Restore to first modified state
    ctx.restore();
    ctx.fillRect(200, 200, 100, 50);
    ctx.strokeRect(200, 200, 100, 50);
    
    // Restore to initial state
    ctx.restore();
    ctx.fillRect(50, 200, 100, 50);
    ctx.strokeRect(50, 200, 100, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This comprehensive example demonstrates how save and restore affect multiple
drawing state properties simultaneously. We modify fill, stroke, line width,
and font properties at different levels.

The example shows nested state management, with two save operations and
corresponding restores. Each restore returns to exactly the state that was
saved, including all style properties and transformations.

## Source

[MDN Canvas save Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save)

In this article, we have explored various techniques for managing canvas state
using save and restore methods. These powerful tools are essential for complex
canvas drawings and animations in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).