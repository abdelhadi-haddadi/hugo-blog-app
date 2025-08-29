+++
title = "Animation in HTML5 canvas"
date = 2025-08-29T19:54:42.840+01:00
draft = false
description = "In this part of the HTML5 canvas tutorial, we cover animation."
image = ""
imageBig = ""
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../text/)
[Next](../snake/)

# Animation in HTML5 canvas

last modified July 17, 2023

In this chapter we create animation in HTML5 canvas.

*Animation* is a rapid succession of images which make an illusion of
movement. Animation is not restricted to movement, however. Changing the
background of a object over time is considered an animation too.

There are three functions to create animation in HTML5 canvas:

- setInterval(function, delay)

- setTimeut(function, delay)

- requestAnimationFrame(callback)

The setInterval function repeatedly executes the passed function 
every delay milliseconds. The setTimeout executes the specified function 
in delay milliseconds. In order to create animation, the setTimeout is
called from within the executed function. The requestAnimationFrame function
lets the browser call a specified function to update an animation before the next repaint.
The browser does some optimisations.

## Move along curve

In the first animation, an object is moved along a curve.

move_along_curve.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas move along curve&lt;/title&gt;
&lt;style&gt;
    canvas { border: 1px solid #bbbbbb }
&lt;/style&gt;
&lt;script&gt;
    var canvas;
    var ctx;
    var x = 20; 
    var y = 80;
    const DELAY = 30;
    const RADIUS = 10;

    function init() {
        
        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext('2d');
        
        setInterval(move_ball, DELAY);
    }
    
    function draw() {        
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "cadetblue";
        ctx.arc(x, y, RADIUS, 0, 2*Math.PI);
        ctx.fill();
    }
    
    function move_ball() {
        
        x += 1;
        
        if (x &gt; canvas.width + RADIUS) {
            x = 0;
        }
        
        y = Math.sin(x/32)*30 + 80;
        draw();
    } 
&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="init();"&gt;
    &lt;canvas id="myCanvas" width="350" height="150"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt; 

The example moves a circle along a sine curve. After the circle
moves past the end of the canvas, it reappears on the left side.

setInterval(move_ball, DELAY);

The setInterval function causes the move_ball
function to be called every DELAY ms.

function draw() {        
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "cadetblue";
    ctx.arc(x, y, RADIUS, 0, 2*Math.PI);
    ctx.fill();
}

The draw method clears the canvas with the clearRect
method and draws a new circle with updated x and y coordinates.

function move_ball() {
    
    x += 1;
    
    if (x &gt; canvas.width + RADIUS) {
        x = 0;
    }
    
    y = Math.sin(x/32)*30 + 80;
    draw();
}

In the move_ball function, we update the x and y coordinates
of the circle's center point. We check if the ball has passed the right edge of
the canvas and call the draw method to redraw the canvas.

## Fading out

Fading out is an animation which changes the state of an object. It is 
a kind of a transition animation.

fading_out.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;style&gt;
    canvas {border: 1px solid #bbbbbb}
&lt;/style&gt;
&lt;title&gt;HTML5 canvas fading out&lt;/title&gt;
&lt;script&gt;
    var canvas;
    var ctx;
    
    var alpha = 1;
    
    var rx = 20;
    var ry = 20;
    var rw = 120;
    var rh = 80;

    const DELAY = 20;
    
    function init() {
        
        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext('2d');
        
        canvas.addEventListener("click", onClicked);
        
        ctx.fillRect(rx, ry, rw, rh)
    }
    
    function onClicked(e) {
        var cx = e.x;
        var cy = e.y;
        
        if (cx &gt;= rx &amp;&amp; cx &lt;= rx + rw &amp;&amp; 
            cy &gt;= ry &amp;&amp; cy &lt;= ry + rh) {
            fadeout();
        }
    }
    
    function fadeout() {
    
        if (alpha &lt; 0) {
            canvas.removeEventListener("click", onClicked);
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'white';
            ctx.fillRect(rx, ry, rw, rh);
            return;
        }         
        
        ctx.clearRect(rx, ry, rw, rh);
        ctx.globalAlpha = alpha;
        ctx.fillRect(rx, ry, rw, rh)
 
        alpha -= 0.01;
        
        setTimeout(fadeout, DELAY);
    }
        
&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="init();"&gt;
    &lt;canvas id="myCanvas" width="350" height="250"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt; 

There is a rectangle object. When we click on the rectangle, it 
starts fading out.

canvas.addEventListener("click", onClicked);

A click listener is added to the canvas with the 
addEventListener method. Upon receveing a mouse click, 
the onClicked function is called.

ctx.fillRect(rx, ry, rw, rh)

Initially, a rectangle is drawn on the canvas in the default black
fill. 

function onClicked(e) {
    var cx = e.x;
    var cy = e.y;
    
    if (cx &gt;= rx &amp;&amp; cx &lt;= rx + rw &amp;&amp; 
        cy &gt;= ry &amp;&amp; cy &lt;= ry + rh) {
        fadeout();
    }
}

Inside the onClicked function, we figure out the x and y
coordinates of the mouse click. We compare the mouse coordinates with 
the outside bounds of the rectagle and if it falls in the rectagle's 
area, the fadeout method is called. 

if (alpha &lt; 0) {
    canvas.removeEventListener("click", onClicked);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.fillRect(rx, ry, rw, rh);
    return;
}    

When the rectagle is fully transparent, we remove the listener
and fill the area in opaque white colour. The return statement
ends the recursive calling of the fadeout function.

ctx.clearRect(rx, ry, rw, rh);
ctx.globalAlpha = alpha;
ctx.fillRect(rx, ry, rw, rh)

The area of the rectangle is cleared and filled with updated
alpha state. 

alpha -= 0.01;

The alpha value is decreased by a small fraction.

setTimeout(fadeout, DELAY);

After DELAY ms, the fadeout method
is called from inside its own body. This practice is called *recursion*.

## Bubbles

The following examples is inspired by example from the Java 2D demo. 

bubbles.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas bubbles&lt;/title&gt;
&lt;style&gt;
    canvas {
        border: 1px solid #bbb;
        background: #000;
    }
&lt;/style&gt;
&lt;script&gt;
    var cols = ["blue", "cadetblue", "green", "orange", "red", "yellow",
        "gray", "white"];
        
    const NUMBER_OF_CIRCLES = 35;
    const DELAY = 30;
        
    var maxSize;
    var canvas;
    var ctx;
    var circles;
    
    function Circle(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    } 

    function init() {
        
        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext('2d');
        
        circles = new Array(NUMBER_OF_CIRCLES);
        
        initCircles();
        doStep();
    }
    
    function initCircles() {
        
        var w = canvas.width;
        var h = canvas.height;

        maxSize = w / 10; 

        for (var i = 0; i &lt; circles.length; i++) {

            var rc = getRandomCoordinates();
            var r = Math.floor(maxSize * Math.random());   
            var c = cols[Math.floor(Math.random()*cols.length)]
            
            circles[i] = new Circle(rc[0], rc[1], r, c);
        }
    }        
    
    function doStep() {
        
        for (var i = 0; i &lt; circles.length; i++) {
            
            var c = circles[i];
            c.r += 1;
            
            if (c.r &gt; maxSize) {
 
                var rc = getRandomCoordinates();
                c.x = rc[0];
                c.y = rc[1];
                c.r = 1;
            } 
        }
        
        drawCircles();
        setTimeout(doStep, DELAY);
    }
    
    function getRandomCoordinates() {
        
        var w = canvas.width;
        var h = canvas.height;
        
        var x = Math.floor(Math.random() * (w - (maxSize / 2)));
        var y = Math.floor(Math.random() * (h - (maxSize / 2)));
        
        return [x, y];
    }
    
    function drawCircles() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (var i = 0; i &lt; circles.length; i++) {
            
            ctx.beginPath();
            ctx.lineWidth = 2.5;
            
            var c = circles[i];
            ctx.strokeStyle = c.c;
            ctx.arc(c.x, c.y, c.r, 0, 2*Math.PI);
            ctx.stroke();
        }
    }
&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="init();"&gt;
    &lt;canvas id="myCanvas" width="350" height="250"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt;

In the example there are growing coloured bubbles that randomly appear 
and disappear on the screen. 

var cols = ["blue", "cadetblue", "green", "orange", "red", "yellow",
    "gray", "white"];

These colours are used to paint the bubbles.

function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
} 

This is the constructor of the Circle object. In addition to
the x and y coordinates and the radius, it also contains the c property for 
the colour value.

circles = new Array(NUMBER_OF_CIRCLES);

The circles array is used to hold circle objects.

for (var i = 0; i &lt; circles.length; i++) {

    var rc = getRandomCoordinates();
    var r = Math.floor(maxSize * Math.random());   
    var c = cols[Math.floor(Math.random()*cols.length)]
    
    circles[i] = new Circle(rc[0], rc[1], r, c);
}

The circles array is filled with circles. We calculate
random coordinates, random initial radius, and random colour value.

function doStep() {

The doStep represents an animation cycle of the 
program. 

for (var i = 0; i &lt; circles.length; i++) {
    
    var c = circles[i];
    c.r += 1;
    
    if (c.r &gt; maxSize) {

        var rc = getRandomCoordinates();
        c.x = rc[0];
        c.y = rc[1];
        c.r = 1;
    } 
}

We go through the circles array and increase each circle's radius.
When the circle reaches a maximum size, it is randomly repositioned and 
minimized.

setTimeout(doStep, DELAY);

The setTimeout method is used to create animation. You may
need to adjust the DELAY value to fit your hardware.

function drawCircles() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i &lt; circles.length; i++) {
        
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        
        var c = circles[i];
        ctx.strokeStyle = c.c;
        ctx.arc(c.x, c.y, c.r, 0, 2*Math.PI);
        ctx.stroke();
    }
}

The drawCircles function clears the canvas and
paints all the circles from the array.

## Star field

The following example creates a starfield animation.

starfield.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;HTML5 canvas star field&lt;/title&gt;
&lt;script&gt;
var canvas_w;
var canvas_h;
var canvas;
var ctx;
var layer1;
var layer2;
var layer3;

const DELAY = 20;
const N_STARS = 60;
const SPEED1 = 3;
const SPEED2 = 2;
const SPEED3 = 1;

function init() {
    
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    
    canvas_w = canvas.width;
    canvas_h = canvas.height;

    layer1 = new layer(N_STARS, SPEED1, "#ffffff");
    layer2 = new layer(N_STARS, SPEED2, "#dddddd");
    layer3 = new layer(N_STARS, SPEED3, "#999999");

    setTimeout("drawLayers()", DELAY);
}

function star() {
    
    this.x = Math.floor(Math.random()*canvas_w);
    this.y = Math.floor(Math.random()*canvas_h);
    
    this.move = function(speed) {
        
        this.y = this.y + speed;
        
        if (this.y &gt; canvas_h) { 
            
            this.y = 0;
            this.x = Math.floor(Math.random()*canvas_w);
        }
    }
    
    this.draw = function(col) {
        
        ctx.fillStyle = col;
        ctx.fillRect(this.x, this.y , 1, 1);
    }
}

function layer(n, sp, col) {
    
    this.n = n;
    this.sp = sp;
    this.col = col;
    this.stars = new Array(this.n);
    
    for (var i=0; i &lt; this.n; i++) {
        this.stars[i] = new star();
    }
    
    this.moveLayer = function() {
        
        for (var i=0; i &lt; this.n; i++) {
            this.stars[i].move(this.sp);
        }
    }
    
    this.drawLayer = function() {
        
        for (var i=0; i &lt; this.n; i++) {
            this.stars[i].draw(this.col);
        }
    }
}

function drawLayers() {

    ctx.fillStyle = '#000000';      
    ctx.fillRect(0, 0, canvas_w, canvas_h);
    
    layer1.moveLayer();
    layer2.moveLayer();
    layer3.moveLayer();
    
    layer1.drawLayer();
    layer2.drawLayer();
    layer3.drawLayer();
    
    setTimeout("drawLayers()", DELAY);
}

&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="init();"&gt;
    &lt;canvas id="myCanvas" width="800" height="600"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt; 

The starfield animation is created by producing three different layers; each layer
consists of stars (little dots) having different speed and colour shade. The stars
in the front layer are brighter and move faster, the stars in the back are dimmer and
move slower.

layer1 = new layer(N_STARS, SPEED1, "#ffffff");
layer2 = new layer(N_STARS, SPEED2, "#dddddd");
layer3 = new layer(N_STARS, SPEED3, "#999999");

Three layers of stars are created. They have different speeds and
colour shades. 

function star() {
    
    this.x = Math.floor(Math.random()*canvas_w);
    this.y = Math.floor(Math.random()*canvas_h);
...    

When a star is created, it is given random coordinates.

this.move = function(speed) {
    
    this.y = this.y + speed;
    
    if (this.y &gt; canvas_h) { 
        
        this.y = 0;
        this.x = Math.floor(Math.random()*canvas_w);
    }
}

The move method moves the star; it increases
its y coordinate. 

this.draw = function(col) {
    
    ctx.fillStyle = col;
    ctx.fillRect(this.x, this.y , 1, 1);
}

The draw method draws the star on 
the canvas. It uses the fillRect method
to draw a tiny rectangle in the given colour shade.

function layer(n, sp, col) {
    
    this.n = n;
    this.sp = sp;
    this.col = col;
    this.stars = new Array(this.n);
...    

A layer is a collection of n stars with the given
speed and colour shade. The stars are stored in
the stars array.

for (var i=0; i &lt; this.n; i++) {
    this.stars[i] = new star();
}

Upon creation of the layer, the stars array is
filled with star objects.

this.moveLayer = function() {
    
    for (var i=0; i &lt; this.n; i++) {
        this.stars[i].move(this.sp);
    }
}

The moveLayer method goes through
the array of stars and calls each star's move
method.

this.drawLayer = function() {
    
    for (var i=0; i &lt; this.n; i++) {
        this.stars[i].draw(this.col);
    }
}

Likewise, the drawLayer method calls each star's
draw method.

function drawLayers() {

    ctx.fillStyle = '#000000';      
    ctx.fillRect(0, 0, canvas_w, canvas_h);
    
    layer1.moveLayer();
    layer2.moveLayer();
    layer3.moveLayer();
    
    layer1.drawLayer();
    layer2.drawLayer();
    layer3.drawLayer();
    
    setTimeout("drawLayers()", DELAY);
}

The drawLayers function moves the stars of each layer
and draws them on the canvas. It calls itself after DELAY ms, 
thus creating animation.

In this chapter of the HTML5 canvas tutorial, we have covered animation.

[Contents](..)
[Previous](../text/)
[Next](../snake/)