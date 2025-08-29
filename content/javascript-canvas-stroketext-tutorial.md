+++
title = "JavaScript Canvas strokeText Tutorial"
date = 2025-08-27T23:22:05.229+01:00
draft = false
description = "Learn how to use JavaScript Canvas stroke methods effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas strokeText Tutorial

last modified April 3, 2025

In this article, we explore the Canvas strokeText method in JavaScript. This
method is essential for drawing outlined text on HTML canvas. Mastering text
stroking is crucial for creating visually appealing text effects.

## Basic Definition

Canvas strokeText refers to drawing the outline of text characters without
filling them. Unlike fillText which creates solid text, strokeText draws only
the character boundaries. The stroke style and width can be customized.

The strokeText method takes parameters: text string, x and y coordinates.
Optional maxWidth parameter can limit text width. It works with font,
strokeStyle, and lineWidth properties for customization.

## Basic strokeText Usage

This example demonstrates how to draw simple stroked text on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas strokeText&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.font = '48px Arial';
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeText('Hello World', 50, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D context.
We set the font to 48px Arial and stroke color to blue with 2px width.

The strokeText method draws "Hello World" at position (50,100).
This demonstrates the simplest way to create stroked text on canvas.

## Thick Stroked Text

This example shows how to create text with a thicker outline.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Thick Stroked Text&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.font = 'bold 60px Impact';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.strokeText('Canvas Text', 30, 120);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use a bold Impact font at 60px size. The stroke is set to red with
5px width, creating a prominent outline effect.

The thicker line width makes the text more visible and creates a bolder
appearance. This technique is useful for headings and titles.

## Combined strokeText and fillText

This example demonstrates using both stroke and fill for text effects.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Combined Stroke and Fill&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.font = 'italic 72px Georgia';
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    
    ctx.fillText('Dual Effect', 40, 120);
    ctx.strokeText('Dual Effect', 40, 120);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates text with both fill and stroke. First we fill with yellow,
then stroke with black, creating a bordered text effect.

The order matters - fill first then stroke ensures the outline is visible
around the edges. This is a common technique for readable text on busy backgrounds.

## Gradient Stroked Text

This example shows how to apply a gradient to stroked text.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient Stroked Text&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 500, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'purple');
    gradient.addColorStop(1, 'blue');
    
    ctx.font = 'bold 64px Arial';
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.strokeText('Rainbow Text', 30, 120);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a horizontal gradient from red to purple to blue. This gradient
is applied as the stroke style for our text.

The createLinearGradient defines the gradient direction matching
the canvas width. The gradient strokes create a colorful text outline effect.

## Advanced Text Effects with Shadows

This example combines strokeText with shadow effects for depth.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Stroked Text with Shadow&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="250"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Shadow settings
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Text settings
    ctx.font = 'bold 72px Arial';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    
    // Draw text
    ctx.strokeText('Shadow Effect', 40, 150);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    
    // Add inner glow with fill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillText('Shadow Effect', 40, 150);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a stroked text with shadow and inner glow effects.
First we set shadow properties, then draw the stroked text.

After resetting the shadow, we add a semi-transparent fill to create an
inner glow effect. This combination produces a sophisticated 3D-like text.

## Source

[MDN Canvas strokeText Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText)

In this article, we have explored various techniques for stroking text on
HTML canvas. Mastering these methods is essential for creating professional
text effects in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).