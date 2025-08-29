+++
title = "Java JAR"
date = 2025-08-29T19:59:34.461+01:00
draft = false
description = "Java JAR tutorial shows how to work with the JAR files in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java JAR

last modified July 6, 2024

 

In this article we show how to work with JAR files in Java.

A JAR file serves as a logical container that bundles all the essential
components of a Java software application or library into a single compressed
file. These components include Java class files, associated metadata, and
resources. JAR files use lossless compression algorithms, making them efficient
for storage and easy to share. They are based on the ZIP format and commonly
have a .jar file extension.

JAR stands for Java ARchive. It's a file format used to aggregate many files,
primarily .class files (compiled Java code), and other resources
(text files, images, etc.) into a single archive.

The key characteristics of JAR files are:

 
    
        *Structure:* JAR files can contain a manifest file
        (META-INF/MANIFEST.MF) that provides metadata about the archive, such as
        the main class to run or dependencies on other JARs.
    
    
        *Platform-independent:* JAR files are platform-independent,
        meaning they can be run on any system with a Java Runtime Environment
        (JRE) installed.
     
    
        *Designed for Java applications:* JARs are specifically designed
        for packaging and distributing Java applications, libraries, and
        applets.
     

     
        *Distribution:* JARs provide a convenient way to distribute
        entire Java applications or libraries in a single file. This simplifies
        deployment and reduces the risk of missing files.
     
    
        *Classpath management:* JARs can be added to the classpath, which
        is a list of locations where the Java runtime searches for classes and
        resources. This allows applications to access classes and resources
        stored within JARs.
    
    
        *Modularization:* JARs can be used to package reusable components
        like libraries or frameworks. This promotes modularity and code
        organization.
     

There are two types of JAR files:

    
        *Executable JARs:* These JARs contain a manifest file that
        specifies the main class to run. They can be executed directly from the
        command line using the java -jar command.  
    
    
        *Library JARs:* These JARs contain only class files and are meant
        to be used by other applications. They don't have a main class and
        cannot be executed  
        directly.  
    

## JAR in IntelliJ IDEA

Follow these steps to create a JAR file in IntelliJ IDEA. Select:

    - Project structure

    - Artifacts

    - Add JAR / From modules with dependencies

    - Create manifest file with path to main method

    - Build / Build Artifacts

## Maven shade plugin

The Maven Shade Plugin packages our Java project into an uber-jar that includes
both main artifact and its dependencies. It simplifies deployment by creating a
single JAR file containing everything needed for our application. Additionally,
it can rename packages to prevent conflicts between dependencies. It is used
during the package phase in our Maven build process.

The shaded JAR can be made executable, allowing you to run our application
directly from the generated JAR file.

&lt;build&gt;
    &lt;plugins&gt;
        &lt;plugin&gt;
            &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
            &lt;artifactId&gt;maven-shade-plugin&lt;/artifactId&gt;
            &lt;version&gt;3.6.0&lt;/version&gt;
            &lt;executions&gt;
                &lt;execution&gt;
                    &lt;phase&gt;package&lt;/phase&gt;
                    &lt;goals&gt;
                        &lt;goal&gt;shade&lt;/goal&gt;
                    &lt;/goals&gt;
                    &lt;configuration&gt;a
                        &lt;transformers&gt;
                            &lt;transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer"&gt;
                                &lt;manifestEntries&gt;
                                    &lt;Main-Class&gt;com.zetcode.Main&lt;/Main-Class&gt;
                                    &lt;Build-Number&gt;1.0&lt;/Build-Number&gt;
                                &lt;/manifestEntries&gt;
                            &lt;/transformer&gt;
                        &lt;/transformers&gt;
                    &lt;/configuration&gt;
                &lt;/execution&gt;
            &lt;/executions&gt;
        &lt;/plugin&gt;
    &lt;/plugins&gt;
&lt;/build&gt;

This is an example of a Maven shade plugin being configured. It is made
executable with a main class pointing to com.zetcode.Main

## Gradle JAR plugin

This is the default Gradle task for creating a JAR archive. It packages our
compiled class files (*.class) and resources from our project into a single JAR
file.

It does not include any dependencies in the JAR. Our application needs the
libraries it depends on to be installed separately on the target system.

plugins {
    id 'java'
    id 'application'
}

group = 'com.zetcode'
version = '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

application {
    mainClass = 'com.zetcode.Main'
}

jar {
    duplicatesStrategy(DuplicatesStrategy.EXCLUDE)
    manifest {
        attributes(
                'Main-Class': 'com.zetcode.Main'
        )
    }
    from {
        configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it) }
    }
}

## Gradle Shadow JAR plugin

It creates a fat JAR or shadow JAR, which is a single JAR containing our
application code and all its transitive dependencies.

It makes deployment easier as you only need to distribute the single JAR file
containing everything our application needs. The JAR file will be larger due to
the inclusion of all dependencies.

plugins {
    id 'java'
    id 'application'
    id 'io.github.goooler.shadow' version '8.1.8'
}

group = 'com.zetcode'
version = '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

application {
    mainClass = 'com.zetcode.Main'
}

dependencies {
    implementation 'org.eclipse.collections:eclipse-collections:11.1.0'
}

jar {
//    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    duplicatesStrategy(DuplicatesStrategy.EXCLUDE)
    exclude 'META-INF/*.RSA', 'META-INF/*.SF', 'META-INF/*.DSA'
    manifest {
        attributes(
                'Main-Class': 'com.zetcode.Main'
        )
    }
    from {
        configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it) }
    }
}

## Manual JAR creation

We create an executable fat JAR file that uses the Eclipse collections library. 
It consists of two JAR files: eclipse-collections-11.1.0.jar and 
eclipse-collections-api-11.1.0.jar. These two files must be 
included in the final JAR as well. 

bin
    manifest.txt
lib
    eclipse-collections-11.1.0.jar
    eclipse-collections-api-11.1.0.jar
src
└───main
    └───java
        └───com
            └───zetcode
                    Main.java

At the beginning, the project directory looks like this.

com/zetcode/Main.java
  

package com.zetcode;

import org.eclipse.collections.api.factory.Lists;

import java.util.List;

public class Main {
    public static void main(String[] args) {

        List&lt;String&gt; words = Lists.mutable.of("sky", "town", "rock");
        words.add("ten");
        words.add("small");
        words.add("lucid");

        System.out.println(words);
    }
}

We define a list of words using Lists.mutable.of. This method 
comes from the Eclipse collections library.

We compile the program with javac tool. We need to provide the 
path to the libraries with the -cp option. 

javac -cp lib\eclipse-collections-11.1.0.jar;lib\eclipse-collections-api-11.1.0.jar src\main\java\com\zetcode\Main.java -d bin

The Java bytecode is generated in the bin directory. On Windows, we
separate libraries with semicolon character. We use a colon on Unix systems.

java -cp bin;lib\eclipse-collections-11.1.0.jar;lib\eclipse-collections-api-11.1.0.jar com.zetcode.Main

We run the program with java tool. 

The manifest.txt file:

Manifest-Version: 1.0
Main-Class: com.zetcode.Main
Class-Path: ../lib/eclipse-collections-11.1.0.jar ../lib/eclipse-collections-api-11.1.0.jar

In the manifest.txt file, we specify the main class and the class
path. In the class path, we include the two libraries that we use in the
program. We place the manifest.txt file into the bin
subdirectory, where we generate the fat JAR file. 

Note that the last empty line is **mandatory**.

jar -cvfm main.jar manifest.txt com ../lib
added manifest
adding: com/(in = 0) (out= 0)(stored 0%)
adding: com/zetcode/(in = 0) (out= 0)(stored 0%)
adding: com/zetcode/Main.class(in = 901) (out= 513)(deflated 43%)
adding: lib/(in = 0) (out= 0)(stored 0%)
adding: lib/eclipse-collections-11.1.0.jar(in = 10475509) (out= 9523556)(deflated 9%)
adding: lib/eclipse-collections-api-11.1.0.jar(in = 1789461) (out= 1388818)(deflated 22%)
adding: lib/package.md(in = 7625) (out= 2496)(deflated 67%)
adding: lib/slf4j-api-1.7.36.jar(in = 41125) (out= 36381)(deflated 11%)
adding: lib/sqlite-jdbc-3.46.0.1-20240611.065717-6.jar(in = 13615977) (out= 13580269)(deflated 0%)

Inside the bin directory, we create the JAR file. 

java -jar main.jar
[sky, town, rock, ten, small, lucid]

Finally, we run the JAR file. 

## Source

[Using JAR Files: The Basics](https://docs.oracle.com/javase/tutorial/deployment/jar/basicsindex.html)

In this article we have worked with JAR files in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).