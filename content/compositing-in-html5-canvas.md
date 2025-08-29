+++
title = "Compositing in HTML5 canvas"
date = 2025-08-29T19:54:42.843+01:00
draft = false
description = "In this part of the HTML5 canvas tutorial, we demonstrate compositing operations."
image = "images/compositing.png"
imageBig = "images/compositing.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../transparency/)
[Next](../transformations/)

# Compositing in HTML5 canvas

last modified July 17, 2023

In this part of the HTML5 canvas tutorial, we work with compositing operations.

*Compositing* is the combining of visual elements from separate sources into single images. 
They are used to create the illusion that all those elements are parts of the same scene. 
Compositing is widely used in film industry to create crowds, entire new worlds which 
would be expensive or impossible to create otherwise. 

The Three circles example in the [Shapes chapter](../shapes/#three) of this tutorial uses a 
destination-out compositing operation to create a new shape.

## Compositing operations

The [developer.mozilla.org](https://developer.mozilla.org) lists in its 
[Compositing and clipping](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing)
chapter twenty six various compositing operations. We show some of them in 
the next code example. 

Say we want to draw two objects on a canvas. The first object drawn is called 
a destination, the second one a source. The globalCompositeOperation 
property of the canvas context determines how these two objects are going to be 
blended together. For example in the source-over rule, which is the 
default compositiong operation, new shapes are draw on top of the existing shapes. 

compositing.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 Canvas compositing operations&lt;/title&gt;  
&lt;style&gt;
    canvas {border: 1px solid brown}
    select {vertical-align:top}
&lt;/style&gt;  
&lt;script&gt;
    var canvas;
    var ctx;
    var value = 'source-over';
    var operations = ['source-over', 'source-in', 'source-out',
        'source-atop', 'destination-over', 'destination-in', 'destination-out',
        'destination-atop', 'lighter', 'copy', 'xor'];

    function init() {

        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext('2d');
        draw();    
    }

    function getOperation(sel) {
        
        value = operations[sel.value];
        draw();
    }

    function draw() {
    
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'blue';
      ctx.fillRect(20, 20, 40, 40);
      
      ctx.globalCompositeOperation = value; 
      
      ctx.fillStyle = 'green';
      ctx.fillRect(25, 25, 40, 40);
      ctx.restore();
    }    
&lt;/script&gt;
&lt;/head&gt;
    
&lt;body onload="init();"&gt;

    &lt;canvas id="myCanvas" width="150" height="100"&gt;
    &lt;/canvas&gt;
    
    &lt;select id="opers" onchange="getOperation(this)"&gt;
      &lt;option value="0" selected="selected"&gt;source-over&lt;/option&gt;
      &lt;option value="1"&gt;source-in&lt;/option&gt;
      &lt;option value="2"&gt;source-out&lt;/option&gt;
      &lt;option value="3"&gt;source-atop&lt;/option&gt;
      &lt;option value="4"&gt;destination-over&lt;/option&gt;
      &lt;option value="5"&gt;destination-in&lt;/option&gt;
      &lt;option value="6"&gt;destination-out&lt;/option&gt;
      &lt;option value="7"&gt;destination-atop&lt;/option&gt;
      &lt;option value="8"&gt;lighter&lt;/option&gt;
      &lt;option value="9"&gt;copy&lt;/option&gt;
      &lt;option value="10"&gt;xor&lt;/option&gt;
    &lt;/select&gt; 
        
&lt;/body&gt;
&lt;/html&gt;

In the example, we have have a drop-down list of compositing operations. 
The chosen operation is applied on the drawing of two overlapping rectangles.

var operations = ['source-over', 'source-in', 'source-out',
    'source-atop', 'destination-over', 'destination-in', 'destination-out',
    'destination-atop', 'lighter', 'copy', 'xor'];

The operations array holds eleven compositing operations.

function init() {

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    draw();    
}
 

Inside the init function, we get the reference to the 
canvas object and its drawing context.

ctx.save();
...
ctx.restore();

Each time we select an option from the drop-down list, the canvas
is redrawn with a new composition operation in action. In order to
get correct results, we must place the drawing code between save
and restore methods. This way the operations are isolated
from each other.

ctx.clearRect(0, 0, canvas.width, canvas.height);

The clearRect method clears the previous output.

ctx.globalCompositeOperation = value; 
 

The globalCompositeOperation is set with the chosen value
from the drop-down list.

![compositing.png](images/compositing.png)

Figure: Compositing

The above figure shows a xor compositing operation. 
In this rule, shapes are made transparent where both overlap and 
drawn normal everywhere else.

In this part of the HTML5 canvas tutorial, we have talked about image composition.

[Contents](..)
[Previous](../transparency/)
[Next](../transformations/)