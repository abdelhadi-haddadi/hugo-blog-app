+++
title = "JavaScript Canvas fillText Tutorial"
date = 2025-08-27T23:21:50.835+01:00
draft = false
description = "Learn how to use JavaScript Canvas fillText methods effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas fillText Tutorial

last modified April 3, 2025

In this article, we explore the Canvas fillText method in JavaScript. This
method is essential for drawing text on HTML canvas elements. Mastering
text rendering is crucial for creating rich graphical interfaces.

## Basic Definition

Canvas fillText is a method that draws filled text on the canvas. Unlike
strokeText which outlines text, fillText creates solid text. The appearance
can be customized with font, color, and alignment properties.

The main text methods are fillText and strokeText.
These work with font properties like font, textAlign,
and textBaseline to control text rendering.

## Basic fillText Usage

This example demonstrates how to draw simple text on canvas using fillText.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Canvas fillText&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.font = '30px Arial';
    ctx.fillStyle = 'blue';
    ctx.fillText('Hello Canvas', 50, 50);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D rendering
context. We set the font to 30px Arial and fill color to blue.

The fillText method draws the text "Hello Canvas" at position
(50,50). This demonstrates the simplest way to render text on canvas.

## Text with Custom Font and Color

This example shows how to customize font properties and text color.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Font Text&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // First text with serif font
    ctx.font = 'italic bold 36px Georgia';
    ctx.fillStyle = 'red';
    ctx.fillText('Styled Text', 50, 80);
    
    // Second text with sans-serif font
    ctx.font = '20px Verdana';
    ctx.fillStyle = 'green';
    ctx.fillText('Different Style', 50, 150);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we demonstrate two different text styles on the same canvas. The first
text uses Georgia font with italic and bold styles at 36px size.

The second text uses Verdana at 20px with green color. This shows how to
render multiple text elements with different styles on one canvas.

## Text Alignment and Baseline

This example demonstrates text alignment and baseline properties.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Text Alignment&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw reference line
    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 300);
    ctx.stroke();
    
    // Center-aligned text
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Top Aligned', 200, 50);
    
    // Right-aligned text
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('Middle Baseline', 200, 150);
    
    // Left-aligned text
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Bottom Baseline', 200, 250);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how textAlign and textBaseline properties affect text
positioning. A vertical reference line helps visualize the alignment points.

The first text is center-aligned with top baseline. The second is right-aligned
with middle baseline. The third is left-aligned with bottom baseline.

## Text with Shadow Effects

This example shows how to add shadow effects to canvas text.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Text Shadow&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Shadow settings
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Text with shadow
    ctx.font = '40px Impact';
    ctx.fillStyle = 'red';
    ctx.fillText('Shadow Effect', 50, 100);
    
    // Text without shadow
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = 'blue';
    ctx.fillText('No Shadow', 50, 150);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create text with a drop shadow effect using shadow properties.
The shadowColor, shadowBlur, and shadowOffset properties control the effect.

The first text has a semi-transparent black shadow with blur and offset.
The second text demonstrates how to disable shadows by setting transparent color.

## Text with Gradient Fill

This example shows how to fill text with a gradient instead of solid color.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Gradient Text&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'blue');
    
    // Apply gradient to text
    ctx.font = 'bold 50px Arial';
    ctx.fillStyle = gradient;
    ctx.fillText('Gradient Text', 20, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a horizontal gradient that transitions from red to yellow
to blue. The gradient is applied as the fill style for the text.

The createLinearGradient defines the gradient direction.
addColorStop adds color transition points. The gradient
is then used to fill the text with a bold 50px Arial font.

## Source

[MDN Canvas fillText Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText)

In this article, we have explored various techniques for rendering text on
HTML canvas using fillText. Mastering these methods is essential for creating
rich text elements in web graphics and visualizations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).