+++
title = "Java ProcessBuilder Class"
date = 2025-08-29T19:59:52.664+01:00
draft = false
description = "Complete Java ProcessBuilder class tutorial covering all methods with examples. Learn how to execute system processes from Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ProcessBuilder Class

Last modified: April 13, 2025

 

The java.lang.ProcessBuilder class is used to create operating
system processes. It provides more control than Runtime.exec
methods for starting processes with specific environments, working directories,
and I/O redirection.

ProcessBuilder allows you to configure process attributes before starting the
process. You can set the command, arguments, environment variables, working
directory, and redirect standard input/output/error streams.

## ProcessBuilder Basics

The ProcessBuilder class is used to create operating system processes. Each
ProcessBuilder instance manages a collection of process attributes. The
start method creates a new Process instance with these attributes.

public final class ProcessBuilder {
    public ProcessBuilder(List&lt;String&gt; command) {...}
    public ProcessBuilder(String... command) {...}
    public ProcessBuilder command(List&lt;String&gt; command) {...}
    public ProcessBuilder command(String... command) {...}
    public List&lt;String&gt; command() {...}
    public ProcessBuilder directory(File directory) {...}
    public File directory() {...}
    public ProcessBuilder redirectInput(ProcessBuilder.Redirect source) {...}
    public ProcessBuilder redirectOutput(ProcessBuilder.Redirect destination) {...}
    public ProcessBuilder redirectError(ProcessBuilder.Redirect destination) {...}
    public ProcessBuilder.Redirect redirectInput() {...}
    public ProcessBuilder.Redirect redirectOutput() {...}
    public ProcessBuilder.Redirect redirectError() {...}
    public ProcessBuilder inheritIO() {...}
    public Map&lt;String,String&gt; environment() {...}
    public Process start() throws IOException {...}
}

The code above shows the main methods provided by the ProcessBuilder class.
These methods allow configuration of the process before it's started.

## Basic Process Execution

This example demonstrates the simplest way to execute a system command using
ProcessBuilder. We'll execute the "echo" command to print a message.

BasicProcess.java
  

package com.zetcode;

import java.io.IOException;

public class BasicProcess {
    public static void main(String[] args) {
        try {
            ProcessBuilder pb = new ProcessBuilder("echo", "Hello, ProcessBuilder!");
            Process process = pb.start();
            
            int exitCode = process.waitFor();
            System.out.println("Process exited with code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

In this example, we create a ProcessBuilder with the "echo" command and its
argument. The start method launches the process, and
waitFor waits for it to complete. Note that this simple example
doesn't capture the process output.

## Reading Process Output

This example shows how to capture and read the output of a process. We'll
execute the "ls" command to list directory contents and print the output.

ReadOutput.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ReadOutput {
    public static void main(String[] args) {
        try {
            ProcessBuilder pb = new ProcessBuilder("ls", "-l");
            Process process = pb.start();
            
            // Read the output from the process
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
            int exitCode = process.waitFor();
            System.out.println("\nProcess exited with code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

Here we use getInputStream to obtain the process's standard
output stream. We wrap it in a BufferedReader to read the output line by line.
This pattern is common when you need to process command output in Java.

## Setting Working Directory

This example demonstrates how to set the working directory for a process. We'll
execute "ls" in a specific directory.

WorkingDirectory.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class WorkingDirectory {
    public static void main(String[] args) {
        try {
            ProcessBuilder pb = new ProcessBuilder("ls");
            pb.directory(new File("/tmp"));  // Set working directory
            
            System.out.println("Working directory: " + pb.directory());
            
            Process process = pb.start();
            
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
            int exitCode = process.waitFor();
            System.out.println("\nProcess exited with code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

The directory method sets the working directory for the process.
In this example, we list contents of the "/tmp" directory. The working directory
affects relative paths used by the executed command.

## Environment Variables

This example shows how to modify environment variables for the process. We'll
add a custom variable and print the environment.

EnvironmentVars.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;

public class EnvironmentVars {
    public static void main(String[] args) {
        try {
            ProcessBuilder pb = new ProcessBuilder("printenv");
            
            // Get and modify the environment
            Map&lt;String, String&gt; env = pb.environment();
            env.put("CUSTOM_VAR", "Hello from Java!");
            
            System.out.println("Environment variables:");
            env.forEach((k, v) -&gt; System.out.println(k + "=" + v));
            
            Process process = pb.start();
            
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
            int exitCode = process.waitFor();
            System.out.println("\nProcess exited with code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

The environment method returns a modifiable map of environment
variables. We add our custom variable which will be available to the child
process. The "printenv" command displays all environment variables.

## Redirecting Output to File

This example demonstrates how to redirect process output to a file instead of
reading it in Java. We'll save "ls" output to a file.

RedirectOutput.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;

public class RedirectOutput {
    public static void main(String[] args) {
        try {
            ProcessBuilder pb = new ProcessBuilder("ls", "-l");
            
            // Redirect output to a file
            pb.redirectOutput(new File("output.txt"));
            
            Process process = pb.start();
            int exitCode = process.waitFor();
            
            System.out.println("Process completed. Output saved to output.txt");
            System.out.println("Exit code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

The redirectOutput method directs the process's standard output to
a file. This is useful when you want to save command output without processing
it in Java. The file will be created if it doesn't exist or overwritten if it
does.

## Handling Error Stream

This example shows how to handle both standard output and error streams. We'll
execute a command that produces error output and capture both streams.

ErrorHandling.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ErrorHandling {
    public static void main(String[] args) {
        try {
            ProcessBuilder pb = new ProcessBuilder("ls", "nonexistent_file");
            
            // Merge error stream with output stream
            pb.redirectErrorStream(true);
            
            Process process = pb.start();
            
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
            int exitCode = process.waitFor();
            System.out.println("\nProcess exited with code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

By setting redirectErrorStream(true), we merge the error stream
with the standard output stream. This simplifies reading both streams through
a single InputStream. The exit code will be non-zero for error conditions.

## Running Multiple Commands

This example demonstrates how to execute multiple commands in sequence. We'll
run two commands and check their exit statuses.

MultipleCommands.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class MultipleCommands {
    public static void main(String[] args) {
        List&lt;String&gt; commands = new ArrayList&lt;&gt;();
        commands.add("date");
        commands.add("uname -a");
        
        for (String cmd : commands) {
            try {
                System.out.println("Executing: " + cmd);
                
                ProcessBuilder pb = new ProcessBuilder(cmd.split(" "));
                pb.redirectErrorStream(true);
                
                Process process = pb.start();
                
                BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));
                
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
                
                int exitCode = process.waitFor();
                System.out.println("Exit code: " + exitCode + "\n");
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

This example shows how to execute multiple commands in sequence. We split each
command string into parts for the ProcessBuilder. Each command's output and exit
code are displayed. This pattern is useful for running several system commands.

## Source

[Java ProcessBuilder Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/ProcessBuilder.html)

In this article, we've covered the Java ProcessBuilder class with practical
examples. ProcessBuilder provides powerful features for executing and managing
system processes from Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).