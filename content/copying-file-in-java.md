+++
title = "Copying file in Java"
date = 2025-08-29T19:58:30.434+01:00
draft = false
description = "In Java copy file tutorial, we show how to copy a file in Java. We copy files with built-in classes including File, FileInputStream, FileOutputStream, FileChannel, and Files."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Copying file in Java

last modified March 6, 2024

 

In this article we show how to copy a file in Java. We copy files with built-in
classes including File, FileInputStream,
FileOutputStream, FileChannel, and Files.

File copying is the creation of a new file which has the same content
as an existing file. File moving is transferring a file from one
location to another.

The file to be copied is called the source file and the new copy is called the
destination file.

## The Bugs file

In the example, we use a bugs.txt file.

bugs.txt
  

Assasin bug, Avondale spider, Backswimmer,
Bamboo moth, Banana moth, Bed bug,
Black cocroach, Blue moon, Bumble Bee,
Carpenter Bee, Cattle tick, Cave Weta,
Cicada, Cinnibar, Click beetle, Clothes moth,
Codling moth, Centipede, Earwig, Eucalypt longhorn beetle,
Field Grasshopper, Garden slug, Garden soldier,
German cockroach, German wasp, Giant dragonfly,
Giraffe weevil, Grass grub, Grass looper,
Green planthopper, Green house spider, Gum emperor,
Gum leaf skeletoniser, Hornet, Mealybug,
Mites, Mole Cricket, Monarch butterfly,
Mosquito, Silverfish, Wasp,
Water boatman, Winged weta, Wolf spider,
Yellow Jacket, Yellow Admiral

This is a simple file containing names of bugs.

## Copy file with FileInputStream &amp; FileOutputStream

With FileInputStream and FileOutputStream we
create streams for reading and writing to a File. When
the file is not found, FileNotFoundException is thrown.
File is a representation of a file or directory in Java.

Main.java
  

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

void main() throws IOException {

    var source = new File("bugs.txt");
    var dest = new File("bugs2.txt");

    try (var fis = new FileInputStream(source);
            var fos = new FileOutputStream(dest)) {

        byte[] buffer = new byte[1024];
        int length;

        while ((length = fis.read(buffer)) &gt; 0) {

            fos.write(buffer, 0, length);
        }
    }
}

The example copies a file using FileInputStream,
FileOutputStream, and File.

try (var fis = new FileInputStream(source);
     var fos = new FileOutputStream(dest)) {

We create instances of FileInputStream and
FileOutputStream. The try-with-resources statement will
automatically close the streams.

byte[] buffer = new byte[1024];

We will be copying chunks of 1024 bytes of text. This is done for better
performance.

while ((length = is.read(buffer)) &gt; 0) {

The FileInputStream's read method reads the specified
number of bytes from the input stream and stores them into the buffer array. It
returns the total number of bytes read into the buffer, or -1 if there is no
more data because the end of the stream has been reached.

os.write(buffer, 0, length);

The FileOutputStream's write method writes the bytes
stored in the buffer to the output stream. The first parameter is the data, the
second is the start offset in the data, and the last is the number of bytes to
write.

## Copy file with Paths &amp; Files

The next example is similar to the previous one; it uses more modern API.

Main.java
  

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

void main() throws IOException {

    var source = new File("bugs.txt");
    var dest = new File("bugs2.txt");

    try (var fis = new FileInputStream(source);
            var fos = new FileOutputStream(dest)) {

        byte[] buffer = new byte[1024];
        int length;

        while ((length = fis.read(buffer)) &gt; 0) {

            fos.write(buffer, 0, length);
        }
    }
}

We copy the file using Paths and Files classes.

var source = Paths.get("bugs.txt");
var dest = Paths.get("bugs2.txt");

From the files we create Path objects.

try (var fis = Files.newInputStream(source);
     var fos = Files.newOutputStream(dest)) {

The streams are created with the help of the Files class.

## Copy file with FileChannel

FileChannel is a channel for reading, writing, mapping, and
manipulating a file. FileChannel is an alternative way to the
classic Java IO stream API. It is located in the java.nio package.

RandomAccessFile supports both reading and writing to a random
access file. A random acces means that we can read or write information anywhere
in the file. 

Main.java
  

import java.io.IOException;
import java.io.RandomAccessFile;

void main() throws IOException {

    try (var source = new RandomAccessFile("bugs.txt", "r");
            var dest = new RandomAccessFile("bugs2.txt", "rw")) {

        try (var sfc = source.getChannel();
                var dfc = dest.getChannel()) {

            dfc.transferFrom(sfc, 0, sfc.size());
        }
    }
}

The example copies a text file with FileChannel.

try (var source = new RandomAccessFile("bugs.txt", "r");
        var dest = new RandomAccessFile("bugs2.txt", "rw")) {

A random access source file in a read mode is created and a random access file
in a read/write mode is created.

try (var sfc = source.getChannel();
    var dfc = dest.getChannel()) {

We get channels from the files with getChannel.

dfc.transferFrom(sfc, 0, sfc.size());

The transferFrom method transfers bytes from the source channel
into the destination channel. The first parameter is the source channel, the
second is the starting position of the transfer in the file, and the third is
the maximum number of bytes to be transferred.

## The Files.copy method

The Files.copy method which provides an easy way of copying a file.
The copy fails if the target file exists, unless the
REPLACE_EXISTING option is specified. Files.copy
takes an optional third copy options argument.

The options parameter may include any of the following:

REPLACE_EXISTING - if the target file exists, then the target file is replaced
if it is not a non-empty directory. 
- COPY_ATTRIBUTES - attempts to copy the file attributes associated with this file to the target file.

- ATOMIC_MOVE - moves the file.

- NOFOLLOW_LINKS - symbolic links are not followed.

The first three options are available in StandarCopyOption; the
last one in LinkOption.

Main.java
  

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

void main() throws IOException {

    var source = new File("bugs.txt");
    var dest = new File("bugs2.txt");

    Files.copy(source.toPath(), dest.toPath(),
            StandardCopyOption.REPLACE_EXISTING);
}

The example copies a file with Files.copy. It replaces the
destination if it already exists.

## Source

[Java Copying a File or Directory - tutorial](https://docs.oracle.com/javase/tutorial/essential/io/copy.html)

In this article we have shown several ways how to copy a file in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).