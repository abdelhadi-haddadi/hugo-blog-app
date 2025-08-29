+++
title = "JavaScript Canvas Radial Gradient Tutorial"
date = 2025-08-27T23:21:48.295+01:00
draft = false
description = "Learn how to use JavaScript Canvas createRadialGradient
method effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Radial Gradient Tutorial

last modified April 3, 2025

In this article, we explore the Canvas createRadialGradient method in JavaScript.
This method creates color transitions radiating outward from a central point.
Radial gradients are perfect for creating lighting effects, spheres, and more.

## Basic Definition

A radial gradient is a color transition that radiates outward from a center point.
It requires two circles to define the gradient area - inner and outer circles.
The gradient transitions between color stops defined along the radius.

The createRadialGradient method takes six parameters: x0,y0,r0 for
the inner circle and x1,y1,r1 for the outer circle. Color stops are added with
addColorStop between 0 (start) and 1 (end).

## Basic Radial Gradient

This example demonstrates how to create a simple radial gradient fill.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Radial Gradient&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create radial gradient
    const gradient = ctx.createRadialGradient(150, 100, 10, 150, 100, 100);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1, 'blue');
    
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a radial gradient centered at (150,100) with inner radius 10 and
outer radius 100. The color transitions from red at center to blue at edge.

The gradient is applied to fill the entire canvas. Notice how the gradient
naturally creates a circular color transition pattern.

## Offset Center Gradient

This example shows a radial gradient with offset center and outer circle.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Offset Center Gradient&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create gradient with offset center
    const gradient = ctx.createRadialGradient(100, 100, 20, 200, 100, 100);
    gradient.addColorStop(0, 'yellow');
    gradient.addColorStop(0.5, 'orange');
    gradient.addColorStop(1, 'darkred');
    
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here the inner circle is at (100,100) with radius 20, while the outer circle
is at (200,100) with radius 100. This creates an elliptical gradient pattern.

The color stops create a three-color transition from yellow to orange to
dark red. The offset centers produce an interesting lighting effect.

## Radial Gradient for Circle

This example applies a radial gradient specifically to a circular path.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient Circle&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create gradient matching circle dimensions
    const gradient = ctx.createRadialGradient(150, 100, 0, 150, 100, 80);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.7, 'lightblue');
    gradient.addColorStop(1, 'navy');
    
    // Draw circle with gradient fill
    ctx.beginPath();
    ctx.arc(150, 100, 80, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a realistic sphere effect by matching the gradient dimensions to
the circle. The gradient goes from white at center to navy at edge.

The inner radius is 0 (point source) and outer radius matches the circle's 80px.
The 0.7 color stop creates a more natural transition between colors.

## Multiple Color Stops

This example demonstrates a radial gradient with multiple color stops.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Color Stops&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create gradient with multiple stops
    const gradient = ctx.createRadialGradient(150, 100, 10, 150, 100, 120);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.2, 'orange');
    gradient.addColorStop(0.4, 'yellow');
    gradient.addColorStop(0.6, 'green');
    gradient.addColorStop(0.8, 'blue');
    gradient.addColorStop(1, 'violet');
    
    // Fill canvas
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a rainbow effect with six distinct color stops. Each stop is
evenly spaced along the gradient's radius from center to edge.

The inner circle has 10px radius while the outer has 120px, creating a large
gradient area. The multiple stops produce clearly visible color bands.

## Radial Gradient Stroke

This example shows how to apply a radial gradient to a stroke instead of a fill.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient Stroke&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create radial gradient
    const gradient = ctx.createRadialGradient(150, 100, 0, 150, 100, 150);
    gradient.addColorStop(0, 'gold');
    gradient.addColorStop(0.5, 'orange');
    gradient.addColorStop(1, 'darkred');
    
    // Draw star with gradient stroke
    ctx.beginPath();
    ctx.moveTo(150, 20);
    ctx.lineTo(180, 80);
    ctx.lineTo(250, 90);
    ctx.lineTo(200, 130);
    ctx.lineTo(210, 200);
    ctx.lineTo(150, 170);
    ctx.lineTo(90, 200);
    ctx.lineTo(100, 130);
    ctx.lineTo(50, 90);
    ctx.lineTo(120, 80);
    ctx.closePath();
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a star shape and apply a radial gradient to its stroke.
The gradient goes from gold at center to dark red at the edges.

The thick 8px line width makes the gradient clearly visible. The gradient
center matches the star's center for a consistent lighting effect.

## Source

[MDN createRadialGradient Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient)

In this article, we have explored various techniques for creating and using
radial gradients on HTML canvas. These gradients are powerful tools for
creating realistic lighting effects, dimensional shapes, and vibrant designs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).