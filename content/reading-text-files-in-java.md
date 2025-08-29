+++
title = "Reading text files in Java"
date = 2025-08-29T20:00:08.609+01:00
draft = false
description = "Java read text files tutorial shows how to read text files in Java. We use build-in tools including FileReader, InputStreamReader, and Scanner."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Reading text files in Java

last modified July 10, 2024

 

In Reading text files in Java tutorial we show how to read text files in Java.
We use build-in tools including FileReader,
InputStreamReader, and Scanner. 

The following examples use this text file.

src/main/resources/thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states, 
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the 
course of three days, during the second Persian invasion of Greece. 

The file is located in the src/main/resources/ directory.

## Java read text classes

We can use the following Java classes to read text files in Java.

- java.io.FileReader

- java.nio.file.Files

- java.util.Scanner

- java.io.InputStreamReader

- com.google.common.io.Files

## Read text file with FileReader

FileReader is a class used for reading character files. 
It reads text from character files using a default buffer size.
Decoding from bytes to characters uses either a specified charset or the
platform's default charset.

**Note:** In the past, FileReader relied on the
default platform's encoding. Since Java 11, the issue was corrected. It is
possible now to explicitly specify the encoding.

Main.java
  

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

void main() throws IOException {

    var fileName = "src/main/resources/thermopylae.txt";

    try (BufferedReader br = new BufferedReader(
            new FileReader(fileName, StandardCharsets.UTF_8))) {

        var sb = new StringBuilder();

        String line;
        while ((line = br.readLine()) != null) {

            sb.append(line);
            sb.append(System.lineSeparator());
        }

        System.out.println(sb);
    }
}

The code example reads text from the thermopylae.txt file.

var fileName = "src/main/resources/thermopylae.txt";

In the fileName variable, we store the path to the file.

try (BufferedReader br = new BufferedReader(
    new FileReader(fileName, StandardCharsets.UTF_8))) {

The FileReader takes the file name as the first parameter. The
second parameter is the charset used. The FileReader is passed to
the BufferedReader, which buffers read operations for better
performance. This is a try-with-resources statement which ensures that the
resource (the buffered reader) is closed at the end of the statement.

var sb = new StringBuilder();

String line;
while ((line = br.readLine()) != null) {

    sb.append(line);
    sb.append(System.lineSeparator());
}

System.out.println(sb);

Printing lines to the console consumes additional resources. Therefore, we use
the StringBuilder to build the output string and print it in one
operation. This is an optional optimization. The
System.lineSeparator returns the system-dependent line separator
string.

## Read text file with Files.readAllLines

The Files.readAllLines method reads all lines from a file. This
method ensures that the file is closed when all bytes have been read or an
exception is thrown. The bytes from the file are decoded into characters using
the specified charset.

Note that this method reads the whole file into the memory; therefore, it may
not be suitable for very large files.

Main.java
  

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

void main() throws IOException {

    var fileName = "src/main/resources/thermopylae.txt";

    List&lt;String&gt; lines = Files.readAllLines(Paths.get(fileName),
            StandardCharsets.UTF_8);

    for (String line : lines) {

        System.out.println(line);
    }
}

The contents of the thermopylae.txt file are read and
printed to the console using the Files.readAllLines method.

## Reading text file with streaming API

Another option to read text files is to use the Java streaming API. The
Files.lines reads all lines from a file as a stream. The bytes from
the file are decoded into characters using the
StandardCharsets.UTF-8 charset.

Main.java
  

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

void main() throws IOException {

    var fileName = "src/main/resources/thermopylae.txt";

    var path = Paths.get(fileName);

    try (Stream&lt;String&gt; lines = Files.lines(path)) {
        lines.forEachOrdered(System.out::println);
    }
}

The contents of the thermopylae.txt file are read and
printed to the console using the Files.lines method.

## Read text file with Scanner

A Scanner is simple text scanner which can parse primitive 
types and strings using regular expressions.

Main.java
  

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

void main() throws FileNotFoundException {

    var fileName = "src/main/resources/thermopylae.txt";

    try (var scanner = new Scanner(new File(fileName))) {

        while (scanner.hasNext()) {

            String line = scanner.nextLine();
            System.out.println(line);
        }
    }
}

The example reads a text file using a Scanner.

while (scanner.hasNext()) {

    String line = scanner.nextLine();
    System.out.println(line);
}

The file is read line by line with the nextLine 
method.

## Read text file with InputStreamReader

InputStreamReader is a bridge from byte streams to character streams. 
It reads bytes and decodes them into characters using a specified charset.

Main.java
  

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

void main() throws IOException {

    var fileName = "src/main/resources/thermopylae.txt";

    try (var br = new BufferedReader(new InputStreamReader(
            new FileInputStream(fileName), StandardCharsets.UTF_8))) {

        String line;

        while ((line = br.readLine()) != null) {

            System.out.println(line);
        }
    }
}

The example reads a text file using an InputStreamReader.

try (var br = new BufferedReader(new InputStreamReader(
        new FileInputStream(fileName), StandardCharsets.UTF_8))) {

The InputStreamReader is created from a
FileInputStream, which creates an input stream by opening a
connection to an actual file. The InputStreamReader
is then passed to a BufferedReader for better efficiency.

Java 7 introduced a more convenient API to work with an InputStreamReader.
A new buffered InputStreamReader can be created with 
Files.newBufferedReader.

Main.java
  

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

void main() throws IOException {

    var fileName = "src/main/resources/thermopylae.txt";
    var filePath = Paths.get(fileName);

    try (BufferedReader br = Files.newBufferedReader(
        filePath, StandardCharsets.UTF_8)) {

        String line;

        while ((line = br.readLine()) != null) {

            System.out.println(line);
        }
    }
}

The example reads the thermopylae.txt file with the 
Files.newBufferedReader method.

## Read text file with Files.readAllBytes

The Files.readAllBytes method reads all the bytes from a file. It
ensures that the file is closed when all bytes have been read.

Main.java
  

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

void main() throws IOException {

    var fileName = "src/main/resources/thermopylae.txt";
    var filePath = Paths.get(fileName);

    byte[] data = Files.readAllBytes(filePath);
    var content = new String(data);

    System.out.println(content);
}

The example reads all bytes from a file and passes them to the 
String constructor.

## Read text with Files.readString

Java 11 introduces a convenient method that allows to read the whole file into a
string in one shot.

The Files.readString reads all content from a file into a string,
decoding from bytes to characters using the specified or the default
(StandardCharsets.UTF_8) charset. It ensures that the file is closed when all
content have been read.

Main.java
  

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

void main() throws IOException {

    var fileName = "src/main/resources/thermopylae.txt";
    var filePath = Paths.get(fileName);

    var content = Files.readString(filePath);

    System.out.println(content);
}

The example reads the contents of the thermopylae.txt file into a
string a prints it to the terminal.

## Read text file with FileChannel

FileChannel is a channel for reading, writing, mapping, and
manipulating a file. The advantages of file channels include reading and writing
at a specific position of a file, loading a section of a file, or locking a
section of a file. 

Main.java
  

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

void main() throws IOException {

    var fileName = "src/main/resources/thermopylae.txt";

    try (RandomAccessFile myFile = new RandomAccessFile(fileName, "rw");
            FileChannel inChannel = myFile.getChannel()) {

        ByteBuffer buf = ByteBuffer.allocate(48);

        int bytesRead = inChannel.read(buf);

        while (bytesRead != -1) {

            buf.flip();

            while (buf.hasRemaining()) {

                System.out.print((char) buf.get());
            }

            buf.clear();
            bytesRead = inChannel.read(buf);
        }
    }
}

The example reads the text file with FileChannel.

try (RandomAccessFile myFile = new RandomAccessFile(fileName, "rw");
        FileChannel inChannel = myFile.getChannel()) {

A FileChannle is created from a RandomAccessFile.

ByteBuffer buf = ByteBuffer.allocate(48);

int bytesRead = inChannel.read(buf);

We allocate a buffer and read initial data.

while (bytesRead != -1) {

    buf.flip();

    while (buf.hasRemaining()) {

        System.out.print((char) buf.get());
    }

    buf.clear();
    bytesRead = inChannel.read(buf);
}

We read the data into the buffer and write it to the terminal.
We use flip to change buffer from reading to writing.

## Source

[Java Basic I/O](https://docs.oracle.com/javase/tutorial/essential/io/)

In this article we have read text files in various ways in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).