+++
title = "Java IOError Class"
date = 2025-08-29T19:59:20.966+01:00
draft = false
description = "Complete Java IOError class tutorial covering all methods with examples. Learn about I/O error handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java IOError Class

Last modified: April 16, 2025

 

The java.io.IOError class represents a serious I/O error that cannot
be recovered from. It extends Error and is thrown when an I/O
operation fails catastrophically. Unlike IOException, it indicates
unrecoverable failures.

IOError is typically thrown when the JVM encounters severe I/O
problems like disk failures or network outages. It's unchecked, meaning it
doesn't need to be declared in method signatures. Applications should generally
not catch this error.

## IOError Class Overview

IOError is a simple class with minimal methods. Its main purpose is
to wrap the underlying IOException that caused the failure. The
class provides standard error functionality inherited from Error.

public class IOError extends Error {
    public IOError(Throwable cause);
    public Throwable getCause();
}

The code above shows the complete API of IOError. The constructor
takes a Throwable (usually an IOException) as cause.
The getCause method retrieves the original exception.

## Basic IOError Example

This example demonstrates how an IOError might be thrown in a real
scenario. We simulate a catastrophic disk failure during file reading. The error
propagates up the call stack.

Main.java
  

import java.io.IOError;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            readCriticalFile();
        } catch (IOError e) {
            System.err.println("Critical I/O failure occurred:");
            e.printStackTrace();
            System.exit(1);
        }
    }

    static void readCriticalFile() {
        try {
            // Simulate catastrophic I/O failure
            throw new IOException("Disk head crash - data unrecoverable");
        } catch (IOException e) {
            // Wrap in IOError to indicate unrecoverable state
            throw new IOError(e);
        }
    }
}

This example shows the typical pattern of converting an IOException
to IOError. The main method catches the error and handles it at the
top level. In real applications, such errors often require process termination.

## Handling IOError in File Operations

This example demonstrates how IOError might occur during file
operations. We create a method that reads a configuration file and handles both
recoverable and unrecoverable errors differently.

Main.java
  

import java.io.IOError;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Main {

    public static void main(String[] args) {
        try {
            String config = readConfigFile("config.cfg");
            System.out.println("Config loaded: " + config);
        } catch (IOError e) {
            System.err.println("FATAL: Cannot read critical config file");
            System.exit(1);
        } catch (IOException e) {
            System.err.println("Warning: Using default configuration");
        }
    }

    static String readConfigFile(String path) throws IOException {
        try {
            return new String(Files.readAllBytes(Paths.get(path)));
        } catch (IOException e) {
            if (isCriticalFailure(e)) {
                throw new IOError(e);
            }
            throw e;
        }
    }

    static boolean isCriticalFailure(IOException e) {
        // Check if error is truly unrecoverable
        return e.getMessage() != null 
            &amp;&amp; e.getMessage().contains("Permission denied");
    }
}

This example shows differentiated error handling. Regular I/O issues throw
IOException, while critical failures throw IOError.
The isCriticalFailure method determines which errors are fatal.

## IOError in Network Operations

Network operations can also throw IOError when facing unrecoverable
failures. This example simulates a network connection failure that warrants an
IOError.

Main.java
  

import java.io.IOError;
import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;

public class Main {

    public static void main(String[] args) {
        try {
            connectToServer("example.com", 8080);
        } catch (IOError e) {
            System.err.println("Network subsystem failure:");
            e.getCause().printStackTrace();
            System.exit(1);
        }
    }

    static void connectToServer(String host, int port) {
        try {
            // Simulate network hardware failure
            throw new IOException("Network adapter not functioning");
        } catch (IOException e) {
            throw new IOError(e);
        }
    }
}

This example demonstrates network-related IOError usage. The
simulated network adapter failure is treated as unrecoverable. The main method
prints the underlying cause before exiting.

## Custom IOError Subclass

For more specific error handling, you can create custom IOError
subclasses. This example shows a disk failure-specific error class with
additional diagnostic information.

Main.java
  

import java.io.IOError;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            accessStorageDevice();
        } catch (DiskFailureError e) {
            System.err.println("Disk failure on device: " + e.getDevice());
            System.err.println("Sector: " + e.getBadSector());
            e.printStackTrace();
        }
    }

    static void accessStorageDevice() {
        try {
            // Simulate disk failure
            throw new IOException("Sector 2048 unreadable");
        } catch (IOException e) {
            throw new DiskFailureError("/dev/sda", 2048, e);
        }
    }
}

class DiskFailureError extends IOError {
    private final String device;
    private final int badSector;

    public DiskFailureError(String device, int badSector, IOException cause) {
        super(cause);
        this.device = device;
        this.badSector = badSector;
    }

    public String getDevice() {
        return device;
    }

    public int getBadSector() {
        return badSector;
    }
}

This example creates a custom DiskFailureError subclass. It adds
device and sector information to the standard IOError. The main
method uses this extra information for more detailed error reporting.

## IOError in Resource Loading

Loading critical resources can throw IOError when failures are
unrecoverable. This example shows resource loading with proper error handling.

Main.java
  

import java.io.IOError;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Main {

    public static void main(String[] args) {
        try {
            loadCriticalResource("security.cert");
        } catch (IOError e) {
            System.err.println("Cannot load security certificate:");
            System.err.println(e.getCause().getMessage());
            System.exit(1);
        }
    }

    static void loadCriticalResource(String path) {
        try (InputStream is = Files.newInputStream(Paths.get(path))) {
            // Process the resource
            System.out.println("Resource loaded successfully");
        } catch (IOException e) {
            throw new IOError(e);
        }
    }
}

This example demonstrates IOError usage for critical resource
loading. The security certificate is essential for the application, so its
failure to load warrants an IOError. The try-with-resources ensures
proper stream management.

## IOError vs IOException

This example contrasts IOError with regular IOException
handling. It shows when each type of error is appropriate in a file copying
scenario.

Main.java
  

import java.io.IOError;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {

    public static void main(String[] args) {
        try {
            copyFile("source.txt", "destination.txt");
        } catch (IOError e) {
            System.err.println("Fatal storage error during copy:");
            e.printStackTrace();
            System.exit(1);
        } catch (IOException e) {
            System.err.println("File copy failed, but retry possible:");
            e.printStackTrace();
        }
    }

    static void copyFile(String src, String dest) throws IOException {
        Path source = Paths.get(src);
        Path target = Paths.get(dest);
        
        try {
            Files.copy(source, target);
        } catch (IOException e) {
            if (isStorageFailure(e)) {
                throw new IOError(e);
            }
            throw e;
        }
    }

    static boolean isStorageFailure(IOException e) {
        return e.getMessage() != null 
            &amp;&amp; (e.getMessage().contains("device error")
                || e.getMessage().contains("sector not found"));
    }
}

This example shows differentiated error handling in file operations. Regular file
issues throw IOException, while hardware failures throw
IOError. The isStorageFailure method helps decide
which error type to use.

## Source

[Java IOError Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/IOError.html)

In this article, we've covered the essential aspects of the Java IOError class.
Understanding when to use IOError versus IOException is crucial for proper error
handling in Java applications dealing with I/O operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).