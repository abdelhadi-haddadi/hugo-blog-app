+++
title = "Tcl exec Command"
date = 2025-08-29T20:12:56.810+01:00
draft = false
description = "Tcl exec command tutorial shows how to execute external programs in Tcl. Learn exec with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl exec Command

last modified April 3, 2025

The Tcl exec command is used to execute external programs. It
captures the program's output and returns it as a string. The command is
essential for system integration tasks.

## Basic Definition

The exec command runs an external program with given arguments.
It waits for the program to complete and returns its output. Error output
can be redirected or captured.

Syntax: exec ?switches? arg ?arg ...?. Switches control how
the command handles input/output and errors. Arguments form the command line.

## Basic Command Execution

This example shows the simplest usage of exec to run a command.

basic_exec.tcl
  

set result [exec date]
puts "Current date: $result"

This executes the date command and stores its output in the
result variable. The output is then printed to standard output.

## Handling Command Output

The exec command can capture both standard output and error output.

exec_output.tcl
  

if {[catch {exec ls /nonexistent} result]} {
    puts "Command failed with error: $result"
} else {
    puts "Command output: $result"
}

This attempts to list a nonexistent directory. The catch command
handles the error case gracefully. Error output is captured in the result.

## Command with Arguments

Arguments can be passed to the executed command just like in a shell.

exec_args.tcl
  

set files [exec ls -l /usr/bin | head -n 5]
puts "First 5 files in /usr/bin:\n$files"

This lists files in /usr/bin and pipes the output to head to
show only the first 5 lines. The result is stored in the files
variable.

## Redirecting Output

The exec command supports output redirection to files.

exec_redirect.tcl
  

exec ps aux &gt; processes.txt
set size [file size processes.txt]
puts "Process list saved to processes.txt ($size bytes)"

This runs the ps command and redirects its output to a file.
The file size is then checked to confirm the operation succeeded.

## Environment Variables

Environment variables can be set for the executed command using the env
array.

exec_env.tcl
  

set ::env(MY_VAR) "Hello World"
set result [exec printenv MY_VAR]
puts "Environment variable value: $result"

This sets a custom environment variable and then uses printenv to
verify its value. The variable is only set for the child process.

## Command Pipeline

Multiple commands can be chained together using pipes.

exec_pipeline.tcl
  

set count [exec ps aux | grep tclsh | wc -l]
puts "Number of tclsh processes: $count"

This pipeline counts how many tclsh processes are running.
The output of each command is piped to the next one in the chain.

## Best Practices

- **Error Handling:** Always use catch with exec.

- **Quoting:** Properly quote arguments containing spaces.

- **Security:** Validate all user input used in commands.

- **Paths:** Use full paths for critical system commands.

- **Timeouts:** Consider timeouts for long-running commands.

 

This tutorial covered the Tcl exec command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).