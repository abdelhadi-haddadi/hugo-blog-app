+++
title = "Spring Boot Swing integration"
date = 2025-08-27T23:20:57.419+01:00
draft = false
description = "In Spring Boot Swing integration tutorial, we are going to combine Spring Boot framework with Swing library."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Swing integration

last modified July 13, 2020 

In Spring Boot Swing integration tutorial, we are going to combine Spring Boot 
framework with Swing library.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring which helps create stand-alone, production-grade Spring 
based applications easily.

Swing is the principal GUI toolkit for the Java programming language. 
Swing is completely written in Java.

pom.xml
src
├── main
│   └── java
│       └── com
│           └── zetcode
│               └── gui
│                   └── SwingApp.java
└── test
    └── java

This is the project structure of the Spring Boot application.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;springbootswing&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;2.1.5.RELEASE&lt;/version&gt;
    &lt;/parent&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter&lt;/artifactId&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven build file. The spring-boot-starter is the core 
starter that includes auto-configuration support, logging, and YAML. The application 
is packaged into a JAR file.

com/zetcode/gui/SwingApp.java
  

package com.zetcode.gui;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import java.awt.EventQueue;
import java.awt.event.ActionEvent;

@SpringBootApplication
public class SwingApp extends JFrame {

    public SwingApp() {

        initUI();
    }

    private void initUI() {

        var quitButton = new JButton("Quit");

        quitButton.addActionListener((ActionEvent event) -&gt; {
            System.exit(0);
        });

        createLayout(quitButton);

        setTitle("Quit button");
        setSize(300, 200);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }

    private void createLayout(JComponent... arg) {

        var pane = getContentPane();
        var gl = new GroupLayout(pane);
        pane.setLayout(gl);

        gl.setAutoCreateContainerGaps(true);

        gl.setHorizontalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
        );

        gl.setVerticalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
        );
    }

    public static void main(String[] args) {

        var ctx = new SpringApplicationBuilder(SwingApp.class)
                .headless(false).run(args);

        EventQueue.invokeLater(() -&gt; {

            var ex = ctx.getBean(SwingApp.class);
            ex.setVisible(true);
        });
    }
}

This simple Swing application has a JButton on the panel. Clicking
on the button terminates the appication.

@SpringBootApplication
public class SwingApp extends JFrame {

The Swing application is decorated with the @SpringBootApplication
annotation. The annotation enables Spring Boot services.

var quitButton = new JButton("Quit");

Here we create a button component. This constructor takes a string label
as a parameter.

quitButton.addActionListener((ActionEvent event) -&gt; {
    System.exit(0);
});

We plug an action listener to the button. The listener's actionPerformed
method will be called when we click on the button. The action terminates the application
by calling the System.exit method.

createLayout(quitButton);

The child components need to be placed into containers. We delegate the task
to the createLayout method.

var gl = new GroupLayout(pane);
pane.setLayout(gl);

We use the GroupLayout to do the application layout.

ConfigurableApplicationContext ctx = new SpringApplicationBuilder(SwingApp.class)
        .headless(false).run(args);

The Spring Boot application is created with the SpringApplicationBuilder.
We turn off the headless mode, which is suitable for server applications.

EventQueue.invokeLater(() -&gt; {

    var ex = ctx.getBean(SwingApp.class);
    ex.setVisible(true);
});

We retrieve the Swing appication bean from the application context. 
The invokeLater method places
the application on the Swing Event Queue. It is used to ensure 
that all UI updates are concurrency-safe. In other words, it
is to prevent GUI from hanging in certain situations. 

$ mvn spring-boot:run -q

We run the application. The -q Maven option turns off Maven messages.

In this tutorial, we have created a Swing appication with Spring Boot framework.