+++
title = "Apache FileUtils"
date = 2025-08-29T19:58:40.850+01:00
draft = false
description = "Apache FileUtils tutorial shows how to use Apache FileUtils to work with files and directories in Java. The examples read, write, copy, create, delete, list and get size of files."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Apache FileUtils

last modified January 27, 2024

 

Apache FileUtils tutorial shows how to use Apache FileUtils to work with files and directories 
in Java. The examples read, write, copy, create, delete, list and get size of files.

Apache FileUtils are general file manipulation utilities. FileUtils are part of the Apache Commons IO,
which is a library of utilities to assist with developing IO functionality in Java.

&lt;dependency&gt;
    &lt;groupId&gt;commons-io&lt;/groupId&gt;
    &lt;artifactId&gt;commons-io&lt;/artifactId&gt;
    &lt;version&gt;2.6&lt;/version&gt;
&lt;/dependency&gt;

In the examples, we use the commons-io dependency.

## Apache FileUtils create and delete files

A new file is created with FileUtils.touch and 
deleted with FileUtils.deleteQuietly.

CreateDeleteFileEx.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;

public class CreateDeleteFileEx {
    
    public static void main(String[] args) throws IOException {
        
        File myfile = new File("src/main/resources/myfile.txt");        
        FileUtils.touch(myfile);
        
        if (myfile.exists()) {
            
            System.out.println("The file exists");
        } else {
            
            System.out.println("The file does not exist");
        }
        
        FileUtils.deleteQuietly(myfile);
        
        if (myfile.exists()) {
            
            System.out.println("The file exists");
        } else {
            
            System.out.println("The file does not exist");
        }        
    }
}

The example creates a new file, checks for its existence, deletes it, and 
checks for its existence again.

File myfile = new File("src/main/resources/myfile.txt");        
FileUtils.touch(myfile);

A new file is created with FileUtils.touch.

if (myfile.exists()) {

We check for the existence of a file with File's exists
method.

FileUtils.deleteQuietly(myfile);

The file is deleted with FileUtils.deleteQuietly.

## Apache FileUtils copying file

Files can be copied with the FileUtils.copyFile and 
FileUtils.copyFileToDirectory methods. To compare the file contents, 
we can use the FileUtils.contentEquals method.

CopyFileEx.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;

public class CopyFileEx {
    
    public static void main(String[] args) throws IOException {
        
        File myfile1 = new File("src/main/resources/myfile.txt");
        File myfile2 = new File("src/main/resources/myfile2.txt");
        
        FileUtils.copyFile(myfile1, myfile2);
        
        if (FileUtils.contentEquals(myfile1, myfile2)) {
            
            System.out.println("The files have equal content");
        } else {
            
            System.out.println("The files do not have equal content");
        }
        
        File docs = new File("src/main/resources/docs");
        FileUtils.forceMkdir(docs);
        
        FileUtils.copyFileToDirectory(myfile2, docs);
    }
}

The example copies a file in the same directory and compares their contents.
Then it creates a new directory and copies a file to this new directory.

FileUtils.copyFile(myfile1, myfile2);

We copy a file within the same directory with FileUtils.copyFile.

if (FileUtils.contentEquals(myfile1, myfile2)) {

We compare the contents of two files with FileUtils.contentEquals.

FileUtils.forceMkdir(docs);

A new directory is created with FileUtils.forceMkdir.

FileUtils.copyFileToDirectory(myfile2, docs);

A file is copied to a new directory with FileUtils.copyFileToDirectory.

In the following example, we copy a URL resource to a local file. 

CopyUrl2FileEx.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import org.apache.commons.io.FileUtils;

public class CopyUrl2FileEx {
    
    public static void main(String[] args) throws IOException {
        
        URL myurl = new URL("http://www.something.com");
        
        File myfile = new File("src/main/resources/something.html");
        
        FileUtils.copyURLToFile(myurl, myfile);
        
        String content = FileUtils.readFileToString(myfile, 
                StandardCharsets.UTF_8.name());
        
        System.out.println(content);
    }
}

The example copies a HTML page and writes it to a file.

URL myurl = new URL("http://www.something.com");

We read the contents of the www.something.com web page.

File myfile = new File("src/main/resources/something.html");

The HTML contents of the page will be written to src/main/resources/something.html
file.

FileUtils.copyURLToFile(myurl, myfile);

We copy the web page to the local file with FileUtils.copyURLToFile.

String content = FileUtils.readFileToString(myfile, 
        StandardCharsets.UTF_8.name());

System.out.println(content);

We read the contents of the local file and print it to the console.

## Apache FileUtils get file size

We determine the file size with FileUtils.sizeOf
and the directory size with FileUtils.sizeOfDirectory.

GetFileSizeEx.java
  

package com.zetcode;

import java.io.File;
import org.apache.commons.io.FileUtils;

public class GetFileSizeEx {
    
    public static void main(String[] args) {
        
        File myfile = new File("/home/janbodnar/tmp/rotunda.jpg");
        
        long fileSizeB = FileUtils.sizeOf(myfile);
        System.out.printf("The size of file is: %d bytes\n", fileSizeB);
        
        File mydir = new File("/home/janbodnar/tmp");
        
        long dirSizeB = FileUtils.sizeOfDirectory(mydir);
        double dirSizeKB = (double) dirSizeB / FileUtils.ONE_KB;
        double dirSizeMB = (double) dirSizeB / FileUtils.ONE_MB;
        
        System.out.printf("The size of directory is: %d bytes\n", dirSizeB);
        System.out.printf("The size of file is: %.2f kilobytes\n", dirSizeKB);
        System.out.printf("The size of file is: %.2f megabytes\n", dirSizeMB);        
    }
}

In the example, we get the size of a file and a directory.

double dirSizeKB = (double) dirSizeB / FileUtils.ONE_KB;
double dirSizeMB = (double) dirSizeB / FileUtils.ONE_MB;

We use FileUtils.ONE_KB and FileUtils.ONE_MB
constants to calculate the size in kilobytes and megabytes.

## Apache FileUtils reading file

A file can be read into a string with FileUtils.readFileToString
or into a collection of strings with FileUtils.readLines.

words.txt
  

blue, tank, robot, planet, wisdom, cherry, 
chair, pen, keyboard, tree, forest, plant
sky, movie, white, colour, music, dog, cat

We have this text file located in src/main/resources directory.

ReadFileEx.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.apache.commons.io.FileUtils;

public class ReadFileEx {
    
    public static void main(String[] args) throws IOException {
        
        File myfile = new File("src/main/resources/words.txt");
        
        String contents = FileUtils.readFileToString(myfile, 
                StandardCharsets.UTF_8.name());
        
        System.out.println(contents);
        
        List&lt;String&gt; lines = FileUtils.readLines(myfile, 
                StandardCharsets.UTF_8.name());
        
        System.out.printf("There are %d lines in the file\n", lines.size());
        
        System.err.printf("The second line is: %s", lines.get(1));
    }
}

The example reads a text file into a string and into a list of strings.

String contents = FileUtils.readFileToString(myfile, 
        StandardCharsets.UTF_8.name());

In the second parameter of the FileUtils.readFileToString method, we
specify the file enconding type.

## Apache FileUtils writing to file

A string is written to a file with FileUtils.writeStringToFile
and a collection of strings with FileUtils.writeLines.

WriteFileEx.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.io.FileUtils;

public class WriteFileEx {

    public static void main(String[] args) throws IOException {

        String string = "Today is a gloomy day.";
        File myfile = new File("src/main/resources/myfile.txt");
        
        FileUtils.writeStringToFile(myfile, string, 
                StandardCharsets.UTF_8.name());
        
        List&lt;String&gt; lines = new ArrayList&lt;&gt;();
        lines.add("A dark forest.");
        lines.add("A stray dog.");
        lines.add("A massive mountain.");
        
        File myfile2 = new File("src/main/resources/myfile2.txt");
        
        FileUtils.writeLines(myfile2, 
                StandardCharsets.UTF_8.name(), lines);
    }
}

The example writes a string and a list of strings to files.

## Apache FileUtils list files

The FileUtils.listFiles method finds files according to 
a selected criterion.

ListFilesEx.java
  

package com.zetcode;

import java.io.File;
import java.util.Collection;
import org.apache.commons.io.FileUtils;

public class ListFilesEx {
    
    public static void main(String[] args) {
        
        File myDir = new File("/home/janbodnar/tmp");
        
        Collection&lt;File&gt; files = FileUtils.listFiles(myDir, 
                new String[] {"txt", "html"}, true);
        
        files.stream().forEach(System.out::println);
    }
}

In this example, we use FileUtils.listFiles to find files
that match either txt or html extensions. 

Collection&lt;File&gt; files = FileUtils.listFiles(myDir, 
        new String[] {"txt", "html"}, true);

The second parameter is an array of extensions; the file must match
one of these extensions to be selected. The third parameter specifies
that we search for files in the subdirectories as well.

The next example searches for files that match a filter.

ListFilesFilterEx.java
  

package com.zetcode;

import java.io.File;
import java.util.Collection;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOCase;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.apache.commons.io.filefilter.NotFileFilter;
import org.apache.commons.io.filefilter.WildcardFileFilter;

public class ListFilesFilterEx {
    
    public static void main(String[] args) {
        
        File myDir = new File("/home/janbodnar/tmp");
        
        Collection&lt;File&gt; files = FileUtils.listFiles(myDir, 
                new WildcardFileFilter("*.txt", IOCase.SENSITIVE),
                new NotFileFilter(DirectoryFileFilter.DIRECTORY));
        
        files.stream().forEach(System.out::println);
    }
}

With this overridden FileUtils.listFiles method, we search
for files that match a wild card filter.

Collection&lt;File&gt; files = FileUtils.listFiles(myDir, 
        new WildcardFileFilter("*.txt", IOCase.SENSITIVE),
        new NotFileFilter(DirectoryFileFilter.DIRECTORY));

The first parameter of the method is the directory name to search in. The second
parameter is the file filter and the last one is the directory filter. 
We use the WildcardFileFilter to search for files matching *.txt
wildcard and disable searching for directories with NotFileFilter.

## Apache FileUtils getting directories

The FileUtils.getTempDirectoryPath returns the path to the system 
temporary directory and the FileUtils.getUserDirectoryPath returns
the path to the user's home directory.

GetDirsEx.java
  

package com.zetcode;

import org.apache.commons.io.FileUtils;

public class GetDirsEx {
    
    public static void main(String[] args) {
        
        String tempDir = FileUtils.getTempDirectoryPath();
        System.out.println(tempDir);
        
        String userDir = FileUtils.getUserDirectoryPath();
        System.out.println(userDir);
    }
}

The example retrieves and prints the system temporary and user directories.

## Source

[Apache FileUtils - reference](https://commons.apache.org/proper/commons-io/apidocs/org/apache/commons/io/FileUtils.html)

In this article we used Apache FileUtils to work with files. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).