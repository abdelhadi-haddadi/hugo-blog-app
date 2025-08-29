+++
title = "Spring Boot Swing integration"
date = 2025-08-29T20:12:35.482+01:00
draft = false
description = "In Spring Boot Swing integration tutorial, we are going to combine Spring Boot framework with Swing library."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Swing integration

last modified July 28, 2023

In this article we are combine Spring Boot framework with Swing library.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring which helps create stand-alone, production-grade Spring 
based applications easily.

Swing is the principal GUI toolkit for the Java programming language. 
Swing is completely written in Java.

build.gradle
...
src
├── main
│   └── java
│       └── com
│           └── zetcode
│               └── SwingApp.java
└── test
    └── java

This is the project structure of the Spring Boot application.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file. The spring-boot-starter is the core
starter that includes auto-configuration support, logging, and YAML. The
application is packaged into a JAR file.

com/zetcode/SwingApp.java
  

package com.zetcode;

import org.springframework.boot.WebApplicationType;
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
                .headless(false).web(WebApplicationType.NONE).run(args);

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

We plug an action listener to the button. The listener's
actionPerformed method will be called when we click on the button.
The action terminates the application by calling the System.exit
method.

createLayout(quitButton);

The child components need to be placed into containers. We delegate the task
to the createLayout method.

var gl = new GroupLayout(pane);
pane.setLayout(gl);

We use the GroupLayout to do the application layout.

var ctx = new SpringApplicationBuilder(SwingApp.class)
    .headless(false).web(WebApplicationType.NONE).run(args);

The Spring Boot application is created with the
SpringApplicationBuilder. We turn off the headless mode, which is
suitable for server applications. We turn off the web application mode with 
WebApplicationType.NONE.

EventQueue.invokeLater(() -&gt; {

    var ex = ctx.getBean(SwingApp.class);
    ex.setVisible(true);
});

We retrieve the Swing appication bean from the application context. The
invokeLater method places the application on the Swing Event Queue.
It is used to ensure that all UI updates are concurrency-safe. In other words,
it is to prevent GUI from hanging in certain situations. 

$ ./gradlew bootRun -q

We run the application. The -q option turns off Gradle messages.

In this tutorial we have created a simple Swing appication with Spring Boot
framework.