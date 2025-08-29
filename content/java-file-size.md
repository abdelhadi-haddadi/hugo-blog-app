+++
title = "Java file size"
date = 2025-08-29T19:58:39.745+01:00
draft = false
description = "Java file size tutorial shows several ways how to determine the size of a file in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java file size

last modified January 27, 2024

 

In this article we show several ways how to determine the size of a file in Java.

File size is a measure of how much data a computer file contains or, alternately, 
how much storage it consumes. The file size is usually expressed in bytes.

In Java, we can determine the size of a file with File, FileChannel, 
Files, and Apache Commons' FileUtils. A a rule of thumb, in new code we
should use the Files class.

words.txt
  

green, chair, pen, computer, apple, book, scissors

In our examples, we are going to use the words.txt file located
in src/main/resources directory.

## Java file size with File

The length method of File returns the file size.
This is the oldest API to find out the size of a file in Java.

JavaFileSizeEx.java
  

package com.zetcode;

import java.io.File;

public class JavaFileSizeEx {
    
    public static void main(String[] args) {
        
        String fileName = "src/main/resources/words.txt";
        
        File f = new File(fileName);
        long fileSize = f.length();
        
        System.out.format("The size of the file: %d bytes", fileSize);
    }
}

The code example determines the file size using File's length
method.

## Java file size with FileChannel

FileChannel has the size method to determine the
size of the file.

JavaFileSizeEx2.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.channels.FileChannel;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JavaFileSizeEx2 {

    public static void main(String[] args) throws IOException {

        String fileName = "src/main/resources/words.txt";

        Path filePath = Paths.get(fileName);

        FileChannel fileChannel = FileChannel.open(filePath);
        long fileSize = fileChannel.size();
        
        System.out.format("The size of the file: %d bytes", fileSize);
    }
}

The code example determines the file size using FileChannel's size
method.

## Java file size with Files

Files has the size method to determine the
size of the file. This is the most recent API and it is recommended for
new Java applications.

JavaFileSizeEx3.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JavaFileSizeEx3 {

    public static void main(String[] args) throws IOException {

        String fileName = "src/main/resources/words.txt";

        Path filePath = Paths.get(fileName);
        long fileSize = Files.size(filePath);        

        System.out.format("The size of the file: %d bytes", fileSize);
    }
}

The code example determines the file size using Files' size
method.

## Java file size with FileUtils

In the last example, we determine the file size with Apache Commons' FileUtils.
Its method for finding out the file size is sizeOf.

&lt;dependency&gt;
    &lt;groupId&gt;commons-io&lt;/groupId&gt;
    &lt;artifactId&gt;commons-io&lt;/artifactId&gt;
    &lt;version&gt;2.6&lt;/version&gt;
&lt;/dependency&gt;

For this example, we need the commons-io dependency.

JavaFileSizeEx4.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;

public class JavaFileSizeEx4 {

    public static void main(String[] args) throws IOException {

        String fileName = "src/main/resources/words.txt";
        File f = new File(fileName);

        long fileSize = FileUtils.sizeOf(f);        

        System.out.format("The size of the file: %d bytes", fileSize);
    }
}

The code example determines the file size using Apache Commons' FileUtils' 
sizeOf method.

## Source

[Java Basic I/O - tutorial](https://docs.oracle.com/javase/tutorial/essential/io/)

In this article we have shown how to determine the size of a file in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).