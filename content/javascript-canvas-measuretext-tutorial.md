+++
title = "JavaScript Canvas measureText Tutorial"
date = 2025-08-27T23:21:56.383+01:00
draft = false
description = "Learn how to use JavaScript Canvas measureText method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas measureText Tutorial

last modified April 3, 2025

In this article, we explore the Canvas measureText method in JavaScript. This
method is essential for measuring text dimensions before rendering on HTML canvas.
Mastering text measurement is crucial for precise text layout and alignment.

## Basic Definition

Canvas measureText is a method that returns a TextMetrics object containing
information about the width of the specified text. It helps in positioning
text accurately on the canvas by providing exact measurements.

The method works with the current font settings (size, family, style) to
calculate text dimensions. The returned object contains properties like
width, actualBoundingBoxLeft, and actualBoundingBoxRight.

## Basic Text Measurement

This example demonstrates how to measure text width before drawing it on canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Text Measurement&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.font = '30px Arial';
    const text = 'Hello Canvas';
    const metrics = ctx.measureText(text);
    
    console.log('Text width:', metrics.width);
    
    ctx.fillText(text, 50, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we set the font to 30px Arial and measure the text
"Hello Canvas". The measureText method returns a TextMetrics object.

We log the text width to console and then draw the text at position (50,100).
This shows how to get text dimensions before rendering it on canvas.

## Centering Text Horizontally

This example shows how to center text horizontally using measureText.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Centering Text Horizontally&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.font = 'bold 36px Georgia';
    const text = 'Centered Text';
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    
    const x = (canvas.width - textWidth) / 2;
    
    ctx.fillStyle = 'navy';
    ctx.fillText(text, x, 100);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we measure the text width and calculate the x position to center it.
The formula (canvas.width - textWidth) / 2 gives the correct x coordinate.

We use bold 36px Georgia font and navy color for the text. The text appears
perfectly centered horizontally on the canvas.

## Measuring Multiple Lines of Text

This example demonstrates measuring and positioning multiple lines of text.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Lines Measurement&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.font = '24px Arial';
    const lines = ['First line of text', 'Second line', 'Third line'];
    const lineHeight = 30;
    let y = 50;
    
    lines.forEach(line =&gt; {
        const metrics = ctx.measureText(line);
        const x = (canvas.width - metrics.width) / 2;
        ctx.fillText(line, x, y);
        y += lineHeight;
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how to measure and center multiple lines of text vertically.
Each line is measured individually to calculate its horizontal position.

We use a fixed line height of 30px and increment the y position for each line.
All lines are centered horizontally using the same formula as previous example.

## Advanced Text Metrics

This example explores advanced text metrics including bounding box measurements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Advanced Text Metrics&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="600" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.font = 'italic 40px Times New Roman';
    const text = 'Advanced Metrics';
    const metrics = ctx.measureText(text);
    
    console.log('Basic width:', metrics.width);
    console.log('Actual bounding box left:', metrics.actualBoundingBoxLeft);
    console.log('Actual bounding box right:', metrics.actualBoundingBoxRight);
    console.log('Font bounding box ascent:', metrics.fontBoundingBoxAscent);
    console.log('Font bounding box descent:', metrics.fontBoundingBoxDescent);
    
    // Draw reference lines
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    
    // Baseline
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(550, 200);
    ctx.stroke();
    
    // Text position
    ctx.fillStyle = 'blue';
    ctx.fillText(text, 100, 200);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates advanced text metrics properties available in the
TextMetrics object. These include bounding box measurements and font metrics.

We log various metrics to console and draw a reference baseline. The text is
rendered in italic 40px Times New Roman to show how metrics vary with styling.

## Dynamic Text Wrapping

This example shows how to implement text wrapping using measureText.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Text Wrapping&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.font = '18px Arial';
    const maxWidth = 300;
    const lineHeight = 25;
    const text = 'This is a long paragraph that needs to be wrapped to fit within the specified maximum width. The measureText method helps us determine where to break lines.';
    const words = text.split(' ');
    let line = '';
    let y = 50;
    
    for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width &gt; maxWidth &amp;&amp; line.length &gt; 0) {
            ctx.fillText(line, 100, y);
            line = word + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    
    ctx.fillText(line, 100, y);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example implements text wrapping by measuring each potential line and
breaking when it exceeds the maximum width. Words are added one by one.

When a line would exceed maxWidth (300px), it's rendered and a new line starts.
The lineHeight (25px) controls vertical spacing between lines. This technique
is useful for rendering paragraphs on canvas.

## Source

[MDN Canvas measureText Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText)

In this article, we have explored various techniques for measuring text on
HTML canvas. Mastering measureText is essential for creating precise text
layouts and implementing features like text wrapping and centering.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).