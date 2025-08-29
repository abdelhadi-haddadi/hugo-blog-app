+++
title = "The Tetris game in wxWidgets"
date = 2025-08-29T19:57:49.184+01:00
draft = false
description = "In this part of the wxWidgets tutorial, we create a simple tetris game."
image = "images/tetrominoes.png"
imageBig = "images/tetrominoes.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../customwidgets/)

# The Tetris game in wxWidgets

last modified October 18, 2023

The Tetris game is one of the most popular computer games ever created. 
The original game was designed and programmed
by a Russian programmer *Alexey Pajitnov* in 1985. Since then, 
Tetris is available on almost every computer platform in lots of variations. 

Tetris is called a falling block puzzle game. In this game, we have seven 
different shapes called *tetrominoes*. S-shape, Z-shape, T-shape, 
L-shape, Line-shape, MirroredL-shape, and a Square-shape. Each of these shapes 
is formed with four squares. The shapes are falling down the board.
The object of the Tetris game is to move and rotate the shapes, 
so that they fit as much as possible. If we manage to form a row, the row 
is destroyed and we score. We play the Tetris game until we top out.

![tetrominoes.png](images/tetrominoes.png)

Figure: Tetrominoes

wxWidgets is a toolkit designed to create applications. There are other libraries 
which are targeted at creating computer games. Nevertheless, wxWidgets and other
application toolkits can be used to create simple games.

## The development

We do not have images for our Tetris game, we draw the tetrominoes using the drawing 
API available in the wxWidgets programming toolkit. Behind every computer game, 
there is a mathematical model. So it is in Tetris. 

Some ideas behind the game.

  - We use wxTimer to create a game cycle.

  - The tetrominoes are drawn.

  - The shapes move on a square by square basis (not pixel by pixel).

  - Mathematically a board is a simple list of numbers.

Shape.h
  

#ifndef SHAPE_H
#define SHAPE_H

enum Tetrominoes { NoShape, ZShape, SShape, LineShape, 
                  TShape, SquareShape, LShape, MirroredLShape };

class Shape
{
public:
    Shape() { SetShape(NoShape); }
    void SetShape(Tetrominoes shape);
    void SetRandomShape();

    Tetrominoes GetShape() const { return pieceShape; }
    int x(int index) const { return coords[index][0]; }
    int y(int index) const { return coords[index][1]; }

    int MinX() const;
    int MaxX() const;
    int MinY() const;
    int MaxY() const;

    Shape RotateLeft() const;
    Shape RotateRight() const;

private:
    void SetX(int index, int x) { coords[index][0] = x; }
    void SetY(int index, int y) { coords[index][1] = y; }
    Tetrominoes pieceShape;
    int coords[4][2];
};

#endif

Shape.cpp
  

```
#include &lt;stdlib.h&gt;
#include &lt;algorithm&gt;
#include "Shape.h"

using namespace std;

void Shape::SetShape(Tetrominoes shape)
{
    static const int coordsTable[8][4][2] = {
        { { 0, 0 },   { 0, 0 },   { 0, 0 },   { 0, 0 } },
        { { 0, -1 },  { 0, 0 },   { -1, 0 },  { -1, 1 } },
        { { 0, -1 },  { 0, 0 },   { 1, 0 },   { 1, 1 } },
        { { 0, -1 },  { 0, 0 },   { 0, 1 },   { 0, 2 } },
        { { -1, 0 },  { 0, 0 },   { 1, 0 },   { 0, 1 } },
        { { 0, 0 },   { 1, 0 },   { 0, 1 },   { 1, 1 } },
        { { -1, -1 }, { 0, -1 },  { 0, 0 },   { 0, 1 } },
        { { 1, -1 },  { 0, -1 },  { 0, 0 },   { 0, 1 } }
    };

    for (int i = 0; i &lt; 4 ; i++) {
        for (int j = 0; j &lt; 2; ++j)
            coords[i][j] = coordsTable[shape][i][j];
    }
    pieceShape = shape;
}

void Shape::SetRandomShape()
{
  int x = rand() % 7 + 1;
  SetShape(Tetrominoes(x));
}

int Shape::MinX() const
{
  int m = coords[0][0];
  for (int i=0; i&lt;4; i++) {
      m = min(m, coords[i][0]);
  }
  return m;
}

int Shape::MaxX() const
{
  int m = coords[0][0];
  for (int i=0; i&lt;4; i++) {
      m = max(m, coords[i][0]);
  }
  return m;
}

int Shape::MinY() const
{
  int m = coords[0][1];
  for (int i=0; i&lt;4; i++) {
      m = min(m, coords[i][1]);
  }
  return m;
}

int Shape::MaxY() const
{
  int m = coords[0][1];
  for (int i=0; i&lt;4; i++) {
      m = max(m, coords[i][1]);
  }
  return m;
}

Shape Shape::RotateLeft() const
{
    if (pieceShape == SquareShape)
        return *this;

    Shape result;
    result.pieceShape = pieceShape;
    for (int i = 0; i &lt; 4; ++i) {
        result.SetX(i, y(i));
        result.SetY(i, -x(i));
    }
    return result;
}

Shape Shape::RotateRight() const
{
    if (pieceShape == SquareShape)
        return *this;

    Shape result;
    result.pieceShape = pieceShape;
    for (int i = 0; i &lt; 4; ++i) {
        result.SetX(i, -y(i));
        result.SetY(i, x(i));
    }
    return result;
}

```

Board.h
  

```
#ifndef BOARD_H
#define BOARD_H

#include "Shape.h"
#include &lt;wx/wx.h&gt;

class Board : public wxPanel
{

public:
    Board(wxFrame *parent);
    void Start();
    void Pause();
    void linesRemovedChanged(int numLines);

protected:
    void OnPaint(wxPaintEvent&amp; event);
    void OnKeyDown(wxKeyEvent&amp; event);
    void OnTimer(wxCommandEvent&amp; event);

private:
    enum { BoardWidth = 10, BoardHeight = 22 };

    Tetrominoes &amp; ShapeAt(int x, int y) { return board[(y * BoardWidth) + x]; }

    int SquareWidth() { return GetClientSize().GetWidth() / BoardWidth; }
    int SquareHeight() { return GetClientSize().GetHeight() / BoardHeight; }
    void ClearBoard();
    void DropDown();
    void OneLineDown();
    void PieceDropped();
    void RemoveFullLines();
    void NewPiece();
    bool TryMove(const Shape&amp; newPiece, int newX, int newY);
    void DrawSquare(wxPaintDC &amp;dc, int x, int y, Tetrominoes shape);

    wxTimer *timer;
    bool isStarted;
    bool isPaused;
    bool isFallingFinished;
    Shape curPiece;
    int curX;
    int curY;
    int numLinesRemoved;
    Tetrominoes board[BoardWidth * BoardHeight];
    wxStatusBar *m_stsbar;
};

#endif

```

Board.cpp
  

```
#include "Board.h"

Board::Board(wxFrame *parent)
       : wxPanel(parent, wxID_ANY, wxDefaultPosition,
             wxDefaultSize, wxBORDER_NONE)
{
    timer = new wxTimer(this, 1);

    m_stsbar = parent-&gt;GetStatusBar();
    isFallingFinished = false;
    isStarted = false;
    isPaused = false;
    numLinesRemoved = 0;
    curX = 0;
    curY = 0;

    ClearBoard();  

    Connect(wxEVT_PAINT, wxPaintEventHandler(Board::OnPaint));
    Connect(wxEVT_KEY_DOWN, wxKeyEventHandler(Board::OnKeyDown));
    Connect(wxEVT_TIMER, wxCommandEventHandler(Board::OnTimer));
}

void Board::Start()
{
    if (isPaused)
        return;

    isStarted = true;
    isFallingFinished = false;
    numLinesRemoved = 0;
    ClearBoard();

    NewPiece();
    timer-&gt;Start(300);
}

void Board::Pause()
{
    if (!isStarted)
        return;

    isPaused = !isPaused;
    if (isPaused) {
        timer-&gt;Stop();
        m_stsbar-&gt;SetStatusText(wxT("paused"));
    } else {
        timer-&gt;Start(300);
        wxString str;
        str.Printf(wxT("%d"), numLinesRemoved);
        m_stsbar-&gt;SetStatusText(str);
    }
    Refresh();
}

void Board::OnPaint(wxPaintEvent&amp; event)
{
    wxPaintDC dc(this);

    wxSize size = GetClientSize();
    int boardTop = size.GetHeight() - BoardHeight * SquareHeight();

    for (int i = 0; i &lt; BoardHeight; ++i) {
        for (int j = 0; j &lt; BoardWidth; ++j) {
            Tetrominoes shape = ShapeAt(j, BoardHeight - i - 1);
            if (shape != NoShape)
                DrawSquare(dc, 0 + j * SquareWidth(),
                           boardTop + i * SquareHeight(), shape);
        }
    }

    if (curPiece.GetShape() != NoShape) {
        for (int i = 0; i &lt; 4; ++i) {
            int x = curX + curPiece.x(i);
            int y = curY - curPiece.y(i);
            DrawSquare(dc, 0 + x * SquareWidth(),
                       boardTop + (BoardHeight - y - 1) * SquareHeight(),
                       curPiece.GetShape());
        }
    }
}

void Board::OnKeyDown(wxKeyEvent&amp; event)
{
    if (!isStarted || curPiece.GetShape() == NoShape) {  
        event.Skip();
        return;
    }

    int keycode = event.GetKeyCode();

    if (keycode == 'p' || keycode == 'P') {
	Pause();
        return;
    }

    if (isPaused)
        return;

    switch (keycode) {
    case WXK_LEFT:
        TryMove(curPiece, curX - 1, curY);
        break;
    case WXK_RIGHT:
        TryMove(curPiece, curX + 1, curY);
        break;
    case WXK_DOWN:
        TryMove(curPiece.RotateRight(), curX, curY);
        break;
    case WXK_UP:
        TryMove(curPiece.RotateLeft(), curX, curY);
        break;
    case WXK_SPACE:
        DropDown();
        break;
    case 'd':
        OneLineDown();
        break;
    case 'D':
        OneLineDown();
        break;
    default:
        event.Skip();
    }

}

void Board::OnTimer(wxCommandEvent&amp; event)
{
    if (isFallingFinished) {
        isFallingFinished = false;
        NewPiece();
    } else {
        OneLineDown();
    }
}

void Board::ClearBoard()
{
    for (int i = 0; i &lt; BoardHeight * BoardWidth; ++i)
        board[i] = NoShape;
}

void Board::DropDown()
{
    int newY = curY;
    while (newY &gt; 0) {
        if (!TryMove(curPiece, curX, newY - 1))
            break;
        --newY;
    }
    PieceDropped();
}

void Board::OneLineDown()
{
    if (!TryMove(curPiece, curX, curY - 1))
        PieceDropped();
}

void Board::PieceDropped()
{
    for (int i = 0; i &lt; 4; ++i) {
        int x = curX + curPiece.x(i);
        int y = curY - curPiece.y(i);
        ShapeAt(x, y) = curPiece.GetShape();
    }

    RemoveFullLines();

    if (!isFallingFinished)
        NewPiece();
}

void Board::RemoveFullLines()
{
     int numFullLines = 0;

     for (int i = BoardHeight - 1; i &gt;= 0; --i) {
         bool lineIsFull = true;

         for (int j = 0; j &lt; BoardWidth; ++j) {
             if (ShapeAt(j, i) == NoShape) {
                 lineIsFull = false;
                 break;
             }
         }

         if (lineIsFull) {
             ++numFullLines;
             for (int k = i; k &lt; BoardHeight - 1; ++k) {
                 for (int j = 0; j &lt; BoardWidth; ++j)
                     ShapeAt(j, k) = ShapeAt(j, k + 1);
             }
         }
     }

     if (numFullLines &gt; 0) {
         numLinesRemoved += numFullLines;
         wxString str;
	 str.Printf(wxT("%d"), numLinesRemoved);
         m_stsbar-&gt;SetStatusText(str);

         isFallingFinished = true;
         curPiece.SetShape(NoShape);
         Refresh();
     }
 }

void Board::NewPiece()
{
    curPiece.SetRandomShape();
    curX = BoardWidth / 2 + 1;
    curY = BoardHeight - 1 + curPiece.MinY();

    if (!TryMove(curPiece, curX, curY)) {
        curPiece.SetShape(NoShape);
        timer-&gt;Stop();
        isStarted = false;
        m_stsbar-&gt;SetStatusText(wxT("game over"));
    }
}

bool Board::TryMove(const Shape&amp; newPiece, int newX, int newY)
{
    for (int i = 0; i &lt; 4; ++i) {
        int x = newX + newPiece.x(i);
        int y = newY - newPiece.y(i);
        if (x &lt; 0 || x &gt;= BoardWidth || y &lt; 0 || y &gt;= BoardHeight)
            return false;
        if (ShapeAt(x, y) != NoShape)
            return false;
    }

    curPiece = newPiece;
    curX = newX;
    curY = newY;
    Refresh();
    return true;
}

void Board::DrawSquare(wxPaintDC&amp; dc, int x, int y, Tetrominoes shape)
{
    static wxColour colors[] = { wxColour(0, 0, 0), wxColour(204, 102, 102), 
             wxColour(102, 204, 102), wxColour(102, 102, 204), 
             wxColour(204, 204, 102), wxColour(204, 102, 204), 
             wxColour(102, 204, 204), wxColour(218, 170, 0) };

    static wxColour light[] = { wxColour(0, 0, 0), wxColour(248, 159, 171),
             wxColour(121, 252, 121), wxColour(121, 121, 252), 
             wxColour(252, 252, 121), wxColour(252, 121, 252), 
             wxColour(121, 252, 252), wxColour(252, 198, 0) };

    static wxColour dark[] = { wxColour(0, 0, 0), wxColour(128, 59, 59), 
             wxColour(59, 128, 59), wxColour(59, 59, 128), 
             wxColour(128, 128, 59), wxColour(128, 59, 128), 
             wxColour(59, 128, 128), wxColour(128, 98, 0) };

    wxPen pen(light[int(shape)]);
    pen.SetCap(wxCAP_PROJECTING);
    dc.SetPen(pen);

    dc.DrawLine(x, y + SquareHeight() - 1, x, y);
    dc.DrawLine(x, y, x + SquareWidth() - 1, y);

    wxPen darkpen(dark[int(shape)]);
    darkpen.SetCap(wxCAP_PROJECTING);
    dc.SetPen(darkpen);

    dc.DrawLine(x + 1, y + SquareHeight() - 1,
        x + SquareWidth() - 1, y + SquareHeight() - 1);
    dc.DrawLine(x + SquareWidth() - 1, 
        y + SquareHeight() - 1, x + SquareWidth() - 1, y + 1);

    dc.SetPen(*wxTRANSPARENT_PEN);
    dc.SetBrush(wxBrush(colors[int(shape)])); 
    dc.DrawRectangle(x + 1, y + 1, SquareWidth() - 2, 
        SquareHeight() - 2);
}

```

Tetris.h
  

```
#include &lt;wx/wx.h&gt;

class Tetris : public wxFrame
{
public:
    Tetris(const wxString&amp; title);

};

```

Tetris.cpp
  

```
#include "Tetris.h"
#include "Board.h"

Tetris::Tetris(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(180, 380))
{
  wxStatusBar *sb = CreateStatusBar();
  sb-&gt;SetStatusText(wxT("0"));
  Board *board = new Board(this);
  board-&gt;SetFocus();
  board-&gt;Start();
}

```

main.h
  

```
#include &lt;wx/wx.h&gt;

class MyApp : public wxApp
{
  public:
    virtual bool OnInit();

};

```

main.cpp
  

```
#include "main.h"
#include "Tetris.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{
    srand(time(NULL));
    Tetris *tetris = new Tetris(wxT("Tetris"));
    tetris-&gt;Centre();
    tetris-&gt;Show(true);

    return true;
}

```

I have simplified the game a bit, so that it is easier to understand. The 
game starts immediately, after it is launched. We can pause the game by 
pressing the p key. The space key will drop the tetris piece immediately 
to the bottom. The d key will drop the piece one line down. 
(It can be used to speed up the falling a bit.) The game goes at constant 
speed, no acceleration is implemented. The score is the number of lines, 
that we have removed.

...
isFallingFinished = false;
isStarted = false;
isPaused = false;
numLinesRemoved = 0;
curX = 0;
curY = 0;
...

Before we start the game, we initialize some important variables. The 
isFallingFinished variable determines, it the
tetris shape has finished falling and we then need to create a new shape. 
The numLinesRemoved counts the number of lines, we have removed so far. 
The curX and curY variables determine the actual 
position of the falling tetris shape. 

for (int i = 0; i &lt; BoardHeight; ++i) {
    for (int j = 0; j &lt; BoardWidth; ++j) {
        Tetrominoes shape = ShapeAt(j, BoardHeight - i - 1);
        if (shape != NoShape)
            DrawSquare(dc, 0 + j * SquareWidth(),
                    boardTop + i * SquareHeight(), shape);
    }
}

The painting of the game is divided into two steps. In the first step, we draw 
all the shapes, or remains of the shapes that have been dropped to the bottom 
of the board. All the squares are rememberd in the board array. We 
access it using the ShapeAt method.

if (curPiece.GetShape() != NoShape) {
    for (int i = 0; i &lt; 4; ++i) {
        int x = curX + curPiece.x(i);
        int y = curY - curPiece.y(i);
        DrawSquare(dc, 0 + x * SquareWidth(),
                   boardTop + (BoardHeight - y - 1) * SquareHeight(),
                   curPiece.GetShape());
    }
}

The next step is drawing of the actual piece that is falling down.

...
switch (keycode) {
case WXK_LEFT:
    TryMove(curPiece, curX - 1, curY);
    break;
...

In the Board::OnKeyDown method we check for pressed keys. If we 
press the left arrow key, we try to move the piece to the left. We say 
try, because the piece might not be able to move.

void Board::OnTimer(wxCommandEvent&amp; event)
{
    if (isFallingFinished) {
        isFallingFinished = false;
        NewPiece();
    } else {
        OneLineDown();
    }
}

In the Board::OnTimer method we either create a new piece, after 
the previous one was dropped to the bottom, or we move a falling piece 
one line down.

void Board::DropDown()
{
    int newY = curY;
    while (newY &gt; 0) {
        if (!TryMove(curPiece, curX, newY - 1))
            break;
        --newY;
    }
    PieceDropped();
}

The Board::DropDown method drops the falling shape immediately 
to the bottom of the board. It happens, when we press the space key.

void Board::PieceDropped()
{
    for (int i = 0; i &lt; 4; ++i) {
        int x = curX + curPiece.x(i);
        int y = curY - curPiece.y(i);
        ShapeAt(x, y) = curPiece.GetShape();
    }

    RemoveFullLines();

    if (!isFallingFinished)
        NewPiece();
}

In the Board::PieceDropped method we set the current shape 
at its final position. We call the RemoveFullLines 
method to check if we have at least one full line. And we create a new tetris 
shape if it was not already created in the Board::PieceDropped 
method in the meantime.

if (lineIsFull) {
    ++numFullLines;
    for (int k = i; k &lt; BoardHeight - 1; ++k) {
        for (int j = 0; j &lt; BoardWidth; ++j)
            ShapeAt(j, k) = ShapeAt(j, k + 1);
    }
}

This code removes the full lines. After finding a full line we increase 
the counter. We move all the lines above the full row one line down. This way 
we destroy the full line. Notice that in our tetris game, we use so called 
*naive gravity*. This means that the squares may be left floating 
above empty gaps.

void Board::NewPiece()
{
    curPiece.SetRandomShape();
    curX = BoardWidth / 2 + 1;
    curY = BoardHeight - 1 + curPiece.MinY();

    if (!TryMove(curPiece, curX, curY)) {
        curPiece.SetShape(NoShape);
        timer-&gt;Stop();
        isStarted = false;
        m_stsbar-&gt;SetStatusText(wxT("game over"));
    }
}

The Board::NewPiece method creates randomly a new tetris piece. 
If the piece cannot go into its initial position, the game is over.

bool Board::TryMove(const Shape&amp; newPiece, int newX, int newY)
{
    for (int i = 0; i &lt; 4; ++i) {
        int x = newX + newPiece.x(i);
        int y = newY - newPiece.y(i);
        if (x &lt; 0 || x &gt;= BoardWidth || y &lt; 0 || y &gt;= BoardHeight)
            return false;
        if (ShapeAt(x, y) != NoShape)
            return false;
    }

    curPiece = newPiece;
    curX = newX;
    curY = newY;
    Refresh();
    return true;
}

In the Board::TryMove method we try to move our shapes. 
If the shape is at the edge of the board or is adjacent to some other 
shape, we return false. Otherwise we place the current falling shape to 
a new position and return true.

The Shape class saves information about the Tetris piece. 

for (int i = 0; i &lt; 4 ; i++) {
    for (int j = 0; j &lt; 2; ++j)
        coords[i][j] = coordsTable[shape][i][j];
}

The coords array saves the coordinates of the tetris piece.
For example, numbers { 0, -1 },  { 0, 0 },   { 1, 0 },   { 1, 1 } , represent a 
rotated S-shape. The following diagram illustrates the shape.

![coordinates.png](images/coordinates.png)

Figure: Coordinates

When we draw the current falling piece, we draw it at  curX, 
curY position. Then we look at the coordinates table and draw 
all the four squares. 

![tetris.png](images/tetris.png)

Figure: Tetris

This was a Tetris game in wxWidgets.

[Contents](..)
[Previous](../customwidgets/)