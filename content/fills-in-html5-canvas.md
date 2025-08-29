+++
title = "Fills in HTML5 canvas"
date = 2025-08-29T19:54:44.376+01:00
draft = false
description = "In this part of the HTML5 canvas tutorial, we work with fills."
image = "images/colours.png"
imageBig = "images/colours.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../shapes/)
[Next](../transparency/)

# Fills in HTML5 canvas

last modified July 17, 2023

In this part of the HTML5 canvas tutorial, we work with fills. 

Fills are used to paint the interiors of shapes. There are three basic fills:
colours, gradients, and patterns. To set the style of the shape's inside,
we use the fillStyle property.

## Colours

A common system of representing colours in computers is RGB; colours
are represented as combinations of red, green, and blue intensity values.

colours.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 Canvas colour fills&lt;/title&gt;
&lt;script&gt;
    function draw() {
        
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'brown';
        ctx.fillRect(10, 10, 90, 60);
        
        ctx.fillStyle = 'rgb(217, 146, 54)';
        ctx.fillRect(130, 10, 90, 60);
        
        ctx.fillStyle = '#3F79BA';
        ctx.fillRect(250, 10, 90, 60);        
    }
&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="draw();"&gt;
    &lt;canvas id="myCanvas" width="350" height="250"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt; 

In the example we draw three coloured rectangles. The colours are
specified in three different formats.

ctx.fillStyle = 'brown';

In this line a string value is used to set the colour value. 

ctx.fillStyle = 'rgb(217, 146, 54)';

Here we use the RGB system.

ctx.fillStyle = '#3F79BA';

The colour of the third rectangle is set with the hexadecimal
notation of the RGB system.

![colours.png](images/colours.png)

Figure: Colours

## Linear gradient

In computer graphics, gradient is a smooth blending of shades from light to 
dark or from one colour to another. In 2D drawing programs and paint programs, 
gradients are used to create colorful backgrounds and special effects as well 
as to simulate lights and shadows. 

There are two types of gradients: linear and radial. The first
example demonstrates the linear gradient in HTML5 canvas.

linear_gradient.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;    
&lt;title&gt;HTML5 canvas linear gradient&lt;/title&gt;
&lt;script&gt;
    function draw() {
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
        
        var lgr = ctx.createLinearGradient(150, 0, 150, 160);
        lgr.addColorStop(0.2, "black");
        lgr.addColorStop(0.5, "red");
        lgr.addColorStop(0.8, "black");
    
        ctx.fillStyle = lgr;
        ctx.fillRect(0, 0, 300, 160);
    }
&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="draw();"&gt;
    &lt;canvas id="myCanvas" width="350" height="350"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt;

The code example fills a rectangle with a linear gradient.
A linear gradient is a gradient created along a line.

var lgr = ctx.createLinearGradient(150, 0, 150, 160);

The createLinearGradient method creates a gradient along 
the line given by the coordinates represented by the parameters.
The parameters are x and y coordinates of the start and end
points.

lgr.addColorStop(0.2, "black");
lgr.addColorStop(0.5, "red");
lgr.addColorStop(0.8, "black");

The addColorStop method defines new stops on the gradient 
with specified offsets and colours. In our case, the colour stops set 
where the black and red colour start and end.

ctx.fillStyle = lgr;

The created linear gradient is set to be the current fillStyle.

ctx.fillRect(0, 0, 300, 160);

With the fillRect method a rectangle is painted. The interior of the 
rectangle is filled with our linear gradient.

![linear_gradient.png](images/linear_gradient.png)

Figure: Linear gradient

## Radial gradient

Radial gradients are blendings of colours or shades of colours between two circles.

radial_gradient.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas radial gradient&lt;/title&gt;
&lt;script&gt;
    function draw() {
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
    
        var rgr = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 5, 
            canvas.width/2, canvas.height/2, 100);
        rgr.addColorStop(0, "black");
        rgr.addColorStop(0.3, "yellow");
        rgr.addColorStop(1, "black");
    
        ctx.fillStyle = rgr;
        ctx.fillRect(0, 0, 250, 250);
    }
&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="draw();"&gt;
&lt;canvas id="myCanvas" width="250" height="250"&gt;
&lt;/canvas&gt;

&lt;/body&gt;
&lt;/html&gt;

The code example fills a rectangle with a radial gradient.

var rgr = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 5, 
    canvas.width/2, canvas.height/2, 100);

The createRadialGradient method creates a radial gradient given 
by the coordinates of the two circles represented by the parameters. We
set the circles into the middle of the canvas. The first two parameters set 
the x and y coordinates of the start circle. The third parameter is the radius
of the start circle. The next two parameters are the x and y coordinates of
the end circle. The last parameter specifies the radius of the end cirle.

rgr.addColorStop(0, "black");
rgr.addColorStop(0.3, "yellow");
rgr.addColorStop(1, "black");

The addColorStop method sets the alternating colours in the 
radial gradient: black and yellow.

ctx.fillStyle = rgr;
ctx.fillRect(0, 0, 250, 250);

A rectangle is drawn with the radial gradient fill.

![radial_gradient.png](images/radial_gradient.png)

Figure: Radial gradient

## Pattern

A patter is an image applied to a shape. It is
also called an image texture.

pattern.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas pattern&lt;/title&gt;
&lt;script&gt;
    function draw() {
        
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        var img = new Image();
        img.src = 'crack.png';
        
        img.onload = function() {
            var pattern = ctx.createPattern(img, 'repeat');

            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = pattern;
            ctx.fill();
      };
    }
&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="draw();"&gt;
    &lt;canvas id="myCanvas" width="250" height="250"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt; 

The example fills the whole canvas with a repeating image texture.

var img = new Image();

The Image is a HTML5 constructor for the HTML 
image element.

img.src = 'crack.png';

In the src attribute, we set the URL of the image.

var pattern = ctx.createPattern(img, 'repeat');

The createPattern method creates a pattern using 
the specified image. It repeats the source in the directions specified 
by the repetition argument. The 'repeat' value repeats
the pattern in both directions.

![pattern.png](images/pattern.png)

Figure: Pattern

In this part of the HTML5 canvas tutorial, we worked with various fills.

[Contents](..)
[Previous](../shapes/)
[Next](../transparency/)