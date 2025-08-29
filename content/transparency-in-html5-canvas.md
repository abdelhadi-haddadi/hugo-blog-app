+++
title = "Transparency in HTML5 canvas"
date = 2025-08-29T19:54:47.168+01:00
draft = false
description = "In this part of the HTML5 canvas tutorial we work with transparency."
image = "images/transparent_rectangles.png"
imageBig = "images/transparent_rectangles.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../fills/)
[Next](../compositing/)

# Transparency in HTML5 canvas

last modified July 17, 2023

In this part of the HTML5 canvas tutorial, we talk about transparency. 
We provide some basic definitions and two examples. 

## Transparency explained

Transparency is the quality of being able to see through a material. 
The easiest way to understand transparency is to imagine a piece of 
glass or water. Technically, the rays of light can go through the glass 
and this way we can see objects behind the glass. 

In computer graphics, we can achieve transparency effects using *alpha compositing*.
Alpha compositing is the process of combining an image with a background 
to create the appearance of partial transparency. 
The composition process uses an *alpha channel*.
Alpha channel is an 8-bit layer in a graphics file format that is used 
for expressing translucency (transparency). The extra eight bits per pixel 
serves as a mask and represents 256 levels of translucency. 

## Transparent rectangles

The next example draws ten rectangles with different levels of transparency. 

transparent_rectangles.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas transparent rectangles&lt;/title&gt;
&lt;script&gt;
    function draw() {
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
        
        ctx.fillStyle = "blue";
        
        for (var i = 1; i &lt;= 10; i++) {
            
            var alpha = i * 0.1;
            ctx.globalAlpha = alpha;       
            
            ctx.fillRect(50*i, 20, 40, 40);
        }          
    }
&lt;/script&gt;    
&lt;/head&gt;    

&lt;body onload="draw();"&gt;
    &lt;canvas id="myCanvas" width="550" height="200"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt; 

We draw ten blue rectangles with various levels of transparency applied.

ctx.fillStyle = "blue";

 
The rectangles will be filled with blue colour.

var alpha = i * 0.1;

 
The alpha value dynamically changes in the for loop.
In each loop, it is decreased by 10%.

ctx.globalAlpha = alpha;

 
The globalAlpha property specifies the alpha value that 
is applied to shapes and images before they are drawn onto the canvas. 
The value is in the range from 0.0 (fully transparent) to 1.0 (fully opaque).

ctx.fillRect(50*i, 20, 40, 40);

 
The fillRect method draws a filled rectangle. Its parameters are
x and y coordinates and width and height of the rectangle.

![transparent_rectangles.png](images/transparent_rectangles.png)

Figure: Transparent rectangles

## Fade out demo

In the next example we fade out an image. The image will gradually get more
transparent until it is completely invisible.

fadeout.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas fade out demo&lt;/title&gt;
&lt;script&gt;
    var alpha = 1.0;
    var ctx;
    var canvas;
    var img;

    function init() {
        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext('2d');
        
        img = new Image();
        img.src = 'mushrooms.jpg';
        
        img.onload = function() {
            ctx.drawImage(img, 10, 10);
      };
      
      fadeOut();
    }
    
    function fadeOut() {
        
        if (alpha &lt;= 0) {
            return;
        }         
            
        requestAnimationFrame(fadeOut);
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.globalAlpha = alpha;
            
        ctx.drawImage(img, 10, 10);
 
        alpha += -0.01;
    }        
&lt;/script&gt;    
&lt;/head&gt;    

&lt;body onload="init();"&gt;
    &lt;canvas id="myCanvas" width="350" height="250"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt; 

The example is animated. In each animation cycle, the alpha value decreases and
the image is redrawn. 

img = new Image();
img.src = 'mushrooms.jpg';

img.onload = function() {
    ctx.drawImage(img, 10, 10);
}

These lines load and display an image on the canvas.

fadeOut();

Inside the init function, we call the fadeOut
function, which starts the animation.

if (alpha &lt;= 0) {
    return;
}  

When the alpha value reaches zero, the animation is terminated.
The fadeOut function is not called anymore by the 
requestAnimationFrame function.

requestAnimationFrame(fadeOut);

The requestAnimationFrame is a convenient function to create 
animations. It tells the browser to perform an animation. The parameter is a 
function to be invoked before the repaint. The browser chooses an optimal 
frame rate for the animation.

ctx.clearRect(0,0, canvas.width, canvas.height);

The clearRect method erases the canvas.

ctx.globalAlpha = alpha;
    
ctx.drawImage(img, 10, 10);

A new global alpha value is set and the image is redraw, taking the 
new alpha value into consideration.

alpha += -0.01;

Finally, the alpha is decreased. In the next animation cycle
the image is drawn with a decreased alpha value.

In this part of the HTML5 canvas tutorial, we have talked about transparency.

 
[Contents](..)
[Previous](../fills/)
[Next](../compositing/)