+++
title = "JavaScript Canvas Ellipse Tutorial"
date = 2025-08-27T23:21:49.708+01:00
draft = false
description = "Learn how to draw ellipses on JavaScript Canvas with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas Ellipse Tutorial

last modified April 3, 2025

In this article, we explore how to draw ellipses on HTML Canvas using JavaScript.
Ellipses are versatile shapes used in many graphical applications. Mastering
ellipse drawing expands your canvas drawing capabilities significantly.

## Basic Definition

An ellipse is a regular oval shape defined by its center point, two radii
(x and y), and rotation angle. On canvas, ellipses can be drawn using the
ellipse() method or by approximating with arcs.

The ellipse() method takes parameters for center coordinates,
x and y radii, rotation, start and end angles, and drawing direction.
This provides precise control over ellipse appearance and position.

## Basic Ellipse

This example demonstrates how to draw a simple filled ellipse on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas Ellipse&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.ellipse(150, 100, 80, 50, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a blue filled ellipse centered at (150,100) with x-radius
80 and y-radius 50. The rotation is 0 (horizontal), and we draw a complete
ellipse (0 to 2π radians).

The ellipse() method is called within a path context. After
defining the path, we set fill style and call fill() to render.

## Stroked Ellipse

This example shows how to draw an ellipse outline with custom stroke properties.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Stroked Ellipse&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.ellipse(150, 100, 100, 60, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create an ellipse outline instead of a filled shape. The stroke color
is red with 5px line width. The ellipse is centered with x-radius 100 and
y-radius 60.

Note we use stroke() instead of fill() to draw
only the outline. This demonstrates the difference between filled and
stroked shapes on canvas.

## Partial Ellipse (Arc)

This example demonstrates drawing a partial ellipse by specifying start and
end angles.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Partial Ellipse&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.ellipse(150, 100, 90, 50, 0, Math.PI/4, Math.PI * 1.5);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code draws a partial ellipse arc starting at π/4 radians (45°) and ending
at 1.5π radians (270°). The result is a three-quarter ellipse with a green
outline.

Angles in canvas are measured in radians, with 0 pointing to the right.
Positive angles go clockwise. This example shows how to create elliptical
arcs of any portion.

## Rotated Ellipse

This example shows how to draw an ellipse rotated by a specified angle.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Rotated Ellipse&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.ellipse(150, 100, 80, 40, Math.PI/4, 0, Math.PI * 2);
    ctx.fillStyle = 'purple';
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we rotate the ellipse by π/4 radians (45°). The rotation parameter is
the fifth argument in the ellipse() method. The ellipse maintains
its x and y radii but is tilted.

Rotation occurs around the center point. This example demonstrates how to
create non-axis-aligned ellipses for more complex designs.

## Ellipse with Gradient Fill

This advanced example applies a radial gradient fill to an ellipse.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient Ellipse&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createRadialGradient(150, 100, 0, 150, 100, 80);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'orange');
    
    ctx.beginPath();
    ctx.ellipse(150, 100, 100, 60, 0, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a radial gradient that starts white at the center and transitions
to orange at the edges. The gradient is perfectly aligned with the ellipse's
dimensions.

The createRadialGradient method defines the gradient's inner
and outer circles. When applied to the ellipse, it creates a 3D sphere-like
effect.

## Source

[MDN Canvas ellipse Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse)

In this article, we have explored various techniques for drawing ellipses on
HTML canvas. From basic shapes to rotated and gradient-filled ellipses, these
methods enable sophisticated graphics in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).