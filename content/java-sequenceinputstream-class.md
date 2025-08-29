+++
title = "Java SequenceInputStream Class"
date = 2025-08-29T19:59:31.070+01:00
draft = false
description = "Complete Java SequenceInputStream class tutorial covering all methods with examples. Learn about sequential input operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java SequenceInputStream Class

Last modified: April 16, 2025

 

The java.io.SequenceInputStream class concatenates multiple input
streams into one continuous stream. It reads sequentially from each input stream
until reaching the end, then automatically switches to the next one. This is
useful for combining multiple data sources.

SequenceInputStream extends InputStream and provides
sequential reading functionality. It supports enumeration of streams or a pair of
streams. The class handles stream switching automatically when reaching EOF of
the current stream.

## SequenceInputStream Class Overview

SequenceInputStream provides sequential reading from multiple
streams. Key methods include standard InputStream operations like read, skip,
and close. The class manages the current stream and switches when needed.

public class SequenceInputStream extends InputStream {
    public SequenceInputStream(Enumeration&lt;? extends InputStream&gt; e);
    public SequenceInputStream(InputStream s1, InputStream s2);
    public int read();
    public int read(byte[] b, int off, int len);
    public long skip(long n);
    public int available();
    public void close();
}

The code above shows key methods provided by SequenceInputStream.
The constructors accept either an enumeration of streams or two streams. The
class handles all stream switching and EOF detection automatically.

## Creating a SequenceInputStream with Two Streams

The simplest way to create a SequenceInputStream is with two input streams. The
constructor takes two InputStream objects and reads from the first until EOF,
then switches to the second. Both streams are closed when SequenceInputStream
closes.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.SequenceInputStream;

public class Main {

    public static void main(String[] args) {
        String data1 = "First part of data. ";
        String data2 = "Second part of data.";
        
        try (ByteArrayInputStream stream1 = new ByteArrayInputStream(data1.getBytes());
             ByteArrayInputStream stream2 = new ByteArrayInputStream(data2.getBytes());
             SequenceInputStream seqStream = new SequenceInputStream(stream1, stream2)) {
            
            int byteData;
            while ((byteData = seqStream.read()) != -1) {
                System.out.print((char) byteData);
            }
            
            System.out.println("\nReading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example combines two ByteArrayInputStreams into one SequenceInputStream.
The output shows the concatenated data from both streams. The try-with-resources
statement ensures all streams are properly closed. The SequenceInputStream
handles the transition between streams automatically.

## Creating a SequenceInputStream with Enumeration

For more than two streams, use an Enumeration of InputStreams. The
SequenceInputStream will read each stream in enumeration order until all are
exhausted. This approach is more flexible for combining multiple data sources.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.SequenceInputStream;
import java.util.Collections;
import java.util.Enumeration;
import java.util.Vector;

public class Main {

    public static void main(String[] args) {
        Vector&lt;InputStream&gt; streams = new Vector&lt;&gt;();
        streams.add(new ByteArrayInputStream("First ".getBytes()));
        streams.add(new ByteArrayInputStream("Second ".getBytes()));
        streams.add(new ByteArrayInputStream("Third".getBytes()));
        
        Enumeration&lt;InputStream&gt; en = Collections.enumeration(streams);
        
        try (SequenceInputStream seqStream = new SequenceInputStream(en)) {
            int byteData;
            while ((byteData = seqStream.read()) != -1) {
                System.out.print((char) byteData);
            }
            
            System.out.println("\nAll streams read");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates using an Enumeration to combine three input streams.
The Vector stores the streams, and Collections.enumeration creates the
Enumeration. The SequenceInputStream reads each stream in order. All streams are
closed when the SequenceInputStream closes.

## Reading Bytes into an Array

For better performance, read multiple bytes at once into a byte array. The read
method returns the number of bytes actually read. This works across stream
boundaries in the SequenceInputStream.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.SequenceInputStream;
import java.util.Vector;

public class Main {

    public static void main(String[] args) {
        Vector&lt;ByteArrayInputStream&gt; streams = new Vector&lt;&gt;();
        streams.add(new ByteArrayInputStream("Part1".getBytes()));
        streams.add(new ByteArrayInputStream("Part2".getBytes()));
        streams.add(new ByteArrayInputStream("Part3".getBytes()));
        
        try (SequenceInputStream seqStream = 
                new SequenceInputStream(streams.elements())) {
            
            byte[] buffer = new byte[5];
            int bytesRead;
            
            while ((bytesRead = seqStream.read(buffer)) != -1) {
                System.out.println("Read " + bytesRead + " bytes: " + 
                    new String(buffer, 0, bytesRead));
            }
            
            System.out.println("All data read");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows bulk reading from a SequenceInputStream. The buffer size is 5
bytes, matching each part's length. The read method returns the actual bytes
read, which may be less than the buffer size. The String constructor converts
only the valid portion of the buffer.

## Combining File Streams

SequenceInputStream is particularly useful for combining file streams. This
example reads two files sequentially as if they were one continuous stream. The
approach works with any combination of input streams.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.SequenceInputStream;

public class Main {

    public static void main(String[] args) {
        try (FileInputStream file1 = new FileInputStream("file1.txt");
             FileInputStream file2 = new FileInputStream("file2.txt");
             SequenceInputStream seqStream = new SequenceInputStream(file1, file2)) {
            
            int byteData;
            while ((byteData = seqStream.read()) != -1) {
                System.out.print((char) byteData);
            }
            
            System.out.println("\nBoth files read");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example combines two file input streams into one sequential stream. The
SequenceInputStream reads file1.txt completely before switching to file2.txt.
All streams are closed automatically by the try-with-resources block. This
pattern is useful for processing multiple files as a single unit.

## Skipping Bytes Across Streams

The skip method works across the combined streams in a SequenceInputStream. It
skips bytes from the current stream first, then continues into subsequent
streams if needed. The return value indicates actual bytes skipped.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.SequenceInputStream;
import java.util.Vector;

public class Main {

    public static void main(String[] args) {
        Vector&lt;ByteArrayInputStream&gt; streams = new Vector&lt;&gt;();
        streams.add(new ByteArrayInputStream("1234567890".getBytes()));
        streams.add(new ByteArrayInputStream("ABCDEFGHIJ".getBytes()));
        
        try (SequenceInputStream seqStream = 
                new SequenceInputStream(streams.elements())) {
            
            // Skip first 5 bytes (from first stream)
            long skipped = seqStream.skip(5);
            System.out.println("Skipped " + skipped + " bytes");
            
            // Read next 5 bytes (remaining from first stream)
            byte[] buffer = new byte[5];
            seqStream.read(buffer);
            System.out.println("After skip: " + new String(buffer));
            
            // Skip 3 bytes into second stream
            skipped = seqStream.skip(3);
            System.out.println("Skipped " + skipped + " more bytes");
            
            // Read remaining from second stream
            seqStream.read(buffer);
            System.out.println("Final read: " + new String(buffer));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates skipping across multiple streams. The first skip
operates within the first stream. The second skip crosses into the second
stream. The read operations verify the skip positions. The skip method returns
the actual number of bytes skipped, which may be less than requested.

## Available Bytes in SequenceInputStream

The available method returns bytes available in the current stream without
blocking. It doesn't include bytes from subsequent streams in the sequence. This
behavior is important for understanding stream state.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.SequenceInputStream;
import java.util.Vector;

public class Main {

    public static void main(String[] args) {
        Vector&lt;ByteArrayInputStream&gt; streams = new Vector&lt;&gt;();
        streams.add(new ByteArrayInputStream("Short".getBytes()));
        streams.add(new ByteArrayInputStream("LongerData".getBytes()));
        
        try (SequenceInputStream seqStream = 
                new SequenceInputStream(streams.elements())) {
            
            System.out.println("Initially available: " + 
                seqStream.available() + " bytes");
            
            // Read first stream completely
            byte[] buffer = new byte[10];
            seqStream.read(buffer);
            System.out.println("After first read: " + 
                seqStream.available() + " bytes available");
            
            // Read part of second stream
            seqStream.read(buffer, 0, 3);
            System.out.println("After partial read: " + 
                seqStream.available() + " bytes available");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how available behaves in a SequenceInputStream. Initially, it
reports bytes from the first stream only. After exhausting the first stream, it
reports bytes from the second stream. The available count decreases as data is
read from the current stream.

## Source

[Java SequenceInputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/SequenceInputStream.html)

In this article, we've covered the essential methods and features of the Java
SequenceInputStream class. Understanding these concepts is crucial for working
with sequential I/O operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).