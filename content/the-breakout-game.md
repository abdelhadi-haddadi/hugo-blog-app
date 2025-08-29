+++
title = "The Breakout game"
date = 2025-08-29T20:01:01.504+01:00
draft = false
description = "This part of the Java games tutorial presents the Breakout game."
image = "images/breakout.png"
imageBig = "images/breakout.png"
categories = ["javagames"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../snake/)
[Next](../tetris/)

# The Breakout game

last modified January 10, 2023 

In this part of the Java 2D games tutorial we create a simple
Breakout game clone. Source code and images can be found at the author's
Github [Java-Breakout-Game](https://github.com/janbodnar/Java-Breakout-Game) repository.

Breakout is an arcade game originally developed by Atari Inc.
The game was created in 1976.

## Development

In our game, we have one paddle, one ball and 30 bricks. I have created
an image for a ball, paddle and a brick in Inkscape. We use a timer
to create a game cycle. We do not work with angles, we simply change
directions. Top, bottom, left and right. I was inspired by the pybreakout
game. It was  developed in PyGame library by Nathan Dawson.

In this game, the player moves a paddle on the screen and bounces a ball or balls.
The objective is to destroy bricks in the top of the window.

The game consists of seven files: Commons.java, Sprite.java,
Ball.java, Paddle.java, Brick.java,
Board.java, and Breakout.java.

com/zetcode/Commons.java
  

package com.zetcode;

public interface Commons {

    int WIDTH = 300;
    int HEIGHT = 400;
    int BOTTOM_EDGE = 390;
    int N_OF_BRICKS = 30;
    int INIT_PADDLE_X = 200;
    int INIT_PADDLE_Y = 360;
    int INIT_BALL_X = 230;
    int INIT_BALL_Y = 355;
    int PERIOD = 10;
}

The Commons.java file has some common constants. The WIDTH
and HEIGHT constants store the dimensions of the board. When
the ball passes the BOTTOM_EDGE, the game is over. The N_OF_BRICKS
is the number of bricks in the game. The INIT_PADDLE_X and INIT_PADDLE_Y
are initial coordinates of the paddle object. The INIT_BALL_X and INIT_BALL_Y
are initial coordinates of the ball object. The DELAY is the initial delay in milliseconds
before task is to be executed and the PERIOD is the time in milliseconds between
successive task executions that form game cycles.

com/zetcode/Sprite.java
  

package com.zetcode;

import java.awt.Image;
import java.awt.Rectangle;

public class Sprite {

    int x;
    int y;
    int imageWidth;
    int imageHeight;
    Image image;

    protected void setX(int x) {

        this.x = x;
    }

    int getX() {

        return x;
    }

    protected void setY(int y) {

        this.y = y;
    }

    int getY() {

        return y;
    }

    int getImageWidth() {

        return imageWidth;
    }

    int getImageHeight() {

        return imageHeight;
    }

    Image getImage() {

        return image;
    }

    Rectangle getRect() {

        return new Rectangle(x, y,
                image.getWidth(null), image.getHeight(null));
    }

    void getImageDimensions() {

        imageWidth = image.getWidth(null);
        imageHeight = image.getHeight(null);
    }
}

The Sprite class is a base class for all objects in the
Board. We put here all methods and variables that are in
Ball, Brick, and Paddle objects, like
getImage() or getX() methods.

com/zetcode/Brick.java
  

package com.zetcode;

import javax.swing.ImageIcon;

public class Brick extends Sprite {

    private boolean destroyed;

    public Brick(int x, int y) {

        initBrick(x, y);
    }

    private void initBrick(int x, int y) {

        this.x = x;
        this.y = y;

        destroyed = false;

        loadImage();
        getImageDimensions();
    }

    private void loadImage() {

        var ii = new ImageIcon("src/resources/brick.png");
        image = ii.getImage();
    }

    boolean isDestroyed() {

        return destroyed;
    }

    void setDestroyed(boolean val) {

        destroyed = val;
    }
}

This is the Brick class.

private boolean destroyed;

In the destroyed variable we keep the state of a brick.

com/zetcode/Ball.java
  

package com.zetcode;

import javax.swing.ImageIcon;

public class Ball extends Sprite {

    private int xdir;
    private int ydir;

    public Ball() {

        initBall();
    }

    private void initBall() {

        xdir = 1;
        ydir = -1;

        loadImage();
        getImageDimensions();
        resetState();
    }

    private void loadImage() {

        var ii = new ImageIcon("src/resources/ball.png");
        image = ii.getImage();
    }

    void move() {

        x += xdir;
        y += ydir;

        if (x == 0) {

            setXDir(1);
        }

        if (x == Commons.WIDTH - imageWidth) {

            System.out.println(imageWidth);
            setXDir(-1);
        }

        if (y == 0) {

            setYDir(1);
        }
    }

    private void resetState() {

        x = Commons.INIT_BALL_X;
        y = Commons.INIT_BALL_Y;
    }

    void setXDir(int x) {

        xdir = x;
    }

    void setYDir(int y) {

        ydir = y;
    }

    int getYDir() {

        return ydir;
    }
}

This is the Ball class.

void move() {

    x += xdir;
    y += ydir;

    if (x == 0) {

        setXDir(1);
    }

    if (x == Commons.WIDTH - imageWidth) {

        System.out.println(imageWidth);
        setXDir(-1);
    }

    if (y == 0) {

        setYDir(1);
    }
}

The move() method moves the ball on the Board. If the
ball hits the borders, the directions are changed accordingly.

void setXDir(int x) {

    xdir = x;
}

void setYDir(int y) {

    ydir = y;
}

These two methods are called when the ball hits the paddle or a brick.

com/zetcode/Paddle.java
  

package com.zetcode;

import java.awt.event.KeyEvent;
import javax.swing.ImageIcon;

public class Paddle extends Sprite  {

    private int dx;

    public Paddle() {

        initPaddle();
    }

    private void initPaddle() {

        loadImage();
        getImageDimensions();

        resetState();
    }

    private void loadImage() {

        var ii = new ImageIcon("src/resources/paddle.png");
        image = ii.getImage();
    }

    void move() {

        x += dx;

        if (x &lt;= 0) {

            x = 0;
        }

        if (x &gt;= Commons.WIDTH - imageWidth) {

            x = Commons.WIDTH - imageWidth;
        }
    }

    void keyPressed(KeyEvent e) {

        int key = e.getKeyCode();

        if (key == KeyEvent.VK_LEFT) {

            dx = -1;
        }

        if (key == KeyEvent.VK_RIGHT) {

            dx = 1;
        }
    }

    void keyReleased(KeyEvent e) {

        int key = e.getKeyCode();

        if (key == KeyEvent.VK_LEFT) {

            dx = 0;
        }

        if (key == KeyEvent.VK_RIGHT) {

            dx = 0;
        }
    }

    private void resetState() {

        x = Commons.INIT_PADDLE_X;
        y = Commons.INIT_PADDLE_Y;
    }
}

This is the Paddle class. It encapsulates the paddle object in
the Breakout game. The paddle is controlled with left and right arrow keys.
By pressing the arrow key, we set the direction variable. By releasing the
arrow key, we set the dx variable to zero. This way the paddle
stops moving.

 

void move() {

    x += dx;

    if (x &lt;= 0) {

        x = 0;
    }

    if (x &gt;= Commons.WIDTH - imageWidth) {

        x = Commons.WIDTH - imageWidth;
    }
}

The paddle moves only in the horizontal direction, so we only update the x
coordinate. The if conditions ensure that the paddle does not pass the window
edges.

com/zetcode/Board.java
  

package com.zetcode;

import javax.swing.JPanel;
import javax.swing.Timer;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.RenderingHints;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

public class Board extends JPanel {

    private Timer timer;
    private String message = "Game Over";
    private Ball ball;
    private Paddle paddle;
    private Brick[] bricks;
    private boolean inGame = true;

    public Board() {

        initBoard();
    }

    private void initBoard() {

        addKeyListener(new TAdapter());
        setFocusable(true);
        setPreferredSize(new Dimension(Commons.WIDTH, Commons.HEIGHT));

        gameInit();
    }

    private void gameInit() {

        bricks = new Brick[Commons.N_OF_BRICKS];

        ball = new Ball();
        paddle = new Paddle();

        int k = 0;

        for (int i = 0; i &lt; 5; i++) {

            for (int j = 0; j &lt; 6; j++) {

                bricks[k] = new Brick(j * 40 + 30, i * 10 + 50);
                k++;
            }
        }

        timer = new Timer(Commons.PERIOD, new GameCycle());
        timer.start();
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        var g2d = (Graphics2D) g;

        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        g2d.setRenderingHint(RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY);

        if (inGame) {

            drawObjects(g2d);
        } else {

            gameFinished(g2d);
        }

        Toolkit.getDefaultToolkit().sync();
    }

    private void drawObjects(Graphics2D g2d) {

        g2d.drawImage(ball.getImage(), ball.getX(), ball.getY(),
                ball.getImageWidth(), ball.getImageHeight(), this);
        g2d.drawImage(paddle.getImage(), paddle.getX(), paddle.getY(),
                paddle.getImageWidth(), paddle.getImageHeight(), this);

        for (int i = 0; i &lt; Commons.N_OF_BRICKS; i++) {

            if (!bricks[i].isDestroyed()) {

                g2d.drawImage(bricks[i].getImage(), bricks[i].getX(),
                        bricks[i].getY(), bricks[i].getImageWidth(),
                        bricks[i].getImageHeight(), this);
            }
        }
    }

    private void gameFinished(Graphics2D g2d) {

        var font = new Font("Verdana", Font.BOLD, 18);
        FontMetrics fontMetrics = this.getFontMetrics(font);

        g2d.setColor(Color.BLACK);
        g2d.setFont(font);
        g2d.drawString(message,
                (Commons.WIDTH - fontMetrics.stringWidth(message)) / 2,
                Commons.WIDTH / 2);
    }

    private class TAdapter extends KeyAdapter {

        @Override
        public void keyReleased(KeyEvent e) {

            paddle.keyReleased(e);
        }

        @Override
        public void keyPressed(KeyEvent e) {

            paddle.keyPressed(e);
        }
    }

    private class GameCycle implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {

            doGameCycle();
        }
    }

    private void doGameCycle() {

        ball.move();
        paddle.move();
        checkCollision();
        repaint();
    }

    private void stopGame() {

        inGame = false;
        timer.stop();
    }

    private void checkCollision() {

        if (ball.getRect().getMaxY() &gt; Commons.BOTTOM_EDGE) {

            stopGame();
        }

        for (int i = 0, j = 0; i &lt; Commons.N_OF_BRICKS; i++) {

            if (bricks[i].isDestroyed()) {

                j++;
            }

            if (j == Commons.N_OF_BRICKS) {

                message = "Victory";
                stopGame();
            }
        }

        if ((ball.getRect()).intersects(paddle.getRect())) {

            int paddleLPos = (int) paddle.getRect().getMinX();
            int ballLPos = (int) ball.getRect().getMinX();

            int first = paddleLPos + 8;
            int second = paddleLPos + 16;
            int third = paddleLPos + 24;
            int fourth = paddleLPos + 32;

            if (ballLPos &lt; first) {

                ball.setXDir(-1);
                ball.setYDir(-1);
            }

            if (ballLPos &gt;= first &amp;&amp; ballLPos &lt; second) {

                ball.setXDir(-1);
                ball.setYDir(-1 * ball.getYDir());
            }

            if (ballLPos &gt;= second &amp;&amp; ballLPos &lt; third) {

                ball.setXDir(0);
                ball.setYDir(-1);
            }

            if (ballLPos &gt;= third &amp;&amp; ballLPos &lt; fourth) {

                ball.setXDir(1);
                ball.setYDir(-1 * ball.getYDir());
            }

            if (ballLPos &gt; fourth) {

                ball.setXDir(1);
                ball.setYDir(-1);
            }
        }

        for (int i = 0; i &lt; Commons.N_OF_BRICKS; i++) {

            if ((ball.getRect()).intersects(bricks[i].getRect())) {

                int ballLeft = (int) ball.getRect().getMinX();
                int ballHeight = (int) ball.getRect().getHeight();
                int ballWidth = (int) ball.getRect().getWidth();
                int ballTop = (int) ball.getRect().getMinY();

                var pointRight = new Point(ballLeft + ballWidth + 1, ballTop);
                var pointLeft = new Point(ballLeft - 1, ballTop);
                var pointTop = new Point(ballLeft, ballTop - 1);
                var pointBottom = new Point(ballLeft, ballTop + ballHeight + 1);

                if (!bricks[i].isDestroyed()) {

                    if (bricks[i].getRect().contains(pointRight)) {

                        ball.setXDir(-1);
                    } else if (bricks[i].getRect().contains(pointLeft)) {

                        ball.setXDir(1);
                    }

                    if (bricks[i].getRect().contains(pointTop)) {

                        ball.setYDir(1);
                    } else if (bricks[i].getRect().contains(pointBottom)) {

                        ball.setYDir(-1);
                    }

                    bricks[i].setDestroyed(true);
                }
            }
        }
    }
}

This is the Board class. Here we put the game logic.

private void gameInit() {

    bricks = new Brick[Commons.N_OF_BRICKS];

    ball = new Ball();
    paddle = new Paddle();

    int k = 0;

    for (int i = 0; i &lt; 5; i++) {

        for (int j = 0; j &lt; 6; j++) {

            bricks[k] = new Brick(j * 40 + 30, i * 10 + 50);
            k++;
        }
    }

    timer = new Timer(Commons.PERIOD, new GameCycle());
    timer.start();
}

In the gameInit() method we create a ball, a paddle, and thirty bricks.
Then we create and start a timer.

if (inGame) {

    drawObjects(g2d);
} else {

    gameFinished(g2d);
}

Depending on the inGame variable, we either draw all the objects
in the drawObjects() method or finish the game with the
gameFinished() method.

private void drawObjects(Graphics2D g2d) {

    g2d.drawImage(ball.getImage(), ball.getX(), ball.getY(),
            ball.getImageWidth(), ball.getImageHeight(), this);
    g2d.drawImage(paddle.getImage(), paddle.getX(), paddle.getY(),
            paddle.getImageWidth(), paddle.getImageHeight(), this);

    for (int i = 0; i &lt; Commons.N_OF_BRICKS; i++) {

        if (!bricks[i].isDestroyed()) {

            g2d.drawImage(bricks[i].getImage(), bricks[i].getX(),
                    bricks[i].getY(), bricks[i].getImageWidth(),
                    bricks[i].getImageHeight(), this);
        }
    }
}

The drawObjects() method draws all the objects of the game.
The sprites are drawn with the drawImage() method.

private void gameFinished(Graphics2D g2d) {

    var font = new Font("Verdana", Font.BOLD, 18);
    FontMetrics fontMetrics = this.getFontMetrics(font);

    g2d.setColor(Color.BLACK);
    g2d.setFont(font);
    g2d.drawString(message,
            (Commons.WIDTH - fontMetrics.stringWidth(message)) / 2,
            Commons.WIDTH / 2);
}

The gameFinished() method draws "Game over" or "Victory"
to the middle of the window.

private class GameCycle implements ActionListener {

    @Override
    public void actionPerformed(ActionEvent e) {

        doGameCycle();
    }
}

The timer periodically calls the actionPerformed() method,
which calls the doGameCycle() method, creating a game cycle.

private void doGameCycle() {

    ball.move();
    paddle.move();
    checkCollision();
    repaint();
}

The doGameCycle() moves the ball and the paddle.
We check for possible collisions and repaint the screen.

private void checkCollision() {

    if (ball.getRect().getMaxY() &gt; Commons.BOTTOM_EDGE) {

        stopGame();
    }
...

If the ball hits the bottom, we stop the game.

for (int i = 0, j = 0; i &lt; Commons.N_OF_BRICKS; i++) {

    if (bricks[i].isDestroyed()) {

        j++;
    }

    if (j == Commons.N_OF_BRICKS) {

        message = "Victory";
        stopGame();
    }
}

We check how many bricks are destroyed. If we destroyed all
N_OF_BRICKS bricks, we win the game.

if (ballLPos &lt; first) {

    ball.setXDir(-1);
    ball.setYDir(-1);
}

If the ball hits the first part of the paddle, we change the direction
of the ball to the north-west.

if (bricks[i].getRect().contains(pointTop)) {

    ball.setYDir(1);
}...

If the ball hits the bottom of the brick, we change the y direction
of the ball; it goes down.

com/zetcode/Breakout.java
  

package com.zetcode;

import javax.swing.JFrame;
import java.awt.EventQueue;

public class Breakout extends JFrame {

    public Breakout() {

        initUI();
    }

    private void initUI() {

        add(new Board());
        setTitle("Breakout");

        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setResizable(false);
        pack();
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {

            var game = new Breakout();
            game.setVisible(true);
        });
    }
}

This is the Breakout class which has the main
entry method.

![breakout.png](images/breakout.png)

Figure: The Breakout game

This was the Breakout game.

[Contents](..)
[Previous](../snake/)
[Next](../tetris/)