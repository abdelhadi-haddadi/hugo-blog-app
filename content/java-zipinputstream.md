+++
title = "Java ZipInputStream"
date = 2025-08-29T20:00:56.710+01:00
draft = false
description = "Java ZipInputStream tutorial shows how to read ZIP files in Java with ZipInputStream. ZIP is an archive file format that supports lossless data compression."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ZipInputStream

last modified July 15, 2022

 

Java ZipInputStream tutorial shows how to read ZIP files in Java with
ZipInputStream.

## Java ZipInputStream

ZipInputStream is a Java class that implements an input stream
filter for reading files in the ZIP file format. It has support for both
compressed and uncompressed entries.

## ZIP

ZIP is an archive file format that supports lossless data compression.
A ZIP file may contain one or more files or directories that may have been
compressed. Java Archive (JAR) is built on the ZIP format.

## ZipInputStream constructors

ZipInputStream has the following constructors:

ZipInputStream(InputStream in)
ZipInputStream(InputStream in, Charset charset)

## ZipInputStream getNextEntry

The ZipInputStream's getNextEntry reads the next
ZIP file entry and positions the stream at the beginning of the entry data.

## Java read ZIP example

The following example reads the contents of a ZIP file.

com/zetcode/JavaReadZip.java
  

package com.zetcode;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class JavaReadZip {

    private final static Long MILLS_IN_DAY = 86400000L;

    public static void main(String[] args) throws IOException {

        String fileName = "src/resources/myfile.zip";

        try (FileInputStream fis = new FileInputStream(fileName);
                BufferedInputStream bis = new BufferedInputStream(fis);
                ZipInputStream zis = new ZipInputStream(bis)) {

            ZipEntry ze;

            while ((ze = zis.getNextEntry()) != null) {

                System.out.format("File: %s Size: %d last modified: %d",
                        ze.getName(), ze.getSize(),
                        LocalDate.ofEpochDay(ze.getTime() / MILLS_IN_DAY));
            }
        }
    }
}

The example reads the given ZIP file with ZipInputStream and prints
its contents to the terminal. We print the file names, their size, and the last
modification time.

String fileName = "src/resources/myfile.zip";

The ZIP file is located int src/resources/ directory.

try (FileInputStream fis = new FileInputStream(fileName);

We create a FileInputStream from the file.
FileInputStream is used for reading streams of raw bytes.

BufferedInputStream bis = new BufferedInputStream(fis);

For better performance, we pass the FileInputStream into the
BufferedInputStream.

ZipInputStream zis = new ZipInputStream(bis)) {

A ZipInputStream is created from the buffered
FileInputStream. The try-with-resources closes the streams when
they are not needed anymore.

while ((ze = zis.getNextEntry()) != null) {

In a while loop, we go through the entries of the ZIP file with getNextEntry
method. It returns null if there are no more entries.

System.out.format("File: %s Size: %d last modified: %d",
    ze.getName(), ze.getSize(),
    LocalDate.ofEpochDay(ze.getTime() / MILLS_IN_DAY));

The getName returns the name of the entry, the getSize
returns the uncompressed size of the entry, and the getTime returns
the last modification time of the entry.

## Java decompress ZIP example

In the next example, we decompress a ZIP file in Java.

com/zetcode/JavaUnzip.java
  

package com.zetcode;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class JavaUnzip {

    public static void main(String args[]) throws Exception {

        byte[] buffer = new byte[2048];

        Path outDir = Paths.get("src/resources/output/");
        String zipFileName = "src/resources/myfile.zip";

        try (FileInputStream fis = new FileInputStream(zipFileName);
                BufferedInputStream bis = new BufferedInputStream(fis);
                ZipInputStream stream = new ZipInputStream(bis)) {

            ZipEntry entry;
            while ((entry = stream.getNextEntry()) != null) {

                Path filePath = outDir.resolve(entry.getName());

                try (FileOutputStream fos = new FileOutputStream(filePath.toFile());
                        BufferedOutputStream bos = new BufferedOutputStream(fos, buffer.length)) {

                    int len;
                    while ((len = stream.read(buffer)) &gt; 0) {
                        bos.write(buffer, 0, len);
                    }
                }
            }
        }
    }
}

The example uses ZipInputStream to read the contents of the given
ZIP file and FileOutputStream and BufferedOutputStream
to write the contents into a directory.

Path outDir = Paths.get("src/resources/output/");

This is the directory where we extract the contents of the ZIP file.

while ((entry = stream.getNextEntry()) != null) {

In the first while loop, we go through the entries of the ZIP file.

while ((len  = stream.read(buffer)) &gt; 0) {
    bos.write(buffer, 0, len);
}

In the second while loop, we read the entries and write them to the output
stream.

## Source

[Java ZipInputStream - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/zip/ZipInputStream.html)

In this article we have presented the Java ZipInputStream class.
We have created two examples to read a ZIP file and to decompress a ZIP file.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).