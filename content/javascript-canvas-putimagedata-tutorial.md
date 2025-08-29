+++
title = "JavaScript Canvas putImageData Tutorial"
date = 2025-08-29T19:49:41.704+01:00
draft = false
description = "Learn how to use JavaScript Canvas putImageData method effectively with examples and detailed explanations. Master pixel-level canvas manipulation with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas putImageData Tutorial

last modified April 3, 2025

In this article, we explore the Canvas putImageData method in JavaScript. This
method is essential for direct pixel manipulation on HTML canvas. Mastering
putImageData is crucial for image processing and special effects.

## Basic Definition

putImageData is a Canvas API method that writes pixel data to a canvas. It
works with ImageData objects containing pixel color values. This allows direct
low-level manipulation of canvas pixels.

The method takes an ImageData object and draws it at specified coordinates.
It can optionally take a dirty rectangle to copy only part of the image data.
This is powerful for performance optimization.

## Basic putImageData Usage

This example demonstrates how to create and draw a simple ImageData object.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic putImageData&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create blank ImageData
    const imageData = ctx.createImageData(100, 100);
    const data = imageData.data;
    
    // Fill with red pixels
    for (let i = 0; i &lt; data.length; i += 4) {
        data[i] = 255;     // R
        data[i + 1] = 0;   // G
        data[i + 2] = 0;    // B
        data[i + 3] = 255;  // A
    }
    
    ctx.putImageData(imageData, 50, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a 100x100 pixel ImageData object. We then
fill it with solid red pixels by setting RGBA values in the data array.

The putImageData method draws this pixel data at position (50,50).
This demonstrates the simplest way to create and draw pixel data on canvas.

## Copying Canvas Data

This example shows how to copy part of the canvas and manipulate it.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Copy Canvas Data&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw original content
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 100);
    
    // Get image data
    const imageData = ctx.getImageData(50, 50, 100, 100);
    const data = imageData.data;
    
    // Invert colors
    for (let i = 0; i &lt; data.length; i += 4) {
        data[i] = 255 - data[i];     // R
        data[i + 1] = 255 - data[i + 1]; // G
        data[i + 2] = 255 - data[i + 2]; // B
    }
    
    // Draw modified data
    ctx.putImageData(imageData, 150, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we first draw a blue rectangle. We then copy its pixel data using
getImageData. We modify the data by inverting the colors.

The modified data is drawn back to the canvas at a new position using
putImageData. This shows how to process existing canvas content.

## Partial Image Update

This example demonstrates updating only part of the canvas with putImageData.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Partial Update&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create full canvas image data
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    // Fill with gradient
    for (let y = 0; y &lt; canvas.height; y++) {
        for (let x = 0; x &lt; canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            data[i] = x % 255;     // R
            data[i + 1] = y % 255;  // G
            data[i + 2] = 128;      // B
            data[i + 3] = 255;      // A
        }
    }
    
    // Draw only a portion (dirty rectangle)
    ctx.putImageData(imageData, 0, 0, 50, 50, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a full-canvas gradient but only draws a 100x100 portion.
The last four parameters define the dirty rectangle (source x, y, width, height).

This technique is useful for performance when you only need to update part of
the canvas. The rest of the pixel data is ignored during drawing.

## Image Processing Filter

This example shows how to create a simple grayscale filter using putImageData.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Grayscale Filter&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;img id="source" src="image.jpg" style="display:none"&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('source');
    
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Convert to grayscale
        for (let i = 0; i &lt; data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;     // R
            data[i + 1] = avg; // G
            data[i + 2] = avg; // B
        }
        
        ctx.putImageData(imageData, 0, 0);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example loads an image, draws it to canvas, then converts it to grayscale.
The grayscale conversion averages the RGB values of each pixel.

After processing, we use putImageData to draw the modified pixels
back to canvas. This demonstrates practical image processing with putImageData.

## Pixel Animation Effect

This example creates an animated pixel effect using putImageData.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pixel Animation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Initial drawing
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let offset = 0;
    
    function animate() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Shift pixels horizontally
        for (let y = 0; y &lt; canvas.height; y++) {
            for (let x = 0; x &lt; canvas.width; x++) {
                const i = (y * canvas.width + x) * 4;
                const ni = (y * canvas.width + ((x + offset) % canvas.width)) * 4;
                data[i] = imageData.data[ni];     // R
                data[i + 1] = imageData.data[ni + 1]; // G
                data[i + 2] = imageData.data[ni + 2]; // B
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        offset++;
        requestAnimationFrame(animate);
    }
    
    animate();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a horizontal pixel shifting animation. Each frame, pixels
are shifted right by one position, creating a scrolling effect.

The animation loop uses getImageData and putImageData
to continuously update the canvas. This shows how putImageData can be used for
real-time effects.

## Source

[MDN putImageData Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData)

In this article, we have explored various techniques for using putImageData to
manipulate canvas pixels. Mastering this method is essential for advanced
graphics and image processing in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).