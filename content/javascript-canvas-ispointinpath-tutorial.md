+++
title = "JavaScript Canvas isPointInPath Tutorial"
date = 2025-08-29T19:49:38.371+01:00
draft = false
description = "Learn how to use JavaScript Canvas isPointInPath method for hit detection with examples and detailed explanations. Master point-in-path detection in this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas isPointInPath Tutorial

last modified April 3, 2025

This tutorial explores the Canvas isPointInPath method in JavaScript.
This method detects if a point is inside the current path, enabling hit detection.
It's essential for interactive canvas applications like games and diagrams.

## Basic Definition

isPointInPath checks if specified coordinates are inside the current path.
It returns true if the point is inside, false otherwise. This is useful for
detecting clicks or hovers on canvas elements.

The method has two forms: isPointInPath(x, y) and
isPointInPath(path, x, y, fillRule). The second form works with
Path2D objects and optional fill rules (nonzero or evenodd).

## Basic isPointInPath Usage

This example shows how to detect clicks inside a rectangle path.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic isPointInPath&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click on the rectangle&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    // Draw rectangle
    ctx.beginPath();
    ctx.rect(50, 50, 200, 100);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.stroke();
    
    canvas.addEventListener('click', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (ctx.isPointInPath(x, y)) {
            output.textContent = 'Clicked inside the rectangle!';
        } else {
            output.textContent = 'Clicked outside the rectangle';
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a blue rectangle on canvas. When clicked, it checks if the
click coordinates are inside the rectangle path using isPointInPath.

The click coordinates are adjusted relative to the canvas position. The result
is displayed in a paragraph element below the canvas.

## Multiple Shapes Detection

This example demonstrates detecting clicks on multiple shapes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Shapes Detection&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click on a shape&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    // Draw shapes
    ctx.beginPath();
    ctx.rect(50, 50, 100, 100);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(250, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'lightcoral';
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(300, 200);
    ctx.lineTo(350, 250);
    ctx.lineTo(250, 250);
    ctx.closePath();
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.stroke();
    
    canvas.addEventListener('click', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check rectangle
        ctx.beginPath();
        ctx.rect(50, 50, 100, 100);
        if (ctx.isPointInPath(x, y)) {
            output.textContent = 'Clicked on the square';
            return;
        }
        
        // Check circle
        ctx.beginPath();
        ctx.arc(250, 100, 50, 0, Math.PI * 2);
        if (ctx.isPointInPath(x, y)) {
            output.textContent = 'Clicked on the circle';
            return;
        }
        
        // Check triangle
        ctx.beginPath();
        ctx.moveTo(300, 200);
        ctx.lineTo(350, 250);
        ctx.lineTo(250, 250);
        ctx.closePath();
        if (ctx.isPointInPath(x, y)) {
            output.textContent = 'Clicked on the triangle';
            return;
        }
        
        output.textContent = 'Clicked outside all shapes';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example draws three shapes: a square, circle, and triangle. On click,
it checks each shape's path to determine which was clicked.

For each shape, we recreate its path before checking isPointInPath.
The method returns immediately when a hit is detected to optimize performance.

## Using Path2D Objects

This example shows how to use Path2D objects with isPointInPath.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Path2D with isPointInPath&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click on a shape&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    // Create Path2D objects
    const starPath = new Path2D();
    starPath.moveTo(100, 25);
    starPath.lineTo(120, 75);
    starPath.lineTo(175, 75);
    starPath.lineTo(135, 100);
    starPath.lineTo(150, 150);
    starPath.lineTo(100, 125);
    starPath.lineTo(50, 150);
    starPath.lineTo(65, 100);
    starPath.lineTo(25, 75);
    starPath.lineTo(80, 75);
    starPath.closePath();
    
    const heartPath = new Path2D();
    heartPath.moveTo(250, 75);
    heartPath.bezierCurveTo(250, 37, 300, 25, 300, 75);
    heartPath.bezierCurveTo(300, 125, 250, 150, 250, 175);
    heartPath.bezierCurveTo(250, 150, 200, 125, 200, 75);
    heartPath.bezierCurveTo(200, 25, 250, 37, 250, 75);
    heartPath.closePath();
    
    // Draw paths
    ctx.fillStyle = 'pink';
    ctx.fill(starPath);
    ctx.stroke(starPath);
    
    ctx.fillStyle = 'red';
    ctx.fill(heartPath);
    ctx.stroke(heartPath);
    
    canvas.addEventListener('click', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (ctx.isPointInPath(starPath, x, y)) {
            output.textContent = 'Clicked on the star';
        } else if (ctx.isPointInPath(heartPath, x, y)) {
            output.textContent = 'Clicked on the heart';
        } else {
            output.textContent = 'Clicked outside shapes';
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example uses Path2D objects to create complex shapes (star and heart).
Path2D allows path reuse without recreating them for hit detection.

The isPointInPath method accepts Path2D as first argument.
This makes the code cleaner and more efficient than recreating paths.

## Fill Rule Demonstration

This example demonstrates the effect of different fill rules on point detection.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Fill Rule with isPointInPath&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click inside the concentric circles&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    // Draw concentric circles
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, Math.PI * 2);
    ctx.arc(150, 150, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'lightgray';
    ctx.fill();
    ctx.stroke();
    
    canvas.addEventListener('click', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Recreate path for hit detection
        ctx.beginPath();
        ctx.arc(150, 150, 100, 0, Math.PI * 2);
        ctx.arc(150, 150, 50, 0, Math.PI * 2);
        
        // Check with different fill rules
        const nonzero = ctx.isPointInPath(x, y, 'nonzero');
        const evenodd = ctx.isPointInPath(x, y, 'evenodd');
        
        output.textContent = `Nonzero: ${nonzero}, Evenodd: ${evenodd}`;
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how fill rules affect point detection in complex paths.
We draw two concentric circles and check point inclusion with both rules.

The 'nonzero' rule (default) considers the center as inside, while 'evenodd'
considers it outside. This demonstrates how fill rules change hit detection
behavior for self-intersecting paths.

## Interactive Drawing with Hit Detection

This example creates an interactive drawing app with shape selection.

index.html
    

```
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Interactive Drawing with Hit Detection&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="400"&gt;&lt;/canvas&gt;
&lt;div&gt;
    &lt;button id="addRect"&gt;Add Rectangle&lt;/button&gt;
    &lt;button id="addCircle"&gt;Add Circle&lt;/button&gt;
    &lt;p id="output"&gt;Click on shapes to select them&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    const addRect = document.getElementById('addRect');
    const addCircle = document.getElementById('addCircle');
    
    let shapes = [];
    let selectedShape = null;
    
    class Shape {
        constructor(path, type, color) {
            this.path = path;
            this.type = type;
            this.color = color;
            this.selected = false;
        }
    }
    
    function drawShapes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        shapes.forEach(shape =&gt; {
            ctx.fillStyle = shape.selected ? 'yellow' : shape.color;
            ctx.fill(shape.path);
            ctx.stroke(shape.path);
            
            // Draw selection indicator
            if (shape.selected) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
                ctx.stroke(shape.path);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
            }
        });
    }
    
    // Add rectangle button
    addRect.addEventListener('click', () =&gt; {
        const x = Math.random() * 350 + 50;
        const y = Math.random() * 250 + 50;
        const width = Math.random() * 100 + 50;
        const height = Math.random() * 100 + 50;
        
        const path = new Path2D();
        path.rect(x, y, width, height);
        
        const colors = ['lightblue', 'lightgreen', 'pink', 'lavender'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shapes.push(new Shape(path, 'rectangle', color));
        drawShapes();
    });
    
    // Add circle button
    addCircle.addEventListener('click', () =&gt; {
        const x = Math.random() * 350 + 50;
        const y = Math.random() * 250 + 50;
        const radius = Math.random() * 50 + 25;
        
        const path = new Path2D();
        path.arc(x, y, radius, 0, Math.PI * 2);
        
        const colors = ['lightcoral', 'lightseagreen', 'plum', 'wheat'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shapes.push(new Shape(path, 'circle', color));
        drawShapes();
    });
    
    // Canvas click handler
    canvas.addEventListener('click', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Deselect all first
        shapes.forEach(shape =&gt; shape.selected = false);
        selectedShape = null;
        
        // Check shapes in reverse order (top to bottom)
        for (let i = shapes.length - 1; i &gt;= 0; i--) {
            if (ctx.isPointInPath(shapes[i].path, x, y)) {
                shapes[i].selected = true;
                selectedShape
```