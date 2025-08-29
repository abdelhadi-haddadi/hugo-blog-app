+++
title = "Tcl flush Command"
date = 2025-08-29T20:12:59.026+01:00
draft = false
description = "Tcl flush command tutorial shows how to control output buffering in Tcl. Learn flush with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl flush Command

last modified April 3, 2025

The Tcl flush command forces output buffers to be written to their
files or devices. It's essential for controlling when output appears, especially
in interactive applications or when monitoring output in real-time.

## Basic Definition

The flush command writes any buffered output for the specified
file channel. By default, Tcl buffers output for efficiency, which can delay
when output actually appears.

Syntax: flush channelId. The command takes a single argument - the
channel identifier of the file or device to flush. It returns an empty string.

## Basic Flush Usage

This example demonstrates the simplest use of flush to ensure
immediate output.

basic_flush.tcl
  

puts -nonewline "Enter your name: "
flush stdout
gets stdin name
puts "Hello, $name!"

Here, flush stdout ensures the prompt appears before gets
waits for input. Without flush, the prompt might not appear until after input.

## Flushing File Output

The flush command is also important when writing to files to ensure
data is physically written to disk.

file_flush.tcl
  

set file [open "output.txt" w]
puts $file "First line"
flush $file
puts $file "Second line"
close $file

This writes to a file and flushes after the first line. The flush ensures the
first line is written to disk before continuing, which is important for logging.

## Flushing in a Loop

When writing output in a loop, flushing can provide real-time feedback.

loop_flush.tcl
  

for {set i 1} {$i &lt;= 5} {incr i} {
    puts -nonewline "Progress: $i/5\r"
    flush stdout
    after 1000
}
puts "\nDone!"

This shows a progress counter that updates every second. The flush ensures each
update appears immediately rather than being buffered until the loop completes.

## Flushing Both Input and Output

While flush is typically used for output, it can also affect input
buffering in some cases.

io_flush.tcl
  

set pipe [open "|some_command" r+]
puts $pipe "input data"
flush $pipe
set output [gets $pipe]
close $pipe

This example shows flushing a pipe channel. The flush ensures the command
receives the input immediately, which is often necessary for interactive
program communication.

## Flushing with Non-blocking Channels

When working with non-blocking channels, flush behavior becomes particularly
important.

nonblocking_flush.tcl
  

set sock [socket -async localhost 12345]
fconfigure $sock -blocking 0 -buffering line
puts $sock "Hello server"
flush $sock
fileevent $sock readable [list handleResponse $sock]

This configures a non-blocking socket with line buffering. The flush ensures
the message is sent immediately rather than waiting for more data to fill
the buffer.

## Flushing Standard Error

The flush command can be used with any channel, including stderr.

stderr_flush.tcl
  

puts stderr "Error: Invalid input detected"
flush stderr
# Critical error handling continues...

This ensures error messages appear immediately in the error output stream,
which is especially important for logging and debugging purposes.

## Best Practices

- **Interactive prompts:** Always flush stdout after prompts.

- **Critical output:** Flush important messages immediately.

- **File operations:** Flush before closing files.

- **Network operations:** Flush after sending complete messages.

- **Performance:** Avoid excessive flushing in performance-critical code.

 

This tutorial covered the Tcl flush command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).