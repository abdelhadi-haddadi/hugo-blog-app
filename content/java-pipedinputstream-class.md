+++
title = "Java PipedInputStream Class"
date = 2025-08-29T19:59:27.730+01:00
draft = false
description = "Complete Java PipedInputStream class tutorial covering all methods with examples. Learn about inter-thread communication in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java PipedInputStream Class

Last modified: April 16, 2025

 

The java.io.PipedInputStream class is a specialized input stream that
can be connected to a PipedOutputStream. It creates a communication
pipe between two threads, allowing one thread to write data that another thread
can read.

PipedInputStream is typically used for inter-thread communication.
The pipe has a limited buffer size, and writes will block if the buffer is full.
Similarly, reads will block if no data is available. Both streams must be
connected to work properly.

## PipedInputStream Class Overview

PipedInputStream extends InputStream and provides
pipe-based input operations. It must be connected to a PipedOutputStream
either at construction or later. The default pipe size is 1024 bytes.

public class PipedInputStream extends InputStream {
    public PipedInputStream();
    public PipedInputStream(int pipeSize);
    public PipedInputStream(PipedOutputStream src);
    public PipedInputStream(PipedOutputStream src, int pipeSize);
    public void connect(PipedOutputStream src);
    public synchronized int read();
    public synchronized int read(byte[] b, int off, int len);
    public synchronized int available();
    public void close();
}

The code above shows key methods provided by PipedInputStream.
These methods allow for reading data from a connected output stream. The class
is thread-safe for concurrent access from multiple threads.

## Creating a PipedInputStream

PipedInputStream can be created in several ways - with or without connection to
a PipedOutputStream. The pipe size can be specified or left as default. Always
ensure proper connection before use.

Main.java
  

import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Create unconnected pipe
            PipedInputStream pis1 = new PipedInputStream();
            
            // Create with default pipe size (connected)
            PipedOutputStream pos1 = new PipedOutputStream();
            PipedInputStream pis2 = new PipedInputStream(pos1);
            
            // Create with custom pipe size (4KB)
            PipedOutputStream pos2 = new PipedOutputStream();
            PipedInputStream pis3 = new PipedInputStream(pos2, 4096);
            
            System.out.println("Created three PipedInputStream instances");
            
            pis1.close();
            pis2.close();
            pis3.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create PipedInputStream. The first
creates an unconnected pipe, while others connect during construction. Always
close streams when done to release resources. The connected output streams are
not automatically closed.

## Basic Pipe Communication

This example shows the basic usage of PipedInputStream with PipedOutputStream.
One thread writes data while another reads it. The pipe automatically handles
synchronization between threads.

Main.java
  

import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            PipedOutputStream pos = new PipedOutputStream();
            PipedInputStream pis = new PipedInputStream(pos);
            
            // Writer thread
            new Thread(() -&gt; {
                try {
                    pos.write("Hello from pipe!".getBytes());
                    pos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
            // Reader thread
            new Thread(() -&gt; {
                try {
                    int data;
                    while ((data = pis.read()) != -1) {
                        System.out.print((char) data);
                    }
                    pis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates basic inter-thread communication using pipes. The
writer thread sends data through PipedOutputStream. The reader thread receives
it through PipedInputStream. Both streams must be properly closed after use.

## Reading Bytes into an Array

For better performance, read multiple bytes at once into a byte array. This
reduces method calls and improves efficiency. The read method returns the
number of bytes actually read.

Main.java
  

import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            PipedOutputStream pos = new PipedOutputStream();
            PipedInputStream pis = new PipedInputStream(pos, 2048);
            
            // Writer thread
            new Thread(() -&gt; {
                try {
                    for (int i = 0; i &lt; 100; i++) {
                        pos.write(("Data " + i + "\n").getBytes());
                    }
                    pos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
            // Reader thread
            new Thread(() -&gt; {
                try {
                    byte[] buffer = new byte[50];
                    int bytesRead;
                    
                    while ((bytesRead = pis.read(buffer)) != -1) {
                        System.out.print(new String(buffer, 0, bytesRead));
                    }
                    pis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows bulk reading from a pipe into a byte array. The writer sends
100 lines of data. The reader processes data in chunks of 50 bytes. The pipe
size is set to 2048 bytes to accommodate larger data transfers.

## Checking Available Bytes

The available method returns the number of bytes that can be read without
blocking. This is useful for checking if data is ready to be read from the pipe.

Main.java
  

import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            PipedOutputStream pos = new PipedOutputStream();
            PipedInputStream pis = new PipedInputStream(pos);
            
            // Writer thread
            new Thread(() -&gt; {
                try {
                    System.out.println("Writer: Sending data...");
                    pos.write("Sample data".getBytes());
                    Thread.sleep(2000); // Simulate delay
                    pos.write("More data".getBytes());
                    pos.close();
                } catch (IOException | InterruptedException e) {
                    e.printStackTrace();
                }
            }).start();
            
            // Reader thread
            new Thread(() -&gt; {
                try {
                    while (true) {
                        int available = pis.available();
                        if (available &gt; 0) {
                            byte[] data = new byte[available];
                            pis.read(data);
                            System.out.println("Reader: Got " + 
                                new String(data));
                        }
                        if (available == -1) break;
                        Thread.sleep(500);
                    }
                    pis.close();
                } catch (IOException | InterruptedException e) {
                    e.printStackTrace();
                }
            }).start();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates checking available bytes in the pipe. The writer sends
data in two parts with a delay. The reader periodically checks for available
data. This approach is useful when you want to avoid blocking reads.

## Connecting Streams After Creation

PipedInputStream can be connected to PipedOutputStream after creation using the
connect method. Both streams must be unconnected when calling this method.

Main.java
  

import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            PipedInputStream pis = new PipedInputStream();
            PipedOutputStream pos = new PipedOutputStream();
            
            // Connect them after creation
            pis.connect(pos);
            
            // Writer thread
            new Thread(() -&gt; {
                try {
                    pos.write("Data sent through connected pipes".getBytes());
                    pos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
            // Reader thread
            new Thread(() -&gt; {
                try {
                    int data;
                    while ((data = pis.read()) != -1) {
                        System.out.print((char) data);
                    }
                    System.out.println();
                    pis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to connect streams after creation. The connect method
establishes the pipe between existing streams. Both streams must be in an
unconnected state for this to work. The communication works the same as with
constructor-based connection.

## Handling Pipe Disconnection

When a pipe is broken (writer closes without reader finishing), an IOException
occurs. Proper error handling ensures robust inter-thread communication.

Main.java
  

import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            PipedOutputStream pos = new PipedOutputStream();
            PipedInputStream pis = new PipedInputStream(pos);
            
            // Writer thread (closes immediately)
            new Thread(() -&gt; {
                try {
                    pos.write("Partial data".getBytes());
                    pos.close(); // Closes before reader finishes
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
            // Reader thread (slow reader)
            new Thread(() -&gt; {
                try {
                    Thread.sleep(1000); // Delay reading
                    int data;
                    while ((data = pis.read()) != -1) {
                        System.out.print((char) data);
                        Thread.sleep(500); // Slow processing
                    }
                    pis.close();
                } catch (IOException | InterruptedException e) {
                    System.err.println("Pipe error: " + e.getMessage());
                }
            }).start();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates pipe disconnection handling. The writer closes before
the reader finishes processing. The reader gets an IOException when trying to
read from the broken pipe. Proper error handling prevents application crashes.

## Source

[Java PipedInputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/PipedInputStream.html)

In this article, we've covered the essential methods and features of the Java
PipedInputStream class. Understanding these concepts is crucial for working
with inter-thread communication in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).