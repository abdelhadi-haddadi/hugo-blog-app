+++
title = "JavaScript Canvas shadowColor Tutorial"
date = 2025-08-27T23:22:02.489+01:00
draft = false
description = "Learn how to use JavaScript Canvas shadowColor
property effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas shadowColor Tutorial

last modified April 3, 2025

In this article, we explore the Canvas shadowColor property in JavaScript. This
property is essential for creating realistic shadows in HTML canvas graphics.
Mastering shadows enhances depth and realism in your visualizations.

## Basic Definition

Canvas shadowColor defines the color of shadows drawn on the canvas. It works
with other shadow properties like shadowBlur, shadowOffsetX, and shadowOffsetY.
Shadows can be applied to both fills and strokes of shapes and text.

The shadowColor property accepts CSS color values including named colors, hex,
rgb, rgba, hsl, and hsla. The default value is fully transparent black.

## Basic Shadow Usage

This example demonstrates how to create a simple shadow effect on a rectangle.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Shadow&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we set shadowColor to semi-transparent black. The
shadowBlur defines how soft the shadow edges are, while offsetX/Y position it.

The blue rectangle casts a shadow that's offset 5px right and down with 10px
blur. This creates a simple but effective drop shadow effect.

## Colored Shadows

This example shows how to create shadows with different colors.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Colored Shadows&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Red shadow
    ctx.shadowColor = 'rgba(255, 0, 0, 0.7)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(50, 50, 100, 100);
    
    // Blue shadow
    ctx.shadowColor = 'rgba(0, 0, 255, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = -10;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = 'white';
    ctx.fillRect(250, 50, 100, 100);
    
    // Green shadow
    ctx.shadowColor = 'rgba(0, 255, 0, 0.6)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 15;
    ctx.fillStyle = 'purple';
    ctx.fillRect(150, 180, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create three squares with different colored shadows. Each shadow has
unique color, blur amount, and offset values demonstrating the flexibility.

The first square has a red shadow, second has blue (with negative offsetX),
and third has green. Notice how shadowColor affects the entire shadow appearance.

## Text Shadows

This example demonstrates applying shadows to text elements on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Text Shadows&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Shadow for first text
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Hello World!', 50, 80);
    
    // Different shadow for second text
    ctx.shadowColor = 'rgba(200, 0, 200, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = -5;
    ctx.shadowOffsetY = 5;
    ctx.font = 'bold 40px Verdana';
    ctx.fillStyle = 'yellow';
    ctx.fillText('Canvas Shadows', 50, 150);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how shadows work with text. The first text has a simple
black shadow, while the second uses a purple shadow with negative offsetX.

Text shadows follow the same principles as shape shadows. The shadow appears
behind the text glyphs, enhancing readability and visual appeal.

## Inner Shadows Effect

This example creates an inner shadow effect using clever path manipulation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Inner Shadows&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw clipping region
    ctx.beginPath();
    ctx.rect(50, 50, 200, 200);
    ctx.clip();
    
    // Draw larger shadowed rectangle
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(30, 30, 240, 240);
    
    // Draw main rectangle (clipped)
    ctx.fillStyle = 'white';
    ctx.fillRect(50, 50, 200, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This technique creates an inner shadow by first setting a clipping region.
We then draw a larger shadowed rectangle that gets clipped by the region.

Finally, we draw the main rectangle which covers most of the shadow, leaving
only the edges visible. This creates the illusion of an inner shadow.

## Complex Shadow Effects

This example combines multiple shadows to create a sophisticated effect.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Shadows&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#1e5799');
    gradient.addColorStop(1, '#7db9e8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    
    // First shadow layer
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(200, 150, 80, 0, Math.PI * 2);
    ctx.fill();
    
    // Second shadow layer
    ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = -5;
    ctx.shadowOffsetY = -5;
    ctx.fillStyle = '#4ecdc4';
    ctx.beginPath();
    ctx.arc(300, 250, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Third element with no shadow
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#ffe66d';
    ctx.beginPath();
    ctx.arc(100, 250, 50, 0, Math.PI * 2);
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This advanced example combines multiple shadow effects with a gradient
background. The first circle has a dark shadow, the second has a light
shadow, and the third has no shadow.

By layering different shadow effects, we create depth and visual interest.
Notice how we reset shadowColor to transparent to remove shadows when needed.

## Source

[MDN Canvas shadowColor Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor)

In this article, we have explored various techniques for creating shadows
on HTML canvas. From basic drop shadows to complex layered effects, shadows
add depth and realism to your canvas graphics.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).