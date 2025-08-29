+++
title = "JavaScript Canvas addHitRegion Tutorial"
date = 2025-08-27T23:21:43.651+01:00
draft = false
description = "Learn how to use JavaScript Canvas addHitRegion
method to create interactive canvas elements with examples and detailed explanations."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas addHitRegion Tutorial

last modified April 3, 2025

This tutorial explores the Canvas addHitRegion method in JavaScript.
It enables creating interactive regions on canvas elements that respond to user
input. This is particularly useful for game development and complex UIs.

## Basic Definition

The addHitRegion method adds a hit region to a canvas path. This
region becomes interactive, responding to mouse and touch events. It simplifies
event handling for complex canvas drawings.

Hit regions can have unique IDs or control properties. They work with existing
canvas paths. Note that this feature was experimental and may not work in all
browsers. Consider polyfills for wider support.

## Basic Hit Region Example

This example demonstrates creating a simple clickable rectangle with hit region.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Hit Region&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click the rectangle&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    // Draw rectangle
    ctx.beginPath();
    ctx.rect(50, 50, 200, 100);
    ctx.fillStyle = 'blue';
    ctx.fill();
    
    // Add hit region
    ctx.addHitRegion({ id: 'myRect' });
    
    // Handle clicks
    canvas.addEventListener('click', function(e) {
        if (e.region) {
            output.textContent = `Clicked region: ${e.region}`;
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a blue rectangle and assigns it a hit region with ID 'myRect'.
When clicked, the event handler checks for the region property and displays it.

The addHitRegion method is called after defining the path. The click
event provides region information through the event object's region property.

## Multiple Hit Regions

This example shows how to create and handle multiple interactive regions.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Hit Regions&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click any shape&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    // Circle
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.addHitRegion({ id: 'circle' });
    
    // Triangle
    ctx.beginPath();
    ctx.moveTo(300, 100);
    ctx.lineTo(350, 200);
    ctx.lineTo(250, 200);
    ctx.closePath();
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.addHitRegion({ id: 'triangle' });
    
    // Event handling
    canvas.addEventListener('click', function(e) {
        if (e.region) {
            output.textContent = `Clicked ${e.region}`;
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create two shapes: a red circle and a green triangle. Each has its own
hit region with unique IDs. The click handler identifies which region was clicked.

This demonstrates how hit regions can distinguish between different canvas
elements. The same event handler works for all regions by checking e.region.

## Hit Region with Custom Control

This example shows how to associate a hit region with a form control.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Hit Region with Control&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;input type="checkbox" id="myCheckbox"&gt; Toggle me via canvas

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const checkbox = document.getElementById('myCheckbox');
    
    // Draw button
    ctx.beginPath();
    ctx.rect(50, 50, 200, 100);
    ctx.fillStyle = checkbox.checked ? 'green' : 'gray';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
    
    // Add hit region linked to checkbox
    ctx.addHitRegion({ control: checkbox });
    
    // Update canvas when checkbox changes
    checkbox.addEventListener('change', function() {
        ctx.fillStyle = this.checked ? 'green' : 'gray';
        ctx.fill();
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code links a canvas rectangle to a checkbox control. Clicking the rectangle
toggles the checkbox, and vice versa. The visual state updates accordingly.

The control property in addHitRegion creates this
association. The checkbox's change event redraws the canvas to reflect its state.

## Accessible Hit Regions

This example demonstrates making hit regions accessible with labels.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Accessible Hit Regions&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Interact with the buttons&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    // Play button
    ctx.beginPath();
    ctx.rect(50, 50, 80, 40);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.addHitRegion({
        id: 'play',
        label: 'Play button',
        role: 'button'
    });
    
    // Stop button
    ctx.beginPath();
    ctx.rect(170, 50, 80, 40);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.addHitRegion({
        id: 'stop',
        label: 'Stop button',
        role: 'button'
    });
    
    // Handle interactions
    canvas.addEventListener('click', function(e) {
        if (e.region) {
            output.textContent = `${e.region} activated`;
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates two buttons with proper accessibility attributes. The label
provides a text description, and role indicates the element type.

Screen readers can use this information to describe the interactive regions.
The click handler provides feedback when regions are activated.

## Complex Path with Hit Region

This example shows a complex custom path with a single hit region.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Path Hit Region&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;
&lt;p id="output"&gt;Click the star shape&lt;/p&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    
    // Draw star shape
    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(225, 100);
    ctx.lineTo(280, 110);
    ctx.lineTo(240, 150);
    ctx.lineTo(250, 200);
    ctx.lineTo(200, 175);
    ctx.lineTo(150, 200);
    ctx.lineTo(160, 150);
    ctx.lineTo(120, 110);
    ctx.lineTo(175, 100);
    ctx.closePath();
    
    ctx.fillStyle = 'gold';
    ctx.fill();
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add hit region for entire star
    ctx.addHitRegion({ id: 'star' });
    
    // Handle clicks
    canvas.addEventListener('click', function(e) {
        if (e.region === 'star') {
            output.textContent = 'You clicked the star!';
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a complex star shape with a single hit region covering the
entire path. The click handler specifically checks for the 'star' region.

The example demonstrates that hit regions work with any path, no matter how
complex. The entire shape becomes interactive as a single unit.

## Source

[MDN Canvas addHitRegion Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/addHitRegion)

This tutorial covered the addHitRegion method with practical examples.
While powerful, remember browser support may vary. Consider fallbacks for
production use.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).