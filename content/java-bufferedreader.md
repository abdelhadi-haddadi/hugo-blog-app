+++
title = "Java BufferedReader"
date = 2025-08-29T19:58:07.811+01:00
draft = false
description = "Java BufferedReader tutorial shows how to use Java BufferedReader to improve reading performance of text files."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BufferedReader

last modified January 27, 2024

 

Java BufferedReader tutorial shows how to use Java BufferedReader to improve
reading performance of text files. 
[Java tutorial](http://zetcode.com/lang/java/) is a comprehensive tutorial on Java language.

Buffered input streams read data from a memory area known as a *buffer*. 
The native input API is called only when the buffer is empty. 

For unbuffered I/O stream, each read request is handled directly by the
underlying OS. This is much less efficient, since each such request often
triggers disk access, network activity, or some other operation
that is relatively expensive.

## Java BufferedReader

BufferedReader reads text from a character-input stream, buffering
characters so as to provide for the efficient reading of characters, arrays, and
lines.

The buffer size may be specified, or the default size may be used. The default
is large enough for most purposes. 

Some of the following examples use this text file:

src/resources/thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states, 
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the 
course of three days, during the second Persian invasion of Greece. 

## Java BufferedReader example

In the following example, we use BufferedReader to read a 
text file. It is used with the FileReader class.

**Note:** In the past, FileReader relied on the
default platform's encoding. Since Java 11, the issue was corrected. It is
possible now to explicitly specify the encoding.

com/zetcode/BufferedReaderEx.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class BufferedReaderEx {

    public static void main(String[] args) throws IOException {

        var fileName = "src/resources/thermopylae.txt";

        try (var br = new BufferedReader(new FileReader(fileName, StandardCharsets.UTF_8))) {

            String line;
            while ((line = br.readLine()) != null) {

                System.out.println(line);
            }
        }
    }
}

In the example, we use the BufferedReader with the FileReader.

var fileName = "src/resources/thermopylae.txt";

We specify the file name.

try (var br = new BufferedReader(new FileReader(fileName, StandardCharsets.UTF_8))) {

We wrap the FileReader to the BufferedReader to improve its 
performance.

String line;
while ((line = br.readLine()) != null) {

    System.out.println(line);
}

The readLine reads a line of text. It returns the string
containing the contents of the line, not including any line-termination
characters, or null if the end of the stream has been reached
without reading any characters.

## Java Files.newBufferedReader

The Files.newBufferedReader is a convenience method which opens a
file for reading, returning a BufferedReader that may be used to
read text from the file in an efficient manner. Bytes from the file are decoded
into characters using the specified charset.

com/zetcode/BufferedReaderEx2.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class BufferedReaderEx2 {

    public static void main(String[] args) throws IOException {

        var fileName = "src/resources/thermopylae.txt";
        var path = Paths.get(fileName);

        try (var br = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {

            String line;
            while ((line = br.readLine()) != null) {

                System.out.println(line);
            }
        }
    }
}

The example reads the thermopylae.txt file, utilizing the 
Files.newBufferedReader method.

## Java BufferedReader with InputStreamReader

The following example uses BufferedReader with InputStreamReader.
InputStreamReader is a bridge from byte streams to character
streams. It reads bytes and decodes them into characters using a specified
charset.

com/zetcode/BufferedReaderEx3.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class BufferedReaderEx3 {

    public static void main(String[] args) throws IOException {

        var urlPath = "http://webcode.me";
        var url = new URL(urlPath);

        try (var br = new BufferedReader(new InputStreamReader(url.openStream(),
                StandardCharsets.UTF_8))) {

            String line;
            while ((line = br.readLine()) != null) {

                System.out.println(line);
            }
        }
    }
}

The example reads the home page of the webcode.me site.

## Source

[Java BufferedReader - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/BufferedReader.html)

In this article we have worked with Java BufferedReader.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).