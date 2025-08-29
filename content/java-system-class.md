+++
title = "Java System Class"
date = 2025-08-29T19:59:57.289+01:00
draft = false
description = "Complete Java System class tutorial covering all methods with examples. Learn about currentTimeMillis, getProperty, arraycopy and other System class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java System Class

Last modified: April 13, 2025

 

The java.lang.System class provides system-level functionality
including standard input, output, error streams, and access to system properties.
It contains useful class fields and methods that cannot be instantiated.

The System class is final and all its methods are static, making them accessible
without creating an instance. It provides methods for environment variables,
current time measurement, array copying, and system property access.

## System Class Methods

The System class provides several important static methods for interacting with
the system environment. These include methods for I/O operations, property
access, time measurement, and array operations. The class cannot be instantiated.

public final class System {
    public static final PrintStream out;
    public static final PrintStream err;
    public static final InputStream in;
    
    public static long currentTimeMillis() {...}
    public static long nanoTime() {...}
    public static void arraycopy(Object src, int srcPos, 
                               Object dest, int destPos, int length) {...}
    public static String getProperty(String key) {...}
    public static String getenv(String name) {...}
    public static void exit(int status) {...}
    public static void gc() {...}
}

The code above shows key fields and methods of the System class. These utilities
are fundamental for various system operations in Java applications.

## Standard I/O Streams

The System class provides three standard I/O streams: in,
out, and err. These are used for reading input and
writing output and error messages. They can be redirected if needed.

Main.java
  

package com.zetcode;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        // Using standard output stream
        System.out.println("This is standard output");
        
        // Using standard error stream
        System.err.println("This is standard error");
        
        // Using standard input stream
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name);
        
        scanner.close();
    }
}

This example demonstrates the three standard streams. System.out
prints to standard output, System.err to standard error, and
System.in reads from standard input using a Scanner.

## currentTimeMillis and nanoTime

The currentTimeMillis and nanoTime methods provide
time measurement capabilities. currentTimeMillis returns the
current time in milliseconds, while nanoTime provides nanosecond
precision for measuring elapsed time.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Using currentTimeMillis for wall-clock time
        long startTime = System.currentTimeMillis();
        
        // Using nanoTime for high-resolution timing
        long nanoStart = System.nanoTime();
        
        // Perform some operation
        long sum = 0;
        for (int i = 0; i &lt; 1000000; i++) {
            sum += i;
        }
        
        long nanoEnd = System.nanoTime();
        long endTime = System.currentTimeMillis();
        
        System.out.println("Sum: " + sum);
        System.out.println("Elapsed time (ms): " + (endTime - startTime));
        System.out.println("Elapsed time (ns): " + (nanoEnd - nanoStart));
    }
}

This example shows both timing methods. currentTimeMillis is good
for wall-clock time measurements, while nanoTime provides more
precise timing for performance measurements. Note that nanoTime values are
meaningful only for elapsed time calculations.

## arraycopy Method

The arraycopy method provides an efficient way to copy data between
arrays. It's a native method that's typically faster than manual array copying
using loops. The method handles overlapping source and destination arrays.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        int[] source = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int[] destination = new int[10];
        
        // Copy entire array
        System.arraycopy(source, 0, destination, 0, source.length);
        System.out.println("Full copy: " + java.util.Arrays.toString(destination));
        
        // Copy partial array
        int[] partialDest = new int[5];
        System.arraycopy(source, 2, partialDest, 0, 5);
        System.out.println("Partial copy: " + java.util.Arrays.toString(partialDest));
        
        // Overlapping copy
        System.arraycopy(source, 0, source, 3, 4);
        System.out.println("Overlapping copy: " + java.util.Arrays.toString(source));
    }
}

This example demonstrates three uses of arraycopy: full array copy,
partial copy, and overlapping copy. The method is efficient and handles all
cases correctly, including when source and destination arrays are the same.

## getProperty and getProperties

The getProperty and getProperties methods provide
access to system properties. These include information about the Java runtime,
operating system, user configuration, and more. Properties can be set at
startup.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Get single property
        String javaVersion = System.getProperty("java.version");
        String osName = System.getProperty("os.name");
        
        System.out.println("Java version: " + javaVersion);
        System.out.println("OS name: " + osName);
        
        // Get all properties
        System.out.println("\nAll system properties:");
        java.util.Properties props = System.getProperties();
        props.list(System.out);
        
        // Set and get custom property
        System.setProperty("custom.property", "example.value");
        System.out.println("\nCustom property: " + 
                         System.getProperty("custom.property"));
    }
}

This example shows how to access system properties. We retrieve specific
properties, list all properties, and demonstrate setting a custom property.
System properties are useful for configuration and environment detection.

## getenv Method

The getenv method provides access to environment variables from the
system. These variables are typically set in the operating system shell and are
available to all processes. The method can access specific variables or all.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Get specific environment variable
        String path = System.getenv("PATH");
        String home = System.getenv("HOME");
        
        System.out.println("PATH: " + path);
        System.out.println("HOME: " + home);
        
        // Get all environment variables
        System.out.println("\nAll environment variables:");
        java.util.Map&lt;String, String&gt; env = System.getenv();
        for (String key : env.keySet()) {
            System.out.println(key + "=" + env.get(key));
        }
    }
}

This example demonstrates accessing environment variables. We show how to get
specific variables like PATH and HOME, and how to list all environment
variables. Environment variables are useful for system configuration.

## exit and gc Methods

The exit method terminates the currently running Java Virtual
Machine, while gc suggests that the JVM run garbage collection.
exit should be used with caution as it stops all program threads.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Demonstrate garbage collection
        Runtime runtime = Runtime.getRuntime();
        System.out.println("Before GC - Free memory: " + runtime.freeMemory());
        
        System.gc(); // Suggest garbage collection
        
        System.out.println("After GC - Free memory: " + runtime.freeMemory());
        
        // Demonstrate exit
        System.out.println("Program running...");
        System.exit(0); // Normal termination
        System.out.println("This won't be printed");
    }
}

This example shows gc suggesting garbage collection (note that the
JVM may ignore this request), and exit terminating the program.
The exit status code (0 here) conventionally indicates success (non-zero means
error).

## Source

[Java System Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html)

In this article, we've covered the essential methods of the Java System class
with practical examples. These utilities are fundamental for system interaction
in Java applications, from I/O operations to environment access and timing.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).