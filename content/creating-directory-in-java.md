+++
title = "Creating directory in Java"
date = 2025-08-29T19:58:31.566+01:00
draft = false
description = "In Java create directory tutorial, we show how to create a directory in Java. We also show how to set directory permissions on POSIX systems."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Creating directory in Java

last modified January 27, 2024

 

In Java create directory tutorial, we show how to create a directory in Java. We also show
how to set directory permissions on POSIX systems.

A computer directory is an organizational file system structrure that contains files
and optionally other directories.

The java.nio.file.Files class consists of static methods 
that operate on files, directories, or other types of files. 

## Java create directory with Files.createDirectory

The Files.createDirectory creates a new directory.
If a file already exists, a FileAlreadyExistsException is thrown.

JavaCreateDirectory.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JavaCreateDirectory {

    public static void main(String[] args) throws IOException {

        String fileName = "/home/janbodnar/tmp/newdir";

        Path path = Paths.get(fileName);

        if (!Files.exists(path)) {
            
            Files.createDirectory(path);
            System.out.println("Directory created");
        } else {
            
            System.out.println("Directory already exists");
        }
    }
}

The example creates a new directory with Files.createDirectory.

String fileName = "/home/janbodnar/tmp/newdir";

Path path = Paths.get(fileName);

A Path is created from the file name. A Path is a Java object 
used to locate a file in a file system.

if (!Files.exists(path)) {

We first check if the directory does not already exist with Files.exists.

Files.createDirectory(path);

The directory is created with Files.createDirectory. The method takes
a path object as a parameter.

## Java create directories with Files.createDirectories

The Files.createDirectories creates a new directory; if the parent directories
do not exist, they are created as well. The method does not thrown an exception if the directory
already exist.

JavaCreateDirectories.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JavaCreateDirectories {

    public static void main(String[] args) throws IOException {

        String fileName = "/home/janbodnar/docs/memos";
        Path path = Paths.get(fileName);

        Files.createDirectories(path);
    }
}

The example creates a new directory with Files.createDirectories.

## Java creating directory with permissions

With PosixFilePermissions, we can create a new directory and set
its permissions. Note that this class cannot be used for Windows systems.

JavaCreateFileEx3.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileAttribute;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.Set;

public class JavaCreateDirectoryWithPermissions {

    public static void main(String[] args) throws IOException {

        String fileName = "/home/janbodnar/tmp/newdir";

        Path mypath = Paths.get(fileName);

        if (!Files.exists(mypath)) {
        
            Set&lt;PosixFilePermission&gt; permissions = PosixFilePermissions.fromString("rwxr--r--");
            FileAttribute&lt;Set&lt;PosixFilePermission&gt;&gt; fileAttributes = PosixFilePermissions.asFileAttribute(permissions);

            Files.createDirectory(mypath, fileAttributes);
            System.out.println("Directory created");
            
        } else {
            System.out.println("Directory already exists");
        }
    }
}

The example creates a new directory with the specified permissions.

## Source

[Java Creating and Reading Directories - tutorial](https://docs.oracle.com/javase/tutorial/essential/io/dirs.html)

In this article we have shown how to create directories in Java. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).