+++
title = "Kotlin Hello World"
date = 2025-08-29T20:02:37.233+01:00
draft = false
description = "Kotlin Hello World tutorial shows how to create a Hello World program in Kotlin."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Hello World

last modified January 29, 2024

This article shows how to create a Hello World program in Kotlin.

Kotlin is a statically-typed programming language that runs on the
Java virtual machine.

Kotlin was created by JetBrains. Kotlin is and object-oriented and functional
programming language. Kotlin was designed to be a pragmatic, concise, safe, and
interoperable programming language.

## Installing Kotlin compiler

We install the Kotlin compiler with SDKMAN.

$ sdk install kotlin

SDKMAN is a tool for managing parallel versions of multiple Software Development
Kits on most Unix based systems.

$ kotlin -version
Kotlin version 1.6.21-release-334 (JRE 17.0.3+6-LTS)

We check the version.

## Kotlin Hello World example

The following program prints a simple message to the console.

hello.kt
  

package com.zetcode

fun main() {

    println("Hello, World!")
}

The Kotlin source files have .kt extension. Note that in Kotlin we
do not have to use semicolons.

package com.zetcode

A source file may start with a package declaration. Packages are
use to organize types. Unlike Java, Kotlin does not require the packages to
match the directory structure; however, it is good practice to do so.

fun main() {

    println("Hello, World!")
}

The main function is an entry point to the program. A function is
declared with the fun keyword. In Kotlin, we do not have to put a
function into a class. The println function prints a message to the
console. The main function takes an array of strings as a
parameter. Notice that in Kotlin the types follow the variable names after a
colon character.

## Compiling Kotlin program

We are going to compile and run the program from the command line.

$ kotlinc hello.kt

With the kotlinc compiler, we compile the source.

$ ls com/zetcode/
HelloKt.class

The compiler creates a HelloKt.class in the
com/zetcode subfolder.

$ kotlin com/zetcode/HelloKt.class 
Hello World!

We run the program with the kotlin tool.

## Packaging Kotlin program

Next we are going to show how to package a Kotlin program into a
Java JAR file.

$ kotlinc hello.kt -include-runtime -d hello.jar

With the -include-runtime option, we include Kotlin runtime into
the resulting JAR file.

$ java -jar hello.jar
Hello, World!

We run the program with java tool.

## Source

[Kotlin Get started tutorial](https://kotlinlang.org/docs/getting-started.html)

In this article we have created a simple program in Kotlin. The program
was built and run with command line tools.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).