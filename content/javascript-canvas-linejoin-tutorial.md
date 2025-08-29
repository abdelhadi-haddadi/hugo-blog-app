+++
title = "JavaScript Canvas LineJoin Tutorial"
date = 2025-08-27T23:21:55.012+01:00
draft = false
description = "Learn how to use JavaScript Canvas lineJoin property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas LineJoin Tutorial

last modified April 3, 2025

In this article, we explore the Canvas lineJoin property in JavaScript. This
property controls how corners are rendered when two lines meet at sharp angles.
Mastering lineJoin is crucial for creating polished graphics and visualizations.

## Basic Definition

The lineJoin property specifies the type of corner created when two lines meet.
It affects the appearance of shapes with sharp angles or complex paths.
There are three possible values: miter, round, and bevel.

The default value is miter which creates sharp corners. Round produces rounded
corners, while bevel creates flattened corners. The property works with stroke
operations on paths and shapes.

## Basic LineJoin Usage

This example demonstrates the three lineJoin types on simple angled paths.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic LineJoin&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Miter join (default)
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 150);
    ctx.lineTo(150, 50);
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 10;
    ctx.stroke();
    
    // Round join
    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(250, 150);
    ctx.lineTo(300, 50);
    ctx.lineJoin = 'round';
    ctx.lineWidth = 10;
    ctx.stroke();
    
    // Bevel join
    ctx.beginPath();
    ctx.moveTo(350, 50);
    ctx.lineTo(400, 150);
    ctx.lineTo(450, 50);
    ctx.lineJoin = 'bevel';
    ctx.lineWidth = 10;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates three V-shaped paths with different lineJoin values. Each
path shows how corners are rendered differently based on the lineJoin setting.

The miter join creates sharp pointed corners, round produces smooth rounded
corners, and bevel makes flattened corners. All paths use 10px line width.

## LineJoin with Miter Limit

This example shows how miterLimit affects miter joins at sharp angles.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Miter Limit&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Default miter limit (10)
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(100, 50);
    ctx.lineTo(150, 100);
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    
    // Low miter limit (2)
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(250, 50);
    ctx.lineTo(300, 100);
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 2;
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

The miterLimit property controls how far the miter join can extend. At sharp
angles, miter joins can become very long. The miterLimit prevents this.

The first path uses default miterLimit (10) showing long pointed corners.
The second path with miterLimit=2 shows how the join is automatically
converted to bevel when the limit is exceeded.

## LineJoin with Complex Paths

This example demonstrates lineJoin behavior with more complex paths.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Path LineJoin&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Star shape with round joins
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(120, 100);
    ctx.lineTo(170, 100);
    ctx.lineTo(130, 130);
    ctx.lineTo(150, 180);
    ctx.lineTo(100, 150);
    ctx.lineTo(50, 180);
    ctx.lineTo(70, 130);
    ctx.lineTo(30, 100);
    ctx.lineTo(80, 100);
    ctx.closePath();
    
    ctx.lineJoin = 'round';
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'purple';
    ctx.stroke();
    
    // Zigzag path with bevel joins
    ctx.beginPath();
    ctx.moveTo(200, 50);
    for (let i = 0; i &lt; 5; i++) {
        ctx.lineTo(250 + i * 50, i % 2 ? 200 : 50);
    }
    
    ctx.lineJoin = 'bevel';
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'orange';
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates two complex paths to demonstrate lineJoin behavior.
The first is a star shape with round joins, showing smooth rounded corners.

The second is a zigzag path with bevel joins, showing flattened corners at
each angle change. Both paths use 8px line width for clear visibility.

## LineJoin with Different Line Widths

This example shows how lineJoin appears with varying line widths.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Line Width Comparison&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const lineWidths = [2, 5, 10, 15];
    const joinTypes = ['miter', 'round', 'bevel'];
    
    joinTypes.forEach((joinType, j) =&gt; {
        lineWidths.forEach((width, i) =&gt; {
            ctx.beginPath();
            ctx.moveTo(50 + j * 150, 50 + i * 60);
            ctx.lineTo(100 + j * 150, 100 + i * 60);
            ctx.lineTo(150 + j * 150, 50 + i * 60);
            
            ctx.lineJoin = joinType;
            ctx.lineWidth = width;
            ctx.strokeStyle = `hsl(${j * 120}, 70%, 50%)`;
            ctx.stroke();
            
            // Label
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.fillText(`${joinType} ${width}px`, 
                30 + j * 150, 45 + i * 60);
        });
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a grid comparing all three join types with four different
line widths. Each cell shows how the join type appears at different scales.

Miter joins become more pronounced with thicker lines. Round joins maintain
consistent curvature. Bevel joins show more noticeable flattening at larger
widths. The hsl color function varies colors by join type.

## Practical Application: Custom Shapes

This example demonstrates practical use of lineJoin in creating custom shapes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Shapes with LineJoin&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Gear with miter joins
    ctx.beginPath();
    drawGear(ctx, 100, 150, 50, 15, 8);
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'teal';
    ctx.stroke();
    
    // Gear with round joins
    ctx.beginPath();
    drawGear(ctx, 300, 150, 60, 12, 10);
    ctx.lineJoin = 'round';
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'brown';
    ctx.stroke();
    
    function drawGear(ctx, x, y, radius, teeth, toothLength) {
        const angleStep = (Math.PI * 2) / teeth;
        
        for (let i = 0; i &lt; teeth; i++) {
            const angle1 = i * angleStep;
            const angle2 = angle1 + angleStep * 0.3;
            const angle3 = angle1 + angleStep * 0.7;
            
            ctx.moveTo(
                x + Math.cos(angle1) * radius,
                y + Math.sin(angle1) * radius
            );
            
            ctx.lineTo(
                x + Math.cos(angle2) * (radius + toothLength),
                y + Math.sin(angle2) * (radius + toothLength)
            );
            
            ctx.lineTo(
                x + Math.cos(angle3) * (radius + toothLength),
                y + Math.sin(angle3) * (radius + toothLength)
            );
            
            ctx.lineTo(
                x + Math.cos(angle1 + angleStep) * radius,
                y + Math.sin(angle1 + angleStep) * radius
            );
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates two gear shapes with different lineJoin styles. The
drawGear function generates gear paths with specified parameters.

The first gear uses miter joins for sharp teeth, while the second uses
round joins for smoother teeth. This shows how lineJoin affects complex
custom shapes in practical applications.

## Source

[MDN Canvas lineJoin Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin)

In this article, we have explored the lineJoin property in depth with various
examples. Understanding these techniques helps create professional graphics
with precise corner styling in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).