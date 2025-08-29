+++
title = "Java append to file"
date = 2025-08-29T19:58:04.376+01:00
draft = false
description = "Java append to file tutorial shows how to append to a file in Java. We use FileWriter, FileOutputStream, Files, RandomAccessFile, Google Guava, and Apache Commons IO."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java append to file

last modified July 4, 2024

 

In this article we show how to append to a file in Java. We use
FileWriter, FileOutputStream, Files, 
RandomAccessFile, and Google Guava.

Appending to a file is often used in logging.

In the examples, we append text to the files.

towns.txt
  

Bratislava
Moldava
Košice
Trenčín
Prešov

We use this text file. It is located in src/main/resources directory.

## Append to file with FileWriter

FileWriter class is used for writing streams of characters.
FileWriter takes an optional second parameter: append.
If set to true, then the data will be written to the end of the file.

Main.java
  

import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

void main() throws IOException {

    String fileName = "src/main/resources/towns.txt";

    try (var fw = new FileWriter(fileName, StandardCharsets.UTF_8, true)) {

        fw.append("Žilina\n");
    }
}

This example appends data to a file with FileWriter.

try (var fw = new FileWriter(fileName, StandardCharsets.UTF_8, true)) {

    fw.append("Žilina\n");
}

We define the FileWriter and use its append method.

## Append to file with FileOutputStream

FileOutputStream is an output stream for writing data to a
File or to a FileDescriptor. It takes an optional
second parameter, which determines whether the data is appended to the file.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;

void main() throws IOException {

    String fileName = "src/main/resources/towns.txt";

    byte[] tb = "Žilina\n".getBytes();

    try (var fos = new FileOutputStream(fileName, true)) {
        fos.write(tb);
    }
}

This example appends data to a file with FileOutputStream.

try (var fos = new FileOutputStream(fileName, true)) {
    fos.write(tb);
}

We create an instance of the FileOutputStream with append
parameter set to true and use its write method.

## Append to file with Files

The java.nio.file.Files class is a convenient class to easily
append data to a file.

Main.java
  

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

void main() throws IOException {

    String fileName = "src/main/resources/towns.txt";

    String town = "Žilina\n";
    Files.writeString(Paths.get(fileName), town, StandardCharsets.UTF_8,
        StandardOpenOption.APPEND);
}

This example appends data with Files.

Files.writeString(Paths.get(fileName), town, StandardCharsets.UTF_8,
    StandardOpenOption.APPEND);

The fourth parameter of Files.writeString tells how the file was
opened for writing. With the StandardOpenOption.APPEND, the file
was opened for appending.

## Append to file with RandomAccessFile

RandomAccessFile is used for reading and writing
to a random access file.

Main.java
  

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.charset.StandardCharsets;

void main() throws IOException {

    String fileName = "src/main/resources/towns.txt";

    var file = new File(fileName);
    var town = "Žilina\n";

    try (var raf = new RandomAccessFile(file, "rw")) {
        
        raf.seek(raf.length());
        raf.write(town.getBytes(StandardCharsets.UTF_8));
    }
}

In this example we append data with RandomAccessFile.

raf.seek(raf.length());
raf.write(town.getBytes(StandardCharsets.UTF_8));

We determine the length of the file, locate to the end of the file, and write
the bytes.

## Append to file with Guava

We can use Guava library for appending to a file.

implementation 'com.google.guava:guava:33.2.1-jre'

We need a Guava dependency.

Main.java
  

import com.google.common.base.Charsets;
import com.google.common.io.CharSink;
import com.google.common.io.FileWriteMode;
import com.google.common.io.Files;
import java.io.File;
import java.io.IOException;

void main() throws IOException {

    String fileName = "src/main/resources/towns.txt";

    File file = new File(fileName);

    CharSink chs = Files.asCharSink(file, Charsets.UTF_8, FileWriteMode.APPEND);
    chs.write("Žilina\n");
}

In the example, we append to a file with with Guava's CharSink class.

CharSink chs = Files.asCharSink(file, Charsets.UTF_8, FileWriteMode.APPEND);

The third parameter of Files.asCharSink specifies the file writing
mode; with FileWriteMode.APPEND option the file is opened for writing.

## Source

[Java basic I/O - tutorial](https://docs.oracle.com/javase/tutorial/essential/io/index.html)

In this article we have shown how to append to a file in Java with built-in
tools and Guava library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).