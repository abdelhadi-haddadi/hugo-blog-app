+++
title = "Introduction to JavaFX"
date = 2025-08-29T19:56:52.650+01:00
draft = false
description = "This chapter is an introduction to JavaFX. It presents JavaFX and shows how to create a simple JavaFX program."
image = "images/first.png"
imageBig = "images/first.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../firstprograms/)

# Introduction to JavaFX

last modified October 18, 2023

This is an introductory JavaFX tutorial. The purpose of this tutorial is to 
get you started with JavaFX. 

## About JavaFX

*JavaFX* is a software platform for developing and delivering rich
internet applications (RIAs) that can run across a wide variety of devices.
JavaFX is the next generation GUI toolkit for the Java platform.  It is fully
integrated with recent versions of Java SE Runtime Environment (JRE) and the
Java Development Kit (JDK).

JavaFX has the following main parts:

- Prism

- Glass windowing toolkit

- Media engine

- Web engine

*Prism* is a high-performance graphics engine for 2D and 3D graphics.
*Glass* windowing toolkit is a platform-dependent layer that connects
JavaFX to the native operating system. It provides native operating system
services, like managing windows, events, timers, and surfaces.
*Media* engine provides tools to create media applications that enable
media playback in the desktop window or within a web page on supported
platforms. *Web* engine is a web browser engine that supports HTML5, CSS,
JavaScript, DOM, and SVG.

**Note: ** Since Java 11, JavaFX is not a part of the Java SE 
distribution. JavaFX SDK has to be downloaded separately.

## Anatomy of a JavaFX application

Application is the main class of a JavaFX program. Each JavaFX program
must extend the Application class. Its start method is the 
main entry point of the application; it is the first method to be called after 
the system is ready. The main method is not required in JavaFX applications;
it can be used as a fallback when the application cannot be launched in certain situations.

A JavaFX application consists of a Stage and a Scene. 
Stage is the top-level container, the main window of the application.
(For applications embedded in a web browser, it is the main rectangular area.)
Scene is the container for the visual content of the Stage.
The Scene's content is organized in a *Scene graph*.
The two terms reflect the shift from desktop applications to more generic
rich internet applications.

## Scene graph

Scene graph is a hierarchical tree of nodes that represents all of the visual
elements of the application's user interface. A single element in a scene graph
is called a node. Each node is a branch node or a leaf node. Branch nodes can
contain other nodes—their children. Leaf nodes do not contain other nodes. The
first node in the tree is called the *root node*; a root node does not
have a parent.

Concrete implementations of nodes include graphics primitives, controls, layout
managers, images, or media. It is possible to manipulate the scene by modifying
node properties. This way we can animate the nodes, apply effects, do
transformations, or change their opacity.

## Building JavaFX applicaions

To build a JavaFX application, we need the javafx-controls dependency and 
the javafx-maven-plugin plugin.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;FirstEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.openjfx&lt;/groupId&gt;
            &lt;artifactId&gt;javafx-controls&lt;/artifactId&gt;
            &lt;version&gt;13&lt;/version&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.openjfx&lt;/groupId&gt;
                &lt;artifactId&gt;javafx-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;0.0.3&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;mainClass&gt;com.zetcode.FirstEx&lt;/mainClass&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is a sample Maven POM file. 

&lt;configuration&gt;
    &lt;mainClass&gt;com.zetcode.FirstEx&lt;/mainClass&gt;
&lt;/configuration&gt;

We need to provide the path to the main application class.

$ mvn javafx:run

We run the example with the mnv javafx:run command.

## JavaFX first example

In this section, we go through a simple JavaFX application.

com/zetcode/FirstEx.java
  

package com.zetcode;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;

public class FirstEx extends Application {

    @Override
    public void start(Stage stage) {

        initUI(stage);
    }

    private void initUI(Stage stage) {

        var root = new StackPane();

        var scene = new Scene(root, 300, 250);

        var lbl = new Label("Simple JavaFX application.");
        lbl.setFont(Font.font("Serif", FontWeight.NORMAL, 20));
        root.getChildren().add(lbl);

        stage.setTitle("Simple application");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

The example shows a text in the middle of the application's window.

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;

The essential JavaFX classes, collections, and properties reside in the 
javafx package.

public class FirstEx extends Application {

Application is the main class of a JavaFX program.

@Override
public void start(Stage stage) {

    initUI(stage);
}

The Application's start method is overridden.
The start method is the main entry point to the JavaFX program.
It receives a Stage as its only parameter. (Stage is
the main application window or area.) The user interface is built in the 
initUI method.

var root = new StackPane();

StackPane is a container used for organizing nodes. It uses
a simple layout manager that places its content nodes in a back-to-front 
single stack. In our case, we only want to center a single node.

var scene = new Scene(root, 300, 250);

Scene is the container for all content in a scene graph. 
It takes a root node as its first parameter. The StackPane 
is a root node in this scene graph. The next two parameters specify
the width and the height of the scene.

var lbl = new Label("Simple JavaFX application.");
lbl.setFont(Font.font("Serif", FontWeight.NORMAL, 20));

A Label control is created and its font is set with the
setFont method. Label is a non-editable text control. 

root.getChildren().add(lbl);

The label control is added to the StackPane. The getChildren
method returns the list of children of a pane.

stage.setTitle("Simple application");

The setTitle method of a Stage sets a title
for the main window.

stage.setScene(scene);

The scene is added to the stage with the setScene method.

stage.show();

The show method shows the window on the screen.

public static void main(String[] args) {
    launch(args);
}

The traditional main method is not needed. It is only used as a fallback
for situations in which JavaFX launching is not working. 

![first.png](images/first.png)

Figure: First JavaFX application

## Swing and SWT

Swing is Java's first major GUI toolkit. It is a robust and flexible GUI library. 
Swing is popular in enterprise applications. One of the incentives to create JavaFX
was that it was difficult to adapt Swing to new trends in user interfaces.
Therefore, it was decided to create JavaFX as a completely new toolkit.

Standard widget toolkit (SWT) is a third-party GUI library for Java. SWT uses
native GUI APIs like Windows API or GTK+ to create its widgets via the Java
Native Interface (JNI). SWT is not part of the JDK. It is available as an
external dependency. SWT was initially developed by the IBM corporation. Now it
is an open source project maintained by the Eclipse community. 

This was an introduction to JavaFX. 

[Contents](..) 
[Next](../firstprograms/)