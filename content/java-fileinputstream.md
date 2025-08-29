+++
title = "Java FileInputStream"
date = 2025-08-29T19:58:38.608+01:00
draft = false
description = "Java FileInputStream tutorial shows how to use FileInputStream class to read files in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FileInputStream

last modified March 5, 2024

 

In this article we show how to use FileInputStream class to read
files in Java.

FileInputStream reads input bytes from a file in a file system. 

## The constructors

These are FileInputStream constructors:

- FileInputStream(File file) — creates a file input stream to read from a File object.

- FileInputStream(String name) — creates a file input stream to read from the specified file name.

- FileInputStream(FileDescriptor fdObj)  — creates a file input read from the specified file descriptor.

## The close method

The FileInputStream's close method closes the file
input stream and releases any system resources associated with this stream. In
our examples we use *try-with-resources* statement, which ensures that
each resource is closed at the end of the statement.

## The read methods

FileInputStream reads bytes with the following read methods :

- read(byte[] b) — reads up to b.length bytes of data from this input stream into an array of bytes.

- read(byte[] b, int off, int len) — reads up to len bytes of data from this input stream into an array of bytes.

- read  — reads one byte from the file input stream.

## Reading characters

The following example uses FileInputStream to read three
characters from a file.

smallfile.txt
  

sky blue notice word

In the small text file we have four English words.

Main.java
  

import java.io.FileInputStream;

void main() throws Exception {

    String fname = "smallfile.txt";

    try (var fis = new FileInputStream(fname)) {

        char c1 = (char) fis.read();
        char c2 = (char) fis.read();
        char c3 = (char) fis.read();

        System.out.println(c1);
        System.out.println(c2);
        System.out.println(c3);
    }
}

The code example reads three characters with read.

char c1 = (char) fis.read();

We read a character with read and cast the value into
a char.

System.out.println(c1);

The character is printed to the console.

## Reading file by characters

The read method returns -1 if the end of the file is reached. With
a while loop we can read a whole file character by character. Note that this way
is not very efficient.

smallfile.txt
  

sky blue notice word

We have four English words in the text file.

Main.java
  

import java.io.FileInputStream;

void main() throws Exception {
    
    String fname = "smallfile.txt";

    try (var fis = new FileInputStream(fname)) {

        int i; 
        
        while ((i = fis.read()) != -1) {
            System.out.print((char) i);
        }
    }        
    
    System.out.println();
}

The example reads the contents of a file and writes it to the terminal.

while ((i = fis.read()) != -1) {
    System.out.print((char) i);
}

In a while loop we read a character from a FileInputStream
until the read method returns -1.

If the file is a text file and contains non-latin characters, we wrap the 
FileInputStream into an InputStreamReader. 
The InputStreamReader accepts the character encoding as the second 
parameter.

smallfile2.txt
  

sky blue notice буква čerešňa

We have three English words, one Russian, and one Slovak.

Main.java
  

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

void main() throws Exception {

    String fname = "smallfile2.txt";

    try (var fis = new InputStreamReader(new FileInputStream(fname),
            StandardCharsets.UTF_8)) {

        int i;

        while ((i = fis.read()) != -1) {
            System.out.print((char) i);
        }
    }

    System.out.println();
}

The example reads from a small file character by character. The file also
contains non-latin characters.

$ java Main.java
sky blue notice буква čerešňa

## Reading file by text chunks

It is more efficient to read a file by data chunks; for instance
1024 bytes in each method call.

Main.java
  

import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;

void main() throws Exception {

    String fname = "bigfile.txt";

    try (var fis = new FileInputStream(fname)) {

        int i = 0;

        do {

            byte[] buf = new byte[1024];
            i = fis.read(buf);
            
            String value = new String(buf, StandardCharsets.UTF_8);
            System.out.print(value);

        } while (i != -1);
    }
}

In this example we read a file by data chunks

byte[] buf = new byte[1024];

We read data from a file into this array of bytes.

i = fis.read(buf);

The read method reads up to b.length bytes 
of data from this the stream into the provided array of bytes.

String value = new String(buf, StandardCharsets.UTF_8);

From the array of bytes, we create a String. We specify the 
charset used.

## Using BufferedReader

Reading is more efficient with BufferedReader.
BufferedReader reads text from a character-input stream, 
buffering characters so as to provide for the efficient reading of characters.

Main.java
  

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

void main() throws Exception {

    String fname = "bigfile.txt";

    try (var br = new BufferedReader(new InputStreamReader(
            new FileInputStream(fname), StandardCharsets.UTF_8));) {

        String line;
        
        while ((line = br.readLine()) != null) {
            
            System.out.println(line);
        }
    }

    System.out.println();
}

The example reads a big file using buffering technique for greater efficiency.

while ((line = br.readLine()) != null) {

The readLine method reads a line of text from a buffer.

## Source

[Java FileInputStream - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/FileInputStream.html)

In this article we have presented the Java FileInputStream class.  

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).