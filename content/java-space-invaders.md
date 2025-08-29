+++
title = "Java Space Invaders"
date = 2025-08-29T20:01:04.412+01:00
draft = false
description = "Java Space Invaders tutorial shows how to create a Space Invaders game clone in Java."
image = "images/spaceinvaders.png"
imageBig = "images/spaceinvaders.png"
categories = ["javagames"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../pacman/)
[Next](../minesweeper/)

# Java Space Invaders

last modified January 10, 2023 

In this part of the Java 2D games tutorial we will create a simple
Space Invaders game clone in Java. Source code and images can be found at the author's Github 
[Java-Space-Invaders](https://github.com/janbodnar/Java-Space-Invaders) repository.

*Space Invaders* is an arcade video game designed by *Tomohiro Nishikado*.
It was first released in 1978.

In Space Invaders game, the player controls a cannon. He is about
to save the Earth from invasion of evil space invaders.

## Development of Space Invaders in Java

In our Java clone we have 24 invaders. These aliens heavily shell the ground.
When the player shoots a missile, he can shoot another one only when it hits
an alien or the top of the Board. The player shoots with the Space key. Aliens
launch randomly their bombs. Each alien shoots a bomb
only after the previous one hits the bottom.

com/zetcode/SpaceInvaders.java
  

package com.zetcode;

import java.awt.EventQueue;
import javax.swing.JFrame;

public class SpaceInvaders extends JFrame  {

    public SpaceInvaders() {

        initUI();
    }

    private void initUI() {

        add(new Board());

        setTitle("Space Invaders");
        setSize(Commons.BOARD_WIDTH, Commons.BOARD_HEIGHT);

        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setResizable(false);
        setLocationRelativeTo(null);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {

            var ex = new SpaceInvaders();
            ex.setVisible(true);
        });
    }
}

This is the main class. It sets up the application.

com/zetcode/Commons.java
  

package com.zetcode;

public interface Commons {

    int BOARD_WIDTH = 358;
    int BOARD_HEIGHT = 350;
    int BORDER_RIGHT = 30;
    int BORDER_LEFT = 5;

    int GROUND = 290;
    int BOMB_HEIGHT = 5;

    int ALIEN_HEIGHT = 12;
    int ALIEN_WIDTH = 12;
    int ALIEN_INIT_X = 150;
    int ALIEN_INIT_Y = 5;

    int GO_DOWN = 15;
    int NUMBER_OF_ALIENS_TO_DESTROY = 24;
    int CHANCE = 5;
    int DELAY = 17;
    int PLAYER_WIDTH = 15;
    int PLAYER_HEIGHT = 10;
}

The Commons.java file has some common constants. They
are self-explanatory.

com/zetcode/sprite/Alien.java
  

package com.zetcode.sprite;

import javax.swing.ImageIcon;

public class Alien extends Sprite {

    private Bomb bomb;

    public Alien(int x, int y) {

        initAlien(x, y);
    }

    private void initAlien(int x, int y) {

        this.x = x;
        this.y = y;

        bomb = new Bomb(x, y);

        var alienImg = "src/images/alien.png";
        var ii = new ImageIcon(alienImg);

        setImage(ii.getImage());
    }

    public void act(int direction) {

        this.x += direction;
    }

    public Bomb getBomb() {

        return bomb;
    }

    public class Bomb extends Sprite {

        private boolean destroyed;

        public Bomb(int x, int y) {

            initBomb(x, y);
        }

        private void initBomb(int x, int y) {

            setDestroyed(true);

            this.x = x;
            this.y = y;

            var bombImg = "src/images/bomb.png";
            var ii = new ImageIcon(bombImg);
            setImage(ii.getImage());
        }

        public void setDestroyed(boolean destroyed) {

            this.destroyed = destroyed;
        }

        public boolean isDestroyed() {

            return destroyed;
        }
    }
}

This is the Alien sprite. Each alien has an inner
Bomb class.

public void act(int direction) {

    this.x += direction;
}

The act() method is called from the Board class.
It is used to position an alien in horizontal direction.

public Bomb getBomb() {

    return bomb;
}

The getBomb() method is called when the alien is about to
drop a bomb.

com/zetcode/sprite/Player.java
  

package com.zetcode.sprite;

import com.zetcode.Commons;

import javax.swing.ImageIcon;
import java.awt.event.KeyEvent;

public class Player extends Sprite {

    private int width;

    public Player() {

        initPlayer();
    }

    private void initPlayer() {

        var playerImg = "src/images/player.png";
        var ii = new ImageIcon(playerImg);

        width = ii.getImage().getWidth(null);
        setImage(ii.getImage());

        int START_X = 270;
        setX(START_X);

        int START_Y = 280;
        setY(START_Y);
    }

    public void act() {

        x += dx;

        if (x &lt;= 2) {

            x = 2;
        }

        if (x &gt;= Commons.BOARD_WIDTH - 2 * width) {

            x = Commons.BOARD_WIDTH - 2 * width;
        }
    }

    public void keyPressed(KeyEvent e) {

        int key = e.getKeyCode();

        if (key == KeyEvent.VK_LEFT) {

            dx = -2;
        }

        if (key == KeyEvent.VK_RIGHT) {

            dx = 2;
        }
    }

    public void keyReleased(KeyEvent e) {

        int key = e.getKeyCode();

        if (key == KeyEvent.VK_LEFT) {

            dx = 0;
        }

        if (key == KeyEvent.VK_RIGHT) {

            dx = 0;
        }
    }
}

This is the Player sprite. We control the cannon with
the cursor keys.

int START_X = 270;
setX(START_X);

int START_Y = 280;
setY(START_Y);

These are the initial coordinates of the player sprite.

public void keyPressed(KeyEvent e) {

    int key = e.getKeyCode();

    if (key == KeyEvent.VK_LEFT) {

        dx = -2;
    }
...

If we press the left cursor key, the dx variable is set to -2. Next
time the act() method is called, the player moves to the left.

public void keyReleased(KeyEvent e) {

    int key = e.getKeyCode();

    if (key == KeyEvent.VK_LEFT) {

        dx = 0;
    }

    if (key == KeyEvent.VK_RIGHT) {

        dx = 0;
    }
}

If we release the left or the right cursor, the dx variable is
set to zero. The player sprite stops moving.

com/zetcode/sprite/Shot.java
  

package com.zetcode.sprite;

import javax.swing.ImageIcon;

public class Shot extends Sprite {

    public Shot() {
    }

    public Shot(int x, int y) {

        initShot(x, y);
    }

    private void initShot(int x, int y) {

        var shotImg = "src/images/shot.png";
        var ii = new ImageIcon(shotImg);
        setImage(ii.getImage());

        int H_SPACE = 6;
        setX(x + H_SPACE);

        int V_SPACE = 1;
        setY(y - V_SPACE);
    }
}

This is the Shot sprite. The shot is triggered with the
Space key. The H_SPACE and the V_SPACE
constants are used to position the missile appropriately.

com/zetcode/sprite/Sprite.java
  

package com.zetcode.sprite;

import java.awt.Image;

public class Sprite {

    private boolean visible;
    private Image image;
    private boolean dying;

    int x;
    int y;
    int dx;

    public Sprite() {

        visible = true;
    }

    public void die() {

        visible = false;
    }

    public boolean isVisible() {

        return visible;
    }

    protected void setVisible(boolean visible) {

        this.visible = visible;
    }

    public void setImage(Image image) {

        this.image = image;
    }

    public Image getImage() {

        return image;
    }

    public void setX(int x) {

        this.x = x;
    }

    public void setY(int y) {

        this.y = y;
    }

    public int getY() {

        return y;
    }

    public int getX() {

        return x;
    }

    public void setDying(boolean dying) {

        this.dying = dying;
    }

    public boolean isDying() {

        return this.dying;
    }
}

This is the basic Sprite class. Other sprites inherit from it. It
has some common functionality.

 

com/zetcode/Board.java
  

package com.zetcode;

import com.zetcode.sprite.Alien;
import com.zetcode.sprite.Player;
import com.zetcode.sprite.Shot;

import javax.swing.ImageIcon;
import javax.swing.JPanel;
import javax.swing.Timer;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

public class Board extends JPanel {

    private Dimension d;
    private List&lt;Alien&gt; aliens;
    private Player player;
    private Shot shot;

    private int direction = -1;
    private int deaths = 0;

    private boolean inGame = true;
    private String explImg = "src/images/explosion.png";
    private String message = "Game Over";

    private Timer timer;

    public Board() {

        initBoard();
        gameInit();
    }

    private void initBoard() {

        addKeyListener(new TAdapter());
        setFocusable(true);
        d = new Dimension(Commons.BOARD_WIDTH, Commons.BOARD_HEIGHT);
        setBackground(Color.black);

        timer = new Timer(Commons.DELAY, new GameCycle());
        timer.start();

        gameInit();
    }

    private void gameInit() {

        aliens = new ArrayList&lt;&gt;();

        for (int i = 0; i &lt; 4; i++) {
            for (int j = 0; j &lt; 6; j++) {

                var alien = new Alien(Commons.ALIEN_INIT_X + 18 * j,
                        Commons.ALIEN_INIT_Y + 18 * i);
                aliens.add(alien);
            }
        }

        player = new Player();
        shot = new Shot();
    }

    private void drawAliens(Graphics g) {

        for (Alien alien : aliens) {

            if (alien.isVisible()) {

                g.drawImage(alien.getImage(), alien.getX(), alien.getY(), this);
            }

            if (alien.isDying()) {

                alien.die();
            }
        }
    }

    private void drawPlayer(Graphics g) {

        if (player.isVisible()) {

            g.drawImage(player.getImage(), player.getX(), player.getY(), this);
        }

        if (player.isDying()) {

            player.die();
            inGame = false;
        }
    }

    private void drawShot(Graphics g) {

        if (shot.isVisible()) {

            g.drawImage(shot.getImage(), shot.getX(), shot.getY(), this);
        }
    }

    private void drawBombing(Graphics g) {

        for (Alien a : aliens) {

            Alien.Bomb b = a.getBomb();

            if (!b.isDestroyed()) {

                g.drawImage(b.getImage(), b.getX(), b.getY(), this);
            }
        }
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        doDrawing(g);
    }

    private void doDrawing(Graphics g) {

        g.setColor(Color.black);
        g.fillRect(0, 0, d.width, d.height);
        g.setColor(Color.green);

        if (inGame) {

            g.drawLine(0, Commons.GROUND,
                    Commons.BOARD_WIDTH, Commons.GROUND);

            drawAliens(g);
            drawPlayer(g);
            drawShot(g);
            drawBombing(g);

        } else {

            if (timer.isRunning()) {
                timer.stop();
            }

            gameOver(g);
        }

        Toolkit.getDefaultToolkit().sync();
    }

    private void gameOver(Graphics g) {

        g.setColor(Color.black);
        g.fillRect(0, 0, Commons.BOARD_WIDTH, Commons.BOARD_HEIGHT);

        g.setColor(new Color(0, 32, 48));
        g.fillRect(50, Commons.BOARD_WIDTH / 2 - 30, Commons.BOARD_WIDTH - 100, 50);
        g.setColor(Color.white);
        g.drawRect(50, Commons.BOARD_WIDTH / 2 - 30, Commons.BOARD_WIDTH - 100, 50);

        var small = new Font("Helvetica", Font.BOLD, 14);
        var fontMetrics = this.getFontMetrics(small);

        g.setColor(Color.white);
        g.setFont(small);
        g.drawString(message, (Commons.BOARD_WIDTH - fontMetrics.stringWidth(message)) / 2,
                Commons.BOARD_WIDTH / 2);
    }

    private void update() {

        if (deaths == Commons.NUMBER_OF_ALIENS_TO_DESTROY) {

            inGame = false;
            timer.stop();
            message = "Game won!";
        }

        // player
        player.act();

        // shot
        if (shot.isVisible()) {

            int shotX = shot.getX();
            int shotY = shot.getY();

            for (Alien alien : aliens) {

                int alienX = alien.getX();
                int alienY = alien.getY();

                if (alien.isVisible() &amp;&amp; shot.isVisible()) {
                    if (shotX &gt;= (alienX)
                            &amp;&amp; shotX &lt;= (alienX + Commons.ALIEN_WIDTH)
                            &amp;&amp; shotY &gt;= (alienY)
                            &amp;&amp; shotY &lt;= (alienY + Commons.ALIEN_HEIGHT)) {

                        var ii = new ImageIcon(explImg);
                        alien.setImage(ii.getImage());
                        alien.setDying(true);
                        deaths++;
                        shot.die();
                    }
                }
            }

            int y = shot.getY();
            y -= 4;

            if (y &lt; 0) {
                shot.die();
            } else {
                shot.setY(y);
            }
        }

        // aliens

        for (Alien alien : aliens) {

            int x = alien.getX();

            if (x &gt;= Commons.BOARD_WIDTH - Commons.BORDER_RIGHT &amp;&amp; direction != -1) {

                direction = -1;

                Iterator&lt;Alien&gt; i1 = aliens.iterator();

                while (i1.hasNext()) {

                    Alien a2 = i1.next();
                    a2.setY(a2.getY() + Commons.GO_DOWN);
                }
            }

            if (x &lt;= Commons.BORDER_LEFT &amp;&amp; direction != 1) {

                direction = 1;

                Iterator&lt;Alien&gt; i2 = aliens.iterator();

                while (i2.hasNext()) {

                    Alien a = i2.next();
                    a.setY(a.getY() + Commons.GO_DOWN);
                }
            }
        }

        Iterator&lt;Alien&gt; it = aliens.iterator();

        while (it.hasNext()) {

            Alien alien = it.next();

            if (alien.isVisible()) {

                int y = alien.getY();

                if (y &gt; Commons.GROUND - Commons.ALIEN_HEIGHT) {
                    inGame = false;
                    message = "Invasion!";
                }

                alien.act(direction);
            }
        }

        // bombs
        var generator = new Random();

        for (Alien alien : aliens) {

            int shot = generator.nextInt(15);
            Alien.Bomb bomb = alien.getBomb();

            if (shot == Commons.CHANCE &amp;&amp; alien.isVisible() &amp;&amp; bomb.isDestroyed()) {

                bomb.setDestroyed(false);
                bomb.setX(alien.getX());
                bomb.setY(alien.getY());
            }

            int bombX = bomb.getX();
            int bombY = bomb.getY();
            int playerX = player.getX();
            int playerY = player.getY();

            if (player.isVisible() &amp;&amp; !bomb.isDestroyed()) {

                if (bombX &gt;= (playerX)
                        &amp;&amp; bombX &lt;= (playerX + Commons.PLAYER_WIDTH)
                        &amp;;&amp; bombY &gt;= (playerY)
                        &amp;&amp; bombY &lt;= (playerY + Commons.PLAYER_HEIGHT)) {

                    var ii = new ImageIcon(explImg);
                    player.setImage(ii.getImage());
                    player.setDying(true);
                    bomb.setDestroyed(true);
                }
            }

            if (!bomb.isDestroyed()) {

                bomb.setY(bomb.getY() + 1);

                if (bomb.getY() &gt;= Commons.GROUND - Commons.BOMB_HEIGHT) {

                    bomb.setDestroyed(true);
                }
            }
        }
    }

    private void doGameCycle() {

        update();
        repaint();
    }

    private class GameCycle implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {

            doGameCycle();
        }
    }

    private class TAdapter extends KeyAdapter {

        @Override
        public void keyReleased(KeyEvent e) {

            player.keyReleased(e);
        }

        @Override
        public void keyPressed(KeyEvent e) {

            player.keyPressed(e);

            int x = player.getX();
            int y = player.getY();

            int key = e.getKeyCode();

            if (key == KeyEvent.VK_SPACE) {

                if (inGame) {

                    if (!shot.isVisible()) {

                        shot = new Shot(x, y);
                    }
                }
            }
        }
    }
}

The main logic of the game is located in the Board class.

private void gameInit() {

    aliens = new ArrayList&lt;&gt;();

    for (int i = 0; i &lt; 4; i++) {
        for (int j = 0; j &lt; 6; j++) {

            var alien = new Alien(Commons.ALIEN_INIT_X + 18 * j,
                    Commons.ALIEN_INIT_Y + 18 * i);
            aliens.add(alien);
        }
    }

    player = new Player();
    shot = new Shot();
}

In the gameInit() method we create 24 aliens. The alien image
size is 12x12px. We put 6px space among the aliens. We also create the player
and the shot objects.

private void drawBombing(Graphics g) {

    for (Alien a : aliens) {

        Alien.Bomb b = a.getBomb();

        if (!b.isDestroyed()) {

            g.drawImage(b.getImage(), b.getX(), b.getY(), this);
        }
    }
}

The drawBombing() method draws bombs launched by the aliens.

if (inGame) {

    g.drawLine(0, Commons.GROUND,
            Commons.BOARD_WIDTH, Commons.GROUND);

    drawAliens(g);
    drawPlayer(g);
    drawShot(g);
    drawBombing(g);

} ...

Inside the doDrawing() method, we draw the ground, the aliens, the player,
the shot, and the bombs.

private void update() {

    if (deaths == Commons.NUMBER_OF_ALIENS_TO_DESTROY) {

        inGame = false;
        timer.stop();
        message = "Game won!";
    }
...

Inside the update() method we check the number of destroyed
aliens. If we destroy all aliens, we win the game.

if (alien.isVisible() &amp;&amp; shot.isVisible()) {
    if (shotX &gt;= (alienX)
            &amp;&amp; shotX &lt;= (alienX + Commons.ALIEN_WIDTH)
            &amp;&amp; shotY &gt;= (alienY)
            &amp;&amp; shotY &lt;= (alienY + Commons.ALIEN_HEIGHT)) {

        var ii = new ImageIcon(explImg);
        alien.setImage(ii.getImage());
        alien.setDying(true);
        deaths++;
        shot.die();
    }
}

If the shot triggered by the player collides with an alien, the alien ship is
destroyed. More precisely, the dying flag is set. We use it to display an explosion.
The deaths variable increases and the shot sprite is destroyed.

if (x &gt;= Commons.BOARD_WIDTH - Commons.BORDER_RIGHT &amp;&amp; direction != -1) {

    direction = -1;

    Iterator&lt;Alien&gt; i1 = aliens.iterator();

    while (i1.hasNext()) {

        Alien a2 = i1.next();
        a2.setY(a2.getY() + Commons.GO_DOWN);
    }
}

If the aliens reach the right end of the Board, they move down and change
their direction to the left.

Iterator&lt;Alien&gt; it = aliens.iterator();

    while (it.hasNext()) {

        Alien alien = it.next();

        if (alien.isVisible()) {

            int y = alien.getY();

            if (y &gt; Commons.GROUND - Commons.ALIEN_HEIGHT) {
                inGame = false;
                message = "Invasion!";
            }

            alien.act(direction);
        }
    }

This code moves aliens. If they reach the bottom, the invasion begins.

int shot = generator.nextInt(15);
Alien.Bomb bomb = alien.getBomb();

if (shot == Commons.CHANCE &amp;&amp; alien.isVisible() &amp;&amp; bomb.isDestroyed()) {

    bomb.setDestroyed(false);
    bomb.setX(alien.getX());
    bomb.setY(alien.getY());
}

This is the code that determines whether the alien will drop a bomb. The alien
must not be destroyed; i.e. he must be visible.  The bomb's destroyed flag must
be set. In other words, it is the alien's first bomb dropping or the previous dropped
bomb already hit the ground. If these two conditions are fulfilled, the bombing
is left to the chance.

if (!bomb.isDestroyed()) {

    bomb.setY(bomb.getY() + 1);

    if (bomb.getY() &gt;= Commons.GROUND - Commons.BOMB_HEIGHT) {

        bomb.setDestroyed(true);
    }
}

If the bomb is not destroyed, it goes 1 px to the ground. If it hits the bottom,
the destroyed flag is set. The alien is now ready to drop another bomb.

public void keyReleased(KeyEvent e) {

    player.keyReleased(e);
}

The actual processing of this particular KeyEvent is delegated to the player sprite.

![spaceinvaders.png](images/spaceinvaders.png)

Figure: Space Invaders

In this part of the Java games tutorial, we have created Space Invaders.

[Contents](..)
[Previous](../pacman/)
[Next](../minesweeper/)