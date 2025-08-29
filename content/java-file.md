+++
title = "Java file"
date = 2025-08-29T19:58:38.616+01:00
draft = false
description = "Java file tutorial shows how to work with files in Java. We create a file, read from a file, write to a file, move a file with Java Files."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java file

last modified January 27, 2024

 

Java file tutorial shows how to work with files in Java. We create a file, find
its size, copy a file, delete a file, rename a file, read from a file, write to
a file, get a file owner with Java Files.

Files contains static methods for working with files in Java language.

Path is an object used to locate a file in a file system. 
Paths form a hierarchy and are composed of a sequence of directory and 
file name elements separated by a special separator or delimiter.
A Path can be created with Paths.get 
and File.toPath methods.

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

This is a sample text file that you can use in your applications.

## Java create file

The following example creates a new file with Files.createFile.

com/zetcode/JavaCreateFile.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileAttribute;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.HashSet;
import java.util.Set;

public class JavaCreateFile {

    public static void main(String[] args) throws IOException {

        Set&lt;PosixFilePermission&gt; perms = new HashSet&lt;&gt;();

        perms.add(PosixFilePermission.OWNER_READ);
        perms.add(PosixFilePermission.OWNER_WRITE);
        perms.add(PosixFilePermission.GROUP_READ);
        perms.add(PosixFilePermission.GROUP_WRITE);
        perms.add(PosixFilePermission.OTHERS_READ);

        FileAttribute&lt;Set&lt;PosixFilePermission&gt;&gt; attrs = PosixFilePermissions.asFileAttribute(perms);

        Path myPath = Paths.get("src/resources/myfile.txt");

        if (Files.exists(myPath)) {
            
            System.out.println("File already exists");
        } else {
            
            Files.createFile(myPath, attrs);
            System.out.println("File created");
        }
    }
}

We set the file permissions of the newly cretaed file with PosixFilePermission.

Set&lt;PosixFilePermission&gt; perms = new HashSet&lt;&gt;();

perms.add(PosixFilePermission.OWNER_READ);
perms.add(PosixFilePermission.OWNER_WRITE);
perms.add(PosixFilePermission.GROUP_READ);
perms.add(PosixFilePermission.GROUP_WRITE);
perms.add(PosixFilePermission.OTHERS_READ);

Here we choose the permissions for the file.

Path myPath = Paths.get("src/resources/myfile.txt");

With Paths.get we get the Path of
the file.

if (Files.exists(myPath)) {

Before we create the file, we check if it does not exist with 
Files.exists. A FileAlreadyExistsException is thrown
if we try to create an existing file.

Files.createFile(myPath, attrs);

A file is created with Files.createFile. It takes a Path
of the file and a list of file attributes as parameters.

## Java file size

The Files.size determines the size of a file in bytes.

com/zetcode/JavaFileSize.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JavaFileSize {

    public static void main(String[] args) throws IOException {
        
        Path myPath = Paths.get("src/resources/bugs.txt");
        
        long fileSize = Files.size(myPath);
        
        System.out.format("File size: %d bytes%n", fileSize);
    }
}

The example returns the size of a text file.

## Java copy file

The Files.copy copies a file. 

com/zetcode/JavaCopyFile.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class JavaCopyFile {

    public static void main(String[] args) throws IOException {

        var source = new File("src/resources/bugs.txt");
        var dest = new File("src/resources/bugs2.txt");

        Files.copy(source.toPath(), dest.toPath(), 
                StandardCopyOption.REPLACE_EXISTING);
    }
}

In the example, we copy a file.

Files.copy(source.toPath(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);

The Files.copy takes the following parameters: the path to the source file,
the path to the destination file, and the copy options. StandardCopyOption.REPLACE_EXISTING 
causes the destination file to be replaced if it already exists.

## Java delete file

The Files.deleteIfExists deletes a file if it exists.

com/zetcode/JavaDeleteFile.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JavaDeleteFile {

    public static void main(String[] args) throws IOException {
        
        Path myPath = Paths.get("src/resources/myfile.txt");
        
        boolean fileDeleted = Files.deleteIfExists(myPath);
        
        if (fileDeleted) {
            
            System.out.println("File deleted");
        } else {
            
            System.out.println("File does not exist");
        }
    }
}

The example deletes a file.

boolean fileDeleted = Files.deleteIfExists(myPath);

Files.deleteIfExists deletes a file and returns true if the file 
was deleted and false if the file could not be deleted because it did not exist.

## Java move file

A file is renamed with Files.move.

com/zetcode/JavaMoveFile.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JavaMoveFile {

    public static void main(String[] args) throws IOException {
        
        Path myPath = Paths.get("src/resources/myfile.txt");
        Path myPath2 = Paths.get("src/resources/myfile2.txt");
        
        Files.move(myPath, myPath2);
        
        System.out.println("File moved");
    }
}

The example renames a file.

Files.move(myPath, myPath2);

Files.move takes two parameters: the source file path and the 
destination file path.

## Java read file

The Files.readAllLines reads all lines from a file. It ensures that 
the file is properly closed when all bytes have been read or an exception is thrown.

Files.readAllLines is not intended for reading large files.

com/zetcode/JavaReadFile.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class JavaReadFile {

    public static void main(String[] args) throws IOException {
        
        Path myPath = Paths.get("src/resources/bugs.txt");
        
        List&lt;String&gt; lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        
        lines.forEach(line -&gt; System.out.println(line));
    }
}

The example reads a text file and writes its contents to the console.

List&lt;String&gt; lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);

Files.readAllLines takes a file path and the charset as parameters.

lines.forEach(line -&gt; System.out.println(line));

With forEach, we go throug the list and print all lines.

## Java write file

Files.write writes lines of text to a file.
The method ensures that the file is properly closed in the end.

com/zetcode/JavaWriteFile.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

public class JavaWriteFile {

    public static void main(String[] args) throws IOException {
        
        Path myPath = Paths.get("src/resources/myfile.txt");
        
        List&lt;String&gt; lines = new ArrayList&lt;&gt;();
        lines.add("blue sky");
        lines.add("sweet orange");
        lines.add("fast car");
        lines.add("old book");
        
        Files.write(myPath, lines, StandardCharsets.UTF_8, 
                StandardOpenOption.CREATE);
        
        System.out.println("Data written");
    }
}

In the example, we write four text lines to a file.

Files.write(myPath, lines, StandardCharsets.UTF_8, 
        StandardOpenOption.CREATE);

Files.write takes a file path, charset, and file open 
options as parameters. With StandardOpenOption.CREATE
a file is created if it does not exist.

## Java file owner

Files.getOwner returns the owner of the file.

com/zetcode/JavaGetFileOwner.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.UserPrincipal;

public class JavaGetFileOwner {

    public static void main(String[] args) throws IOException {
        
        Path myPath = Paths.get("src/resources/bugs.txt");
        
        UserPrincipal userPrincipal = Files.getOwner(myPath);
        String owner = userPrincipal.getName();
        
        System.out.println(owner);
    }
}

In the example, we get the owner of the file.

## Source

[Java Files - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html)

In this article we have done some basic file operations using
Files. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).