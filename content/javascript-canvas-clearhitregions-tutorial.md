+++
title = "JavaScript Canvas clearHitRegions Tutorial"
date = 2025-08-27T23:21:45.912+01:00
draft = false
description = "Learn how to use JavaScript Canvas clearHitRegions
method effectively with examples and detailed explanations. Enhance your web
development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas clearHitRegions Tutorial

last modified April 3, 2025

In this article, we explore the Canvas clearHitRegions method in JavaScript.
This method is essential for managing interactive regions on HTML canvas.
Mastering hit regions is crucial for creating interactive graphics.

## Basic Definition

Hit regions are areas on canvas that can respond to user interactions like
clicks or touches. The clearHitRegions method removes all defined hit regions
from the canvas. This helps manage dynamic interactive elements.

The main hit region methods are addHitRegion,
removeHitRegion, and clearHitRegions. These work
with path-drawing methods to create interactive canvas elements.

## Basic clearHitRegions Usage

This example demonstrates how to clear all hit regions from a canvas.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic clearHitRegions&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Add a hit region
    ctx.beginPath();
    ctx.rect(50, 50, 100, 100);
    ctx.addHitRegion({id: 'square'});
    
    // Clear all hit regions
    ctx.clearHitRegions();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a canvas element and get its 2D context.
We add a rectangular hit region with ID 'square' to the canvas.

The clearHitRegions method removes all hit regions from the
canvas. This is useful when you need to reset interactive areas completely.

## Dynamic Hit Region Management

This example shows how to manage hit regions dynamically with clearHitRegions.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Hit Regions&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;button id="clearBtn"&gt;Clear Regions&lt;/button&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clearBtn');
    
    // Add multiple hit regions
    function addRegions() {
        ctx.beginPath();
        ctx.rect(20, 20, 80, 80);
        ctx.addHitRegion({id: 'region1'});
        
        ctx.beginPath();
        ctx.rect(120, 20, 80, 80);
        ctx.addHitRegion({id: 'region2'});
    }
    
    // Clear button handler
    clearBtn.addEventListener('click', () =&gt; {
        ctx.clearHitRegions();
        console.log('All hit regions cleared');
    });
    
    addRegions();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create two rectangular hit regions and a button to clear them.
The addRegions function defines two distinct hit regions.

When the button is clicked, clearHitRegions removes all hit
regions. This pattern is useful for dynamic UIs where regions change often.

## Interactive Game Example

This example demonstrates clearHitRegions in a simple game scenario.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Game Hit Regions&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="gameCanvas" width="400" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let score = 0;
    
    function createTarget(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.addHitRegion({
            id: 'target',
            cursor: 'pointer'
        });
    }
    
    function resetGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.clearHitRegions();
        createTarget(
            Math.random() * (canvas.width - 60) + 30,
            Math.random() * (canvas.height - 60) + 30
        );
    }
    
    canvas.addEventListener('click', (e) =&gt; {
        const region = e.region;
        if (region === 'target') {
            score++;
            console.log('Score:', score);
            resetGame();
        }
    });
    
    resetGame();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a simple game where clicking red targets increases score.
Each target is a circular hit region that responds to clicks.

The resetGame function uses clearHitRegions to
remove old targets before creating new ones. This ensures clean interaction.

## Multiple Region Types

This example shows managing different types of hit regions with clearHitRegions.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Region Types&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="400" height="300"&gt;&lt;/canvas&gt;
&lt;button id="resetBtn"&gt;Reset All Regions&lt;/button&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const resetBtn = document.getElementById('resetBtn');
    
    function setupRegions() {
        // Button region
        ctx.beginPath();
        ctx.rect(50, 50, 100, 50);
        ctx.fillStyle = '#4CAF50';
        ctx.fill();
        ctx.addHitRegion({
            id: 'greenBtn',
            cursor: 'pointer'
        });
        
        // Draggable region
        ctx.beginPath();
        ctx.arc(300, 100, 40, 0, Math.PI * 2);
        ctx.fillStyle = '#2196F3';
        ctx.fill();
        ctx.addHitRegion({
            id: 'draggable',
            cursor: 'move'
        });
    }
    
    resetBtn.addEventListener('click', () =&gt; {
        ctx.clearHitRegions();
        setupRegions();
        console.log('Regions reset');
    });
    
    canvas.addEventListener('click', (e) =&gt; {
        if (e.region === 'greenBtn') {
            alert('Button clicked!');
        }
    });
    
    setupRegions();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates two distinct hit regions with different behaviors.
A green button region shows alerts, while a blue circle is draggable.

The reset button uses clearHitRegions to remove all regions
before recreating them. This pattern is useful for complex interfaces.

## Advanced Region Management

This example demonstrates advanced hit region lifecycle management.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Advanced Region Management&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="appCanvas" width="500" height="400"&gt;&lt;/canvas&gt;
&lt;div&gt;
    &lt;button id="addBtn"&gt;Add Region&lt;/button&gt;
    &lt;button id="clearBtn"&gt;Clear Regions&lt;/button&gt;
    &lt;span id="counter"&gt;Regions: 0&lt;/span&gt;
&lt;/div&gt;

&lt;script&gt;
    const canvas = document.getElementById('appCanvas');
    const ctx = canvas.getContext('2d');
    const addBtn = document.getElementById('addBtn');
    const clearBtn = document.getElementById('clearBtn');
    const counter = document.getElementById('counter');
    let regionCount = 0;
    
    function addRandomRegion() {
        const x = Math.random() * (canvas.width - 80) + 40;
        const y = Math.random() * (canvas.height - 80) + 40;
        const size = Math.random() * 30 + 20;
        const hue = Math.floor(Math.random() * 360);
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
        ctx.fill();
        
        const regionId = `region-${regionCount}`;
        ctx.addHitRegion({
            id: regionId,
            cursor: 'pointer'
        });
        
        regionCount++;
        counter.textContent = `Regions: ${regionCount}`;
    }
    
    function clearAllRegions() {
        ctx.clearHitRegions();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        regionCount = 0;
        counter.textContent = `Regions: ${regionCount}`;
    }
    
    addBtn.addEventListener('click', addRandomRegion);
    clearBtn.addEventListener('click', clearAllRegions);
    
    canvas.addEventListener('click', (e) =&gt; {
        if (e.region) {
            console.log(`Clicked region: ${e.region}`);
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This advanced example shows dynamic hit region creation and management.
Users can add random circular regions and clear them completely.

The clearAllRegions function uses clearHitRegions
along with clearRect to reset the canvas completely. This shows
comprehensive region lifecycle management.

## Source

[MDN clearHitRegions Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearHitRegions)

In this article, we have explored various techniques for managing hit regions
on HTML canvas using clearHitRegions. Mastering these methods is essential
for creating interactive canvas applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).