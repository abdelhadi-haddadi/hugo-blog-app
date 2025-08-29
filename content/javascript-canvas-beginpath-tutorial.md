+++
title = "JavaScript Canvas beginPath Tutorial"
date = 2025-08-29T19:49:30.562+01:00
draft = false
description = "Learn how to use JavaScript Canvas beginPath method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas beginPath Tutorial

last modified April 3, 2025

In this article, we explore the Canvas beginPath method in JavaScript. This
method is essential for drawing complex shapes and paths on HTML canvas.
Mastering path creation is crucial for creating custom graphics.

## Basic Definition

The beginPath method starts a new path by emptying the list of
sub-paths. It is used when you want to create a new path separate from any
previous paths. This prevents unwanted connections between shapes.

Paths consist of sub-paths like lines, arcs, and curves. After defining a path,
you can stroke or fill it. The beginPath is often used with
moveTo, lineTo, and arc methods.

## Basic beginPath Usage

This example demonstrates how to draw two separate lines using beginPath.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic beginPath&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // First line
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    
    // Second line (separate from first)
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(150, 100);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create two separate horizontal lines. The first line
is red and drawn from (50,50) to (150,50). The second is blue and drawn below.

Each line is drawn in its own path using beginPath. Without it,
the second line would connect to the first, creating an L shape instead.

## Multiple Shapes with beginPath

This example shows how to draw multiple independent shapes using beginPath.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Shapes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // First rectangle
    ctx.beginPath();
    ctx.rect(50, 50, 80, 80);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    
    // Second rectangle (independent)
    ctx.beginPath();
    ctx.rect(150, 50, 80, 80);
    ctx.fillStyle = 'pink';
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we draw two separate rectangles with different fill and stroke colors.
Each rectangle is created in its own path using beginPath.

The first rectangle is light blue with blue stroke, the second is pink with
red stroke. Without beginPath, the properties would carry over.

## Complex Path with beginPath

This example demonstrates creating a complex shape with multiple sub-paths.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Path&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    // Main shape
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 150);
    
    // Hole in shape
    ctx.moveTo(100, 100);
    ctx.lineTo(150, 100);
    ctx.lineTo(150, 130);
    ctx.lineTo(100, 130);
    ctx.closePath();
    
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.strokeStyle = 'green';
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a complex shape with a main body and a hole. The moveTo
method lifts the "pen" to start a new sub-path without connecting lines.

The main shape is a right angle, while the hole is a smaller rectangle inside.
All parts are in one path but separated into sub-paths with moveTo.

## beginPath with Arcs

This example shows how to combine arcs and lines in a single path.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Arcs and Lines&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    // Start at left
    ctx.moveTo(50, 100);
    // Line to right
    ctx.lineTo(200, 100);
    // Arc back to left
    ctx.arc(125, 100, 75, 0, Math.PI, true);
    
    ctx.fillStyle = 'lightyellow';
    ctx.fill();
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 3;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a shape with a straight line and a semicircular arc. The path
starts at (50,100), draws a line to (200,100), then arcs back to the start.

The arc method draws a 180-degree arc (Math.PI radians) with
radius 75px. The true parameter makes it draw counter-clockwise.

## Multiple Independent Paths

This example demonstrates drawing multiple independent paths with different styles.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Paths&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // First path - triangle
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 150);
    ctx.lineTo(150, 50);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fill();
    
    // Second path - circle
    ctx.beginPath();
    ctx.arc(300, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fill();
    
    // Third path - custom shape
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(300, 200);
    ctx.lineTo(350, 250);
    ctx.lineTo(250, 280);
    ctx.closePath();
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 5;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates three completely independent paths: a red triangle, a
blue circle, and a purple custom shape. Each has its own style properties.

The beginPath calls ensure each shape is drawn separately without
affecting the others. This is crucial when using different fill and stroke styles.

## Source

[MDN Canvas beginPath Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath)

In this article, we have explored the beginPath method and its importance in
creating complex canvas drawings. Proper path management is essential for
creating clean, independent shapes with custom styles.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).