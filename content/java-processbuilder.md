+++
title = "Java ProcessBuilder"
date = 2025-08-29T20:00:07.502+01:00
draft = false
description = "Learn how to create and manage operating system processes in Java using ProcessBuilder. This tutorial covers executing commands, handling process input/output, and optimizing system interactions in Java applications."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ProcessBuilder

last modified May 1, 2025

 

In this article we show how to create operating system processes with
ProcessBuilder.

The ProcessBuilder class in Java is used to create and manage
operating system processes. It provides a convenient way to execute system
commands, manage process environments, and control input/output streams. 

The start method creates a new Process instance with the following configurable attributes:

    - **Command** - The system command or executable to run.

    - **Environment** - A set of environment variables for the process.

    - **Working directory** - The directory where the process executes.

    - **Source of input** - Specifies input data for the process.

    - **Destination for standard output and error output** - Controls where the process writes its output and error logs.

    - **RedirectErrorStream** - Merges standard error output into standard output for streamlined handling.

## Running a program

A program is executed with command. With waitFor
we can wait for the process to finish.

Main.java
  

import java.io.IOException;

void main() throws IOException, InterruptedException {

    var processBuilder = new ProcessBuilder();
    processBuilder.command("notepad.exe");

    var process = processBuilder.start();
    var ret = process.waitFor();

    System.out.printf("Program exited with code: %d", ret);
}

The program executes the Windows Notepad application. It returns its exit code.

## Command output

The following example executes a command and shows its output.

Main.java
  

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

void main() throws IOException {

    var processBuilder = new ProcessBuilder();
    processBuilder.command("cal", "2022", "-m 2");

    var process = processBuilder.start();

    try (var reader = new BufferedReader(
            new InputStreamReader(process.getInputStream()))) {

        String line;

        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }
}

The example runs Linux cal command.

processBuilder.command("cal", "2022", "-m 2");

The command executes the cal program. The other
parameters are the options of the program. In order to run a command on Windows
machine, we could use the following: processBuilder.command("cmd.exe", "/c", "ping -n 3 google.com").

var process = processBuilder.start();

The process is lauched with start.

try (var reader = new BufferedReader(
    new InputStreamReader(process.getInputStream()))) {

With the getInputStream method we get the input stream
from the standard output of the process.

$ java Main.java
    Február 2022
Ne Po Ut St Št Pi So
       1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28

## Redirecting output

With redirectOutput, we can redirect the process builder's standard
output destination.

Main.java
  

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

void main() throws IOException {

    var homeDir = System.getProperty("user.home");
    var processBuilder = new ProcessBuilder();

    processBuilder.command("date");

    var fileName = new File(String.format("%s/Documents/output.txt", homeDir));
    processBuilder.redirectOutput(fileName);

    var process = processBuilder.start();

    try (var reader = new BufferedReader(
            new InputStreamReader(process.getInputStream()))) {

        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }
}

The program redirects the builder's output to a file. It runs the Windows
date command.

processBuilder.redirectOutput(fileName);

We redirect the process builders standard output to a file.

try (var reader = new BufferedReader(
    new InputStreamReader(process.getInputStream()))) {

    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}

Now the output goes to the file.

$ java Main.java
$ cat ~/Documents/output.txt 
Tue, Feb 20, 2024 10:18:11 PM

The current date was written to the output.txt file.

## Redirecting input and output

The next example redirects both input and output.

input.txt
  

sky
blue
steel
morning
coffee
earth
forest

This are the contents of the input.txt file.

Main.java
  

import java.io.File;
import java.io.IOException;

void main() throws IOException {

    var processBuilder = new ProcessBuilder();

    processBuilder.command("cat")
            .redirectInput(new File(".", "input.txt"))
            .redirectOutput(new File(".", "output.txt")).start();
}

In the program, we redirect input from an input.txt file to the
cat command and redirect the command's output to the output.txt
file.

## The inheritIO method

The inheritIO sets the source and destination for subprocess
standard I/O to be the same as those of the current Java process.

Main.java
  

import java.io.IOException;

void main() throws IOException, InterruptedException {

    var processBuilder = new ProcessBuilder();
    processBuilder.command("cmd.exe", "/c", "dir");

    var process = processBuilder.inheritIO().start();

    int exitCode = process.waitFor();
    System.out.printf("Program ended with exitCode %d", exitCode);
}

By inheriting the IO of the executed command, we can skip the reading step.
The program outputs the contents of the project directory and the message
showing the exit code.

$ java Main.java
Directory of C:\Users\Jano\Documents\prog\java\simple

20. 02. 2024  22:25    &lt;DIR&gt;          .
20. 02. 2024  21:45    &lt;DIR&gt;          ..
20. 02. 2024  22:23               357 Main.java
                1 File(s)            357 bytes
                2 Dir(s)  34 407 276 544 bytes free
Program ended with exitCode 0

We get both the output of the executed command and of our own Java program.

## The environment method

The environment method returns a string map view of
the process builder's environment.

Main.java
  

void main() {

    var pb = new ProcessBuilder();
    var env = pb.environment();

    env.forEach((s, s2) -&gt; System.out.printf("%s %s %n", s, s2));

    System.out.printf("%s %n", env.get("PATH"));
}

The program shows all environment variables.

$ java Main.java
configsetroot C:\WINDOWS\ConfigSetRoot
USERDOMAIN_ROAMINGPROFILE LAPTOP-OBKOFV9J
LOCALAPPDATA C:\Users\Jano\AppData\Local
PROCESSOR_LEVEL 6
USERDOMAIN LAPTOP-OBKOFV9J
LOGONSERVER \\LAPTOP-OBKOFV9J
JAVA_HOME C:\Users\Jano\.jdks\jdk21.0.2_13
SESSIONNAME Console
...

This is a sample output on Windows.

In the next program, we define a custom environment variable.

Main.java
  

import java.io.IOException;

void main() throws IOException {

    var pb = new ProcessBuilder();
    var env = pb.environment();

    env.put("mode", "development");
    pb.command("cmd.exe", "/c", "echo", "%mode%");

    pb.inheritIO().start();
}

The program defines a mode variable and outputs it on
Windows.

pb.command("cmd.exe", "/c", "echo", "%mode%");

The %mode% is a Windows syntax for environment variables;
on Linux we use $mode.

## The directory method

The directory method sets the process builder's working directory.

Main.java
  

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

void main() throws IOException {

    var homeDir = System.getProperty("user.home");
    var pb = new ProcessBuilder();

    pb.command("cmd.exe", "/c", "dir");
    pb.directory(new File(homeDir));

    var process = pb.start();

    try (var reader = new BufferedReader(
            new InputStreamReader(process.getInputStream()))) {

        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }
}

The example sets the home directory to be the process builder's current
directory. We show the contents of the home directory.

var homeDir = System.getProperty("user.home");

We get the user's home directory.

pb.command("cmd.exe", "/c", "dir");

We define a command which executes the dir program on Windows.

pb.directory(new File(homeDir));

We set the process builder's directory.

$ java Main.java
Volume in drive C is Windows
Volume Serial Number is 4415-13BB

Directory of C:\Users\Jano

02/14/2019  11:48 AM    &lt;DIR&gt;          .
02/14/2019  11:48 AM    &lt;DIR&gt;          ..
10/13/2018  08:38 AM    &lt;DIR&gt;          .android
01/31/2019  10:58 PM               281 .bash_history
12/17/2018  03:02 PM    &lt;DIR&gt;          .config
...

## Non-blocking operations

In the following example, we create a process which is asynchronous.

Main.java
  

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.stream.Collectors;

void main() throws InterruptedException,
        ExecutionException, TimeoutException, IOException {

    try (var executor = Executors.newSingleThreadExecutor()) {

        var processBuilder = new ProcessBuilder();
        processBuilder.command("cmd.exe", "/c", "ping -n 3 google.com");

        try {

            var process = processBuilder.start();

            System.out.println("processing ping command ...");
            var task = new ProcessTask(process.getInputStream());
            Future&lt;List&lt;String&gt;&gt; future = executor.submit(task);

            // non-blocking, doing other tasks
            System.out.println("doing task1 ...");
            System.out.println("doing task2 ...");

            var results = future.get(5, TimeUnit.SECONDS);

            for (String res : results) {
                System.out.println(res);
            }

        } finally {
            executor.shutdown();
        }
    }
}

class ProcessTask implements Callable&lt;List&lt;String&gt;&gt; {

    private final InputStream inputStream;

    public ProcessTask(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    @Override
    public List&lt;String&gt; call() {
        return new BufferedReader(new InputStreamReader(inputStream))
                .lines()
                .collect(Collectors.toList());
    }
}

The program creates a process that runs the ping command on the console.
It is executed in a separate thread with the help of the
Executors.newSingleThreadExecutor method.

$ java Main.java
processing ping command ...
doing task1 ...
doing task2 ...

Pinging google.com [2a00:1450:4001:825::200e] with 32 bytes of data:
Reply from 2a00:1450:4001:825::200e: time=108ms
Reply from 2a00:1450:4001:825::200e: time=111ms
Reply from 2a00:1450:4001:825::200e: time=112ms

Ping statistics for 2a00:1450:4001:825::200e:
    Packets: Sent = 3, Received = 3, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 108ms, Maximum = 112ms, Average = 110ms

## The Pipe Operation

A pipe is a mechanism that allows data to flow from one process to another,
enabling programs to exchange information seamlessly.

Main.java
  

import java.io.File;
import java.io.IOException;

void main() throws IOException {

    var homeDir = System.getProperty("user.home");
    var processBuilder = new ProcessBuilder();

    processBuilder.command("cmd.exe", "/c", "dir | grep [dD]o");

    processBuilder.directory(new File(homeDir));
    processBuilder.inheritIO().start();
}

In this example, the output from the dir command is passed to the
grep command through the pipe (|). This allows
filtering of directory contents based on the specified pattern.

$ java Main.java
Volume in drive C is Windows
11/14/2018  06:57 PM    &lt;DIR&gt;          .dotnet
02/18/2019  10:54 PM    &lt;DIR&gt;          Documents
02/17/2019  01:11 AM    &lt;DIR&gt;          Downloads

## Source

[Java ProcessBuilder - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ProcessBuilder.html)

In this article we have used Java's ProcessBuilder to execute OS processes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).