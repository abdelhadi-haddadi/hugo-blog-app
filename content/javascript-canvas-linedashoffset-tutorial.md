+++
title = "JavaScript Canvas lineDashOffset Tutorial"
date = 2025-08-27T23:21:55.008+01:00
draft = false
description = "Learn how to use JavaScript Canvas lineDashOffset property effectively with examples and detailed explanations. Create animated dashed lines with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas lineDashOffset Tutorial

last modified April 3, 2025

In this article, we explore the Canvas lineDashOffset property in JavaScript.
This property allows creating animated dashed lines and controlling dash
patterns. Mastering lineDashOffset is crucial for creating dynamic visuals.

## Basic Definition

The lineDashOffset property specifies where to start the dash pattern on a line.
It accepts a float value representing the offset distance in pixels. Positive
values move the pattern forward, negative values move it backward.

When combined with setLineDash, lineDashOffset enables animation effects by
changing the offset over time. This creates the illusion of movement in dashed
lines and borders. The property works with all stroke operations.

## Basic lineDashOffset Usage

This example demonstrates how to create a simple dashed line with an offset.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic lineDashOffset&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.setLineDash([10, 5]);
    ctx.lineDashOffset = 5;
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(250, 100);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D context.
We set a dash pattern of 10px dashes with 5px gaps using setLineDash.

The lineDashOffset of 5px shifts the pattern halfway through the first dash.
This demonstrates how offset affects where the dash pattern begins on the line.

## Animated Dashed Line

This example shows how to animate a dashed line using lineDashOffset.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animated Dashed Line&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let offset = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.setLineDash([15, 5]);
        ctx.lineDashOffset = -offset;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        
        ctx.beginPath();
        ctx.moveTo(50, 100);
        ctx.lineTo(250, 100);
        ctx.stroke();
        
        offset++;
        if (offset &gt; 20) offset = 0;
        
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates an animation where the dashed line appears to move.
We use requestAnimationFrame to create a smooth animation loop.

The offset variable increments each frame, and we apply it negatively to
lineDashOffset. When offset exceeds 20, it resets to 0, creating a seamless
loop. The line appears to scroll to the right continuously.

## Dashed Circle Animation

This example demonstrates animating a dashed circle using lineDashOffset.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dashed Circle Animation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let offset = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.setLineDash([10, 5]);
        ctx.lineDashOffset = offset;
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 5;
        
        ctx.beginPath();
        ctx.arc(150, 150, 100, 0, Math.PI * 2);
        ctx.stroke();
        
        offset += 0.5;
        if (offset &gt; 15) offset = 0;
        
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we animate a dashed circle to create a loading spinner effect.
The lineDashOffset is incremented slowly (0.5 per frame) for smooth motion.

The circle appears to rotate as the dash pattern moves around its circumference.
This technique is commonly used for loading indicators and progress animations.

## Multiple Animated Lines

This example shows multiple lines with different dash patterns and offsets.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Animated Lines&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let offset1 = 0;
    let offset2 = 0;
    let offset3 = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // First line
        ctx.setLineDash([20, 10]);
        ctx.lineDashOffset = offset1;
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(350, 50);
        ctx.stroke();
        
        // Second line
        ctx.setLineDash([10, 5, 5, 5]);
        ctx.lineDashOffset = offset2;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(50, 150);
        ctx.lineTo(350, 150);
        ctx.stroke();
        
        // Third line
        ctx.setLineDash([5, 3]);
        ctx.lineDashOffset = offset3;
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, 250);
        ctx.lineTo(350, 250);
        ctx.stroke();
        
        offset1 += 1;
        offset2 += 2;
        offset3 += 3;
        
        if (offset1 &gt; 30) offset1 = 0;
        if (offset2 &gt; 20) offset2 = 0;
        if (offset3 &gt; 8) offset3 = 0;
        
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates three horizontal lines with different dash patterns.
Each line has its own offset variable that increments at different rates.

The first line uses a simple dash pattern, the second a more complex one,
and the third a very short pattern. The different animation speeds create
an interesting visual effect.

## Interactive lineDashOffset

This example demonstrates interactive control of lineDashOffset with mouse.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Interactive lineDashOffset&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;
&lt;p&gt;Move mouse horizontally to change dash offset&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.addEventListener('mousemove', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const offset = x / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.setLineDash([15, 10, 5, 10]);
        ctx.lineDashOffset = offset;
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 4;
        
        ctx.beginPath();
        ctx.moveTo(50, 150);
        ctx.lineTo(350, 150);
        ctx.stroke();
        
        // Display current offset
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(`Offset: ${offset.toFixed(1)}`, 50, 50);
    });
    
    // Initial draw
    ctx.setLineDash([15, 10, 5, 10]);
    ctx.lineDashOffset = 0;
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(350, 150);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example makes the lineDashOffset interactive by tying it to mouse position.
Moving the mouse horizontally changes the offset value in real-time.

The current offset value is displayed as text. This demonstrates how
lineDashOffset can be used for interactive graphics and visual feedback.

## Source

[MDN lineDashOffset Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)

In this article, we have explored various techniques for using lineDashOffset
to create animated and interactive dashed lines. This powerful property opens
up many possibilities for dynamic canvas graphics.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).