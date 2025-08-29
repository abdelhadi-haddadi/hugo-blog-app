+++
title = "JavaScript Canvas clearRect Tutorial"
date = 2025-08-29T19:49:31.716+01:00
draft = false
description = "Learn how to use JavaScript Canvas clearRect method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas clearRect Tutorial

last modified April 3, 2025

In this article, we explore the Canvas clearRect method in JavaScript. This
method is essential for clearing specific rectangular areas of an HTML canvas.
Mastering clearRect is crucial for animations and dynamic graphics.

## Basic Definition

The clearRect method clears the pixels in a specified rectangular area to
transparent black (rgba(0,0,0,0)). It's often used to erase parts of the
canvas or prepare areas for new drawings.

The method takes four parameters: x and y coordinates of the top-left corner,
and width and height of the rectangle. It affects only the specified area,
leaving other canvas content unchanged.

## Basic clearRect Usage

This example demonstrates how to clear a rectangular area from a filled canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic clearRect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Fill entire canvas with blue
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clear a rectangle in the middle
    ctx.clearRect(100, 50, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we first fill the entire canvas with blue color using
fillRect. Then we use clearRect to create a transparent rectangle in the middle.

The clearRect parameters (100,50,100,100) mean: start at x=100, y=50 and clear
a 100px wide and 100px tall area. This shows the simplest clearRect usage.

## Partial Canvas Clearing

This example shows how to clear multiple areas while preserving other content.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Partial Clearing&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw a complex pattern
    ctx.fillStyle = 'green';
    for (let i = 0; i &lt; canvas.width; i += 20) {
        for (let j = 0; j &lt; canvas.height; j += 20) {
            ctx.fillRect(i, j, 10, 10);
        }
    }
    
    // Clear specific areas
    ctx.clearRect(50, 50, 100, 50);
    ctx.clearRect(250, 100, 100, 100);
    ctx.clearRect(150, 200, 200, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we first create a grid pattern by drawing small green squares across the
canvas. Then we clear three rectangular areas at different positions.

Each clearRect call removes content from its specified area, creating "holes"
in the pattern. This demonstrates selective clearing while preserving other
canvas content.

## Animation with clearRect

This example shows how clearRect enables smooth animations by clearing frames.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animation with clearRect&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    let x = 0;
    const ballRadius = 20;
    
    function animate() {
        // Clear only the area needed for animation
        ctx.clearRect(x - ballRadius - 1, 0, 
                     ballRadius * 2 + 2, canvas.height);
        
        // Draw new ball position
        ctx.beginPath();
        ctx.arc(x, 100, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        
        x += 2;
        if (x &gt; canvas.width + ballRadius) x = -ballRadius;
        
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This animation moves a red ball across the canvas. Instead of clearing the
entire canvas each frame, we only clear the area around the ball's last position.

The clearRect parameters account for the ball's radius plus 1px padding. This
optimized clearing reduces flickering and improves performance compared to
full canvas clears.

## Interactive Clearing

This example demonstrates interactive clearing with mouse movements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Interactive Clearing&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Fill canvas with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'purple');
    gradient.addColorStop(1, 'orange');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clear on mouse move
    canvas.addEventListener('mousemove', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.clearRect(x - 25, y - 25, 50, 50);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a canvas with a vertical gradient. As the mouse moves, it clears
50x50 pixel squares centered at the cursor position, revealing transparency.

The mousemove event calculates canvas-relative coordinates. clearRect then
creates a clearing effect that follows the mouse, demonstrating interactive
usage.

## Advanced: Clearing with Composite Operations

This example combines clearRect with globalCompositeOperation for effects.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Composite Clearing&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw background image (simulated)
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'brown';
    for (let i = 0; i &lt; 100; i++) {
        ctx.fillRect(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            5, 5
        );
    }
    
    // Set composite mode
    ctx.globalCompositeOperation = 'destination-out';
    
    // Clear with shapes instead of rectangles
    function clearCircle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Interactive clearing
    canvas.addEventListener('mousemove', (e) =&gt; {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        clearCircle(x, y, 30);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This advanced example uses globalCompositeOperation to create non-rectangular
clearing effects. We set the mode to 'destination-out' which makes any new
drawing clear existing content.

Instead of clearRect, we use fill with arc to create circular cleared areas.
The mouse movement clears content in circles rather than rectangles, showing
creative clearing techniques.

## Source

[MDN Canvas clearRect Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect)

In this article, we have explored various techniques for using clearRect to
manage canvas content. From basic clearing to advanced animations and effects,
clearRect is a powerful tool for canvas manipulation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).