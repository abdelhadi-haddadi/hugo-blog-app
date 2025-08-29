+++
title = "JavaScript Canvas drawImage Tutorial"
date = 2025-08-27T23:21:49.712+01:00
draft = false
description = "Learn how to use JavaScript Canvas drawImage
methods effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas drawImage Tutorial

last modified April 3, 2025

In this article, we explore the Canvas drawImage method in JavaScript. This
method is essential for drawing images onto HTML canvas elements. Mastering
drawImage is crucial for creating rich graphics and visualizations.

## Basic Definition

The drawImage method allows you to draw images, videos, or other canvas
elements onto a canvas. It provides several overloads for different use cases.
You can draw the entire image or just parts of it.

The method can scale, crop, and position images on the canvas. It works with
HTMLImageElement, HTMLVideoElement, HTMLCanvasElement, and ImageBitmap.

## Basic Image Drawing

This example demonstrates how to draw a simple image on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas drawImage&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.src = 'image.jpg';
    
    img.onload = function() {
        ctx.drawImage(img, 50, 50);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D rendering
context. We create an Image object and set its source to 'image.jpg'.

The drawImage method draws the image at position (50,50) when
it loads. This shows the simplest way to draw an image on canvas.

## Scaling an Image

This example shows how to scale an image while drawing it.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scaling Image&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.src = 'image.jpg';
    
    img.onload = function() {
        // Draw image scaled to 200x150
        ctx.drawImage(img, 50, 50, 200, 150);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use the extended version of drawImage that includes width and height
parameters. The image will be scaled to fit these dimensions.

The original image is drawn at (50,50) but resized to 200px wide and 150px
tall. This demonstrates basic image scaling on canvas.

## Cropping and Drawing Part of an Image

This example demonstrates how to crop and draw a portion of an image.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Cropping Image&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.src = 'image.jpg';
    
    img.onload = function() {
        // Draw a 100x100 portion of the image starting at (20,20)
        // Then scale it to 200x200 on canvas at (50,50)
        ctx.drawImage(img, 20, 20, 100, 100, 50, 50, 200, 200);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example uses the most complex version of drawImage with nine parameters.
It crops a portion of the source image and draws it scaled on canvas.

The first four parameters after the image specify the source rectangle (crop).
The last four parameters specify the destination rectangle (position and size).

## Drawing Video Frames

This example shows how to draw video frames onto canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Video to Canvas&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;video id="myVideo" width="320" height="240" controls&gt;
    &lt;source src="movie.mp4" type="video/mp4"&gt;
&lt;/video&gt;
&lt;canvas id="myCanvas" width="320" height="240"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const video = document.getElementById('myVideo');
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    video.addEventListener('play', function() {
        function drawFrame() {
            if (video.paused || video.ended) return;
            
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame);
        }
        drawFrame();
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example captures video frames and draws them onto canvas in real-time.
We add an event listener for the play event to start the drawing process.

The drawFrame function uses drawImage to copy the current video
frame to canvas. It continues drawing frames using requestAnimationFrame.

## Creating a Sprite Sheet Animation

This example demonstrates creating an animation from a sprite sheet.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Sprite Animation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="200" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const spriteSheet = new Image();
    spriteSheet.src = 'sprites.png';
    
    let frame = 0;
    const frameWidth = 50;
    const frameHeight = 50;
    const totalFrames = 8;
    
    spriteSheet.onload = function() {
        setInterval(animate, 100);
    };
    
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate current frame position
        const sx = (frame % 4) * frameWidth;
        const sy = Math.floor(frame / 4) * frameHeight;
        
        // Draw current frame
        ctx.drawImage(
            spriteSheet,
            sx, sy, frameWidth, frameHeight,
            75, 75, frameWidth, frameHeight
        );
        
        // Advance to next frame
        frame = (frame + 1) % totalFrames;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates an animation by cycling through frames of a sprite sheet.
The sprite sheet is assumed to be a grid of 4 columns and 2 rows of frames.

The animate function calculates the source position of each frame
and draws it centered on canvas. The animation loops every 100ms.

## Source

[MDN Canvas drawImage Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

In this article, we have explored various techniques for drawing images on
HTML canvas. Mastering the drawImage method is essential for creating rich
graphics and animations in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).