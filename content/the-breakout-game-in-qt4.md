+++
title = "The Breakout game in Qt4"
date = 2025-08-29T19:57:17.759+01:00
draft = false
description = "In this part of the Qt4 tutorial, we create a Breakout game clone."
image = "images/breakout.png"
imageBig = "images/breakout.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../customwidget/)

# The Breakout game in Qt4

last modified October 18, 2023

In this part of the Qt4 tutorial, we create a simple Breakout game clone.

The Breakout is an arcade game developed by Atari Inc. The game was created 
in 1976. In this game, the player moves a paddle and bounces 
a ball. The objective is to destroy bricks in the top of the window. 
The images for the game can be downloaded [here](/img/gui/qt4/images.zip).

## The development

In our game, we have one paddle, one ball and thirty bricks. A timer is used to create 
a game cycle. We do not work with angles, we simply change directions: top, bottom, left, 
and right. The code was inspired by the PyBreakout game, which was developed in PyGame 
library by Nathan Dawson. 

The game is intentionally simple. There are no bonuses, levels, or score. 
It is then easier to understand. 

The Qt4 library is developed for creating computer applications. 
Nevertheless, it can be used to create games as well. Developing a computer game 
is a great way to learn more about Qt4.

paddle.h
  

#pragma once

#include &lt;QImage&gt;
#include &lt;QRect&gt;

class Paddle {

  public:
    Paddle();
    ~Paddle();

  public:
    void resetState();
    void move();
    void setDx(int);
    QRect getRect();
    QImage &amp; getImage();

  private:
    QImage image;
    QRect rect;
    int dx;
    static const int INITIAL_X = 200;
    static const int INITIAL_Y = 360;

};

This is a header file for the paddle object. The INITIAL_X and 
INITIAL_Y are constants which represent the initial coordinates
of the paddle object. 

paddle.cpp
  

#include "paddle.h"
#include &lt;iostream&gt;

Paddle::Paddle() {
    
  dx = 0;    
  image.load("paddle.png");

  rect = image.rect();
  resetState();
}

Paddle::~Paddle() {
    
 std::cout &lt;&lt; ("Paddle deleted") &lt;&lt; std::endl;
}

void Paddle::setDx(int x) {
  dx = x;
}

void Paddle::move() {
    
    int x = rect.x() + dx;
    int y = rect.top();
    
    rect.moveTo(x, y);
}

void Paddle::resetState() {
    
  rect.moveTo(INITIAL_X, INITIAL_Y);
}

QRect Paddle::getRect() {
    
  return rect;
}

QImage &amp; Paddle::getImage() {
    
  return image;
}

The paddle can be moved to the right or to the left. 

Paddle::Paddle() {
    
  dx = 0;    
  image.load("paddle.png");

  rect = image.rect();
  resetState();
}

In the constructor, we initiate the dx variable and load the 
paddle image. We get the image rectangle and move the image to its 
initial position. 

void Paddle::move() {
    
    int x = rect.x() + dx;
    int y = rect.top();
    
    rect.moveTo(x, y);
}

The move method moves the paddle's rectangle. The 
movement direction is controlled by the dx variable.

void Paddle::resetState() {
    
  rect.moveTo(INITIAL_X, INITIAL_Y);
}

The resetState moves the paddle to its initial position.

brick.h
  

#pragma once

#include &lt;QImage&gt;
#include &lt;QRect&gt;

class Brick {

  public:
    Brick(int, int);
    ~Brick();

  public:
    bool isDestroyed();
    void setDestroyed(bool);
    QRect getRect();
    void setRect(QRect);
    QImage &amp; getImage();

  private:
    QImage image;
    QRect rect;
    bool destroyed;
};

This is the header file for the brick object. 
If a brick is destroyed, the destroyed variable is set to true.

brick.cpp
  

#include "brick.h"
#include &lt;iostream&gt;

Brick::Brick(int x, int y) {
    
  image.load("brickie.png");
  destroyed = false;
  rect = image.rect();
  rect.translate(x, y);
}

Brick::~Brick() {

  std::cout &lt;&lt; ("Brick deleted") &lt;&lt; std::endl;
}

QRect Brick::getRect() {
    
  return rect;
}

void Brick::setRect(QRect rct) {
    
  rect = rct;
}

QImage &amp; Brick::getImage() {
    
  return image;
}

bool Brick::isDestroyed() {
    
  return destroyed;
}

void Brick::setDestroyed(bool destr) {
    
  destroyed = destr;
}

The Brick class represents the brick object.

Brick::Brick(int x, int y) {
    
  image.load("brickie.png");
  destroyed = false;
  rect = image.rect();
  rect.translate(x, y);
}

The brick's contructor loads its image, initiates the destroyed
flag, and moves the image to its initial position.

bool Brick::isDestroyed() {
    
  return destroyed;
}

The brick has a destroyed flag. If the destroyed flag is set, 
the brick is not drawn on the window. 

ball.h
  

#pragma once

#include &lt;QImage&gt;
#include &lt;QRect&gt;

class Ball {

  public:
    Ball();
    ~Ball();

  public:
    void resetState();
    void autoMove();
    void setXDir(int);
    void setYDir(int);
    int getXDir();
    int getYDir();
    QRect getRect();
    QImage &amp; getImage();
  
  private:
    int xdir;
    int ydir;
    QImage image;
    QRect rect;
    static const int INITIAL_X = 230;
    static const int INITIAL_Y = 355;    
    static const int RIGHT_EDGE = 300;
};

This is the header file for the ball object. The xdir and ydir
variables store the direction of the ball's movement.

ball.cpp
  

#include "ball.h"
#include &lt;iostream&gt;

Ball::Ball() {

  xdir = 1;
  ydir = -1;

  image.load("ball.png");

  rect = image.rect();
  resetState();
}

Ball::~Ball() {
    
  std::cout &lt;&lt; ("Ball deleted") &lt;&lt; std::endl;
}

void Ball::autoMove() {
    
  rect.translate(xdir, ydir);

  if (rect.left() == 0) {
    xdir = 1;
  }

  if (rect.right() == RIGHT_EDGE) {
    xdir = -1;
  }

  if (rect.top() == 0) {
    ydir = 1;
  }
}

void Ball::resetState() {
    
  rect.moveTo(INITIAL_X, INITIAL_Y);
}

void Ball::setXDir(int x) {
    
  xdir = x;
}

void Ball::setYDir(int y) {
    
  ydir = y;
}

int Ball::getXDir() {
    
  return xdir;
}

int Ball::getYDir() {
    
  return ydir;
}

QRect Ball::getRect() {
    
  return rect;
}

QImage &amp; Ball::getImage() {
    
  return image;
}

The Ball class represents the ball object.

xdir = 1;
ydir = -1;

At the beginning, the ball moves in north-east direction.

void Ball::autoMove() {
    
  rect.translate(xdir, ydir);

  if (rect.left() == 0) {
    xdir = 1;
  }

  if (rect.right() == RIGHT_EDGE) {
    xdir = -1;
  }

  if (rect.top() == 0) {
    ydir = 1;
  }
}

The autoMove method is called each game cycle to move 
the ball on the screen. If it hists the boundaries, the ball direction changes. 
If the ball passes the bottom edge, the ball does not bounce back—the game is over.

breakout.h
  

#pragma once

#include &lt;QWidget&gt;
#include &lt;QKeyEvent&gt;
#include "ball.h"
#include "brick.h"
#include "paddle.h"

class Breakout : public QWidget {
    
  Q_OBJECT  

  public:
    Breakout(QWidget *parent = 0);
    ~Breakout();

  protected:
    void paintEvent(QPaintEvent *);
    void timerEvent(QTimerEvent *);
    void keyPressEvent(QKeyEvent *);
    void keyReleaseEvent(QKeyEvent *);
    void drawObjects(QPainter *);
    void finishGame(QPainter *, QString);
    void moveObjects();

    void startGame();
    void pauseGame();
    void stopGame();
    void victory();
    void checkCollision();

  private:
    int x;
    int timerId;
    static const int N_OF_BRICKS = 30;
    static const int DELAY = 10;
    static const int BOTTOM_EDGE = 400;
    Ball *ball;
    Paddle *paddle;
    Brick *bricks[N_OF_BRICKS];
    bool gameOver;
    bool gameWon;
    bool gameStarted;
    bool paused;
};

This is the header file for the breakout object. 

void keyPressEvent(QKeyEvent *);
void keyReleaseEvent(QKeyEvent *);

The paddle is controlled with the cursor keys. In the game, we 
listen for key press and key release events. 

int x;
int timerId;

The x variable stores the current x position of the paddle. 
The timerId is used for identifying of the timer object. 
This is necessary when we pause the game. 

static const int N_OF_BRICKS = 30;

The N_OF_BRICKS constant stores the number of bricks in the game.

static const int DELAY = 10;

The DELAY constant controls the speed of the game.

static const int BOTTOM_EDGE = 400;

When the ball passes the bottom edge, the game is over.

Ball *ball;
Paddle *paddle;
Brick *bricks[N_OF_BRICKS];

The game consists of a ball, paddle, and an array of bricks.

bool gameOver;
bool gameWon;
bool gameStarted;
bool paused;

These four variables represent various states of the game.

breakout.cpp
  

#include &lt;QPainter&gt;
#include &lt;QApplication&gt;
#include "breakout.h"

Breakout::Breakout(QWidget *parent)
    : QWidget(parent) {
  
  x = 0;
  gameOver = false;
  gameWon = false;
  paused = false;
  gameStarted = false;
  ball = new Ball();
  paddle = new Paddle();

  int k = 0;
  
  for (int i=0; i&lt;5; i++) {
    for (int j=0; j&lt;6; j++) {
      bricks[k] = new Brick(j*40+30, i*10+50);
      k++; 
    }
  }  
}

Breakout::~Breakout() {
    
 delete ball;
 delete paddle;
 
 for (int i=0; i&lt;N_OF_BRICKS; i++) {
   delete bricks[i];
 }
}

void Breakout::paintEvent(QPaintEvent *e) {
  
  Q_UNUSED(e);  
    
  QPainter painter(this);

  if (gameOver) {
  
    finishGame(&amp;painter, "Game lost");    

  } else if(gameWon) {

    finishGame(&amp;painter, "Victory");
  }
  else {
      
    drawObjects(&amp;painter);
  }
}

void Breakout::finishGame(QPainter *painter, QString message) {
    
  QFont font("Courier", 15, QFont::DemiBold);
  QFontMetrics fm(font);
  int textWidth = fm.width(message);

  painter-&gt;setFont(font);
  int h = height();
  int w = width();

  painter-&gt;translate(QPoint(w/2, h/2));
  painter-&gt;drawText(-textWidth/2, 0, message);    
}

void Breakout::drawObjects(QPainter *painter) {
    
  painter-&gt;drawImage(ball-&gt;getRect(), ball-&gt;getImage());
  painter-&gt;drawImage(paddle-&gt;getRect(), paddle-&gt;getImage());

  for (int i=0; i&lt;N_OF_BRICKS; i++) {
    if (!bricks[i]-&gt;isDestroyed()) {
      painter-&gt;drawImage(bricks[i]-&gt;getRect(), bricks[i]-&gt;getImage());
    }
  }      
}

void Breakout::timerEvent(QTimerEvent *e) {
    
  Q_UNUSED(e);  
    
  moveObjects();
  checkCollision();
  repaint();
}

void Breakout::moveObjects() {

  ball-&gt;autoMove();
  paddle-&gt;move();
}

void Breakout::keyReleaseEvent(QKeyEvent *e) {
    
    int dx = 0;
    
    switch (e-&gt;key()) {
        case Qt::Key_Left:
            dx = 0;
            paddle-&gt;setDx(dx);        
            break;       
            
        case Qt::Key_Right:
            dx = 0;
            paddle-&gt;setDx(dx);        
            break;    
    }
}

void Breakout::keyPressEvent(QKeyEvent *e) {
    
    int dx = 0;
    
    switch (e-&gt;key()) {
    case Qt::Key_Left:
        
        dx = -1;
        paddle-&gt;setDx(dx);
        
        break;
       
    case Qt::Key_Right:
    
        dx = 1;
        paddle-&gt;setDx(dx);        
        break;
    
    case Qt::Key_P:
    
        pauseGame();
        break;
        
    case Qt::Key_Space:

        startGame();
        break;        
                
    case Qt::Key_Escape:
        
        qApp-&gt;exit();
        break;
        
    default:
        QWidget::keyPressEvent(e);
    }
}

void Breakout::startGame() {
     
  if (!gameStarted) {
    ball-&gt;resetState();
    paddle-&gt;resetState();

    for (int i=0; i&lt;N_OF_BRICKS; i++) {
      bricks[i]-&gt;setDestroyed(false);
    }
    
    gameOver = false; 
    gameWon = false; 
    gameStarted = true;
    timerId = startTimer(DELAY);  
  }      
}

void Breakout::pauseGame() {
    
  if (paused) {
      
    timerId = startTimer(DELAY);
    paused = false;
  } else {
      
    paused = true;
    killTimer(timerId); 
  }        
}

void Breakout::stopGame() {
    
  killTimer(timerId);    
  gameOver = true;      
  gameStarted = false;
}

void Breakout::victory() {
    
  killTimer(timerId);    
  gameWon = true;  
  gameStarted = false;    
}

void Breakout::checkCollision() {
  
  if (ball-&gt;getRect().bottom() &gt; BOTTOM_EDGE) {
    stopGame();
  }

  for (int i=0, j=0; i&lt;N_OF_BRICKS; i++) {
      
    if (bricks[i]-&gt;isDestroyed()) {
      j++;
    }
    
    if (j == N_OF_BRICKS) {
      victory();
    }
  }

  if ((ball-&gt;getRect()).intersects(paddle-&gt;getRect())) {

    int paddleLPos = paddle-&gt;getRect().left();  
    int ballLPos = ball-&gt;getRect().left();   

    int first = paddleLPos + 8;
    int second = paddleLPos + 16;
    int third = paddleLPos + 24;
    int fourth = paddleLPos + 32;

    if (ballLPos &lt; first) {
      ball-&gt;setXDir(-1);
      ball-&gt;setYDir(-1);
    }

    if (ballLPos &gt;= first &amp;&amp; ballLPos &lt; second) {
      ball-&gt;setXDir(-1);
      ball-&gt;setYDir(-1*ball-&gt;getYDir());
    }

    if (ballLPos &gt;= second &amp;&amp; ballLPos &lt; third) {
       ball-&gt;setXDir(0);
       ball-&gt;setYDir(-1);
    }

    if (ballLPos &gt;= third &amp;&amp; ballLPos &lt; fourth) {
       ball-&gt;setXDir(1);
       ball-&gt;setYDir(-1*ball-&gt;getYDir());
    }

    if (ballLPos &gt; fourth) {
      ball-&gt;setXDir(1);
      ball-&gt;setYDir(-1);
    }
  }      
 
  for (int i=0; i&lt;N_OF_BRICKS; i++) {
      
    if ((ball-&gt;getRect()).intersects(bricks[i]-&gt;getRect())) {

      int ballLeft = ball-&gt;getRect().left();  
      int ballHeight = ball-&gt;getRect().height(); 
      int ballWidth = ball-&gt;getRect().width();
      int ballTop = ball-&gt;getRect().top();  
  
      QPoint pointRight(ballLeft + ballWidth + 1, ballTop);
      QPoint pointLeft(ballLeft - 1, ballTop);  
      QPoint pointTop(ballLeft, ballTop -1);
      QPoint pointBottom(ballLeft, ballTop + ballHeight + 1);  

      if (!bricks[i]-&gt;isDestroyed()) {
        if(bricks[i]-&gt;getRect().contains(pointRight)) {
           ball-&gt;setXDir(-1);
        } 

        else if(bricks[i]-&gt;getRect().contains(pointLeft)) {
           ball-&gt;setXDir(1);
        } 

        if(bricks[i]-&gt;getRect().contains(pointTop)) {
           ball-&gt;setYDir(1);
        } 

        else if(bricks[i]-&gt;getRect().contains(pointBottom)) {
           ball-&gt;setYDir(-1);
        } 

        bricks[i]-&gt;setDestroyed(true);
      }
    }
  }
}

In the breakout.cpp file, we have the game logic. 

int k = 0;
for (int i=0; i&lt;5; i++) {
  for (int j=0; j&lt;6; j++) {
    bricks[k] = new Brick(j*40+30, i*10+50);
    k++; 
  }
}

In the constructor of the Breakout object, we instantiate thirty bricks. 

void Breakout::paintEvent(QPaintEvent *e) {
  
  Q_UNUSED(e);  
    
  QPainter painter(this);

  if (gameOver) {
  
    finishGame(&amp;painter, "Game lost");    

  } else if(gameWon) {

    finishGame(&amp;painter, "Victory");
  }
  else {
      
    drawObjects(&amp;painter);
  }
}

Depending on the gameOver and gameWon variables,
we either finish the game with a message or paint the game objects on 
the window.

void Breakout::finishGame(QPainter *painter, QString message) {
    
  QFont font("Courier", 15, QFont::DemiBold);
  QFontMetrics fm(font);
  int textWidth = fm.width(message);

  painter-&gt;setFont(font);
  int h = height();
  int w = width();

  painter-&gt;translate(QPoint(w/2, h/2));
  painter-&gt;drawText(-textWidth/2, 0, message);    
}

The finishGame method draws a final message in the 
center of the window. It is either "Game lost" or "Victory".
The QFontMetrics' width is used to 
compute the width of the string.

void Breakout::drawObjects(QPainter *painter) {
    
  painter-&gt;drawImage(ball-&gt;getRect(), ball-&gt;getImage());
  painter-&gt;drawImage(paddle-&gt;getRect(), paddle-&gt;getImage());

  for (int i=0; i&lt;N_OF_BRICKS; i++) {
    if (!bricks[i]-&gt;isDestroyed()) {
      painter-&gt;drawImage(bricks[i]-&gt;getRect(), bricks[i]-&gt;getImage());
    }
  }      
}

The drawObjects method draws all the objects of the game
on the window: the ball, the paddle, and the bricks. The objects
are represented by images and the drawImage method draws
them on the window.

void Breakout::timerEvent(QTimerEvent *e) {
    
  Q_UNUSED(e);  
    
  moveObjects();
  checkCollision();
  repaint();
}

In the timerEvent, we move the objects, check if the ball
collided with the paddle or a brick, and generate a paint event. 

void Breakout::moveObjects() {

  ball-&gt;autoMove();
  paddle-&gt;move();
}

The moveObjects method moves the ball and paddle objects.
Their own move method is being called.

void Breakout::keyReleaseEvent(QKeyEvent *e) {
    
    int dx = 0;
    
    switch (e-&gt;key()) {
        case Qt::Key_Left:
            dx = 0;
            paddle-&gt;setDx(dx);        
            break;       
            
        case Qt::Key_Right:
            dx = 0;
            paddle-&gt;setDx(dx);        
            break;    
    }
}

When the player releases the Left cursor key or the Right cursor key, 
we set the paddle's dx variable to zero. As a consequence, the paddle stops 
moving.

void Breakout::keyPressEvent(QKeyEvent *e) {
    
    int dx = 0;
    
    switch (e-&gt;key()) {
    case Qt::Key_Left:
        
        dx = -1;
        paddle-&gt;setDx(dx);
        
        break;
       
    case Qt::Key_Right:
    
        dx = 1;
        paddle-&gt;setDx(dx);        
        break;
    
    case Qt::Key_P:
    
        pauseGame();
        break;
        
    case Qt::Key_Space:

        startGame();
        break;        
                
    case Qt::Key_Escape:
        
        qApp-&gt;exit();
        break;
        
    default:
        QWidget::keyPressEvent(e);
    }
}

In the keyPressEvent method, we listen for key 
press events relevant to our game. The Left and Right cursor keys
move the paddle object. They set the dx variable, which 
is later added to the paddle's x coordinate. The P key pauses the game,
the Space key starts the game. The Esc key exits the application.

void Breakout::startGame() {
     
  if (!gameStarted) {
    ball-&gt;resetState();
    paddle-&gt;resetState();

    for (int i=0; i&lt;N_OF_BRICKS; i++) {
      bricks[i]-&gt;setDestroyed(false);
    }
    
    gameOver = false; 
    gameWon = false; 
    gameStarted = true;
    timerId = startTimer(DELAY);  
  }      
}

The startGame method resets the ball and paddle objects; they
are moved to their initial positions. In the for loop, we reset each brick's
destroyed flag to false, thus showing them all on the window.
The gameOver, gameWon, and gameStarted
variables get their initial boolean values. Finally, the timer is started with 
the startTimer method.

void Breakout::pauseGame() {
    
  if (paused) {
      
    timerId = startTimer(DELAY);
    paused = false;
  } else {
      
    paused = true;
    killTimer(timerId); 
  }        
}

The pauseGame is used to pause and start the paused game.
The state is controlled with the paused variable. We also
store the timer's Id. In order to pause the game, we kill the timer with 
the killTimer method. To restart it, we call the 
startTimer method.

void Breakout::stopGame() {
    
  killTimer(timerId);    
  gameOver = true;      
  gameStarted = false;
}

In the stopGame method, we kill the timer and set 
the appropriate flags. 

void Breakout::checkCollision() {
  
  if (ball-&gt;getRect().bottom() &gt; BOTTOM_EDGE) {
    stopGame();
  }
...
}

In the checkCollision method, we do the collision detection
for the game. The game is finished if the ball hits the bottom edge.

for (int i=0, j=0; i&lt;N_OF_BRICKS; i++) {
      
  if (bricks[i]-&gt;isDestroyed()) {
    j++;
  }
    
  if (j == N_OF_BRICKS) {
    victory();
  }
}

We check how many bricks are destroyed. If we destroyed all bricks, we win the game. 

if (ballLPos &lt; first) {
  ball-&gt;setXDir(-1);
  ball-&gt;setYDir(-1);
}

If the ball hits the first part of the paddle, we change the direction of 
the ball to north-west. 

if(bricks[i]-&gt;getRect().contains(pointTop)) {
  ball-&gt;setYDir(1);
} 

If the ball hits the bottom of the brick, we change the y direction of 
the ball; it goes down. 

main.cpp
  

#include &lt;QApplication&gt;
#include "breakout.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Breakout window;
  
  window.resize(300, 400);
  window.setWindowTitle("Breakout");
  window.show();

  return app.exec();
}

This is the main file.

![breakout.png](images/breakout.png)

Figure: The Breakout game

This was the Breakout game in Qt4. 

[Contents](..)
[Previous](../customwidget/)