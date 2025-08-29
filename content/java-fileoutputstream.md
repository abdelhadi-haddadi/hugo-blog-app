+++
title = "Java FileOutputStream"
date = 2025-08-29T19:58:38.658+01:00
draft = false
description = "Java FileOutputStream tutorial shows how to use FileOutputStream class to write to files in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FileOutputStream

last modified January 27, 2024

 

Java FileOutputStream tutorial shows how to use FileOutputStream class 
to write to files in Java.

## Java FileOutputStream

FileOutputStream is an output stream for writing data to a File or 
to a FileDescriptor. FileOutputStream is a subclass of OutputStream,
which accepts output bytes and sends them to some sink. In case of FileOutputStream, the sink
is a file object.

## Java FileOutputStream constructors

These are FileOutputStream constructors:

- FileOutputStream(File file) — creates a file output stream to write to a File object.

- FileOutputStream(File file, boolean append) — creates a file output stream to write to a File object; allows appending mode.

- FileOutputStream(FileDescriptor fdObj)  — creates a file output stream to write to the specified file descriptor.

- FileOutputStream(String name) — creates a file output stream to write to the file with the specified name.

- FileOutputStream(String name, boolean append) — creates a file output stream to write to the file with the specified name; allows appending mode.

## Java FileOutputStream close

The FileOutputStream's close method closes 
file output stream and releases any system resources associated with this stream.
In our examples we use *try-with-resources* statement, which ensures that 
each resource is closed at the end of the statement.

## Java FileOutputStream write

FileOutputStream writes bytes with the following write methods :

- write(byte[] b) — writes array of bytes to the file output stream.

- write(byte[] b, int off, int len) — writes len bytes from the specified byte array starting at offset off to the file output stream.

- write(int b)  — writes one byte to the file output stream.

## Java FileOutputStream example

The following example uses FileOutputStream to write
text to a file.

FileOutputStreamEx.java
  

package com.zetcode;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileOutputStreamEx {

    public static void main(String[] args) throws FileNotFoundException, IOException {
        
        String fileName = "/home/janbodnar/tmp/newfile.txt";
        
        try (FileOutputStream fos = new FileOutputStream(fileName)) {
            
            String text = "Today is a beautiful day";
            byte[] mybytes = text.getBytes();
            
            fos.write(mybytes);
        }
    }
}

The code example writes one line to a file.

try (FileOutputStream fos = new FileOutputStream(fileName)) {

The FileOutputStream constructor takes a string as a parameter;
it is the file name to which we write. We use try-with-resources construct
to clean resources after we have finished writing.

String text = "Today is a beautiful day";
byte[] mybytes = text.getBytes();

FileOutputStream write bytes to the file; we get bytes from 
a string with the getBytes method.

fos.write(mybytes);

The bytes are written to the file.

$ cat newfile.txt 
Today is a beautiful day

We show the contents of the file with the cat command.

## Java FileOutputStream append to file

With FileOutputStream it is possible to append data to a file.
The typical usage for appending is logging.

FileOutputStreamAppend.java
  

package com.zetcode;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileOutputStreamAppend {

    public static void main(String[] args) throws FileNotFoundException, IOException {        
        
        String fileName = "/home/janbodnar/tmp/newfile.txt";
        
        try (FileOutputStream fos = new FileOutputStream(fileName, true)) {
            
            String text = "Today is a beautiful day";
            byte[] mybytes = text.getBytes();
            
            fos.write(mybytes);
        }
    }
}

The code example appends text to file.

try (FileOutputStream fos = new FileOutputStream(fileName, true)) {

The second parameter of FileOutputStream indicates that we 
will append to the file.

## Java FileOutputStream specifying encoding

FileWriter class, which is a Java convenience class for writing character files,
has a serious limitation: it uses the default encoding and does not allow us to explicitly
specify the encoding. If we have to set the encoding, we can use 
OutputStreamWriter and FileOutputStream.

FileOutputStreamEncoding.java
  

package com.zetcode;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;

public class FileOutputStreamEncoding {

    public static void main(String[] args) throws FileNotFoundException, IOException {

        String fileName = "/home/janbodnar/tmp/newfile.txt";

        FileOutputStream fos = new FileOutputStream(fileName);
        
        try (OutputStreamWriter osw =  new OutputStreamWriter(fos, 
                StandardCharsets.UTF_8)) {

            String text = "Сегодня был прекрасный день.";

            osw.write(text);
        }
    }
}

The example writes text to a file with OutputStreamWriter. The second parameter
is the charset to be used.

$ cat newwfile.txt 
Сегодня был прекрасный день.

We show the contents of the file.

## Source

[Java FileOutputStream - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/FileOutputStream.html)

In this article we have presented the Java FileOutputStream class.  

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).