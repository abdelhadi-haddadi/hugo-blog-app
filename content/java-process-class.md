+++
title = "Java Process Class"
date = 2025-08-29T19:59:52.655+01:00
draft = false
description = "Complete Java Process class tutorial covering all methods with examples. Learn about process execution, input/output streams, and process control."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Process Class

Last modified: April 13, 2025

 

The java.lang.Process class provides methods for interacting with
system processes. It allows Java programs to start, control, and communicate
with native operating system processes. This is essential for system-level
programming.

Process objects are created by Runtime.exec or
ProcessBuilder.start methods. They represent native processes
running externally to the Java Virtual Machine. The class provides methods to
get input/output streams, wait for completion, and check exit status.

## Process Class Methods

The Process class provides several methods for process management. These include
methods for I/O stream access, process termination, and status checking. The
class is abstract, with platform-specific implementations provided by the JVM.

public abstract class Process {
    public abstract OutputStream getOutputStream();
    public abstract InputStream getInputStream();
    public abstract InputStream getErrorStream();
    public abstract int waitFor() throws InterruptedException;
    public abstract int exitValue();
    public abstract void destroy();
    public Process destroyForcibly();
    public boolean isAlive();
    public boolean waitFor(long timeout, TimeUnit unit);
}

The code above shows the main methods provided by the Process class. These
methods allow control over external processes and communication through standard
streams. Modern Java versions have added more methods for better process control.

## Basic Process Execution

This example demonstrates how to execute a simple system command and wait for
its completion. We use Runtime.getRuntime().exec to start the
process. The waitFor method blocks until the process completes.

Main.java
  

package com.zetcode;

import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Execute a system command
            Process process = Runtime.getRuntime().exec("notepad.exe");
            
            // Wait for the process to complete
            int exitCode = process.waitFor();
            
            System.out.println("Process exited with code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

In this example, we launch Windows Notepad and wait for it to close. The
waitFor method returns the exit code of the process. Note that
this is a blocking call - the Java program will wait until Notepad is closed.

## Reading Process Output

This example shows how to read the output of a process. We execute a command
that produces output and read it through the process's input stream. This is
essential for capturing command results.

Main.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class Main {

    public static void main(String[] args) {
        try {
            // Execute a command that produces output
            Process process = Runtime.getRuntime().exec("cmd /c dir");
            
            // Get the input stream of the process
            InputStream inputStream = process.getInputStream();
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(inputStream));
            
            // Read the output line by line
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
            // Close resources
            reader.close();
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

Here we execute the Windows dir command and read its output. The
process's standard output is available via getInputStream. We
wrap this in a BufferedReader for efficient line-by-line reading. Always close
streams when done to prevent resource leaks.

## Handling Process Errors

This example demonstrates reading error output from a process. Error output is
available through a separate stream obtained via getErrorStream.
Proper error handling is crucial for robust process management.

Main.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class Main {

    public static void main(String[] args) {
        try {
            // Execute a command that might produce errors
            Process process = Runtime.getRuntime().exec("cmd /c dir nonexistent");
            
            // Read standard output
            readStream(process.getInputStream(), "OUTPUT");
            
            // Read error output
            readStream(process.getErrorStream(), "ERROR");
            
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    private static void readStream(InputStream inputStream, String type) 
            throws IOException {
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(inputStream));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(type + ": " + line);
        }
        reader.close();
    }
}

In this example, we attempt to list a nonexistent directory, which generates
error output. We read both standard output and error streams separately. The
error stream typically contains diagnostic messages when a command fails. Both
streams should always be read to prevent process hangs.

## Writing to Process Input

This example shows how to write data to a process's input stream. Some programs
accept input through their standard input. We demonstrate this by communicating
with a Python interpreter.

Main.java
  

package com.zetcode;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;

public class Main {

    public static void main(String[] args) {
        try {
            // Start Python interpreter
            Process process = Runtime.getRuntime().exec("python");
            
            // Get the output stream to write to the process
            OutputStream outputStream = process.getOutputStream();
            BufferedWriter writer = new BufferedWriter(
                new OutputStreamWriter(outputStream));
            
            // Write Python commands to the process
            writer.write("print(2 + 3)\n");
            writer.write("exit()\n");
            writer.flush();
            
            // Read the output
            readStream(process.getInputStream(), "PYTHON OUTPUT");
            
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    private static void readStream(java.io.InputStream inputStream, String type) 
            throws IOException {
        java.io.BufferedReader reader = new java.io.BufferedReader(
            new java.io.InputStreamReader(inputStream));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(type + ": " + line);
        }
        reader.close();
    }
}

Here we start a Python interpreter and send it commands through its standard
input. We obtain the output stream via getOutputStream and write
Python code to it. After writing, we must flush the stream to ensure the data
is sent. The Python output is then read from the input stream.

## ProcessBuilder Example

This example demonstrates the modern ProcessBuilder approach for
process creation. ProcessBuilder provides more control over process creation
than Runtime.exec(). It allows setting environment variables and working
directory.

Main.java
  

package com.zetcode;

import java.io.IOException;
import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        try {
            // Create ProcessBuilder with command and arguments
            ProcessBuilder pb = new ProcessBuilder("cmd", "/c", "echo", "Hello, ProcessBuilder!");
            
            // Redirect error stream to standard output
            pb.redirectErrorStream(true);
            
            // Start the process
            Process process = pb.start();
            
            // Read the combined output
            readStream(process.getInputStream(), "OUTPUT");
            
            int exitCode = process.waitFor();
            System.out.println("Exit code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    private static void readStream(java.io.InputStream inputStream, String type) 
            throws IOException {
        java.io.BufferedReader reader = new java.io.BufferedReader(
            new java.io.InputStreamReader(inputStream));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(type + ": " + line);
        }
        reader.close();
    }
}

This example uses ProcessBuilder to execute a command with arguments. We set
redirectErrorStream(true) to merge error output with standard
output. ProcessBuilder is preferred over Runtime.exec() for its flexibility and
better handling of command arguments. It automatically handles argument quoting
and splitting.

## Checking Process Status

This example shows how to check if a process is still running and get its exit
value. The isAlive method checks process status, while
exitValue gets the exit code if the process has terminated.

Main.java
  

package com.zetcode;

import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Start a long-running process
            Process process = Runtime.getRuntime().exec("ping -n 5 localhost");
            
            // Check process status periodically
            for (int i = 0; i &lt; 10; i++) {
                if (process.isAlive()) {
                    System.out.println("Process is still running...");
                } else {
                    System.out.println("Process exited with code: " + 
                        process.exitValue());
                    break;
                }
                Thread.sleep(1000);
            }
            
            // If still running after 10 seconds, destroy it
            if (process.isAlive()) {
                System.out.println("Terminating process...");
                process.destroy();
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

Here we start a ping command that runs for about 5 seconds. We periodically
check its status using isAlive. If the process is still running
after 10 seconds, we terminate it with destroy. Note that
exitValue throws an exception if called on a running process.

## Destroying Processes

This example demonstrates different ways to terminate a process. The
destroy method requests graceful termination, while
destroyForcibly attempts forceful termination if needed.

Main.java
  

package com.zetcode;

import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Start a process that will run indefinitely
            Process process = Runtime.getRuntime().exec("notepad.exe");
            
            System.out.println("Process started. Waiting 5 seconds...");
            Thread.sleep(5000);
            
            // Try to destroy the process gracefully
            System.out.println("Attempting to destroy process...");
            process.destroy();
            
            // Wait a bit to see if it terminates
            Thread.sleep(1000);
            
            if (process.isAlive()) {
                System.out.println("Process still alive. Forcing termination...");
                Process forced = process.destroyForcibly();
                forced.waitFor();
                System.out.println("Forced termination complete.");
            } else {
                System.out.println("Process terminated gracefully.");
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

In this example, we start Notepad and attempt to close it programmatically.
First we try destroy for graceful termination. If the process
is still alive after a second, we use destroyForcibly. The
destroyForcibly method returns a Process object that can be
used to wait for termination. This provides more control over process
termination.

## Source

[Java Process Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Process.html)

In this article, we've covered the Java Process class with practical examples.
Process management is essential for system integration and external command
execution. The Process class provides the foundation for these operations in
Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).