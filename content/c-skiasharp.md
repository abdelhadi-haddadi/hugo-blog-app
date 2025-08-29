+++
title = "C# SkiaSharp"
date = 2025-08-29T19:51:23.265+01:00
draft = false
description = "C# sort List tutorial shows how to sort list elements in C# language. The tutorial provides numerous examples to demonstrate sorting in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# SkiaSharp

last modified July 5, 2023

 

In this article we show how to create simple 2D graphics in C# using SkiaSharp
library.

Skia is an open source 2D graphics library which works on multiple
hardware and software platforms. Skia is used in Chrome, Android, Flutter,
LibreOffice, Avalonia UI, or QuestPDF. The library is written in C++.

*SkiaSharp* provides .NET bindings to the Skia library.

## SkiaSharp points

In the first example, we draw points.

Program.cs
  

using SkiaSharp;

SKBitmap bmp = new(640, 480);
using SKCanvas canvas = new(bmp);
canvas.Clear(SKColor.Parse("#003366"));

Random rand = new(0);
SKPaint p1 = new() { Color = SKColors.FloralWhite };

for (int i = 0; i &lt; 10000; i++)
{
    SKPoint pot = new(rand.Next(bmp.Width), rand.Next(bmp.Height));
    canvas.DrawPoint(pot, p1);
}

SKFileWStream fs = new("points.jpg");
bmp.Encode(fs, SKEncodedImageFormat.Jpeg, quality: 100);

In the program, we randomly draw 10000 points on the canvas. The drawing is
saved to a JPEG image.

using SKBitmap bmp = new(640, 480);
using SKCanvas canvas = new(bmp);
canvas.Clear(SKColor.Parse("#003366"));

We create a bitmap and fill it with some blue colour.

using SKPaint p1 = new() { Color = SKColors.FloralWhite };

SKPaint contains the style and color information about how to draw
geometries, text and bitmaps.

for (int i = 0; i &lt; 10000; i++)
{
    SKPoint pot = new(rand.Next(bmp.Width), rand.Next(bmp.Height));
    canvas.DrawPoint(pot, p1);
}

In a for loop, we create thousands of points and draw them on the canvas with 
DrawPoint. The points have random coordinates within the bounds 
of the canvas.

SKFileWStream fs = new("points.jpg");
bmp.Encode(fs, SKEncodedImageFormat.Jpeg, quality: 100);

We save the bitmap to a file.

## SkiaSharp lines

Lines are drawn with DrawLine.

Program.cs
  

using SkiaSharp;

using SKBitmap bmp = new(640, 480);
using SKCanvas canvas = new(bmp);
canvas.Clear(SKColor.Parse("#003366"));

using SKPaint p1 = new() { Color = SKColors.FloralWhite, StrokeWidth = 1 };
using SKPaint p2 = new() { Color = SKColors.DarkSeaGreen, StrokeWidth = 2 };
using SKPaint p3 = new() { Color = SKColors.AliceBlue, StrokeWidth = 3 };

canvas.DrawLine(50, 50, 250, 50, p1);
canvas.DrawLine(50, 150, 350, 150, p2);
canvas.DrawLine(50, 250, 450, 250, p3);

using SKFileWStream fs = new("lines.jpg");
bmp.Encode(fs, SKEncodedImageFormat.Jpeg, quality: 100);

In the program, we draw three horizontal lines on the canvas.

using SKPaint p1 = new() { Color = SKColors.FloralWhite, StrokeWidth = 1 };
using SKPaint p2 = new() { Color = SKColors.DarkSeaGreen, StrokeWidth = 2 };
using SKPaint p3 = new() { Color = SKColors.AliceBlue, StrokeWidth = 3 };

For the lines, we define three SKPaint objects. They have different 
colours and stroke widths.

canvas.DrawLine(50, 50, 250, 50, p1);
canvas.DrawLine(50, 150, 350, 150, p2);
canvas.DrawLine(50, 250, 450, 250, p3);

Three lines are drawn. The parameters of the DrawLine are the x and 
y coordinates of the two ending points and the SKPaint.

## SkiaSharp rectangle

Rectangles can be created with DrawRect and
DrawRoundRect.

Program.cs
  

using SkiaSharp;

using SKBitmap bmp = new(640, 480);
using SKCanvas canvas = new(bmp);
canvas.Clear(SKColor.Parse("#003366"));

using SKPaint p1 = new() { Color = SKColors.White.WithAlpha(30) };
canvas.DrawRect(50, 50, 100, 100, p1);

using SKPaint p2 = new() { Color = SKColors.SlateGray, IsAntialias = true };
canvas.DrawRoundRect(250, 150, 100, 100, 10, 10, p2);

using SKFileWStream fs = new("rectangles.png");
bmp.Encode(fs, SKEncodedImageFormat.Png, 100);

In the program, we create a regular rectangle and a rectangle with rounded
corners.

using SKPaint p1 = new() { Color = SKColors.White.WithAlpha(30) };

The rectangle fill has an alpha value set; it is partially transparent.

canvas.DrawRect(50, 50, 100, 100, p1);

We draw the rectangle. The first four parameters are the x and y coordinates of
the top-left corner and the width and height of the rectangle.

using SKPaint p2 = new() { Color = SKColors.SlateGray, IsAntialias = true };

Here we draw a rounded rectangle. The painting uses antialiasing technique; this 
makes the rounded corners look more smooth.

canvas.DrawRoundRect(250, 150, 100, 100, 10, 10, p2);

The fifth and sixth parameters of the DrawRoundRect are the x and y
radiuses of the oval used to round the corners.

## SkiaSharp circle

Circles are drawn with DrawCircle.

Program.cs
  

using SkiaSharp;

using SKBitmap bmp = new(640, 480);
using SKCanvas canvas = new(bmp);
canvas.Clear(SKColor.Parse("#003366"));

using SKPaint p1 = new() { Color = SKColors.White, IsAntialias = true };
using SKPaint p2 = new() { Color = SKColors.AntiqueWhite };

canvas.DrawCircle(80, 80, 60, p1);
canvas.DrawCircle(250, 210, 100, p2);

using SKFileWStream fs = new("circles.png");
bmp.Encode(fs, SKEncodedImageFormat.Png, 100);

In the program we draw two circles.

canvas.DrawCircle(80, 80, 60, p1);

The parameters of the DrawCircle are the x and y coordinates of the 
centre point, the radius, and the paint.

## SkiaSharp Bézier curve

Bézier curve is a cubic line. It can be created with SKPath.
SKPath is a compound geometric path. It encapsulates compound
geometric paths consisting of straight line segments, quadratic curves, and
cubic curves.

Program.cs
  

using SkiaSharp;

using SKBitmap bmp = new(350, 350);
using SKCanvas canvas = new(bmp);
canvas.Clear(SKColor.Parse("#003366"));

using SKPaint p1 = new() { IsAntialias = true, Color = SKColors.White, Style = SKPaintStyle.Stroke };

p1.StrokeWidth = 8;
p1.StrokeCap = SKStrokeCap.Round;

using SKPath path = new();
path.MoveTo(10, 10);
path.QuadTo(256, 64, 128, 128);
path.QuadTo(10, 192, 250, 250);

canvas.DrawPath(path, p1);

using SKFileWStream fs = new("bezier.png");
bmp.Encode(fs, SKEncodedImageFormat.Png, 100);

In the program, we draw a Bézier curve.

p1.StrokeWidth = 8;
p1.StrokeCap = SKStrokeCap.Round;

The width of the line is 8 units and it stroke cap is rounded.

using SKPath path = new();
path.MoveTo(10, 10);
path.QuadTo(256, 64, 128, 128);
path.QuadTo(10, 192, 250, 250);

An SKPath is created. We begin by moving to the starting point with 
MoveTo. Then we create two cubic lines with QuadTo.

canvas.DrawPath(path, p1);

The generated path is drawn to the canvas with DrawPath.

## Source

[SkiaSharp Github page](https://github.com/mono/SkiaSharp)

In this article we have created 2D graphics in C# using SkiaSharp library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).