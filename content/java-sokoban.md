+++
title = "Java Sokoban"
date = 2025-08-29T20:01:04.521+01:00
draft = false
description = "Java Sokoban game shows how to create the Sokoban game clone in Java."
image = "images/sokoban.png"
imageBig = "images/sokoban.png"
categories = ["javagames"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../minesweeper/)

# Java Sokoban

last modified January 10, 2023 

In this part of the Java 2D games tutorial, we create a Java Sokoban game clone. 
Source code and images can be found at the author's Github 
[Java-Sokoban-Game](https://github.com/janbodnar/Java-Sokoban-Game) repository.

## Sokoban

*Sokoban* is another classic computer game. 
It was created in 1980 by Hiroyuki Imabayashi. Sokoban means
a warehouse keeper in Japanese. The player pushes boxes around a 
maze. The objective is to place all boxes in designated locations.

## Development of Sokoban game in Java

We control the sokoban object with cursor keys. We can also 
press the R key to restart the level. When all bags are placed 
on the destination areas, the game is finished. We draw "Completed"
string in the left upper corner of the window. 

Board.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import javax.swing.JPanel;

public class Board extends JPanel {

    private final int OFFSET = 30;
    private final int SPACE = 20;
    private final int LEFT_COLLISION = 1;
    private final int RIGHT_COLLISION = 2;
    private final int TOP_COLLISION = 3;
    private final int BOTTOM_COLLISION = 4;

    private ArrayList&lt;Wall&gt; walls;
    private ArrayList&lt;Baggage&gt; baggs;
    private ArrayList&lt;Area&gt; areas;
    
    private Player soko;
    private int w = 0;
    private int h = 0;
    
    private boolean isCompleted = false;

    private String level
            = "    ######\n"
            + "    ##   #\n"
            + "    ##$  #\n"
            + "  ####  $##\n"
            + "  ##  $ $ #\n"
            + "#### # ## #   ######\n"
            + "##   # ## #####  ..#\n"
            + "## $  $          ..#\n"
            + "###### ### #@##  ..#\n"
            + "    ##     #########\n"
            + "    ########\n";

    public Board() {

        initBoard();
    }

    private void initBoard() {

        addKeyListener(new TAdapter());
        setFocusable(true);
        initWorld();
    }

    public int getBoardWidth() {
        return this.w;
    }

    public int getBoardHeight() {
        return this.h;
    }

    private void initWorld() {
        
        walls = new ArrayList&lt;&gt;();
        baggs = new ArrayList&lt;&gt;();
        areas = new ArrayList&lt;&gt;();

        int x = OFFSET;
        int y = OFFSET;

        Wall wall;
        Baggage b;
        Area a;

        for (int i = 0; i &lt; level.length(); i++) {

            char item = level.charAt(i);

            switch (item) {

                case '\n':
                    y += SPACE;

                    if (this.w &lt; x) {
                        this.w = x;
                    }

                    x = OFFSET;
                    break;

                case '#':
                    wall = new Wall(x, y);
                    walls.add(wall);
                    x += SPACE;
                    break;

                case '$':
                    b = new Baggage(x, y);
                    baggs.add(b);
                    x += SPACE;
                    break;

                case '.':
                    a = new Area(x, y);
                    areas.add(a);
                    x += SPACE;
                    break;

                case '@':
                    soko = new Player(x, y);
                    x += SPACE;
                    break;

                case ' ':
                    x += SPACE;
                    break;

                default:
                    break;
            }

            h = y;
        }
    }

    private void buildWorld(Graphics g) {

        g.setColor(new Color(250, 240, 170));
        g.fillRect(0, 0, this.getWidth(), this.getHeight());

        ArrayList&lt;Actor&gt; world = new ArrayList&lt;&gt;();

        world.addAll(walls);
        world.addAll(areas);
        world.addAll(baggs);
        world.add(soko);

        for (int i = 0; i &lt; world.size(); i++) {

            Actor item = world.get(i);

            if (item instanceof Player || item instanceof Baggage) {
                
                g.drawImage(item.getImage(), item.x() + 2, item.y() + 2, this);
            } else {
                
                g.drawImage(item.getImage(), item.x(), item.y(), this);
            }

            if (isCompleted) {
                
                g.setColor(new Color(0, 0, 0));
                g.drawString("Completed", 25, 20);
            }

        }
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        buildWorld(g);
    }

    private class TAdapter extends KeyAdapter {

        @Override
        public void keyPressed(KeyEvent e) {

            if (isCompleted) {
                return;
            }

            int key = e.getKeyCode();

            switch (key) {
                
                case KeyEvent.VK_LEFT:
                    
                    if (checkWallCollision(soko,
                            LEFT_COLLISION)) {
                        return;
                    }
                    
                    if (checkBagCollision(LEFT_COLLISION)) {
                        return;
                    }
                    
                    soko.move(-SPACE, 0);
                    
                    break;
                    
                case KeyEvent.VK_RIGHT:
                    
                    if (checkWallCollision(soko, RIGHT_COLLISION)) {
                        return;
                    }
                    
                    if (checkBagCollision(RIGHT_COLLISION)) {
                        return;
                    }
                    
                    soko.move(SPACE, 0);
                    
                    break;
                    
                case KeyEvent.VK_UP:
                    
                    if (checkWallCollision(soko, TOP_COLLISION)) {
                        return;
                    }
                    
                    if (checkBagCollision(TOP_COLLISION)) {
                        return;
                    }
                    
                    soko.move(0, -SPACE);
                    
                    break;
                    
                case KeyEvent.VK_DOWN:
                    
                    if (checkWallCollision(soko, BOTTOM_COLLISION)) {
                        return;
                    }
                    
                    if (checkBagCollision(BOTTOM_COLLISION)) {
                        return;
                    }
                    
                    soko.move(0, SPACE);
                    
                    break;
                    
                case KeyEvent.VK_R:
                    
                    restartLevel();
                    
                    break;
                    
                default:
                    break;
            }

            repaint();
        }
    }

    private boolean checkWallCollision(Actor actor, int type) {

        switch (type) {
            
            case LEFT_COLLISION:
                
                for (int i = 0; i &lt; walls.size(); i++) {
                    
                    Wall wall = walls.get(i);
                    
                    if (actor.isLeftCollision(wall)) {
                        
                        return true;
                    }
                }
                
                return false;
                
            case RIGHT_COLLISION:
                
                for (int i = 0; i &lt; walls.size(); i++) {
                    
                    Wall wall = walls.get(i);
                    
                    if (actor.isRightCollision(wall)) {
                        return true;
                    }
                }
                
                return false;
                
            case TOP_COLLISION:
                
                for (int i = 0; i &lt; walls.size(); i++) {
                    
                    Wall wall = walls.get(i);
                    
                    if (actor.isTopCollision(wall)) {
                        
                        return true;
                    }
                }
                
                return false;
                
            case BOTTOM_COLLISION:
                
                for (int i = 0; i &lt; walls.size(); i++) {
                    
                    Wall wall = walls.get(i);
                    
                    if (actor.isBottomCollision(wall)) {
                        
                        return true;
                    }
                }
                
                return false;
                
            default:
                break;
        }
        
        return false;
    }

    private boolean checkBagCollision(int type) {

        switch (type) {
            
            case LEFT_COLLISION:
                
                for (int i = 0; i &lt; baggs.size(); i++) {

                    Baggage bag = baggs.get(i);

                    if (soko.isLeftCollision(bag)) {

                        for (int j = 0; j &lt; baggs.size(); j++) {
                            
                            Baggage item = baggs.get(j);
                            
                            if (!bag.equals(item)) {
                                
                                if (bag.isLeftCollision(item)) {
                                    return true;
                                }
                            }
                            
                            if (checkWallCollision(bag, LEFT_COLLISION)) {
                                return true;
                            }
                        }
                        
                        bag.move(-SPACE, 0);
                        isCompleted();
                    }
                }
                
                return false;
                
            case RIGHT_COLLISION:
                
                for (int i = 0; i &lt; baggs.size(); i++) {

                    Baggage bag = baggs.get(i);
                    
                    if (soko.isRightCollision(bag)) {
                        
                        for (int j = 0; j &lt; baggs.size(); j++) {

                            Baggage item = baggs.get(j);
                            
                            if (!bag.equals(item)) {
                                
                                if (bag.isRightCollision(item)) {
                                    return true;
                                }
                            }
                            
                            if (checkWallCollision(bag, RIGHT_COLLISION)) {
                                return true;
                            }
                        }
                        
                        bag.move(SPACE, 0);
                        isCompleted();
                    }
                }
                return false;
                
            case TOP_COLLISION:
                
                for (int i = 0; i &lt; baggs.size(); i++) {

                    Baggage bag = baggs.get(i);
                    
                    if (soko.isTopCollision(bag)) {
                        
                        for (int j = 0; j &lt; baggs.size(); j++) {

                            Baggage item = baggs.get(j);

                            if (!bag.equals(item)) {
                                
                                if (bag.isTopCollision(item)) {
                                    return true;
                                }
                            }
                            
                            if (checkWallCollision(bag, TOP_COLLISION)) {
                                return true;
                            }
                        }
                        
                        bag.move(0, -SPACE);
                        isCompleted();
                    }
                }

                return false;
                
            case BOTTOM_COLLISION:
                
                for (int i = 0; i &lt; baggs.size(); i++) {

                    Baggage bag = baggs.get(i);
                    
                    if (soko.isBottomCollision(bag)) {
                        
                        for (int j = 0; j &lt; baggs.size(); j++) {

                            Baggage item = baggs.get(j);
                            
                            if (!bag.equals(item)) {
                                
                                if (bag.isBottomCollision(item)) {
                                    return true;
                                }
                            }
                            
                            if (checkWallCollision(bag,BOTTOM_COLLISION)) {
                                
                                return true;
                            }
                        }
                        
                        bag.move(0, SPACE);
                        isCompleted();
                    }
                }
                
                break;
                
            default:
                break;
        }

        return false;
    }

    public void isCompleted() {

        int nOfBags = baggs.size();
        int finishedBags = 0;

        for (int i = 0; i &lt; nOfBags; i++) {
            
            Baggage bag = baggs.get(i);
            
            for (int j = 0; j &lt; nOfBags; j++) {
                
                Area area =  areas.get(j);
                
                if (bag.x() == area.x() &amp;&amp; bag.y() == area.y()) {
                    
                    finishedBags += 1;
                }
            }
        }

        if (finishedBags == nOfBags) {
            
            isCompleted = true;
            repaint();
        }
    }

    public void restartLevel() {

        areas.clear();
        baggs.clear();
        walls.clear();

        initWorld();

        if (isCompleted) {
            isCompleted = false;
        }
    }
}

The game is simplified. It only provides the very basic functionality.
The code is than easier to understand. The game has one level. 

 

private final int OFFSET = 30;
private final int SPACE = 20;
private final int LEFT_COLLISION = 1;
private final int RIGHT_COLLISION = 2;
private final int TOP_COLLISION = 3;
private final int BOTTOM_COLLISION = 4;

The wall image size is 20x20 px. This reflects the SPACE constant. 
The OFFSET is the distance between the borders of the window and 
the game world. There are four types of collisions. Each one is represented 
by a numerical constant. 

private ArrayList&lt;Wall&gt; walls;
private ArrayList&lt;Baggage&gt; baggs;
private ArrayList&lt;Area&gt; areas;

The walls, baggs, and areas are special containers which holdall the 
walls, baggs, and areas of the game. 

private String level =
          "    ######\n"
        + "    ##   #\n"
        + "    ##$  #\n"
        + "  ####  $##\n"
        + "  ##  $ $ #\n"
        + "#### # ## #   ######\n"
        + "##   # ## #####  ..#\n"
        + "## $  $          ..#\n"
        + "###### ### #@##  ..#\n"
        + "    ##     #########\n"
        + "    ########\n";

This is the level of the game. Except for the space, there are
five characters. The hash (#) stands for a wall. The dollar ($) represents the box
to move. The dot (.) character represents the place where we must move the box. 
The at character (@) is the sokoban. And finally the new line character (\n)
starts a new row of the world.

private void initWorld() {
    
    walls = new ArrayList&lt;&gt;();
    baggs = new ArrayList&lt;&gt;();
    areas = new ArrayList&lt;&gt;();

    int x = OFFSET;
    int y = OFFSET;
...

The initWorld() method initiates the game world. It goes through 
the level string and fills the above mentioned lists. 

case '$':
    b = new Baggage(x, y);
    baggs.add(b);
    x += SPACE;
    break;

In case of the dollar character, we create a Baggage object. 
The object is appended to the baggs list. The x variable is 
increased accordingly.

private void buildWorld(Graphics g) {
...

The buildWorld() method draws the game world on the window. 

ArrayList&lt;Actor&gt; world = new ArrayList&lt;&gt;();

world.addAll(walls);
world.addAll(areas);
world.addAll(baggs);
world.add(soko);

We create a world list which includes all objects of the game. 

for (int i = 0; i &lt; world.size(); i++) {

    Actor item = world.get(i);

    if (item instanceof Player || item instanceof Baggage) {
        
        g.drawImage(item.getImage(), item.x() + 2, item.y() + 2, this);
    } else {
        
        g.drawImage(item.getImage(), item.x(), item.y(), this);
    }
...
}

We iterate through the world container and draw the objects.
The player and the baggage images are a bit smaller. We add
2px to their coordinates to center them. 

if (isCompleted) {
    
    g.setColor(new Color(0, 0, 0));
    g.drawString("Completed", 25, 20);
}

If the level is completed, we draw "Completed" in the upper left corner 
of the window. 

case KeyEvent.VK_LEFT:
    
    if (checkWallCollision(soko,
            LEFT_COLLISION)) {
        return;
    }
    
    if (checkBagCollision(LEFT_COLLISION)) {
        return;
    }
    
    soko.move(-SPACE, 0);
    
    break;

Inside the keyPressed() method, we check what keys were pressed. 
We control the sokoban object with the cursor keys. If we press the left 
cursor key, we check if the sokoban collides with a wall or with 
a baggage. If it does not, we move the sokoban to the left.

case KeyEvent.VK_R:
    
    restartLevel();
    
    break;

We restart the level if we press the R key.

case LEFT_COLLISION:
    
    for (int i = 0; i &lt; walls.size(); i++) {
        
        Wall wall = walls.get(i);
        
        if (actor.isLeftCollision(wall)) {
            
            return true;
        }
    }
    
    return false;

The checkWallCollision() method was created to
ensure that the sokoban or a baggage do not pass the 
wall. There are four types of collisions. The above lines
check for the left collision. 

private boolean checkBagCollision(int type) {
...
}

The checkBagCollision() is a bit more involved. A baggage
can collide with a wall, with a sokoban object or with another
baggage. The baggage can be moved only if it collides with a sokoban and
does not collide with another baggage or a wall. When the baggage is moved,
it is time to check if the level is completed by calling the
isCompleted() method. 

for (int i = 0; i &lt; nOfBags; i++) {
    
    Baggage bag = baggs.get(i);
    
    for (int j = 0; j &lt; nOfBags; j++) {
        
        Area area =  areas.get(j);
        
        if (bag.x() == area.x() &amp;&amp; bag.y() == area.y()) {
            
            finishedBags += 1;
        }
    }
}

The isCompleted() method checks if the level is completed. 
We get the number of bags. We compare the x and y coordinates of all the 
bags and the destination areas. 

if (finishedBags == nOfBags) {
    
    isCompleted = true;
    repaint();
}

The game is finished when the finishedBags variable equals 
the number of bags in the game. 

private void restartLevel() {

    areas.clear();
    baggs.clear();
    walls.clear();

    initWorld();

    if (isCompleted) {
        isCompleted = false;
    }
}

If we do some bad move, we can restart the level. We delete all objects 
from the lists and initiate the world again. The isCompleted 
variable is set to false. 

Actor.java
  

package com.zetcode;

import java.awt.Image;

public class Actor {

    private final int SPACE = 20;

    private int x;
    private int y;
    private Image image;

    public Actor(int x, int y) {
        
        this.x = x;
        this.y = y;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image img) {
        image = img;
    }

    public int x() {
        
        return x;
    }

    public int y() {
        
        return y;
    }

    public void setX(int x) {
        
        this.x = x;
    }

    public void setY(int y) {
        
        this.y = y;
    }

    public boolean isLeftCollision(Actor actor) {
        
        return x() - SPACE == actor.x() &amp;&amp; y() == actor.y();
    }

    public boolean isRightCollision(Actor actor) {
        
        return x() + SPACE == actor.x() &amp;&amp; y() == actor.y();
    }

    public boolean isTopCollision(Actor actor) {
        
        return y() - SPACE == actor.y() &amp;&amp; x() == actor.x();
    }

    public boolean isBottomCollision(Actor actor) {
        
        return y() + SPACE == actor.y() &amp;&amp; x() == actor.x();
    }
}

This is the Actor class. The class is a base class for other 
actors in the game. It encapsulates the basic functionality 
of an object in the Sokoban game. 

public boolean isLeftCollision(Actor actor) {
    
    return x() - SPACE == actor.x() &amp;&amp; y() == actor.y();
}

This method checks if the actor collides with another actor 
(wall, baggage, sokoban) to the left. 

Wall.java
  

package com.zetcode;

import java.awt.Image;
import javax.swing.ImageIcon;

public class Wall extends Actor {

    private Image image;

    public Wall(int x, int y) {
        super(x, y);
        
        initWall();
    }
    
    private void initWall() {
        
        ImageIcon iicon = new ImageIcon("src/resources/wall.png");
        image = iicon.getImage();
        setImage(image);
    }
}

This is the Wall class. It inherits from the Actor class. 
Upon construction, it loads a wall image from the resources.

Player.java
  

package com.zetcode;

import java.awt.Image;
import javax.swing.ImageIcon;

public class Player extends Actor {

    public Player(int x, int y) {
        super(x, y);

        initPlayer();
    }

    private void initPlayer() {

        ImageIcon iicon = new ImageIcon("src/resources/sokoban.png");
        Image image = iicon.getImage();
        setImage(image);
    }

    public void move(int x, int y) {

        int dx = x() + x;
        int dy = y() + y;
        
        setX(dx);
        setY(dy);
    }
}

This is the Player class. 

public void move(int x, int y) {

    int dx = x() + x;
    int dy = y() + y;
    
    setX(dx);
    setY(dy);
}

The move() method moves the object inside the world. 

Baggage.java
  

package com.zetcode;

import java.awt.Image;
import javax.swing.ImageIcon;

public class Baggage extends Actor {

    public Baggage(int x, int y) {
        super(x, y);
        
        initBaggage();
    }
    
    private void initBaggage() {
        
        ImageIcon iicon = new ImageIcon("src/resources/baggage.png");
        Image image = iicon.getImage();
        setImage(image);
    }

    public void move(int x, int y) {
        
        int dx = x() + x;
        int dy = y() + y;
        
        setX(dx);
        setY(dy);
    }
}

This is the class for the Baggage object. This object is movable, so it 
has the move() method also. 

Area.java
  

package com.zetcode;

import java.awt.Image;
import javax.swing.ImageIcon;

public class Area extends Actor {

    public Area(int x, int y) {
        super(x, y);
        
        initArea();
    }
    
    private void initArea() {

        ImageIcon iicon = new ImageIcon("src/resources/area.png");
        Image image = iicon.getImage();
        setImage(image);
    }
}

This is the Area class. It is the object on which we
try to place the baggages. 

Sokoban.java
  

package com.zetcode;

import java.awt.EventQueue;
import javax.swing.JFrame;

public class Sokoban extends JFrame {

    private final int OFFSET = 30;

    public Sokoban() {

        initUI();
    }

    private void initUI() {
        
        Board board = new Board();
        add(board);

        setTitle("Sokoban");
        
        setSize(board.getBoardWidth() + OFFSET,
                board.getBoardHeight() + 2 * OFFSET);
        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
    }

    public static void main(String[] args) {
        
        EventQueue.invokeLater(() -&gt; {
            
            Sokoban game = new Sokoban();
            game.setVisible(true);
        });
    }
}

This is the main class.  

![sokoban.png](images/sokoban.png)

Figure: Sokoban

This was the Sokoban game. 

[Contents](..)
[Previous](../minesweeper/)