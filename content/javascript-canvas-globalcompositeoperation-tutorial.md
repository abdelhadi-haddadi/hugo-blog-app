+++
title = "JavaScript Canvas globalCompositeOperation Tutorial"
date = 2025-08-29T19:49:38.375+01:00
draft = false
description = "Learn how to use JavaScript Canvas globalCompositeOperation property with examples and detailed explanations. Master canvas compositing techniques."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas globalCompositeOperation Tutorial

last modified April 3, 2025

This tutorial explores the Canvas globalCompositeOperation property in JavaScript.
It controls how new drawings are composited with existing canvas content.
Mastering this property enables advanced visual effects and blending modes.

## Basic Definition

globalCompositeOperation determines how shapes and images are drawn onto canvas.
It affects the blending between new content and existing pixels. The property
accepts various string values that define different compositing operations.

Common operations include 'source-over' (default), 'multiply', 'screen',
'overlay', and 'destination-out'. Each creates unique visual effects by
combining source and destination pixels differently.

## Basic source-over Example

This example demonstrates the default 'source-over' compositing operation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Source-over Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw blue rectangle
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 100);
    
    // Draw red rectangle with default source-over
    ctx.fillStyle = 'red';
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(100, 100, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example first draws a blue rectangle, then a red rectangle overlapping it.
The default 'source-over' operation makes the red rectangle appear on top.

The new drawing (source) is placed over existing content (destination). This
is the standard behavior when drawing to canvas without explicit compositing.

## destination-over Example

This example shows how 'destination-over' places existing content over new drawings.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Destination-over Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw blue rectangle
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 100);
    
    // Draw red rectangle with destination-over
    ctx.fillStyle = 'red';
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillRect(100, 100, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we first draw a blue rectangle, then set 'destination-over' before drawing
red. This makes the existing blue rectangle appear on top of the new red one.

'destination-over' is useful when you want to draw behind existing content.
It's often used for creating background effects or watermark-like visuals.

## multiply Example

This example demonstrates the 'multiply' blending mode which darkens colors.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiply Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw yellow rectangle
    ctx.fillStyle = 'yellow';
    ctx.fillRect(50, 50, 100, 100);
    
    // Draw blue rectangle with multiply
    ctx.fillStyle = 'blue';
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillRect(100, 100, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example first draws a yellow rectangle, then a blue one with 'multiply'.
The overlapping area becomes green (yellow × blue = green in RGB color model).

'multiply' multiplies the color channels of source and destination. It's great
for creating shadow effects or simulating transparent colored filters.

## screen Example

This example shows the 'screen' operation which lightens colors.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Screen Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw red rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 100, 100);
    
    // Draw green rectangle with screen
    ctx.fillStyle = 'green';
    ctx.globalCompositeOperation = 'screen';
    ctx.fillRect(100, 100, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we draw a red rectangle, then a green one with 'screen' operation.
The overlapping area becomes yellow (red + green = yellow in additive mixing).

'screen' inverts, multiplies, and inverts again, producing a lighter result.
It's useful for creating glow effects or simulating light beams overlapping.

## destination-out Example

This example demonstrates 'destination-out' which erases existing content.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Destination-out Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw blue rectangle
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 200, 100);
    
    // Erase part with destination-out
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, Math.PI * 2);
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example first draws a blue rectangle, then uses 'destination-out' with
a circle. The circle acts as an eraser, creating a hole in the rectangle.

'destination-out' shows destination content only where source doesn't overlap.
It's commonly used for creating masks or cutting out shapes from existing drawings.

## Source

[MDN globalCompositeOperation Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

This tutorial covered essential globalCompositeOperation modes with practical
examples. Experimenting with these operations can greatly enhance your canvas
graphics capabilities and visual effects.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).