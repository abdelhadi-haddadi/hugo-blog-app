+++
title = "Java InputStream"
date = 2025-08-29T19:59:04.498+01:00
draft = false
description = "Java InputStream tutorial shows how to work with InputStream class in Java. We work with FileInputStream, ObjectOutputStream, and SequenceInputStream subclasses."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java InputStream

last modified February 21, 2024

 

In this article we show how to work with InputStream class in Java.

Java stream is a flow of data from a source or into a destination. A
good metaphor for Java streams is water flowing from a tap into a bathtub and
later into a drainage. InputStream and OutputStream
are abstractions over low-level access to data, such as C file pointers.

InputStream is a source for reading data. A stream can represent
various kinds of sources, including disk files, devices, other programs, and
memory arrays.

Streams support many different types of data, including simple bytes, primitive
data types, localized characters, and objects.

## Subclasses

InputStream is an abstract class; it is a superclass for all classes
representing an input stream of bytes, including AudioInputStream, ByteArrayInputStream,
FileInputStream, FilterInputStream, ObjectInputStream,
PipedInputStream, and SequenceInputStream.

## The close method

The FileInputStream's close method closes the
input stream and releases any system resources associated with this stream.
In our examples we use *try-with-resources* statement, which ensures that
each resource is closed at the end of the statement.

## The read method

InputStream reads bytes with the following read methods :

- read(byte[] b) — reads up to b.length bytes of data from this input stream into an array of bytes.

- read(byte[] b, int off, int len) — reads up to len bytes of data from this input stream into an array of bytes.

- read  — reads one byte from the file input stream.

## Read text

The following example shows how to read a text file with InputStream.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

In the example, we use this text file.

Main.java
  

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

void main() throws IOException {

    String fileName = "thermopylae.txt";

    try (InputStream fis = new FileInputStream(fileName);
            InputStreamReader isr = new InputStreamReader(fis, StandardCharsets.UTF_8);
            BufferedReader br = new BufferedReader(isr)) {

        br.lines().forEach(line -&gt; System.out.println(line));
    }
}

The text file is read with FileInputStream, InputStreamReader, and
BufferedReader.

try (InputStream fis = new FileInputStream(fileName);

FileInputStream is a specialization of the InputStream
for reading bytes from a file.

InputStreamReader isr = new InputStreamReader(fis, StandardCharsets.UTF_8);

InputStreamReader is a bridge from byte streams to character streams:
it reads bytes and decodes them into characters using a specified charset.

BufferedReader br = new BufferedReader(isr)) {

BufferedReader reads text from a character-input stream, buffering characters
for efficient reading of characters, arrays, and lines.

br.lines().forEach(line -&gt; System.out.println(line));

The data is read by lines from a buffered reader.

## Read bytes

The read methods of InputStream read bytes.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

void main() throws IOException {

    String fileName = "ball.png";

    try (InputStream is = new FileInputStream(fileName)) {

        byte[] buffer = new byte[is.available()];
        is.read(buffer);

        int i = 0;

        for (byte b : buffer) {

            if (i % 10 == 0) {
                System.out.println();
            }

            System.out.printf("%02x ", b);

            i++;
        }
    }

    System.out.println();
}

The example reads bytes from a PNG image and prints the bytes in hexadecimal
format to the console.

try (InputStream is = new FileInputStream(fileName)) {

We use FileInputStream to read bytes from an image file.

byte[] buffer = new byte[is.available()];
is.read(buffer);

With the read method, we read the bytes into the array of bytes.

int i = 0;

for (byte b: buffer) {

    if (i % 10 == 0) {
        System.out.println();
    }

    System.out.printf("%02x ", b);

    i++;
}

We go through the array and print the bytes to the console in hexadecimal format.

89 50 4e 47 0d 0a 1a 0a 00 00
00 0d 49 48 44 52 00 00 00 0a
00 00 00 0a 08 06 00 00 00 8d
32 cf bd 00 00 00 04 73 42 49
54 08 08 08 08 7c 08 64 88 00
00 00 09 70 48 59 73 00 00 0d
d7 00 00 0d d7 01 42 28 9b 78
00 00 00 19 74 45 58 74 53 6f
...

This is a partial sample output of the example.

## Read from URL

InputStream allows to read data from a URL source.

Main.java
  

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URI;
import java.net.URISyntaxException;

void main() throws IOException, URISyntaxException {

    String webSite = "https://www.something.com";
    URL url = new URI(webSite).toURL();

    try (InputStream is = url.openStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(is))) {

        br.lines().forEach(System.out::println);
    }
}

The example opens an InputStream to a web page and reads its data.

try (InputStream is = url.openStream();

An InputStream to a URL is created with openStream method.

&lt;html&gt;&lt;head&gt;&lt;title&gt;Something.&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;Something.&lt;/body&gt;
&lt;/html&gt;

## Read deserialized data

ObjectInputStream reads serialized data previously written
using ObjectOutputStream.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

void main() throws IOException {

    String fileName = "myfile.dat";

    try (OutputStream fis = new FileOutputStream(fileName);
            ObjectOutputStream out = new ObjectOutputStream(fis)) {

        List&lt;Country&gt; countries = new ArrayList&lt;&gt;();
        countries.add(new Country("Slovakia", 5429000));
        countries.add(new Country("Norway", 5271000));
        countries.add(new Country("Croatia", 4225000));
        countries.add(new Country("Russia", 143439000));

        out.writeObject(countries);
    }
}

record Country(String name, int population) implements Serializable {}

The example serializes a list of objects.

out.writeObject(countries);

A list of countries is written to the ObjectOutputStream.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.Serializable;
import java.util.List;

void main() throws IOException, ClassNotFoundException {

    String fileName = "myfile.dat";

    try (InputStream fis = new FileInputStream(fileName);
            ObjectInputStream oin = new ObjectInputStream(fis)) {

        List&lt;Country&gt; countries = (List&lt;Country&gt;) oin.readObject();

        countries.forEach(System.out::println);
    }
}

record Country(String name, int population) implements Serializable {}

We use the ObjectInputStream to read serialized data.

## Read sequence of streams

SequenceInputStream represents a sequence of input streams.
It allows to read from multiple of ordered streams.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.SequenceInputStream;

void main() throws IOException {

    String fileName1 = "myfile.txt";
    String fileName2 = "myfile1.txt";
    String fileName3 = "myfile2.txt";

    try (InputStream is1 = new FileInputStream(fileName1);
            InputStream is2 = new FileInputStream(fileName2);
            InputStream is3 = new FileInputStream(fileName3);
            SequenceInputStream sis1 = new SequenceInputStream(is1, is2);
            SequenceInputStream sis = new SequenceInputStream(sis1, is3)) {

        int b = sis.read();

        while (b != -1) {

            System.out.printf("%c", b);
            b = sis.read();
        }

        System.out.println();
    }
}

The example reads from three FileInputStreams.

try (InputStream is1 = new FileInputStream(fileName1);
        InputStream is2 = new FileInputStream(fileName2);
        InputStream is3 = new FileInputStream(fileName3);
        SequenceInputStream sis1 = new SequenceInputStream(is1, is2);
        SequenceInputStream sis = new SequenceInputStream(sis1, is3)) {

We define three input streams and these streams are placed into SequenceInputStreams.

int b = sis.read();

while (b != -1) {

    System.out.printf("%c", b);
    b = sis.read();
}

We read the data from the streams with read.

## Source

[Java InputStream - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/InputStream.html)

In this article we have presented the Java InputStream class.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).