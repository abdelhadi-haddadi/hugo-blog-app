+++
title = "The Tetris game in wxPython"
date = 2025-08-29T20:15:58.636+01:00
draft = false
description = "In this part of the wxPython tutorial, we create a tetris game clone."
image = "images/tetrominoes.png"
imageBig = "images/tetrominoes.png"
categories = ["wxpython"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../skeletons/)

# The Tetris game in wxPython

last modified January 10, 2023

The Tetris game is one of the most popular computer games ever created. 
The original game was designed and programmed
by a Russian programmer *Alexey Pajitnov* in 1985. Since then, 
Tetris is available on almost every computer platform in lots of variations. 

Tetris is called a falling block puzzle game. In this game, we have 
seven different shapes called *tetrominoes*: S-shape, Z-shape, 
T-shape, L-shape, Line-shape, MirroredL-shape, and a Square-shape.
Each of these shapes is formed with four squares. The shapes are falling 
down the board. The object of the Tetris game is to move and rotate the shapes 
so that they fit as much as possible. If we manage to form a row, the row is 
destroyed and we score. We play the Tetris game until we top out.

![tetrominoes.png](images/tetrominoes.png)

Figure: Tetrominoes

wxPython is a toolkit designed to create applications. There are other 
libraries which are targeted at creating computer games.
Nevertheless, wxPython and other application toolkits can be used to 
create games.

## The development

We do not have images for our Tetris game, we draw the tetrominoes using the 
drawing API available in wxPython. Behind every computer game, there is a
mathematical model. So it is in Tetris. 

Some ideas behind the game:

  - We use wx.Timer to create a game cycle

  - The tetrominoes are drawn

  - The shapes move on a square by square basis (not pixel by pixel)

  - Mathematically a board is a simple list of numbers

tetris.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This is Tetris game clone in wxPython.

author: Jan Bodnar
website: www.zetcode.com
last modified: July 2020
"""

import wx
import random

class Tetris(wx.Frame):

    def __init__(self, parent):
        wx.Frame.__init__(self, parent, size=(180, 380),
            style=wx.DEFAULT_FRAME_STYLE ^ wx.RESIZE_BORDER ^ wx.MAXIMIZE_BOX)

        self.initFrame()

    def initFrame(self):

        self.statusbar = self.CreateStatusBar()
        self.statusbar.SetStatusText('0')
        self.board = Board(self)
        self.board.SetFocus()
        self.board.start()

        self.SetTitle("Tetris")
        self.Centre()

class Board(wx.Panel):

    BoardWidth = 10
    BoardHeight = 22
    Speed = 300
    ID_TIMER = 1

    def __init__(self, *args, **kw):

        super(Board, self).__init__(*args, **kw)

        self.initBoard()

    def initBoard(self):

        self.timer = wx.Timer(self, Board.ID_TIMER)
        self.isWaitingAfterLine = False
        self.curPiece = Shape()
        self.nextPiece = Shape()
        self.curX = 0
        self.curY = 0
        self.numLinesRemoved = 0
        self.board = []

        self.isStarted = False
        self.isPaused = False

        self.Bind(wx.EVT_PAINT, self.OnPaint)
        self.Bind(wx.EVT_KEY_DOWN, self.OnKeyDown)
        self.Bind(wx.EVT_TIMER, self.OnTimer, id=Board.ID_TIMER)

        self.clearBoard()

    def shapeAt(self, x, y):

        return self.board[(y * Board.BoardWidth) + x]

    def setShapeAt(self, x, y, shape):

        self.board[(y * Board.BoardWidth) + x] = shape

    def squareWidth(self):

        return self.GetClientSize().GetWidth() // Board.BoardWidth

    def squareHeight(self):

        return self.GetClientSize().GetHeight() // Board.BoardHeight

    def start(self):

        if self.isPaused:
            return

        self.isStarted = True
        self.isWaitingAfterLine = False
        self.numLinesRemoved = 0
        self.clearBoard()

        self.newPiece()
        self.timer.Start(Board.Speed)

    def pause(self):

        if not self.isStarted:
            return

        self.isPaused = not self.isPaused
        statusbar = self.GetParent().statusbar

        if self.isPaused:
            self.timer.Stop()
            statusbar.SetStatusText('paused')
        else:
            self.timer.Start(Board.Speed)
            statusbar.SetStatusText(str(self.numLinesRemoved))

        self.Refresh()

    def clearBoard(self):

        for i in range(Board.BoardHeight * Board.BoardWidth):
            self.board.append(Tetrominoes.NoShape)

    def OnPaint(self, event):

        dc = wx.PaintDC(self)

        size = self.GetClientSize()
        boardTop = size.GetHeight() - Board.BoardHeight * self.squareHeight()

        for i in range(Board.BoardHeight):
            for j in range(Board.BoardWidth):

                shape = self.shapeAt(j, Board.BoardHeight - i - 1)

                if shape != Tetrominoes.NoShape:
                    self.drawSquare(dc,
                        0 + j * self.squareWidth(),
                        boardTop + i * self.squareHeight(), shape)

        if self.curPiece.shape() != Tetrominoes.NoShape:

            for i in range(4):

                x = self.curX + self.curPiece.x(i)
                y = self.curY - self.curPiece.y(i)

                self.drawSquare(dc, 0 + x * self.squareWidth(),
                    boardTop + (Board.BoardHeight - y - 1) * self.squareHeight(),
                    self.curPiece.shape())

    def OnKeyDown(self, event):

        if not self.isStarted or self.curPiece.shape() == Tetrominoes.NoShape:
            event.Skip()
            return

        keycode = event.GetKeyCode()

        if keycode == ord('P') or keycode == ord('p'):
            self.pause()
            return

        if self.isPaused:
            return

        elif keycode == wx.WXK_LEFT:
            self.tryMove(self.curPiece, self.curX - 1, self.curY)

        elif keycode == wx.WXK_RIGHT:
            self.tryMove(self.curPiece, self.curX + 1, self.curY)

        elif keycode == wx.WXK_DOWN:
            self.tryMove(self.curPiece.rotatedRight(), self.curX, self.curY)

        elif keycode == wx.WXK_UP:
            self.tryMove(self.curPiece.rotatedLeft(), self.curX, self.curY)

        elif keycode == wx.WXK_SPACE:
            self.dropDown()

        elif keycode == ord('D') or keycode == ord('d'):
            self.oneLineDown()

        else:
            event.Skip()

    def OnTimer(self, event):

        if event.GetId() == Board.ID_TIMER:

            if self.isWaitingAfterLine:
                self.isWaitingAfterLine = False
                self.newPiece()

            else:
                self.oneLineDown()

        else:
            event.Skip()

    def dropDown(self):

        newY = self.curY

        while newY &gt; 0:
            if not self.tryMove(self.curPiece, self.curX, newY - 1):
                break
            newY -= 1

        self.pieceDropped()

    def oneLineDown(self):

        if not self.tryMove(self.curPiece, self.curX, self.curY - 1):
            self.pieceDropped()

    def pieceDropped(self):

        for i in range(4):

            x = self.curX + self.curPiece.x(i)
            y = self.curY - self.curPiece.y(i)
            self.setShapeAt(x, y, self.curPiece.shape())

        self.removeFullLines()

        if not self.isWaitingAfterLine:
            self.newPiece()

    def removeFullLines(self):

        numFullLines = 0

        statusbar = self.GetParent().statusbar

        rowsToRemove = []

        for i in range(Board.BoardHeight):
            n = 0
            for j in range(Board.BoardWidth):
                if not self.shapeAt(j, i) == Tetrominoes.NoShape:
                    n = n + 1

            if n == 10:
                rowsToRemove.append(i)

        rowsToRemove.reverse()

        for m in rowsToRemove:
            for k in range(m, Board.BoardHeight):
                for l in range(Board.BoardWidth):
                        self.setShapeAt(l, k, self.shapeAt(l, k + 1))

            numFullLines = numFullLines + len(rowsToRemove)

            if numFullLines &gt; 0:

                self.numLinesRemoved = self.numLinesRemoved + numFullLines
                statusbar.SetStatusText(str(self.numLinesRemoved))
                self.isWaitingAfterLine = True
                self.curPiece.setShape(Tetrominoes.NoShape)
                self.Refresh()

    def newPiece(self):

        self.curPiece = self.nextPiece
        statusbar = self.GetParent().statusbar
        self.nextPiece.setRandomShape()

        self.curX = Board.BoardWidth // 2 + 1
        self.curY = Board.BoardHeight - 1 + self.curPiece.minY()

        if not self.tryMove(self.curPiece, self.curX, self.curY):

            self.curPiece.setShape(Tetrominoes.NoShape)
            self.timer.Stop()
            self.isStarted = False
            statusbar.SetStatusText('Game over')

    def tryMove(self, newPiece, newX, newY):

        for i in range(4):

            x = newX + newPiece.x(i)
            y = newY - newPiece.y(i)

            if x &lt; 0 or x &gt;= Board.BoardWidth or y &lt; 0 or y &gt;= Board.BoardHeight:
                return False

            if self.shapeAt(x, y) != Tetrominoes.NoShape:
                return False

        self.curPiece = newPiece
        self.curX = newX
        self.curY = newY
        self.Refresh()

        return True

    def drawSquare(self, dc, x, y, shape):

        colors = ['#000000', '#CC6666', '#66CC66', '#6666CC',
                  '#CCCC66', '#CC66CC', '#66CCCC', '#DAAA00']

        light = ['#000000', '#F89FAB', '#79FC79', '#7979FC',
                 '#FCFC79', '#FC79FC', '#79FCFC', '#FCC600']

        dark = ['#000000', '#803C3B', '#3B803B', '#3B3B80',
                 '#80803B', '#803B80', '#3B8080', '#806200']

        pen = wx.Pen(light[shape])
        pen.SetCap(wx.CAP_PROJECTING)
        dc.SetPen(pen)

        dc.DrawLine(x, y + self.squareHeight() - 1, x, y)
        dc.DrawLine(x, y, x + self.squareWidth() - 1, y)

        darkpen = wx.Pen(dark[shape])
        darkpen.SetCap(wx.CAP_PROJECTING)
        dc.SetPen(darkpen)

        dc.DrawLine(x + 1, y + self.squareHeight() - 1,
            x + self.squareWidth() - 1, y + self.squareHeight() - 1)
        dc.DrawLine(x + self.squareWidth() - 1,
        y + self.squareHeight() - 1, x + self.squareWidth() - 1, y + 1)

        dc.SetPen(wx.TRANSPARENT_PEN)
        dc.SetBrush(wx.Brush(colors[shape]))
        dc.DrawRectangle(x + 1, y + 1, self.squareWidth() - 2,
        self.squareHeight() - 2)

class Tetrominoes(object):

    NoShape = 0
    ZShape = 1
    SShape = 2
    LineShape = 3
    TShape = 4
    SquareShape = 5
    LShape = 6
    MirroredLShape = 7

class Shape(object):

    coordsTable = (
        ((0, 0),     (0, 0),     (0, 0),     (0, 0)),
        ((0, -1),    (0, 0),     (-1, 0),    (-1, 1)),
        ((0, -1),    (0, 0),     (1, 0),     (1, 1)),
        ((0, -1),    (0, 0),     (0, 1),     (0, 2)),
        ((-1, 0),    (0, 0),     (1, 0),     (0, 1)),
        ((0, 0),     (1, 0),     (0, 1),     (1, 1)),
        ((-1, -1),   (0, -1),    (0, 0),     (0, 1)),
        ((1, -1),    (0, -1),    (0, 0),     (0, 1))
    )

    def __init__(self):

        self.coords = [[0,0] for i in range(4)]
        self.pieceShape = Tetrominoes.NoShape

        self.setShape(Tetrominoes.NoShape)

    def shape(self):

        return self.pieceShape

    def setShape(self, shape):

        table = Shape.coordsTable[shape]
        for i in range(4):
            for j in range(2):
                self.coords[i][j] = table[i][j]

        self.pieceShape = shape

    def setRandomShape(self):

        self.setShape(random.randint(1, 7))

    def x(self, index):

        return self.coords[index][0]

    def y(self, index):

        return self.coords[index][1]

    def setX(self, index, x):

        self.coords[index][0] = x

    def setY(self, index, y):

        self.coords[index][1] = y

    def minX(self):

        m = self.coords[0][0]
        for i in range(4):
            m = min(m, self.coords[i][0])

        return m

    def maxX(self):

        m = self.coords[0][0]
        for i in range(4):
            m = max(m, self.coords[i][0])

        return m

    def minY(self):

        m = self.coords[0][1]
        for i in range(4):
            m = min(m, self.coords[i][1])

        return m

    def maxY(self):

        m = self.coords[0][1]

        for i in range(4):
            m = max(m, self.coords[i][1])

        return m

    def rotatedLeft(self):

        if self.pieceShape == Tetrominoes.SquareShape:
            return self

        result = Shape()
        result.pieceShape = self.pieceShape

        for i in range(4):
            result.setX(i, self.y(i))
            result.setY(i, -self.x(i))

        return result

    def rotatedRight(self):

        if self.pieceShape == Tetrominoes.SquareShape:
            return self

        result = Shape()
        result.pieceShape = self.pieceShape

        for i in range(4):
            result.setX(i, -self.y(i))
            result.setY(i, self.x(i))

        return result

def main():

    app = wx.App()
    ex = Tetris(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

The game is simplified a bit so that it is easier to understand. 
It starts immediately after the application is launched. We can pause 
the game by pressing the p key. The Space key drops 
the falling Tetris piece immediately to the bottom. The d key 
drops the piece one line down. (It can be used to speed up the falling.)
The game goes at constant speed, no acceleration is implemented. The 
score is the number of lines that we have removed.

def __init__(self, *args, **kw):
    
    super(Board, self).__init__(*args, **kw)

A note for Windows users. If you cannot use the arrow keys, add
style=wx.WANTS_CHARS to the board constructor. 

...
self.curX = 0
self.curY = 0
self.numLinesRemoved = 0
self.board = []
...

Before we start the game cycle, we initialize some important variables. 
The self.board variable is a list of numbers from 0 ... 7. It represents 
the position of various shapes and remains of the shapes on the board.

for i in range(Board.BoardHeight):
    for j in range(Board.BoardWidth):
       
        shape = self.shapeAt(j, Board.BoardHeight - i - 1)
        
        if shape != Tetrominoes.NoShape:
            self.drawSquare(dc,
                0 + j * self.squareWidth(),
                boardTop + i * self.squareHeight(), shape)

The painting of the game is divided into two steps. In the first step, we 
draw all the shapes, or remains of the shapes that
have been dropped to the bottom of the board. All the squares are rememberd 
in the self.board list variable.
We access it using the shapeAt() method.

if self.curPiece.shape() != Tetrominoes.NoShape:
   
    for i in range(4):
       
        x = self.curX + self.curPiece.x(i)
        y = self.curY - self.curPiece.y(i)
        
        self.drawSquare(dc, 0 + x * self.squareWidth(),
            boardTop + (Board.BoardHeight - y - 1) * self.squareHeight(),
            self.curPiece.shape())

The next step is drawing of the actual piece that is falling down.

elif keycode == wx.WXK_LEFT:
    self.tryMove(self.curPiece, self.curX - 1, self.curY)

In the OnKeyDown() method we check for pressed keys. If we 
press the left arrow key, we try to move the piece to the left. We say 
try because the piece might not be able to move. 

def tryMove(self, newPiece, newX, newY):

    for i in range(4):
        x = newX + newPiece.x(i)
        y = newY - newPiece.y(i)
        if x &lt; 0 or x &gt;= Board.BoardWidth or y &lt; 0 or y &gt;= Board.BoardHeight:
            return False
        if self.shapeAt(x, y) != Tetrominoes.NoShape:
            return False

    self.curPiece = newPiece
    self.curX = newX
    self.curY = newY
    self.Refresh()
    
    return True

In the tryMove() method we try to move our shapes. If the shape 
is at the edge of the board or is adjacent to some
other piece, we return False; otherwise we place the current falling 
piece to a new position and return True.

def OnTimer(self, event):

    if event.GetId() == Board.ID_TIMER:
        if self.isWaitingAfterLine:
            self.isWaitingAfterLine = False
            self.newPiece()
        else:
            self.oneLineDown()
    else:
        event.Skip()

In the OnTimer() method we either create a new piece, after the 
previous one was dropped to the bottom, or we move a falling piece one line down. 

def removeFullLines(self):

    numFullLines = 0

    rowsToRemove = []

    for i in range(Board.BoardHeight):
        n = 0
        for j in range(Board.BoardWidth):
            if not self.shapeAt(j, i) == Tetrominoes.NoShape:
                n = n + 1

        if n == 10:
            rowsToRemove.append(i)

    rowsToRemove.reverse()

    for m in rowsToRemove:
        for k in range(m, Board.BoardHeight):
            for l in range(Board.BoardWidth):
                self.setShapeAt(l, k, self.shapeAt(l, k + 1))
...

If the piece hits the bottom, we call the removeFullLines() method. 
First we find out all full lines and remove them. We do it by moving all 
lines above the current full line to be removed one line down. Notice that we 
reverse the order of the lines to be removed. Otherwise, it would not work correctly.
In our case we use a *naive gravity*. This means that the pieces may 
be floating above empty gaps.

def newPiece(self):

    self.curPiece = self.nextPiece
    statusbar = self.GetParent().statusbar
    self.nextPiece.setRandomShape()
    self.curX = Board.BoardWidth / 2 + 1
    self.curY = Board.BoardHeight - 1 + self.curPiece.minY()

    if not self.tryMove(self.curPiece, self.curX, self.curY):
    
        self.curPiece.setShape(Tetrominoes.NoShape)
        self.timer.Stop()
        self.isStarted = False
        statusbar.SetStatusText('Game over')

The newPiece() method creates randomly a new tetris piece. 
If the piece cannot go into its initial position, the game is over. 

The Shape class saves information about the tetris piece. 

self.coords = [[0,0] for i in range(4)]

Upon creation we create an empty coordinates list. The list will save 
the coordinates of the Tetris piece. For example, the tuples (0, -1), 
(0, 0), (-1, 0), (-1, -1) represent a rotated S-shape. The following diagram 
illustrates the shape.

![coordinates.png](images/coordinates.png)

Figure: Coordinates

When we draw the current falling piece, we draw it at self.curX and
self.curY position. Then we look at the coordinates table and draw 
all the four squares. 

![tetris.png](images/tetris.png)

Figure: Tetris

This was a Tetris game in wxPython.

 

[Contents](..) 
[Previous](../skeletons/)