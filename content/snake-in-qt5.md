+++
title = "Snake in Qt5"
date = 2025-08-29T19:57:29.749+01:00
draft = false
description = "In this part of the Qt5 tutorial, we create a clone of the Snake game."
image = "images/snake.png"
imageBig = "images/snake.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../customwidget/)
[Next](../breakoutgame/)

# Snake in Qt5

last modified October 18, 2023

In this part of the Qt5 tutorial, we create a Snake game clone.

## Snake

*Snake* is an older classic video game. It was first created in late 70s.
Later it was brought to PCs. In this game the player
controls a snake. The objective is to eat as many apples as possible. Each time
the snake eats an apple, its body grows. The snake must avoid the walls and its
own body. This game is sometimes called *Nibbles*.

## Development

The size of each of the joints of a snake is 10 px. The snake is controlled with the
cursor keys. Initially, the snake has three joints. If the game is finished, the
"Game Over" message is displayed in the middle of the board.

snake.h
  

#pragma once

#include &lt;QWidget&gt;
#include &lt;QKeyEvent&gt;

class Snake : public QWidget {

  public:
      Snake(QWidget *parent = nullptr);

  protected:
      void paintEvent(QPaintEvent *);
      void timerEvent(QTimerEvent *);
      void keyPressEvent(QKeyEvent *);

  private:
      QImage dot;
      QImage head;
      QImage apple;

      static const int B_WIDTH = 300;
      static const int B_HEIGHT = 300;
      static const int DOT_SIZE = 10;
      static const int ALL_DOTS = 900;
      static const int RAND_POS = 29;
      static const int DELAY = 140;

      int timerId;
      int dots;
      int apple_x;
      int apple_y;

      int x[ALL_DOTS];
      int y[ALL_DOTS];

      bool leftDirection;
      bool rightDirection;
      bool upDirection;
      bool downDirection;
      bool inGame;

      void loadImages();
      void initGame();
      void locateApple();
      void checkApple();
      void checkCollision();
      void move();
      void doDrawing();
      void gameOver(QPainter &amp;);
};

This is the header file.

static const int B_WIDTH = 300;
static const int B_HEIGHT = 300;
static const int DOT_SIZE = 10;
static const int ALL_DOTS = 900;
static const int RAND_POS = 29;
static const int DELAY = 140;

The B_WIDTH and B_HEIGHT constants determine the size
of the board. The DOT_SIZE is the size of the apple and the dot of
the snake. The ALL_DOTS constant defines the maximum number
of possible dots on the board (900 = (300*300)/(10*10)). The RAND_POS
constant is used to calculate a random position for an apple. The
DELAY constant determines the speed of the game.

int x[ALL_DOTS];
int y[ALL_DOTS];

These two arrays hold the x and y coordinates of all joints of a snake.

snake.cpp
  

#include &lt;QPainter&gt;
#include &lt;QTime&gt;
#include "snake.h"

Snake::Snake(QWidget *parent) : QWidget(parent) {

    setStyleSheet("background-color:black;");
    leftDirection = false;
    rightDirection = true;
    upDirection = false;
    downDirection = false;
    inGame = true;

    setFixedSize(B_WIDTH, B_HEIGHT);
    loadImages();
    initGame();
}

void Snake::loadImages() {

    dot.load("dot.png");
    head.load("head.png");
    apple.load("apple.png");
}

void Snake::initGame() {

    dots = 3;

    for (int z = 0; z &lt; dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }

    locateApple();

    timerId = startTimer(DELAY);
}

void Snake::paintEvent(QPaintEvent *e) {

    Q_UNUSED(e);

    doDrawing();
}

void Snake::doDrawing() {

    QPainter qp(this);

    if (inGame) {

        qp.drawImage(apple_x, apple_y, apple);

        for (int z = 0; z &lt; dots; z++) {
            if (z == 0) {
                qp.drawImage(x[z], y[z], head);
            } else {
                qp.drawImage(x[z], y[z], dot);
            }
        }

    } else {

        gameOver(qp);
    }
}

void Snake::gameOver(QPainter &amp;qp) {

    QString message = "Game over";
    QFont font("Courier", 15, QFont::DemiBold);
    QFontMetrics fm(font);
    int textWidth = fm.horizontalAdvance(message);

    qp.setFont(font);
    int h = height();
    int w = width();

    qp.translate(QPoint(w/2, h/2));
    qp.drawText(-textWidth/2, 0, message);
}

void Snake::checkApple() {

    if ((x[0] == apple_x) &amp;&amp; (y[0] == apple_y)) {

        dots++;
        locateApple();
    }
}

void Snake::move() {

    for (int z = dots; z &gt; 0; z--) {
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

void Snake::checkCollision() {

    for (int z = dots; z &gt; 0; z--) {

        if ((z &gt; 4) &amp;&amp; (x[0] == x[z]) &amp;&amp; (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] &gt;= B_HEIGHT) {
        inGame = false;
    }

    if (y[0] &lt; 0) {
        inGame = false;
    }

    if (x[0] &gt;= B_WIDTH) {
        inGame = false;
    }

    if (x[0] &lt; 0) {
        inGame = false;
    }

    if(!inGame) {
        killTimer(timerId);
    }
}

void Snake::locateApple() {

    QTime time = QTime::currentTime();
    qsrand((uint) time.msec());

    int r = qrand() % RAND_POS;
    apple_x = (r * DOT_SIZE);

    r = qrand() % RAND_POS;
    apple_y = (r * DOT_SIZE);
}

void Snake::timerEvent(QTimerEvent *e) {

    Q_UNUSED(e);

    if (inGame) {

        checkApple();
        checkCollision();
        move();
    }

    repaint();
}

void Snake::keyPressEvent(QKeyEvent *e) {

    int key = e-&gt;key();

    if ((key == Qt::Key_Left) &amp;&amp; (!rightDirection)) {
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == Qt::Key_Right) &amp;&amp; (!leftDirection)) {
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == Qt::Key_Up) &amp;&amp; (!downDirection)) {
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == Qt::Key_Down) &amp;&amp; (!upDirection)) {
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    QWidget::keyPressEvent(e);
}

In the snake.cpp file, we have the logic of the game.

void Snake::loadImages() {

    dot.load("dot.png");
    head.load("head.png");
    apple.load("apple.png");
}

In the loadImages method we get the images for the game.
The ImageIcon class is used for displaying PNG images.

void Snake::initGame() {

    dots = 3;

    for (int z = 0; z &lt; dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }

    locateApple();

    timerId = startTimer(DELAY);
}

In the initGame method we create the snake, randomly locate
an apple on the board, and start the timer.

void Snake::checkApple() {

    if ((x[0] == apple_x) &amp;&amp; (y[0] == apple_y)) {

        dots++;
        locateApple();
    }
}

If the apple collides with the head, we increase the number of joints of the
snake. We call the locateApple method which randomly positions a
new apple object.

In the move method we have the key algorithm of the game. To
understand it, look at how the snake is moving. We control the head of the
snake. We can change its direction with the cursor keys. The rest of the joints
move one position up the chain. The second joint moves where the first was, the
third joint where the second was etc.

for (int z = dots; z &gt; 0; z--) {
    x[z] = x[(z - 1)];
    y[z] = y[(z - 1)];
}

This code moves the joints up the chain.

if (leftDirection) {
    x[0] -= DOT_SIZE;
}

This line moves the head to the left.

In the checkCollision method, we determine if the snake has hit
itself or one of the walls.

for (int z = dots; z &gt; 0; z--) {

    if ((z &gt; 4) &amp;&amp; (x[0] == x[z]) &amp;&amp; (y[0] == y[z])) {
        inGame = false;
    }
}

If the snake hits one of its joints with its head the game is over.

if (y[0] &gt;= B_HEIGHT) {
    inGame = false;
}

The game is finished if the snake hits the bottom of the board.

void Snake::timerEvent(QTimerEvent *e) {

    Q_UNUSED(e);

    if (inGame) {

        checkApple();
        checkCollision();
        move();
    }

    repaint();
}

The timerEvent method forms a game cycle. Provided that the game
has not finished, we perform collision detection and do movement. The
repaint causes the window to be redrawn.

if ((key == Qt::Key_Left) &amp;&amp; (!rightDirection)) {
    leftDirection = true;
    upDirection = false;
    downDirection = false;
}

If we hit the left cursor key, we set the leftDirection variable to
true. This variable is used in the move function to change the
coordinates of the snake object. Notice also that when the snake is heading to
the right, we cannot turn immediately to the left.

main.cpp
  

#include &lt;QApplication&gt;
#include "snake.h"

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);

  Snake window;

  window.setWindowTitle("Snake");
  window.show();

  return app.exec();
}

This is the main class.

![snake.png](images/snake.png)

Figure: Snake

This was the Snake game in Qt5.

[Contents](..)
[Previous](../customwidget/)
[Next](../breakoutgame/)