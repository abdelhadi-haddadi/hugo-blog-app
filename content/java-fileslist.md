+++
title = "Java Files.list"
date = 2025-08-29T19:58:39.732+01:00
draft = false
description = "Java Files.list tutorial shows how to list files in Java with Files.list."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Files.list

last modified July 6, 2024

 

In this article we show how to list files in Java with Files.list.

Files.list returns a lazily populated stream of directory elements.
The listing is not recursive.

The elements of the stream are Path objects.

## Listing current directory

The first example lists the current directory.

Main.java
  

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

void main() throws IOException {

    var path = Paths.get(".");

    try (var files = Files.list(path)) {
        files.forEach(System.out::println);
    }
}

The dot symbol represents the current working directory. We get the path object
with Paths.get.

## Listing directories in home directory

The following example lists directories in the user's home directory.

Main.java
  

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

void main() throws IOException {

    var homeDir = System.getProperty("user.home");
    var path = new File(homeDir).toPath();

    try (var files = Files.list(path)) {
        files.filter(p -&gt; p.toFile().isDirectory())
                .forEach(System.out::println);
    }
}

We convert the path object to a File with toFile
and call the isDirectory method. The stream is filtered 
with filter.

## Listing by file extensions

The next program lists all PDF files.

Main.java
  

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Paths;

void main() throws IOException {

    var homeDir = System.getProperty("user.home")
            + FileSystems.getDefault().getSeparator() + "Downloads";

    try (var files = Files.list(Paths.get(homeDir))) {
        files.filter(path -&gt; path.toString().endsWith(".pdf"))
                .forEach(System.out::println);
    }
}

The program lists PDF files in the Downloads directory. The path object is 
converted to a string and we call endsWith on the string to 
check if it ends with pdf extension.

## Counting files

We count the number of PDF files.

Main.java
  

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Paths;

void main() throws IOException {

    var homeDir = System.getProperty("user.home")
            + FileSystems.getDefault().getSeparator() + "Downloads";

    try (var files = Files.list(Paths.get(homeDir))) {
        var nOfPdfFiles = files.filter(path -&gt; path.toString()
                .endsWith(".pdf")).count();
        System.out.printf("There are %d PDF files", nOfPdfFiles);
    }
}

The number of files is determined with count.

## Source

[Java Basic I/O - tutorial](https://docs.oracle.com/javase/tutorial/essential/io/)

In this article we have used Files.list to list the directory
contents.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).