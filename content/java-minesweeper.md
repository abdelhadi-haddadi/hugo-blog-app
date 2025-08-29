+++
title = "Java Minesweeper"
date = 2025-08-29T20:01:01.480+01:00
draft = false
description = "Java Minesweeper tutorial shows how to create a Minesweeper game clone in Java."
image = "images/minesweeper.png"
imageBig = "images/minesweeper.png"
categories = ["javagames"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../spaceinvaders/)
[Next](../sokoban/)

# Java Minesweeper

last modified January 10, 2023

In this part of the Java 2D games tutorial, we create a Minesweeper game clone.
Source code and images can be found at the author's Github
[Java-Minesweeper-Game](https://github.com/janbodnar/Java-Minesweeper-Game) repository.

## Minesweeper

Minesweeper is a popular board game shipped with many operating systems by default.
The goal of the game is to sweep all mines from a mine field. If the player
clicks on the cell which contains a mine, the mine detonates and the game is over.

A cell can contain a number or it can be blank. The number indicates
how many mines are adjacent to this particular cell. We set a mark on a cell
by right clicking on it. This way we indicate that we believe, there is a mine.

## Development of Java Minesweeper game

The game consists of two classes: Board and Minesweeper.
We have thirteen images in the src/resources directory.

com/zetcode/Board.java
  

package com.zetcode;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.Random;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class Board extends JPanel {

    private final int NUM_IMAGES = 13;
    private final int CELL_SIZE = 15;

    private final int COVER_FOR_CELL = 10;
    private final int MARK_FOR_CELL = 10;
    private final int EMPTY_CELL = 0;
    private final int MINE_CELL = 9;
    private final int COVERED_MINE_CELL = MINE_CELL + COVER_FOR_CELL;
    private final int MARKED_MINE_CELL = COVERED_MINE_CELL + MARK_FOR_CELL;

    private final int DRAW_MINE = 9;
    private final int DRAW_COVER = 10;
    private final int DRAW_MARK = 11;
    private final int DRAW_WRONG_MARK = 12;

    private final int N_MINES = 40;
    private final int N_ROWS = 16;
    private final int N_COLS = 16;

    private final int BOARD_WIDTH = N_COLS * CELL_SIZE + 1;
    private final int BOARD_HEIGHT = N_ROWS * CELL_SIZE + 1;

    private int[] field;
    private boolean inGame;
    private int minesLeft;
    private Image[] img;

    private int allCells;
    private final JLabel statusbar;

    public Board(JLabel statusbar) {

        this.statusbar = statusbar;
        initBoard();
    }

    private void initBoard() {

        setPreferredSize(new Dimension(BOARD_WIDTH, BOARD_HEIGHT));

        img = new Image[NUM_IMAGES];

        for (int i = 0; i &lt; NUM_IMAGES; i++) {

            var path = "src/resources/" + i + ".png";
            img[i] = (new ImageIcon(path)).getImage();
        }

        addMouseListener(new MinesAdapter());
        newGame();
    }

    private void newGame() {

        int cell;

        var random = new Random();
        inGame = true;
        minesLeft = N_MINES;

        allCells = N_ROWS * N_COLS;
        field = new int[allCells];

        for (int i = 0; i &lt; allCells; i++) {

            field[i] = COVER_FOR_CELL;
        }

        statusbar.setText(Integer.toString(minesLeft));

        int i = 0;

        while (i &lt; N_MINES) {

            int position = (int) (allCells * random.nextDouble());

            if ((position &lt; allCells)
                    &amp;&amp; (field[position] != COVERED_MINE_CELL)) {

                int current_col = position % N_COLS;
                field[position] = COVERED_MINE_CELL;
                i++;

                if (current_col &gt; 0) {
                    cell = position - 1 - N_COLS;
                    if (cell &gt;= 0) {
                        if (field[cell] != COVERED_MINE_CELL) {
                            field[cell] += 1;
                        }
                    }
                    cell = position - 1;
                    if (cell &gt;= 0) {
                        if (field[cell] != COVERED_MINE_CELL) {
                            field[cell] += 1;
                        }
                    }

                    cell = position + N_COLS - 1;
                    if (cell &lt; allCells) {
                        if (field[cell] != COVERED_MINE_CELL) {
                            field[cell] += 1;
                        }
                    }
                }

                cell = position - N_COLS;
                if (cell &gt;= 0) {
                    if (field[cell] != COVERED_MINE_CELL) {
                        field[cell] += 1;
                    }
                }

                cell = position + N_COLS;
                if (cell &lt; allCells) {
                    if (field[cell] != COVERED_MINE_CELL) {
                        field[cell] += 1;
                    }
                }

                if (current_col &lt; (N_COLS - 1)) {
                    cell = position - N_COLS + 1;
                    if (cell &gt;= 0) {
                        if (field[cell] != COVERED_MINE_CELL) {
                            field[cell] += 1;
                        }
                    }
                    cell = position + N_COLS + 1;
                    if (cell &lt; allCells) {
                        if (field[cell] != COVERED_MINE_CELL) {
                            field[cell] += 1;
                        }
                    }
                    cell = position + 1;
                    if (cell &lt; allCells) {
                        if (field[cell] != COVERED_MINE_CELL) {
                            field[cell] += 1;
                        }
                    }
                }
            }
        }
    }

    private void find_empty_cells(int j) {

        int current_col = j % N_COLS;
        int cell;

        if (current_col &gt; 0) {
            cell = j - N_COLS - 1;
            if (cell &gt;= 0) {
                if (field[cell] &gt; MINE_CELL) {
                    field[cell] -= COVER_FOR_CELL;
                    if (field[cell] == EMPTY_CELL) {
                        find_empty_cells(cell);
                    }
                }
            }

            cell = j - 1;
            if (cell &gt;= 0) {
                if (field[cell] &gt; MINE_CELL) {
                    field[cell] -= COVER_FOR_CELL;
                    if (field[cell] == EMPTY_CELL) {
                        find_empty_cells(cell);
                    }
                }
            }

            cell = j + N_COLS - 1;
            if (cell &lt; allCells) {
                if (field[cell] &gt; MINE_CELL) {
                    field[cell] -= COVER_FOR_CELL;
                    if (field[cell] == EMPTY_CELL) {
                        find_empty_cells(cell);
                    }
                }
            }
        }

        cell = j - N_COLS;
        if (cell &gt;= 0) {
            if (field[cell] &gt; MINE_CELL) {
                field[cell] -= COVER_FOR_CELL;
                if (field[cell] == EMPTY_CELL) {
                    find_empty_cells(cell);
                }
            }
        }

        cell = j + N_COLS;
        if (cell &lt; allCells) {
            if (field[cell] &gt; MINE_CELL) {
                field[cell] -= COVER_FOR_CELL;
                if (field[cell] == EMPTY_CELL) {
                    find_empty_cells(cell);
                }
            }
        }

        if (current_col &lt; (N_COLS - 1)) {
            cell = j - N_COLS + 1;
            if (cell &gt;= 0) {
                if (field[cell] &gt; MINE_CELL) {
                    field[cell] -= COVER_FOR_CELL;
                    if (field[cell] == EMPTY_CELL) {
                        find_empty_cells(cell);
                    }
                }
            }

            cell = j + N_COLS + 1;
            if (cell &lt; allCells) {
                if (field[cell] &gt; MINE_CELL) {
                    field[cell] -= COVER_FOR_CELL;
                    if (field[cell] == EMPTY_CELL) {
                        find_empty_cells(cell);
                    }
                }
            }

            cell = j + 1;
            if (cell &lt; allCells) {
                if (field[cell] &gt; MINE_CELL) {
                    field[cell] -= COVER_FOR_CELL;
                    if (field[cell] == EMPTY_CELL) {
                        find_empty_cells(cell);
                    }
                }
            }
        }

    }

    @Override
    public void paintComponent(Graphics g) {

        int uncover = 0;

        for (int i = 0; i &lt; N_ROWS; i++) {

            for (int j = 0; j &lt; N_COLS; j++) {

                int cell = field[(i * N_COLS) + j];

                if (inGame &amp;&amp; cell == MINE_CELL) {

                    inGame = false;
                }

                if (!inGame) {

                    if (cell == COVERED_MINE_CELL) {
                        cell = DRAW_MINE;
                    } else if (cell == MARKED_MINE_CELL) {
                        cell = DRAW_MARK;
                    } else if (cell &gt; COVERED_MINE_CELL) {
                        cell = DRAW_WRONG_MARK;
                    } else if (cell &gt; MINE_CELL) {
                        cell = DRAW_COVER;
                    }

                } else {

                    if (cell &gt; COVERED_MINE_CELL) {
                        cell = DRAW_MARK;
                    } else if (cell &gt; MINE_CELL) {
                        cell = DRAW_COVER;
                        uncover++;
                    }
                }

                g.drawImage(img[cell], (j * CELL_SIZE),
                        (i * CELL_SIZE), this);
            }
        }

        if (uncover == 0 &amp;&amp; inGame) {

            inGame = false;
            statusbar.setText("Game won");

        } else if (!inGame) {

            statusbar.setText("Game lost");
        }
    }

    private class MinesAdapter extends MouseAdapter {

        @Override
        public void mousePressed(MouseEvent e) {

            int x = e.getX();
            int y = e.getY();

            int cCol = x / CELL_SIZE;
            int cRow = y / CELL_SIZE;

            boolean doRepaint = false;

            if (!inGame) {

                newGame();
                repaint();
            }

            if ((x &lt; N_COLS * CELL_SIZE) &amp;&amp; (y &lt; N_ROWS * CELL_SIZE)) {

                if (e.getButton() == MouseEvent.BUTTON3) {

                    if (field[(cRow * N_COLS) + cCol] &gt; MINE_CELL) {

                        doRepaint = true;

                        if (field[(cRow * N_COLS) + cCol] &lt;= COVERED_MINE_CELL) {

                            if (minesLeft &gt; 0) {
                                field[(cRow * N_COLS) + cCol] += MARK_FOR_CELL;
                                minesLeft--;
                                String msg = Integer.toString(minesLeft);
                                statusbar.setText(msg);
                            } else {
                                statusbar.setText("No marks left");
                            }
                        } else {

                            field[(cRow * N_COLS) + cCol] -= MARK_FOR_CELL;
                            minesLeft++;
                            String msg = Integer.toString(minesLeft);
                            statusbar.setText(msg);
                        }
                    }

                } else {

                    if (field[(cRow * N_COLS) + cCol] &gt; COVERED_MINE_CELL) {

                        return;
                    }

                    if ((field[(cRow * N_COLS) + cCol] &gt; MINE_CELL)
                            &amp;&amp; (field[(cRow * N_COLS) + cCol] &lt; MARKED_MINE_CELL)) {

                        field[(cRow * N_COLS) + cCol] -= COVER_FOR_CELL;
                        doRepaint = true;

                        if (field[(cRow * N_COLS) + cCol] == MINE_CELL) {
                            inGame = false;
                        }

                        if (field[(cRow * N_COLS) + cCol] == EMPTY_CELL) {
                            find_empty_cells((cRow * N_COLS) + cCol);
                        }
                    }
                }

                if (doRepaint) {
                    repaint();
                }
            }
        }
    }
}

First we define the constants used in our game.

private final int NUM_IMAGES = 13;
private final int CELL_SIZE = 15;

There are thirteen images used in this game. A cell can be surrounded by
maximum of eight mines, so we need numbers one through eight. We need images
for an empty cell, a mine, a covered cell, a marked cell and finally for a
wrongly marked cell. The size of each of the images is 15x15 px.

private final int COVER_FOR_CELL = 10;
private final int MARK_FOR_CELL = 10;
private final int EMPTY_CELL = 0;
...

A mine field is an array of numbers. For example, 0 denotes an empty cell.
Number 10 is used for a cell cover as well as for a mark. Using constants
improves readability of the code.

private final int MINE_CELL = 9;

The MINE_CELL represents a cell that contains a mine.

private final int COVERED_MINE_CELL = MINE_CELL + COVER_FOR_CELL;
private final int MARKED_MINE_CELL = COVERED_MINE_CELL + MARK_FOR_CELL;

The COVERED_MINE_CELL is used for a field that is covered
and contains a mine. The MARKED_MINE_CELLcode&gt; is a covered mine cell
that was marked by the user.

private final int DRAW_MINE = 9;
private final int DRAW_COVER = 10;
private final int DRAW_MARK = 11;
private final int DRAW_WRONG_MARK = 12;

These contants determine whether to draw a mine, a mine cover, a mark,
and a wrongly marked cell.

private final int N_MINES = 40;
private final int N_ROWS = 16;
private final int N_COLS = 16;

The minefield in our game has fourty hidden mines. There are sixteen rows and
sixteen columns in the field. So there are two hundred and twenty-six cells
together in the minefield.

private int[] field;

The field is an array of numbers. Each cell in the field has a specific number.
For instance, a mine cell has number 9. A cell with number 2 means it
is adjacent to two mines. The numbers are added. For example, a covered mine
has number 19, 9 for the mine and 10 for the cell cover and so on.

private boolean inGame;

The inGame variable determines whether we are in the game
or the game is over.

private int minesLeft;

The minesLeft variable the number of mines to be marked left.

for (int i = 0; i &lt; NUM_IMAGES; i++) {

    var path = "src/resources/" + i + ".png";
    img[i] = (new ImageIcon(path)).getImage();
}

We load our images into the image array. The images are named 0.png,
1.png ... 12.png.

The newGame() initiates the Minesweeper game.

allCells = N_ROWS * N_COLS;
field = new int[allCells];

for (int i = 0; i &lt; allCells; i++) {

    field[i] = COVER_FOR_CELL;
}

These lines set up the mine field. Every cell is covered by default.

int i = 0;

while (i &lt; N_MINES) {

    int position = (int) (allCells * random.nextDouble());

    if ((position &lt; allCells)
            &amp;&amp; (field[position] != COVERED_MINE_CELL)) {

        int current_col = position % N_COLS;
        field[position] = COVERED_MINE_CELL;
        i++;
...

In the while cycle we randomly position all mines in the field.

cell = position - N_COLS;

if (cell &gt;= 0) {
    if (field[cell] != COVERED_MINE_CELL) {
        field[cell] += 1;
    }
}

Each of the cells can be surrounded up to eight cells. (This does not apply to
the border cells.) We raise the number for adjacent cells for each of the
randomly placed mine. In our example, we add 1 to the top neighbour of the cell
in question.

In the find_empty_cells() method, we find empty cells. If the
player clicks on a mine cell, the game is over. If he clicks on a cell adjacent
to a mine, he uncovers a number indicating how many mines the cell is adjacent
to. Clicking on an empty cell leads to uncovering many other empty cells plus
cells with a number that form a border around a space of empty borders. We use a
recursive algorithm to find empty cells.

cell = j - 1;
if (cell &lt;= 0) {
    if (field[cell] &gt; MINE_CELL) {
        field[cell] -= COVER_FOR_CELL;
        if (field[cell] == EMPTY_CELL) {
            find_empty_cells(cell);
        }
    }
}

In this code, we check the cell that is located to the left to an empty
cell in question. If it is not empty, it is uncovered. If it is empty,
we repeat the whole process by recursively calling the
find_empty_cells() method.

The paintComponent() method turns numbers into images.

if (!inGame) {
    if (cell == COVERED_MINE_CELL) {
        cell = DRAW_MINE;
    } else if (cell == MARKED_MINE_CELL) {
        cell = DRAW_MARK;
    } else if (cell &gt; COVERED_MINE_CELL) {
        cell = DRAW_WRONG_MARK;
    } else if (cell &gt; MINE_CELL) {
        cell = DRAW_COVER;
    }
} ...

If the game is over and we lost, we show all uncovered mines if any and
show all wrongly marked cells if any.

g.drawImage(img[cell], (j * CELL_SIZE),
    (i * CELL_SIZE), this);

This code line draws every cell on the window.

if (uncover == 0 &amp;&amp; inGame) {

    inGame = false;
    statusbar.setText("Game won");
} else if (!inGame) {

    statusbar.setText("Game lost");
}

If there is nothing left to uncover, we win. If the inGame
variable was set to false, we have lost.

In the mousePressed() method we react to mouse clicks.
The Minesweeper game is controlled solely by mouse. We react to left and
right mouse clicks.

int x = e.getX();
int y = e.getY();

We determine the x and y coordinates of the mouse
pointer.

int cCol = x / CELL_SIZE;
int cRow = y / CELL_SIZE;

We compute the corresponding column and row of the mine field.

if ((x &lt; N_COLS * CELL_SIZE) &amp;&amp; (y &lt; N_ROWS * CELL_SIZE)) {

We check that we are located in the area of the mine field.

if (e.getButton() == MouseEvent.BUTTON3) {

The uncovering of the mines is done with the right mouse button.

field[(cRow * N_COLS) + cCol] += MARK_FOR_CELL;
minesLeft--;

If we right click on an unmarked cell, we add MARK_FOR_CELL to
the number representing the cell. This leads to drawing a covered
cell with a mark in the paintComponent() method.

field[(cRow * N_COLS) + cCol] -= MARK_FOR_CELL;
minesLeft++;

var msg = Integer.toString(minesLeft);
statusbar.setText(msg);

If we left click on a cell that has been already marked, we remove the
mark and increase the number of cells to be marked.

if (field[(cRow * N_COLS) + cCol] &gt; COVERED_MINE_CELL) {
    return;
}

Nothing happens if we click on the covered and marked cell.
It must by first uncovered by another right click and only
then it is possible to left click on it.

field[(cRow * N_COLS) + cCol] -= COVER_FOR_CELL;

A left click removes a cover from the cell.

if (field[(cRow * N_COLS) + cCol] == MINE_CELL) {
    inGame = false;
}

if (field[(cRow * N_COLS) + cCol] == EMPTY_CELL) {
    find_empty_cells((cRow * N_COLS) + cCol);
}

In case we left clicked on a mine, the game is over. If we left click
on an empty cell, we call the find_empty_cells() method which
recursively finds all adjacent empty cells.

if (doRepaint) {
    repaint();
}

If the board needs to be repainted (for instance a mark was set or removed),
we call the repaint() method.

com/zetcode/Minesweeper.java
  

package com.zetcode;

import java.awt.BorderLayout;
import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JLabel;

/**
 * Java Minesweeper Game
 *
 * Author: Jan Bodnar
 * Website: http://zetcode.com
 */

public class Minesweeper extends JFrame {

    private JLabel statusbar;

    public Minesweeper() {

        initUI();
    }

    private void initUI() {

        statusbar = new JLabel("");
        add(statusbar, BorderLayout.SOUTH);

        add(new Board(statusbar));

        setResizable(false);
        pack();

        setTitle("Minesweeper");
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {

            var ex = new Minesweeper();
            ex.setVisible(true);
        });
    }
}

This is the main class.

setResizable(false);

The window has fixed size. For this, we use the setResizable()
method.

![minesweeper.png](images/minesweeper.png)

Figure: Minesweeper

In this part of the Java 2D games tutorial, we created a Java clone of
the Minesweeper game.

[Contents](..)
[Previous](../spaceinvaders/)
[Next](../sokoban/)