+++
title = "JavaScript canvas"
date = 2025-08-29T20:01:10.128+01:00
draft = false
description = "Explore how to use the canvas element in JavaScript for drawing 2D graphics, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript canvas

last modified last modified October 18, 2023

 

In this article we show how to work with canvas element in JavaScript.

## Canvas

The canvas element provides a resolution-dependent bitmap area, which
can be used for rendering graphs, game graphics, art, or other visual images on
the fly. In simple terms, canvas is an HTML element which allows us to draw
graphics using JavaScript.

## Canvas context

The canvas context is an object which exposes the Canvas API to perform the
drawings. It provides objects, methods, and properties to draw and manipulate
graphics on a canvas drawing surface. The context is retrieved with the
getContext function.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Canvas&lt;/title&gt;
&lt;script type="module" src="main.mjs"&gt;&lt;/script&gt;
&lt;style&gt;
    canvas {
        border: 1px solid #bbb;
    }
&lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;canvas id="myCanvas" width="450" height="450"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt;

In the article, we use this HTML file. The canvas element is placed inside the
body element. The JS code resides in the main.mjs module.

let canvas = document.getElementById('myCanvas');

With the getElementById method, we get the reference to the canvas
element. The 2d option provides a two-dimensional rendering
context.

let ctx = canvas.getContext('2d');

A rendering context is retrieved with the getContext method.

## JS canvas lines

In the first example, we draw lines.

main.mjs
  

(function drawLines() {

    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(250, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(250, 250);
    ctx.lineWidth = 5;
    ctx.stroke();
})();

Two lines are drawn. The second line is thicker.

ctx.beginPath();

The beginPath method creates a new path. Once created, subsequent
drawing commands are directed into the path and used to build the path.

ctx.moveTo(20, 20);

The moveTo method moves the pen to the coordinates specified by x
and y.

ctx.lineTo(250, 150);

The lineTo method draws a line from the current drawing position to
the position specified by x and y.

ctx.stroke();

The stroke method draws the line by stroking its outline.

ctx.lineWidth = 5;

The lineWidth sets the width of the second line; the line is
thicker.

## JS canvas rectangles

In the next example, we draw rectangles.

main.mjs
  

(function drawRectangles() {

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'brown';
    ctx.fillRect(10, 10, 90, 60);

    ctx.fillStyle = 'rgb(217, 146, 54)';
    ctx.fillRect(130, 10, 90, 60);

    ctx.fillStyle = '#3F79BA';
    ctx.fillRect(250, 10, 90, 60);
})();

In the example we draw three coloured rectangles. The colours are specified in
three different formats.

ctx.fillStyle = 'brown';

In this line a string value is used to set the colour value.

ctx.fillStyle = 'rgb(217, 146, 54)';

Here we use the RGB system.

ctx.fillStyle = '#3F79BA';

The colour of the third rectangle is set with the hexadecimal
notation of the RGB system.

## JS canvas shapes

In the following program, we draw some basic shapes.

main.mjs
  

(function draw() {

    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'gray';
    ctx.fillRect(10, 10, 60, 60);
    ctx.fillRect(100, 10, 90, 60);

    ctx.beginPath();
    ctx.arc(250, 40, 32, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(10, 160);
    ctx.lineTo(90, 160);
    ctx.lineTo(50, 110);
    ctx.closePath();
    ctx.fill();

    ctx.save();
    ctx.scale(2, 1);
    ctx.beginPath();
    ctx.arc(72, 130, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(250, 120, 40, 0, Math.PI);
    ctx.fill();
})();

In the example, we draw six different shapes on the canvas.

ctx.fillStyle = 'gray';

The shapes will be painted in gray colour.

ctx.fillRect(10, 10, 60, 60);
ctx.fillRect(100, 10, 90, 60);

The rectangles are drawn with the fillRect method. A rectangle is
the only shape not initiated by the beginPath method.

ctx.beginPath();
ctx.arc(250, 40, 32, 0, 2*Math.PI);
ctx.fill();

A circle is drawn with the arc method. The method adds an arc to
the created path. The first two parameters define the x and y coordinates of the
point around which the arc is centered. The next two parameters specify the
start and the end angle of the arc. The angles are defined in radians. The last
parameter is optional; it specifies the direction in which the arc is drawn. The
default direction is clockwise.

ctx.beginPath();
ctx.moveTo(10, 160);
ctx.lineTo(90, 160);
ctx.lineTo(50, 110);
ctx.closePath();
ctx.fill();

With the moveTo and lineTo methods, we draw a
triangle. The closePath method causes the pen to move back to the
start of the current sub-path. In our case, it finishes the triangle shape.

ctx.save();
ctx.scale(2, 1);
ctx.beginPath();
ctx.arc(72, 130, 25, 0, 2*Math.PI);
ctx.fill();
ctx.restore();

An oval shape is drawn by scaling a circle. The operations are placed between
the save and restore methods so that the scale
operation does not affect the subsequent drawings.

ctx.beginPath();
ctx.arc(250, 120, 40, 0, Math.PI);
ctx.fill();

The last shape, a semicircle, is drawn with the arc method.

## JS canvas animation

In the next example, we create an animation.

canvas {
    border: 1px solid #bbb;
    background: #000;
}

For a better visual experience, set the background to black colour.

main.mjs
  

let cols = ["blue", "cadetblue", "green", "orange", "red", "yellow",
    "gray", "white"];

const NUMBER_OF_CIRCLES = 35;
const DELAY = 30;

let maxSize;
let canvas;
let ctx;
let circles;

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

    let w = canvas.width;
    let h = canvas.height;

    maxSize = w / 10;

    for (let i = 0; i &lt; circles.length; i++) {

        let rc = getRandomCoordinates();
        let r = Math.floor(maxSize * Math.random());
        let c = cols[Math.floor(Math.random() * cols.length)]

        circles[i] = new Circle(rc[0], rc[1], r, c);
    }
}

function doStep() {

    for (let i = 0; i &lt; circles.length; i++) {

        let c = circles[i];
        c.r += 1;

        if (c.r &gt; maxSize) {

            let rc = getRandomCoordinates();
            c.x = rc[0];
            c.y = rc[1];
            c.r = 1;
        }
    }

    drawCircles();
    setTimeout(doStep, DELAY);
}

function getRandomCoordinates() {

    let w = canvas.width;
    let h = canvas.height;

    let x = Math.floor(Math.random() * (w - (maxSize / 2)));
    let y = Math.floor(Math.random() * (h - (maxSize / 2)));

    return [x, y];
}

function drawCircles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i &lt; circles.length; i++) {

        ctx.beginPath();
        ctx.lineWidth = 2.5;

        let c = circles[i];
        ctx.strokeStyle = c.c;
        ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

init();

In the example there are growing coloured bubbles that randomly appear
and disappear on the screen.

let cols = ["blue", "cadetblue", "green", "orange", "red", "yellow",
    "gray", "white"];

These colours are used to paint the bubbles.

function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
}

This is the constructor of the Circle object. In addition to the x
and y coordinates and the radius, it also contains the c property for the colour
value.

circles = new Array(NUMBER_OF_CIRCLES);

The circles array is used to hold circle objects.

for (var i = 0; i &lt; circles.length; i++) {

    var rc = getRandomCoordinates();
    var r = Math.floor(maxSize * Math.random());
    var c = cols[Math.floor(Math.random()*cols.length)]

    circles[i] = new Circle(rc[0], rc[1], r, c);
}

The circles array is filled with circles. We calculate random
coordinates, random initial radius, and random colour value.

function doStep() {

The doStep represents an animation cycle of the program.

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

The setTimeout method is used to create animation. You may need to
adjust the DELAY value to fit your hardware.

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

## Source

[JS Canvas tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

In this article we have worked with the canvas element in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)