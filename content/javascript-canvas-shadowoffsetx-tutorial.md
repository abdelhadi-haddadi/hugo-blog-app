+++
title = "JavaScript Canvas shadowOffsetX Tutorial"
date = 2025-08-27T23:22:02.472+01:00
draft = false
description = "Learn how to use JavaScript Canvas shadowOffsetX property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas shadowOffsetX Tutorial

last modified April 3, 2025

In this article, we explore the Canvas shadowOffsetX property in JavaScript.
This property controls the horizontal offset of shadows in HTML canvas.
Mastering shadow effects is crucial for creating depth and realism in graphics.

## Basic Definition

The shadowOffsetX property specifies the horizontal distance of a shadow from
the shape. Positive values move the shadow right, negative values move it left.
It works with shadowColor, shadowBlur, and shadowOffsetY to create shadows.

The default value is 0 (no horizontal offset). The property affects all
subsequent shadowed shapes until changed. It's measured in pixels and can
be fractional for precise positioning.

## Basic shadowOffsetX Usage

This example demonstrates how to create a simple shadow with horizontal offset.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic shadowOffsetX&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 15;
    
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D context.
We set shadow properties including shadowOffsetX to 15 pixels.

The shadow appears 15px to the right of the blue rectangle. The shadowColor
uses rgba for transparency, and shadowBlur softens the shadow edges.

## Negative shadowOffsetX

This example shows how negative values create shadows to the left of shapes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Negative shadowOffsetX&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.shadowColor = 'rgba(255, 0, 0, 0.7)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = -20;
    
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, Math.PI * 2);
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a yellow circle with a red shadow offset 20px to the left.
Negative shadowOffsetX values move shadows in the opposite direction.

The shadow has 70% opacity and a slight blur. This demonstrates how to create
shadow effects that appear to come from a light source on the right.

## Combining shadowOffsetX and shadowOffsetY

This example shows how to create diagonal shadows using both offset properties.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Combined Shadow Offsets&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    
    ctx.fillStyle = 'green';
    ctx.fillRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a green rectangle with a shadow offset both horizontally and
vertically by 10px each. The combined offsets produce a diagonal shadow.

The shadow appears to come from a light source in the top-left corner.
The blur effect makes the shadow appear more natural and realistic.

## Dynamic shadowOffsetX Animation

This example animates the shadowOffsetX property to create a moving shadow effect.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animated shadowOffsetX&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let offset = 0;
    let direction = 1;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.shadowColor = 'rgba(100, 100, 255, 0.8)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = offset;
        
        ctx.fillStyle = 'purple';
        ctx.fillRect(150, 50, 100, 100);
        
        offset += direction;
        if (offset &gt; 30 || offset &lt; -30) direction *= -1;
        
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This animation shows a purple square with a blue shadow that moves back and forth.
The shadowOffsetX value changes continuously between -30 and 30 pixels.

The animation loop clears and redraws the canvas each frame. The direction
reverses when the offset reaches its limits, creating a ping-pong effect.

## Text with shadowOffsetX

This example demonstrates shadowOffsetX applied to text for stylish typography.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Text Shadow with shadowOffsetX&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // First text with right shadow
    ctx.shadowColor = 'rgba(200, 0, 0, 0.7)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 3;
    
    ctx.font = '40px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Hello Canvas', 50, 100);
    
    // Second text with left shadow
    ctx.shadowColor = 'rgba(0, 0, 200, 0.7)';
    ctx.shadowOffsetX = -8;
    
    ctx.fillText('Shadow Effect', 50, 150);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates two text lines with different shadow directions. The first text has
a red shadow offset to the right, while the second has a blue left shadow.

The example shows how shadowOffsetX can create various text effects. Changing
the offset direction dramatically alters the visual appearance of the text.

## Source

[MDN Canvas shadowOffsetX Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX)

In this article, we have explored the shadowOffsetX property for creating
horizontal shadow effects on HTML canvas. These techniques are essential for
adding depth and visual interest to your canvas graphics and text.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).