+++
title = "Java list directory contents"
date = 2025-08-29T19:59:59.501+01:00
draft = false
description = "Java list directory tutorial shows how to display the directory contents in Java. Directory is an organizing unit in a computer's file system for storing and locating files."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java list directory contents

last modified May 11, 2024

This article offers a comprehensive, step-by-step guide on how to display the
contents of a directory in Java. Mastering directory operations is essential for
efficient file management, navigation, and automation in both desktop and server
applications. By learning how to list directory contents, you gain the ability
to process files in bulk, monitor changes, and build robust tools for data
organization and retrieval.

## What is a Directory?

A directory is a core component of a computer's file system. It acts
as a container for storing and organizing files, as well as other directories,
known as subdirectories. Directories are structured hierarchically, forming a
tree-like system where each directory can have multiple children but only one
parent (except for the root directory). This structure enables users and
programs to efficiently organize, locate, and manage files, supporting complex
workflows and large-scale data storage. Understanding how directories work is
fundamental for any developer working with file systems.

## List directory contents non-recursively with Files.list

The Files.list method provides a convenient way to obtain a stream
of entries (files and directories) located in a specified directory. This method
is non-recursive, meaning it only lists the contents of the directory itself and
does not descend into any subdirectories. Using streams allows for efficient
processing of large directories, as entries are read lazily and can be filtered,
limited, or processed in parallel. This approach is particularly useful when you
want to quickly inspect or process the immediate contents of a folder without
traversing its entire hierarchy.

Main.java
  

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

void main() throws IOException {

    String dirName = "..";

    try (Stream&lt;Path&gt; filesStream = Files.list(Paths.get(dirName))) {
        filesStream.limit(10).forEach(System.out::println);
    }
}

In this example, we use Files.list to display up to ten files or
directories from the specified directory. The limit(10) operation
restricts the output to the first ten entries, which is helpful for directories
with many items. Each entry is printed to the console as a Path
object, allowing you to see both files and subdirectories at the top level. This
method is ideal for quick previews or when you only need to process a subset of
directory contents.

## List directory contents recursively with Files.walk

The Files.walk method enables recursive traversal of a directory
tree, starting from a given root path. It returns a stream of Path
objects representing all files and directories found by walking the file tree.
This method is powerful for scenarios where you need to process or analyze every
file within a directory and its subdirectories, such as searching for specific
file types, aggregating data, or performing batch operations. The stream can be
filtered to include only files, directories, or other criteria as needed.

Main.java
  

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

void main() throws IOException {

    String pathName = "..";

    try (Stream&lt;Path&gt; paths = Files.walk(Paths.get(pathName))) {
        paths.filter(Files::isRegularFile)
                .forEach(System.out::println);
    }
}

This example demonstrates how to use Files.walk to recursively list
all regular files within the specified directory and its subdirectories. By
applying the filter(Files::isRegularFile) operation, the stream is
restricted to only regular files, excluding directories and other non-file
entries. Each file path is printed to the console, providing a complete view of
all files in the directory tree. This approach is especially useful for tasks
like file searching, indexing, or performing actions on every file in a project
or data set.

## Listing directory contents non-recursively with Files.walkFileTree

Files.walkFileTree method walks a file tree rooted at a given
starting file. It uses a FileVisitor pattern which specifies the
required behavior at key points in the traversal process: when a file is
visited, before a directory is accessed, after a directory is accessed, or when
a failure occurs.

Main.java
  

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Collections;

void main() throws IOException {

    String dirName = "..";
    File file = new File(dirName);

    Files.walkFileTree(file.toPath(), Collections.emptySet(), 1, new SimpleFileVisitor&lt;&gt;() {
        @Override
        public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
            System.out.println(file);
            return FileVisitResult.CONTINUE;
        }
    });
}

The example uses Files.walkFileTree to traverse a directory
non-recursively.

The Files.walkFileTree parameters are: the starting file, the
options to configure the traversal, the maximum number of directory levels to
visit, the file visitor to invoke for each file. In our case we have one
directory level to traverse.

## Listing directory contents recursively with Files.walkFileTree

In the following example, we use Files.walkFileTree to traverse
the whole directory structure.

Main.java
  

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;

void main() throws IOException {

    String dirName = "..";
    File file = new File(dirName);

    Files.walkFileTree(file.toPath(), new SimpleFileVisitor&lt;&gt;() {
        @Override
        public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
            System.out.println(file);
            return FileVisitResult.CONTINUE;
        }
    });
}

The example uses an overloaded Files.walkFileTree method to
traverse a directory recursively.

## Listing directory contents non-recursively with File

The java.io.File class is an older API to list directory contents.
It is not as powerful as the modern API, mentioned earlier.
The File's listFiles returns an array
of file objects in the given directory.

Main.java
  

import java.io.File;

void main() {

    String dirName = "..";

    File fileName = new File(dirName);
    File[] fileList = fileName.listFiles();

    if (fileList != null) {
        for (File file : fileList) {
    
            System.out.println(file);
        }
    }
}

The example prints the contents of the given directory to the console. It does
not go into subdirectories.

## Listing directory contents recursively with File

This time we use java.io.File class to recursively list
the directory.

Main.java
  

import java.io.File;
import java.util.ArrayList;
import java.util.List;

List&lt;File&gt; files = new ArrayList&lt;&gt;();

void main() {

    String dirName = "..";
    File file = new File(dirName);

    List&lt;File&gt; myfiles = doListing(file);
    myfiles.forEach(System.out::println);
}

List&lt;File&gt; doListing(File dirName) {

    File[] fileList = dirName.listFiles();

    if (fileList != null) {
        for (File file : fileList) {

            if (file.isFile()) {

                files.add(file);
            } else if (file.isDirectory()) {

                files.add(file);
                doListing(file);
            }
        }
    }

    return files;
}

The doListing method traverses a directory and retrieves its
contents. Using the isDirectory method, it determines whether an
item is a directory or a file. For each directory encountered, the method is
called recursively to continue listing its subdirectories and files. This
ensures that all nested folders are processed effectively.

## Source

[Java Basic I/O](https://docs.oracle.com/javase/tutorial/essential/io/)

In this article we have shown various ways to list directory contents in
Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).