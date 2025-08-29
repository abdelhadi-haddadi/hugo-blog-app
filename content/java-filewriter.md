+++
title = "Java FileWriter"
date = 2025-08-29T19:58:41.962+01:00
draft = false
description = "Java FileWriter tutorial shows how to use FileWriter class to write text to files in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FileWriter

last modified January 27, 2024

 

Java FileWriter tutorial shows how to use FileWriter class to write
text to files in Java.

## Java FileWriter

FileWriter is a Java convenience class for writing text data to
files. FileWriter extends OutputStreamWriter and
creates the FileOutputStream.

## Java FileWriter constructors

These are FileWriter constructors:

- FileWriter(File file) — constructs a FileWriter to a File

- FileWriter(File file, boolean append) — constructs a FileWriter to a File; allows appending mode

- FileWriter(FileDescriptor fd)  — constructs a FileWriter to a FileDescriptor

- FileWriter(File file, Charset charset) — constructs a FileWriter given the File to write and charset

- FileWriter(File file, Charset charset, boolean append) — constructs a FileWriter given the File to write, charset and a boolean indicating whether to append the data written

- FileWriter(String fileName) — constructs a FileWriter to a file name

- FileWriter(String fileName, boolean append) — constructs a FileWriter to a file name; allows appending mode

- FileWriter(String fileName, Charset charset) — constructs a FileWriter given a file name and charset

- FileWriter(String fileName, Charset charset, boolean append) — constructs a FileWriter given a file name, charset and a boolean indicating whether to append the data written

**Note:** In the past, FileWriter relied on the
default platform's encoding. Since Java 11, the issue was corrected. It is
possible now to explicitly specify the encoding. Always specify the encoding
when using FileWriter.

## Java FileWriter example

The following example writes a line to a file.

com/zetcode/JavaFileWriterEx.java
  

package com.zetcode;

import java.io.FileWriter;
import java.io.IOException;

public class JavaFileWriterEx {

    public static void main(String[] args) throws IOException {

        var fileName = "src/resources/myfile.txt";

        try (var fr = new FileWriter(fileName, StandardCharsets.UTF_8)) {

            fr.write("Today is a sunny day");
        }
    }
}

The example writes text data to a file with FileWriter.

try (var fr = new FileWriter(fileName, StandardCharsets.UTF_8)) {

The first parameter of the FileWriter is the file name. The second
is the encoding used. We use try-with-resources construct to clean resources
after we have finished writing.

writer.write("Today is a sunny day");

The FileWriter's write method writes text to the file.

## Java FileWriter append to file

With FileWriter it is possible to append text to a file. The
typical usage for appending is logging.

com/zetcode/JavaFileWritterAppend.java
  

package com.zetcode;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class JavaFileWritterAppend {

    public static void main(String[] args) throws IOException {

        var fileName = "src/resources/myfile.txt";

        try (var fr = new FileWriter(fileName, StandardCharsets.UTF_8, true)) {

            fr.write("Tomorrow will be cloudy.");
        }
    }
}

The code example appends text to file.

try (var fr = new FileWriter(fileName, StandardCharsets.UTF_8, true)) {

The second parameter of FileWriter tells that we will append to the
file.

## Java FileWriter &amp; BufferedWriter

FileWriter's performance can be improved with BufferedWriter.
BufferedWriter writes text to a character-output stream, buffering
characters to improve the performance of writing single characters, arrays, and
strings. The buffer size may be specified, or the default size may be accepted;
the default is large enough for most purposes.

com/zetcode/JavaFileWriterBuffered.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class JavaFileWriterBuffered {

    public static void main(String[] args) throws IOException {

        String text = readText();

        var fileName = "src/resources/wikipedia_home_page.txt";

        try (var fr = new FileWriter(fileName, StandardCharsets.UTF_8);
             var bufWriter = new BufferedWriter(fr)) {

            bufWriter.write(text);
        }
    }

    public static String readText() throws IOException {

        StringBuilder sb;

        var url = new URL("https://www.wikipedia.org");

        try (var br = new BufferedReader(new InputStreamReader(url.openStream(),
                StandardCharsets.UTF_8))) {

            String line;
            sb = new StringBuilder();

            while ((line = br.readLine()) != null) {

                sb.append(line);
                sb.append(System.lineSeparator());
            }
        }

        return sb.toString();
    }
}

In the example, we read Wikipedia's home page (its HTML code) and write it
to a file. The home page is large enough to consider buffering.

try (var fr = new FileWriter(fileName, StandardCharsets.UTF_8);
    var bufWriter = new BufferedWriter(fr)) {

   bufWriter.write(text);
}

The FileWriter is passed to the BufferedWriter
as a parameter. Then we call the BufferedWriter's write
method to write the text.

try (var br = new BufferedReader(new InputStreamReader(url.openStream(),
    StandardCharsets.UTF_8))) {

The reading operation is buffered as well with the BufferedReader class.

## Specifying encoding with pre-Java 11

A workaround with pre-Java 11 FileWriter encoding issue was to use the
OutputStreamWriter and FileOutputStream instead.

com/zetcode/JavaFileOutputStreamEx.java
  

package com.zetcode;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;

public class JavaFileOutputStreamEx {

    public static void main(String[] args) throws IOException {

        String fileName = "src/resources/myfile.txt";

        try (var osw = new OutputStreamWriter(new FileOutputStream(fileName),
                StandardCharsets.UTF_8)) {
            osw.write("Сегодня был прекрасный день.");
        }
    }
}

The example writes text to a file with OutputStreamWriter. The second parameter
is the charset to be used.

## Source

[Java FileWriter - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/FileWriter.html)

In this article we have presented the Java FileWriter class.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).