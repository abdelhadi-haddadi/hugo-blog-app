+++
title = "Java InterruptedIOException Class"
date = 2025-08-29T19:59:19.853+01:00
draft = false
description = "Complete Java InterruptedIOException class tutorial covering all methods with examples. Learn about interrupted I/O operations in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java InterruptedIOException Class

Last modified: April 16, 2025

 

The java.io.InterruptedIOException signals that an I/O operation
has been interrupted. It's thrown when a thread performing I/O is interrupted.
This exception extends IOException and includes bytesTransferred
field.

InterruptedIOException typically occurs during blocking I/O
operations. The bytesTransferred field indicates how much data was transferred
before interruption. This helps applications resume operations from where they
were interrupted.

## InterruptedIOException Class Overview

InterruptedIOException is a checked exception in Java's I/O system.
It contains a public field bytesTransferred that tracks partial transfer counts.
The class is used by various I/O classes like Socket and URLConnection.

public class InterruptedIOException extends IOException {
    public int bytesTransferred = 0;
    public InterruptedIOException();
    public InterruptedIOException(String s);
}

The code above shows the structure of InterruptedIOException. The
bytesTransferred field is public and can be accessed directly. Two constructors
allow creating exceptions with or without a message.

## Basic InterruptedIOException Example

This example demonstrates catching an InterruptedIOException during
a network operation. We simulate an interruption by creating and interrupting a
thread manually.

Main.java
  

import java.io.*;
import java.net.*;

public class Main {

    public static void main(String[] args) {
        Thread ioThread = new Thread(() -&gt; {
            try {
                URL url = new URL("http://example.com");
                URLConnection conn = url.openConnection();
                InputStream in = conn.getInputStream();
                
                byte[] buffer = new byte[1024];
                int bytesRead = in.read(buffer);
                System.out.println("Read " + bytesRead + " bytes");
                
                in.close();
            } catch (InterruptedIOException e) {
                System.out.println("I/O interrupted after " + 
                    e.bytesTransferred + " bytes");
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        
        ioThread.start();
        ioThread.interrupt(); // Simulate interruption
    }
}

This example creates a thread that attempts to read from a URL. The thread is
interrupted immediately, which may cause an InterruptedIOException.
The catch block handles the exception and reports bytes transferred.

## Handling Socket Timeout with InterruptedIOException

Socket operations can throw InterruptedIOException when timing out.
This example shows how to handle such cases in client-server communication.

Main.java
  

import java.io.*;
import java.net.*;

public class Main {

    public static void main(String[] args) {
        try {
            Socket socket = new Socket();
            socket.setSoTimeout(1000); // Set 1 second timeout
            
            // This will timeout and throw InterruptedIOException
            socket.connect(new InetSocketAddress("example.com", 80));
            
        } catch (InterruptedIOException e) {
            System.out.println("Socket operation timed out after " + 
                e.bytesTransferred + " bytes transferred");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates socket timeout handling. The setSoTimeout
method sets a 1-second timeout. If the connection isn't established in time, an
InterruptedIOException is thrown, which we catch and handle.

## Resuming Interrupted File Transfer

This example shows how to resume a file transfer after an interruption using the
bytesTransferred field of InterruptedIOException.

Main.java
  

import java.io.*;
import java.util.Random;

public class Main {

    public static void main(String[] args) {
        Random random = new Random();
        File source = new File("source.dat");
        File dest = new File("dest.dat");
        
        try (InputStream in = new FileInputStream(source);
             OutputStream out = new FileOutputStream(dest)) {
            
            byte[] buffer = new byte[1024];
            int totalRead = 0;
            
            while (true) {
                try {
                    int bytesRead = in.read(buffer);
                    if (bytesRead == -1) break;
                    
                    out.write(buffer, 0, bytesRead);
                    totalRead += bytesRead;
                    
                    // Simulate random interruption
                    if (random.nextInt(100) &lt; 5) {
                        throw new InterruptedIOException();
                    }
                } catch (InterruptedIOException e) {
                    System.out.println("Transfer interrupted at " + 
                        totalRead + " bytes. Resuming...");
                }
            }
            
            System.out.println("Transfer completed: " + totalRead + " bytes");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example simulates a file transfer that might get interrupted. When an
interruption occurs, the transfer resumes from where it left off. The
bytesTransferred field isn't used here as we track progress manually.

## Custom InterruptedIOException Handling

This example demonstrates creating a custom handler for
InterruptedIOException that implements retry logic with backoff.

Main.java
  

import java.io.*;
import java.net.*;

public class Main {

    public static void main(String[] args) {
        int maxRetries = 3;
        int retryCount = 0;
        long backoffTime = 1000; // 1 second
        
        while (retryCount &lt; maxRetries) {
            try {
                URL url = new URL("http://example.com/largefile");
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                
                try (InputStream in = conn.getInputStream()) {
                    byte[] buffer = new byte[8192];
                    int bytesRead;
                    
                    while ((bytesRead = in.read(buffer)) != -1) {
                        // Process data here
                    }
                    
                    System.out.println("Download completed successfully");
                    break;
                }
            } catch (InterruptedIOException e) {
                retryCount++;
                System.out.println("Attempt " + retryCount + " interrupted after " +
                    e.bytesTransferred + " bytes. Retrying in " + 
                    (backoffTime/1000) + " seconds...");
                
                try {
                    Thread.sleep(backoffTime);
                    backoffTime *= 2; // Exponential backoff
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    break;
                }
            } catch (IOException e) {
                e.printStackTrace();
                break;
            }
        }
        
        if (retryCount &gt;= maxRetries) {
            System.out.println("Max retries reached. Operation failed.");
        }
    }
}

This example implements a robust downloader with retry logic. When an
InterruptedIOException occurs, it waits and retries with
exponential backoff. The bytesTransferred field helps track progress between
retries.

## InterruptedIOException in Multi-threaded Environment

This example shows how InterruptedIOException can occur in
multi-threaded applications and how to handle it properly.

Main.java
  

import java.io.*;
import java.net.*;
import java.util.concurrent.*;

public class Main {

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        Future future = executor.submit(() -&gt; {
            try {
                ServerSocket server = new ServerSocket(8080);
                System.out.println("Server started");
                
                while (!Thread.currentThread().isInterrupted()) {
                    try {
                        Socket client = server.accept();
                        System.out.println("Client connected");
                        
                        InputStream in = client.getInputStream();
                        byte[] buffer = new byte[1024];
                        int bytesRead;
                        
                        while ((bytesRead = in.read(buffer)) != -1) {
                            // Process client data
                        }
                        
                        client.close();
                    } catch (InterruptedIOException e) {
                        System.out.println("Accept interrupted");
                        break;
                    }
                }
                
                server.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        
        try {
            Thread.sleep(2000);
            future.cancel(true); // Interrupt the server thread
            executor.shutdown();
            executor.awaitTermination(1, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

This example demonstrates a server that can be interrupted gracefully. The
accept method may throw InterruptedIOException when
the thread is interrupted. We catch this exception to clean up resources properly.

## InterruptedIOException with NIO Channels

While NIO channels typically use different interruption mechanisms, some
operations can still throw InterruptedIOException. This example
shows such a case.

Main.java
  

import java.io.*;
import java.net.*;
import java.nio.channels.*;

public class Main {

    public static void main(String[] args) {
        try {
            SocketChannel channel = SocketChannel.open();
            channel.configureBlocking(true);
            
            Thread interruptThread = new Thread(() -&gt; {
                try {
                    Thread.sleep(1000);
                    channel.close(); // Force interruption
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
            
            interruptThread.start();
            
            try {
                channel.connect(new InetSocketAddress("example.com", 80));
            } catch (InterruptedIOException e) {
                System.out.println("Channel connection interrupted");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how closing a channel during a blocking operation can cause
an InterruptedIOException. We start a separate thread to close the
channel after a delay, which interrupts the connection attempt.

## Source

[Java InterruptedIOException Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/InterruptedIOException.html)

In this article, we've covered the essential aspects of the Java
InterruptedIOException class. Understanding this exception is
crucial for building robust I/O operations that can handle interruptions
gracefully.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).