+++
title = "Java local variable type inference"
date = 2025-08-27T23:20:50.787+01:00
draft = false
description = "Java local variable type inference tutorial 
shows the new feature of Java 10 — local variable type inference. 
Type inference is the ability of a compiler to infer the data type from 
the right side of an assigment."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java local variable type inference

last modified July 13, 2020 

Java local variable type inference tutorial shows the new feature of Java 10 
— local variable type inference. Type inference is the ability of a compiler
to infer the data type from the right side of an assigment.

## Java 10

Java 10 was released on March 20, 2018. It brings several 
Java Enhancement Proposals (JEPs). The JEP 286 is called local variable
type inference.

## JEP 296

This document improves the developer experience by reducing the ceremony 
associated with writing Java code, while maintaining Java's commitment 
to static type safety, by allowing developers to elide the often-unnecessary 
manifest declaration of local variable types.

It introduces a new var keyword, which can be used on 
the left side of the assignment operation. Java automatically infers
the necessary data type from the right side of the assignment.

## Java local type variable inference example

In the following example, we are going to create a simple Java console
application in which we test the new feature.

$ wget http://download.oracle.com/otn-pub/java/jdk/10+46/76eac37278c24557a3c4199677f19b62/jdk-10_linux-x64_bin.tar.gz
$ tar xzvf jdk-10_linux-x64_bin.tar.gz
$ mv jdk-10 ~/bin

We download the Oracle JDK and open the archive. We move the installation
directory to a new directory of our choice.

$ ~/bin/jdk-10/bin/java --version
java 10 2018-03-20
Java(TM) SE Runtime Environment 18.3 (build 10+46)
Java HotSpot(TM) 64-Bit Server VM 18.3 (build 10+46, mixed mode)

We verify the version of Java.

$ mkdir -p src/com/zetcode bin
$ touch src/com/zetcode/JavaNewsEx.java
$ tree
.
├── bin
└── src
    └── com
        └── zetcode
            └── JavaNewsEx.java

We create the directory structure.

com/zetcode/JavaNewsEx.java
  

package com.zetcode;

import java.util.List;

public class JavaNewsEx {

    public static void main(String[] args) {

        var name = "Jonathan";
        System.out.printf("The word %s has %d characters%n", 
            name, name.length());

        var age = 34;
        age += 12;

        System.out.println(age);

        var words = List.of("cloud", "fine", "pen", "dog",
            "temper", "sky", "book");

        System.out.println(words);
    }
}

This is the soruce code of the example.

var name = "Jonathan";

A new variable name is defined. We use the var keyword. 
The type is String, which is inferred from the string literal.

$ ~/bin/jdk-10/bin/javac -d bin src/com/zetcode/JavaNewsEx.java
$ ~/bin/jdk-10/bin/java -cp bin com.zetcode.JavaNewsEx
The word Jonathan has 8 characters
46
[cloud, fine, pen, dog, temper, sky, book]

We compile and run the example.

In this tutorial, we have used the new feature of Java 10 — the local
variable type inference.