+++
title = "JavaFX effects"
date = 2025-08-29T19:56:51.451+01:00
draft = false
description = "In this part of the JavaFX tutorial, we work with various effects. We create a DropShadow, a Reflection, a Lighting, a GaussianBlur, a SepiaTone, and a PerspectiveTransform effect. We also show how to combine multiple effects."
image = "images/dropshadow.png"
imageBig = "images/dropshadow.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../events/)
[Next](../animation/)

# JavaFX effects

last modified October 18, 2023

JavaFX contains the javafx.scene.effect package, which has a set or classes
that perform various visual effects. In this chapter, we create a DropShadow,
a Reflection, a Lighting, a GaussianBlur, a SepiaTone,
and a PerspectiveTransform effect. We also show how to combine multiple effects.

Effects are applied to the node's effectProperty with the setEffect
method.

## JavaFX DropShadow

DropShadow is a high-level effect that renders a shadow behind the
content with the specified colour, radius, and offset.

com/zetcode/DropShadowEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.effect.DropShadow;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

public class DropShadowEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new StackPane();

        var rect = new Rectangle(0, 0, 100, 100);
        rect.setFill(Color.GREENYELLOW);

        var ds = new DropShadow(15, Color.DARKGREEN);

        rect.setEffect(ds);

        root.getChildren().add(rect);

        var scene = new Scene(root, 250, 200, Color.WHITESMOKE);

        stage.setTitle("DropShadow");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example creates a shadow around a rectangle.

var rect = new Rectangle(0, 0, 100, 100);
rect.setFill(Color.GREENYELLOW);

A greenyellow rectangle shape is constructed.

var ds = new DropShadow(15, Color.DARKGREEN);

A DropShadow effect is created. The constructor
accepts the radius and the colour.

rect.setEffect(ds);

The effect is applied with the setEffect method.

![dropshadow.png](images/dropshadow.png)

Figure: DropShadow

## JavaFX Reflection

Reflection is an effect that renders a reflected version of the
input below the actual input content.

com/zetcode/ReflectionEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.effect.Reflection;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class ReflectionEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new StackPane();

        var text = new Text();
        text.setText("ZetCode");
        text.setFill(Color.STEELBLUE);
        text.setFont(Font.font("Serif", FontWeight.BOLD, 60));

        var ref = new Reflection();
        text.setEffect(ref);

        root.getChildren().add(text);

        var scene = new Scene(root, 300, 250, Color.WHITESMOKE);

        stage.setTitle("Reflection");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example applies a Reflection effect on a Text node.

var text = new Text();
text.setText("ZetCode");
text.setFill(Color.STEELBLUE);
text.setFont(Font.font("Serif", FontWeight.BOLD, 60));

A Text control is created. Its paint is steelblue. The font is made bold
and enlarged.

var ref = new Reflection();
text.setEffect(ref);

A default Reflection is created and applied on the text control.

![reflection.png](images/reflection.png)

Figure: Reflection

## JavaFX Lighting

Lighting simulates a light source shining on the given content, which can
be used to give flat objects a more realistic, three-dimensional appearance.
The setAzimuth method of the Light source sets the
azimuth—the direction angle for the light source.

com/zetcode/LightingEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Slider;
import javafx.scene.effect.Light;
import javafx.scene.effect.Lighting;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class LightingEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new VBox(30);
        root.setPadding(new Insets(10));

        var azimuth = new SimpleDoubleProperty(0);

        Light.Distant light = new Light.Distant();
        light.setAzimuth(0);

        var lighting = new Lighting(light);
        lighting.setSurfaceScale(5.0);

        var text = new Text();
        text.setText("ZetCode");
        text.setFill(Color.LIGHTSKYBLUE);
        text.setFont(Font.font(null, FontWeight.BOLD, 60));

        var slider = new Slider(1, 360, 0);
        azimuth.bind(slider.valueProperty());

        slider.valueProperty().addListener(event -&gt; {

            light.setAzimuth(azimuth.get());
            lighting.setLight(light);
            text.setEffect(lighting);
        });

        text.setEffect(lighting);

        root.getChildren().addAll(slider, text);

        var scene = new Scene(root, 300, 250, Color.WHITESMOKE);

        stage.setTitle("Lighting");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example applies a Lighting effect on a Text control.
The azimuth of the light is controlled by a Slider.

Light.Distant light = new Light.Distant();
light.setAzimuth(0);

A Light source is created.

var lighting = new Lighting(light);

This line creates a new instance of a Lighting with
the specified light.

var text = new Text();
text.setText("ZetCode");
text.setFill(Color.LIGHTSKYBLUE);
text.setFont(Font.font(null, FontWeight.BOLD, 60));

This is the Text control on which the Lighting
effect is set.

var slider = new Slider(1, 360, 0);
azimuth.bind(slider.valueProperty());

slider.valueProperty().addListener(event -&gt; {
    light.setAzimuth(azimuth.get());
    lighting.setLight(light);
    text.setEffect(lighting);
});

The Slider control manages the azimuth of the light source.

![lighting.png](images/lighting.png)

Figure: Lighting

## JavaFX GaussianBlur

GaussianBlur is a blur effect using a Gaussian convolution
kernel with a configurable radius.

com/zetcode/GaussianBlurEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Slider;
import javafx.scene.effect.GaussianBlur;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class GaussianBlurEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new VBox(30);
        root.setPadding(new Insets(10));

        var radius = new SimpleDoubleProperty(0);

        var blurredText = new Text("Inception");
        blurredText.setFont(Font.font(38));

        var slider = new Slider(1, 20, 1);
        radius.bind(slider.valueProperty());

        slider.valueProperty().addListener(event -&gt; {
            blurredText.setEffect(new GaussianBlur(radius.get()));
        });

        root.getChildren().addAll(slider, blurredText);

        var scene = new Scene(root, 300, 250, Color.WHITESMOKE);

        stage.setTitle("Blur effect");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example applies a GaussianBlur effect on a Text
control. The radius of the blur is controlled by a Slider.

var blurredText = new Text("Inception");
blurredText.setFont(Font.font(38));

The blur effect will be applied on this text control.

var slider = new Slider(1, 20, 1);
radius.bind(slider.valueProperty());

slider.valueProperty().addListener(event -&gt; {
    blurredText.setEffect(new GaussianBlur(radius.get()));
});

The Slider control manages the radius property
of the GaussianBlur effect.

![gaussianblur.png](images/gaussianblur.png)

Figure: GaussianBlur

## JavaFX SepiaTone

SepiaTone is a filter that produces a sepia tone effect,
similar to antique photographs.

com/zetcode/SepiaToneEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.beans.binding.Bindings;
import javafx.scene.CacheHint;
import javafx.scene.Scene;
import javafx.scene.effect.Effect;
import javafx.scene.effect.SepiaTone;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class SepiaToneEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new StackPane();
        var image = new Image("file:src/main/resources/mushroom.png");
        var iw = new ImageView(image);

        var sepia = new SepiaTone();
        iw.effectProperty().bind(
                Bindings.when(iw.hoverProperty())
                        .then((Effect) sepia)
                        .otherwise((Effect) null)
        );

        iw.setCache(true);
        iw.setCacheHint(CacheHint.SPEED);

        root.getChildren().add(iw);

        var scene = new Scene(root);

        stage.setTitle("SepiaTone");
        scene.setFill(Color.WHITESMOKE);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example applies a SepiaTone effect
on an Image when a mouse pointer is over the image.

var image = new Image("file:src/main/resources/mushroom.png");
var iw = new ImageView(image);

We load an Image from the disk and create an ImageView
control.

var sepia = new SepiaTone();
iw.effectProperty().bind(
        Bindings.when(iw.hoverProperty())
                .then((Effect) sepia)
                .otherwise((Effect) null)
);

The SepiaTone effect is set when the mouse pointer is located
over the bounds of the ImageView control.

iw.setCache(true);
iw.setCacheHint(CacheHint.SPEED);

For performance reasons, the node rendering is cached.

## JavaFX PerspectiveTransform

PerspectiveTransform provides a non-affine transformation of the input content.
It is usually used to create a three-dimensional effect on a two-dimensional content.

com/zetcode/PerspectiveEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.effect.PerspectiveTransform;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

public class PerspectiveEx extends Application {

    private final int SIZE = 50;

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new StackPane();

        var board = new Pane();

        for (int row = 0; row &lt; 8; row++) {
            for (int col = 0; col &lt; 8; col++) {

                var r = new Rectangle(col * SIZE, row*SIZE,
                        SIZE, SIZE);

                if ((col+row) % 2 == 0) {
                    r.setFill(Color.WHITE);
                } else {
                    r.setFill(Color.BLACK);
                }

                board.getChildren().add(r);
            }
        }

        var e = new PerspectiveTransform();
        e.setUlx(30);     // Upper-left point
        e.setUly(170);
        e.setUrx(370);    // Upper-right point
        e.setUry(170);
        e.setLlx(0);      // Lower-left point
        e.setLly(300);
        e.setLrx(400);    // Lower-right point
        e.setLry(300);
        board.setEffect(e);

        root.getChildren().add(board);

        var scene = new Scene(root, Color.WHITESMOKE);

        stage.setTitle("ChessBoard");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example forms a chessboard with the PerspectiveTransform effect.

for (int row = 0; row &lt; 8; row++) {
    for (int col = 0; col &lt; 8; col++) {

        var r = new Rectangle(col * SIZE, row*SIZE,
                SIZE, SIZE);

        if ((col+row) % 2 == 0) {
            r.setFill(Color.WHITE);
        } else {
            r.setFill(Color.BLACK);
        }

        board.getChildren().add(r);
    }
}

This code produces 64 rectangles. The rectangles have black and white colours.

var e = new PerspectiveTransform();
e.setUlx(30);     // Upper-left point
e.setUly(170);
e.setUrx(370);    // Upper-right point
e.setUry(170);
e.setLlx(0);      // Lower-left point
e.setLly(300);
e.setLrx(400);    // Lower-right point
e.setLry(300);
board.setEffect(e);

A PerspectiveTransform is instantiated and applied on the node.
We provide x and y coordinates of four corner points. These points
form a rectangle into which the effect is rendered.

![chessboard.png](images/chessboard.png)

Figure: Chessboard

## JavaFX Combining effects

It is possible to combine effects. The setEffect method replaces
an effect if there is one already set. To combine multiple effects, we use
the Effect's setInput method.

com/zetcode/CombiningEffectsEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.effect.Light;
import javafx.scene.effect.Lighting;
import javafx.scene.effect.Reflection;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class CombiningEffectsEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new StackPane();

        Light.Distant light = new Light.Distant();
        light.setAzimuth(50);

        var lighting = new Lighting();
        lighting.setLight(light);
        lighting.setSurfaceScale(5);

        var text = new Text();
        text.setText("ZetCode");
        text.setFill(Color.CADETBLUE);
        text.setFont(Font.font(null, FontWeight.BOLD, 60));

        var ref = new Reflection();
        ref.setInput(lighting);
        text.setEffect(ref);

        root.getChildren().add(text);

        var scene = new Scene(root, 300, 250, Color.WHITESMOKE);

        stage.setTitle("Combining effects");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example program combines a Reflection effect
with a Lighting effect on a Text node.

Light.Distant light = new Light.Distant();
light.setAzimuth(50);

var lighting = new Lighting();
lighting.setLight(light);
lighting.setSurfaceScale(5.0);

These lines create a Lighting effect.

var text = new Text();
text.setText("ZetCode");
text.setFill(Color.CADETBLUE);
text.setFont(Font.font(null, FontWeight.BOLD, 60));

A Text control is created. The font is enlarged and bold face.
The colour of the text is cadetblue.

var ref = new Reflection();
ref.setInput(lighting);

A Reflection effect is constructed. It is combined with the
lighting effect using the setInput method.

text.setEffect(ref);

The final combination of effects is applied on the node with the setEffect method.

![combineeffects.png](images/combineeffects.png)

Figure: Combining effects

In this chapter, we have created several visual effects.

[Contents](..)
[Previous](../events/)
[Next](../animation/)