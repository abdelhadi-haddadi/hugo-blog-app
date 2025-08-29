+++
title = "Java Pacman"
date = 2025-08-29T20:01:02.776+01:00
draft = false
description = "Java games Pacman chapter shows how to create Pacman game clone in Java."
image = "images/pacman.png"
imageBig = "images/pacman.png"
categories = ["javagames"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../tetris/)
[Next](../spaceinvaders/)

# Java Pacman

last modified January 10, 2023 

In this part of the Java 2D games tutorial we create a simple Pacman game clone.
Source code and images can be found at the author's Github 
[Java-Pacman-Game](https://github.com/janbodnar/Java-Pacman-Game) repository. 

Pacman is an arcade game originally developed by a Japanese company 
*Namco* in 1980. Pacman became one of the most popular arcade 
games ever created. 

## Development

The following code example is a remake of a Pacman game by Brian Postma available 
at [http://www.brianpostma.com](http://www.brianpostma.com/java.html). 
The code is modified and simplified so that it is easier to understand.

 

The goal of the game is to collect all the points in the maze and avoid the ghosts. 
The Pacman is animated in two ways: his position in the maze and his body. We animate 
his body with four images, depending on the direction. The animation is used to create 
the illusion of Pacman opening and closing his mouth. The maze consists of 15x15 squares.
The structure of the maze is based on a simple array of integers. Pacman has three lives. 
We also count the score. 

The game consists of two files: Board.java and Pacman.java.

com/zetcode/Board.java
  

package com.zetcode;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

import javax.swing.ImageIcon;
import javax.swing.JPanel;
import javax.swing.Timer;

public class Board extends JPanel implements ActionListener {

    private Dimension d;
    private final Font smallFont = new Font("Helvetica", Font.BOLD, 14);

    private Image ii;
    private final Color dotColor = new Color(192, 192, 0);
    private Color mazeColor;

    private boolean inGame = false;
    private boolean dying = false;

    private final int BLOCK_SIZE = 24;
    private final int N_BLOCKS = 15;
    private final int SCREEN_SIZE = N_BLOCKS * BLOCK_SIZE;
    private final int PAC_ANIM_DELAY = 2;
    private final int PACMAN_ANIM_COUNT = 4;
    private final int MAX_GHOSTS = 12;
    private final int PACMAN_SPEED = 6;

    private int pacAnimCount = PAC_ANIM_DELAY;
    private int pacAnimDir = 1;
    private int pacmanAnimPos = 0;
    private int N_GHOSTS = 6;
    private int pacsLeft, score;
    private int[] dx, dy;
    private int[] ghost_x, ghost_y, ghost_dx, ghost_dy, ghostSpeed;

    private Image ghost;
    private Image pacman1, pacman2up, pacman2left, pacman2right, pacman2down;
    private Image pacman3up, pacman3down, pacman3left, pacman3right;
    private Image pacman4up, pacman4down, pacman4left, pacman4right;

    private int pacman_x, pacman_y, pacmand_x, pacmand_y;
    private int req_dx, req_dy, view_dx, view_dy;

    private final short levelData[] = {
        19, 26, 26, 26, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 22,
        21, 0, 0, 0, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 20,
        21, 0, 0, 0, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 20,
        21, 0, 0, 0, 17, 16, 16, 24, 16, 16, 16, 16, 16, 16, 20,
        17, 18, 18, 18, 16, 16, 20, 0, 17, 16, 16, 16, 16, 16, 20,
        17, 16, 16, 16, 16, 16, 20, 0, 17, 16, 16, 16, 16, 24, 20,
        25, 16, 16, 16, 24, 24, 28, 0, 25, 24, 24, 16, 20, 0, 21,
        1, 17, 16, 20, 0, 0, 0, 0, 0, 0, 0, 17, 20, 0, 21,
        1, 17, 16, 16, 18, 18, 22, 0, 19, 18, 18, 16, 20, 0, 21,
        1, 17, 16, 16, 16, 16, 20, 0, 17, 16, 16, 16, 20, 0, 21,
        1, 17, 16, 16, 16, 16, 20, 0, 17, 16, 16, 16, 20, 0, 21,
        1, 17, 16, 16, 16, 16, 16, 18, 16, 16, 16, 16, 20, 0, 21,
        1, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 20, 0, 21,
        1, 25, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 18, 20,
        9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 25, 24, 24, 24, 28
    };

    private final int validSpeeds[] = {1, 2, 3, 4, 6, 8};
    private final int maxSpeed = 6;

    private int currentSpeed = 3;
    private short[] screenData;
    private Timer timer;

    public Board() {

        loadImages();
        initVariables();
        initBoard();
    }
    
    private void initBoard() {
        
        addKeyListener(new TAdapter());

        setFocusable(true);

        setBackground(Color.black);
    }

    private void initVariables() {

        screenData = new short[N_BLOCKS * N_BLOCKS];
        mazeColor = new Color(5, 100, 5);
        d = new Dimension(400, 400);
        ghost_x = new int[MAX_GHOSTS];
        ghost_dx = new int[MAX_GHOSTS];
        ghost_y = new int[MAX_GHOSTS];
        ghost_dy = new int[MAX_GHOSTS];
        ghostSpeed = new int[MAX_GHOSTS];
        dx = new int[4];
        dy = new int[4];
        
        timer = new Timer(40, this);
        timer.start();
    }

    @Override
    public void addNotify() {
        super.addNotify();

        initGame();
    }

    private void doAnim() {

        pacAnimCount--;

        if (pacAnimCount &lt;= 0) {
            pacAnimCount = PAC_ANIM_DELAY;
            pacmanAnimPos = pacmanAnimPos + pacAnimDir;

            if (pacmanAnimPos == (PACMAN_ANIM_COUNT - 1) || pacmanAnimPos == 0) {
                pacAnimDir = -pacAnimDir;
            }
        }
    }

    private void playGame(Graphics2D g2d) {

        if (dying) {

            death();

        } else {

            movePacman();
            drawPacman(g2d);
            moveGhosts(g2d);
            checkMaze();
        }
    }

    private void showIntroScreen(Graphics2D g2d) {

        g2d.setColor(new Color(0, 32, 48));
        g2d.fillRect(50, SCREEN_SIZE / 2 - 30, SCREEN_SIZE - 100, 50);
        g2d.setColor(Color.white);
        g2d.drawRect(50, SCREEN_SIZE / 2 - 30, SCREEN_SIZE - 100, 50);

        String s = "Press s to start.";
        Font small = new Font("Helvetica", Font.BOLD, 14);
        FontMetrics metr = this.getFontMetrics(small);

        g2d.setColor(Color.white);
        g2d.setFont(small);
        g2d.drawString(s, (SCREEN_SIZE - metr.stringWidth(s)) / 2, SCREEN_SIZE / 2);
    }

    private void drawScore(Graphics2D g) {

        int i;
        String s;

        g.setFont(smallFont);
        g.setColor(new Color(96, 128, 255));
        s = "Score: " + score;
        g.drawString(s, SCREEN_SIZE / 2 + 96, SCREEN_SIZE + 16);

        for (i = 0; i &lt; pacsLeft; i++) {
            g.drawImage(pacman3left, i * 28 + 8, SCREEN_SIZE + 1, this);
        }
    }

    private void checkMaze() {

        short i = 0;
        boolean finished = true;

        while (i &lt; N_BLOCKS * N_BLOCKS &amp;&amp; finished) {

            if ((screenData[i] &amp; 48) != 0) {
                finished = false;
            }

            i++;
        }

        if (finished) {

            score += 50;

            if (N_GHOSTS &lt; MAX_GHOSTS) {
                N_GHOSTS++;
            }

            if (currentSpeed &lt; maxSpeed) {
                currentSpeed++;
            }

            initLevel();
        }
    }

    private void death() {

        pacsLeft--;

        if (pacsLeft == 0) {
            inGame = false;
        }

        continueLevel();
    }

    private void moveGhosts(Graphics2D g2d) {

        short i;
        int pos;
        int count;

        for (i = 0; i &lt; N_GHOSTS; i++) {
            if (ghost_x[i] % BLOCK_SIZE == 0 &amp;&amp; ghost_y[i] % BLOCK_SIZE == 0) {
                pos = ghost_x[i] / BLOCK_SIZE + N_BLOCKS * (int) (ghost_y[i] / BLOCK_SIZE);

                count = 0;

                if ((screenData[pos] &amp; 1) == 0 &amp;&amp; ghost_dx[i] != 1) {
                    dx[count] = -1;
                    dy[count] = 0;
                    count++;
                }

                if ((screenData[pos] &amp; 2) == 0 &amp;&amp; ghost_dy[i] != 1) {
                    dx[count] = 0;
                    dy[count] = -1;
                    count++;
                }

                if ((screenData[pos] &amp; 4) == 0 &amp;&amp; ghost_dx[i] != -1) {
                    dx[count] = 1;
                    dy[count] = 0;
                    count++;
                }

                if ((screenData[pos] &amp; 8) == 0 &amp;&amp; ghost_dy[i] != -1) {
                    dx[count] = 0;
                    dy[count] = 1;
                    count++;
                }

                if (count == 0) {

                    if ((screenData[pos] &amp; 15) == 15) {
                        ghost_dx[i] = 0;
                        ghost_dy[i] = 0;
                    } else {
                        ghost_dx[i] = -ghost_dx[i];
                        ghost_dy[i] = -ghost_dy[i];
                    }

                } else {

                    count = (int) (Math.random() * count);

                    if (count &gt; 3) {
                        count = 3;
                    }

                    ghost_dx[i] = dx[count];
                    ghost_dy[i] = dy[count];
                }

            }

            ghost_x[i] = ghost_x[i] + (ghost_dx[i] * ghostSpeed[i]);
            ghost_y[i] = ghost_y[i] + (ghost_dy[i] * ghostSpeed[i]);
            drawGhost(g2d, ghost_x[i] + 1, ghost_y[i] + 1);

            if (pacman_x &gt; (ghost_x[i] - 12) &amp;&amp; pacman_x &lt; (ghost_x[i] + 12)
                    &amp;&amp; pacman_y &gt; (ghost_y[i] - 12) &amp;&amp; pacman_y &lt; (ghost_y[i] + 12)
                    &amp;&amp; inGame) {

                dying = true;
            }
        }
    }

    private void drawGhost(Graphics2D g2d, int x, int y) {

        g2d.drawImage(ghost, x, y, this);
    }

    private void movePacman() {

        int pos;
        short ch;

        if (req_dx == -pacmand_x &amp;&amp; req_dy == -pacmand_y) {
            pacmand_x = req_dx;
            pacmand_y = req_dy;
            view_dx = pacmand_x;
            view_dy = pacmand_y;
        }

        if (pacman_x % BLOCK_SIZE == 0 &amp;&amp; pacman_y % BLOCK_SIZE == 0) {
            pos = pacman_x / BLOCK_SIZE + N_BLOCKS * (int) (pacman_y / BLOCK_SIZE);
            ch = screenData[pos];

            if ((ch &amp; 16) != 0) {
                screenData[pos] = (short) (ch &amp; 15);
                score++;
            }

            if (req_dx != 0 || req_dy != 0) {
                if (!((req_dx == -1 &amp;&amp; req_dy == 0 &amp;&amp; (ch &amp; 1) != 0)
                        || (req_dx == 1 &amp;&amp; req_dy == 0 &amp;&amp; (ch &amp; 4) != 0)
                        || (req_dx == 0 &amp;&amp; req_dy == -1 &amp;&amp; (ch &amp; 2) != 0)
                        || (req_dx == 0 &amp;&amp; req_dy == 1 &amp;&amp; (ch &amp; 8) != 0))) {
                    pacmand_x = req_dx;
                    pacmand_y = req_dy;
                    view_dx = pacmand_x;
                    view_dy = pacmand_y;
                }
            }

            // Check for standstill
            if ((pacmand_x == -1 &amp;&amp; pacmand_y == 0 &amp;&amp; (ch &amp; 1) != 0)
                    || (pacmand_x == 1 &amp;&amp; pacmand_y == 0 &amp;&amp; (ch &amp; 4) != 0)
                    || (pacmand_x == 0 &amp;&amp; pacmand_y == -1 &amp;&amp; (ch &amp; 2) != 0)
                    || (pacmand_x == 0 &amp;&amp; pacmand_y == 1 &amp;&amp; (ch &amp; 8) != 0)) {
                pacmand_x = 0;
                pacmand_y = 0;
            }
        }
        pacman_x = pacman_x + PACMAN_SPEED * pacmand_x;
        pacman_y = pacman_y + PACMAN_SPEED * pacmand_y;
    }

    private void drawPacman(Graphics2D g2d) {

        if (view_dx == -1) {
            drawPacnanLeft(g2d);
        } else if (view_dx == 1) {
            drawPacmanRight(g2d);
        } else if (view_dy == -1) {
            drawPacmanUp(g2d);
        } else {
            drawPacmanDown(g2d);
        }
    }

    private void drawPacmanUp(Graphics2D g2d) {

        switch (pacmanAnimPos) {
            case 1:
                g2d.drawImage(pacman2up, pacman_x + 1, pacman_y + 1, this);
                break;
            case 2:
                g2d.drawImage(pacman3up, pacman_x + 1, pacman_y + 1, this);
                break;
            case 3:
                g2d.drawImage(pacman4up, pacman_x + 1, pacman_y + 1, this);
                break;
            default:
                g2d.drawImage(pacman1, pacman_x + 1, pacman_y + 1, this);
                break;
        }
    }

    private void drawPacmanDown(Graphics2D g2d) {

        switch (pacmanAnimPos) {
            case 1:
                g2d.drawImage(pacman2down, pacman_x + 1, pacman_y + 1, this);
                break;
            case 2:
                g2d.drawImage(pacman3down, pacman_x + 1, pacman_y + 1, this);
                break;
            case 3:
                g2d.drawImage(pacman4down, pacman_x + 1, pacman_y + 1, this);
                break;
            default:
                g2d.drawImage(pacman1, pacman_x + 1, pacman_y + 1, this);
                break;
        }
    }

    private void drawPacnanLeft(Graphics2D g2d) {

        switch (pacmanAnimPos) {
            case 1:
                g2d.drawImage(pacman2left, pacman_x + 1, pacman_y + 1, this);
                break;
            case 2:
                g2d.drawImage(pacman3left, pacman_x + 1, pacman_y + 1, this);
                break;
            case 3:
                g2d.drawImage(pacman4left, pacman_x + 1, pacman_y + 1, this);
                break;
            default:
                g2d.drawImage(pacman1, pacman_x + 1, pacman_y + 1, this);
                break;
        }
    }

    private void drawPacmanRight(Graphics2D g2d) {

        switch (pacmanAnimPos) {
            case 1:
                g2d.drawImage(pacman2right, pacman_x + 1, pacman_y + 1, this);
                break;
            case 2:
                g2d.drawImage(pacman3right, pacman_x + 1, pacman_y + 1, this);
                break;
            case 3:
                g2d.drawImage(pacman4right, pacman_x + 1, pacman_y + 1, this);
                break;
            default:
                g2d.drawImage(pacman1, pacman_x + 1, pacman_y + 1, this);
                break;
        }
    }

    private void drawMaze(Graphics2D g2d) {

        short i = 0;
        int x, y;

        for (y = 0; y &lt; SCREEN_SIZE; y += BLOCK_SIZE) {
            for (x = 0; x &lt; SCREEN_SIZE; x += BLOCK_SIZE) {

                g2d.setColor(mazeColor);
                g2d.setStroke(new BasicStroke(2));

                if ((screenData[i] &amp; 1) != 0) { 
                    g2d.drawLine(x, y, x, y + BLOCK_SIZE - 1);
                }

                if ((screenData[i] &amp; 2) != 0) { 
                    g2d.drawLine(x, y, x + BLOCK_SIZE - 1, y);
                }

                if ((screenData[i] &amp; 4) != 0) { 
                    g2d.drawLine(x + BLOCK_SIZE - 1, y, x + BLOCK_SIZE - 1,
                            y + BLOCK_SIZE - 1);
                }

                if ((screenData[i] &amp; 8) != 0) { 
                    g2d.drawLine(x, y + BLOCK_SIZE - 1, x + BLOCK_SIZE - 1,
                            y + BLOCK_SIZE - 1);
                }

                if ((screenData[i] &amp; 16) != 0) { 
                    g2d.setColor(dotColor);
                    g2d.fillRect(x + 11, y + 11, 2, 2);
                }

                i++;
            }
        }
    }

    private void initGame() {

        pacsLeft = 3;
        score = 0;
        initLevel();
        N_GHOSTS = 6;
        currentSpeed = 3;
    }

    private void initLevel() {

        int i;
        for (i = 0; i &lt; N_BLOCKS * N_BLOCKS; i++) {
            screenData[i] = levelData[i];
        }

        continueLevel();
    }

    private void continueLevel() {

        short i;
        int dx = 1;
        int random;

        for (i = 0; i &lt; N_GHOSTS; i++) {

            ghost_y[i] = 4 * BLOCK_SIZE;
            ghost_x[i] = 4 * BLOCK_SIZE;
            ghost_dy[i] = 0;
            ghost_dx[i] = dx;
            dx = -dx;
            random = (int) (Math.random() * (currentSpeed + 1));

            if (random &gt; currentSpeed) {
                random = currentSpeed;
            }

            ghostSpeed[i] = validSpeeds[random];
        }

        pacman_x = 7 * BLOCK_SIZE;
        pacman_y = 11 * BLOCK_SIZE;
        pacmand_x = 0;
        pacmand_y = 0;
        req_dx = 0;
        req_dy = 0;
        view_dx = -1;
        view_dy = 0;
        dying = false;
    }

    private void loadImages() {

        ghost = new ImageIcon("images/ghost.png").getImage();
        pacman1 = new ImageIcon("images/pacman.png").getImage();
        pacman2up = new ImageIcon("images/up1.png").getImage();
        pacman3up = new ImageIcon("images/up2.png").getImage();
        pacman4up = new ImageIcon("images/up3.png").getImage();
        pacman2down = new ImageIcon("images/down1.png").getImage();
        pacman3down = new ImageIcon("images/down2.png").getImage();
        pacman4down = new ImageIcon("images/down3.png").getImage();
        pacman2left = new ImageIcon("images/left1.png").getImage();
        pacman3left = new ImageIcon("images/left2.png").getImage();
        pacman4left = new ImageIcon("images/left3.png").getImage();
        pacman2right = new ImageIcon("images/right1.png").getImage();
        pacman3right = new ImageIcon("images/right2.png").getImage();
        pacman4right = new ImageIcon("images/right3.png").getImage();

    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        doDrawing(g);
    }

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;

        g2d.setColor(Color.black);
        g2d.fillRect(0, 0, d.width, d.height);

        drawMaze(g2d);
        drawScore(g2d);
        doAnim();

        if (inGame) {
            playGame(g2d);
        } else {
            showIntroScreen(g2d);
        }

        g2d.drawImage(ii, 5, 5, this);
        Toolkit.getDefaultToolkit().sync();
        g2d.dispose();
    }

    class TAdapter extends KeyAdapter {

        @Override
        public void keyPressed(KeyEvent e) {

            int key = e.getKeyCode();

            if (inGame) {
                if (key == KeyEvent.VK_LEFT) {
                    req_dx = -1;
                    req_dy = 0;
                } else if (key == KeyEvent.VK_RIGHT) {
                    req_dx = 1;
                    req_dy = 0;
                } else if (key == KeyEvent.VK_UP) {
                    req_dx = 0;
                    req_dy = -1;
                } else if (key == KeyEvent.VK_DOWN) {
                    req_dx = 0;
                    req_dy = 1;
                } else if (key == KeyEvent.VK_ESCAPE &amp;&amp; timer.isRunning()) {
                    inGame = false;
                } else if (key == KeyEvent.VK_PAUSE) {
                    if (timer.isRunning()) {
                        timer.stop();
                    } else {
                        timer.start();
                    }
                }
            } else {
                if (key == 's' || key == 'S') {
                    inGame = true;
                    initGame();
                }
            }
        }

        @Override
        public void keyReleased(KeyEvent e) {

            int key = e.getKeyCode();

            if (key == Event.LEFT || key == Event.RIGHT
                    || key == Event.UP || key == Event.DOWN) {
                req_dx = 0;
                req_dy = 0;
            }
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        repaint();
    }
}

The Pacman is controlled with the cursor keys. The Esc key finishes the game, 
the Pause key pauses it. 

 

private int pacman_x, pacman_y, pacmand_x, pacmand_y;

The first two variables store the x and y coordinates of the Pacman sprite.
The last two variables are the delta changes in horizontal and vertical
directions.

private final short levelData[] = {
    19, 26, 26, 26, 18, 18, 18, 18, ...
};

These numbers make up the maze. They provide information out 
of which we create the corners and the points. Number 1 is a left
corner. Numbers 2, 4 and 8 represent top, right, and bottom corners
respectively. Number 16 is a point. These numbers can be added, for example number 
19 in the upper left corner means that the square will have 
top and left borders and a point (16 + 2 + 1).

private void doAnim() {

    pacAnimCount--;

    if (pacAnimCount &lt;= 0) {
        pacAnimCount = PAC_ANIM_DELAY;
        pacmanAnimPos = pacmanAnimPos + pacAnimDir;

        if (pacmanAnimPos == (PACMAN_ANIM_COUNT - 1) || pacmanAnimPos == 0) {
            pacAnimDir = -pacAnimDir;
        }
    }
}

The doAnim() counts the pacmanAnimPos variable which 
determines what pacman image is drawn. There are four pacman images. There is 
also a PAC_ANIM_DELAY constant which makes the animation a bit slower. 
Otherwise the pacman would open his mouth too fast.  

boolean finished = true;

while (i &lt; N_BLOCKS * N_BLOCKS &amp;&amp; finished) {

    if ((screenData[i] &amp; 48) != 0) {
        finished = false;
    }

    i++;
}

This code is part of the checkMaze() method. It checks
if there are any points left for the Pacman to eat. Number 16 stands for a point. 
If all points are consumed, we move to the next level. (In our case, we just restart the game.)

Next we will examine the moveGhosts() method. The ghosts move one square 
and then decide if they change the direction. 

if (ghost_x[i] % BLOCK_SIZE == 0 &amp;&amp; ghost_y[i] % BLOCK_SIZE == 0) {

We continue only if we have finished moving one square.

pos = pacman_x / BLOCK_SIZE + N_BLOCKS * (int) (pacman_y / BLOCK_SIZE);

This line determines where the ghost is located; in which position/square. 
There are 225 theoretical positions. (A ghost cannot move over walls.)

if ((screenData[pos] &amp; 1) == 0 &amp;&amp; ghost_dx[i] != 1) {
    dx[count] = -1;
    dy[count] = 0;
    count++;
}

If there is no obstacle on the left and the ghost is not already moving to the right, 
the ghost will move to the left. What does this code really mean? If the ghost enters a 
tunnel, he will continue in the same direction until he is out of the tunnel. Moving of 
ghosts is partly random. We do not apply this randomness inside long tunnels because
the ghost might get stuck there. 

if (pacman_x &gt; (ghost_x[i] - 12) &amp;&amp; pacman_x &lt; (ghost_x[i] + 12)
        &amp;&amp; pacman_y &gt; (ghost_y[i] - 12) &amp;&amp; pacman_y &lt; (ghost_y[i] + 12)
        &amp;&amp; inGame) {

    dying = true;
}

If there is a collision between ghosts and Pacman, Pacman dies. 

Next we are going to examine the movePacman() method. The req_dx 
and req_dy variables are determined in the TAdapter inner class. 
These variables are controlled with cursor keys. 

if ((ch &amp; 16) != 0) {
    screenData[pos] = (short) (ch &amp; 15);
    score++;
}

If the pacman moves to a position with a point, we remove it from 
the maze and increase the score value.

if ((pacmand_x == -1 &amp;&amp; pacmand_y == 0 &amp;&amp; (ch &amp; 1) != 0)
        || (pacmand_x == 1 &amp;&amp; pacmand_y == 0 &amp;&amp; (ch &amp; 4) != 0)
        || (pacmand_x == 0 &amp;&amp; pacmand_y == -1 &amp;&amp; (ch &amp; 2) != 0)
        || (pacmand_x == 0 &amp;&amp; pacmand_y == 1 &amp;&amp; (ch &amp; 8) != 0)) {
    pacmand_x = 0;
    pacmand_y = 0;
}

The Pacman stops if he cannot move further it his current direction.

private void drawPacman(Graphics2D g2d) {

    if (view_dx == -1) {
        drawPacnanLeft(g2d);
    } else if (view_dx == 1) {
        drawPacmanRight(g2d);
    } else if (view_dy == -1) {
        drawPacmanUp(g2d);
    } else {
        drawPacmanDown(g2d);
    }
}

There are four possible directions for a Pacman. There are four images for all directions. 
The images are used to animate Pacman opening and closing his mouth.

The drawMaze() method draws the maze out of the numbers in the screenData
array. Number 1 is a left border, 2 is a top border, 4 is a right border, 8 is a bottom 
border and 16 is a point. We simply go through all 225 squares in the maze. For example 
we have 9 in the screenData array. We have the first bit (1) and the fourth bit (8) set. 
So we draw a bottom and a left border on this particular square. 

if ((screenData[i] &amp; 1) != 0) { 
    g2d.drawLine(x, y, x, y + BLOCK_SIZE - 1);
}

We draw a left border if the first bit of a number is set.  

com/zetcode/Pacman.java
  

package com.zetcode;

import java.awt.EventQueue;
import javax.swing.JFrame;

public class Pacman extends JFrame {

    public Pacman() {
        
        initUI();
    }
    
    private void initUI() {
        
        add(new Board());
        
        setTitle("Pacman");
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setSize(380, 420);
        setLocationRelativeTo(null);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {

            var ex = new Pacman();
            ex.setVisible(true);
        });
    }
}

This is a Pacman file with a main method. 

![pacman.png](images/pacman.png)

Figure: Pacman

This was the Pacman game.

 

[Contents](..)  
[Previous](../tetris/)
[Next](../spaceinvaders/)