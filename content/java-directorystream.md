+++
title = "Java DirectoryStream"
date = 2025-08-29T19:58:35.021+01:00
draft = false
description = "Java DirectoryStream tutorial shows how to iterate over directories with DirectoryStream."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DirectoryStream

last modified June 26, 2025

 

In this article, we demonstrate how to iterate over directories in Java using
the DirectoryStream interface. This approach is efficient and
well-suited for processing directory contents without loading everything into
memory at once.

A DirectoryStream provides a flexible way to traverse the entries
in a directory. It integrates seamlessly with the enhanced
for-loop, allowing developers to iterate over files and
subdirectories in a clean and readable manner.

To obtain a DirectoryStream, use the
Files.newDirectoryStream(Path dir) method. This method opens the
specified directory and returns a stream-like object that can be used to access
each entry one at a time.

## DirectoryStream listing home directory

The first example lists the user's home directory.

Main.java
  

void main() throws IOException {

    var homeDir = Paths.get(System.getProperty("user.home"));

    try (var paths = Files.newDirectoryStream(homeDir)) {

        paths.forEach(System.out::println);
    }
}

The example lists contents of the user's home directory. 

## DirectoryStream globbing example

We can apply simple globbing operation on a stream of content.
The second parameter of the Files.newDirectoryStream is 
the glob pattern.

Main.java
  

void main() throws IOException {

    var dirName = Paths.get("C:/Users/Jano/Downloads");

    try (var paths = Files.newDirectoryStream(dirName, "*.pdf")) {

        paths.forEach(System.out::println);
    }
}

The example shows all PDF files in the specified directory. 

## DirectoryStream filter example

More complex filtering operations can be applied with
DirectoryStream.Filter.

Main.java
  

void main() throws IOException {

    DirectoryStream.Filter&lt;Path&gt; filter = file -&gt;
            Files.size(file) &lt; 100_000L &amp;&amp; file.toString().endsWith(".jpg");

    var dirName = Paths.get("C:/Users/Jano/Downloads");

    try (var paths = Files.newDirectoryStream(dirName, filter)) {

        paths.forEach(System.out::println);
    }
}

The example shows all JPEG images that are smaller than 100 KB.

## DirectoryStream recursive walking

In the following example, we show how to traverse recursively a directory 
with DirectoryStream.

Main.java
  

List&lt;Path&gt; paths = new ArrayList&lt;&gt;();

List&lt;Path&gt; walk(Path path) throws IOException {

    try (DirectoryStream&lt;Path&gt; stream = Files.newDirectoryStream(path)) {

        for (Path entry : stream) {

            if (Files.isDirectory(entry)) {
                walk(entry);
            }

            paths.add(entry);
        }
    }

    return paths;
}

void main() throws IOException {

    var myPath = Paths.get("C:/Users/Jano/Downloads");
    var paths = walk(myPath);

    paths.forEach(System.out::println);
}

 
The example walks over the directory recursively. It collects all
the entries in a list and prints them out. The walk method
takes a Path object as an argument and returns a list of
Path objects representing the entries in the directory and its
subdirectories.

## Source

[Java DirectoryStream - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/DirectoryStream.html)

In this article we have used Files.newDirectoryStream to list 
the directory contents.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).