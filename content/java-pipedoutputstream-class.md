+++
title = "Java PipedOutputStream Class"
date = 2025-08-29T19:59:27.717+01:00
draft = false
description = "Complete Java PipedOutputStream class tutorial covering all methods with examples. Learn about piped output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java PipedOutputStream Class

Last modified: April 16, 2025

 

The java.io.PipedOutputStream class is used to write data to a pipe
in a producer-consumer scenario. It must be connected to a PipedInputStream
to create a communication channel between threads. Data written to the output
stream can be read from the connected input stream.

PipedOutputStream is typically used for inter-thread communication.
The pipe has a limited buffer size, and writes will block if the buffer is full.
Both ends of the pipe must be in the same process and typically in the same JVM.

## PipedOutputStream Class Overview

PipedOutputStream extends OutputStream and provides
basic pipe writing functionality. Key methods include connecting to an input
stream, writing data, and closing the stream. The class is not thread-safe for
concurrent writes.

public class PipedOutputStream extends OutputStream {
    public PipedOutputStream();
    public PipedOutputStream(PipedInputStream snk);
    public void connect(PipedInputStream snk);
    public void write(int b);
    public void write(byte[] b, int off, int len);
    public void flush();
    public void close();
}

The code above shows key methods provided by PipedOutputStream.
These methods allow writing data to the pipe and managing the connection. The
stream must be properly connected before writing data.

## Creating a PipedOutputStream

PipedOutputStream can be created in two ways: with or without an existing
PipedInputStream. If created without, it must be connected later.
The connection establishes the communication channel between threads.

Main.java
  

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

public class Main {

    public static void main(String[] args) {
        try {
            // Create unconnected output stream
            PipedOutputStream pos1 = new PipedOutputStream();
            System.out.println("Created unconnected PipedOutputStream");
            
            // Create and connect to existing input stream
            PipedInputStream pis = new PipedInputStream();
            PipedOutputStream pos2 = new PipedOutputStream(pis);
            System.out.println("Created connected PipedOutputStream");
            
            pos1.close();
            pos2.close();
            pis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create PipedOutputStream. The first
is unconnected and would need explicit connection later. The second is
pre-connected to an existing PipedInputStream. Always close streams when done.

## Connecting PipedOutputStream to PipedInputStream

The connection between output and input streams can be established either during
creation or later using the connect method. Only one connection is allowed per
stream. Attempting to reconnect throws an IOException.

Main.java
  

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

public class Main {

    public static void main(String[] args) {
        try {
            PipedInputStream pis = new PipedInputStream();
            PipedOutputStream pos = new PipedOutputStream();
            
            // Connect the streams
            pos.connect(pis);
            System.out.println("Streams connected successfully");
            
            // Verify connection
            if (pis.available() == 0) {
                System.out.println("No data in pipe yet");
            }
            
            pos.close();
            pis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to connect PipedOutputStream to PipedInputStream after
creation. The connection must be established before writing data. The available
method checks if data is present in the input stream.

## Writing Data to PipedOutputStream

Once connected, data can be written to the output stream and read from the input
stream. Writes will block if the pipe buffer is full. The pipe has a default
buffer size, but this can be specified when creating the input stream.

Main.java
  

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

public class Main {

    public static void main(String[] args) {
        try {
            PipedInputStream pis = new PipedInputStream();
            PipedOutputStream pos = new PipedOutputStream(pis);
            
            // Write data to the output stream
            String message = "Hello from PipedOutputStream!";
            pos.write(message.getBytes());
            System.out.println("Data written to pipe");
            
            // Read from input stream
            byte[] buffer = new byte[1024];
            int bytesRead = pis.read(buffer);
            System.out.println("Read from pipe: " + 
                new String(buffer, 0, bytesRead));
            
            pos.close();
            pis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates writing data to PipedOutputStream and reading it from
the connected PipedInputStream. The write method accepts byte arrays for bulk
data transfer. The read operation blocks until data is available.

## Inter-Thread Communication with Pipes

Piped streams are commonly used for communication between threads. One thread
writes to the output stream while another reads from the input stream. This
provides a thread-safe way to exchange data.

Main.java
  

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

public class Main {

    public static void main(String[] args) {
        try {
            PipedInputStream pis = new PipedInputStream();
            PipedOutputStream pos = new PipedOutputStream(pis);
            
            // Writer thread
            Thread writer = new Thread(() -&gt; {
                try {
                    for (int i = 1; i &lt;= 5; i++) {
                        String msg = "Message " + i + "\n";
                        pos.write(msg.getBytes());
                        Thread.sleep(500);
                    }
                    pos.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
            
            // Reader thread
            Thread reader = new Thread(() -&gt; {
                try {
                    int data;
                    while ((data = pis.read()) != -1) {
                        System.out.print((char) data);
                    }
                    pis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            
            writer.start();
            reader.start();
            
            writer.join();
            reader.join();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows inter-thread communication using piped streams. The writer
thread sends messages while the reader thread displays them. The pipe
automatically handles synchronization between the threads.

## Handling Large Data with PipedOutputStream

When dealing with large data, it's important to manage the pipe buffer size and
coordinate between producer and consumer. The pipe has limited capacity, so the
producer may block if the consumer isn't reading fast enough.

Main.java
  

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

public class Main {

    public static void main(String[] args) {
        try {
            // Create pipe with larger buffer (10KB)
            PipedInputStream pis = new PipedInputStream(10240);
            PipedOutputStream pos = new PipedOutputStream(pis);
            
            Thread producer = new Thread(() -&gt; {
                try {
                    byte[] data = new byte[4096];
                    for (int i = 0; i &lt; 10; i++) {
                        // Fill buffer with pattern
                        for (int j = 0; j &lt; data.length; j++) {
                            data[j] = (byte) (i + j);
                        }
                        pos.write(data);
                        System.out.println("Produced block " + i);
                    }
                    pos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            
            Thread consumer = new Thread(() -&gt; {
                try {
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    int total = 0;
                    while ((bytesRead = pis.read(buffer)) != -1) {
                        total += bytesRead;
                        System.out.println("Consumed " + bytesRead + 
                            " bytes (total: " + total + ")");
                    }
                    pis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            
            producer.start();
            consumer.start();
            
            producer.join();
            consumer.join();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates handling larger data volumes with a custom buffer size.
The producer creates 4KB blocks while the consumer reads in 1KB chunks. The
larger pipe buffer helps prevent blocking during data transfer.

## Error Handling with PipedOutputStream

Proper error handling is crucial when working with piped streams. Common issues
include broken pipes, connection failures, and interrupted threads. Always close
streams in finally blocks or use try-with-resources.

Main.java
  

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

public class Main {

    public static void main(String[] args) {
        PipedInputStream pis = null;
        PipedOutputStream pos = null;
        
        try {
            pis = new PipedInputStream();
            pos = new PipedOutputStream();
            
            // Attempt to write before connecting
            try {
                pos.write("Test".getBytes());
            } catch (IOException e) {
                System.out.println("Expected error: " + e.getMessage());
            }
            
            // Connect properly
            pos.connect(pis);
            
            // Start reader thread
            Thread reader = new Thread(() -&gt; {
                try {
                    byte[] buffer = new byte[100];
                    int bytes = pis.read(buffer);
                    System.out.println("Read: " + new String(buffer, 0, bytes));
                } catch (IOException e) {
                    System.out.println("Reader error: " + e.getMessage());
                }
            });
            reader.start();
            
            // Write data
            pos.write("Successful communication".getBytes());
            pos.flush();
            
            reader.join();
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (pos != null) pos.close();
                if (pis != null) pis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

This example demonstrates proper error handling with piped streams. It shows what
happens when writing to an unconnected pipe and includes proper cleanup in a
finally block. The reader thread handles potential IOExceptions during reading.

## Source

[Java PipedOutputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/PipedOutputStream.html)

In this article, we've covered the essential methods and features of the Java
PipedOutputStream class. Understanding these concepts is crucial for working
with inter-thread communication in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).