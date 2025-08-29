+++
title = "Creating file in Java"
date = 2025-08-29T19:58:32.688+01:00
draft = false
description = "In Java create file tutorial, we show how to create a file in Java. We create files with built-in classes including File, FileOutputStream, and Files. We also use two third-party libraries: Apache Commons IO and Google Guava."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Creating file in Java

last modified January 27, 2024

 

In Java create file tutorial, we show how to create a file in Java. We create files 
with built-in classes including File, FileOutputStream, and
Files. We also use two third-party libraries: Apache Commons IO and Google Guava.

A computer file is a computer resource for recording data discretely 
in a computer storage device.

The tutorials shows five ways to create a file in Java. The examples create empty files.

## Java creating file with File

The File's createNewFile method creates a new, empty file 
named by the pathname if a file with this name does not yet exist. 

JavaCreateFileEx.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;

public class JavaCreateFileEx {

    public static void main(String[] args) throws IOException {

        File file = new File("src/main/resources/myfile.txt");

        if (file.createNewFile()) {
            
            System.out.println("File has been created.");
        } else {
        
            System.out.println("File already exists.");
        }
    }
}

The createNewFile returns true if the named file does
not exist and was successfully created; false if the named file 
already exists.

## Java creating file with FileOutputStream

In the second example, we create a new, empty file with FileOutputStream.

JavaCreateFileEx2.java
  

package com.zetcode;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class JavaCreateFileEx2 {

    public static void main(String[] args) throws FileNotFoundException, IOException {

        FileOutputStream fout = null;

        try {
            
            fout = new FileOutputStream("src/main/resources/myfile.txt");
        } finally {
            
            if (fout != null) {
                fout.close();
            }
        }
    }
}

The file is created when FileOutputStream object is instantiated.
If the file already exists, it is overridden. 

FileNotFoundException is thrown 
if the file exists but is a directory rather than a regular file, does  not exist but 
cannot be created, or cannot be opened for any other reason.

## Java creating file with Files

Java 7 introduced Files, which consists exclusively of static methods 
that operate on files, directories, or other types of files. Its createFile
method creates a new and empty file, failing if the file already exists.

JavaCreateFileEx3.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JavaCreateFileEx3 {

    public static void main(String[] args) throws IOException {

        Path path = Paths.get("src/main/resources/myfile.txt");

        try {

            Files.createFile(path);
            
        } catch (FileAlreadyExistsException ex) {
            
            System.err.println("File already exists");
        }
    }
}

The example creates a new, empty file with Files.

Path path = Paths.get("src/main/resources/myfile.txt");

A Path object is created. It is used to locate a file in a file system. 

Files.createFile(path);

The new file is created with Files.createFile.

} catch (FileAlreadyExistsException ex) {

FileAlreadyExistsException is thrown if the file already exists.

## Java creating file with Apache Commons IO

The next example creates a file with Apache Commons IO library.

&lt;dependency&gt;
    &lt;groupId&gt;commons-io&lt;/groupId&gt;
    &lt;artifactId&gt;commons-io&lt;/artifactId&gt;
    &lt;version&gt;2.6&lt;/version&gt;
&lt;/dependency&gt;

For the project we need the commons-io dependency.

JavaCreateFileEx4.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;

public class JavaCreateFileEx4 {
    
    public static void main(String[] args) throws IOException {
        
        FileUtils.touch(new File("src/main/resources/myfile.txt"));
    }
}

The new file is created with FileUtils.touch method.

## Java creating file with Google Guava

In the following example, we create a new file with Google Guava
library.

&lt;dependency&gt;
    &lt;groupId&gt;com.google.guava&lt;/groupId&gt;
    &lt;artifactId&gt;guava&lt;/artifactId&gt;
    &lt;version&gt;23.4-jre&lt;/version&gt;
&lt;/dependency&gt;

For the project we need the guava dependency.

JavaCreateFileEx5.java
  

package com.zetcode;

import com.google.common.io.Files;
import java.io.File;
import java.io.IOException;

public class JavaCreateFileEx5 {
    
    public static void main(String[] args) throws IOException {
        
        Files.touch(new File("src/main/resources/myfile.txt"));
    }
}

The new file is created with Files.touch. It accepts
a File as a parameter.

## Source

[Java Reading, Writing, and Creating Files - tutorial](https://docs.oracle.com/javase/tutorial/essential/io/file.html)

In this article we have shown several ways how to create a file in Java. We have
used built-in tools and third-party libraries. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).