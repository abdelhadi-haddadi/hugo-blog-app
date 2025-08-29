+++
title = "Java FileReader Class"
date = 2025-08-29T19:59:16.381+01:00
draft = false
description = "Complete Java FileReader class tutorial covering all methods with examples. Learn about character file reading operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FileReader Class

Last modified: April 16, 2025

 

The java.io.FileReader class is a convenience class for reading
character files. It extends InputStreamReader and uses the default
character encoding. FileReader is meant for reading streams of characters.

FileReader simplifies reading text files by handling character
conversion automatically. It's not suitable for reading raw bytes - use
FileInputStream for that. The class uses the platform's default
character encoding unless specified otherwise.

## FileReader Class Overview

FileReader provides several constructors for creating readers from
files. It inherits reading methods from InputStreamReader and
Reader. The class handles basic file operations but lacks buffering.

public class FileReader extends InputStreamReader {
    public FileReader(String fileName) throws FileNotFoundException;
    public FileReader(File file) throws FileNotFoundException;
    public FileReader(FileDescriptor fd);
    public int read() throws IOException;
    public int read(char[] cbuf) throws IOException;
    public int read(char[] cbuf, int off, int len) throws IOException;
    public void close() throws IOException;
}

The code above shows key methods provided by FileReader. These
methods allow reading character data from files. For better performance, wrap
FileReader in a BufferedReader. Always close the reader when done.

## Creating a FileReader

FileReader can be created from a file path string, File object, or FileDescriptor.
The constructors throw FileNotFoundException if the file doesn't
exist. The reader should be closed after use to release system resources.

Main.java
  

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Create from file path
            FileReader reader1 = new FileReader("data.txt");
            
            // Create from File object
            File file = new File("data.txt");
            FileReader reader2 = new FileReader(file);
            
            System.out.println("FileReader created successfully");
            
            reader1.close();
            reader2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create FileReader instances. The first
uses a file path string, while the second uses a File object. Both readers should
be closed properly. In production code, use try-with-resources for automatic
resource management.

## Reading Characters with FileReader

The simplest way to read with FileReader is using the read method.
It returns a single character as an int, or -1 at end of file. This approach is
inefficient for large files due to many method calls.

Main.java
  

import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileReader reader = new FileReader("data.txt")) {
            
            int charData;
            while ((charData = reader.read()) != -1) {
                System.out.print((char) charData);
            }
            
            System.out.println("\n\nFile reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to read a file character by character using FileReader.
The try-with-resources statement ensures proper reader closure. The read method
returns -1 at end of file. Each character is cast from int to char for display.

## Reading Characters into an Array

For better performance, read multiple characters at once into a char array. This
reduces method calls and improves efficiency. The read method returns the number
of characters actually read.

Main.java
  

import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileReader reader = new FileReader("largefile.txt")) {
            
            char[] buffer = new char[1024];
            int charsRead;
            
            while ((charsRead = reader.read(buffer)) != -1) {
                System.out.println("Read " + charsRead + " characters");
                // Process the buffer data here
                System.out.println(new String(buffer, 0, charsRead));
            }
            
            System.out.println("File reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates bulk reading into a character array. The buffer size
(1024) can be adjusted based on performance needs. The charsRead value indicates
how many characters were actually read. The String constructor converts the
relevant portion of the buffer to a string.

## Using FileReader with BufferedReader

For better performance, wrap FileReader in a BufferedReader. This adds buffering
capability and provides line reading methods. BufferedReader is the recommended
way to read text files in Java.

Main.java
  

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedReader reader = 
                new BufferedReader(new FileReader("data.txt"))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
            System.out.println("File reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows the recommended way to read text files in Java. The
BufferedReader provides line reading functionality through readLine(). The
try-with-resources statement ensures both readers are closed properly. This
approach is more efficient than raw FileReader for most text processing tasks.

## Handling Character Encoding

FileReader uses the platform's default character encoding. For explicit encoding
control, use InputStreamReader with FileInputStream.
This is important when working with files in specific encodings like UTF-8.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) {
        try (InputStreamReader reader = 
                new InputStreamReader(
                    new FileInputStream("data.txt"), 
                    StandardCharsets.UTF_8)) {
            
            char[] buffer = new char[1024];
            int charsRead;
            
            while ((charsRead = reader.read(buffer)) != -1) {
                System.out.print(new String(buffer, 0, charsRead));
            }
            
            System.out.println("\n\nFile reading complete with UTF-8 encoding");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates reading a file with explicit UTF-8 encoding. The
InputStreamReader is wrapped around a FileInputStream with specified charset.
This approach should be used when the file encoding is known and differs from
the platform default. StandardCharsets provides common charset constants.

## Source

[Java FileReader Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FileReader.html)

In this article, we've covered the essential methods and features of the Java
FileReader class. Understanding these concepts is crucial for working with
text files in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).