+++
title = "JavaScript Canvas lineWidth Tutorial"
date = 2025-08-27T23:21:56.369+01:00
draft = false
description = "Learn how to use JavaScript Canvas lineWidth
property effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas lineWidth Tutorial

last modified April 3, 2025

In this article, we explore the Canvas lineWidth property in JavaScript. This
property controls the thickness of lines and shape outlines drawn on canvas.
Understanding lineWidth is essential for creating precise graphics.

## Basic Definition

The lineWidth property specifies the thickness of lines in pixels. It affects
all stroked paths, including lines, curves, and shape outlines. The default
value is 1.0, creating thin lines.

Line width is applied centered on the path coordinates. A width of 10 means
5 pixels extend on each side of the path. This property works with stroke
methods like stroke() and strokeRect().

## Basic lineWidth Example

This example demonstrates how to draw lines with different thicknesses.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic lineWidth&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Thin line
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(250, 50);
    ctx.stroke();
    
    // Medium line
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(250, 100);
    ctx.stroke();
    
    // Thick line
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(250, 150);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code draws three horizontal lines with increasing thickness. The first
line uses the default 1px width, the second 5px, and the third 15px.

Notice how each line is centered on its y-coordinate. The thickness extends
equally above and below the path coordinates. This demonstrates basic width
control.

## lineWidth with Shapes

This example shows how lineWidth affects different shapes and their outlines.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;lineWidth with Shapes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Rectangle with thin outline
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(50, 50, 100, 100);
    
    // Rectangle with thick outline
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(200, 50, 100, 100);
    
    // Circle with medium outline
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.arc(300, 200, 50, 0, Math.PI * 2);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we draw two rectangles and one circle with different line widths. The
first rectangle has a thin 1px red outline, while the second has a thick
10px blue outline.

The circle demonstrates that lineWidth works equally well with curved paths.
The green circle has a medium 5px outline. Notice how the stroke extends
both inside and outside the path.

## lineWidth with Line Caps

This example explores how lineWidth interacts with different line cap styles.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;lineWidth with Line Caps&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Butt cap (default)
    ctx.lineWidth = 15;
    ctx.lineCap = 'butt';
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(150, 100);
    ctx.stroke();
    
    // Round cap
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(300, 100);
    ctx.stroke();
    
    // Square cap
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(350, 100);
    ctx.lineTo(450, 100);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code demonstrates three line cap styles with a thick 15px line width.
The butt cap (default) ends exactly at the endpoints, while round adds
semi-circular ends.

The square cap extends the line by half the lineWidth beyond each endpoint.
All caps are clearly visible with thicker lines, showing how width affects
line endings.

## Variable lineWidth Along Path

This advanced example shows how to create paths with varying line widths.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Variable lineWidth&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create a path with varying width
    ctx.beginPath();
    ctx.moveTo(50, 150);
    
    // Draw segments with increasing width
    for (let i = 0; i &lt; 10; i++) {
        ctx.lineWidth = 1 + i * 2;
        ctx.lineTo(50 + i * 40, 150 + Math.sin(i) * 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(50 + i * 40, 150 + Math.sin(i) * 50);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a wavy path where each segment has a progressively thicker line.
We achieve this by breaking the path into segments and changing lineWidth.

Each segment starts where the previous ended. The width increases from 1px
to 19px in steps. This technique allows for dynamic line thickness variation.

## lineWidth and Performance

This example demonstrates the performance impact of very large line widths.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;lineWidth Performance&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Test performance with large lineWidth
    const startTime = performance.now();
    
    ctx.lineWidth = 100;
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.bezierCurveTo(150, 50, 350, 250, 450, 150);
    ctx.stroke();
    
    const endTime = performance.now();
    console.log(`Rendering took ${endTime - startTime} milliseconds`);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code draws a thick Bézier curve and measures rendering time. Very large
lineWidth values can impact performance, especially with complex paths.

The console logs the rendering duration. In practice, avoid extremely large
widths unless necessary, as they require more computation to render properly.

## Source

[MDN Canvas lineWidth Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)

In this article, we explored the lineWidth property in depth. We covered basic
usage, shape outlines, line caps, variable widths, and performance considerations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).