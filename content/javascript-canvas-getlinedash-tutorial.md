+++
title = "JavaScript Canvas getLineDash Tutorial"
date = 2025-08-27T23:21:52.241+01:00
draft = false
description = "Learn how to use JavaScript Canvas getLineDash
method effectively with examples and detailed explanations. Master dashed line
patterns in canvas drawings."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas getLineDash Tutorial

last modified April 3, 2025

This tutorial explores the Canvas getLineDash method in JavaScript. This method
is essential for working with dashed line patterns in canvas drawings. Learn how
to retrieve and manipulate dash patterns effectively.

## Basic Definition

The getLineDash method returns the current line dash pattern. It
works with setLineDash to create and inspect dashed strokes.
The pattern is an array of numbers specifying dash/gap lengths.

Dashed lines are useful for various purposes like focus indicators, grid lines,
or decorative elements. Understanding getLineDash helps maintain
consistent dash patterns across complex drawings.

## Basic getLineDash Usage

This example demonstrates how to retrieve the default line dash pattern.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic getLineDash&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;p id="dashInfo"&gt;&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const dashPattern = ctx.getLineDash();
    document.getElementById('dashInfo').textContent = 
        `Default dash pattern: [${dashPattern}]`;
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code retrieves the default line dash pattern before any modifications.
The pattern is displayed in a paragraph element below the canvas.

By default, getLineDash returns an empty array, indicating solid
lines. This serves as a baseline for understanding dash pattern changes.

## Getting Current Dash Pattern

This example shows how to get the current dash pattern after setting one.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Current Dash Pattern&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;p id="dashInfo"&gt;&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.setLineDash([10, 5, 3, 5]);
    const dashPattern = ctx.getLineDash();
    
    document.getElementById('dashInfo').textContent = 
        `Current dash pattern: [${dashPattern}]`;
    
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(250, 100);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we set a complex dash pattern [10,5,3,5] then retrieve it using
getLineDash. The pattern means: 10px dash, 5px gap, 3px dash,
5px gap, repeating.

The retrieved pattern is displayed and used to draw a horizontal line.
This demonstrates how getLineDash reflects the current state.

## Pattern Inspection Before Drawing

This example shows how to inspect and modify dash patterns before drawing.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pattern Inspection&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Save current dash pattern
    const originalDash = ctx.getLineDash();
    
    // Set new pattern
    ctx.setLineDash([15, 5]);
    
    // Draw with new pattern
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(250, 50);
    ctx.stroke();
    
    // Restore original pattern
    ctx.setLineDash(originalDash);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code demonstrates a common pattern workflow: save current dash settings,
apply new pattern, draw, then restore original settings.

Using getLineDash to store the original pattern ensures we can
return to the previous state after temporary modifications. This is useful
in complex drawing operations.

## Pattern Comparison

This example compares different dash patterns side by side.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pattern Comparison&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const patterns = [
        { pattern: [5, 5], y: 50, color: 'red' },
        { pattern: [10, 5], y: 100, color: 'blue' },
        { pattern: [15, 3, 3, 3], y: 150, color: 'green' },
        { pattern: [20], y: 200, color: 'purple' }
    ];
    
    patterns.forEach(item =&gt; {
        ctx.setLineDash(item.pattern);
        const currentPattern = ctx.getLineDash();
        console.log(`Pattern at y=${item.y}:`, currentPattern);
        
        ctx.beginPath();
        ctx.strokeStyle = item.color;
        ctx.moveTo(50, item.y);
        ctx.lineTo(350, item.y);
        ctx.stroke();
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates four lines with different dash patterns. Each pattern is
logged to the console using getLineDash for inspection.

The patterns demonstrate various configurations: equal dashes/gaps, longer
dashes, complex patterns, and a single-value pattern that produces dots.
This helps visualize how different patterns render.

## Dynamic Pattern Adjustment

This example shows how to dynamically adjust dash patterns based on conditions.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Adjustment&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    function drawDashedLine(x1, y1, x2, y2, baseLength) {
        const currentPattern = ctx.getLineDash();
        const newPattern = currentPattern.length === 0 ?
            [baseLength, baseLength/2] :
            currentPattern.map(v =&gt; v * 1.5);
        
        ctx.setLineDash(newPattern);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        return newPattern;
    }
    
    // Draw progressively changing dashed lines
    let lastPattern = [];
    for (let i = 0; i &lt; 5; i++) {
        lastPattern = drawDashedLine(50, 50 + i*40, 350, 50 + i*40, 10);
        console.log(`Line ${i+1} pattern:`, lastPattern);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a function that draws dashed lines with dynamic patterns.
It checks the current pattern and either creates a new one or modifies it.

Each subsequent line gets a different pattern - either starting with [10,5]
or scaling the previous pattern by 1.5x. The patterns are logged to show
the progression. This demonstrates practical use of getLineDash.

## Source

[MDN getLineDash Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getLineDash)

This tutorial covered various aspects of the getLineDash method.
From basic retrieval to dynamic pattern adjustment, these examples provide a
comprehensive understanding of working with dashed lines in Canvas.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).