+++
title = "Java FilenameFilter Interface"
date = 2025-08-29T19:59:15.249+01:00
draft = false
description = "Complete Java FilenameFilter interface tutorial covering all methods with examples. Learn about file filtering in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FilenameFilter Interface

Last modified: April 16, 2025

 

The java.io.FilenameFilter interface is used to filter filenames
in a directory listing. It contains a single method that tests if a specified
file should be included in a file list. This is particularly useful when you
need to work with specific types of files in a directory.

FilenameFilter is a functional interface, meaning it can be
implemented with a lambda expression. It's commonly used with the list
method of the File class to get filtered directory contents.
The interface provides a simple way to customize file listing behavior.

## FilenameFilter Interface Overview

The FilenameFilter interface has just one method to implement.
This method determines whether a file should be accepted or filtered out.
The interface is part of Java's I/O package and has been available since JDK 1.0.

public interface FilenameFilter {
    boolean accept(File dir, String name);
}

The accept method takes two parameters: the directory containing
the file, and the filename. It returns true if the file should
be included in the list. The method is called for each file in the directory
when used with File.list.

## Basic FilenameFilter Implementation

This example shows how to implement the FilenameFilter interface
to filter text files. We create a class that implements the interface and
override the accept method. The filter checks for .txt extension.

Main.java
  

import java.io.File;
import java.io.FilenameFilter;

public class Main {
    
    static class TextFileFilter implements FilenameFilter {
        @Override
        public boolean accept(File dir, String name) {
            return name.toLowerCase().endsWith(".txt");
        }
    }

    public static void main(String[] args) {
        File directory = new File(".");
        
        // Get all text files in current directory
        String[] textFiles = directory.list(new TextFileFilter());
        
        if (textFiles != null) {
            System.out.println("Text files in current directory:");
            for (String file : textFiles) {
                System.out.println(file);
            }
        }
    }
}

This example demonstrates a basic implementation of FilenameFilter.
The TextFileFilter class checks if filenames end with ".txt".
The list method uses this filter to return only matching files.
Note that we check for null in case the directory doesn't exist or isn't readable.

## Using Lambda Expression with FilenameFilter

Since FilenameFilter is a functional interface, we can use lambda
expressions for concise implementation. This approach reduces boilerplate code
and makes the filtering logic more readable when the implementation is simple.

Main.java
  

import java.io.File;

public class Main {
    public static void main(String[] args) {
        File directory = new File(".");
        
        // Filter for Java source files using lambda
        String[] javaFiles = directory.list((dir, name) -&gt; 
            name.toLowerCase().endsWith(".java"));
        
        if (javaFiles != null) {
            System.out.println("Java source files:");
            for (String file : javaFiles) {
                System.out.println(file);
            }
        }
    }
}

This example shows how to use a lambda expression instead of a separate class
to implement FilenameFilter. The lambda checks for .java files.
The syntax is more compact while maintaining the same functionality as the
class-based approach. This is particularly useful for one-off filters.

## Filtering Files by Prefix

We can implement more complex filtering logic by combining multiple conditions.
This example filters files that start with a specific prefix and have a certain
extension. The accept method can include any custom logic needed.

Main.java
  

import java.io.File;
import java.io.FilenameFilter;

public class Main {
    
    static class PrefixFilter implements FilenameFilter {
        private final String prefix;
        
        public PrefixFilter(String prefix) {
            this.prefix = prefix;
        }
        
        @Override
        public boolean accept(File dir, String name) {
            return name.startsWith(prefix) &amp;&amp; 
                   name.toLowerCase().endsWith(".log");
        }
    }

    public static void main(String[] args) {
        File directory = new File("/var/log");
        
        // Filter for system log files starting with 'syslog'
        String[] systemLogs = directory.list(new PrefixFilter("syslog"));
        
        if (systemLogs != null) {
            System.out.println("System log files:");
            for (String file : systemLogs) {
                System.out.println(file);
            }
        }
    }
}

This example demonstrates a more sophisticated filter that checks both prefix
and extension. The PrefixFilter class takes the prefix as a
constructor parameter, making it reusable. The accept method
combines both conditions with a logical AND. This pattern allows for flexible
filter creation.

## Case-Insensitive File Filtering

File systems often have case-sensitive names, but we might want case-insensitive
filtering. This example shows how to implement case-insensitive filtering for
file extensions. We convert both the filename and pattern to the same case.

Main.java
  

import java.io.File;
import java.io.FilenameFilter;

public class Main {
    
    static class CaseInsensitiveFilter implements FilenameFilter {
        private final String extension;
        
        public CaseInsensitiveFilter(String ext) {
            this.extension = ext.startsWith(".") ? ext : "." + ext;
        }
        
        @Override
        public boolean accept(File dir, String name) {
            return name.toLowerCase().endsWith(extension.toLowerCase());
        }
    }

    public static void main(String[] args) {
        File directory = new File(".");
        
        // Filter for image files (case insensitive)
        String[] images = directory.list(new CaseInsensitiveFilter("JPG"));
        
        if (images != null) {
            System.out.println("Image files:");
            for (String file : images) {
                System.out.println(file);
            }
        }
    }
}

This example handles case insensitivity by converting both the filename and
extension to lowercase before comparison. The constructor ensures the extension
has a leading dot. This approach works regardless of how the actual files are
named on the filesystem. It's particularly useful for Windows systems where
case doesn't matter.

## Combining Multiple Filters

Sometimes we need to apply multiple filtering conditions. This example shows
how to combine filters using logical operations. We create a composite filter
that applies AND and OR logic between multiple filters.

Main.java
  

import java.io.File;
import java.io.FilenameFilter;

public class Main {
    
    static class AndFilter implements FilenameFilter {
        private final FilenameFilter filter1;
        private final FilenameFilter filter2;
        
        public AndFilter(FilenameFilter f1, FilenameFilter f2) {
            this.filter1 = f1;
            this.filter2 = f2;
        }
        
        @Override
        public boolean accept(File dir, String name) {
            return filter1.accept(dir, name) &amp;&amp; filter2.accept(dir, name);
        }
    }

    public static void main(String[] args) {
        File directory = new File(".");
        
        // Create individual filters
        FilenameFilter javaFilter = (dir, name) -&gt; name.endsWith(".java");
        FilenameFilter prefixFilter = (dir, name) -&gt; name.startsWith("Main");
        
        // Combine filters with AND logic
        FilenameFilter combinedFilter = new AndFilter(javaFilter, prefixFilter);
        
        String[] filteredFiles = directory.list(combinedFilter);
        
        if (filteredFiles != null) {
            System.out.println("Files starting with 'Main' and ending with '.java':");
            for (String file : filteredFiles) {
                System.out.println(file);
            }
        }
    }
}

This example demonstrates how to combine multiple filters using composition.
The AndFilter class takes two filters and only accepts files
that pass both. Similar classes could be created for OR or NOT logic. This
pattern provides great flexibility in building complex filtering requirements
from simple components.

## Filtering Hidden Files

Some filesystems have hidden files that shouldn't be included in normal
operations. This example shows how to filter out hidden files while also
applying other criteria. We combine hidden file check with extension filtering.

Main.java
  

import java.io.File;
import java.io.FilenameFilter;

public class Main {
    
    static class VisibleConfigFilter implements FilenameFilter {
        @Override
        public boolean accept(File dir, String name) {
            File file = new File(dir, name);
            return !file.isHidden() &amp;&amp; name.endsWith(".cfg");
        }
    }

    public static void main(String[] args) {
        File directory = new File(".");
        
        // Filter for non-hidden config files
        String[] configFiles = directory.list(new VisibleConfigFilter());
        
        if (configFiles != null) {
            System.out.println("Visible config files:");
            for (String file : configFiles) {
                System.out.println(file);
            }
        }
    }
}

This example checks both the hidden status and extension of files. The
accept method creates a File object to check
the hidden attribute. Note that hidden file detection is system-dependent.
This approach ensures we only get visible configuration files in the result.

## Source

[Java FilenameFilter Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FilenameFilter.html)

In this article, we've covered various aspects of the Java FilenameFilter
interface. From basic implementations to advanced filtering techniques,
these examples demonstrate the flexibility of this simple yet powerful
interface for file operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).