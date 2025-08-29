+++
title = "JavaScript Canvas shadowOffsetY Tutorial"
date = 2025-08-29T19:49:47.236+01:00
draft = false
description = "Learn how to use JavaScript Canvas shadowOffsetY property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas shadowOffsetY Tutorial

last modified April 3, 2025

In this article, we explore the Canvas shadowOffsetY property in JavaScript.
This property controls the vertical offset of shadows in HTML canvas drawings.
Mastering shadows enhances depth and realism in your graphics.

## Basic Definition

The shadowOffsetY property specifies the vertical distance of a shadow from
the shape. Positive values move the shadow down, negative values move it up.
It works with shadowColor, shadowBlur, and shadowOffsetX for full control.

Shadow properties must be set before drawing the shape. The shadowOffsetY
default is 0 (no vertical offset). Combined with other shadow properties,
it creates realistic lighting effects.

## Basic shadowOffsetY Usage

This example demonstrates how to create a simple shadow with vertical offset.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic shadowOffsetY&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 15;
    
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 200, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a blue rectangle with a semi-transparent black shadow.
The shadow appears 15 pixels below the rectangle due to shadowOffsetY.

The shadowColor uses rgba for transparency. shadowBlur softens the edges.
The shadow only appears below the shape because we only set vertical offset.

## Negative shadowOffsetY

This example shows how negative values create shadows above objects.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Negative shadowOffsetY&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.shadowColor = 'rgba(255, 0, 0, 0.7)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = -10;
    
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, Math.PI * 2);
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a yellow circle with a red shadow appearing above it.
The negative shadowOffsetY (-10) moves the shadow upward.

The semi-transparent red shadow (rgba) creates a glowing effect above
the circle. This technique can simulate light coming from below.

## Combined shadowOffsetX and shadowOffsetY

This example demonstrates using both X and Y offsets for diagonal shadows.

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

This creates a green rectangle with a shadow offset diagonally down-right.
The combination of X and Y offsets (both 10) positions the shadow at 45°.

The shadowBlur of 15 creates a soft, diffused shadow effect. The rgba
alpha value (0.6) makes the shadow partially transparent.

## Animated shadowOffsetY

This example shows how to animate the shadowOffsetY property for dynamic effects.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animated shadowOffsetY&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let offset = 0;
    let direction = 1;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.shadowColor = 'rgba(0, 0, 200, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = offset;
        
        ctx.fillStyle = 'orange';
        ctx.fillRect(100, 50, 100, 100);
        
        offset += direction;
        if (offset &gt; 20 || offset &lt; 0) direction *= -1;
        
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This animation makes the shadow move up and down continuously. The offset
variable changes between 0 and 20, reversing direction at the limits.

The requestAnimationFrame method creates smooth animation. The shadow
appears to bounce under the orange square, creating a floating effect.

## Text with shadowOffsetY

This example applies shadowOffsetY to text for stylish typography effects.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Text with shadowOffsetY&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Large text with subtle shadow
    ctx.shadowColor = 'rgba(100, 100, 100, 0.7)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY = 3;
    
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Hello World', 50, 100);
    
    // Small text with strong shadow
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 2;
    
    ctx.font = '20px Arial';
    ctx.fillStyle = 'pink';
    ctx.fillText('shadowOffsetY example', 50, 150);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This demonstrates two text styles with different shadow effects. The large
text has a soft, subtle shadow while the small text has a sharp shadow.

Notice how shadowBlur affects the softness. The first shadow uses rgba
for transparency while the second uses solid black for crisp edges.

## Source

[MDN Canvas shadowOffsetY Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY)

In this article, we explored the shadowOffsetY property for creating vertical
shadow effects in Canvas. These techniques add depth and dimension to your
graphics and text elements in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).