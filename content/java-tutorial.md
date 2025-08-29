+++
title = "Java tutorial"
date = 2025-08-29T20:03:04.299+01:00
draft = false
description = "This is Java tutorial. In this tutorial, you will learn the basics of programming in Java language."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java tutorial

last modified October 18, 2023

This is a Java tutorial. In this tutorial you will learn the basics of Java
language. 

The basics of Java are covered in [Java basics](/java/basics/),
[Java lexical structure](/java/lexical-structure/),
[Java array](/java/array/),
[Java flow control](/java/flow-control/),
[Java String](/java/string/),
[Java operator](/java/operator/),
[Java data type](/java/data-type/).
[Java package](/java/package/).

Object-oriented programming is covered in [Java class](/java/class/),
[Java method](/java/method/), Java
interface, and [Java OOP](/java/oop/).

## Java

Java is a high-level, general-purpose, object-oriented programming language. The
main design goals of the language were robustness, portability, high performance
and security. Java is a multithreaded and distributed programming language. It
can be used to create console applications, GUI applications, web applications,
both on PCs or embedded systems.

Java is a programming language created by Sun Microsystems in 1991. The first
publicly available version of Java was released in 1995. Today, the language is
developed by Oracle corporation.

Java excels in creating portable mobile applications, programming various
appliances and in creating enterprise applications.

## JVM

Java virtual machine (JVM) executes Java bytecode. The JVM is included in the
JRE and JDK. Java source code is written in files with the .java
extension. The javac Java compiler will compile the Java source
code into the Java bytecode; the compiled files have the .class
extension. This bytecode is executed by JVM. The *java* tool is a
launcher for Java applications. Oracle's JVM is called HotSpot. HotSpot is a
Java virtual machine for desktops and servers. It has advanced techniques such
as just-in-time compilation and adaptive optimization designed to improve
performance.

## JRE

JRE (Java Runtime Environment) is a set of tools for executing Java
applications. The JRE does not contain tools and utilities such as compilers or
debuggers for developing Java applications.

## JDK

JDK (Java Development Kit) is a superset of the JRE. It contains JRE
and tools such as the compilers and debuggers necessary for developing Java
applications. We need to install JDK to build and run our Java programs.

## OpenJDK installation

Due to Oracle's licencing issues, many developers turn to OpenJDK. Amazon
provides no-cost, multiplatform, production-ready distribution of the Open Java
Development Kit (OpenJDK); it is called Amazon Coretto.

$ wget https://corretto.aws/downloads/latest/amazon-corretto-17-x64-linux-jdk.tar.gz

We download the archive.

$ tar xzvf amazon-corretto-17-x64-linux-jdk.tar.gz 

We decompress and open the archive file.

$ ls amazon-corretto-17.0.4.9.1-linux-x64/ -1
ADDITIONAL_LICENSE_INFO
ASSEMBLY_EXCEPTION
bin
conf
include
jmods
legal
lib
LICENSE
man
README.md
release
version.txt

After we download and unpack OpenJDK, we can see the contents of the JDK
directory. The development tools are located in the bin
subdirectory. The javac compiler and the java
application launcher are located in this subdirectory.

The conf directory contains the .properties, .policy, and other
configuration files intended to be edited by developers, deployers, and end
users. The include directory contains header files that support
native-code programming. The jmods directory contains the compiled
module definitions. The legal directory contains copyright and
license files for each module.

The release file contains the JDK release information.

$ ./bin/java --version
openjdk 17.0.4.1 2022-08-12 LTS
OpenJDK Runtime Environment Corretto-17.0.4.9.1 (build 17.0.4.1+9-LTS)
OpenJDK 64-Bit Server VM Corretto-17.0.4.9.1 (build 17.0.4.1+9-LTS, mixed mode, sharing)

We show the version of Java.

## Setting environment variables

In the next step, we set the JAVA_HOME variable and update 
the PATH variable.

$ export JAVA_HOME=~/opt/amazon-corretto-17.0.4.9.1-linux-x64/

The JAVA_HOME variable is used by tools such as IDEs or builders. 

$ export PATH=$PATH:~/opt/amazon-corretto-17.0.4.9.1-linux-x64/bin/

By updating the PATH variable, we do not need to specify 
the full path for the javac and java tools.

## Compiling a Java application

We create a simple Java program using command line tools.

$ mkdir -p src/com/zetcode

Inside the current working directory, which is the main project directory, we
create the com/zetcode subdirectory. Java source files are
organized in modules called packages. The packages must match the directory
structure.

$ mkdir bin

The compiled Java bytecode goes to the bin directory.

**Note: ** In Java, the public class name must match the 
name of the file in which it is defined.

$ touch src/com/zetcode/SimpleEx.java

A SimpleEx.java source file is created in the
com/zetcode subdirectory. Java source files have a
.java extension.

com/zetcode/SimpleEx.java
  

package com.zetcode;

public class SimpleEx {

    public static void main(String[] args) {

        System.out.println("This is simple Java example.");
    }
}

This is a source code for a simple Java example. This example prints
a message to the console.

package com.zetcode;

The package name must correspond to the directory structure in which the
source file is located.

public class SimpleEx {

The public class name is required to match the file name.

$ javac -d bin src/com/zetcode/SimpleEx.java

Using the javac compiler, we compile the source code. Notice that
we compile the Java source code from the root project directory. The compiled
files go the bin directory.

bin
└── com
    └── zetcode
        └── SimpleEx.class
src
└── com
    └── zetcode
        └── SimpleEx.java
6 directories, 2 files

The compiler generates Java bytecode, which is executed by the Java Virtual
Machine. The bytecode has a .class extension.

$ java -cp bin com.zetcode.SimpleEx
This is simple Java example.

With the java application launcher, we execute the program. It
starts a Java runtime environment, loading a specified class, and invoking that
class's main method. The .class extension is excluded; it is
assumed. 

The program name is a fully qualified name of the program —
com.zetcode.SimpleEx. It includes the name of the program
and its package. With the -cp option we tell the launcher where
to look for the class files.

## Running single-file source code

Since Java 11, it is possible to run single .java files 
without defining a package structure and without the need to compile 
the source code first. 

$ ls
SimpleEx.java

There is only one single file in the project directory.

SimpleEx.java
  

public class SimpleEx {

    public static void main(String[] args) {

        System.out.println("This is simple Java example.");
    }
}

We don't have to define a Java package.

$ java SimpleEx.java
This is simple Java example.

We run a simple application consisting of one file with the java
tool. This is very convenient for learning purposes.

List [all Java tutorials](/java/).

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.