+++
title = "Tcl eof Command"
date = 2025-08-29T20:12:55.697+01:00
draft = false
description = "Tcl eof command tutorial shows how to detect end of file conditions in Tcl. Learn eof with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl eof Command

last modified April 3, 2025

The Tcl eof command checks if an end-of-file condition has occurred
on a channel. It's essential for file and stream processing in Tcl. The command
returns 1 if EOF is reached, 0 otherwise.

## Basic Definition

The eof command tests whether a channel has reached its end. It's
commonly used with file operations and socket communications. The command takes
a channel identifier as its argument.

Syntax: eof channelId. The channelId must be an open channel like
a file handle or socket. The command returns a boolean value indicating EOF status.

## Basic File EOF Check

This example demonstrates checking EOF while reading a file line by line.

basic_eof.tcl
  

set file [open "data.txt" r]
while {![eof $file]} {
    gets $file line
    puts $line
}
close $file

This opens a file and reads it line by line until EOF. The eof
command checks the condition before each read. Note that gets might
return an empty string at EOF.

## EOF with Read Operations

This example shows how EOF works with direct read operations.

eof_read.tcl
  

set file [open "data.bin" r]
set data [read $file]
if {[eof $file]} {
    puts "Reached end of file"
}
close $file

Here we read the entire file content at once. After reading, we check if we've
reached EOF. With read, EOF is typically reached after the operation.

## EOF in Network Communication

The eof command is also useful for detecting closed network connections.

eof_socket.tcl
  

set server [socket -server accept 12345]
proc accept {chan addr port} {
    if {[eof $chan]} {
        puts "Connection closed by client"
        close $chan
        return
    }
    puts [gets $chan]
}
vwait forever

This creates a simple server that checks for EOF on incoming connections. When a
client disconnects, EOF is detected and the channel is closed. This prevents
hanging on dead connections.

## EOF with Standard Input

The eof command can check for EOF on standard input.

eof_stdin.tcl
  

puts "Enter text (Ctrl+D to end):"
while {![eof stdin]} {
    gets stdin line
    if {![eof stdin]} {
        puts "You entered: $line"
    }
}

This script reads from standard input until EOF (Ctrl+D in Unix, Ctrl+Z in Windows).
We check EOF after gets to avoid processing empty lines at EOF. This
pattern is common for interactive input.

## EOF in Binary File Processing

When processing binary files, EOF checks are crucial for reading fixed-size blocks.

eof_binary.tcl
  

set file [open "image.jpg" rb]
while {![eof $file]} {
    set chunk [read $file 1024]
    puts "Read [string length $chunk] bytes"
    # Process chunk here
}
close $file

This reads a binary file in 1024-byte chunks until EOF. The eof check
ensures we stop when the file ends. The last chunk might be smaller than 1024 bytes.

## EOF with Multiple Channels

This example demonstrates checking EOF on multiple channels simultaneously.

eof_multiple.tcl
  

set file1 [open "file1.txt" r]
set file2 [open "file2.txt" r]

while {1} {
    if {[eof $file1] &amp;&amp; [eof $file2]} {
        break
    }
    if {![eof $file1]} { gets $file1 line1 }
    if {![eof $file2]} { gets $file2 line2 }
    # Process lines
}
close $file1
close $file2

This script reads from two files until both reach EOF. We check each file's EOF
status separately. This pattern is useful for merging or comparing files.

## Best Practices

- **Check after read:** Verify EOF after read operations for accuracy.

- **Handle empty reads:** EOF might coincide with empty data.

- **Close channels:** Always close channels after detecting EOF.

- **Error handling:** Combine EOF checks with error handling.

- **Buffering:** Be aware of buffering effects on EOF detection.

 

This tutorial covered the Tcl eof command with practical examples
showing its usage in file processing, network communication, and input handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).