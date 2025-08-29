+++
title = "Java file time"
date = 2025-08-29T19:58:40.856+01:00
draft = false
description = "In Java file time tutorial, we show how to determine file creation, modification, and access time in Java with Files class."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java file time

last modified July 4, 2024

 

In this article we show how to determine file creation, last modification, and
last access time in Java with Files and BasicFileAttributes.

## Files

Files is a Java class that contains static methods that operate on
files, directories, or other types of files. Mostly, these methods will delegate
to the associated file system provider to perform the file operations.

## BasicFileAttributes

BasicFileAttributes holds basic file attributes. These are
attributes that are common to many file systems and consist of mandatory and
optional file attributes, such as size of file creation time.
BasicFileAttributes are retrieved with
Files.readAttributes method.

## File creation time

The file creation time in Java is retrieved with BasicFileAttributes.creationTime
method.

Main.java
  

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;

void main() throws IOException {

    String fileName = "/home/jano/words.txt";

    File myfile = new File(fileName);
    Path path = myfile.toPath();

    BasicFileAttributes fatr = Files.readAttributes(path,
            BasicFileAttributes.class);

    System.out.printf("File creation time: %s%n", fatr.creationTime());
}

This example prints the creation time of the specified file.

## File last modification time

The BasicFileAttributes.lastModifiedTime method
gets the last modification time of a file in Java.

Main.java
  

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;

void main() throws IOException {

    String fileName = "/home/jano/words.txt";

    File myfile = new File(fileName);
    Path path = myfile.toPath();

    BasicFileAttributes fatr = Files.readAttributes(path,
            BasicFileAttributes.class);

    System.out.printf("Last modification time: %s%n", fatr.lastModifiedTime());
}

This example prints the last modification time of the specified file.

## File last access time

The last access time of a file in Java is retrieved with
BasicFileAttributes.lastAccessTime method.

Main.java
  

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;

void main() throws IOException {

    String fileName = "/home/jano/words.txt";

    File myfile = new File(fileName);
    Path path = myfile.toPath();

    BasicFileAttributes fatr = Files.readAttributes(path,
            BasicFileAttributes.class);

    System.out.printf("Last access time: %s%n", fatr.lastAccessTime());
}

This example prints the last access time of the specified file.

## Source

[Java Basic I/O - tutorial](https://docs.oracle.com/javase/tutorial/essential/io/)

In this article we have determined the file creation, last modification, and last
access time with Files and BasicFileAttributes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).