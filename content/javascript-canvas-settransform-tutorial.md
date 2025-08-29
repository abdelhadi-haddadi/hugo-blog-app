+++
title = "JavaScript Canvas setTransform Tutorial"
date = 2025-08-27T23:22:01.126+01:00
draft = false
description = "Learn how to use JavaScript Canvas setTransform
method effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas setTransform Tutorial

last modified April 3, 2025

This tutorial explores the Canvas setTransform method in JavaScript. It allows
you to set the current transformation matrix directly, enabling complex
transformations. Mastering setTransform is crucial for advanced canvas graphics.

## Basic Definition

The setTransform method replaces the current transformation matrix with a new
one. It takes six parameters representing a 2D transformation matrix.

The matrix transforms points from the coordinate space into the current
coordinate space. Parameters are: scaleX, skewY, skewX, scaleY, translateX,
and translateY. This provides precise control over transformations.

## Basic setTransform Usage

This example demonstrates how to use setTransform for simple translation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic setTransform&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw original rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(20, 20, 50, 50);
    
    // Apply transformation
    ctx.setTransform(1, 0, 0, 1, 100, 50);
    ctx.fillStyle = 'blue';
    ctx.fillRect(20, 20, 50, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code first draws a red rectangle at (20,20). Then it uses setTransform
to move the coordinate system 100px right and 50px down.

The blue rectangle is drawn at the same coordinates (20,20) but appears
translated. The matrix (1,0,0,1) maintains original scaling without skewing.

## Scaling with setTransform

This example shows how to apply scaling transformations using setTransform.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scaling with setTransform&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original circle
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    
    // Scaled circle
    ctx.setTransform(2, 0, 0, 1.5, 0, 0);
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'purple';
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we draw two circles - one before and one after applying setTransform.
The first circle is drawn normally, while the second is scaled horizontally
by 2x and vertically by 1.5x.

The setTransform parameters (2,0,0,1.5,0,0) specify the scaling factors
without any translation or skewing. The circle appears stretched because
of different x and y scale factors.

## Skewing with setTransform

This example demonstrates how to create skew effects using setTransform.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Skewing with setTransform&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original square
    ctx.fillStyle = 'orange';
    ctx.fillRect(50, 50, 100, 100);
    
    // Skewed square
    ctx.setTransform(1, 0.5, 0.5, 1, 200, 0);
    ctx.fillStyle = 'teal';
    ctx.fillRect(50, 50, 100, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code first draws a normal orange square. Then it applies a skew
transformation using setTransform with non-zero skew parameters.

The parameters (1,0.5,0.5,1) create both horizontal and vertical skewing.
The square appears distorted diagonally while maintaining its area. The
translation (200,0) moves it right for better visibility.

## Combined Transformations

This example shows how to combine multiple transformations in one setTransform.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Combined Transformations&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original triangle
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 150);
    ctx.lineTo(0, 150);
    ctx.closePath();
    ctx.fillStyle = 'navy';
    ctx.fill();
    
    // Combined transformation
    ctx.setTransform(1.5, 0.3, 0.2, 0.8, 200, 100);
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 150);
    ctx.lineTo(0, 150);
    ctx.closePath();
    ctx.fillStyle = 'crimson';
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example combines scaling, skewing, and translation in a single
setTransform call. The original navy triangle is transformed into a
distorted crimson version.

The parameters (1.5,0.3,0.2,0.8) create non-uniform scaling and skewing.
The translation (200,100) moves the transformed shape to a new position.
This demonstrates setTransform's power to apply complex transformations.

## Resetting Transformations

This example shows how to reset the transformation matrix to identity.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Resetting Transformations&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Apply complex transformation
    ctx.setTransform(1.2, 0.4, 0.1, 0.9, 50, 30);
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 80);
    
    // Reset to identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = 'green';
    ctx.fillRect(200, 50, 100, 80);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

First, we apply a complex transformation and draw a blue rectangle. Then we
reset the transformation matrix using setTransform(1,0,0,1,0,0).

The green rectangle is drawn without any transformations, appearing exactly
as specified. This is useful when you need to return to normal coordinates
after applying transformations.

## Source

[MDN Canvas setTransform Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform)

This tutorial covered the powerful setTransform method for canvas
transformations. With these techniques, you can create complex graphical
effects and precisely control your canvas coordinate system.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).