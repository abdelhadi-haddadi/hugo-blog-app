+++
title = "Java Files.walk"
date = 2025-08-29T19:58:40.854+01:00
draft = false
description = "Java Files.walk tutorial shows how to walk files in Java with Files.walk."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Files.walk

last modified July 7, 2024

 

In this article we show how to walk files in Java with Files.walk.

Files.walk returns a stream that is lazily populated with
Path by recursively walking the file tree rooted at a given
starting file. The file tree is traversed depth-first. There are two overloaded 
Files.walk methods; one of them takes the maxDepth
parameter, which sets the maximum number of levels of directories to visit.

By default, symbolic links are not automatically followed by this method. If the
options parameter contains the FOLLOW_LINKS  option
then symbolic links are followed.

## Walking regular files

The first example shows regular files in the specified directory.

Main.java
  

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

void main() throws IOException {

    var dirName = "C:/Users/Jano/Downloads";

    try (Stream&lt;Path&gt; paths = Files.walk(Paths.get(dirName), 2)) {
        paths.filter(Files::isRegularFile)
                .forEach(System.out::println);
    }
}

The program walks the directory for two levels. We apply a filter with 
Files.isRegular predicate.

## Walking directories

The following example shows directories in the specified directory.

Main.java
  

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

void main() throws IOException {

    var dirName = "C:/Users/Jano/Downloads";

    try (Stream&lt;Path&gt; paths = Files.walk(Paths.get(dirName))) {
        paths.filter(Files::isDirectory)
                .forEach(System.out::println);
    }
}

To output directories, we apply the Files.isDirectory predicate. 
This time there is not limit for recursive walking.

## Walking by file extensions

The next program lists all PDF files in the specified direcory and its 
subdirectories for two levels.

Main.java
  

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

void main() throws IOException {

    var dirName = "C:/Users/Jano/Downloads";

    try (Stream&lt;Path&gt; paths = Files.walk(Paths.get(dirName), 2)) {
        paths.map(path -&gt; path.toString()).filter(f -&gt; f.endsWith(".pdf"))
                .forEach(System.out::println);
    }
}

The program lists PDF files in the Downloads directory. The path object is 
converted to a string and we call endsWith on the string to 
check if it ends with pdf extension.

## Source

[Java Basic I/O - tutorial](https://docs.oracle.com/javase/tutorial/essential/io/)

In this article we have used Files.walk to walk the directory contents.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).