+++
title = "Text in HTML5 canvas"
date = 2025-08-29T19:54:45.912+01:00
draft = false
description = "In this part of the HTML5 canvas tutorial, we work with text."
image = "images/drawing_text.png"
imageBig = "images/drawing_text.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../transformations/)
[Next](../animation/)

# Text in HTML5 canvas

last modified July 17, 2023

In this part of the HTML5 canvas tutorial we work with texts. 

## Text and fonts

A *character* is a symbol that represents an item such as a letter, 
a digit, or a punctuation. A *glyph* is a shape used to render a character 
or a sequence of characters. In the Latin alphabet a glyph typically represents 
one character. In other writing systems, a character may be composed of several 
glyphs, like ť, ž, ú, ô. These are Latin characters with accents. 

Text can be drawn on the canvas using various fonts. A *font* is a set of 
type characters of a particular typeface design and size. Various typefaces include 
Helvetica, Georgia, Times, or Verdana. A collection of glyphs with a particular 
style form a *font face*. A collection of font faces forms a *font family*. 

## Drawing text

HTML5 canvas context has two methods for drawing text: strokeText 
and fillText. The difference is that the fillText method 
draws the inside of the text, while the strokeText method draws
the outlines of the text.

drawing_text.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas drawing text&lt;/title&gt;
&lt;script&gt;
    function draw() {
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        ctx.font = "28px serif";
        ctx.fillText("ZetCode", 15, 25);
        
        ctx.font = "36px sans-serif";
        ctx.strokeText("ZetCode", 30, 80);
    }      
&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="draw();"&gt;
    &lt;canvas id="myCanvas" width="200" height="150"&gt;     
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt; 

The example draws two strings on the canvas.

ctx.font = "28px serif";

The canvas context font property specifies the current text style being 
used when drawing text. We specify the font size and font family. 

ctx.fillText("ZetCode", 15, 25);

The first parameter of the fillText method is the text to be
rendered. The next two parameters are the x and y coordinates of the text
starting point.

![drawing_text.png](images/drawing_text.png)

Figure: Drawing text

## Font

In the following example, we demonstrate several font properties.

text_font.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas drawing text&lt;/title&gt;
&lt;script&gt;
    function draw() {
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        ctx.font = "normal bold 18px serif";
        ctx.fillText('nice', 10, 20); 
        
        ctx.font = "italic 18px serif";
        ctx.fillText('pretty', 70, 20);
        
        ctx.font = "small-caps bolder 18px serif";
        ctx.fillText('beautiful', 160, 20);  
    }      
&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="draw();"&gt;
    &lt;canvas id="myCanvas" width="350" height="150"&gt;     
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt; 

The example draws three words with different font style, variant, and weight.

ctx.font = "normal bold 18px serif";

This line sets a normal font style and bold font weight.

ctx.font = "small-caps bolder 18px serif";

This line sets a small-caps font variant and bolder font weight.

![text_font.png](images/text_font.png)

Figure: Text font

## Text baseline

The textBaseline property of the canvas 2D API 
specifies the current text baseline being used when drawing text.
It accepts the following values: top, bottom, middle, alphabetic, 
hanging, ideographic. The default is alphabetic. 

text_baseline.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas text baseline&lt;/title&gt;
&lt;style&gt;
    canvas {border: 1px solid #bbbbbb}
&lt;/style&gt;    
&lt;script&gt;
    function draw() {
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
    
        ctx.translate(0.5, 0.5);
        ctx.setLineDash([2]);
        
        ctx.fillStyle = 'gray';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.lineTo(canvas.width, 100);
        ctx.stroke();
    
        ctx.font = '20px serif';
        ctx.textBaseline = "top";
        ctx.fillText('Top', 5, 100); 
        
        ctx.textBaseline = "bottom"; 
        ctx.fillText('Bottom', 60, 100); 
        
        ctx.textBaseline = "middle"; 
        ctx.fillText('Middle', 150, 100); 
        
        ctx.textBaseline = "alphabetic"; 
        ctx.fillText('Alphabetic', 240, 100); 
        
        ctx.textBaseline = "hanging"; 
        ctx.fillText('Hanging', 360, 100); 
        
        ctx.textBaseline = "ideographic";
        ctx.fillText('Ideographic', 460, 100);
        
    }    
&lt;/script&gt;
&lt;/head&gt;
    
&lt;body onload="draw();"&gt;
    &lt;canvas id="myCanvas" width="600" height="200"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt;

The example draws strings using all available text baselines.

ctx.textBaseline = "top";
ctx.fillText('Top', 5, 100); 

These lines draw a text on the top baseline mode.

![text_baseline.png](images/text_baseline.png)

Figure: Text baseline

## Text alignment

The textAlign property of the Canvas 2D API 
specifies the current text alignment being used when drawing text.
The alignment is based on the x value of the fillText
method. Possible values are: left, right, center, start, and end.

text_alignment.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas text alignment&lt;/title&gt;
&lt;style&gt;
    canvas {border: 1px solid #bbbbbb}
&lt;/style&gt;    
&lt;script&gt;
    function draw() {
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
    
        var cw = canvas.width/2;
    
        ctx.fillStyle = 'gray';
        ctx.translate(0.5, 0.5);
        ctx.setLineDash([2]);
        
        ctx.beginPath();
        ctx.moveTo(cw, 0);
        ctx.lineTo(cw, canvas.height);
        ctx.stroke();
        
        ctx.font = "16px serif";
        
        ctx.textAlign = "center";
        ctx.fillText("center", cw, 20);
        
        ctx.textAlign = "start";
        ctx.fillText("start", cw, 60);
        
        ctx.textAlign = "end";
        ctx.fillText("end", cw, 100);
        
        ctx.textAlign = "left";
        ctx.fillText("left", cw, 140);
        
        ctx.textAlign = "right";
        ctx.fillText("right", cw, 180);
    }    
&lt;/script&gt;
&lt;/head&gt;
    
&lt;body onload="draw();"&gt;
    &lt;canvas id="myCanvas" width="350" height="200"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt;

The example draws text with all available text alignments applied.

var cw = canvas.width/2;

We compute the x coordinate of the middle point of the canvas. Our text 
is aligned around this point.

ctx.beginPath();
ctx.moveTo(cw, 0);
ctx.lineTo(cw, canvas.height);
ctx.stroke();

For better visual understanding, we draw a thin vertical line in 
the middle of the canvas.

ctx.textAlign = "center";
ctx.fillText("center", cw, 20);

These lines center the text horizontally.

![text_alignment.png](images/text_alignment.png)

Figure: Text alignment

In this part of the HTML5 canvas tutorial, we covered text.

[Contents](..)
[Previous](../transformations/)
[Next](../animation/)