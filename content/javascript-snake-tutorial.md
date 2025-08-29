+++
title = "JavaScript Snake tutorial"
date = 2025-08-29T20:01:39.298+01:00
draft = false
description = "Learn how to create a Snake game in JavaScript using HTML5 canvas, with step-by-step examples."
image = "images/snake.png"
imageBig = "images/snake.png"
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Snake tutorial

last modified last modified October 18, 2023

 

In this article we show how to create a Snake game in JavaScript. The
images and sources are available at the author's Github
[JavaScript-Snake-Game](https://github.com/janbodnar/JavaScript-Snake-Game) repository.

## Snake game

*Snake* is an older classic video game which was first created in late
70s. Later it was brought to PCs. In this game the player controls a snake. The
objective is to eat as many apples as possible. Each time the snake eats an
apple, its body grows. The snake must avoid the walls and its own body. This
game is sometimes called *Nibbles*.

## HTML5 Canvas

HTML5 canvas element provides a resolution-dependent bitmap area, which can be
used for rendering graphs, game graphics, art, or other visual images on the
fly. In simple terms, canvas is a new element in HTML5, which allows you to draw
graphics using JavaScript. Canvas brings animations to web pages without the
need of plugins like Flash, Silverlight, or Java.

## JavaScript Snake code example

The size of each of the joints of a snake is 10 px. The snake is controlled with
the cursor keys. Initially, the snake has three joints. If the game is finished,
the "Game Over" message is displayed in the middle of the canvas.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;JavaScript Snake game&lt;/title&gt;
&lt;style&gt;
    canvas {background: black}
&lt;/style&gt;

&lt;script src="snake.js"&gt;&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="init();"&gt;
    &lt;canvas id="myCanvas" width="300" height="300"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt;

This is the HTML source. We put the JavaScript source in the
snake.js file.

&lt;canvas id="myCanvas" width="300" height="300"&gt;
&lt;/canvas&gt;

We create a canvas object. It is a rendering area for our game.

snake.js
  

// JavaScript Snake example
// Author Jan Bodnar
// http://zetcode.com/javascript/snake/

var canvas;
var ctx;

var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 300;
const C_WIDTH = 300;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

function init() {

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}

function loadImages() {

    head = new Image();
    head.src = 'head.png';

    ball = new Image();
    ball.src = 'dot.png';

    apple = new Image();
    apple.src = 'apple.png';
}

function createSnake() {

    dots = 3;

    for (var z = 0; z &lt; dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

function checkApple() {

    if ((x[0] == apple_x) &amp;&amp; (y[0] == apple_y)) {

        dots++;
        locateApple();
    }
}

function doDrawing() {

    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (inGame) {

        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z &lt; dots; z++) {

            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
            }
        }
    } else {

        gameOver();
    }
}

function gameOver() {

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';

    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

function checkApple() {

    if ((x[0] == apple_x) &amp;&amp; (y[0] == apple_y)) {

        dots++;
        locateApple();
    }
}

function move() {

    for (var z = dots; z &gt; 0; z--) {

        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {

        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {

        x[0] += DOT_SIZE;
    }

    if (upDirection) {

        y[0] -= DOT_SIZE;
    }

    if (downDirection) {

        y[0] += DOT_SIZE;
    }
}

function checkCollision() {

    for (var z = dots; z &gt; 0; z--) {

        if ((z &gt; 4) &amp;&amp; (x[0] == x[z]) &amp;&amp; (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] &gt;= C_HEIGHT) {

        inGame = false;
    }

    if (y[0] &lt; 0) {

       inGame = false;
    }

    if (x[0] &gt;= C_WIDTH) {

      inGame = false;
    }

    if (x[0] &lt; 0) {

      inGame = false;
    }
}

function locateApple() {

    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
}

function gameCycle() {

    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e) {

    var key = e.keyCode;

    if ((key == LEFT_KEY) &amp;&amp; (!rightDirection)) {

        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) &amp;&amp; (!leftDirection)) {

        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) &amp;&amp; (!downDirection)) {

        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) &amp;&amp; (!upDirection)) {

        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }
};

This is the JavaScript Snake source.

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 300;
const C_WIDTH = 300;

DOT_SIZE is the size of the apple and the dot of the snake.
ALL_DOTS constant defines the maximum number of possible dots on
the canvas (900 = 300*300/10*10). MAX_RAND
constant is used to calculate a random position for an apple.
DELAY constant determines the speed of the game. C_HEIGHT
and C_WIDTH constants store the size of the canvas.

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

These constants store the values of arrow keys. They are used for better
readability.

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

These two arrays store the x and y coordinates of all joints of a snake.

function init() {

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}

The init function gets the reference to the canvas object and its
context. The loadImages, createSnake, and
locateApple functions are called to perform specific tasks. The
setTimeout starts the animation.

function loadImages() {

    head = new Image();
    head.src = 'head.png';

    ball = new Image();
    ball.src = 'dot.png';

    apple = new Image();
    apple.src = 'apple.png';
}

In the loadImages function we load three images for the game.

function createSnake() {

    dots = 3;

    for (var z = 0; z &lt; dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

In the createSnake function we create the snake object. At the
start, it has three joints.

function checkApple() {

    if ((x[0] == apple_x) &amp;&amp; (y[0] == apple_y)) {

        dots++;
        locateApple();
    }
}

If the head collides with the apple, we increase the number of joints of the
snake. We call the locateApple method which randomly positions a
new apple object.

function move() {
...

In the move method we have the key algorithm of the game. In order
to understand it, look at how the snake is moving. We control the head of the
snake. We can change its direction with the cursor keys. The rest of the joints
move one position up the chain. The second joint moves where the first was, the
third joint where the second was etc.

for (var z = dots; z &gt; 0; z--) {

    x[z] = x[(z - 1)];
    y[z] = y[(z - 1)];
}

The for loop moves the joints of a snake up the chain.

if (leftDirection) {

    x[0] -= DOT_SIZE;
}

This line moves the head to the left.

function checkCollision() {
...

In the checkCollision method, we determine if the snake has hit
itself or one of the borders.

for (var z = dots; z &gt; 0; z--) {

    if ((z &gt; 4) &amp;&amp; (x[0] == x[z]) &amp;&amp; (y[0] == y[z])) {
        inGame = false;
    }
}

If the snake hits one of its joints with its head, the game is over.

if (y[0] &gt;= C_HEIGHT) {

    inGame = false;
}

The game is finished if the snake hits the bottom of the canvas.

function locateApple() {

    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
}

The locateApple randomly selects x and y coordinates for the apple
object. The apple_x and apple_y are the coordinates of
the uppler-left point of the apple image.

function gameCycle() {

    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

The gameCycle function forms a game cycle. Provided that the game
has not finished, we perform collision detection, do movement and drawing. The
setTimeout function calls recursively the
gameCycle function.

if ((key == LEFT_KEY) &amp;&amp; (!rightDirection)) {

    leftDirection = true;
    upDirection = false;
    downDirection = false;
}

If we hit the left cursor key, we set the leftDirection variable to
true. This variable is used in the move function to change the
coordinates of the snake object. Notice also that when the snake is heading to
the right, we cannot immediately turn to the left.

![snake.png](images/snake.png)

Figure: Snake game

## Source

[Snake game](https://en.wikipedia.org/wiki/Snake_(video_game_genre))

This was JavaScript Snake game.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)