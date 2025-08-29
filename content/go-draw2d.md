+++
title = "Go draw2d"
date = 2025-08-29T19:55:10.641+01:00
draft = false
description = "Learn how to work with graphics in Go using the Draw2D library. Includes examples of drawing shapes and paths."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go draw2d

last modified April 11, 2024

In this article we show how to work with graphics in Go with draw2d.

The draw2d package is a pure go 2D vector graphics library. It supports
multiple output devices including images (draw2d), pdf documents (draw2dpdf) and
opengl (draw2dgl).

In our examples we draw on the image output device. 

## Drawing a rectangle

In the first example, we draw a rectangle. 

main.go
  

package main

import (
    "image"

    "github.com/llgcode/draw2d"
    "github.com/llgcode/draw2d/draw2dimg"
    "github.com/llgcode/draw2d/draw2dkit"
)

func main() {

    dest := image.NewRGBA(image.Rect(0, 0, 300, 300))
    gc := draw2dimg.NewGraphicContext(dest)

    gc.SetStrokeColor(image.White)
    draw2dkit.Rectangle(gc, 50, 50, 200, 200)
    gc.Stroke()

    draw2dimg.SaveToPngFile("srect.png", dest)
}

The example draws a white rectangle on a transparent background.

dest := image.NewRGBA(image.Rect(0, 0, 300, 300))

A drawing destination is created. 

gc := draw2dimg.NewGraphicContext(dest)

From the destination, we create a drawing context. It is an interface for
drawing. 

gc.SetStrokeColor(image.White)

We set the stroke color to white using SetStrokeColor.

draw2dkit.Rectangle(gc, 50, 50, 200, 200)

We draw a rectangle with Rectangle. The parameters are the graphics
context and the x, y coordinates of the top-left and bottom-right points of 
the rectangle.

gc.Stroke()

The rectangle path is stroked with Stroke.

draw2dimg.SaveToPngFile("srect.png", dest)

We save the drawing to a PND file with SaveToPngFile.

## Drawing a line

In the next example we draw a line. 

main.go
  

package main

import (
    "image"

    "github.com/llgcode/draw2d"
    "github.com/llgcode/draw2d/draw2dimg"
    "github.com/llgcode/draw2d/draw2dkit"
)

func main() {

    dest := image.NewRGBA(image.Rect(0, 0, 300, 300))
    gc := draw2dimg.NewGraphicContext(dest)

    gc.SetFillColor(image.White)
    draw2dkit.Rectangle(gc, 0, 0, 300, 300)
    gc.Fill()

    DrawLine(gc, 0, 0, 300, 300)
    draw2dimg.SaveToPngFile("line.png", dest)
}

func DrawLine(gc draw2d.GraphicContext, x0, y0, x1, y1 float64) {

    gc.MoveTo(x0, y0)
    gc.LineTo(x1, y1)
    gc.Stroke()
}

A diagonal black line is drawn on a white background.

gc.SetFillColor(image.White)
draw2dkit.Rectangle(gc, 0, 0, 300, 300)
gc.Fill()

We fill the background of the surface in white colour. 

func DrawLine(gc draw2d.GraphicContext, x0, y0, x1, y1 float64) {

    gc.MoveTo(x0, y0)
    gc.LineTo(x1, y1)
    gc.Stroke()
}

We build the path with MoveTo and LineTo and then 
stroke it with Stroke.

## Drawing a circle

A circle is drawn with Ellipse.

main.go
  

package main

import (
    "image"
    "image/color"

    "github.com/llgcode/draw2d"
    "github.com/llgcode/draw2d/draw2dimg"
    "github.com/llgcode/draw2d/draw2dkit"
)

func main() {

    dest := image.NewRGBA(image.Rect(0, 0, 300, 300))
    gc := draw2dimg.NewGraphicContext(dest)

    gc.SetFillColor(image.White)
    draw2dkit.Rectangle(gc, 0, 0, 300, 300)
    gc.Fill()

    DrawCircle(gc, 0, 0, 300, 300)

    draw2dimg.SaveToPngFile("circle.png", dest)
}

func DrawCircle(gc draw2d.GraphicContext) {

    draw2dkit.Ellipse(gc, 150, 150, 80, 80)
    gc.SetFillColor(color.RGBA{0x44, 0x44, 0x44, 0xff})
    gc.SetStrokeColor(color.RGBA{0x44, 0x44, 0x44, 0xff})
    gc.FillStroke()
}

A gray circle is drawn in the middle of the surface.

func DrawCircle(gc draw2d.GraphicContext) {

    draw2dkit.Ellipse(gc, 150, 150, 80, 80)
    gc.SetFillColor(color.RGBA{0x44, 0x44, 0x44, 0xff})
    gc.SetStrokeColor(color.RGBA{0x44, 0x44, 0x44, 0xff})
    gc.FillStroke()
}

We draw the circle with Ellipse. We set the fill and stroke color
using SetFillColor and SetStrokeColor. The
FillStroke fills the path and then strokes the path.

## Drawing a cubic line

A cubic line is drawn with CubicCurveTo.

main.go
  

package main

import (
    "image"

    "github.com/llgcode/draw2d"
    "github.com/llgcode/draw2d/draw2dimg"
    "github.com/llgcode/draw2d/draw2dkit"
)

func main() {

    dest := image.NewRGBA(image.Rect(0, 0, 300, 300))
    gc := draw2dimg.NewGraphicContext(dest)

    gc.SetFillColor(image.White)
    draw2dkit.Rectangle(gc, 0, 0, 300, 300)
    gc.Fill()

    DrawCurvedLine(gc)

    draw2dimg.SaveToPngFile("curved.png", dest)
}

func DrawCurvedLine(gc draw2d.GraphicContext) {

    gc.MoveTo(30, 30)
    gc.CubicCurveTo(200, 150, 250, 100, 280, 30)
    gc.Stroke()
}

The example draws a cubic line.

func DrawCurvedLine(gc draw2d.GraphicContext) {

    gc.MoveTo(30, 30)
    gc.CubicCurveTo(200, 150, 250, 100, 280, 30)
    gc.Stroke()
}

We go to the starting point with MoveTo. With
CubicCurveTo, we draw the cubic line. The first two parameters are
the x, y coordinates of the two control points. The last two values are the
coordinates of the ending point.

## Source

[Go draw2d - Github page](https://github.com/llgcode/draw2d)

In this article we have worked with graphics in Golang using draw2d package.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).