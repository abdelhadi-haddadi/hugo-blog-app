+++
title = "JavaFX Canvas"
date = 2025-08-29T19:56:49.592+01:00
draft = false
description = "In this part of the JavaFX tutorial, we perform drawing operations on the Canvas. Canvas is an image that can be drawn on using a set of graphics commands provided by a GraphicsContext"
image = "images/lines.png"
imageBig = "images/lines.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../animation/)
[Next](../charts/)

# JavaFX Canvas

last modified October 18, 2023

Canvas is an image that can be drawn on using a set of graphics 
commands provided by a GraphicsContext. It is a high-level tool
for doing painting. 

GraphicsContext is used to issue draw calls to a
Canvas using a buffer.

## JavaFX simple lines

In the first example, we draw simple lines. A line is a basic graphics
primitive. Two coordinates are needed to form a line.

com/zetcode/SimpleLinesEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class SimpleLinesEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new Pane();

        var canvas = new Canvas(300, 300);
        var gc = canvas.getGraphicsContext2D();
        drawLines(gc);

        root.getChildren().add(canvas);

        var scene = new Scene(root, 300, 250, Color.WHITESMOKE);

        stage.setTitle("Lines");
        stage.setScene(scene);
        stage.show();
    }

    private void drawLines(GraphicsContext gc) {

        gc.beginPath();
        gc.moveTo(30.5, 30.5);
        gc.lineTo(150.5, 30.5);
        gc.lineTo(150.5, 150.5);
        gc.lineTo(30.5, 30.5);
        gc.stroke();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example draws three lines which form a rectangle.

var canvas = new Canvas(300, 300);

A Canvas is constructed with a width and height that specifies the
size of the image into which the canvas drawing commands are rendered. All
drawing operations are clipped to the bounds of that image.

var gc = canvas.getGraphicsContext2D();

The getGraphicsContext2D returns a GraphicsContext
associated with the canvas.

drawLines(gc);

The drawing is delegated to the drawLines method.

gc.beginPath();

A line primitive is represented as a path element. The beginPath method
starts a new path.

gc.moveTo(30.5, 30.5);

The moveTo method moves the starting point of the current path
to the specified coordinate.

gc.lineTo(150.5, 30.5);
gc.lineTo(150.5, 150.5);
gc.lineTo(30.5, 30.5);

The lineTo methods add line segments to the current path. 

gc.stroke();

The stroke method strokes the path with the current stroke paint.

![lines.png](images/lines.png)

Figure: Lines

## JavaFX stroke and fill

A stroke is used to draw outlines of shapes. A fill is used to paint
interiors of shapes.

com/zetcode/StrokeFillEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class StrokeFillEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new Pane();

        var canvas = new Canvas(300, 300);
        var gc = canvas.getGraphicsContext2D();
        doDrawing(gc);

        root.getChildren().add(canvas);

        var scene = new Scene(root, 300, 250, Color.WHITESMOKE);

        stage.setTitle("Stroke and fill");
        stage.setScene(scene);
        stage.show();
    }

    private void doDrawing(GraphicsContext gc) {

        gc.setStroke(Color.FORESTGREEN.brighter());
        gc.setLineWidth(5);
        gc.strokeOval(30, 30, 80, 80);
        gc.setFill(Color.FORESTGREEN);
        gc.fillOval(130, 30, 80, 80);
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example draws an outline of a circle and fills an interior of a circle.

gc.setStroke(Color.FORESTGREEN.brighter());

The setStroke method sets the current stroke paint attribute.
The default colour is black. The attribute is used by the stroke methods
of the GraphicsContext.

gc.setLineWidth(5);

The setLineWidth sets the current line width.

gc.strokeOval(130, 30, 80, 80);

The strokeOval method strokes an oval using the current stroke paint.

gc.setFill(Color.FORESTGREEN);

The setFill method sets the current fill paint attribute.
The default colour is black. The attribute is used by the fill methods 
of the GraphicsContext.

gc.fillOval(30, 30, 80, 80);

The fillOval fills an oval using the current fill paint.

![strokefill.png](images/strokefill.png)

Figure: Stroke and fill

## JavaFX colours

The Color class is used to work with colours in JavaFX.
There are many predefined colours. Custom colour values can
be created using the RGB or HSB colour model.

com/zetcode/ColoursEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class ColoursEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new Pane();

        var canvas = new Canvas(300, 300);
        var gc = canvas.getGraphicsContext2D();
        drawShapes(gc);

        root.getChildren().add(canvas);

        Scene scene = new Scene(root, 280, 200, Color.WHITESMOKE);

        stage.setTitle("Colours");
        stage.setScene(scene);
        stage.show();
    }

    private void drawShapes(GraphicsContext gc) {

        gc.setFill(Color.CADETBLUE);
        gc.fillOval(30, 30, 50, 50);

        gc.setFill(Color.DARKRED);
        gc.fillOval(110, 30, 50, 50);

        gc.setFill(Color.STEELBLUE);
        gc.fillOval(190, 30, 50, 50);

        gc.setFill(Color.BURLYWOOD);
        gc.fillOval(30, 110, 50, 50);

        gc.setFill(Color.LIGHTSEAGREEN);
        gc.fillOval(110, 110, 50, 50);

        gc.setFill(Color.CHOCOLATE);
        gc.fillOval(190, 110, 50, 50);
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example draws six circles using predefined colour values.

gc.setFill(Color.CADETBLUE);

A predefined Color.CADETBLUE colour is set to be the 
current fill. 

gc.fillOval(30, 30, 50, 50);

An interior of a circle object is filled with the current fill attribute.

![colours.png](images/colours.png)

Figure: Colours

## JavaFx gradients

In computer graphics, a gradient is a smooth blending of shades from light
to dark or from one colour to another. In drawing and paint programs,
gradients are used to create colourful backgrounds and special effects as
well as to simulate lights and shadows. There are two types of gradients:
linear gradients and radial gradients.

### Linear gradient

A linear gradient is a smooth blending of colours along a line. 
It is defined by the LinearGradient class.

com/zetcode/LinearGradientEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.paint.CycleMethod;
import javafx.scene.paint.LinearGradient;
import javafx.scene.paint.Stop;
import javafx.stage.Stage;

public class LinearGradientEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new Pane();

        var canvas = new Canvas(300, 300);
        var gc = canvas.getGraphicsContext2D();
        doDrawing(gc);

        root.getChildren().add(canvas);

        var scene = new Scene(root, 300, 250, Color.WHITESMOKE);

        stage.setTitle("Linear gradient");
        stage.setScene(scene);
        stage.show();
    }

    private void doDrawing(GraphicsContext gc) {

        var stops1 = new Stop[] { new Stop(0.2, Color.BLACK),
                new Stop(0.5, Color.RED), new Stop(0.8, Color.BLACK)};

        var lg1 = new LinearGradient(0, 0, 1, 0, true,
                CycleMethod.NO_CYCLE, stops1);

        gc.setFill(lg1);
        gc.fillRect(50, 30, 200, 180);
    }

    public static void main(String[] args) {
        launch(args);
    }
}

In the example, we fill a rectangular shape with a linear gradient.

var stops1 = new Stop[] { new Stop(0.2, Color.BLACK), 
    new Stop(0.5, Color.RED), new Stop(0.8, Color.BLACK)};

We define stop points for the gradient. They specify how to distribute 
the colors along the gradient. 

var lg1 = new LinearGradient(0, 0, 1, 0, true, 
        CycleMethod.NO_CYCLE, stops1);

The first four parameters specify the line along which the gradient is painted.
The fifth parameter is the proportional parameter, which sets whether the
coordinates are proportional to the shape which this gradient fills. The sixth
parameter sets the cycle method of the gradient. The last parameter takes the
stop points.

![linear_gradient.png](images/linear_gradient.png)

Figure: LinearGradient

### Radial gradient

A radial gradient is a smooth blending of colours or shades of colours
between a circle and a focal point. A radial gradient is defined by the
RadialGradient class.

com/zetcode/RadialGradientEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.paint.CycleMethod;
import javafx.scene.paint.RadialGradient;
import javafx.scene.paint.Stop;
import javafx.stage.Stage;

public class RadialGradientEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new Pane();

        var canvas = new Canvas(300, 300);
        var gc = canvas.getGraphicsContext2D();
        doDrawing(gc);

        root.getChildren().add(canvas);

        var scene = new Scene(root, 300, 250, Color.WHITESMOKE);

        stage.setTitle("Radial gradient");
        stage.setScene(scene);
        stage.show();
    }

    private void doDrawing(GraphicsContext gc) {

        var stops1 = new Stop[] { new Stop(0, Color.RED),
                new Stop(1, Color.BLACK)};

        var lg1 = new RadialGradient(0, 0, 0.5, 0.5, 0.8, true,
                CycleMethod.NO_CYCLE, stops1);

        gc.setFill(lg1);
        gc.fillOval(30, 30, 150, 150);
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example fills a circle with a radial gradient.

var stops1 = new Stop[] { new Stop(0, Color.RED), 
    new Stop(1, Color.BLACK)};

We define stop values for the gradient.

var lg1 = new RadialGradient(0, 0, 0.5, 0.5, 0.8, true, 
        CycleMethod.NO_CYCLE, stops1);

A radial gradient is created. The first two parameters are the focus angle and
focus distance. The next two parameters are the x and y coordinates of the center 
point of the gradient's circle. The fifth parameter is the radius of the circle
defining the extents of the color gradient.

![radial_gradient.png](images/radial_gradient.png)

Figure: RadialGradient

## JavaFX shapes

Rectangles, ovals, arcs are basic geometric shapes. The GraphicsContext
contains methods for drawing outlines and interiors of these shapes.

com/zetcode/ShapesEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.ArcType;
import javafx.stage.Stage;

public class ShapesEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new Pane();

        var canvas = new Canvas(320, 300);
        var gc = canvas.getGraphicsContext2D();
        drawShapes(gc);

        root.getChildren().add(canvas);

        var scene = new Scene(root, 300, 200, Color.WHITESMOKE);

        stage.setTitle("Shapes");
        stage.setScene(scene);
        stage.show();
    }

    private void drawShapes(GraphicsContext gc) {

        gc.setFill(Color.GRAY);

        gc.fillOval(30, 30, 50, 50);
        gc.fillOval(110, 30, 80, 50);
        gc.fillRect(220, 30, 50, 50);
        gc.fillRoundRect(30, 120, 50, 50, 20, 20);
        gc.fillArc(110, 120, 60, 60, 45, 180, ArcType.OPEN);
        gc.fillPolygon(new double[]{220, 270, 220},
                new double[]{120, 170, 170}, 3);
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example paints six different shapes using the graphics context's 
fill methods.

gc.setFill(Color.GRAY);

The shapes are painted in gray colour.

gc.fillOval(30, 30, 50, 50);
gc.fillOval(110, 30, 80, 50);

The fillOval method paints a circle and an ellipse.
The first two parameters are the x and y coordinates. The third and
the fourth parameter are the width and height of the oval.

gc.fillRect(220, 30, 50, 50);

The fillRect fills a rectangle using the current fill paint.

gc.fillRoundRect(30, 120, 50, 50, 20, 20);

The fillRoundRect paints a rectangle, whose corners are rounded.
The last two parameters of the method are the arc width and arc height of the
rectangle corners.

gc.fillArc(110, 120, 60, 60, 45, 180, ArcType.OPEN);

The fillArc method fills an arc using the current fill paint. The
last three parameters are the starting angle, the angular extend, and the
closure type.

gc.fillPolygon(new double[]{220, 270, 220}, 
        new double[]{120, 170, 170}, 3);

The fillPolygon method fills a polygon with the given points
using the currently set fill paint. In our case, it paints a right-angled
triangle. The first parameter is an array containing the x coordinates of the
polygon points, the second parameter is an array containing the y coordinates of
the polygon points. The last parameter is the number of points that form a
polygon.

![shapes.png](images/shapes.png)

Figure: Colours

## JavaFX star shape

More complex shapes can be drawn with the strokePolygon and
fillPolygon methods. The next example draws a Star shape.

com/zetcode/StarShapeEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class StarShapeEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new Pane();

        var canvas = new Canvas(300, 300);
        var gc = canvas.getGraphicsContext2D();
        drawStarShape(gc);

        root.getChildren().add(canvas);

        var scene = new Scene(root, 300, 250, Color.WHITESMOKE);

        stage.setTitle("Star");
        stage.setScene(scene);
        stage.show();
    }

    private void drawStarShape(GraphicsContext gc) {

        double[] xpoints = {10, 85, 110, 135, 210, 160,
                170, 110, 50, 60};
        double[] ypoints = {85, 75, 10, 75, 85, 125,
                190, 150, 190, 125};

        gc.strokePolygon(xpoints, ypoints, xpoints.length);
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example draws an outline of a Star shape. The shape consists of
ten coordinates.

double[] xpoints = {10, 85, 110, 135, 210, 160,
        170, 110, 50, 60};
double[] ypoints = {85, 75, 10, 75, 85, 125,
        190, 150, 190, 125};

These are the x and y coordinates of the shape.

gc.strokePolygon(xpoints, ypoints, xpoints.length);

The shape is drawn with the strokePolygon method.

![starshape.png](images/starshape.png)

Figure: Star shape

## JavaFX transparent rectangles

Transparency is the quality of being able to see through a material. In computer
graphics, we can achieve transparency effects using alpha compositing. Alpha
compositing is the process of combining an image with a background to create the
appearance of partial transparency.

com/zetcode/TransparentRectanglesEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class TransparentRectanglesEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new Pane();

        var canvas = new Canvas(600, 300);
        var gc = canvas.getGraphicsContext2D();
        drawRectangles(gc);

        root.getChildren().add(canvas);

        var scene = new Scene(root, 600, 100, Color.WHITESMOKE);

        stage.setTitle("Transparent rectangles");
        stage.setScene(scene);
        stage.show();
    }

    private void drawRectangles(GraphicsContext gc) {

        for (int i = 1; i &lt;= 10; i++) {

            float alpha = i * 0.1f;

            gc.setFill(Color.FORESTGREEN);
            gc.setGlobalAlpha(alpha);
            gc.fillRect(50 * i, 20, 40, 40);
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example paints ten rectangles with different levels of transparency.

float alpha = i * 0.1f;

An alpha value is computed in each of the for cycles.

gc.setGlobalAlpha(alpha);

The setGlobalAlpha method sets the global alpha of 
the current state.

![transparentrectangles.png](images/transparentrectangles.png)

Figure: Transparent rectangles

In this chapter, we performed drawing operations on a Canvas node.

[Contents](..) 
[Previous](../animation/)
[Next](../charts/)