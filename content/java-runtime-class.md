+++
title = "Java Runtime Class"
date = 2025-08-29T19:59:53.787+01:00
draft = false
description = "Complete Java Runtime class tutorial covering all methods with examples. Learn about exec, freeMemory, totalMemory and other Runtime class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Runtime Class

Last modified: April 13, 2025

 

The java.lang.Runtime class provides access to the Java runtime 
environment. Each Java application has a single instance of Runtime that allows 
the application to interface with the environment in which it is running.

The Runtime class cannot be instantiated directly. Applications must use the 
static getRuntime method to obtain the current runtime instance. 
This class provides methods for memory management, executing processes, and 
other system-related operations.

## Runtime Class Methods

The Runtime class provides several important methods for interacting with the 
Java runtime environment. These include methods for memory management, process 
execution, and system information. The class also provides hooks for shutdown 
operations.

public class Runtime {
    public static Runtime getRuntime() {...}
    public void exit(int status) {...}
    public void addShutdownHook(Thread hook) {...}
    public boolean removeShutdownHook(Thread hook) {...}
    public long freeMemory() {...}
    public long totalMemory() {...}
    public long maxMemory() {...}
    public void gc() {...}
    public Process exec(String command) {...}
    public int availableProcessors() {...}
}

The code above shows the main methods provided by the Runtime class. These 
methods allow Java applications to interact with their runtime environment in 
various ways, from executing system commands to managing memory.

## Getting Runtime Instance

The getRuntime method returns the runtime object associated with 
the current Java application. This is the only way to obtain a Runtime instance 
as the constructor is private.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        
        System.out.println("Runtime instance obtained: " + runtime);
        System.out.println("Available processors: " + 
                         runtime.availableProcessors());
        System.out.println("Free memory: " + runtime.freeMemory() + " bytes");
        System.out.println("Total memory: " + 
                         runtime.totalMemory() + " bytes");
        System.out.println("Max memory: " + runtime.maxMemory() + " bytes");
    }
}

This example demonstrates how to obtain the Runtime instance and use it to get 
basic system information. The availableProcessors method returns 
the number of processors available to the JVM, while the memory methods provide 
information about the current memory state.

## Executing External Processes

The exec method executes the specified string command in a separate 
process. This allows Java applications to interact with the underlying operating 
system by running system commands or other executables.

Main.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {

    public static void main(String[] args) {
        try {
            Runtime runtime = Runtime.getRuntime();
            Process process = runtime.exec("ls -l");
            
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
            int exitCode = process.waitFor();
            System.out.println("\nExited with code: " + exitCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows how to execute a system command (ls -l on Unix 
systems) and read its output. The Process object provides access 
to the input, output, and error streams of the subprocess. The 
waitFor method waits for the process to complete.

## Memory Management

The Runtime class provides several methods for monitoring and managing memory 
usage. These include freeMemory, totalMemory, and 
maxMemory, which report on the current memory state of the JVM.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        
        System.out.println("Initial memory stats:");
        printMemoryStats(runtime);
        
        // Allocate some memory
        byte[] bytes = new byte[2 * 1024 * 1024]; // 2MB
        
        System.out.println("\nAfter allocation:");
        printMemoryStats(runtime);
        
        // Suggest garbage collection
        runtime.gc();
        
        System.out.println("\nAfter GC:");
        printMemoryStats(runtime);
    }
    
    private static void printMemoryStats(Runtime runtime) {
        System.out.println("Free memory: " + runtime.freeMemory() / 1024 + " KB");
        System.out.println("Total memory: " + 
                         runtime.totalMemory() / 1024 + " KB");
        System.out.println("Max memory: " + runtime.maxMemory() / 1024 + " KB");
    }
}

This example demonstrates memory monitoring before and after allocation. The 
gc method suggests that the JVM run garbage collection, though 
this is not guaranteed. Memory values are shown in kilobytes for better 
readability.

## Shutdown Hooks

Shutdown hooks are threads that are initialized but not started. The JVM runs 
them just before shutting down. This mechanism allows for cleanup operations 
when the JVM terminates normally.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        
        Thread shutdownHook = new Thread(() -&gt; {
            System.out.println("Shutdown hook: Performing cleanup...");
            // Simulate cleanup
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("Cleanup complete. Shutting down.");
        });
        
        runtime.addShutdownHook(shutdownHook);
        
        System.out.println("Application running. Press Ctrl+C to exit.");
        
        // Keep application running for demonstration
        try {
            Thread.sleep(60000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

This example adds a shutdown hook that performs cleanup operations before the 
JVM exits. The hook will run when the application terminates normally (either 
by completing or through Ctrl+C). The sleep keeps the application running long 
enough to demonstrate the shutdown hook.

## Forcing JVM Exit

The exit method terminates the currently running Java virtual 
machine by initiating its shutdown sequence. This method never returns 
normally. The argument serves as a status code.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        
        runtime.addShutdownHook(new Thread(() -&gt; {
            System.out.println("Shutdown hook running...");
        }));
        
        System.out.println("Application started");
        
        if (args.length &gt; 0 &amp;&amp; "exit".equals(args[0])) {
            System.out.println("Calling System.exit()");
            runtime.exit(0);
        }
        
        System.out.println("Application ending normally");
    }
}

This example demonstrates the difference between normal termination and forced 
exit. When run with "exit" as an argument, the JVM exits immediately, running 
shutdown hooks but skipping the rest of the main method. Without the argument, 
all code executes normally.

## Running Garbage Collection

The gc method runs the garbage collector. Calling this method 
suggests that the JVM expend effort toward recycling unused objects. However, 
the JVM may ignore this request.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        
        System.out.println("Before allocation:");
        printMemory(runtime);
        
        // Allocate memory
        Object[] objects = new Object[10000];
        for (int i = 0; i &lt; objects.length; i++) {
            objects[i] = new Object();
        }
        
        System.out.println("\nAfter allocation:");
        printMemory(runtime);
        
        // Null references to make objects eligible for GC
        for (int i = 0; i &lt; objects.length; i++) {
            objects[i] = null;
        }
        
        // Suggest garbage collection
        runtime.gc();
        
        System.out.println("\nAfter GC:");
        printMemory(runtime);
    }
    
    private static void printMemory(Runtime runtime) {
        System.out.printf("Free: %d KB, Total: %d KB%n",
                         runtime.freeMemory() / 1024,
                         runtime.totalMemory() / 1024);
    }
}

This example shows memory usage before and after allocation, and after 
suggesting garbage collection. While gc doesn't guarantee 
collection will occur, it often results in memory being reclaimed when objects 
are no longer referenced.

## Source

[Java Runtime Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Runtime.html)

In this article, we've covered the main methods of the Java Runtime class with 
practical examples. These methods provide essential capabilities for interacting 
with the runtime environment, from executing processes to managing memory.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).