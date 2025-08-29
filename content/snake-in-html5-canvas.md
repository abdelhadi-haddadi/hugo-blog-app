+++
title = "Snake in HTML5 canvas"
date = 2025-08-29T19:54:45.664+01:00
draft = false
description = "This part of the HTML5 canvas tutorial presents the Snake game."
image = "images/snake.png"
imageBig = "images/snake.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../animation/)

# Snake in HTML5 canvas

last modified July 17, 2023

In this part of the HTML5 canvas tutorial we create a Snake game clone.

## Snake

*Snake* is an older classic video game. It was first created in late 70s.
Later it was brought to PCs. In this game the player
controls a snake. The objective is to eat as many apples as possible. Each time
the snake eats an apple, its body grows. The snake must avoid the walls and its
own body. This game is sometimes called *Nibbles*.

## Development

The size of each of the joints of a snake is 10 px. The snake is controlled with the
cursor keys. Initially, the snake has three joints. If the game is finished, the
"Game Over" message is displayed in the middle of the canvas.

snake.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Snake in HTML5 canvas&lt;/title&gt;
&lt;style&gt;
    canvas {background: black}
&lt;/style&gt;
&lt;script&gt;
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
&lt;/script&gt;
&lt;/head&gt;

&lt;body onload="init();"&gt;
    &lt;canvas id="myCanvas" width="300" height="300"&gt;
    &lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt;

First, we define the constants used in the game.

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 300;
const C_WIDTH = 300;

The DOT_SIZE is the size of the apple and the dot of
the snake. The ALL_DOTS constant defines the maximum number
of possible dots on the canvas (900 = 300*300/10*10). The MAX_RAND
constant is used to calculate a random position for an apple. The
DELAY constant determines the speed of the game. The C_HEIGHT
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
context. The loadImages, createSnake, and locateApple
functions are called to perform specific tasks. The setTimeout starts the
animation.

function loadImages() {

    head = new Image();
    head.src = 'head.png';

    ball = new Image();
    ball.src = 'dot.png';

    apple = new Image();
    apple.src = 'apple.png';
}

In the loadImages function we retrieve the images for the game.

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

If the head collides with the apple, we increase the number of joints of the snake.
We call the locateApple method which randomly positions a new apple object.

In the move method we have the key algorithm of the game. To
understand it, look at how the snake is moving. We control
the head of the snake. We can change its direction with the cursor keys.
The rest of the joints move one position up the chain. The second joint
moves where the first was, the third joint where the second was etc.

for (var z = dots; z &gt; 0; z--) {
    x[z] = x[(z - 1)];
    y[z] = y[(z - 1)];
}

This code moves the joints up the chain.

if (leftDirection) {
    x[0] -= DOT_SIZE;
}

This line moves the head to the left.

In the checkCollision method, we determine if
the snake has hit itself or one of the borders.

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

The locateApple randomly selects x and y coordinates
for the apple object. The apple_x and apple_y
are the coordinates of the uppler-left point of the apple
image.

function gameCycle() {

    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

The gameCycle function forms a game cycle. Provided that
the game has not finished, we perform collision detection, do movement and
drawing. The setTimeout function calls recursively the
gameCycle function.

if ((key == LEFT_KEY) &amp;&amp; (!rightDirection)) {
    leftDirection = true;
    upDirection = false;
    downDirection = false;
}

If we hit the left cursor key, we set the leftDirection variable to true.
This variable is used in the move function to change the coordinates of
the snake object. Notice also that when the snake is heading to the right, we cannot
turn immediately to the left.

![snake.png](images/snake.png)

Figure: Snake

This was the Snake game in HTML5 canvas.

[Contents](..)
[Previous](../animation/)