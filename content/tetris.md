+++
title = "Tetris"
date = 2025-08-29T20:01:58.106+01:00
draft = false
description = ">Java Tetris game - this part of the Java Swing tutorial shows how to create a Tetris game clone in Java and Swing."
image = "images/tetrominoes.png"
imageBig = "images/tetrominoes.png"
categories = ["javaswing"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../puzzle/)

# Tetris

last modified January 10, 2023

In this chapter, we will create a Tetris game clone in Java Swing.

## Tetris

The Tetris game is one of the most popular computer games ever created.
The original game was designed and programmed
by a Russian programmer *Alexey Pajitnov* in 1985. Since then,
Tetris is available on almost every computer platform in lots of variations.

Tetris is called a falling block puzzle game. In this game, we have seven different shapes
called *tetrominoes*: S-shape, Z-shape, T-shape, L-shape, Line-shape, MirroredL-shape,
and a Square-shape. Each of these shapes is formed with four squares. The shapes are falling
down the board. The object of the Tetris game is to move and rotate the shapes so that they
fit as much as possible. If we manage to form a row, the row is destroyed and we score.
We play the Tetris game until we top out.

![tetrominoes.png](images/tetrominoes.png)

Figure: Tetrominoes

## The development

We do not have images for our Tetris game, we draw the tetrominoes using
Swing drawing API. Behind every computer game, there is a mathematical model.
So it is in Tetris.

Some ideas behind the game.

  - We use a Timer class to create a game cycle

  - The tetrominoes are drawn

  - The shapes move on a square by square basis (not pixel by pixel)

  - Mathematically a board is a simple list of numbers

The game is simplified so that it is easier to understand. The game starts
immediately after it is launched. We can pause the game by pressing the p key.
The space key drops the Tetris piece to the bottom.
The d key drops the piece one line down. (It can be used to speed up the
falling a bit.) The game goes at constant speed, no acceleration is implemented.
The score is the number of lines that we have removed.

com/zetcode/Tetris.java
  

package com.zetcode;

import java.awt.BorderLayout;
import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JLabel;

/*
Java Tetris game clone

Author: Jan Bodnar
Website: http://zetcode.com
 */
public class Tetris extends JFrame {

    private JLabel statusbar;

    public Tetris() {

        initUI();
    }

    private void initUI() {

        statusbar = new JLabel(" 0");
        add(statusbar, BorderLayout.SOUTH);

        var board = new Board(this);
        add(board);
        board.start();

        setTitle("Tetris");
        setSize(200, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
    }

    JLabel getStatusBar() {

        return statusbar;
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {

            var game = new Tetris();
            game.setVisible(true);
        });
    }
}

In Tetris, we set up the game. We create a board on
which we play the game. We create a statusbar.

board.start();

The start() method starts the Tetris game.

com/zetcode/Shape.java
  

package com.zetcode;

import java.util.Random;

public class Shape {

    protected enum Tetrominoe {
        NoShape, ZShape, SShape, LineShape,
        TShape, SquareShape, LShape, MirroredLShape
    }

    private Tetrominoe pieceShape;
    private int coords[][];
    private int[][][] coordsTable;

    public Shape() {

        coords = new int[4][2];
        setShape(Tetrominoe.NoShape);
    }

    void setShape(Tetrominoe shape) {

        coordsTable = new int[][][]{
                {{0, 0}, {0, 0}, {0, 0}, {0, 0}},
                {{0, -1}, {0, 0}, {-1, 0}, {-1, 1}},
                {{0, -1}, {0, 0}, {1, 0}, {1, 1}},
                {{0, -1}, {0, 0}, {0, 1}, {0, 2}},
                {{-1, 0}, {0, 0}, {1, 0}, {0, 1}},
                {{0, 0}, {1, 0}, {0, 1}, {1, 1}},
                {{-1, -1}, {0, -1}, {0, 0}, {0, 1}},
                {{1, -1}, {0, -1}, {0, 0}, {0, 1}}
        };

        for (int i = 0; i &lt; 4; i++) {

            System.arraycopy(coordsTable[shape.ordinal()], 0, coords, 0, 4);
        }

        pieceShape = shape;
    }

    private void setX(int index, int x) {
        coords[index][0] = x;
    }

    private void setY(int index, int y) {
        coords[index][1] = y;
    }

    int x(int index) {
        return coords[index][0];
    }

    int y(int index) {
        return coords[index][1];
    }

    Tetrominoe getShape() {
        return pieceShape;
    }

    void setRandomShape() {

        var r = new Random();
        int x = Math.abs(r.nextInt()) % 7 + 1;

        Tetrominoe[] values = Tetrominoe.values();
        setShape(values[x]);
    }

    public int minX() {

        int m = coords[0][0];

        for (int i = 0; i &lt; 4; i++) {

            m = Math.min(m, coords[i][0]);
        }

        return m;
    }

    int minY() {

        int m = coords[0][1];

        for (int i = 0; i &lt; 4; i++) {

            m = Math.min(m, coords[i][1]);
        }

        return m;
    }

    Shape rotateLeft() {

        if (pieceShape == Tetrominoe.SquareShape) {
            return this;
        }

        var result = new Shape();
        result.pieceShape = pieceShape;

        for (int i = 0; i &lt; 4; ++i) {

            result.setX(i, y(i));
            result.setY(i, -x(i));
        }

        return result;
    }

    Shape rotateRight() {

        if (pieceShape == Tetrominoe.SquareShape) {
            return this;
        }

        var result = new Shape();
        result.pieceShape = pieceShape;

        for (int i = 0; i &lt; 4; ++i) {

            result.setX(i, -y(i));
            result.setY(i, x(i));
        }

        return result;
    }
}

Shape provides information about a Tetris piece.

protected enum Tetrominoe {
    NoShape, ZShape, SShape, LineShape,
    TShape, SquareShape, LShape, MirroredLShape
}

Tetrominoe holds seven Tetris shape names and
the empty shape called NoShape.

public Shape() {

    coords = new int[4][2];
    setShape(Tetrominoe.NoShape);
}

This is the constructor of the Shape class.
The coords array holds the actual coordinates
of a Tetris piece.

coordsTable = new int[][][] {
   { { 0, 0 },   { 0, 0 },   { 0, 0 },   { 0, 0 } },
   { { 0, -1 },  { 0, 0 },   { -1, 0 },  { -1, 1 } },
   { { 0, -1 },  { 0, 0 },   { 1, 0 },   { 1, 1 } },
   { { 0, -1 },  { 0, 0 },   { 0, 1 },   { 0, 2 } },
   { { -1, 0 },  { 0, 0 },   { 1, 0 },   { 0, 1 } },
   { { 0, 0 },   { 1, 0 },   { 0, 1 },   { 1, 1 } },
   { { -1, -1 }, { 0, -1 },  { 0, 0 },   { 0, 1 } },
   { { 1, -1 },  { 0, -1 },  { 0, 0 },   { 0, 1 } }
};

The coordsTable array holds all possible
coordinate values of our Tetris pieces. This is a template from
which all pieces take their coordinate values.

for (int i = 0; i &lt; 4; i++) {

    System.arraycopy(coordsTable[shape.ordinal()], 0, coords, 0, 4);
}

Here we copy one row of the coordinate values from the coordsTable
to a coords array of a Tetris piece. Note the use of the
ordinal() method. In C++, an enum type is esencially an integer.
Unlike in C++, Java enums are full classes and the ordinal()
method returns the current position of the enum type in the enum object.

![coordinates.png](images/coordinates.png)

Figure: Coordinates

The image helps understand the coordinate values
a bit more. The coords array saves the coordinates of the Tetris
piece. The following diagram illustrates the rotated S-shape. It
has the following coordinates: (-1, 1), (-1, 0), (0, 0), and (0, -1).

Shape rotateRight() {

    if (pieceShape == Tetrominoe.SquareShape) {
        return this;
    }

    var result = new Shape();
    result.pieceShape = pieceShape;

    for (int i = 0; i &lt; 4; ++i) {

        result.setX(i, -y(i));
        result.setY(i, x(i));
    }

    return result;
}

This code rotates the piece to the right. The square does not have to be rotated.
That's why we simply return the reference to the current object in case of
Tetrominoe.SquareShape. Looking at the previous image will help
to understand the rotation more.

com/zetcode/Board.java
  

package com.zetcode;

import com.zetcode.Shape.Tetrominoe;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.Timer;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

public class Board extends JPanel implements ActionListener {

    private final int BOARD_WIDTH = 10;
    private final int BOARD_HEIGHT = 22;

    private Timer timer;
    private boolean isFallingFinished = false;
    private boolean isStarted = false;
    private boolean isPaused = false;
    private int numLinesRemoved = 0;
    private int curX = 0;
    private int curY = 0;
    private JLabel statusbar;
    private Shape curPiece;
    private Tetrominoe[] board;

    public Board(Tetris parent) {

        initBoard(parent);
    }

    private void initBoard(Tetris parent) {

        setFocusable(true);
        curPiece = new Shape();
        int DELAY = 400;
        timer = new Timer(DELAY, this);
        timer.start();

        statusbar =  parent.getStatusBar();
        board = new Tetrominoe[BOARD_WIDTH * BOARD_HEIGHT];
        addKeyListener(new TAdapter());
        clearBoard();
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        if (isFallingFinished) {

            isFallingFinished = false;
            newPiece();
        } else {

            oneLineDown();
        }
    }

    private int squareWidth() { return (int) getSize().getWidth() / BOARD_WIDTH; }
    private int squareHeight() { return (int) getSize().getHeight() / BOARD_HEIGHT; }
    private Tetrominoe shapeAt(int x, int y) { return board[(y * BOARD_WIDTH) + x]; }

    void start()  {

        if (isPaused) {
            return;
        }

        isStarted = true;
        isFallingFinished = false;
        numLinesRemoved = 0;
        clearBoard();

        newPiece();
        timer.start();
    }

    private void pause()  {

        if (!isStarted) {
            return;
        }

        isPaused = !isPaused;

        if (isPaused) {

            timer.stop();
            statusbar.setText("paused");
        } else {

            timer.start();
            statusbar.setText(String.valueOf(numLinesRemoved));
        }

        repaint();
    }

    private void doDrawing(Graphics g) {

        var size = getSize();
        int boardTop = (int) size.getHeight() - BOARD_HEIGHT * squareHeight();

        for (int i = 0; i &lt; BOARD_HEIGHT; ++i) {

            for (int j = 0; j &lt; BOARD_WIDTH; ++j) {

                Tetrominoe shape = shapeAt(j, BOARD_HEIGHT - i - 1);

                if (shape != Tetrominoe.NoShape)
                    drawSquare(g, j * squareWidth(),
                            boardTop + i * squareHeight(), shape);
            }
        }

        if (curPiece.getShape() != Tetrominoe.NoShape) {

            for (int i = 0; i &lt; 4; ++i) {

                int x = curX + curPiece.x(i);
                int y = curY - curPiece.y(i);

                drawSquare(g, x * squareWidth(),
                        boardTop + (BOARD_HEIGHT - y - 1) * squareHeight(),
                        curPiece.getShape());
            }
        }
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }

    private void dropDown() {

        int newY = curY;

        while (newY &gt; 0) {

            if (!tryMove(curPiece, curX, newY - 1)) {
                break;
            }

            --newY;
        }

        pieceDropped();
    }

    private void oneLineDown()  {

        if (!tryMove(curPiece, curX, curY - 1)) {
            pieceDropped();
        }
    }

    private void clearBoard() {

        for (int i = 0; i &lt; BOARD_HEIGHT * BOARD_WIDTH; ++i) {
            board[i] = Tetrominoe.NoShape;
        }
    }

    private void pieceDropped() {

        for (int i = 0; i &lt; 4; ++i) {

            int x = curX + curPiece.x(i);
            int y = curY - curPiece.y(i);
            board[(y * BOARD_WIDTH) + x] = curPiece.getShape();
        }

        removeFullLines();

        if (!isFallingFinished) {
            newPiece();
        }
    }

    private void newPiece()  {

        curPiece.setRandomShape();
        curX = BOARD_WIDTH / 2 + 1;
        curY = BOARD_HEIGHT - 1 + curPiece.minY();

        if (!tryMove(curPiece, curX, curY)) {

            curPiece.setShape(Tetrominoe.NoShape);
            timer.stop();
            isStarted = false;
            statusbar.setText("game over");
        }
    }

    private boolean tryMove(Shape newPiece, int newX, int newY) {

        for (int i = 0; i &lt; 4; ++i) {

            int x = newX + newPiece.x(i);
            int y = newY - newPiece.y(i);

            if (x &lt; 0 || x &gt;= BOARD_WIDTH || y &lt; 0 || y &gt;= BOARD_HEIGHT)
                return false;

            if (shapeAt(x, y) != Tetrominoe.NoShape)
                return false;
        }

        curPiece = newPiece;
        curX = newX;
        curY = newY;

        repaint();

        return true;
    }

    private void removeFullLines() {

        int numFullLines = 0;

        for (int i = BOARD_HEIGHT - 1; i &gt;= 0; --i) {

            boolean lineIsFull = true;

            for (int j = 0; j &lt; BOARD_WIDTH; ++j) {

                if (shapeAt(j, i) == Tetrominoe.NoShape) {
                    lineIsFull = false;
                    break;
                }
            }

            if (lineIsFull) {

                ++numFullLines;

                for (int k = i; k &lt; BOARD_HEIGHT - 1; ++k) {
                    for (int j = 0; j &lt; BOARD_WIDTH; ++j)
                        board[(k * BOARD_WIDTH) + j] = shapeAt(j, k + 1);
                }
            }
        }

        if (numFullLines &gt; 0) {

            numLinesRemoved += numFullLines;
            statusbar.setText(String.valueOf(numLinesRemoved));
            isFallingFinished = true;
            curPiece.setShape(Tetrominoe.NoShape);
            repaint();
        }
    }

    private void drawSquare(Graphics g, int x, int y, Tetrominoe shape)  {

        Color colors[] = { new Color(0, 0, 0), new Color(204, 102, 102),
                new Color(102, 204, 102), new Color(102, 102, 204),
                new Color(204, 204, 102), new Color(204, 102, 204),
                new Color(102, 204, 204), new Color(218, 170, 0)
        };

        var color = colors[shape.ordinal()];

        g.setColor(color);
        g.fillRect(x + 1, y + 1, squareWidth() - 2, squareHeight() - 2);

        g.setColor(color.brighter());
        g.drawLine(x, y + squareHeight() - 1, x, y);
        g.drawLine(x, y, x + squareWidth() - 1, y);

        g.setColor(color.darker());
        g.drawLine(x + 1, y + squareHeight() - 1,
                x + squareWidth() - 1, y + squareHeight() - 1);
        g.drawLine(x + squareWidth() - 1, y + squareHeight() - 1,
                x + squareWidth() - 1, y + 1);

    }

    class TAdapter extends KeyAdapter {

        @Override
        public void keyPressed(KeyEvent e) {

            if (!isStarted || curPiece.getShape() == Tetrominoe.NoShape) {
                return;
            }

            int keycode = e.getKeyCode();

            if (keycode == 'P') {
                pause();
                return;
            }

            if (isPaused) {
                return;
            }

            switch (keycode) {

                case KeyEvent.VK_LEFT:
                    tryMove(curPiece, curX - 1, curY);
                    break;

                case KeyEvent.VK_RIGHT:
                    tryMove(curPiece, curX + 1, curY);
                    break;

                case KeyEvent.VK_DOWN:
                    tryMove(curPiece.rotateRight(), curX, curY);
                    break;

                case KeyEvent.VK_UP:
                    tryMove(curPiece.rotateLeft(), curX, curY);
                    break;

                case KeyEvent.VK_SPACE:
                    dropDown();
                    break;

                case KeyEvent.VK_D:
                    oneLineDown();
                    break;
            }
        }
    }
}

Tha game logic is located in Board.

private final int BOARD_WIDTH = 10;
private final int BOARD_HEIGHT = 22;

The BOARD_WIDTH and BOARD_HEIGHT constants 
define the size of the board.

...
private boolean isFallingFinished = false;
private boolean isStarted = false;
private boolean isPaused = false;
private int numLinesRemoved = 0;
private int curX = 0;
private int curY = 0;
...

We initialize some important variables. The isFallingFinished
variable determines, if the Tetris shape has finished falling and we then need
to create a new shape. The numLinesRemoved counts the number
of lines, we have removed so far. The curX
and curY variables determine the actual position of the falling
Tetris shape.

setFocusable(true);

We must explicitly call the setFocusable()
method. From now, the board has the keyboard input.

int DELAY = 400;

The DELAY constant defines the speed of the game.

timer = new Timer(DELAY, this);
timer.start();

The Timer object fires one or more action
events after a specified delay. In our case, the timer calls
the actionPerformed() method each DELAY ms.

@Override
public void actionPerformed(ActionEvent e) {

    if (isFallingFinished) {

        isFallingFinished = false;
        newPiece();
    } else {

        oneLineDown();
    }
}

The actionPerformed() method checks if the falling has finished. If
so, a new piece is created. If not, the falling Tetris piece goes one line down.

Inside the doDrawing() method, we draw all objects on the board. The
painting has two steps.

for (int i = 0; i &lt; BOARD_HEIGHT; ++i) {

    for (int j = 0; j &lt; BOARD_WIDTH; ++j) {

        Tetrominoe shape = shapeAt(j, BOARD_HEIGHT - i - 1);

        if (shape != Tetrominoe.NoShape)
            drawSquare(g, j * squareWidth(),
                    boardTop + i * squareHeight(), shape);
    }
}

In the first step we paint all the shapes or remains of the
shapes that have been dropped to the bottom of the board.
All the squares are remembered in the board array. We access
it using the shapeAt() method.

if (curPiece.getShape() != Tetrominoe.NoShape) {

    for (int i = 0; i &lt; 4; ++i) {

        int x = curX + curPiece.x(i);
        int y = curY - curPiece.y(i);

        drawSquare(g, 0 + x * squareWidth(),
                   boardTop + (BOARD_HEIGHT - y - 1) * squareHeight(),
                   curPiece.getShape());
    }
}

In the second step, we paint the actual falling piece.

private void dropDown() {

    int newY = curY;

    while (newY &gt; 0) {

        if (!tryMove(curPiece, curX, newY - 1)) {
            break;
        }

        --newY;
    }

    pieceDropped();
}

If we press the Space key, the piece is dropped to the bottom.
We simply try to drop the piece one line down until it reaches
the bottom or the top of another fallen Tetris piece. When the Tetris
piece finishes falling, the pieceDropped() is called.

private void clearBoard() {

    for (int i = 0; i &lt; BOARD_HEIGHT * BOARD_WIDTH; ++i) {
        board[i] = Tetrominoe.NoShape;
    }
}

The clearBoard() method fills the board with empty
NoShapes. 

private void pieceDropped() {

    for (int i = 0; i &lt; 4; ++i) {

        int x = curX + curPiece.x(i);
        int y = curY - curPiece.y(i);
        board[(y * BOARD_WIDTH) + x] = curPiece.getShape();
    }

    removeFullLines();

    if (!isFallingFinished) {
        newPiece();
    }
}

The pieceDropped() method puts the falling  piece into the board
array. Once again, the board holds all the squares of the pieces and remains of the
pieces that has finished falling. When the piece has finished falling, it is time to check,
if we can remove some lines off the board. This is the job of the removeFullLines()
method. Then we try to create a new piece. 

private void newPiece()  {

    curPiece.setRandomShape();
    curX = BOARD_WIDTH / 2 + 1;
    curY = BOARD_HEIGHT - 1 + curPiece.minY();

    if (!tryMove(curPiece, curX, curY)) {

        curPiece.setShape(Tetrominoe.NoShape);
        timer.stop();
        isStarted = false;
        statusbar.setText("game over");
    }
}

The newPiece() method creates a new Tetris
piece. The piece gets a new random shape. Then we compute the initial
curX and curY values.
If we cannot move to the initial positions, the game is over.
We top out. The timer is stopped. We put game over string on the statusbar.

private boolean tryMove(Shape newPiece, int newX, int newY) {

    for (int i = 0; i &lt; 4; ++i) {

        int x = newX + newPiece.x(i);
        int y = newY - newPiece.y(i);

        if (x &lt; 0 || x &gt;= BOARD_WIDTH || y &lt; 0 || y &gt;= BOARD_HEIGHT) {
            return false;
        }

        if (shapeAt(x, y) != Tetrominoe.NoShape) {
            return false;
        }
    }

    curPiece = newPiece;
    curX = newX;
    curY = newY;

    repaint();

    return true;
}

The tryMove() method tries to move the Tetris piece.
The method returns false if it has reached the board boundaries or it is
adjacent to the already fallen Tetris pieces.

int numFullLines = 0;

for (int i = BOARD_HEIGHT - 1; i &gt;= 0; --i) {

    boolean lineIsFull = true;

    for (int j = 0; j &lt; BOARD_WIDTH; ++j) {

        if (shapeAt(j, i) == Tetrominoe.NoShape) {
            lineIsFull = false;
            break;
        }
    }

    if (lineIsFull) {

        ++numFullLines;

        for (int k = i; k &lt; BOARD_HEIGHT - 1; ++k) {
            for (int j = 0; j &lt; BOARD_WIDTH; ++j)
                board[(k * BOARD_WIDTH) + j] = shapeAt(j, k + 1);
        }
    }
}

Inside the removeFullLines() method, we check if there is any full
row among all rows in the board. If there is at least one full
line, it is removed.  After finding a full line we increase the counter. We move
all the lines above the full row one line down. This way we destroy the full
line. Notice that in our Tetris game, we use so called naive gravity. This means
that the squares may be left floating above empty gaps.

Every Tetris piece has four squares. Each of the squares is drawn with
the drawSquare() method. Tetris pieces have different colours.

g.setColor(color.brighter());
g.drawLine(x, y + squareHeight() - 1, x, y);
g.drawLine(x, y, x + squareWidth() - 1, y);

The left and top sides of a square are drawn with a brighter
color. Similarly, the bottom and right sides are drawn with
darker colours. This is to simulate a 3D edge.

We control the game with a keyboard. The control mechanism is implemented
with a KeyAdapter. This is an inner class that overrides the
keyPressed() method.

case KeyEvent.VK_LEFT:
    tryMove(curPiece, curX - 1, curY);
    break;

If we press the left arrow key, we try to move the
falling piece one square to the left.

![tetris.png](images/tetris.png)

Figure: Tetris

This was the Tetris game.

[Contents](..)
[Previous](../puzzle/)