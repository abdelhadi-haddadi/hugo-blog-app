+++
title = "Java FileFilter Interface"
date = 2025-08-29T19:59:15.268+01:00
draft = false
description = "Complete Java FileFilter interface tutorial covering all methods with examples. Learn about file filtering operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FileFilter Interface

Last modified: April 16, 2025

 

The java.io.FileFilter interface is used for filtering files and
directories. It contains a single method that determines if a file should be
included in a file list. This is commonly used with the listFiles
method of the File class.

FileFilter is a functional interface, meaning it can be implemented
using lambda expressions. It provides a flexible way to customize file listing
operations. The interface is part of Java's file I/O utilities since Java 1.2.

## FileFilter Interface Overview

The FileFilter interface has just one abstract method:
accept. This method takes a File object and returns
a boolean indicating whether the file should be accepted. The interface is often
used with directory listing operations.

public interface FileFilter {
    boolean accept(File pathname);
}

The code above shows the simple structure of the FileFilter
interface. Implementations of this interface can perform any type of file
filtering logic. The accept method is called for each file
during filtering operations.

## Basic FileFilter Implementation

This example demonstrates a basic implementation of the FileFilter
interface. We'll create a filter that only accepts files with a specific
extension. The implementation uses an anonymous class for simplicity.

Main.java
  

import java.io.File;
import java.io.FileFilter;

public class Main {

    public static void main(String[] args) {
        File dir = new File(".");
        
        FileFilter txtFilter = new FileFilter() {
            @Override
            public boolean accept(File file) {
                return file.getName().endsWith(".txt");
            }
        };
        
        File[] txtFiles = dir.listFiles(txtFilter);
        
        System.out.println("Text files in current directory:");
        for (File file : txtFiles) {
            System.out.println(file.getName());
        }
    }
}

This example creates a filter that accepts only .txt files. The
listFiles method uses our filter to return matching files. The
filter checks each file's name using the endsWith method. Note
that directory entries are also checked but won't match our criteria.

## Lambda Expression Implementation

Since FileFilter is a functional interface, we can implement it
using lambda expressions. This makes the code more concise while maintaining
the same functionality. Lambda expressions were introduced in Java 8.

Main.java
  

import java.io.File;

public class Main {

    public static void main(String[] args) {
        File dir = new File(".");
        
        // Using lambda expression
        File[] javaFiles = dir.listFiles(file -&gt; file.getName().endsWith(".java"));
        
        System.out.println("Java files in current directory:");
        for (File file : javaFiles) {
            System.out.println(file.getName());
        }
    }
}

This example shows how to implement FileFilter using a lambda
expression. The lambda takes a File parameter and returns a
boolean. The syntax is much cleaner than anonymous class implementation. The
filter logic remains the same - checking file extensions.

## Combining Multiple Conditions

File filters can combine multiple conditions using logical operators. This
example demonstrates a filter that checks both file extension and file size.
We'll accept only Java files larger than 1KB.

Main.java
  

import java.io.File;
import java.io.FileFilter;

public class Main {

    public static void main(String[] args) {
        File dir = new File("src");
        
        FileFilter filter = file -&gt; {
            boolean isJavaFile = file.getName().endsWith(".java");
            boolean isLargeEnough = file.length() &gt; 1024;
            return isJavaFile &amp;&amp; isLargeEnough;
        };
        
        File[] filteredFiles = dir.listFiles(filter);
        
        System.out.println("Large Java files in src directory:");
        for (File file : filteredFiles) {
            System.out.printf("%s (%,d bytes)%n", 
                file.getName(), file.length());
        }
    }
}

This example combines two conditions in the filter: file extension and size.
The length method returns file size in bytes. We use logical
AND (&amp;&amp;) to require both conditions to be true. The output shows
both filenames and their sizes for verification.

## Directory-Only Filter

File filters can distinguish between files and directories. This example creates
a filter that only accepts directory entries. We'll use the isDirectory
method from the File class.

Main.java
  

import java.io.File;

public class Main {

    public static void main(String[] args) {
        File rootDir = new File("/");
        
        File[] directories = rootDir.listFiles(File::isDirectory);
        
        System.out.println("Directories in root:");
        for (File dir : directories) {
            System.out.println(dir.getName());
        }
    }
}

This example uses a method reference (File::isDirectory) as a
concise way to implement the filter. The filter will only accept directory
entries, excluding regular files. Method references are another Java 8 feature
that simplifies functional interface implementations.

## Custom Filter Class

For complex filtering logic, we can create dedicated filter classes. This
example shows a custom filter that accepts files modified within the last
7 days. The class implements FileFilter explicitly.

Main.java
  

import java.io.File;
import java.io.FileFilter;
import java.util.Date;

public class Main {
    
    static class RecentFileFilter implements FileFilter {
        private long cutoffTime;
        
        public RecentFileFilter(int days) {
            long millisPerDay = 24 * 60 * 60 * 1000L;
            this.cutoffTime = System.currentTimeMillis() - (days * millisPerDay);
        }
        
        @Override
        public boolean accept(File file) {
            return file.lastModified() &gt;= cutoffTime;
        }
    }

    public static void main(String[] args) {
        File dir = new File(".");
        
        FileFilter filter = new RecentFileFilter(7);
        File[] recentFiles = dir.listFiles(filter);
        
        System.out.println("Files modified in last 7 days:");
        for (File file : recentFiles) {
            System.out.printf("%s - %s%n", 
                file.getName(), new Date(file.lastModified()));
        }
    }
}

This example demonstrates a more sophisticated filter implementation. The
RecentFileFilter class maintains state (the cutoff time) and
implements complex logic. The filter checks each file's last modified timestamp
against our cutoff. The output shows both filenames and their modification dates.

## Combining Multiple Filters

We can combine multiple filters to create more specific selection criteria.
This example shows how to apply two filters sequentially to get files that
match both conditions. We'll find PDF files that are also readable.

Main.java
  

import java.io.File;
import java.io.FileFilter;

public class Main {

    public static void main(String[] args) {
        File dir = new File("documents");
        
        FileFilter pdfFilter = f -&gt; f.getName().toLowerCase().endsWith(".pdf");
        FileFilter readableFilter = File::canRead;
        
        File[] files = dir.listFiles(f -&gt; 
            pdfFilter.accept(f) &amp;&amp; readableFilter.accept(f));
        
        System.out.println("Readable PDF files:");
        for (File file : files) {
            System.out.println(file.getName());
        }
    }
}

This example combines two filters using logical AND in a lambda expression.
First we check if the file is a PDF, then if it's readable. The
canRead method checks file permissions. The combined filter
only accepts files that satisfy both conditions.

## Source

[Java FileFilter Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FileFilter.html)

In this article, we've covered the essential methods and features of the Java
FileFilter interface. Understanding these concepts is crucial for working
with file operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).