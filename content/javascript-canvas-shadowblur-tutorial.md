+++
title = "JavaScript Canvas shadowBlur Tutorial"
date = 2025-08-27T23:22:02.479+01:00
draft = false
description = "Learn how to use JavaScript Canvas shadowBlur property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas shadowBlur Tutorial

last modified April 3, 2025

In this article, we explore the Canvas shadowBlur property in JavaScript. This
property creates soft shadow effects around shapes and text on HTML canvas.
Mastering shadows enhances visual depth and realism in your graphics.

## Basic Definition

The shadowBlur property specifies the level of blur applied to shadows. Higher
values create more diffuse, softer shadows. It works with shadowColor,
shadowOffsetX, and shadowOffsetY to create complete shadow effects.

The shadowBlur value is a non-negative float representing the blur level in
pixels. A value of 0 means no blur (sharp shadow), while higher values increase
the blur effect. The property affects all subsequent drawing operations.

## Basic shadowBlur Usage

This example demonstrates how to create a simple shadow effect with blur.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic shadowBlur&lt;/title&gt;
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

This example creates a blue rectangle with a blurred shadow. The shadowColor
is set to semi-transparent black, shadowBlur to 10px, and shadowOffset to 5px.

The shadow appears to the bottom-right of the rectangle. The blur effect makes
the shadow appear soft and natural rather than sharp and artificial.

## Text with shadowBlur

This example shows how to apply shadowBlur to text for a dramatic effect.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Text with shadowBlur&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.shadowColor = 'rgba(200, 0, 0, 0.7)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    
    ctx.font = '48px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Hello World', 50, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create white text with a red blurred shadow. The shadowBlur of 15px
creates a dramatic glow effect around the text characters.

The semi-transparent shadowColor (rgba) allows some background to show through.
This creates a more natural shadow effect compared to opaque colors.

## Multiple Objects with Different shadowBlur

This example demonstrates varying shadowBlur values on different shapes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple shadowBlur Values&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Circle with small blur
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    
    // Rectangle with medium blur
    ctx.shadowBlur = 15;
    ctx.fillStyle = 'blue';
    ctx.fillRect(200, 50, 100, 100);
    
    // Triangle with large blur
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.moveTo(300, 200);
    ctx.lineTo(350, 100);
    ctx.lineTo(400, 200);
    ctx.closePath();
    ctx.fillStyle = 'green';
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows three shapes with increasing shadowBlur values. The circle
has 5px blur, the rectangle 15px, and the triangle 25px blur.

Notice how higher blur values create softer, more diffuse shadows. The same
shadowColor is used for all shapes to maintain consistency in the composition.

## Inner shadowBlur Effect

This example creates an inner shadow effect using clever path manipulation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Inner shadowBlur Effect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create clipping region
    ctx.beginPath();
    ctx.rect(50, 50, 200, 200);
    ctx.clip();
    
    // Draw shadow (will appear inside due to clipping)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = 'white';
    ctx.fillRect(50, 50, 200, 200);
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw border
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, 200, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This technique uses clipping to create an inner shadow effect. First we set a
clipping region matching our shape, then draw a shadow that gets clipped.

The result is a soft shadow that appears inside the rectangle rather than
outside. This is useful for creating inset or recessed UI elements.

## Animated shadowBlur

This example shows how to animate the shadowBlur property for dynamic effects.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animated shadowBlur&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let blur = 0;
    let direction = 1;
    
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update blur value
        blur += direction;
        if (blur &gt; 30 || blur &lt; 0) direction *= -1;
        
        // Draw circle with animated shadow
        ctx.shadowColor = 'rgba(0, 100, 200, 0.7)';
        ctx.shadowBlur = blur;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.beginPath();
        ctx.arc(150, 150, 50, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This animation creates a pulsating glow effect around a circle. The shadowBlur
value oscillates between 0 and 30, changing direction at the limits.

The requestAnimationFrame method creates smooth animation by syncing with the
browser's refresh rate. This technique can be used for various glowing effects.

## Source

[MDN Canvas shadowBlur Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur)

In this article, we have explored various techniques for using shadowBlur to
create realistic and artistic shadow effects on HTML canvas. These methods
greatly enhance the visual appeal of your graphics.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).